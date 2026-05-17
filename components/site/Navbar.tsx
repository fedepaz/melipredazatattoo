"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700",
        isScrolled
          ? "py-6 bg-obsidian/80 backdrop-blur-2xl border-b border-smoke/20"
          : "py-10 bg-transparent",
      )}
    >
      <div className="max-w-450 mx-auto px-12 flex justify-between items-center text-xs uppercase tracking-[0.2em] font-medium">
        <Link
          href="/"
          className="font-display text-2xl text-bone tracking-tighter normal-case"
        >
          Meli<span className="text-gold italic">Pedraza</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12 items-center text-mist">
          <Link
            href="/#trabajo"
            className="hover:text-gold transition-colors duration-300"
          >
            Portafolio
          </Link>
          <Link
            href="/#servicios"
            className="hover:text-gold transition-colors duration-300"
          >
            Servicios
          </Link>
          <Link
            href="/#sobre-mi"
            className="hover:text-gold transition-colors duration-300"
          >
            Estudio
          </Link>
          <ThemeToggle />
          <Link
            href="/booking"
            className="text-white bg-gold/10 hover:bg-gold hover:text-obsidian px-6 py-2 border border-gold/30 rounded-sm transition-all duration-500"
          >
            Aplicar
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden">
          <ThemeToggle />
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-obsidian z-40 md:hidden transition-all duration-500 ease-in-out pt-32 px-12",
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-10 text-4xl font-display text-bone">
          <Link href="/#trabajo" onClick={() => setMobileMenuOpen(false)}>
            Trabajo
          </Link>
          <Link href="/#servicios" onClick={() => setMobileMenuOpen(false)}>
            Servicios
          </Link>
          <Link href="/#sobre-mi" onClick={() => setMobileMenuOpen(false)}>
            Estudio
          </Link>
          <Link
            href="/booking"
            className="text-gold mt-6 pt-6 border-t border-smoke/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Aplicar ahora
          </Link>

          <div className="mt-12 flex gap-6">
            <p className="label-tech">Meli Pedraza © 2026</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
