import Link from 'next/link';
import Gallery from '@/components/site/Gallery';
import ServicesSection from '@/components/site/ServicesSection';
import AboutSection from '@/components/site/AboutSection';
import BookingCTA from '@/components/site/BookingCTA';

export default function Home() {
  return (
    <div className="bg-ink min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-hero text-white mb-8 tracking-tight leading-none animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
            Meli Pedraza
          </h1>
          
          <p className="font-body text-mist text-lg md:text-xl uppercase tracking-[0.3em] mb-16 animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000 ease-out">
            Tatuajes & Micropigmentación
          </p>
          
          <Link 
            href="/booking"
            className="inline-block bg-gold hover:bg-gold-dim text-ink px-10 py-5 uppercase font-bold text-sm tracking-[0.2em] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer rounded-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 delay-500 duration-1000 ease-out"
          >
            Reservá tu turno
          </Link>
        </div>
        
        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-40 animate-pulse">
          <span className="text-[10px] uppercase tracking-[0.4em] text-mist font-medium">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
        </div>

        {/* Background Texture/Gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Final Booking CTA */}
      <BookingCTA />
    </div>
  );
}
