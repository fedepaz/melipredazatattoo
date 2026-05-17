"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-charcoal p-10 border border-smoke rounded-sm shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-white mb-2">
            Meli Pedraza
          </h1>
          <p className="text-mist text-xs uppercase tracking-widest font-medium">
            Panel de Artista
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-mist block font-bold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ash border border-smoke px-4 py-3 text-bone focus:border-gold outline-none transition-colors rounded-sm"
              placeholder="email@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-mist block font-bold">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ash border border-smoke px-4 py-3 text-bone focus:border-gold outline-none transition-colors rounded-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-dim text-ink py-4 uppercase font-bold text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-8"
          >
            <LogIn size={16} />
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
