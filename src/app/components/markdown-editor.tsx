import { useState } from 'react';
import { ArrowLeft, Save, Download, Edit3, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { AppHeader } from './app-header';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface MarkdownEditorProps {
  subject: Subject;
  unit: Unit;
  user: User | null;
  onBack: () => void;
  onSave: (markdown: string) => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  onNavigateHome?: () => void;
}

export function MarkdownEditor({ 
  subject, 
  unit, 
  user, 
  onBack, 
  onSave,
  onLogout,
  onOpenProfile,
  onNavigateHome
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(unit.content?.markdown || '');
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (value: string) => {
    setMarkdown(value);
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave(markdown);
    setIsSaved(true);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${unit.title.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple markdown renderer for preview
  const renderMarkdown = (text: string) => {
    // Split by newlines and process each line
    return text.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-foreground mb-4 mt-6">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-foreground mb-3 mt-5">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-foreground mb-2 mt-4">{line.substring(4)}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={i} className="text-foreground mb-2 mt-3">{line.substring(5)}</h4>;
      }
      
      // Lists
      if (line.match(/^[\*\-]\s/)) {
        return (
          <li key={i} className="text-foreground/80 ml-4">
            {line.substring(2)}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={i} className="text-foreground/80 ml-4 list-decimal">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      
      // Bold and italic (simple version)
      let content = line;
      content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={i} />;
      }
      
      // Regular paragraphs
      return (
        <p 
          key={i} 
          className="text-foreground/80 mb-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        user={user}
        onLogout={onLogout}
        onOpenProfile={onOpenProfile}
        onNavigateHome={onNavigateHome}
        currentPage={`${unit.title} • Source Markdown`}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Modules</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-foreground font-bold text-xl mb-1">Source Markdown</h1>
            <p className="text-sm text-muted-foreground">
              This is the structured content generated from your textbook images
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaved}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaved ? 'Saved' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <Card className="p-6 bg-card border-border">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="mt-0">
              <Textarea
                value={markdown}
                onChange={(e) => handleChange(e.target.value)}
                className="font-mono text-sm min-h-[600px] resize-none"
                placeholder="# Unit Title

## Section 1

Your content here..."
              />
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <div className="prose max-w-none border border-border rounded-lg p-6 bg-card min-h-[600px] overflow-auto">
                {markdown ? renderMarkdown(markdown) : (
                  <p className="text-muted-foreground">No content to preview</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Help Text */}
        <div className="mt-4 p-4 bg-secondary/5 border border-secondary/15 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>💡 Tip:</strong> This markdown file is the source for all other learning modules. 
            Edit it here to update the content, then other modules (vocabulary, exercises, etc.) can be 
            regenerated from this updated markdown.
          </p>
        </div>
      </main>
    </div>
  );
}