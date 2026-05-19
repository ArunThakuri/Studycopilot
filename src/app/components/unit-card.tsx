import { Play, Sparkles, MoreVertical, Edit, Trash2, CheckCircle2, X as XIcon, ImageIcon, FileAudio, BookType, FileText, Lightbulb, Brain } from 'lucide-react';
import { Badge } from './ui/badge';
import { Unit } from './units-dashboard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface UnitCardProps {
  unit: Unit;
  onClick: () => void;
  onEdit?: (newTitle: string, images?: File[], markdownFile?: File, markdownContent?: string) => void;
  onDelete?: () => void;
  onAcceptSuggestion?: (unitId: string) => void;
  onRejectSuggestion?: (unitId: string) => void;
  viewMode?: 'card' | 'list';
}

export function UnitCard({ unit, onClick, onEdit, onDelete, onAcceptSuggestion, onRejectSuggestion, viewMode = 'card' }: UnitCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState(unit.title);

  const handleEdit = () => { setEditedTitle(unit.title); setTimeout(() => setShowEditDialog(true), 10); };
  const handleDelete = () => { setTimeout(() => setShowDeleteDialog(true), 10); };

  const confirmEdit = async () => {
    if (editedTitle.trim() && onEdit) {
      onEdit(editedTitle.trim());
      toast.success('Unit updated!', { description: 'The unit name has been changed.' });
    }
    setShowEditDialog(false);
  };

  const confirmDelete = () => { if (onDelete) onDelete(); setShowDeleteDialog(false); };

  const handleAcceptSuggestion = (e: React.MouseEvent) => { e.stopPropagation(); if (onAcceptSuggestion) onAcceptSuggestion(unit.id); };
  const handleRejectSuggestion = (e: React.MouseEvent) => { e.stopPropagation(); if (onRejectSuggestion) onRejectSuggestion(unit.id); };

  const getAvailableModules = () => {
    const modules = [];
    if (unit.content) {
      const isModuleComplete = (moduleData: any) => {
        if (!moduleData) return false;
        if (typeof moduleData === 'object' && 'status' in moduleData) return moduleData.status === 'completed';
        return !!moduleData;
      };
      if (unit.content.unitText) modules.push({ label: 'Text', icon: BookType, color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' });
      if (isModuleComplete(unit.content.audioLesson)) modules.push({ label: 'Audio', icon: FileAudio, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' });
      if (isModuleComplete(unit.content.vocabulary)) modules.push({ label: 'Vocab', icon: BookType, color: 'bg-primary/10 text-primary' });
      if (isModuleComplete(unit.content.summary)) modules.push({ label: 'Summary', icon: FileText, color: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' });
      if (isModuleComplete(unit.content.exercises)) modules.push({ label: 'Exercises', icon: Lightbulb, color: 'bg-secondary/10 text-secondary' });
    }
    return modules;
  };

  const availableModules = getAvailableModules();
  const isCompleted = unit.progress === 100;

  const Dialogs = () => (
    <>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="rounded-2xl border-2 border-primary/10">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Unit</DialogTitle>
            <DialogDescription>Update the unit name.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="unit-name">Unit Name</Label>
              <Input id="unit-name" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} placeholder="Enter unit name" className="rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={confirmEdit} disabled={!editedTitle.trim()} className="rounded-xl">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()} className="rounded-2xl border-2 border-destructive/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete Unit?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes "Unit {unit.number}: {unit.title}" and all its learning modules. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90 rounded-xl">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  if (viewMode === 'list') {
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.01, x: 4 }}
          className="bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer flex items-center gap-4 p-4"
          onClick={onClick}
        >
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold font-display bg-gradient-to-br from-secondary to-primary text-white">
              {unit.number}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-foreground font-bold font-display mb-1">{unit.title}</h3>
                {unit.suggestedTitle && (
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                    <p className="text-xs text-primary font-medium">AI suggests: {unit.suggestedTitle}</p>
                    <button onClick={handleAcceptSuggestion} className="w-5 h-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transition-all">
                      <CheckCircle2 className="w-3 h-3" />
                    </button>
                    <button onClick={handleRejectSuggestion} className="w-5 h-5 bg-muted hover:bg-muted-foreground/30 text-muted-foreground rounded-full flex items-center justify-center transition-all">
                      <XIcon className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /><span>{unit.imageCount || 0} images</span></div>
                  <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /><span className="text-primary font-semibold">Completed</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {isCompleted && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <button className="bg-muted hover:bg-accent rounded-xl p-2 transition-all"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem onSelect={handleEdit}><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDelete} className="text-destructive"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {availableModules.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {availableModules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <Badge key={index} variant="secondary" className={`${module.color} border-0 font-semibold rounded-full`}>
                      <Icon className="w-3 h-3 mr-1" />{module.label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 flex-shrink-0 rounded-xl font-display" onClick={onClick}>
            <Play className="w-4 h-4 mr-2" />Enter
          </Button>
        </motion.div>
        <Dialogs />
      </>
    );
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }} className="space-y-0">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-secondary to-primary p-6 rounded-t-2xl flex items-center justify-between">
          <h3 className="text-white font-bold font-display text-lg">Unit {unit.number}</h3>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="p-2 hover:bg-white/20 rounded-xl transition-all">
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem onSelect={handleEdit}><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                <DropdownMenuItem onSelect={handleDelete} className="text-destructive"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-card p-6 rounded-b-2xl border-2 border-t-0 border-border cursor-pointer hover:border-primary/20 hover:shadow-lg transition-all" onClick={onClick}>
          <h3 className="text-foreground font-bold font-display text-lg mb-4">{unit.title}</h3>

          {unit.suggestedTitle && (
            <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary font-semibold mb-1">AI Suggested:</p>
                  <p className="text-sm text-primary/80">{unit.suggestedTitle}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={handleAcceptSuggestion} className="w-7 h-7 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button onClick={handleRejectSuggestion} className="w-7 h-7 bg-muted hover:bg-muted-foreground/30 text-muted-foreground rounded-full flex items-center justify-center transition-all">
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
              <ImageIcon className="w-4 h-4" /><span>{unit.imageCount || 0} images</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-semibold">Completed</span>
            </div>
          </div>

          {availableModules.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground font-semibold mb-2">Available modules:</p>
              <div className="flex flex-wrap gap-2">
                {availableModules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <Badge key={index} variant="secondary" className={`${module.color} border-0 font-semibold rounded-full`}>
                      <Icon className="w-3 h-3 mr-1" />{module.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display" onClick={onClick}>
            <Play className="w-4 h-4 mr-2" />Enter Unit
          </Button>
        </div>
      </motion.div>
      <Dialogs />
    </>
  );
}
