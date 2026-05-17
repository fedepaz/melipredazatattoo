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
  theme?: 'obsidian' | 'linen';
}

const ServiceSpread = ({ 
  title, 
  category, 
  description, 
  details, 
  imageSrc, 
  isReversed,
  theme = 'obsidian'
}: ServiceSpreadProps) => {
  return (
    <div className={cn(
      "flex flex-col lg:flex-row items-stretch min-h-[80vh]",
      isReversed && "lg:flex-row-reverse"
    )}>
      {/* Image Half */}
      <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-0 overflow-hidden group">
        <Image
          src={imageSrc}
          alt={title.replace('<br/>', ' ')}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-obsidian/20" />
      </div>

      {/* Content Half */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className={cn(
          "w-full lg:w-1/2 p-8 md:p-12 lg:p-32 flex flex-col justify-center",
          theme === 'linen' ? "bg-linen text-obsidian" : "bg-charcoal text-bone"
        )}
      >
        <p className="label-tech mb-6 text-gold">{category}</p>
        
        <h3 
          className={cn(
            "text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] mb-8 lg:mb-12",
            theme === 'linen' ? "text-obsidian" : "text-white"
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        
        <p className="font-body text-base lg:text-xl mb-12 lg:mb-16 leading-relaxed opacity-90 max-w-lg">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 lg:gap-y-8 mb-12 lg:mb-16 border-t border-smoke/20 pt-8 lg:pt-12">
          {details.map((detail, idx) => (
            <div key={idx}>
              <p className="label-tech mb-1 lg:mb-2">{detail.label}</p>
              <p className="font-accent text-lg lg:text-xl">{detail.value}</p>
            </div>
          ))}
        </div>

        <Link 
          href="/booking"
          className={cn(
            "group flex items-center gap-4 lg:gap-6 text-xs uppercase tracking-[0.3em] font-bold transition-all",
            theme === 'linen' ? "text-obsidian" : "text-gold"
          )}
        >
          <span>Consultar disponibilidad</span>
          <div className={cn(
            "w-8 lg:w-12 h-px transition-all duration-500 group-hover:w-20",
            theme === 'linen' ? "bg-obsidian" : "bg-gold"
          )} />
        </Link>
      </motion.div>
    </div>
  );
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="bg-obsidian overflow-hidden">
      <ServiceSpread
        category="Editorial Micro // 01"
        title="Diseño de<br/>Mirada"
        description="Nuestra técnica de micropigmentación de cejas redefine la estructura facial con una precisión hiper-realista. Buscamos la armonía orgánica, no la perfección artificial."
        imageSrc="https://images.unsplash.com/photo-1595152431008-886ec327f1c1?auto=format&fit=crop&q=80&w=1200"
        theme="linen"
        details={[
          { label: 'Método', value: 'Fine-Stroke' },
          { label: 'Pigmento', value: 'Mineral-Core' },
          { label: 'Sesión', value: '180 min' },
          { label: 'Vida', value: '1.5 años' }
        ]}
      />

      <ServiceSpread
        category="Editorial Micro // 02"
        title="Pigmentación<br/>Labial"
        description="Color y simetría destilados. Una infusión de pigmento que devuelve la vitalidad natural a los labios, creando un efecto de volumen y definition atemporal."
        imageSrc="https://images.unsplash.com/photo-1586790170054-2c6330bc981c?auto=format&fit=crop&q=80&w=1200"
        isReversed
        details={[
          { label: 'Técnica', value: 'Aquarelle' },
          { label: 'Saturación', value: 'Sutil' },
          { label: 'Cuidado', value: '7 días' },
          { label: 'Mantenimiento', value: 'Bianual' }
        ]}
      />

      <ServiceSpread
        category="Contemporary Ink // 03"
        title="Tatuaje de<br/>Línea Fina"
        description="El arte corporal como una extensión del alma. Composiciones botánicas y minimalismo gráfico ejecutados con estándares de galería."
        imageSrc="https://images.unsplash.com/photo-1590212151175-e58edd96185b?auto=format&fit=crop&q=80&w=1200"
        details={[
          { label: 'Estilo', value: 'Botánico' },
          { label: 'Aguja', value: 'Single-Needle' },
          { label: 'Estudio', value: 'Privado' },
          { label: 'Curación', value: 'Pro-Assist' }
        ]}
      />
    </section>
  );
}
