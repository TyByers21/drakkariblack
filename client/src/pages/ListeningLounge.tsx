import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { STREAMING_PLATFORMS } from "@/lib/constants";
import AnimatedText from "@/components/AnimatedText";

const videos = [
  {
    title: "Studio Sessions Vol. 1",
    description: "Behind the scenes creative process",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    title: "Golden Hour Acoustic",
    description: "Stripped down intimate performance",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    title: "World Tour Highlights",
    description: "Best moments from international shows",
    thumbnail: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  }
];

export default function ListeningLounge() {
  return (
    <div className="pt-20 min-h-screen bg-deep-black">
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-white tracking-wider">
              Listening <AnimatedText text="Lounge" className="brand-font luxury-accent animate-glow text-8xl md:text-9xl" delay={0.8} />
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Immerse yourself in the complete <span className="crimson-accent font-medium">Drakkari Black experience</span>
            </p>
          </motion.div>
          
          {/* Featured Video */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold crimson-accent mb-12 text-center tracking-wide">Featured Video</h2>
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video luxury-card p-6 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675" 
                  alt="Concert stage with dramatic lighting" 
                  className="w-full h-full object-cover rounded-xl border border-crimson" 
                />
                <div className="absolute inset-6 bg-black/50 flex items-center justify-center rounded-xl">
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
                  <h3 className="text-3xl font-black text-white mb-3 luxury-accent">Midnight Sessions - Live Performance</h3>
                  <p className="text-smoke text-lg">Exclusive live recording from the sold-out Madison Square Garden show</p>
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
            <h2 className="text-4xl font-bold crimson-accent mb-12 text-center tracking-wide">Video Collection</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="luxury-card p-6 group cursor-pointer"
                  whileHover={{ y: -8 }}
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
            <h2 className="text-4xl font-bold luxury-accent mb-12 tracking-wide animate-glow">Stream Everywhere</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {STREAMING_PLATFORMS.map((platform, index) => (
                <motion.a 
                  key={index}
                  href={platform.url}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="luxury-card px-10 py-6 text-white font-bold transition-all duration-300 flex items-center text-lg uppercase tracking-wider group"
                  style={{ 
                    boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)' 
                  }}
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
