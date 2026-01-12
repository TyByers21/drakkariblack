import { motion } from "framer-motion";
import { Play, X, Disc } from "lucide-react";
import { STREAMING_PLATFORMS } from "@/lib/constants";
import { useState, useEffect } from "react";
import drakImage from "@/images/drak.jpg";
import drak2Image from "@/images/drak2.jpg";
import bb1Image from "@/images/bb1.jpg";
import bgTexture from "@assets/generated_images/dark_industrial_texture_background.png";
import featuredVideoFile from "@assets/My_Prayer_-v1_(1)_1768185489542.mp4";
import myPrayerCover from "@assets/My_Prayer_-_single_cover_1768193900728.png";

const Countdown = () => {
  const targetDate = new Date('2026-01-21T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <span 
        className="text-2xl md:text-4xl font-bold text-cyan-400"
        style={{ fontFamily: "'Syncopate', sans-serif", textShadow: "0 0 20px rgba(6, 182, 212, 0.6)" }}
      >
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-white/50 uppercase tracking-widest mt-1" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-cyan-500/50 text-xl md:text-3xl font-light">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-cyan-500/50 text-xl md:text-3xl font-light">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-cyan-500/50 text-xl md:text-3xl font-light">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

const videos = [
  {
    title: "Quicksand",
    description: "First single release",
    thumbnail: drak2Image,
    videoUrl: "https://youtu.be/jfvJn0JWBCI?si=yc5hBxN9j273dh6j"
  },
  {
    title: "Bad Bitch Comin",
    description: "Exclusive song written for Rihanna",
    thumbnail: bb1Image,
    videoUrl: "https://youtu.be/xyWb6bErq9o?si=X3wenN5ta5K_oAHf"
  },
  {
    title: "Put It Right There",
    description: "Best moments from international shows",
    thumbnail: drakImage,
    videoUrl: "https://youtu.be/kJbk2raSQCk?si=sa9IDjPO8qQZcDGe"
  }
];

function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return url;
}

function VideoModal({ video, isOpen, onClose }: { 
  video: { title: string; videoUrl: string; description: string } | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!isOpen || !video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-6xl aspect-video bg-deep-black rounded-xl overflow-hidden border border-cyan-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-cyan-500/30 text-white rounded-full p-2 transition-colors duration-200 border border-cyan-500/30"
        >
          <X size={24} />
        </button>
        
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <p className="text-xl mb-4">Video URL not provided</p>
              <p className="text-smoke">Please add a video URL to play this content</p>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-2xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>{video.title}</h3>
          <p className="text-smoke">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ListeningLounge() {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoUrl: string; description: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideo = (video: { title: string; videoUrl: string; description: string }) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="pt-20 min-h-screen bg-deep-black">
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
      
      {/* DBX Hero Section */}
      <section 
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ 
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.1) 2px, rgba(6, 182, 212, 0.1) 4px)'
          }}
        />

        {/* HUD Corner elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50" />
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-500/50" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-500/50" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Album Promo Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 border border-cyan-500/30 bg-black/50 backdrop-blur-sm">
              <Disc className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span 
                className="text-cyan-400 text-sm uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Chakra Petch', sans-serif" }}
              >
                New Album Coming Soon
              </span>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 40px rgba(6, 182, 212, 0.4)"
              }}
            >
              D.B.X.
            </h1>
            
            <div className="relative inline-block">
              <motion.div
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                className="absolute inset-0 bg-cyan-900/30 z-0 pointer-events-none"
              />
              <h2 
                className="relative z-10 text-lg md:text-2xl uppercase tracking-[0.3em] text-white/90 border-t border-b border-cyan-500/30 py-4 px-4 md:px-12 backdrop-blur-sm font-light"
                style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 300 }}
              >
                The Drakkari Black Xperiment
              </h2>
            </div>
            
            <p 
              className="text-cyan-500 text-xl md:text-2xl font-bold tracking-widest mb-6"
              style={{ fontFamily: "'Syncopate', sans-serif" }}
            >
              VOL. 1 • 1/21/2026
            </p>
            
            <Countdown />
          </motion.div>

          {/* Featured Video - My Prayer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 
              className="text-2xl md:text-4xl font-bold text-center mb-8 text-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Video Spotlight
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div 
                className="relative aspect-video overflow-hidden rounded-lg border border-cyan-500/40 bg-black/60 backdrop-blur-sm"
                style={{ boxShadow: "0 0 60px rgba(6, 182, 212, 0.2)" }}
              >
                <video 
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster={myPrayerCover}
                >
                  <source src={featuredVideoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* HUD corners on video */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-500/70 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-500/70 pointer-events-none" />
              </div>
              
              <div className="text-center mt-6">
                <h3 
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                >
                  My Prayer
                </h3>
                <p className="text-cyan-400/70 text-sm uppercase tracking-wider">
                  Exclusive Preview from D.B.X. Vol. 1
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-deep-black via-black/95 to-deep-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Video Collection
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-12" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 group cursor-pointer rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ y: -8 }}
                  onClick={() => openVideo(video)}
                >
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play size={32} className="text-cyan-400" style={{ filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))" }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">{video.title}</h3>
                    <p className="text-smoke text-sm mb-4 leading-relaxed">{video.description}</p>
                    <button className="text-cyan-400 hover:text-white transition-all duration-300 flex items-center font-semibold text-sm uppercase tracking-wider" style={{ textShadow: "0 0 10px rgba(6, 182, 212, 0.5)" }}>
                      <Play size={16} className="mr-2" />
                      Watch Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Streaming Platforms */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Stream Everywhere
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-12" />
            
            <div className="flex flex-wrap justify-center gap-6">
              {STREAMING_PLATFORMS.map((platform, index) => (
                <motion.a 
                  key={index}
                  href={platform.url}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card px-8 py-4 text-white font-bold transition-all duration-300 flex items-center text-base uppercase tracking-wider group rounded-xl border border-white/10 hover:border-cyan-500/50"
                >
                  <i className={`${platform.icon} text-2xl mr-3 group-hover:text-cyan-400 transition-colors duration-300`}></i>
                  <span className="group-hover:text-cyan-400 transition-colors duration-300">{platform.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
