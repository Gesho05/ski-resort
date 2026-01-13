"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// 1. Updated Imports: Swapped CableCar->Images, Calendar->Newspaper
import { Ticket, Video, Images, Newspaper, Snowflake, X, Wind, Droplets, Thermometer } from 'lucide-react';

interface WebcamOverlayProps {
  onClose: () => void;
}

const WebcamOverlay: React.FC<WebcamOverlayProps> = ({ onClose }) => {
  // 1. State for the current time
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  // 2. Effect to update time every second
  useEffect(() => {
    // Set initial time on mount to avoid hydration mismatch
    setCurrentDate(new Date());

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 3. Helper function to format the date as "DD.MM HH:mm"
  const getFormattedTime = () => {
    if (!currentDate) return "Loading...";
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
    return `${day}.${month} ${hours}:${minutes}`;
  };

  const liveTime = getFormattedTime();

  // Mock data
  const webcams = [
    { id: 1, name: "Chalin Valog", alt: "1200m", temp: "-2.0°C", wind: "2.0 km/h", hum: "82.0%", img: "/pictures/photo1.png" },
    { id: 2, name: "Shiligarnika", alt: "1725m", temp: "-3.5°C", wind: "5.0 km/h", hum: "78.0%", img: "/pictures/photo2.png" },
    { id: 3, name: "Plato", alt: "2200m", temp: "-5.0°C", wind: "12.0 km/h", hum: "65.0%", img: "/pictures/photo3.png" },
    { id: 4, name: "Todorka", alt: "2550m", temp: "-8.0°C", wind: "15.0 km/h", hum: "60.0%", img: "/pictures/photo1.png" },
  ];

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] w-full h-full bg-[#1e3a5f] overflow-y-auto no-scrollbar"
    >
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: 'url("/pictures/photo2.png")' }} 
        />
        <div className="absolute inset-0 bg-[#1e3a5f]/85 backdrop-blur-[2px] z-10" />
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Header (Updated) */}
      <header className="fixed top-0 left-0 z-40 w-full p-8 flex justify-center pointer-events-none">
        <div className="absolute left-12 top-5 text-white">
          <img src="./pictures/Logo.png" alt="Bansko Logo" className="h-16 w-auto" />
        </div>
        
        {/* pointer-events-auto ensures the nav is clickable */}
        <nav className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full text-white shadow-2xl pointer-events-auto">
          <div className="flex gap-5 border-r border-white/20 pr-5">
            
            {/* 1. Ticket Link */}
            <a 
              href="https://www.skipoint.info/signin" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer"
              title="Buy Tickets"
            >
              <Ticket size={20} />
            </a>

            {/* 2. Webcams (Active) */}
            <button className="text-blue-300 scale-110 cursor-default">
              <Video size={20} /> 
            </button>

            {/* 3. Gallery */}
            <button className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
              <Images size={20} /> 
            </button>

            {/* 4. News */}
            <button className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
              <Newspaper size={20} /> 
            </button>
          </div>

          <div className="flex gap-4 pl-3 items-center text-[15px] font-semibold">
            <span className="hover:text-blue-300 cursor-pointer">0.7° C</span>
            <div className="w-[1px] h-4 bg-white/30" />
            <span className="flex items-center gap-2"><Snowflake size={18} /> 120 cm</span>
          </div>
        </nav>
      </header>

      {/* Webcam Grid Content */}
      <div className="relative z-10 w-full min-h-full flex justify-center pt-32 pb-20 px-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {webcams.map((cam) => (
            <div 
                key={cam.id} 
                className="relative group w-full aspect-[4/3] bg-white/10 backdrop-blur-md border border-white/30 rounded-[1.5rem] overflow-hidden shadow-2xl"
            >
              
              {/* Card Header (Floating Pill) */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                <span className="text-xl font-bold text-white drop-shadow-md">{cam.name}</span>
                <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/90">
                  {/* Used liveTime here instead of static cam.date */}
                  {cam.alt} | {liveTime}
                </div>
              </div>

              {/* The Webcam Image (Background of the card) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url("${cam.img}")` }}
              />

              {/* Overlay Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10" />

              {/* Card Footer (Stats Bar) */}
              <div className="absolute bottom-0 left-0 w-full z-20">
                {/* Blue Bar Strip */}
                <div className="bg-gradient-to-r from-[#135285]/90 to-[#1e3a5f]/80 backdrop-blur-md border-t border-white/20 p-3 flex flex-col gap-1">
                  
                  <div className="flex justify-between items-center text-[10px] text-white/70 uppercase font-bold tracking-widest border-b border-white/10 pb-1 mb-1">
                    <span>{cam.name} - {cam.alt}</span>
                    <span>www.banskoski.com</span>
                  </div>

                  {/* Weather Stats Line */}
                  <div className="flex items-center gap-6 text-sm font-semibold text-white">
                    <span className="flex items-center gap-1.5">
                      <Thermometer size={14} className="text-blue-300"/> {cam.temp}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Wind size={14} className="text-blue-300"/> {cam.wind}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Droplets size={14} className="text-blue-300"/> {cam.hum}
                    </span>
                  </div>
                </div>
              </div>

              {/* BANSKO Logo Watermark (Top Right) */}
               <div className="absolute top-12 right-6 z-10 opacity-80 w-16">
                 <img src="./pictures/miniLogo.png" alt="watermark" />
               </div>

            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
};

export default WebcamOverlay;