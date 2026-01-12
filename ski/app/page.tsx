"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ticket, Video, CableCar, Calendar, Snowflake, Instagram, Youtube, Facebook, Camera } from 'lucide-react';

const BanskoExperience: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background & Parallax Animations
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Global Hover Pop-out effect for Bento boxes
  const popOut = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 17 },
    zIndex: 50,
    boxShadow: "0px 20px 40px rgba(0,0,0,0.3)"
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#1e3a5f]"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: 'url("/pictures/photo1.png")', opacity: bg1Opacity, scale: bgScale, y: parallaxY }} 
        />
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ backgroundImage: 'url("/pictures/photo2.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: bg2Opacity }} 
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* --- HEADER (Absolute - scrolls with the page) --- */}
      <header className="absolute top-0 left-0 z-50 w-full p-8 flex justify-center">
        <div className="absolute left-12 top-10 text-white flex flex-col items-start">
          <h1 className="text-3xl font-black tracking-tighter italic leading-none drop-shadow-lg">BANSKO</h1>
          <span className="text-[10px] tracking-[0.3em] font-light drop-shadow-md">ALL SEASONS RESORT</span>
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

      {/* --- SECTION 1: HERO --- */}
      <section className="relative z-10 h-screen w-full flex flex-col items-center justify-center snap-start snap-always px-4">
        <div className="w-full max-w-6xl text-center">
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            transition={{ duration: 1, ease: "easeInOut" }} 
            className="w-full h-[2px] bg-slate-300/40 mb-8 origin-center" 
          />
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-[110px] font-black text-white tracking-tighter leading-[0.9] uppercase drop-shadow-lg">
              Elevate Your Adventure
            </h2>
            <h2 className="text-4xl md:text-[80px] font-bold text-white/80 tracking-tighter leading-[0.9] uppercase mt-4">
              Every Season
            </h2>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: BENTO DASHBOARD (6x3 Grid) --- */}
      <section className="relative z-10 h-screen w-full flex items-center justify-center snap-start snap-always p-8">
        <motion.div 
          className="grid grid-cols-6 grid-rows-3 gap-4 max-w-7xl w-full h-[70vh]"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* WEBCAMS (2x1) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex justify-between items-center text-white cursor-pointer shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2 opacity-60 text-[10px] font-bold uppercase tracking-widest"><Camera size={14}/> Webcams</div>
              <p className="text-[11px] opacity-80 leading-tight">Live footage of all<br/>ski tracks in the resort</p>
            </div>
            <div className="w-20 h-16 rounded-2xl bg-cover bg-center border border-white/20" style={{backgroundImage: 'url("/pictures/photo1.png")'}} />
          </motion.div>

          {/* WEATHER (2x1) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex gap-4 items-center text-white cursor-pointer shadow-lg">
             <div className="w-16 h-full rounded-2xl bg-cover bg-center" style={{backgroundImage: 'url("/pictures/photo2.png")'}} />
             <div>
               <span className="text-[10px] font-bold opacity-60 uppercase">Weather</span>
               <div className="text-xl font-bold flex items-center gap-2 uppercase">Monday 12 <Snowflake size={16}/> -1° C</div>
             </div>
          </motion.div>

          {/* NEWS (2x2 Right Pillar) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 text-white flex flex-col items-center text-center justify-between relative overflow-hidden cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: 'url("/pictures/photo1.png")'}} />
            <span className="relative z-10 w-full text-left text-[10px] font-bold opacity-60 uppercase tracking-widest">News</span>
            <div className="relative z-10 space-y-4">
              <div className="w-full aspect-video rounded-3xl bg-cover bg-center border border-white/20" style={{backgroundImage: 'url("/pictures/photo1.png")'}} />
              <p className="text-sm font-medium leading-tight italic">Official start of winter season<br/>2025-2026 in Bansko</p>
              <button className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] border border-white/30 uppercase font-bold tracking-tighter">More Information</button>
            </div>
          </motion.div>

          {/* SKI MAP (2x2 Left Pillar) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] relative overflow-hidden group cursor-pointer shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: 'url("/pictures/map-thumb.jpg")'}} />
            <div className="absolute bottom-6 right-8 text-white text-xl font-black italic tracking-tighter drop-shadow-xl uppercase">Ski Map</div>
          </motion.div>

          {/* GALLERY (2x1 Middle) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden cursor-pointer shadow-lg">
            <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{backgroundImage: 'url("/pictures/photo2.png")'}} />
            <span className="absolute top-6 left-8 text-white text-[14px] font-black italic uppercase tracking-tighter">Gallery</span>
          </motion.div>

          {/* SKI PASS (2x1 Bottom Middle) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white flex gap-6 items-center justify-center cursor-pointer shadow-lg">
            <div className="text-center">
                <span className="text-[10px] font-bold opacity-60 uppercase">Ski Pass</span>
                <div className="flex items-center gap-3 mt-2">
                    <div className="bg-red-500 p-2 rounded-lg"><Ticket size={20} className="fill-white"/></div>
                    <span className="text-xs font-bold uppercase tracking-widest">Inactive</span>
                </div>
            </div>
            <div className="w-24 h-full rounded-2xl bg-cover bg-center border border-white/20" style={{backgroundImage: 'url("/pictures/photo1.png")'}} />
          </motion.div>

          {/* PRICES (2x1 Bottom Right) */}
          <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden cursor-pointer shadow-lg">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: 'url("/pictures/photo2.png")'}} />
            <span className="absolute top-6 left-8 text-white text-[14px] font-black italic uppercase tracking-tighter">Prices</span>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 3: FOOTER (Matches image_c872f0.png / image_d7068e.jpg) --- */}
      <section className="relative z-10 h-screen w-full flex flex-col items-center justify-center snap-start px-6 pt-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="text-white text-5xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-10"
        >
          YOUR MOUNTAIN HOME
        </motion.h2>

        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-end">
            {/* Discover Bansko Card (image_d7068e.jpg) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 text-white shadow-2xl"
            >
                <h3 className="text-xl font-bold mb-8 opacity-60 uppercase tracking-widest">Discover Bansko</h3>
                <div className="grid grid-cols-2 gap-y-6 text-base">
                    {['Webcams', 'Gallery', 'Weather', 'News', 'Ski Pass', 'Ski Map', 'Summer Offers', 'Prices'].map(l => (
                        <div key={l} className="border-b border-white/20 pb-1 cursor-pointer hover:text-white/60 transition-colors">{l}</div>
                    ))}
                </div>
            </motion.div>

            {/* Awarded Card (image_c872f0.png) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 text-white shadow-2xl"
            >
            {/* Awarded (2x2 Grid) */}
                <h3 className="text-sm font-bold mb-8 opacity-40 uppercase tracking-widest">Awarded</h3>
                <div className="grid grid-cols-2 gap-5 items-center max-w-md"> {/* 2x2 Layout */}
                    <img src="/pictures/award1.png" alt="A1" className="h-22 w-22 object-contain" />
                    <img src="/pictures/award2.png" alt="A2" className="h-22 w-22 object-contain" />
                    <img src="/pictures/award3.png" alt="A3" className="h-22 w-22 object-contain" />
                    <img src="/pictures/award4.jpg" alt="A4" className="h-22 w-22 object-contain" />
                </div>
            </motion.div>
        </div>

        {/* Brand Bottom Bar - All on one line (image_c872f0.png) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-7xl flex flex-row justify-between items-center px-4 gap-6"
        >
          {/* Logo & Copyright */}
          <div className="flex flex-col items-start min-w-fit">
            <div className="flex flex-row items-end gap-2">
              <h2 className="text-4xl font-black italic leading-none tracking-tighter text-white">BANSKO</h2>
              <span className="text-[8px] tracking-[0.3em] font-light text-white/60 uppercase mb-1">All Seasons Resort</span>
            </div>
            <p className="text-white/30 text-[9px] mt-1 tracking-widest uppercase">© 2010 - 2025 Bansko</p>
          </div>

          {/* Middle Social Icons */}
          <div className="flex flex-row gap-4 text-white/50 border-x border-white/10 px-8 h-10 items-center">
              <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
              <Youtube size={20} className="hover:text-white transition-colors cursor-pointer" />
              <Facebook size={20} className="hover:text-white transition-colors cursor-pointer" />
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-row gap-3">
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:bg-white/10 flex items-center gap-2 whitespace-nowrap">
                GET IT ON <span className="text-sm">Google Play</span>
              </button>
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:bg-white/10 flex items-center gap-2 whitespace-nowrap">
                DOWNLOAD ON <span className="text-sm">App Store</span>
              </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BanskoExperience;