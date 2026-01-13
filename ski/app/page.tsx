"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Video, CableCar, Calendar, Snowflake, Instagram, Youtube, Facebook, Camera } from 'lucide-react';

// IMPORT COMPONENTS
import WeatherOverlay from './components/WeatherPage'; 
import PricesOverlay from './components/PricesPage'; 
import GalleryOverlay from './components/GalleryPage'; // Imported Gallery Page
import NewsOverlay from './components/NewsPage'; // NEW IMPORT

const BanskoExperience: React.FC = () => {
  const [showWeather, setShowWeather] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const [showGallery, setShowGallery] = useState(false); // NEW STATE FOR GALLERY
  const [showNews, setShowNews] = useState(false); // NEW STATE FOR NEWS

  const containerRef = React.useRef<HTMLDivElement>(null);
  const section1Ref = React.useRef<HTMLDivElement>(null);
  const section2Ref = React.useRef<HTMLDivElement>(null);
  const section3Ref = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: scrollSection1 } = useScroll({ target: section1Ref, offset: ["start start", "end start"] });
  const { scrollYProgress: scrollSection2 } = useScroll({ target: section2Ref, offset: ["start start", "end start"] });
  const { scrollYProgress: scrollSection3 } = useScroll({ target: section3Ref, offset: ["start start", "end start"] });

  const parallaxY1 = useTransform(scrollSection1, [0, 1], [0, -50]);
  const bgScale1 = useTransform(scrollSection1, [0, 1], [1, 1.05]);
  const parallaxY2 = useTransform(scrollSection2, [0, 1], [0, -50]);
  const bgScale2 = useTransform(scrollSection2, [0, 1], [1, 1.05]);
  const parallaxY3 = useTransform(scrollSection3, [0, 1], [0, -50]);
  const bgScale3 = useTransform(scrollSection3, [0, 1], [1, 1.05]);

  const popOut = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 17 },
    zIndex: 50,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)"
  };

  return (
    <>
      <AnimatePresence>
        {showWeather && <WeatherOverlay onClose={() => setShowWeather(false)} />}
        {showPrices && <PricesOverlay onClose={() => setShowPrices(false)} />}
        {showGallery && <GalleryOverlay onClose={() => setShowGallery(false)} />} {/* RENDER GALLERY */}
        {showNews && <NewsOverlay onClose={() => setShowNews(false)} />} {/* RENDER NEWS */}
      </AnimatePresence>

      <div 
        ref={containerRef}
        className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#1e3a5f] no-scrollbar"
      >
        {/* --- SECTION 1 --- */}
        <section ref={section1Ref} className="relative z-10 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden snap-start snap-always">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
            <motion.div className="absolute inset-0 bg-cover bg-center w-full h-full" style={{ backgroundImage: 'url("/pictures/photo1.png")', scale: bgScale1, y: parallaxY1 }} />
            <div className="absolute inset-0 bg-black/5 z-20" />
          </div>
          <header className="absolute top-0 left-0 z-50 w-full p-8 flex justify-center">
            <div className="absolute left-12 top-5 text-white flex flex-col items-start">
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
          <div className="w-full max-w-6xl text-center relative z-10">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, ease: "easeInOut" }} className="w-full h-[3px] bg-slate-300/40 mb-8 origin-center" />
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <h2 className="text-4xl md:text-[70px] font-black tracking-tighter leading-[0.9] uppercase" style={{ color: '#135285' }}>Elevate Your Adventure</h2>
              <h2 className="text-4xl md:text-[50px] font-bold tracking-tighter leading-[0.9] uppercase mt-4" style={{ color: '#135285' }}>Every Season</h2>
            </motion.div>
          </div>
        </section>

        {/* --- SECTION 2 --- */}
        <section ref={section2Ref} className="relative z-10 h-screen w-full flex items-center justify-center p-8 overflow-hidden snap-start snap-always">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
            <motion.div className="absolute inset-0 bg-cover bg-center w-full h-full" style={{ backgroundImage: 'url("/pictures/photo2.png")', scale: bgScale2, y: parallaxY2 }} />
            <div className="absolute inset-0 bg-black/5 z-20" />
          </div>

          <motion.div 
            className="grid grid-cols-6 grid-rows-3 gap-5 max-w-7xl w-full h-[85vh] relative z-10 text-[#f0f0f0]"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* WEBCAMS */}
            <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-3 flex justify-between items-center text-white relative overflow-hidden">
              <div className="z-10 flex flex-col justify-center items-center h-full w-[50%] text-center">
                <div className="flex items-center justify-center gap-2 opacity-70 text-lg font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-2 w-fit">
                   <Video size={18} /> Webcams
                </div>
                <p className="text-md opacity-80 leading-snug">Live footage of all<br/>ski tracks in resort</p>
              </div>
              <div className="w-[50%] h-full rounded-3xl bg-cover bg-center shadow-inner" style={{backgroundImage: 'url("https://banskoski.com/uploads/slider/Slider-8-TEST5.jpg")'}} />
            </motion.div>

            {/* WEATHER */}
            <motion.div whileHover={popOut} onClick={() => setShowWeather(true)} className="col-span-2 row-span-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-3 flex gap-4 items-center text-white cursor-pointer">
               <div className="w-[50%] h-full rounded-3xl bg-cover bg-center shadow-inner" style={{backgroundImage: 'url("https://banskoski.com/uploads/slider/Slider-8-TEST5.jpg")'}} />
               <div className="flex flex-col justify-center items-center w-[50%] h-full bg-white/10 rounded-3xl p-2">
                 <span className="text-lg font-bold uppercase tracking-wider mb-1 text-[#f0f0f0]">Weather</span>
                 <div className="flex flex-col items-center justify-center gap-0">
                   <span className="text-[12px] uppercase font-bold text-white">Monday 12</span>
                   <Snowflake size={24} className="my-1 text-white" />
                   <span className="text-xl font-bold text-white">-1° C</span>
                 </div>
               </div>
            </motion.div>

            {/* NEWS */}
            <motion.div 
              whileHover={popOut} 
              onClick={() => setShowNews(true)} // CONNECTED HERE
              className="col-span-2 row-span-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-5 text-white flex flex-col relative overflow-hidden cursor-pointer"
            >
              <span className="text-lg font-bold uppercase tracking-widest mb-3">News</span>
              <div className="w-full h-[60%] rounded-2xl bg-cover bg-center mb-3 border border-white/10 shadow-lg" style={{backgroundImage: 'url("/pictures/photo1.png")'}} />
              <div className="flex flex-col items-center text-center mt-1">
                <p className="text-xs font-bold leading-tight mb-4 px-2">Official start of winter season<br/>2025-2026 in Bansko</p>
                <button className="px-5 py-2 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md rounded-xl text-[9px] border border-white/40 uppercase font-bold tracking-wider">More Information</button>
              </div>
            </motion.div>

            {/* SKI MAP */}
            <motion.div whileHover={popOut} className="col-span-2 row-span-2 bg-white/10 backdrop-blur-xl border border-white/30 rounded-[2.5rem] relative overflow-hidden group cursor-pointer p-2">
              <div className="w-full h-full rounded-[2rem] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("/pictures/map-thumb.jpg")'}} />
              <div className="absolute bottom-4 right-8 text-[#135285] text-lg font-black tracking-tighter uppercase py-1 rounded-lg">Ski Map</div>
            </motion.div>

            {/* GALLERY - CLICK TO OPEN GALLERY */}
            <motion.div 
              whileHover={popOut} 
              onClick={() => setShowGallery(true)} // CONNECTED HERE
              className="col-span-2 row-span-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] relative overflow-hidden cursor-pointer p-2"
            >
              <div className="w-full h-full rounded-3xl bg-cover bg-center opacity-80 hover:opacity-100 transition-opacity" style={{backgroundImage: 'url("/pictures/photo2.png")'}} />
              <span className="absolute top-4 left-6 text-[#135285] text-lg font-black tracking-tighter uppercase py-1 rounded-lg">Gallery</span>
            </motion.div>

            {/* SKI PASS */}
            <motion.div whileHover={popOut} className="col-span-2 row-span-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-2 text-white flex gap-2 items-center justify-between">
              <div className="flex flex-col justify-center items-center w-[40%] h-full bg-white/10 rounded-3xl py-2">
                  <span className="text-lg font-bold uppercase mb-1">Ski Pass</span>
                  <div className="text-[9px] opacity-70 mb-1">Currently</div>
                  <div className="bg-red-500 p-1.5 rounded-lg mb-1 shadow-lg"><Ticket size={18} className="fill-white"/></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest">Inactive</span>
              </div>
              <div className="w-[60%] h-full rounded-3xl bg-cover bg-center border border-white/10" style={{backgroundImage: 'url("/pictures/photo1.png")'}} />
            </motion.div>

            {/* PRICES */}
            <motion.div whileHover={popOut} onClick={() => setShowPrices(true)} className="col-span-2 row-span-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] relative overflow-hidden cursor-pointer p-2">
              <div className="w-full h-full rounded-3xl bg-cover bg-center opacity-80" style={{backgroundImage: 'url("/pictures/photo2.png")'}} />
              <span className="absolute top-4 left-6 text-[#135285] text-lg font-black tracking-tighter uppercase py-1 rounded-lg">Prices</span>
            </motion.div>
          </motion.div>
        </section>

        {/* --- SECTION 3 --- */}
        <section ref={section3Ref} className="relative z-5 h-screen w-full flex flex-col items-center justify-center px-6 pt-10 overflow-hidden snap-start snap-always">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
            <motion.div className="absolute inset-0 bg-cover bg-center w-full h-full" style={{ backgroundImage: 'url("/pictures/photo3.png")', scale: bgScale3, y: parallaxY3 }} />
            <div className="absolute inset-0 bg-[#1e3a5f]/60 backdrop-blur-[2px] z-10" />
          </div>
          <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-white text-5xl md:text-[100px] font-black uppercase tracking-tighter leading-none mb-10 relative z-20">
            YOUR MOUNTAIN HOME
          </motion.h2>
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-end relative z-20 md:ml-auto">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="md:col-span-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <h3 className="text-xl font-bold mb-8 uppercase tracking-widest">Discover Bansko</h3>
                  <div className="grid grid-cols-2 gap-y-6 text-base">
                      {['Webcams', 'Gallery', 'Weather', 'News', 'Ski Pass', 'Ski Map', 'Summer Offers', 'Prices'].map(l => (<div key={l} className="border-b border-white/20 pb-1 cursor-pointer hover:text-white/60 transition-colors">{l}</div>))}
                  </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="md:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 text-white shadow-2xl">
                  <h3 className="text-sm font-bold mb-8 opacity-40 uppercase tracking-widest">Awarded</h3>
                  <div className="grid grid-cols-2 gap-5 items-center max-w-md">
                      <img src="/pictures/award1.png" alt="A1" className="h-22 w-22 object-contain" />
                      <img src="/pictures/award2.png" alt="A2" className="h-22 w-22 object-contain" />
                      <img src="/pictures/award3.png" alt="A3" className="h-22 w-22 object-contain" />
                      <img src="/pictures/award4.jpg" alt="A4" className="h-22 w-22 object-contain" />
                  </div>
              </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="w-full max-w-7xl flex flex-row justify-between items-center px-4 gap-6 relative z-20">
            <div className="flex flex-col items-start min-w-fit">
              <div className="flex flex-row items-end gap-2"><img src="./pictures/Logo.png" alt="Bansko Logo" className="h-16 w-auto" /></div>
              <p className="text-white/30 text-[9px] mt-1 tracking-widest uppercase">© 2010 - 2025 Bansko</p>
            </div>
            <div className="flex flex-row gap-4 text-white/50 border-x border-white/10 px-8 h-10 items-center">
                <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
                <Youtube size={20} className="hover:text-white transition-colors cursor-pointer" />
                <Facebook size={20} className="hover:text-white transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-row gap-3">
                <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:bg-white/10 flex items-center gap-2 whitespace-nowrap">GET IT ON <span className="text-sm">Google Play</span></button>
                <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:bg-white/10 flex items-center gap-2 whitespace-nowrap">DOWNLOAD ON <span className="text-sm">App Store</span></button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default BanskoExperience;