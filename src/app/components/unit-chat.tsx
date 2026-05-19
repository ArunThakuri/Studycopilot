import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { generateChatResponse } from '../lib/ai-service';
import { getCurrentProvider } from '../lib/ai-provider';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UnitChatProps {
  unitTitle: string;
  markdownContent: string;
  embedded?: boolean;
}

export function UnitChat({ unitTitle, markdownContent, embedded = false }: UnitChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(getCurrentProvider());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const provider = getCurrentProvider();
    setCurrentProvider(provider);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const shouldShowWelcome = embedded || (isOpen && messages.length === 0);
    if (shouldShowWelcome && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `Hi! I'm your AI study assistant for **${unitTitle}**. I can help you understand the concepts from this unit. Feel free to ask me any questions!`,
          timestamp: new Date(),
        },
        {
          role: 'assistant',
          content: '✨ Using **Ollama AI** (Kimi 2.6)',
          timestamp: new Date(),
        },
      ]);
    }
  }, [embedded, isOpen, unitTitle, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter(msg => !msg.content.startsWith('✨') && !msg.content.startsWith('ℹ️'))
        .map(msg => ({ role: msg.role, content: msg.content }));

      const answer = await generateChatResponse(userMessage.content, markdownContent, unitTitle, conversationHistory);

      setMessages((prev) => [...prev, { role: 'assistant', content: answer, timestamp: new Date() }]);
    } catch (error: any) {
      console.error('[CHAT] Error:', error);
      const errorMsg = error?.message || 'Unknown error';
      let userFriendlyMessage = '';

      if (errorMsg.includes('rate limit') || errorMsg.includes('quota') || errorMsg.includes('429')) {
        userFriendlyMessage = '⚠️ **Rate limit reached.** Please wait a moment and try again.';
        toast.error('Rate limit exceeded. Try again in a few minutes.');
      } else {
        userFriendlyMessage = '⚠️ **Something went wrong.** Please check your Ollama server connection and try again.';
        toast.error('Failed to get response from AI');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: userFriendlyMessage, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!embedded && !isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    );
  }

  const chatInterface = (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                <div className={`text-[10px] mt-1.5 font-semibold ${message.role === 'user' ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground font-semibold">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t-2 border-border/50">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 rounded-xl border-border/50"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-gradient-to-br from-primary to-secondary text-white hover:opacity-90 rounded-xl">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </>
  );

  if (embedded) {
    return <div className="h-full flex flex-col bg-card">{chatInterface}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-6 w-96 h-[580px] bg-card rounded-2xl shadow-2xl shadow-primary/5 flex flex-col z-50 border-2 border-primary/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold font-display text-white">AI Study Assistant</h3>
            <p className="text-xs text-white/60 font-semibold">Ollama - Kimi 2.6</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>
      {chatInterface}
    </motion.div>
  );
}
