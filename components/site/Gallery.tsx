'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeUp, imageReveal, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Category = 'Todos' | 'Cejas' | 'Labios' | 'Tatuajes';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  width: number;
  height: number;
}

const IMAGES: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800', alt: 'Tattoo Artist Work', category: 'Tatuajes', width: 800, height: 1200 },
  { id: '2', src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800', alt: 'Micropigmentation Brows', category: 'Cejas', width: 800, height: 800 },
  { id: '3', src: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?auto=format&fit=crop&q=80&w=800', alt: 'Tattoo Detail', category: 'Tatuajes', width: 800, height: 1000 },
  { id: '4', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', alt: 'Lips Micropigmentation', category: 'Labios', width: 800, height: 1100 },
  { id: '5', src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800', alt: 'Minimalist Tattoo', category: 'Tatuajes', width: 800, height: 800 },
  { id: '6', src: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=800', alt: 'Brows Close-up', category: 'Cejas', width: 800, height: 1200 },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory === 'Todos' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

  return (
    <section id="trabajo" className="py-24 px-6 bg-ink">
      <div className="max-w-(--content-wide) mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-display text-white mb-8 relative inline-block">
            Trabajos
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-2 left-0 h-px bg-gold"
            />
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {(['Todos', 'Cejas', 'Labios', 'Tatuajes'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-xs uppercase tracking-[0.2em] transition-all duration-300 pb-2 border-b-2 cursor-pointer",
                  activeCategory === cat 
                    ? "text-white border-gold" 
                    : "text-mist border-transparent hover:text-bone"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer break-inside-avoid rounded-sm overflow-hidden"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-[0.3em] text-white border border-white/20 px-4 py-2 backdrop-blur-sm">
                    Ver más
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-ink/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-10 right-10 text-white hover:text-gold transition-colors p-2 z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-full max-h-[85vh] object-contain"
                priority
              />
              <div className="mt-6 text-center">
                <p className="font-display text-xl text-white">{selectedImage.alt}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-gold mt-2">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
