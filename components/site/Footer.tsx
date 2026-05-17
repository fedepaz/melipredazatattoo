import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal border-t border-smoke py-12 px-6">
      <div className="max-w-(--content-max) mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="font-display text-2xl text-white mb-2">Meli Pedraza</h3>
          <p className="text-mist text-sm uppercase tracking-wider">Arte en la piel</p>
        </div>
        
        <div className="flex flex-col gap-4 text-sm uppercase tracking-widest text-mist">
          <Link href="/#trabajo" className="hover:text-gold transition-colors">Trabajo</Link>
          <Link href="/#servicios" className="hover:text-gold transition-colors">Servicios</Link>
          <Link href="/#sobre-mi" className="hover:text-gold transition-colors">Sobre mí</Link>
          <Link href="/booking" className="hover:text-gold transition-colors">Turno</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-widest text-mist">Contacto</p>
          <a href="https://instagram.com" className="text-bone hover:text-gold transition-colors">Instagram</a>
          <a href="https://wa.me/5491100000000" className="text-bone hover:text-gold transition-colors">WhatsApp</a>
        </div>
      </div>
      
      <div className="max-w-(--content-max) mx-auto mt-12 pt-8 border-t border-smoke flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-mist uppercase tracking-widest">
        <p>© {currentYear} Meli Pedraza</p>
        <p>Diseño y desarrollo · melipedrazatattoo</p>
      </div>
    </footer>
  );
}
