import { useState, useRef } from 'react';
import { User, Settings as SettingsIcon, Download, Upload, Trash2, ArrowLeft, Shield, Check, ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { Subject } from '../App';
import { AppHeader } from './app-header';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { cn } from './ui/utils';
import { motion } from 'motion/react';

const NEPAL_DISTRICTS = [
  "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusha", "Dolakha", "Dolpa", "Doti", "Eastern Rukum", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parasi", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Terhathum", "Udayapur", "Western Rukum"
].sort();

interface UserType {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
  isAdmin?: boolean;
  district?: string;
  school?: string;
  dateOfBirth?: string;
}

interface ProfileProps {
  user: UserType | null;
  onBack: () => void;
  onDeleteAccount: () => void;
  stats: { subjects: number; totalUnits: number; completed: number; progress: number };
  subjects: Subject[];
  onImportData: (subjects: Subject[]) => void;
  onOpenAdmin?: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  onUpdateUser?: (userData: Partial<UserType>) => void;
}

export function Profile({ user, onBack, onDeleteAccount, stats, subjects, onImportData, onOpenAdmin, onLogout, onOpenProfile, onUpdateUser }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'settings' | 'data'>('account');
  const [editMode, setEditMode] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', grade: user?.grade || 9,
    district: user?.district || '', school: user?.school || '', dateOfBirth: user?.dateOfBirth || '',
  });
  const [profileImage, setProfileImage] = useState(user?.avatar || '');
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'JD';

  const handleSave = () => {
    if (onUpdateUser) onUpdateUser({ ...formData, avatar: profileImage });
    toast.success('Profile updated successfully!');
    setEditMode(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(subjects, null, 2);
    const url = URL.createObjectURL(new Blob([dataStr], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `studycopilot-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try { onImportData(JSON.parse(e.target?.result as string)); }
      catch { toast.error('Failed to import data. Please check the file format.'); }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'settings' as const, label: 'Settings', icon: SettingsIcon },
    { id: 'data' as const, label: 'Data & Privacy', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader user={user} onLogout={onLogout} onOpenProfile={onOpenProfile} onNavigateHome={onBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-card rounded-2xl border-2 border-border p-6 flex flex-col h-full min-h-[500px]">
              <div className="flex flex-col items-center mb-8 relative">
                <div className="relative">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20 shadow-lg shadow-primary/10 rounded-full">
                    {profileImage ? (
                      <img src={profileImage} alt={user?.name || 'Profile'} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold font-display">{initials}</AvatarFallback>
                    )}
                  </Avatar>
                  {editMode && (
                    <button onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-4 right-0 w-8 h-8 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
                      <Upload className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                <h2 className="text-foreground font-bold font-display text-center text-lg mt-2">{formData.name || 'Student'}</h2>
                <p className="text-sm text-muted-foreground text-center mb-3 font-semibold">{formData.email || ''}</p>
                <div className="h-7 px-4 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center border-2 border-primary/20">Grade {formData.grade || 9}</div>
              </div>

              <div className="space-y-1.5 flex-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                      activeTab === tab.id ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}>
                    <tab.icon className="w-4.5 h-4.5" /><span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              {onOpenAdmin && (
                <div className="pt-6 mt-auto">
                  <Button onClick={onOpenAdmin} variant="outline" className="w-full border-2 border-secondary/30 text-secondary hover:bg-secondary hover:text-white rounded-xl font-display font-semibold">
                    <Shield className="w-4 h-4 mr-2" />Admin Panel
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'account' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-foreground font-bold font-display text-lg">Account Information</h3>
                  {!editMode && (
                    <Button onClick={() => setEditMode(true)} variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-xl font-semibold">Edit Profile</Button>
                  )}
                </div>

                <div className="space-y-6">
                  {[{ id: 'name', label: 'Full Name', type: 'text' },
                    { id: 'email', label: 'Email Address', type: 'email' },
                  ].map(field => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id} className="text-foreground font-bold">{field.label}</Label>
                      {editMode ? (
                        <Input id={field.id} type={field.type} value={(formData as any)[field.id]} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} className="bg-input-background border-2 border-border rounded-xl" />
                      ) : (
                        <div className="text-foreground px-3 py-2.5 bg-muted rounded-xl text-sm font-semibold">{(formData as any)[field.id]}</div>
                      )}
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-foreground font-bold">Grade Level</Label>
                    {editMode ? (
                      <Select value={formData.grade.toString()} onValueChange={(value) => setFormData({ ...formData, grade: parseInt(value) })}>
                        <SelectTrigger className="bg-input-background border-2 border-border rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-card border-2 border-border rounded-xl">{[6,7,8,9,10,11,12].map(g => <SelectItem key={g} value={g.toString()}>Grade {g}</SelectItem>)}</SelectContent>
                      </Select>
                    ) : <div className="text-foreground px-3 py-2.5 bg-muted rounded-xl text-sm font-semibold">Grade {formData.grade}</div>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-foreground font-bold">District</Label>
                      {editMode ? (
                        <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={districtOpen} className="w-full justify-between bg-input-background border-2 border-border rounded-xl font-semibold">
                              {formData.district ? NEPAL_DISTRICTS.find(d => d === formData.district) : "Select district..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border-2 border-border" align="start">
                            <Command>
                              <CommandInput placeholder="Search district..." />
                              <CommandList className="max-h-[250px]"><CommandEmpty>No district found.</CommandEmpty>
                                <CommandGroup>{NEPAL_DISTRICTS.map(district => (
                                  <CommandItem key={district} value={district} onSelect={(currentValue) => {
                                    const original = NEPAL_DISTRICTS.find(d => d.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                    setFormData({ ...formData, district: original === formData.district ? "" : original });
                                    setDistrictOpen(false);
                                  }}>
                                    <Check className={cn("mr-2 h-4 w-4", formData.district === district ? "opacity-100" : "opacity-0")} />{district}
                                  </CommandItem>
                                ))}</CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      ) : <div className="text-foreground px-3 py-2.5 bg-muted rounded-xl text-sm h-10 flex items-center font-semibold">{formData.district || 'Not specified'}</div>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-foreground font-bold">Date of Birth</Label>
                      {editMode ? (
                        <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="bg-input-background border-2 border-border rounded-xl" />
                      ) : <div className="text-foreground px-3 py-2.5 bg-muted rounded-xl text-sm font-semibold">{formData.dateOfBirth || 'Not specified'}</div>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-foreground font-bold">School/College Name</Label>
                    {editMode ? (
                      <Input id="school" placeholder="Enter your school or college name" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} className="bg-input-background border-2 border-border rounded-xl" />
                    ) : <div className="text-foreground px-3 py-2.5 bg-muted rounded-xl text-sm font-semibold">{formData.school || 'Not specified'}</div>}
                  </div>

                  {/* Learning Progress */}
                  <div className="mt-8 pt-8 border-t-2 border-border">
                    <h4 className="text-foreground font-bold font-display mb-6">Learning Progress</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[{ label: 'Active Subjects', value: stats.subjects, gradient: 'from-primary/10 to-secondary/5', border: 'border-primary/20' },
                        { label: 'Total Units', value: stats.totalUnits, gradient: 'from-secondary/10 to-primary/5', border: 'border-secondary/20' },
                        { label: 'Completed Units', value: stats.completed, gradient: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20' },
                      ].map(s => (
                        <div key={s.label} className={`bg-gradient-to-br ${s.gradient} border-2 ${s.border} rounded-2xl p-5`}>
                          <div className="text-3xl font-bold font-display text-foreground mb-1">{s.value}</div>
                          <div className="text-sm text-muted-foreground font-semibold">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground font-semibold">Overall Progress</span>
                        <span className="text-sm font-bold text-foreground">{stats.progress}%</span>
                      </div>
                      <Progress value={stats.progress} className="h-2.5 rounded-full" />
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex gap-3 pt-6">
                      <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 rounded-xl font-display font-semibold">Save Changes</Button>
                      <Button onClick={() => { setEditMode(false); setFormData({ name: user?.name || '', email: user?.email || '', grade: user?.grade || 9, district: user?.district || '', school: user?.school || '', dateOfBirth: user?.dateOfBirth || '' }); setProfileImage(user?.avatar || ''); }} variant="outline" className="flex-1 border-2 border-border rounded-xl font-semibold">Cancel</Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-6 sm:p-8">
                <h3 className="text-foreground font-bold font-display text-lg mb-8">Notification Settings</h3>
                <div className="space-y-6">
                  {[
                    { key: 'email' as const, title: 'Email Notifications', desc: 'Receive study reminders via email' },
                    { key: 'push' as const, title: 'Push Notifications', desc: 'Get notified about new content' },
                    { key: 'weekly' as const, title: 'Weekly Summary', desc: 'Get a weekly progress report' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-2">
                      <div><div className="text-foreground font-bold">{item.title}</div><div className="text-sm text-muted-foreground mt-0.5 font-semibold">{item.desc}</div></div>
                      <Switch checked={notifications[item.key]} onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border-2 border-border p-6 sm:p-8">
                  <h3 className="text-foreground font-bold font-display text-lg mb-6">Data Management</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Export Your Data', desc: 'Download all your subjects and progress', action: handleExportData, icon: Download, label: 'Export' },
                      { title: 'Import Data', desc: 'Restore from a backup file', action: () => fileInputRef.current?.click(), icon: Upload, label: 'Import' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between p-4 border-2 border-border rounded-2xl">
                        <div><div className="text-foreground font-bold">{item.title}</div><div className="text-sm text-muted-foreground font-semibold">{item.desc}</div></div>
                        <Button onClick={item.action} variant="outline" className="border-2 border-border rounded-xl font-semibold"><item.icon className="w-4 h-4 mr-2" />{item.label}</Button>
                      </div>
                    ))}
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border-2 border-destructive/20 p-6 sm:p-8">
                  <h3 className="text-destructive font-bold font-display text-lg mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div><div className="text-foreground font-bold">Delete Account</div><div className="text-sm text-muted-foreground font-semibold">Permanently delete your account and all data</div></div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="destructive" className="rounded-xl font-semibold"><Trash2 className="w-4 h-4 mr-2" />Delete Account</Button></AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-2 border-border rounded-2xl">
                        <AlertDialogHeader><AlertDialogTitle className="text-foreground font-display">Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription className="text-muted-foreground font-semibold">This action cannot be undone. This will permanently delete your account and remove all your data from our servers.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-2 border-border rounded-xl font-semibold">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={onDeleteAccount} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-semibold">Delete Account</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
