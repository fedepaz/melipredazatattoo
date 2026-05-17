'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        isScrolled 
          ? 'py-4 bg-ash/80 backdrop-blur-xl border-b border-smoke' 
          : 'py-8 bg-transparent'
      )}
    >
      <div className="max-w-(--content-max) mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="font-display text-2xl text-white tracking-tight hover:text-gold transition-colors duration-300"
        >
          Meli Pedraza
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center text-xs uppercase tracking-[0.2em] text-mist font-medium">
          <Link href="/#trabajo" className="hover:text-gold transition-colors duration-300 cursor-pointer">Trabajo</Link>
          <Link href="/#servicios" className="hover:text-gold transition-colors duration-300 cursor-pointer">Servicios</Link>
          <Link href="/#sobre-mi" className="hover:text-gold transition-colors duration-300 cursor-pointer">Sobre mí</Link>
          <Link 
            href="/booking" 
            className="text-bone hover:text-gold transition-colors duration-300 px-5 py-2 border border-smoke hover:border-gold rounded-sm cursor-pointer"
          >
            Turno
          </Link>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-bone p-2 hover:bg-smoke rounded-full transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          'fixed inset-0 bg-ink z-40 md:hidden transition-transform duration-500 ease-in-out pt-32 px-10',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-8 text-2xl font-display text-white">
          <Link href="/#trabajo" onClick={() => setMobileMenuOpen(false)}>Trabajo</Link>
          <Link href="/#servicios" onClick={() => setMobileMenuOpen(false)}>Servicios</Link>
          <Link href="/#sobre-mi" onClick={() => setMobileMenuOpen(false)}>Sobre mí</Link>
          <Link 
            href="/booking" 
            className="text-gold pt-4 border-t border-smoke"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reservar Turno
          </Link>
        </div>
      </div>
    </nav>
  );
}
