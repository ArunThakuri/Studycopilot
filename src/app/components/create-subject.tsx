import { useState } from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { generateSlug } from '../lib/routing';

interface Subject {
  id: string;
  title: string;
  icon: string;
  color: string;
  grade: number;
  publication?: string;
  author?: string;
  units: string[];
  slug?: string;
}

interface CreateSubjectProps {
  userGrade: number;
  onBack: () => void;
  onCreate: (subject: Subject) => void;
}

export function CreateSubject({ userGrade, onBack, onCreate }: CreateSubjectProps) {
  const [formData, setFormData] = useState({ title: '', publication: '', author: '', grade: userGrade });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error('Please enter a subject title'); return; }

    const newSubject: Subject = {
      id: `subject-${Date.now()}`,
      title: formData.title,
      icon: '📚',
      color: '#8B5CF6',
      grade: formData.grade,
      publication: formData.publication,
      author: formData.author,
      units: [],
      slug: generateSlug(formData.title),
    };

    onCreate(newSubject);
    toast.success(`Subject "${formData.title}" created successfully!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/70 backdrop-blur-2xl border-b-2 border-primary/10">
        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-xl">
            <ArrowLeft className="w-4 h-4" />Back
          </Button>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📚</span>
            <h1 className="text-foreground font-bold font-display text-lg">Create New Subject</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-2 border-border rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Subject Title *</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Mathematics, Science, English" className="bg-input-background border-border rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" type="number" min="1" max="12" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) || userGrade })} className="bg-input-background border-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publication">Publication (Optional)</Label>
                <Input id="publication" value={formData.publication} onChange={(e) => setFormData({ ...formData, publication: e.target.value })} placeholder="e.g., CDC Nepal" className="bg-input-background border-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author (Optional)</Label>
                <Input id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} placeholder="e.g., Dr. Smith" className="bg-input-background border-border rounded-xl" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display">Create Subject</Button>
                <Button type="button" variant="outline" onClick={onBack} className="flex-1 border-border rounded-xl">Cancel</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
