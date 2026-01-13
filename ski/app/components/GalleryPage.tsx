"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Video, CableCar, Calendar, Snowflake, X } from 'lucide-react';

interface GalleryOverlayProps {
  onClose: () => void;
}

const GalleryOverlay: React.FC<GalleryOverlayProps> = ({ onClose }) => {
  // Mock data to replicate the layout in your screenshot
  // span: "col-span-1 row-span-1" is a small box
  // span: "col-span-2 row-span-2" is a large box
  const photos = [
    { id: 1, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 2, span: "col-span-1 row-span-1", img: "/pictures/photo2.png" },
    { id: 3, span: "col-span-1 row-span-1", img: "/pictures/weather.png" },
    { id: 4, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 5, span: "col-span-2 row-span-2", img: "/pictures/photo3.png" }, // Large Top Right
    { id: 6, span: "col-span-2 row-span-2", img: "/pictures/photo2.png" }, // Large Row 2 Left
    { id: 7, span: "col-span-1 row-span-1", img: "/pictures/webcams.png" },
    { id: 8, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 9, span: "col-span-1 row-span-1", img: "/pictures/photo2.png" },
    { id: 10, span: "col-span-1 row-span-1", img: "/pictures/photo3.png" },
    { id: 11, span: "col-span-1 row-span-1", img: "/pictures/gallery.png" },
    { id: 12, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 13, span: "col-span-1 row-span-1", img: "/pictures/webcams.png" },
    { id: 14, span: "col-span-1 row-span-1", img: "/pictures/photo3.png" },
    { id: 15, span: "col-span-1 row-span-1", img: "/pictures/skipass.png" },
    { id: 16, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 17, span: "col-span-2 row-span-2", img: "/pictures/prices.png" }, // Large Bottom Center
    { id: 18, span: "col-span-1 row-span-1", img: "/pictures/photo3.png" },
    { id: 19, span: "col-span-1 row-span-1", img: "/pictures/news.png" },
    { id: 20, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 21, span: "col-span-1 row-span-1", img: "/pictures/photo2.png" },
  ];

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] w-full h-full bg-[#1e3a5f] overflow-hidden"
    >
      {/* --- Background --- */}
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
        className="absolute top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Header */}
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

      {/* Gallery Grid - Scrollable */}
      <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar pt-32 pb-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Using grid-auto-flow dense to pack items nicely */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px]">
            {photos.map((photo) => (
              <motion.div 
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-3xl overflow-hidden border border-white/20 shadow-lg ${photo.span}`}
              >
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url("${photo.img}")` }}
                />
                {/* Optional overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>    
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryOverlay;