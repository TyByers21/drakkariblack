import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { STREAMING_PLATFORMS } from "@/lib/constants";
import AnimatedText from "@/components/AnimatedText";
import { useState } from "react";
import drakImage from "@/images/drak.jpg";
import drak2Image from "@/images/drak2.jpg";
import bb1Image from "@/images/bb1.jpg";

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

const featuredVideo = {
  title: "Kissin' You",
  description: "Exclusive Miami release",
  thumbnail: drak2Image,
  videoUrl: "https://youtu.be/16CHYU-PYKw?si=hKB_e8uOlHwEG5gt"
};

// Helper function to get YouTube embed URL
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return url; // Return original if not YouTube or already embed format
}

// Video Player Modal Component
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
        className="relative w-full max-w-6xl aspect-video bg-deep-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
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
          <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
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
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-wider leading-tight">
              <span className="block sm:inline">Listening</span>
              <span className="block sm:inline">
                <span className="sm:ml-4">
                  <AnimatedText text="Lounge" className="brand-font text-7xl sm:text-9xl luxury-accent animate-glow" delay={0.8} />
                </span>
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Immerse yourself in the complete <span className="text-4xl brand-font luxury-accent mb-6 animate-glow">Drakkari Black </span>experience
            </p>
          </motion.div>
          
          {/* Featured Video */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold brand-accent mb-12 text-center animate-glow tracking-wide">Featured Video</h2>
            <div className="max-w-5xl mx-auto">
              <div 
                className="relative aspect-video glass-card p-6 overflow-hidden cursor-pointer group rounded-2xl"
                onClick={() => openVideo(featuredVideo)}
              >
                <img 
                  src={featuredVideo.thumbnail} 
                  alt={featuredVideo.title} 
                  className="w-full h-full object-cover rounded-xl border border-crimson transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-6 bg-black/50 flex items-center justify-center rounded-xl group-hover:bg-black/40 transition-colors duration-300">
                  <motion.button 
                    className="bg-gradient-accent text-white rounded-full p-8 shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      boxShadow: '0 0 40px rgba(220, 38, 38, 0.6)' 
                    }}
                  >
                    <Play size={40} className="ml-2" />
                  </motion.button>
                </div>
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl font-black text-white mb-3 luxury-accent">{featuredVideo.title}</h3>
                  <p className="text-smoke text-lg">{featuredVideo.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Video Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold brand-accent animate-glow mb-12 text-center tracking-wide">Video Collection</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 group cursor-pointer rounded-2xl"
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
                      <Play size={32} className="text-luxury-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-luxury-accent transition-colors duration-300">{video.title}</h3>
                    <p className="text-smoke text-sm mb-4 leading-relaxed">{video.description}</p>
                    <button className="crimson-accent crimson-accent-hover transition-all duration-300 flex items-center font-semibold text-sm uppercase tracking-wider">
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
            <h2 className="text-4xl font-bold brand-accent mb-12 tracking-wide animate-glow">Stream Everywhere</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {STREAMING_PLATFORMS.map((platform, index) => (
                <motion.a 
                  key={index}
                  href={platform.url}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card px-10 py-6 text-white font-bold transition-all duration-300 flex items-center text-lg uppercase tracking-wider group rounded-2xl"
                >
                  <i className={`${platform.icon} text-3xl mr-4 group-hover:text-luxury-accent transition-colors duration-300`}></i>
                  <span className="group-hover:text-luxury-accent transition-colors duration-300">{platform.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
