import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { Play, Calendar, Volume2, Headphones } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import artistImage from "@assets/Ty SmooveNoTats_1750523642870.png";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="min-h-screen bg-deep-black">
      {/* Main Hero Section - Split Layout */}
      <section className="grid lg:grid-cols-2 min-h-screen">
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
              className="text-luxury-accent text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              Artist • Performer • Visionary
            </motion.span>

            {/* Main Title */}
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-none">
              <AnimatedText text="Drakkari" className="brand-font block" delay={0.3} />
              <AnimatedText text="Black" className="brand-font luxury-accent" delay={0.5} />
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
              <Link href="/listening-lounge">
                <button className="btn-primary flex items-center justify-center text-lg py-4 px-8 group w-full">
                  <Play className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                  Play Latest
                </button>
              </Link>
              <Link href="/listening-lounge">
                <button className="btn-outline flex items-center justify-center text-lg py-4 px-8 group w-full">
                  <Headphones className="mr-3 group-hover:scale-110 transition-transform" size={20} />
                  Listening Lounge
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
        <div className="relative overflow-hidden bg-gradient-to-br from-deep-black via-crimson/20 to-deep-black">
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
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-deep-black/40 via-transparent to-transparent"></div>
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
            <Link href="/listening-lounge">
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
