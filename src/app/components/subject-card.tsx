import { BookOpen, Circle, MoreVertical, Edit, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

interface SubjectCardProps {
  title: string;
  units: number;
  completed: number;
  progress: number;
  badge?: string;
  icon?: string;
  color?: string;
  grade?: number;
  onClick?: () => void;
  onEdit?: (newTitle: string) => void;
  onDelete?: () => void;
  viewMode?: 'card' | 'list';
}

export function SubjectCard({ title, units, completed, progress, badge, icon, color, grade, onClick, onEdit, onDelete, viewMode = 'card' }: SubjectCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEdit = () => { setEditedTitle(title); setTimeout(() => setShowEditDialog(true), 10); };
  const handleDelete = () => { setTimeout(() => setShowDeleteDialog(true), 10); };
  const confirmEdit = () => { if (editedTitle.trim() && onEdit) onEdit(editedTitle.trim()); setShowEditDialog(false); };
  const confirmDelete = () => { if (onDelete) onDelete(); setShowDeleteDialog(false); };

  const Dialogs = () => (
    <>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="rounded-2xl border-2 border-primary/10">
          <DialogHeader><DialogTitle className="font-display">Edit Subject</DialogTitle><DialogDescription>Update the name of your subject.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label htmlFor="sn">Subject Name</Label><Input id="sn" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="rounded-xl" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowEditDialog(false)} className="rounded-xl">Cancel</Button><Button onClick={confirmEdit} disabled={!editedTitle.trim()} className="rounded-xl">Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-2xl border-2 border-destructive/10">
          <AlertDialogHeader><AlertDialogTitle className="font-display">Delete Subject?</AlertDialogTitle><AlertDialogDescription>This permanently deletes "{title}" and all {units} units.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90 rounded-xl">Delete</AlertDialogAction></AlertDialogFooter>
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
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
              {icon || <BookOpen className="w-7 h-7 text-primary" />}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-foreground font-bold font-display">{title}</h3>
              {badge && <Badge className="bg-primary/10 text-primary font-bold rounded-full">{badge}</Badge>}
            </div>
            {grade !== undefined && <p className="text-xs text-muted-foreground mb-1">Grade {grade}</p>}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1"><Circle className="w-3 h-3 fill-amber-400 text-amber-400" /><span>{units} units</span></div>
              <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /><span>{completed} done</span></div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={progress} className="h-2 flex-1 rounded-full" />
              <span className="text-xs font-bold text-muted-foreground w-10 text-right">{progress}%</span>
            </div>
          </div>
          <div className="flex-shrink-0">
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
        </motion.div>
        <Dialogs />
      </>
    );
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="p-8 relative" style={{ background: `linear-gradient(135deg, ${color || '#FF6B6B'}dd, ${color || '#8B5CF6'})` }}>
          {badge && <Badge className="absolute top-4 left-4 bg-white/90 text-primary font-bold rounded-full">{badge}</Badge>}
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-all backdrop-blur-sm">
                <MoreVertical className="w-4 h-4 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onSelect={handleEdit}><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleDelete} className="text-destructive"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex justify-center mt-4 text-5xl" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
            {icon || <BookOpen className="w-14 h-14 text-white" strokeWidth={1.5} />}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-foreground font-bold font-display text-lg mb-0.5">{title}</h3>
          {grade !== undefined && <p className="text-xs text-muted-foreground mb-3">Grade {grade}</p>}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1 font-semibold"><Circle className="w-3 h-3 fill-amber-400 text-amber-400" />{units} units</div>
            <span className="font-semibold">✓ {completed} done</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground"><span>Progress</span><span>{progress}%</span></div>
            <Progress value={progress} className="h-2.5 rounded-full" />
          </div>
        </div>
      </motion.div>
      <Dialogs />
    </>
  );
}
