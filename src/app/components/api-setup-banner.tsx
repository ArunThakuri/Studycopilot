import { useState, useEffect } from 'react';
import { AlertCircle, X, ExternalLink, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { getAIStatus } from '../lib/ai-service';
import { OLLAMA_CONFIG } from '../lib/config';

interface APISetupBannerProps {
  onOpenAdminPanel: () => void;
}

function isLocalhost(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname === '::1';
  } catch {
    return false;
  }
}

export function APISetupBanner({ onOpenAdminPanel }: APISetupBannerProps) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    checkAPIStatus();

    const dismissed = localStorage.getItem('api_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const checkAPIStatus = async () => {
    try {
      const status = await getAIStatus();
      setIsConfigured(status.available);
    } catch (error) {
      setIsConfigured(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('api_banner_dismissed', 'true');
  };

  if (isChecking || isConfigured || isDismissed) {
    return null;
  }

  const isDirectMode = OLLAMA_CONFIG.USE_DIRECT && isLocalhost(OLLAMA_CONFIG.SERVER_URL);
  const serverUrl = OLLAMA_CONFIG.SERVER_URL;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-full px-4">
      <Alert className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-lg">
        <AlertCircle className="h-5 w-5 text-orange-600" />
        <AlertTitle className="text-orange-900 flex items-center justify-between">
          <span className="font-semibold">AI Connection Required</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 hover:bg-orange-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="text-orange-800 mt-2">
          <p className="mb-3">
            {isDirectMode
              ? `Cannot connect to Ollama directly at ${serverUrl}. Make sure Ollama is running with CORS enabled.`
              : `Cannot connect to Ollama Cloud via Supabase Edge Function proxy. Check your API key and Edge Function status.`}
          </p>

          {isDirectMode && (
            <p className="text-xs mb-3 text-orange-700">
              You are using <strong>local Ollama</strong>. Start it with CORS enabled:
              <br />
              <code className="bg-orange-100 px-1 rounded">Windows: set OLLAMA_ORIGINS=* &amp;&amp; ollama serve</code>
              <br />
              <code className="bg-orange-100 px-1 rounded">macOS/Linux: OLLAMA_ORIGINS=* ollama serve</code>
            </p>
          )}

          {!isDirectMode && (
            <p className="text-xs mb-3 text-orange-700">
              You are using <strong>Ollama Cloud</strong> via Edge Function proxy.
              Make sure <code className="bg-orange-100 px-1 rounded">VITE_OLLAMA_API_KEY</code> is set in your <code className="bg-orange-100 px-1 rounded">.env</code> file and the Edge Function is deployed and running.
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={onOpenAdminPanel}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Open Admin Panel
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <a
                href="https://ollama.com/cloud"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ollama Cloud
              </a>
            </Button>
          </div>

          <p className="text-xs mt-3 text-orange-600">
            To switch to local Ollama, set <code className="bg-orange-100 px-1 rounded">VITE_OLLAMA_SERVER_URL=http://localhost:11434</code> in your environment.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
