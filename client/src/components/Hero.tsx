import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import artistImage from "@assets/Ty SmooveNoTats_1750523642870.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-red-900/30 to-black/80"></div>
        <img 
          src={artistImage} 
          alt="Drakkari Black artist portrait" 
          className="w-full h-full object-cover opacity-70" 
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-black mb-8 text-white leading-tight tracking-wider"
          style={{ 
            textShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(220,38,38,0.3)' 
          }}
        >
          <span className="brand-font luxury-accent animate-glow">Drakkari Black</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl mb-12 text-white font-light max-w-3xl mx-auto tracking-wide"
          style={{ 
            textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.8)',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(139,0,0,0.2))',
            padding: '1.5rem 2.5rem',
            borderRadius: '1rem',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          Experience the sound that defines a generation. <span className="crimson-accent font-medium">Modern beats, timeless soul.</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <button className="btn-primary flex items-center text-lg">
            <Play className="mr-3" size={24} />
            Listen Now
          </button>
          <button className="btn-secondary flex items-center text-lg">
            <Calendar className="mr-3" size={24} />
            Book Performance
          </button>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-8"
        >
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a 
              key={index}
              href={social.url}
              className="text-3xl text-smoke crimson-accent-hover transition-all duration-300 transform hover:scale-125"
              whileHover={{ y: -5 }}
              style={{ 
                textShadow: '0 0 15px rgba(220,38,38,0.3)' 
              }}
            >
              <i className={social.icon}></i>
            </motion.a>
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
