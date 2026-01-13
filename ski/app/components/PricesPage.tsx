"use client";

import React from 'react';
import { motion } from 'framer-motion';
// Updated Imports to match other pages
import { Ticket, Video, Images, Newspaper, Snowflake, X } from 'lucide-react';

interface PricesOverlayProps {
  onClose: () => void;
}

const PricesOverlay: React.FC<PricesOverlayProps> = ({ onClose }) => {
  // Data matching the table
  const priceData = [
    { type: "1 Day", adult: "€ 59", student: "€ 53", child: "€ 30", kid: "€ 2" },
    { type: "2 Day", adult: "€ 59", student: "€ 53", child: "€ 30", kid: "€ 2" },
    { type: "3 Day", adult: "€ 59", student: "€ 53", child: "€ 30", kid: "€ 2" },
    { type: "4 Day", adult: "€ 59", student: "€ 53", child: "€ 30", kid: "€ 2" },
  ];

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] w-full h-full bg-[#1e3a5f] overflow-hidden"
    >
      {/* --- Background Photo --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: 'url("/pictures/photo3.png")' }} 
        />
        <div className="absolute inset-0 bg-[#1e3a5f]/80 backdrop-blur-[2px] z-10" />
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Header */}
      <header className="absolute top-0 left-0 z-40 w-full p-8 flex justify-center pointer-events-none">
        <div className="absolute left-12 top-5 text-white">
          <img src="./pictures/Logo.png" alt="Bansko Logo" className="h-16 w-auto" />
        </div>
        
        {/* pointer-events-auto ensures the nav is clickable */}
        <nav className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full text-white shadow-2xl pointer-events-auto">
          <div className="flex gap-5 border-r border-white/20 pr-5">
            
            {/* 1. Ticket Link (Active Page) */}
            <button className="text-blue-300 scale-110 cursor-default">
              <Ticket size={20} />
            </button>

            {/* 2. Webcams */}
            <button className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
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

      {/* Prices Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-10 pt-32">
        <div className="w-full max-w-5xl flex flex-col gap-3">
          
          {/* Table Header Row */}
          <div className="grid grid-cols-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-4 px-6 text-white text-center font-bold text-sm uppercase tracking-wider mb-2">
            <div className="border-r border-white/20">Type of pass</div>
            <div className="border-r border-white/20">Adult</div>
            <div className="border-r border-white/20">Students (12-19 y.o.)</div>
            <div className="border-r border-white/20">Children (7-11 y.o.)</div>
            <div>Kids (under 6 y.o.)</div>
          </div>

          {/* Price Rows */}
          {priceData.map((row, idx) => (
            <div key={idx} className="grid grid-cols-5 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 rounded-full py-6 px-6 text-white text-center text-lg font-medium shadow-sm">
              <div className="border-r border-white/20 font-bold">{row.type}</div>
              <div className="border-r border-white/20">{row.adult}</div>
              <div className="border-r border-white/20">{row.student}</div>
              <div className="border-r border-white/20">{row.child}</div>
              <div>{row.kid}</div>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
};

export default PricesOverlay;