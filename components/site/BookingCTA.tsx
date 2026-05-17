'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export default function BookingCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-ink">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_50%)] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-display text-white mb-6 leading-tight">
            ¿Lista para tu próximo <span className="text-gold italic">tatuaje</span>?
          </h2>
          
          <p className="font-body text-mist text-lg md:text-xl uppercase tracking-[0.2em] mb-12">
            Elegí tu fecha y hora.
          </p>
          
          <Link 
            href="/booking"
            className="inline-block bg-gold hover:bg-gold-dim text-ink px-12 py-6 uppercase font-bold text-sm tracking-[0.2em] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-2xl rounded-sm"
          >
            Reservar mi turno
          </Link>
        </motion.div>
      </div>

      {/* Subtle Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-smoke to-transparent" />
    </section>
  );
}
