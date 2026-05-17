'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-24 px-6 bg-ink overflow-hidden">
      <div className="max-w-(--content-max) mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          {/* Artist Photo */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full md:w-[40%] aspect-[3/4] relative"
          >
            <div className="absolute inset-0 border border-gold translate-x-4 translate-y-4 z-0" />
            <div className="relative z-10 w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800"
                alt="Meli Pedraza - Artist"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full md:w-[60%] flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-mist mb-4 font-medium">
              La artista
            </span>
            
            <h2 className="text-display text-white mb-8">
              Meli Pedraza
            </h2>
            
            <div className="w-20 h-px bg-gold mb-8" />
            
            <div className="space-y-6 text-lg text-bone opacity-90 leading-relaxed">
              <p>
                Con más de 8 años de experiencia en el mundo del arte corporal, mi enfoque se centra en la sutileza y la elegancia de cada trazo. Creo firmemente que cada tatuaje y cada procedimiento de micropigmentación es una colaboración artística única.
              </p>
              <p>
                Especializada en técnicas de línea fina y micro-realismo, busco siempre resaltar la belleza natural de mis clientes, ya sea a través de un diseño botánico delicado o realzando los rasgos faciales con precisión milimétrica.
              </p>
              <p>
                Mi estudio es un espacio de calma y profesionalismo, donde la higiene y el cuidado del detalle son mi máxima prioridad. Cada sesión es una experiencia dedicada a transformar tu visión en una obra de arte duradera.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              {['Certificación Internacional', 'Higiene Hospitalaria', 'Insumos Vegan-Friendly'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-ash border border-smoke text-xs uppercase tracking-widest text-mist rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
