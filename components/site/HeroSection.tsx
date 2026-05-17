// app/components/site/HeroSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 overflow-hidden">
      {/* Museumcore Hero Section */}
      {/* Massive Typographic Anchor */}
      <div className="relative z-20 max-w-450 mx-auto w-full px-4 md:px-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 overflow-hidden">
            <motion.div variants={fadeUp} className="grow">
              <p className="label-tech mb-4 md:mb-6 text-gold">
                Tatuadora / Blackwork & Fine Line
              </p>
              <h1 className="text-[12vw] md:text-ultra leading-[0.85] text-bone font-accent font-extrabold tracking-tighter wrap-break-words">
                Meli
              </h1>
              <h1 className="text-[12vw] md:text-ultra leading-[0.8] text-bone font-accent font-extrabold tracking-tighter  -mt-2 md:mt-0">
                <br className="md:hidden" /> Pedraza
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-md pb-4">
              <p className="font-display text-2xl md:text-4xl mb-6 md:mb-8 leading-none text-bone italic">
                El arte de lo sutil,
                <br /> grabado en la piel.
              </p>
              <p className="text-mist text-xs md:text-sm leading-relaxed mb-8 md:mb-10 max-w-70 font-body">
                Especialista en Micropigmentación avanzada y Tatuajes de línea
                fina. Un enfoque editorial para la belleza natural.
              </p>
              <Link
                href="/booking"
                className="group relative inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold font-bold transition-all"
              >
                <span className="relative z-10">Solicitar Cita</span>
                <div className="w-12 h-px bg-gold group-hover:w-20 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Artistic Background Macro Placeholder */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[120%] opacity-20 blur-[80px] bg-[radial-gradient(circle_at_center,var(--color-gold)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-obsidian to-transparent" />
      </div>

      {/* Technical Data Sidebar (Brutalist) - Hidden on small mobile */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 border-l border-smoke/30 pl-6 opacity-40 hover:opacity-100 transition-opacity">
        <div>
          <p className="label-tech mb-1">Coordinadas</p>
          <p className="text-label font-mono">32.8895° S, 68.8458° W</p>
        </div>
        <div>
          <p className="label-tech mb-1">Status</p>
          <p className="text-label font-mono uppercase">
            Disponibilidad Limitada
          </p>
        </div>
        <div>
          <p className="label-tech mb-1">Scroll</p>
          <div className="w-px h-20 bg-linear-to-b from-gold to-transparent mt-4" />
        </div>
      </div>
    </section>
  );
}
