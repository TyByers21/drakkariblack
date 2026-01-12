import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Play, Calendar, Instagram, Twitter, Youtube, Heart, DollarSign, ArrowRight, Disc, Ticket, Shirt } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Link } from "wouter";
import bgTexture from "@assets/generated_images/dark_industrial_texture_background.png";
import cashappQR from "@/images/cashapp-qr.png";
import zelleQR from "@/images/zelle-qr.png";

const ScrambleChar = ({ char, stopDelay }: { char: string, stopDelay: number }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [isDone, setIsDone] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    let currentDelay = 50;
    let elapsedTime = 0;
    const totalDuration = stopDelay * 1000;
    
    const cycle = () => {
      const progress = elapsedTime / totalDuration;
      
      if (elapsedTime >= totalDuration) {
        setDisplayChar(char);
        setIsDone(true);
        return;
      }

      setDisplayChar(chars[Math.floor(Math.random() * chars.length)]);
      currentDelay = 50 + (Math.pow(progress, 3) * 400); 
      elapsedTime += currentDelay;
      timeoutRef.current = setTimeout(cycle, currentDelay);
    };

    cycle();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [char, stopDelay]);

  return (
    <span className="relative inline-block" style={{ width: '0.8em', textAlign: 'center' }}>
      <span className={`relative z-10 transition-colors duration-300 ${isDone ? 'text-white' : 'text-white/50'}`}>
        {displayChar}
      </span>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={isDone ? { opacity: [0.2, 0.6, 0.2] } : { opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 blur-xl scale-150 text-crimson select-none pointer-events-none flex items-center justify-center"
        style={{ textShadow: `0 0 30px currentColor` }}
      >
        {char}
      </motion.span>
    </span>
  );
};

function InteractiveLink({ icon, text, href }: { icon: React.ReactNode, text: string, href: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 relative px-4 py-2 overflow-hidden">
      <span className="absolute inset-0 bg-crimson/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
      <span className="relative z-10 flex items-center gap-2 font-mono tracking-widest text-sm text-white group-hover:text-luxury-accent transition-colors duration-300">
        {icon}
        {text}
      </span>
      <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-luxury-accent group-hover:translate-x-1 transition-all duration-300 relative z-10" />
    </Link>
  );
}

export default function Hero() {
  return (
    <div className="bg-deep-black">
      {/* Album Promo Hero Section */}
      <div className="relative w-full min-h-screen text-white overflow-hidden font-mono selection:bg-crimson selection:text-black">
        {/* Background Texture with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url(${bgTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 pointer-events-none" />

        {/* Grid / HUD Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none p-4 md:p-8 border border-white/5 m-2 md:m-4">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-crimson/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-crimson/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-crimson/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-crimson/30" />
          
          <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-crimson/20" />
          <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-crimson/20" />
          <div className="absolute left-1/2 bottom-0 w-[1px] h-16 bg-crimson/20" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          
          {/* Version / Data Tags */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }} 
            className="absolute top-20 md:top-24 left-8 md:left-12 text-[10px] md:text-xs text-smoke tracking-widest font-mono"
          >
            SYS.VER.1.0 // <span className="text-crimson">ONLINE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="absolute top-20 md:top-24 right-8 md:right-12 text-[10px] md:text-xs text-smoke tracking-widest font-mono text-right"
          >
            MIAMI, FL <br className="md:hidden" /> 25.7617° N
          </motion.div>

          {/* Center Title Layout */}
          <div className="flex flex-col items-center justify-center text-center space-y-2 md:space-y-6 max-w-7xl mx-auto">
            
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 4.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] leading-[0.8] font-bold tracking-tighter cursor-default flex items-center justify-center gap-2 md:gap-4"
            >
              <ScrambleChar char="D" stopDelay={2.0} />
              <span className="text-white/20 inline-block w-[0.2em] text-center">.</span>
              <ScrambleChar char="B" stopDelay={3.0} />
              <span className="text-white/20 inline-block w-[0.2em] text-center">.</span>
              <ScrambleChar char="X" stopDelay={4.0} />
              <span className="text-white/20 inline-block w-[0.2em] text-center">.</span>
            </motion.div>

            <div className="relative overflow-hidden mt-8">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, delay: 4.5, ease: "circOut" }}
                className="absolute inset-0 bg-crimson/20 mix-blend-overlay z-20 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 4.8 }}
                className="text-sm md:text-xl lg:text-3xl uppercase tracking-[0.3em] md:tracking-[0.8em] text-white/90 border-t border-b border-white/10 py-4 px-2 md:px-12 backdrop-blur-sm"
              >
                The Drakkari Black Xperiment
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 5.5 }}
              className="max-w-4xl text-center mt-8 leading-relaxed pb-8"
            >
              <span className="text-xs md:text-sm text-smoke font-mono">
                <span className="text-crimson text-4xl md:text-6xl font-bold tracking-widest mt-2 block">VOL. 1 RELEASING 1/21/2026</span>
              </span>
              <span 
                className="text-luxury-accent hover:text-white transition-colors mt-8 block tracking-[0.3em] text-2xl md:text-4xl brand-font"
                style={{ textShadow: "0 0 10px rgba(220, 38, 38, 0.5)" }}
              >
                Drakkari Black
              </span>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, delay: 6.0 }}
               className="pt-12 flex flex-col md:flex-row gap-6 md:gap-12 items-center"
            >
               <InteractiveLink icon={<Disc className="w-4 h-4"/>} text="LISTEN" href="/listening" />
               <div className="w-1 h-1 bg-crimson/20 rounded-full hidden md:block" />
               <InteractiveLink icon={<Ticket className="w-4 h-4"/>} text="SHOWS" href="/appearances" />
               <div className="w-1 h-1 bg-crimson/20 rounded-full hidden md:block" />
               <InteractiveLink icon={<Shirt className="w-4 h-4"/>} text="MERCH" href="/merch" />
            </motion.div>
          </div>

          {/* Play Button Floating */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.5, duration: 1.5 }}
              className="absolute bottom-12 right-12 hidden md:block"
          >
              <Link href="/listening" className="flex items-center gap-3 group">
                <span className="font-mono text-xs text-white/50 group-hover:text-luxury-accent transition-colors">PLAY LATEST</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-crimson group-hover:bg-crimson/10 transition-all duration-300">
                    <Play className="w-4 h-4 fill-current text-white group-hover:text-luxury-accent" />
                </div>
              </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.5, duration: 1.5 }}
              className="absolute bottom-12 left-12 hidden md:flex gap-6"
          >
              <a href="https://www.instagram.com/drakkariblack" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/30 hover:text-luxury-accent transition-colors">IG</a>
              <a href="https://www.youtube.com/@drakkariblacktv" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/30 hover:text-luxury-accent transition-colors">YT</a>
              <a href="https://x.com/drakkariblack" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/30 hover:text-luxury-accent transition-colors">X</a>
              <a href="https://www.tiktok.com/@drakkariblack" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/30 hover:text-luxury-accent transition-colors">TT</a>
          </motion.div>

        </main>
      </div>

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

      {/* Support the Artist Section */}
      <section className="py-20 bg-deep-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Support the Artist
            </h2>
            <div className="w-24 h-1 bg-gradient-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-smoke text-xl max-w-2xl mx-auto">
              Show your appreciation and support <span className="text-luxury-accent font-semibold">Drakkari Black</span> by sending a tip
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CashApp QR */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <DollarSign className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">CashApp</h3>
              <div className="bg-white p-3 rounded-xl mb-4 mx-auto w-fit">
                <img 
                  src={cashappQR} 
                  alt="CashApp QR Code - $TyroneByers" 
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
              <p className="text-smoke text-lg font-medium">$TyroneByers</p>
              <p className="text-smoke opacity-75 text-sm mt-2">Scan with CashApp to send support</p>
            </motion.div>

            {/* Zelle QR */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Zelle</h3>
              <div className="bg-white p-3 rounded-xl mb-4 mx-auto w-fit">
                <img 
                  src={zelleQR} 
                  alt="Zelle QR Code - Tyrone Byers" 
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
              <p className="text-smoke text-lg font-medium">Tyrone Byers</p>
              <p className="text-smoke opacity-75 text-sm">786-200-4889</p>
              <p className="text-smoke opacity-75 text-sm mt-2">Scan with your bank app to send via Zelle</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-smoke text-lg">
              Your support helps keep the music alive. Thank you! 🎵
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
