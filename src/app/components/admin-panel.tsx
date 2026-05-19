import { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Check, AlertCircle, RefreshCw, Zap, Search, Server, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { getAIStatus, listAvailableModels, setAIModel, getAIModel } from '../lib/ai-service';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getAccessToken } from '../lib/auth-service';
import { OLLAMA_CONFIG } from '../lib/config';
import { motion } from 'motion/react';

function isLocalhost(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname === '::1';
  } catch {
    return false;
  }
}

const isDirectMode = OLLAMA_CONFIG.USE_DIRECT && isLocalhost(OLLAMA_CONFIG.SERVER_URL);

interface RealUser {
  id: string;
  name: string;
  email: string;
  grade: string | number;
  district: string;
  school: string;
  plan: string;
  created_at: string;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [selectedModel, setSelectedModel] = useState(getAIModel());
  const [aiStatus, setAiStatus] = useState<{ available: boolean; message: string } | null>(null);
  const [discoveringModels, setDiscoveringModels] = useState(false);
  const [availableModels, setAvailableModels] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState<RealUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  useEffect(() => { checkStatus(); fetchUsers(); loadModels(); }, []);

  const loadModels = async () => {
    try {
      const models = await listAvailableModels();
      if (models.length > 0) setAvailableModels(models);
    } catch (error) {
      console.error('Error auto-loading models:', error);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const accessToken = getAccessToken();
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-eac874f3/admin/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken || publicAnonKey}`, 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      if (data.users) setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Could not load user data from server.');
    } finally { setLoadingUsers(false); }
  };

  const availableDistricts = Array.from(new Set(users.map(u => u.district).filter(Boolean))).sort();

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(userSearchTerm.toLowerCase()) || (user.email || '').toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || (user.grade || '').toString() === gradeFilter;
    const matchesDistrict = districtFilter === 'all' || user.district === districtFilter;
    const matchesPlan = planFilter === 'all' || (user.plan || 'free') === planFilter;
    return matchesSearch && matchesGrade && matchesDistrict && matchesPlan;
  });

  const checkStatus = async () => {
    setIsLoading(true);
    try { setAiStatus(await getAIStatus()); }
    catch (error) { console.error('Error checking status:', error); }
    finally { setIsLoading(false); }
  };

  const handleSaveModel = () => {
    setAIModel(selectedModel);
    toast.success(`AI model set to: ${selectedModel}`);
    checkStatus();
  };

  const handleDiscoverModels = async () => {
    setDiscoveringModels(true);
    toast.info('Fetching available models from Ollama...');
    try {
      const models = await listAvailableModels();
      if (models.length > 0) { setAvailableModels(models); toast.success(`Found ${models.length} models!`); }
      else { toast.error('No models found. Check if the Ollama server is reachable.'); }
    } catch (error: any) {
      toast.error(`Failed to fetch models: ${error.message}`);
    } finally { setDiscoveringModels(false); }
  };

  const defaultModels = [
    { id: 'kimi-k2.6', name: 'Kimi 2.6 (text — Recommended)' },
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (vision)' },
    { id: 'gemma3:27b', name: 'Gemma 3 27B (vision)' },
    { id: 'qwen3-vl:235b-instruct', name: 'Qwen3-VL 235B (vision)' },
  ];

  const modelsToShow = availableModels.length > 0 ? availableModels : defaultModels;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/70 backdrop-blur-2xl border-b-2 border-primary/10">
        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-xl font-semibold">
            <ArrowLeft className="w-4 h-4" />Back
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-md shadow-primary/10">
              <Settings className="w-4.5 h-4.5 text-white" />
            </div>
            <h1 className="text-foreground font-bold font-display text-lg">Admin Panel</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="ai-config" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 max-w-[400px] bg-muted rounded-xl p-1">
            <TabsTrigger value="ai-config" className="flex items-center gap-2 rounded-lg font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Settings className="w-4 h-4" />AI Configuration
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 rounded-lg font-semibold data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Users className="w-4 h-4" />Users Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-config" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">AI Configuration</h2>
              <p className="text-muted-foreground font-semibold">Configure the AI model. The Ollama API key is set as <code className="bg-muted px-1 py-0.5 rounded text-xs">OLLAMA_API_KEY</code> in Edge Function secrets.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-card rounded-2xl border-2 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-secondary/10 rounded-2xl flex items-center justify-center"><Server className="w-5 h-5 text-secondary" /></div>
                      <CardTitle className="text-foreground font-display">Ollama AI Server</CardTitle>
                    </div>
                    {aiStatus && (
                      <div className="flex items-center gap-2">
                        {aiStatus.available ? (
                          <><Check className="w-4 h-4 text-emerald-500" /><span className="text-sm text-emerald-500 font-bold">Connected</span></>
                        ) : (
                          <><AlertCircle className="w-4 h-4 text-destructive" /><span className="text-sm text-destructive font-bold">Not Connected</span></>
                        )}
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground font-semibold">
                    {isDirectMode
                      ? 'Local Ollama inference. Start Ollama with OLLAMA_ORIGINS=* for browser access.'
                      : 'Ollama Cloud via Supabase Edge Function proxy. The Edge Function forwards requests to avoid browser CORS restrictions.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiStatus && !aiStatus.available && (
                    <Alert variant="destructive" className="border-2 border-destructive/30 bg-destructive/5 rounded-2xl">
                      <AlertCircle className="h-4 w-4" /><AlertTitle>Connection Error</AlertTitle><AlertDescription>{aiStatus.message}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label className="text-foreground font-bold">Server Status</Label>
                    <div className="p-4 bg-muted rounded-2xl border-2 border-border space-y-2">
                      <p className="text-sm text-muted-foreground font-semibold">
                        Mode: <span className="text-primary font-bold">{isDirectMode ? 'Direct local Ollama' : 'Edge Function proxy'}</span>
                      </p>
                      <p className="text-sm text-muted-foreground font-semibold">
                        Server URL: <code className="bg-background px-1.5 py-0.5 rounded-lg text-xs font-mono text-foreground">{OLLAMA_CONFIG.SERVER_URL}</code>
                      </p>
                      <p className="text-sm text-muted-foreground font-semibold">
                        API Key: <span className={OLLAMA_CONFIG.API_KEY ? 'text-emerald-600 font-bold' : 'text-muted-foreground'}>{OLLAMA_CONFIG.API_KEY ? 'Configured' : 'Not set'}</span>
                      </p>
                      <p className="text-sm text-muted-foreground font-semibold">
                        Default model: <span className="text-primary font-bold">{OLLAMA_CONFIG.MODEL}</span> · Vision: <span className="text-primary font-bold">{OLLAMA_CONFIG.VISION_MODEL}</span>
                      </p>
                      {!isDirectMode && (
                        <p className="text-xs text-muted-foreground">
                          Requests are proxied through the Supabase Edge Function to avoid browser CORS restrictions.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ai-model" className="text-foreground font-bold">AI Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger id="ai-model" className="bg-input-background border-2 border-border rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-card border-2 border-border rounded-xl">
                        {modelsToShow.map((model) => (
                          <SelectItem key={model.id} value={model.id}>{model.name || model.id}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground font-semibold">Kimi 2.6 is recommended for best results with text and vision tasks.</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 flex-wrap">
                  <Button onClick={handleSaveModel} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold"><Zap className="w-4 h-4 mr-2" />Save Model</Button>
                  <Button variant="outline" onClick={checkStatus} disabled={isLoading} className="border-2 border-border rounded-xl font-semibold"><RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />Test Connection</Button>
                  <Button variant="outline" onClick={handleDiscoverModels} disabled={discoveringModels} className="border-2 border-border rounded-xl font-semibold"><Search className={`w-4 h-4 mr-2 ${discoveringModels ? 'animate-spin' : ''}`} />Discover Models</Button>
                </CardFooter>
              </Card>
            </motion.div>

            <Alert className="mt-6 bg-card border-2 border-border rounded-2xl">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <AlertTitle className="text-foreground font-display">About Ollama</AlertTitle>
              <AlertDescription className="text-muted-foreground font-semibold">
                {isDirectMode
                  ? `Calling Ollama API directly from the browser at ${OLLAMA_CONFIG.SERVER_URL}. Start Ollama with OLLAMA_ORIGINS=* to allow browser access.`
                  : `AI requests are sent to the Supabase Edge Function, which forwards them to ${OLLAMA_CONFIG.SERVER_URL} using your API key. This bypasses browser CORS restrictions.`}
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="users">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Users Management</h2>
              <p className="text-muted-foreground font-semibold mb-6">View and filter user accounts registered on StudyCopilot.</p>

              <div className="bg-card rounded-2xl border-2 border-border p-4 sm:p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground font-semibold">Search Users</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search name or email..." value={userSearchTerm} onChange={(e) => setUserSearchTerm(e.target.value)} className="pl-9 bg-input-background border-2 border-border rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground font-semibold">Filter by Grade</Label>
                    <Select value={gradeFilter} onValueChange={setGradeFilter}>
                      <SelectTrigger className="bg-input-background border-2 border-border rounded-xl"><SelectValue placeholder="All Grades" /></SelectTrigger>
                      <SelectContent className="rounded-xl"><SelectItem value="all">All Grades</SelectItem>{[6,7,8,9,10,11,12].map(g => <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground font-semibold">Filter by District</Label>
                    <Select value={districtFilter} onValueChange={setDistrictFilter}>
                      <SelectTrigger className="bg-input-background border-2 border-border rounded-xl"><SelectValue placeholder="All Districts" /></SelectTrigger>
                      <SelectContent className="rounded-xl"><SelectItem value="all">All Districts</SelectItem>{availableDistricts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground font-semibold">Filter by Plan</Label>
                    <Select value={planFilter} onValueChange={setPlanFilter}>
                      <SelectTrigger className="bg-input-background border-2 border-border rounded-xl"><SelectValue placeholder="All Plans" /></SelectTrigger>
                      <SelectContent className="rounded-xl"><SelectItem value="all">All Plans</SelectItem><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="premium">Premium</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="font-bold">User</TableHead>
                        <TableHead className="font-bold">Grade</TableHead>
                        <TableHead className="font-bold">District</TableHead>
                        <TableHead className="font-bold">School</TableHead>
                        <TableHead className="font-bold">Plan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loadingUsers ? (
                        <TableRow><TableCell colSpan={5} className="h-32 text-center"><div className="flex flex-col items-center justify-center text-muted-foreground"><RefreshCw className="w-6 h-6 animate-spin mb-2" /><p className="font-semibold">Loading users...</p></div></TableCell></TableRow>
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id} className="border-border">
                            <TableCell><div><div className="font-bold text-foreground">{user.name}</div><div className="text-xs text-muted-foreground font-semibold">{user.email}</div></div></TableCell>
                            <TableCell className="text-muted-foreground font-semibold">Grade {user.grade}</TableCell>
                            <TableCell className="text-muted-foreground font-semibold">{user.district}</TableCell>
                            <TableCell className="text-muted-foreground font-semibold">{user.school}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${(user.plan || 'free') === 'pro' || (user.plan || 'free') === 'premium' ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-2 border-primary/20' : 'bg-muted text-muted-foreground border-2 border-border'}`}>{(user.plan || 'free').toUpperCase()}</span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground font-semibold">No users found matching your filters.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-right flex justify-between items-center">
                  <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loadingUsers} className="h-8 text-xs bg-transparent border-2 border-border text-muted-foreground rounded-xl font-semibold">
                    <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loadingUsers ? 'animate-spin' : ''}`} />Refresh List
                  </Button>
                  <span className="font-semibold">Showing {filteredUsers.length} of {users.length} users</span>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
