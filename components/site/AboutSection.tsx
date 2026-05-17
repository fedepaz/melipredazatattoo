'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-48 px-12 bg-obsidian overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-48">
          {/* Artist Photo - Museum Frame */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-[35%] relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-ash">
              <Image
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800"
                alt="Meli Pedraza - Artist"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
            {/* Museum Label */}
            <div className="absolute -bottom-12 -right-8 bg-charcoal p-6 border border-smoke/30 shadow-2xl hidden md:block">
              <p className="label-tech text-gold mb-1">Autor</p>
              <p className="font-display text-white italic">Meli Pedraza, b. 1994</p>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-[50%] flex flex-col justify-center"
          >
            <p className="label-tech mb-8 text-gold">Manifesto Artístico</p>
            
            <h2 className="text-[clamp(3.5rem,8vw,7rem)] leading-none text-white mb-12">
              La Piel<br/>como<br/>Lienzo
            </h2>
            
            <div className="space-y-8 text-xl text-bone opacity-80 leading-relaxed font-body">
              <p>
                En el Obsidian Atelier, entendemos que cada marca en la piel es una narrativa silenciosa. Mi práctica se aleja de lo convencional para abrazar un enfoque editorial, donde la precisión técnica se encuentra con la intuición artística.
              </p>
              <p>
                Con una especialización en micro-realismo y estética facial avanzada, mi objetivo es destilar la esencia de la belleza natural, creando piezas que no solo decoran, sino que elevan la presencia de quien las porta.
              </p>
            </div>

            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
              {[
                { label: 'Certificación', val: 'Elite Academy' },
                { label: 'Estandar', val: 'Bio-Safety+' },
                { label: 'Ubicación', val: 'Estudio Privado' }
              ].map((spec) => (
                <div key={spec.label}>
                  <p className="label-tech mb-1">{spec.label}</p>
                  <p className="text-sm font-mono text-mist">{spec.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
