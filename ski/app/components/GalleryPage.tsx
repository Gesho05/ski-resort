"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Ticket, Video, Images, Newspaper, Snowflake, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryOverlayProps {
  onClose: () => void;
  onNavigate: (page: string) => void;
  variants: Variants;
}

const GalleryOverlay: React.FC<GalleryOverlayProps> = ({ onClose, onNavigate, variants }) => {
  // Mock data
  const photos = [
    { id: 1, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 2, span: "col-span-1 row-span-1", img: "/pictures/photo2.png" },
    { id: 3, span: "col-span-1 row-span-1", img: "/pictures/weather.png" },
    { id: 4, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 5, span: "col-span-2 row-span-2", img: "/pictures/photo3.png" },
    { id: 6, span: "col-span-2 row-span-2", img: "/pictures/photo2.png" },
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
    { id: 17, span: "col-span-2 row-span-2", img: "/pictures/prices.png" },
    { id: 18, span: "col-span-1 row-span-1", img: "/pictures/photo3.png" },
    { id: 19, span: "col-span-1 row-span-1", img: "/pictures/news.png" },
    { id: 20, span: "col-span-1 row-span-1", img: "/pictures/photo1.png" },
    { id: 21, span: "col-span-1 row-span-1", img: "/pictures/photo2.png" },
  ];

  // --- LIGHTBOX LOGIC ---
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const currentIndex = photos.findIndex((p) => p.id === selectedId);
  const currentPhoto = photos[currentIndex];

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedId(photos[nextIndex].id);
    }
  }, [currentIndex, photos]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedId(photos[prevIndex].id);
    }
  }, [currentIndex, photos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleNext, handlePrev]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] w-full h-full bg-[#1e3a5f] overflow-hidden select-none"
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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
      <header className="fixed top-0 left-0 z-40 w-full p-8 flex justify-center pointer-events-none">
        <div className="absolute left-12 top-5 text-white">
          <img src="./pictures/Logo.png" alt="Bansko Logo" className="h-16 w-auto" />
        </div>
        
        <nav className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full text-white shadow-2xl pointer-events-auto">
          <div className="flex gap-5 border-r border-white/20 pr-5">
            <button onClick={() => onNavigate('Prices')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
              <Ticket size={20} />
            </button>
            <button onClick={() => onNavigate('Webcams')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
              <Video size={20} /> 
            </button>
            <button className="text-blue-300 scale-110 cursor-default">
              <Images size={20} /> 
            </button>
            <button onClick={() => onNavigate('News')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
              <Newspaper size={20} /> 
            </button>
          </div>
          <div className="flex gap-4 pl-3 items-center text-[15px] font-semibold">
            <button onClick={() => onNavigate('Weather')} className="hover:text-blue-300 hover:scale-105 transition-all cursor-pointer">
                0.7° C
            </button>
            <div className="w-[1px] h-4 bg-white/30" />
            <span className="flex items-center gap-2"><Snowflake size={18} /> 120 cm</span>
          </div>
        </nav>
      </header>

      {/* Gallery Grid */}
      <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar pt-32 pb-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px]">
            {photos.map((photo) => (
              <motion.div 
                key={photo.id}
                layoutId={`photo-${photo.id}`}
                onClick={() => setSelectedId(photo.id)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-3xl overflow-hidden border border-white/20 shadow-lg cursor-pointer ${photo.span}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url("${photo.img}")` }}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>    
        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedId && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            // CLICKING HERE (The Background) CLOSES THE MODAL
            onClick={() => setSelectedId(null)}
          >
            {/* Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer z-50"
            >
              <X size={32} />
            </button>

            {/* Left Arrow */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 bg-black/50 hover:bg-white/20 rounded-full text-white cursor-pointer z-50 transition-colors border border-white/10"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Main Image Container */}
            <motion.div 
              layoutId={`photo-${selectedId}`}
              className="relative w-full max-w-5xl max-h-[85vh] aspect-[16/9] md:aspect-auto flex items-center justify-center"
              // REMOVED stopPropagation from here so clicking "empty space" around the image closes the modal
            >
               <motion.img 
                 key={selectedId}
                 src={currentPhoto.img} 
                 alt="Gallery Fullscreen"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.3 }}
                 className="w-full h-full object-contain rounded-xl shadow-2xl drop-shadow-2xl"
                 // ADDED stopPropagation here so clicking the ACTUAL IMAGE does NOT close it
                 onClick={(e) => e.stopPropagation()}
               />
            </motion.div>

            {/* Right Arrow */}
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 bg-black/50 hover:bg-white/20 rounded-full text-white cursor-pointer z-50 transition-colors border border-white/10"
            >
              <ChevronRight size={40} />
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default GalleryOverlay;