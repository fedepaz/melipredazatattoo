'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function BookingCTA() {
  return (
    <section className="relative py-48 px-12 overflow-hidden bg-linen">
      <div className="relative z-10 max-w-[1800px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
        >
          <div className="max-w-3xl">
            <p className="label-tech mb-8 text-clay">Application Request</p>
            <h2 className="text-[clamp(3rem,8vw,6rem)] text-obsidian leading-[0.9] mb-4">
              Comenzar una <br /><span className="italic font-display">Colaboración</span>
            </h2>
            <p className="text-xl text-obsidian/70 font-body max-w-xl leading-relaxed">
              Debido a la naturaleza personalizada de cada pieza, las citas son limitadas. Aplicar no garantiza un turno inmediato, sino el inicio de un proceso creativo compartido.
            </p>
          </div>
          
          <Link 
            href="/booking"
            className="group flex items-center justify-center bg-obsidian text-bone px-16 py-8 uppercase font-bold text-sm tracking-[0.3em] transition-all duration-700 hover:bg-gold hover:text-obsidian"
          >
            Aplicar Ahora
          </Link>
        </motion.div>
      </div>

      {/* Museum-style Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--color-clay) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
    </section>
  );
}
