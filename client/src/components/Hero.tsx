import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { Play, Calendar, Volume2, Headphones, Instagram, Twitter, Youtube, Music } from "lucide-react";
import { SiTiktok } from "react-icons/si";
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
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth=".5"
                  opacity="0.4"
                />
              </pattern>
              <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#dc2626", stopOpacity: 0.6 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#ffd700", stopOpacity: 0.8 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#dc2626", stopOpacity: 0.6 }}
                />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect
              width="100%"
              height="100%"
              fill="url(#gridGrad)"
              opacity="0.1"
            />
          </svg>
        </div>

        {/* Visible Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: "3px",
              height: "3px",
              background: "#ffd700",
              boxShadow: "0 0 6px #ffd700",
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
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Electric Lines - More Visible */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-0.5"
            style={{
              left: "0%",
              right: "0%",
              top: `${15 + i * 15}%`,
              background:
                "linear-gradient(90deg, transparent 0%, #dc2626 10%, transparent 50%)",
              boxShadow: "0 0 4px #dc2626",
            }}
            animate={{
              scaleX: [0, 0.9, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Pulsating Orbs */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            top: "20%",
            left: "10%",
            background:
              "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            bottom: "30%",
            right: "15%",
            background:
              "radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Hero Section - Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative z-10">
        {/* Left Side - Content */}
        <div className="flex flex-col bg-black bg-opacity-80 justify-center items-center px-6 sm:px-8 lg:px-16 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto"
          >
            {/* Small Label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-luxury-accent text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 block text-center"
            >
              Artist • Performer • Visionary
            </motion.span>

            {/* Main Title - Single Line */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-none whitespace-nowrap">
              <span className="brand-font luxury-accent animate-glow">
                <AnimatedText
                  text="Drakkari Black"
                  className="inline"
                  delay={0.3}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base sm:text-lg lg:text-xl text-smoke mb-8 leading-relaxed"
            >
              Crafting the soundtrack to modern soul with innovative beats and
              timeless melodies.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 w-full"
            >
              <Link href="/listening" className="flex-1">
                <button className="glass-button bg-gradient-primary flex items-center justify-center text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 group w-full rounded-xl">
                  <Play
                    className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform"
                    size={18}
                  />
                  Play Latest
                </button>
              </Link>
              <Link href="/appearances" className="flex-1 ">
                <button className="glass-button animate-glow bg-gradient-primary flex items-center justify-center text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 group w-full rounded-xl">
                  <Calendar
                    className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform"
                    size={18}
                  />
                  View Shows
                </button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex space-x-4 sm:space-x-6 justify-center"
            >
              <motion.a
                href="https://www.tiktok.com/@drakkariblack?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-smoke hover:text-luxury-accent transition-colors duration-300"
              >
                <SiTiktok size={24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/drakkariblack"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-smoke hover:text-luxury-accent transition-colors duration-300"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://x.com/drakkariblack"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-smoke hover:text-luxury-accent transition-colors duration-300"
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@drakkariblacktv"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="text-smoke hover:text-luxury-accent transition-colors duration-300"
              >
                <Youtube size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Visual */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-full order-first lg:order-last">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="h-full min-h-[50vh] lg:min-h-full relative"
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
                background:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 80%)",
              }}
            ></div>
            {/* Bottom fade for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent"></div>
          </motion.div>

          {/* Floating Music Visualizer */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220,38,38,0.3)",
                  "0 0 40px rgba(220,38,38,0.6)",
                  "0 0 20px rgba(220,38,38,0.3)",
                ],
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
      <section className="py-20 px-8 lg:px-16 border-t border-smoke/10 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Latest Release */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10"
            >
              <Link href="/listening">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-crimson/10 to-deep-black border border-crimson/20 rounded-2xl p-8 h-full hover:border-luxury-accent/50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:bg-crimson/20">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-luxury-accent transition-colors">
                      Latest Release
                    </h3>
                    <p className="text-smoke text-lg mb-6 group-hover:text-gray-300 transition-colors">
                      Stream my newest single now available on all platforms
                    </p>
                    <div className="flex items-center text-luxury-accent font-medium group-hover:text-white transition-colors">
                      <Play size={16} className="mr-2" />
                      Listen Now
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Upcoming Shows */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10"
            >
              <Link href="/appearances">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-luxury-accent/10 to-deep-black border border-luxury-accent/20 rounded-2xl p-8 h-full hover:border-crimson/50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:bg-luxury-accent/20">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-crimson transition-colors">
                      Live Shows
                    </h3>
                    <p className="text-smoke text-lg mb-6 group-hover:text-gray-300 transition-colors">
                      Experience the energy live at upcoming performances
                    </p>
                    <div className="flex items-center text-crimson font-medium group-hover:text-white transition-colors">
                      <Calendar size={16} className="mr-2" />
                      View Dates
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Connect */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10"
            >
              <Link href="/contact">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-smoke/5 to-deep-black border border-smoke/20 rounded-2xl p-8 h-full hover:border-white/30 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:bg-smoke/10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-luxury-accent transition-colors">
                      Connect
                    </h3>
                    <p className="text-smoke text-lg mb-6 group-hover:text-gray-300 transition-colors">
                      Get in touch for bookings, collaborations, and more
                    </p>
                    <div className="flex items-center text-white font-medium group-hover:text-luxury-accent transition-colors">
                      <span className="mr-2">✉</span>
                      Get In Touch
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
