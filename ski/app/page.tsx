import React from 'react';
import { Ticket, Video, Mountain, Calendar, Snowball } from 'lucide-react';

// Defining a simple interface for the status bar data
interface WeatherStatus {
  temp: string;
  snowDepth: string;
}

const BanskoHero: React.FC = () => {
  const status: WeatherStatus = {
    temp: "0.7° C",
    snowDepth: "120 cm"
  };

  return (
    <main className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/mountains.jpg")', // Ensure image is in /public folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Color overlay to match the cool blue tint of your prototype */}
        <div className="absolute inset-0 bg-blue-400/10 mix-blend-overlay"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 flex justify-between items-start p-8 md:p-10">
        {/* Logo */}
        <div className="text-white drop-shadow-md">
          <div className="flex items-center gap-1">
            <Mountain size={24} className="mb-1" />
            <h1 className="text-3xl font-black tracking-tighter leading-none">BANSKO</h1>
          </div>
          <p className="text-[10px] tracking-[0.3em] font-medium opacity-90 uppercase">
            All Seasons Resort
          </p>
        </div>

        {/* Status Bar - Glassmorphism */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white text-sm shadow-xl">
          <div className="flex gap-5 border-r border-white/30 pr-5">
            <Ticket size={18} className="cursor-pointer hover:text-blue-200 transition-colors" />
            <Video size={18} className="cursor-pointer hover:text-blue-200 transition-colors" />
            <Mountain size={18} className="cursor-pointer hover:text-blue-200 transition-colors" />
            <Calendar size={18} className="cursor-pointer hover:text-blue-200 transition-colors" />
          </div>
          <div className="flex gap-5 items-center font-medium">
            <span>{status.temp}</span>
            <span className="flex items-center gap-2">
              <span className="text-blue-200">❄</span> {status.snowDepth}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Typography */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
        <div className="w-full max-w-6xl">
          {/* The thin divider line from your prototype */}
          <div className="w-full h-[2px] bg-slate-400/30 mb-6 max-w-4xl mx-auto"></div>
          
          <h2 className="text-5xl md:text-9xl font-[900] text-slate-800 tracking-tighter leading-[0.85] uppercase">
            Elevate <span className="text-slate-700/90">You</span> Adventure
          </h2>
          
          <h3 className="text-4xl md:text-8xl font-[800] text-slate-800/90 tracking-tighter uppercase mt-2">
            Every Season
          </h3>
        </div>
      </section>
    </main>
  );
};

export default BanskoHero;