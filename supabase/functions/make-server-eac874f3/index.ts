import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

// ============================================
// Key-Value Store
// ============================================

function getKvClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
}

const kv = {
  set: async (key: string, value: any) => {
    const supabase = getKvClient();
    const { error } = await supabase.from('kv_store_eac874f3').upsert({ key, value });
    if (error) throw new Error(error.message);
  },
  get: async (key: string) => {
    const supabase = getKvClient();
    const { data, error } = await supabase.from('kv_store_eac874f3').select('value').eq('key', key).maybeSingle();
    if (error) throw new Error(error.message);
    return data?.value;
  },
  del: async (key: string) => {
    const supabase = getKvClient();
    const { error } = await supabase.from('kv_store_eac874f3').delete().eq('key', key);
    if (error) throw new Error(error.message);
  },
};

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Ollama-Api-Key"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============================================
// Ollama API Helper
// ============================================

function getOllamaApiKey(c?: any): string | null {
  // Priority 1: Environment variable (set in Supabase dashboard)
  const envKey = Deno.env.get('OLLAMA_API_KEY');
  if (envKey) return envKey;
  // Priority 2: Passed from client request
  if (c) {
    const reqKey = c.req.header('X-Ollama-Api-Key');
    if (reqKey) return reqKey;
  }
  return null;
}

function getOllamaServerUrl(c?: any): string {
  const apiKey = getOllamaApiKey(c);
  if (apiKey) {
    return 'https://ollama.com';
  }
  const url = Deno.env.get('OLLAMA_SERVER_URL') || 'http://localhost:11434';
  return url.replace(/\/$/, '');
}

function getAuthHeaders(c?: any): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const apiKey = getOllamaApiKey(c);
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  return headers;
}

const DEFAULT_MODEL = 'kimi-k2.6:cloud';

async function callOllama(
  prompt: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
    images?: string[];
  } = {},
  c?: any
): Promise<string> {
  const baseUrl = getOllamaServerUrl(c);
  const model = options.model || DEFAULT_MODEL;
  const temperature = options.temperature ?? 0.7;

  console.log(`[OLLAMA] Calling model: ${model}, temp: ${temperature}, cloud: ${!!getOllamaApiKey(c)}`);

  const body: any = {
    model,
    prompt,
    stream: false,
    think: false,
    options: {
      temperature,
      num_predict: options.maxTokens || 4096,
    },
  };

  if (options.systemPrompt) {
    body.system = options.systemPrompt;
  }

  if (options.images && options.images.length > 0) {
    body.images = options.images;
  }

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: getAuthHeaders(c),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[OLLAMA] API error (${response.status}):`, errorText);
    throw new Error(`Ollama API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.response;

  if (!content) {
    console.error('[OLLAMA] Empty response:', JSON.stringify(data));
    throw new Error('Ollama returned an empty response');
  }

  console.log(`[OLLAMA] Response length: ${content.length} chars`);
  return content;
}

async function callOllamaChat(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  } = {},
  c?: any
): Promise<string> {
  const baseUrl = getOllamaServerUrl(c);
  const model = options.model || DEFAULT_MODEL;
  const temperature = options.temperature ?? 0.7;

  console.log(`[OLLAMA CHAT] Calling model: ${model}`);

  const body: any = {
    model,
    messages,
    stream: false,
    think: false,
    options: {
      temperature,
      num_predict: options.maxTokens || 4096,
    },
  };

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: getAuthHeaders(c),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[OLLAMA CHAT] API error (${response.status}):`, errorText);
    throw new Error(`Ollama API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.message?.content;

  if (!content) {
    console.error('[OLLAMA CHAT] Empty response:', JSON.stringify(data));
    throw new Error('Ollama returned an empty response');
  }

  console.log(`[OLLAMA CHAT] Response length: ${content.length} chars`);
  return content;
}

// ============================================
// Health check endpoint
// ============================================

