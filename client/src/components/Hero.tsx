import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import artistImage from "@assets/Ty SmooveNoTats_1750523642870.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        <div className="absolute inset-0 bg-black/40"></div>
        <img 
          src={artistImage} 
          alt="Drakkari Black artist portrait" 
          className="w-full h-full object-cover opacity-60" 
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight"
        >
          DRAKKARI<br>
          <span className="gold-accent">BLACK</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-300 font-light max-w-2xl mx-auto"
        >
          Experience the sound that defines a generation. Modern beats, timeless soul.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button className="btn-primary flex items-center">
            <Play className="mr-2" size={20} />
            Listen Now
          </button>
          <button className="btn-secondary flex items-center">
            <Calendar className="mr-2" size={20} />
            Book Performance
          </button>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-6"
        >
          {SOCIAL_LINKS.map((social, index) => (
            <a 
              key={index}
              href={social.url}
              className="text-2xl text-gray-400 gold-accent-hover transition-colors duration-200"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <i className="fas fa-chevron-down text-2xl"></i>
      </motion.div>
    </section>
  );
}
