import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Play, Calendar, Instagram, Twitter, Youtube, Heart, DollarSign, ArrowRight, Disc, Ticket, Shirt } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Link } from "wouter";
import bgTexture from "@assets/generated_images/dark_industrial_texture_background.png";
import cashappQR from "@/images/cashapp-qr.png";
import venmoQR from "@/images/venmo-qr.png";
import dbxAlbumArt from "@assets/FB_1768982086946.png";

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
        className="absolute inset-0 z-0 blur-xl scale-150 text-cyan-500 select-none pointer-events-none flex items-center justify-center"
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
      <span className="absolute inset-0 bg-cyan-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
      <span className="relative z-10 flex items-center gap-2 font-mono tracking-widest text-sm text-white group-hover:text-cyan-400 transition-colors duration-300">
        {icon}
        {text}
      </span>
      <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
    </Link>
  );
}

export default function Hero() {
  return (
    <div className="bg-deep-black">
      {/* Album Promo Hero Section */}
      <div className="relative w-full min-h-screen text-white overflow-hidden font-mono selection:bg-cyan-500 selection:text-black">
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
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/30" />
          
          <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-cyan-500/20" />
          <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-cyan-500/20" />
          <div className="absolute left-1/2 bottom-0 w-[1px] h-16 bg-cyan-500/20" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 pt-24">
          
          {/* Version / Data Tags */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }} 
            className="absolute top-20 md:top-24 left-8 md:left-12 text-[10px] md:text-xs text-smoke tracking-widest font-mono"
          >
            SYS.VER.1.0 // <span className="text-cyan-500">ONLINE</span>
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
              style={{ fontFamily: "'Syncopate', sans-serif" }}
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
                className="absolute inset-0 bg-cyan-900/30 z-20 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 4.8 }}
                className="text-sm md:text-xl lg:text-3xl uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/90 border-t border-b border-cyan-500/30 py-4 px-2 md:px-12 backdrop-blur-sm font-light"
                style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 300 }}
              >
                The Drakkari Black Xperiment
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 5.5 }}
              className="max-w-2xl text-center mt-8 pb-8"
            >
              <img 
                src={dbxAlbumArt} 
                alt="D.B.X. - The Drakkari Black Xperiment" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-cyan-500/30"
                style={{ boxShadow: "0 0 60px rgba(6, 182, 212, 0.3)" }}
              />
              
              <p 
                className="text-white/70 text-sm md:text-base tracking-widest uppercase mt-8 mb-4"
                style={{ fontFamily: "'Chakra Petch', sans-serif" }}
              >
                Now Streaming On:
              </p>
              
              <div className="flex items-center justify-center gap-12">
                <a 
                  href="https://open.spotify.com/album/5zDcz8n4lq4F7BY6j3TZPe?si=3MuJCZGUSByN9QqpB6qIng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-green-500 group-hover:border-green-500 group-hover:bg-green-500/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-white/50 uppercase tracking-wider group-hover:text-green-500 transition-colors" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Spotify</span>
                </a>
                <a 
                  href="https://music.apple.com/us/album/d-b-x-the-drakkari-black-xperiment/1869737486" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-pink-500 group-hover:border-pink-500 group-hover:bg-pink-500/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-white/50 uppercase tracking-wider group-hover:text-pink-500 transition-colors" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Apple Music</span>
                </a>
                <a 
                  href="https://tidal.com/album/490230961" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L0 16.004 4.004 20.008l4.004-4.004 4.004 4.004 4.004-4.004-4.004-4.004 4.004-4.004-4.004-4.004zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-white/50 uppercase tracking-wider group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Tidal</span>
                </a>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, delay: 6.0 }}
               className="pt-12 flex flex-col md:flex-row gap-6 md:gap-12 items-center"
            >
               <InteractiveLink icon={<Disc className="w-4 h-4"/>} text="LISTEN" href="/listening" />
               <div className="w-1 h-1 bg-cyan-500/20 rounded-full hidden md:block" />
               <InteractiveLink icon={<Ticket className="w-4 h-4"/>} text="TOUR" href="/appearances" />
               <div className="w-1 h-1 bg-cyan-500/20 rounded-full hidden md:block" />
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
                <span className="font-mono text-xs text-white/50 group-hover:text-cyan-400 transition-colors">PLAY LATEST</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-500/10 transition-all duration-300">
                    <Play className="w-4 h-4 fill-current text-white group-hover:text-cyan-400" />
                </div>
              </Link>
          </motion.div>

          {/* Social Links - Mobile Bottom */}
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 1 }}
              className="lg:hidden flex justify-center gap-4 py-8"
          >
              <a href="https://instagram.com/drakkariblack" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@drakkariblacktv" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                <Youtube size={20} />
              </a>
              <a href="https://tiktok.com/@drakkariblack" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                <SiTiktok size={18} />
              </a>
              <a href="https://facebook.com/drakkariblack" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
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
                  <div className="bg-gradient-to-br from-cyan-500/10 to-deep-black border border-cyan-500/20 rounded-2xl p-8 h-full hover:border-luxury-accent/50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:bg-cyan-500/20">
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
                  <div className="bg-gradient-to-br from-luxury-accent/10 to-deep-black border border-luxury-accent/20 rounded-2xl p-8 h-full hover:border-cyan-500/50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:bg-luxury-accent/20">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      Live Shows
                    </h3>
                    <p className="text-smoke text-lg mb-6 group-hover:text-gray-300 transition-colors">
                      Experience the energy live at upcoming performances
                    </p>
                    <div className="flex items-center text-cyan-400 font-medium group-hover:text-white transition-colors">
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
                  alt="CashApp QR Code - $DrakkariBlack" 
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
              <p className="text-smoke text-lg font-medium">$DrakkariBlack</p>
              <p className="text-smoke opacity-75 text-sm mt-2">Scan with CashApp to send support</p>
            </motion.div>

            {/* Venmo QR */}
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
              <h3 className="text-2xl font-bold text-white mb-4">Venmo</h3>
              <div className="bg-white p-3 rounded-xl mb-4 mx-auto w-fit">
                <img 
                  src={venmoQR} 
                  alt="Venmo QR Code - @DrakkariBlack" 
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
              <p className="text-smoke text-lg font-medium">@DrakkariBlack</p>
              <p className="text-smoke opacity-75 text-sm mt-2">Scan with Venmo to send support</p>
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
