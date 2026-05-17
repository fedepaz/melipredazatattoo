'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ServiceSpreadProps {
  title: string;
  category: string;
  description: string;
  details: { label: string; value: string }[];
  imageSrc: string;
  isReversed?: boolean;
  accentColor?: string;
}

const ServiceSpread = ({ 
  title, 
  category, 
  description, 
  details, 
  imageSrc, 
  isReversed,
  accentColor 
}: ServiceSpreadProps) => {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center",
      isReversed && "md:flex-row-reverse"
    )}>
      {/* Image Half */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 hover:scale-105"
          sizes="50vw"
        />
      </div>

      {/* Content Half */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className={cn(
          "w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-charcoal",
          accentColor === 'cream' && "bg-cream text-ink"
        )}
      >
        <span className={cn(
          "text-xs uppercase tracking-[0.3em] mb-4 font-medium",
          accentColor === 'cream' ? "text-mist" : "text-gold"
        )}>
          {category}
        </span>
        
        <h3 className={cn(
          "text-display mb-8",
          accentColor === 'cream' ? "text-ink" : "text-white"
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-lg mb-12 leading-relaxed opacity-90",
          accentColor === 'cream' ? "text-ink/80" : "text-bone"
        )}>
          {description}
        </p>

        <div className="grid grid-cols-2 gap-8 mb-12">
          {details.map((detail, idx) => (
            <div key={idx}>
              <p className={cn(
                "text-[10px] uppercase tracking-widest mb-1",
                accentColor === 'cream' ? "text-mist" : "text-gold"
              )}>
                {detail.label}
              </p>
              <p className="font-medium">{detail.value}</p>
            </div>
          ))}
        </div>

        <Link 
          href="/booking"
          className={cn(
            "inline-block border px-8 py-4 uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300 w-fit",
            accentColor === 'cream' 
              ? "border-ink text-ink hover:bg-ink hover:text-white" 
              : "border-gold text-gold hover:bg-gold hover:text-ink"
          )}
        >
          Reservar turno →
        </Link>
      </motion.div>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="bg-ink overflow-hidden">
      <ServiceSpread
        category="Estética Facial"
        title="Micropigmentación de Cejas"
        description="Técnica avanzada para definir y realzar la mirada de forma natural. Utilizamos pigmentos orgánicos de alta calidad adaptados a tu tono de piel y vello."
        imageSrc="https://images.unsplash.com/photo-1595152431008-886ec327f1c1?auto=format&fit=crop&q=80&w=1200"
        accentColor="cream"
        details={[
          { label: 'Técnica', value: 'Microblading / Shading' },
          { label: 'Duración', value: '2 a 3 horas' },
          { label: 'Curación', value: '7 a 10 días' },
          { label: 'Efecto', value: '12 a 18 meses' }
        ]}
      />

      <ServiceSpread
        category="Estética Facial"
        title="Micropigmentación de Labios"
        description="Dale vida, color y simetría a tus labios. Una técnica sutil para un aspecto saludable y definido que resalta tu belleza natural todos los días."
        imageSrc="https://images.unsplash.com/photo-1586790170054-2c6330bc981c?auto=format&fit=crop&q=80&w=1200"
        isReversed
        details={[
          { label: 'Técnica', value: 'Aquarelle Lips' },
          { label: 'Duración', value: '2 horas' },
          { label: 'Curación', value: '5 a 7 días' },
          { label: 'Efecto', value: '1 a 2 años' }
        ]}
      />

      <ServiceSpread
        category="Arte Corporal"
        title="Tatuajes Personalizados"
        description="Diseños únicos que cuentan tu historia. Especialidad en líneas finas, micro-realismo y composiciones botánicas con un enfoque artístico y delicado."
        imageSrc="https://images.unsplash.com/photo-1590212151175-e58edd96185b?auto=format&fit=crop&q=80&w=1200"
        details={[
          { label: 'Estilos', value: 'Fine Line / Blackwork' },
          { label: 'Consulta', value: 'Vía WhatsApp' },
          { label: 'Higiene', value: 'Estándar Hospitalario' },
          { label: 'Cuidado', value: 'Seguimiento personalizado' }
        ]}
      />
    </section>
  );
}
