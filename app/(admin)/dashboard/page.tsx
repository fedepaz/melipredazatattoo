'use client';

import { Calendar as CalendarIcon, Users, Clock, Settings, LogOut, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const upcomingBookings = [
    { id: 1, name: 'María García', service: 'Cejas', date: 'Martes 11 Jun', time: '12:00', phone: '+549261000000' },
    { id: 2, name: 'Lucía Pérez', service: 'Tatuaje', date: 'Miércoles 12 Jun', time: '15:30', phone: '+549261000001' },
    { id: 3, name: 'Ana Belén', service: 'Labios', date: 'Viernes 14 Jun', time: '10:00', phone: '+549261000002' },
  ];

  return (
    <div className="min-h-screen bg-ink flex flex-col md:flex-row">
      {/* Sidebar Nav */}
      <aside className="w-full md:w-64 bg-charcoal border-r border-smoke p-8 flex flex-col">
        <div className="mb-12">
          <h2 className="font-display text-2xl text-white">Panel Artist</h2>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { label: 'Calendario', icon: CalendarIcon, active: true },
            { label: 'Reservas', icon: Users },
            { label: 'Horarios', icon: Clock },
            { label: 'Ajustes', icon: Settings },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-sm text-xs uppercase tracking-widest transition-all",
                item.active 
                  ? "bg-gold text-ink font-bold" 
                  : "text-mist hover:text-bone hover:bg-ash"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-4 py-3 text-xs uppercase tracking-widest text-error hover:bg-error/10 transition-all mt-auto rounded-sm">
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2 font-bold">Resumen de hoy</p>
            <h1 className="text-display text-white">Martes 11 de Junio</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar Management Placeholder */}
          <div className="bg-charcoal border border-smoke p-8 rounded-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-xl text-white">Disponibilidad</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-ash rounded-full text-mist transition-colors"><ChevronLeft size={20}/></button>
                <button className="p-2 hover:bg-ash rounded-full text-mist transition-colors"><ChevronRight size={20}/></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-8 text-center text-[10px] uppercase tracking-widest text-mist">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <div key={d}>{d}</div>)}
              {Array.from({ length: 31 }).map((_, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "aspect-square flex items-center justify-center text-sm rounded-sm transition-all",
                    i === 10 ? "bg-gold text-ink font-bold" : "hover:bg-ash text-bone"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-smoke">
              <p className="text-[10px] uppercase tracking-widest text-mist">Horarios Martes 11</p>
              <div className="flex flex-wrap gap-2">
                {['10:00', '12:00', '15:30', '18:00'].map(t => (
                  <div key={t} className="px-4 py-2 bg-ash border border-smoke text-xs text-bone rounded-full flex items-center gap-2">
                    {t}
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_var(--color-gold)]" />
                  </div>
                ))}
                <button className="px-4 py-2 border border-dashed border-smoke text-xs text-mist hover:text-bone hover:border-bone transition-all rounded-full">
                  + Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="space-y-6">
            <h3 className="font-display text-xl text-white mb-8">Próximos Turnos</h3>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="bg-ash/50 border border-smoke p-6 rounded-sm flex justify-between items-center group hover:border-gold/50 transition-colors">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold mb-1 font-bold">{booking.date} · {booking.time}</p>
                    <p className="text-bone font-medium text-lg">{booking.name}</p>
                    <p className="text-xs text-mist uppercase tracking-widest mt-1">{booking.service}</p>
                  </div>
                  <a 
                    href={`https://wa.me/${booking.phone}`}
                    className="p-3 bg-smoke hover:bg-gold hover:text-ink text-bone transition-all rounded-full"
                    title="Enviar WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-xs uppercase tracking-[0.2em] text-mist hover:text-bone transition-colors border-t border-smoke mt-4">
              Ver todas las reservas
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
