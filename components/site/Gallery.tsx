'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Category = 'Todos' | 'Cejas' | 'Labios' | 'Tatuajes';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  width: number;
  height: number;
  span: string; // Tailwind grid span classes
}

const IMAGES: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800', alt: 'Fine Line Art', category: 'Tatuajes', width: 800, height: 1200, span: 'md:col-span-8 md:row-span-2' },
  { id: '2', src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800', alt: 'Precision Brows', category: 'Cejas', width: 800, height: 800, span: 'md:col-span-4 md:row-span-1' },
  { id: '3', src: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?auto=format&fit=crop&q=80&w=800', alt: 'Minimalist Detail', category: 'Tatuajes', width: 800, height: 1000, span: 'md:col-span-4 md:row-span-1' },
  { id: '4', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', alt: 'Velvet Lips', category: 'Labios', width: 800, height: 1100, span: 'md:col-span-4 md:row-span-2' },
  { id: '5', src: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800', alt: 'Ink Texture', category: 'Tatuajes', width: 800, height: 800, span: 'md:col-span-8 md:row-span-1' },
  { id: '6', src: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=800', alt: 'Editorial Close-up', category: 'Cejas', width: 800, height: 1200, span: 'md:col-span-4 md:row-span-1' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeCategory === 'Todos' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

  return (
    <section id="trabajo" className="py-24 md:py-32 px-6 md:px-12 bg-obsidian transition-colors duration-500">
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8"
        >
          <div>
            <p className="label-tech mb-4">Curated Selection</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-bone font-display italic">Archivo_Visual</h2>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8">
            {(['Todos', 'Cejas', 'Labios', 'Tatuajes'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.3em] transition-all duration-500 pb-2 border-b font-mono cursor-pointer",
                  activeCategory === cat 
                    ? "text-gold border-gold" 
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
          className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] md:auto-rows-[450px] gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={cn(
                  "relative group cursor-pointer overflow-hidden bg-ash",
                  image.span
                )}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Meta Hover */}
                <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                  <p className="label-tech text-white mb-2">{image.category}</p>
                  <p className="font-display text-xl md:text-2xl text-gold italic">{image.alt}</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 bg-obsidian/98 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 md:top-12 md:right-12 text-bone hover:text-gold transition-colors z-[110]">
              <X size={24} />
            </button>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] md:h-[70vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-8 md:mt-12 text-center max-w-xl">
                <p className="label-tech text-gold mb-4">{selectedImage.category} // Spec 00{selectedImage.id}</p>
                <h3 className="text-3xl md:text-4xl text-bone mb-4 md:mb-6 leading-none uppercase tracking-tighter italic font-display">{selectedImage.alt}</h3>
                <p className="text-mist text-xs md:text-sm leading-relaxed px-4">
                  Capturado en el Obsidian Atelier. Cada pieza es un testimonio de la precisión y el compromiso con la estética atemporal.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
