import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { STREAMING_PLATFORMS } from "@/lib/constants";

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
    <div className="pt-16 min-h-screen">
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">Listening Lounge</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Immerse yourself in the complete Drakkari Black experience
            </p>
          </motion.div>
          
          {/* Featured Video */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold gold-accent mb-8 text-center">Featured Video</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-dark-surface rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675" 
                  alt="Concert stage with dramatic lighting" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-6 transform hover:scale-110 transition-all duration-200 shadow-lg">
                    <Play size={32} className="ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">Midnight Sessions - Live Performance</h3>
                  <p className="text-gray-300">Exclusive live recording from the sold-out Madison Square Garden show</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Video Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold gold-accent mb-8 text-center">Video Collection</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-dark-surface rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                    <button className="text-primary gold-accent-hover transition-colors duration-200 flex items-center">
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
            <h2 className="text-3xl font-semibold gold-accent mb-8">Stream Everywhere</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {STREAMING_PLATFORMS.map((platform, index) => (
                <motion.a 
                  key={index}
                  href={platform.url}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-dark-surface ${platform.color} text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 flex items-center`}
                >
                  <i className={`${platform.icon} text-2xl mr-3`}></i>
                  {platform.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
