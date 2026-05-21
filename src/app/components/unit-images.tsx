import { useState } from 'react';
import { ArrowLeft, ImageIcon, Download, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { AppHeader } from './app-header';
import { Subject } from '../App';
import { Unit } from './units-dashboard';
import { loadUnitImages } from '../lib/unit-images-store';

interface User {
  name: string;
  email: string;
  grade: number;
  avatar?: string;
}

interface UnitImagesProps {
  subject: Subject;
  unit: Unit;
  user: User | null;
  onBack: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export function UnitImages({ subject, unit, user, onBack, onLogout, onOpenProfile }: UnitImagesProps) {
  const images = loadUnitImages(unit.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDownload = (image: string, index: number) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `${unit.title.replace(/\s+/g, '_')}_image_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        user={user}
        onLogout={onLogout}
        onOpenProfile={onOpenProfile}
        currentPage={`${subject.title} • ${unit.title}`}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/50 mb-4 sm:mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6 border-2 border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-primary/10">
              {subject.icon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                Unit Images
              </h1>
              <p className="text-sm text-muted-foreground font-semibold">
                {unit.title} &bull; {images.length} image{images.length !== 1 ? 's' : ''} uploaded
              </p>
            </div>
          </div>
        </motion.div>

        {/* Images Grid */}
        {images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-card rounded-2xl border-2 border-border"
          >
            <ImageIcon className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-foreground font-bold font-display mb-2">No images found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              This unit was created without image uploads, or the images were not saved.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="aspect-[4/3] relative cursor-pointer overflow-hidden bg-muted">
                  <img
                    src={image}
                    alt={`Uploaded page ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onClick={() => setSelectedImage(image)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-semibold">
                    Page {index + 1}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-lg"
                    onClick={() => handleDownload(image, index)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
