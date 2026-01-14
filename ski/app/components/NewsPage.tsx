"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
// 1. Updated Imports
import { Ticket, Video, Images, Newspaper, Snowflake, X } from 'lucide-react';

interface NewsItem {
  _id: string; 
  title: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface NewsOverlayProps {
  onClose: () => void;
  // 2. Added navigation props
  onNavigate: (page: string) => void;
  variants: Variants;
}

const NewsOverlay: React.FC<NewsOverlayProps> = ({ onClose, onNavigate, variants }) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        
        if (data.success) {
          setNewsData(data.data);
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <motion.div
      // 3. Use passed variants
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Added select-none
      className="fixed inset-0 z-[100] w-full h-full bg-[#1e3a5f] overflow-hidden select-none"
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
        className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Header (Updated) */}
      <header className="absolute top-0 left-0 z-40 w-full p-8 flex justify-center pointer-events-none">
        <div className="absolute left-12 top-5 text-white">
          <img src="./pictures/Logo.png" alt="Bansko Logo" className="h-16 w-auto" />
        </div>
        
        {/* Pointer events auto ensures buttons are clickable */}
        <nav className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-full text-white shadow-2xl pointer-events-auto">
          
          <div className="flex gap-5 border-r border-white/20 pr-5">
             {/* 1. Prices */}
             <button onClick={() => onNavigate('Prices')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
               <Ticket size={20} />
             </button>

              {/* 2. Webcams */}
              <button onClick={() => onNavigate('Webcams')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
                <Video size={20} /> 
              </button>

              {/* 3. Gallery */}
              <button onClick={() => onNavigate('Gallery')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
                <Images size={20} /> 
              </button>

              {/* 4. News (Active Page) */}
              <button className="text-blue-300 scale-110 cursor-default">
                <Newspaper size={20} /> 
              </button>
          </div>

          <div className="flex gap-4 pl-3 items-center text-[15px] font-semibold">
            {/* 5. Weather */}
            <button onClick={() => onNavigate('Weather')} className="hover:text-blue-300 hover:scale-105 transition-all cursor-pointer">
                0.7° C
            </button>
            <div className="w-[1px] h-4 bg-white/30" />
            <span className="flex items-center gap-2"><Snowflake size={18} /> 120 cm</span>
          </div>
        </nav>
      </header>

      {/* News Grid Content */}
      <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar pt-32 pb-10 px-4 flex justify-center">
        <div className="max-w-6xl w-full">
          
          {loading ? (
            <div className="text-white text-center text-xl mt-20 opacity-80 animate-pulse">
              Loading News...
            </div>
          ) : newsData.length === 0 ? (
            <div className="text-white text-center text-xl mt-20 opacity-80">
              No news found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mx-auto">
              {newsData.map((item) => (
                <motion.div 
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-5 text-white h-[380px] w-full max-w-[25rem] justify-between shadow-lg hover:bg-white/15 transition-colors cursor-pointer relative"
                >
                  {/* Top Section: Logo & Badge */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-12 h-12 relative">
                        <img 
                          src="/pictures/miniLogo.png" 
                          alt="Bansko Icon" 
                          className="w-full h-full object-contain" 
                        />
                    </div>
                    
                    <span className="px-3 py-1 rounded-full border border-white/30 text-[10px] uppercase font-bold tracking-wider bg-white/10 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle Section: Title & Date */}
                  <div className="flex-1 flex flex-col justify-center mb-2">
                    <h3 className="text-lg font-bold leading-snug mb-2 pr-2 line-clamp-3">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-semibold opacity-80">{item.date}</p>
                  </div>

                  {/* Bottom Section: Image */}
                  <div 
                    className="w-full h-36 rounded-[1.2rem] bg-cover bg-center border border-white/10 shadow-inner"
                    style={{ backgroundImage: `url("${item.imageUrl}")` }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsOverlay;