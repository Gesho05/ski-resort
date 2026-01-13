"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Video, CableCar, Calendar, Snowflake, X } from 'lucide-react';

// Define the structure of a News Item (matches your DB schema)
interface NewsItem {
  _id: string; 
  title: string;
  date: string;
  category: string;
  imageUrl: string;
}

interface NewsOverlayProps {
  onClose: () => void;
}

const NewsOverlay: React.FC<NewsOverlayProps> = ({ onClose }) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM THE DATABASE
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

      {/* News Grid Content */}
      <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar pt-32 pb-10 px-4">
        <div className="max-w-[90rem] mx-auto">
          
          {loading ? (
            <div className="text-white text-center text-xl mt-20 opacity-80 animate-pulse">
              Loading News...
            </div>
          ) : newsData.length === 0 ? (
            <div className="text-white text-center text-xl mt-20 opacity-80">
              No news found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map((item) => (
                <motion.div 
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  // CHANGED: Increased height to h-[500px] to stretch downwards
                  className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-6 text-white h-[500px] justify-between shadow-lg hover:bg-white/15 transition-colors cursor-pointer relative"
                >
                  {/* Top Section: Logo & Badge */}
                  <div className="flex justify-between items-start mb-2">
                    {/* CHANGED: Removed circular frame, just the raw image */}
                    <div className="w-16 h-16 relative">
                       <img 
                         src="/pictures/miniLogo.png" 
                         alt="Bansko Icon" 
                         className="w-full h-full object-contain" 
                       />
                    </div>
                    
                    <span className="px-4 py-1.5 rounded-full border border-white/30 text-xs uppercase font-bold tracking-wider bg-white/10 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle Section: Title & Date */}
                  <div className="flex-1 flex flex-col justify-center mb-4">
                    <h3 className="text-2xl font-bold leading-tight mb-4 pr-4">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold opacity-90">{item.date}</p>
                  </div>

                  {/* Bottom Section: Image */}
                  {/* CHANGED: Taller height (h-52) and added horizontal margin (mx-1) to make it "smaller to the side" */}
                  <div 
                    className="w-full h-52 rounded-[1.5rem] bg-cover bg-center border border-white/10 shadow-inner"
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