app.get("/make-server-eac874f3/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// AI Status endpoint
// ============================================

app.get("/make-server-eac874f3/ai/status", async (c) => {
  try {
    const result = await callOllama(
      'Say "OK" and nothing else.',
      { temperature: 0, maxTokens: 10 },
      c
    );

    return c.json({
      available: true,
      message: 'Ollama server connected successfully',
      provider: 'ollama',
      testResponse: result.substring(0, 50),
    });
  } catch (error: any) {
    console.error('[AI STATUS ERROR]', error.message);
    return c.json({
      available: false,
      message: error.message || 'Failed to connect to Ollama server',
      provider: 'ollama',
    });
  }
});

// ============================================
// AI Text Completion endpoint
// ============================================

app.post("/make-server-eac874f3/ai/generate", async (c) => {
  try {
    const { prompt, systemPrompt, model, temperature, maxTokens, images } = await c.req.json();

    if (!prompt) {
      return c.json({ error: 'Prompt is required' }, 400);
    }

    console.log(`[AI GENERATE] Prompt length: ${prompt.length}, model: ${model || 'default'}, images: ${images?.length || 0}`);

    const result = await callOllama(prompt, {
      model,
      temperature,
      maxTokens: maxTokens || (images?.length > 0 ? 8192 : 4096),
      systemPrompt,
      images: images || undefined,
    }, c);

    return c.json({ result });
  } catch (error: any) {
    console.error('[AI GENERATE ERROR]', error.message);
    return c.json({ error: error.message || 'AI generation failed' }, 500);
  }
});

// ============================================
// AI Chat endpoint
// ============================================

app.post("/make-server-eac874f3/ai/chat", async (c) => {
  try {
    const { question, context, unitTitle, model, conversationHistory } = await c.req.json();

    if (!question || !context) {
      return c.json({ error: "Question and context are required" }, 400);
    }

    console.log(`[AI CHAT] Question: ${question.substring(0, 50)}...`);
    console.log(`[AI CHAT] Unit: ${unitTitle}`);

    const systemPrompt = `You are a helpful AI study assistant. You are helping a student understand content from their textbook unit titled "${unitTitle}".

UNIT CONTENT:
${context}

Instructions:
1. If the question is related to the unit content above, answer it based on that content. Be specific and reference the relevant parts of the unit.
2. If the question is not related to the unit content, you may answer using your general knowledge, but mention that this is outside the scope of the current unit.
3. Keep your answer clear, concise, and helpful for a student.
4. Use simple language appropriate for the student's level.
5. If the unit content is in Nepali or another language, respond in that same language.`;

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: 'user', content: question });

    const answer = await callOllamaChat(messages, {
      model,
      temperature: 0.7,
      maxTokens: 1500,
    }, c);

    console.log("[AI CHAT] Response generated successfully");
    return c.json({ answer });
  } catch (error: any) {
    console.error("[AI CHAT ERROR]", error.message);
    return c.json({ error: error.message || "Chat error" }, 500);
  }
});

// ============================================
// AI Available Models endpoint
// ============================================

app.get("/make-server-eac874f3/ai/models", async (c) => {
  try {
    const baseUrl = getOllamaServerUrl(c);
    const response = await fetch(`${baseUrl}/api/tags`, { headers: getAuthHeaders(c) });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }

    const data = await response.json();
    const models = (data.models || []).map((m: any) => ({
      id: m.name,
      name: m.name,
      size: m.size,
      modified_at: m.modified_at,
    }));

    return c.json({ models });
  } catch (error: any) {
    console.error('[AI MODELS ERROR]', error.message);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// Authentication Endpoints
// ============================================

app.post("/make-server-eac874f3/signup", async (c) => {
  try {
    const { email, password, name, grade } = await c.req.json();

    if (!email || !password || !name || !grade) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    console.log(`[AUTH] Creating account for: ${email}`);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name, grade },
      email_confirm: true
    });

    if (error) {
      console.error('[AUTH] Signup error:', error);

      if (error.message?.includes('already been registered') || error.status === 422) {
        return c.json({
          error: 'An account with this email already exists. Please try logging in instead.',
          code: 'email_exists'
        }, 409);
      }

      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    console.log(`[AUTH] Account created: ${email}`);

    return c.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: name,
        grade: grade,
      }
    });

  } catch (error: any) {
    console.error('[AUTH ERROR]', error);
    return c.json({ error: error.message || 'Signup failed' }, 500);
  }
});

// ============================================
// User Data Persistence Endpoints
// ============================================

app.post("/make-server-eac874f3/user-data", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No access token provided' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    const { data: userData, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !userData.user) {
      console.error('[DATA] Auth error:', authError);
      return c.json({ error: 'Unauthorized - Invalid access token' }, 401);
    }

    const userId = userData.user.id;
    const { subjects } = await c.req.json();

    if (!subjects || !Array.isArray(subjects)) {
      return c.json({ error: 'Invalid data - subjects must be an array' }, 400);
    }

    console.log(`[DATA] Saving data for user: ${userId} (${subjects.length} subjects)`);

    const key = `user_data:${userId}`;
    await kv.set(key, {
      subjects,
      lastUpdated: new Date().toISOString(),
    });

    console.log(`[DATA] Saved data for user: ${userId}`);

    return c.json({
      success: true,
      message: 'Data saved successfully',
    });

  } catch (error: any) {
    console.error('[DATA ERROR]', error);
    return c.json({ error: error.message || 'Failed to save data' }, 500);
  }
});

app.get("/make-server-eac874f3/user-data", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No access token provided' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    const { data: userData, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !userData.user) {
      console.error('[DATA] Auth error:', authError);
      return c.json({ error: 'Unauthorized - Invalid access token' }, 401);
    }

    const userId = userData.user.id;
    console.log(`[DATA] Loading data for user: ${userId}`);

    const key = `user_data:${userId}`;
    const data = await kv.get(key);

    if (!data) {
      console.log(`[DATA] No data found for user: ${userId}`);
      return c.json({ error: 'No data found' }, 404);
    }

    console.log(`[DATA] Loaded data for user: ${userId}`);

    return c.json(data);

  } catch (error: any) {
    console.error('[DATA ERROR]', error);
    return c.json({ error: error.message || 'Failed to load data' }, 500);
  }
});

app.delete("/make-server-eac874f3/user-data", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'Unauthorized - No access token provided' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    const { data: userData, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !userData.user) {
      console.error('[DATA] Auth error:', authError);
      return c.json({ error: 'Unauthorized - Invalid access token' }, 401);
    }

    const userId = userData.user.id;
    console.log(`[DATA] Deleting data for user: ${userId}`);

    const key = `user_data:${userId}`;
    await kv.del(key);

    console.log(`[DATA] Deleted data for user: ${userId}`);

    return c.json({
      success: true,
      message: 'Data deleted successfully',
    });

  } catch (error: any) {
    console.error('[DATA ERROR]', error);
    return c.json({ error: error.message || 'Failed to delete data' }, 500);
  }
});

// ============================================
// Admin Endpoints
// ============================================

app.get("/make-server-eac874f3/admin/users", async (c) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      return c.json({ error: "Server configuration missing" }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('[ADMIN USERS ERROR]', error);
      return c.json({ error: error.message }, 500);
    }

    const users = data.users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.user_metadata?.name || 'Unknown',
      grade: u.user_metadata?.grade || 'N/A',
      district: u.user_metadata?.district || 'Not specified',
      school: u.user_metadata?.school || 'Not specified',
      plan: u.user_metadata?.plan || 'free',
      created_at: u.created_at
    }));

    return c.json({ users });
  } catch (error: any) {
    console.error('[ADMIN USERS ERROR]', error.message);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);
