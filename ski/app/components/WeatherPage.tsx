"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Video, CableCar, Calendar, Snowflake, X, Wind, Droplets } from 'lucide-react';

interface WeatherOverlayProps {
  onClose: () => void;
}

const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ onClose }) => {
  const days = [
    { day: "Monday 12", forecast: ["light snow", "snow 1 cm", "-7 max -7", "95%", "5 km/h"] },
    { day: "Tuesday 13", forecast: ["light snow", "snow 1 cm", "-7 max -7", "95%", "5 km/h"] },
    { day: "Wednesday 14", forecast: ["light snow", "snow 1 cm", "-7 max -7", "95%", "5 km/h"] },
    { day: "Thursday 15", forecast: ["light snow", "snow 1 cm", "-7 max -7", "95%", "5 km/h"] },
    { day: "Friday 16", forecast: ["light snow", "snow 1 cm", "-7 max -7", "95%", "5 km/h"] },
    { day: "Saturday 17", forecast: ["light snow", "snow 1 cm", "-7 max -7", "95%", "5 km/h"] },
  ];

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      // Changed h-screen to h-full to ensure it covers the viewport
      className="fixed inset-0 z-[100] w-full h-full bg-[#1e3a5f] overflow-hidden"
    >
      {/* --- Background Photo with Blue Tint --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: 'url("/pictures/photo3.png")' }} // Using photo3.png as an example
        />
        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-[#1e3a5f]/80 backdrop-blur-[2px] z-10" />
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Header (Unchanged) */}
      <header className="absolute top-0 left-0 z-40 w-full p-8 flex justify-center pointer-events-none">
        <div className="absolute left-12 top-5 text-white">
          <img src="./pictures/Logo.png" alt="Bansko Logo" className="h-16 w-auto" />
        </div>
        <nav className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full text-white shadow-2xl">
          <div className="flex gap-5 border-r border-white/20 pr-5">
            <Ticket size={20} /> <Video size={20} /> <CableCar size={20} /> <Calendar size={20} />
          </div>
          <div className="flex gap-4 pl-3 items-center text-[15px] font-semibold">
            <span>0.7° C</span>
            <div className="w-[1px] h-4 bg-white/30" />
            <span className="flex items-center gap-2"><Snowflake size={18} /> 120 cm</span>
          </div>
        </nav>
      </header>

      {/* Weather Grid Content - Compacted */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-10 pt-32">
        {/* Changed h-[80vh] to h-[75vh] to fit comfortably */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full max-w-7xl h-[75vh]">
          {days.map((d, i) => (
            // Reduced padding from p-4 to p-2
            <div key={i} className="flex flex-col bg-white/10 border border-white/20 rounded-[2rem] p-2 py-4 text-white text-center h-full justify-between backdrop-blur-sm">
              {/* Reduced padding from pb-4 to pb-2 */}
              <h3 className="text-md font-bold border-b border-white/20 pb-2 mb-1">{d.day}</h3>
              
              {/* Morning */}
              <div className="flex-1 flex flex-col items-center justify-center gap-0 pb-1 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 border-b border-white/10"></div>
                <span className="text-[12px] font-bold uppercase mb-1">Morning</span>
                {/* Reduced Snowflake size from 32 to 24 */}
                <Snowflake size={24} className="mb-1 opacity-90"/>
                <p className="text-[12px] font-medium">{d.forecast[0]}</p>
                <p className="text-[11px] opacity-70">{d.forecast[1]}</p>
                <div className="mt-1 text-[9px] space-y-0.5 opacity-80">
                   <p>{d.forecast[2]}</p>
                   {/* Reduced icons size from 8 to 7 */}
                   <p className="flex items-center justify-center gap-1"><Droplets size={10}/> {d.forecast[3]}</p>
                   <p className="flex items-center justify-center gap-1"><Wind size={10}/> {d.forecast[4]}</p>
                </div>
              </div>

              {/* Afternoon */}
              <div className="flex-1 flex flex-col items-center justify-center gap-0 py-2 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 border-b border-white/10"></div>
                <span className="text-[10px] opacity-70 font-bold uppercase mb-1">Afternoon</span>
                <Snowflake size={24} className="mb-1 opacity-90"/>
                <p className="text-[10px] font-medium">{d.forecast[0]}</p>
                <p className="text-[9px] opacity-70">{d.forecast[1]}</p>
                <div className="mt-1 text-[9px] space-y-0.5 opacity-80">
                   <p>{d.forecast[2]}</p>
                   <p className="flex items-center justify-center gap-1"><Droplets size={10}/> {d.forecast[3]}</p>
                   <p className="flex items-center justify-center gap-1"><Wind size={10}/> {d.forecast[4]}</p>
                </div>
              </div>

              {/* Night */}
              <div className="flex-1 flex flex-col items-center justify-center gap-0 pt-1">
                <span className="text-[10px] opacity-70 font-bold uppercase mb-1">Night</span>
                <Snowflake size={24} className="mb-1 opacity-90"/>
                <p className="text-[10px] font-medium">{d.forecast[0]}</p>
                <p className="text-[9px] opacity-70">{d.forecast[1]}</p>
                <div className="mt-1 text-[9px] space-y-0.5 opacity-80">
                   <p>{d.forecast[2]}</p>
                   <p className="flex items-center justify-center gap-1"><Droplets size={10}/> {d.forecast[3]}</p>
                   <p className="flex items-center justify-center gap-1"><Wind size={10}/> {d.forecast[4]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherOverlay;