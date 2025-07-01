import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { Play, Calendar, Volume2, Headphones } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import artistImage from "@assets/Ty SmooveNoTats_1750523642870.png";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="min-h-screen bg-deep-black relative overflow-hidden">
      {/* Animated Electric Background */}
      <div className="absolute inset-0 z-0">
        {/* Electric Grid Pattern - More Visible */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.4"/>
              </pattern>
              <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#ffd700', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#gridGrad)" opacity="0.1" />
          </svg>
        </div>

        {/* Visible Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '3px',
              height: '3px',
              background: '#ffd700',
              boxShadow: '0 0 6px #ffd700',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Electric Lines - More Visible */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5"
            style={{
              left: '0%',
              right: '0%',
              top: `${15 + i * 15}%`,
              background: 'linear-gradient(90deg, transparent 0%, #dc2626 50%, transparent 100%)',
              boxShadow: '0 0 4px #dc2626',
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Pulsating Orbs */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            top: '20%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            bottom: '30%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Hero Section - Split Layout */}
      <section className="grid lg:grid-cols-2 min-h-screen relative z-10">
        {/* Left Side - Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Small Label */}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-luxury-accent text-sm font-medium tracking-widest text-center uppercase mb-4 block"
            >
              Artist • Performer • Visionary
            </motion.span>

            {/* Main Title */}
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-none">
              <AnimatedText text="Drakkari " className="brand-font luxury-accent animate-glow" delay={0.3} />
              <AnimatedText text="Black" className="brand-font flex-row luxury-accent animate-glow" delay={0.5} />
            </h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl lg:text-2xl text-smoke mb-8 max-w-lg leading-relaxed"
            >
              Crafting the soundtrack to modern soul with innovative beats and timeless melodies.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/listening">
                <button className="btn-primary flex items-center justify-center text-lg py-4 px-8 group w-full">
                  <Play className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                  Play Latest
                </button>
              </Link>
              <Link href="/appearances">
                <button className="btn-outline flex items-center justify-center text-lg py-4 px-8 group w-full">
                  <Calendar className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                  View Shows
                </button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex space-x-6"
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.url}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="text-2xl text-smoke hover:text-luxury-accent transition-colors duration-300"
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Visual */}
        <div className="relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="h-full relative"
          >
            <img 
              src={artistImage} 
              alt="Drakkari Black" 
              className="w-full h-full object-cover object-center" 
            />
            {/* Gradient fade from left to right - starts at 0% opacity on left, reaches 100% on right */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 80%)'
              }}
            ></div>
            {/* Bottom fade for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent"></div>
          </motion.div>

          {/* Floating Music Visualizer */}
          <div className="absolute top-8 right-8">
            <motion.div 
              animate={{ 
                boxShadow: ['0 0 20px rgba(220,38,38,0.3)', '0 0 40px rgba(220,38,38,0.6)', '0 0 20px rgba(220,38,38,0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-deep-black/80 backdrop-blur-sm border border-crimson/30 rounded-full p-4"
            >
              <Volume2 className="text-luxury-accent" size={24} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Content Row */}
      <section className="py-20 px-8 lg:px-16 border-t border-smoke/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Latest Release */}
            <Link href="/listening">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-crimson/10 to-deep-black border border-crimson/20 rounded-2xl p-8 h-full hover:border-luxury-accent/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-luxury-accent transition-colors">
                    Latest Release
                  </h3>
                  <p className="text-smoke text-lg mb-6">
                    Stream my newest single now available on all platforms
                  </p>
                  <div className="flex items-center text-luxury-accent font-medium">
                    <Play size={16} className="mr-2" />
                    Listen Now
                  </div>
                </div>
              </div>
            </Link>

            {/* Upcoming Shows */}
            <Link href="/appearances">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-luxury-accent/10 to-deep-black border border-luxury-accent/20 rounded-2xl p-8 h-full hover:border-crimson/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-crimson transition-colors">
                    Live Shows
                  </h3>
                  <p className="text-smoke text-lg mb-6">
                    Experience the energy live at upcoming performances
                  </p>
                  <div className="flex items-center text-crimson font-medium">
                    <Calendar size={16} className="mr-2" />
                    View Dates
                  </div>
                </div>
              </div>
            </Link>

            {/* Connect */}
            <Link href="/contact">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-br from-smoke/5 to-deep-black border border-smoke/20 rounded-2xl p-8 h-full hover:border-white/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                    Connect
                  </h3>
                  <p className="text-smoke text-lg mb-6">
                    Get in touch for bookings, collaborations, and more
                  </p>
                  <div className="flex items-center text-white font-medium">
                    <span className="mr-2">✉</span>
                    Get In Touch
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
