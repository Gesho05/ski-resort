"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Ticket, Video, Images, Newspaper, Snowflake, X, ChevronLeft } from 'lucide-react';

interface NewsItem {
  _id: string; 
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  info?: string;
}

interface NewsOverlayProps {
  onClose: () => void;
  onNavigate: (page: string) => void;
  variants: Variants;
}

const NewsOverlay: React.FC<NewsOverlayProps> = ({ onClose, onNavigate, variants }) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

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
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
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
              <button onClick={() => onNavigate('Gallery')} className="hover:text-blue-300 hover:scale-110 transition-all cursor-pointer">
                <Images size={20} /> 
              </button>
              <button className="text-blue-300 scale-110 cursor-default">
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

      {/* --- CONTENT AREA --- */}
      <div className="relative z-10 w-full h-full pt-32 pb-10 px-4">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: NEWS GRID */}
          {!selectedNews ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto no-scrollbar flex justify-center"
            >
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mx-auto pt-4 pb-10">
                    {newsData.map((item) => (
                      <motion.div 
                        key={item._id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedNews(item)}
                        className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-5 text-white h-[380px] w-full max-w-[25rem] justify-between shadow-lg hover:bg-white/15 transition-colors cursor-pointer relative group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="w-12 h-12 relative">
                              <img src="/pictures/miniLogo.png" alt="Icon" className="w-full h-full object-contain" />
                          </div>
                          <span className="px-3 py-1 rounded-full border border-white/30 text-[10px] uppercase font-bold tracking-wider bg-white/10 backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center mb-2">
                          <h3 className="text-lg font-bold leading-snug mb-2 pr-2 line-clamp-3 group-hover:text-blue-200 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] font-semibold opacity-80">{item.date}</p>
                        </div>
                        <div 
                          className="w-full h-36 rounded-[1.2rem] bg-cover bg-center border border-white/10 shadow-inner"
                          style={{ backgroundImage: `url("${item.imageUrl}")` }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            
            /* VIEW 2: NEWS DETAIL (FULL INFO) */
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex justify-center items-center"
            >
              <div className="max-w-4xl w-full h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative flex flex-col overflow-hidden">
                
                {/* Back Button (Fixed at top of card) */}
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-70 hover:opacity-100 hover:text-blue-300 transition-all mb-6 shrink-0"
                >
                  <ChevronLeft size={20} /> Back to News
                </button>

                <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
                  
                  {/* Image */}
                  <div className="w-full md:w-1/2 shrink-0">
                    <div 
                      className="w-full aspect-[4/3] rounded-[2rem] bg-cover bg-center border border-white/10 shadow-lg"
                      style={{ backgroundImage: `url("${selectedNews.imageUrl}")` }}
                    />
                  </div>

                  {/* Text */}
                  <div className="w-full md:w-1/2 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
                        {selectedNews.category}
                      </span>
                      <span className="text-sm font-mono opacity-60">
                        {selectedNews.date}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black leading-tight mb-6 shrink-0">
                      {selectedNews.title}
                    </h2>
                    <div className="prose prose-invert prose-p:text-white/80 prose-p:leading-relaxed text-sm md:text-base flex-1 overflow-y-auto no-scrollbar pr-2 font-medium">
                      <p>
                        {selectedNews.info || "No additional information available for this news item."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewsOverlay;