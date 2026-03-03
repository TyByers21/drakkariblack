import { motion } from "framer-motion";
import { STREAMING_PLATFORMS } from "@/lib/constants";
import bgTexture from "@assets/generated_images/dark_industrial_texture_background.png";
import dbxAlbumArt from "@assets/FB_1768982086946.png";

const videos = [
  {
    title: "Quicksand",
    description: "First single release",
    videoId: "jfvJn0JWBCI",
  },
  {
    title: "Bad Bitch Comin",
    description: "Exclusive song written for Rihanna",
    videoId: "xyWb6bErq9o",
  },
  {
    title: "Put It Right There",
    description: "Best moments from international shows",
    videoId: "kJbk2raSQCk",
  }
];

export default function ListeningLounge() {
  return (
    <div className="pt-20 min-h-screen bg-deep-black">
      
      {/* DBX Hero Section - Matching Homepage Layout */}
      <section className="relative md:min-h-screen overflow-hidden font-mono selection:bg-cyan-500 selection:text-black">
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
        <div className="relative z-10 flex flex-col items-center justify-center p-6 pt-28 pb-12 md:min-h-screen md:pt-24 md:pb-16">
          
          {/* Version / Data Tags */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }} 
            className="hidden md:block absolute top-20 md:top-24 left-8 md:left-12 text-[10px] md:text-xs text-smoke tracking-widest font-mono"
          >
            LISTENING.LOUNGE // <span className="text-cyan-500">ACTIVE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="hidden md:block absolute top-20 md:top-24 right-8 md:right-12 text-[10px] md:text-xs text-smoke tracking-widest font-mono text-right"
          >
            AUDIO.STREAM <br className="md:hidden" /> MODE.ON
          </motion.div>

          {/* Center Title Layout */}
          <div className="flex flex-col items-center justify-center text-center space-y-2 md:space-y-6 max-w-7xl mx-auto">
            
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] leading-[0.8] font-bold tracking-tighter cursor-default text-white"
              style={{ fontFamily: "'Syncopate', sans-serif", textShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
            >
              D.B.X.
            </motion.h1>

            <div className="relative overflow-hidden mt-8">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                className="absolute inset-0 bg-cyan-900/30 z-20 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
                className="text-sm md:text-xl lg:text-3xl uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/90 border-t border-b border-cyan-500/30 py-4 px-2 md:px-12 backdrop-blur-sm font-light"
                style={{ fontFamily: "'Chakra Petch', sans-serif", fontWeight: 300 }}
              >
                The Drakkari Black Xperiment
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1.0 }}
              className="max-w-4xl text-center mt-8 pb-8"
            >
              <img 
                src={dbxAlbumArt} 
                alt="D.B.X. - The Drakkari Black Xperiment" 
                className="w-full max-w-sm md:max-w-lg lg:max-w-2xl mx-auto rounded-lg shadow-2xl border border-cyan-500/30"
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
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-10 md:py-20 bg-gradient-to-b from-deep-black via-black/95 to-deep-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 
              className="text-2xl md:text-4xl font-bold text-center mb-8 text-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Video Spotlight
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div 
                className="relative aspect-video overflow-hidden rounded-lg border border-cyan-500/40 bg-black/60 backdrop-blur-sm"
                style={{ boxShadow: "0 0 60px rgba(6, 182, 212, 0.2)" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/bpmVy6V-R3E?rel=0&modestbranding=1"
                  title="My Prayer - Drakkari Black"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* HUD corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-cyan-500/70 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-500/70 pointer-events-none" />
              </div>
              
              <div className="text-center mt-6">
                <h3 
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                >
                  My Prayer
                </h3>
                <p className="text-cyan-400/70 text-sm uppercase tracking-wider">
                  Official Music Video
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Midnight Sessions Section */}
      <section className="py-20 bg-gradient-to-b from-deep-black via-black/95 to-deep-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-2xl md:text-4xl font-bold text-center mb-4 text-cyan-400"
              style={{
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Midnight Sessions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-12" />

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Episode #1",
                  videoId: "fzP2I_J5rTA",
                },
                {
                  title: "Episode #2",
                  videoId: "H3srs3TD34o",
                },
              ].map((episode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="glass-card p-4 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div
                    className="relative aspect-video overflow-hidden rounded-lg border border-cyan-500/30 bg-black/60"
                    style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.15)" }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${episode.videoId}?rel=0&modestbranding=1`}
                      title={`Midnight Sessions - ${episode.title}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-500/70 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-500/70 pointer-events-none" />
                  </div>
                  <div className="text-center mt-4">
                    <h3
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                    >
                      {episode.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-deep-black via-black/95 to-deep-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Video Collection
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-12" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-4 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div
                    className="relative aspect-video overflow-hidden rounded-lg border border-cyan-500/30 bg-black/60"
                    style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.15)" }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-500/70 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-500/70 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-500/70 pointer-events-none" />
                  </div>
                  <div className="text-center mt-4">
                    <h3
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "'Chakra Petch', sans-serif" }}
                    >
                      {video.title}
                    </h3>
                    <p className="text-smoke text-sm mt-1">{video.description}</p>
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
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400"
              style={{ 
                fontFamily: "'Syncopate', sans-serif",
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
            >
              Stream Everywhere
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-12" />
            
            <div className="flex flex-wrap justify-center gap-6">
              {STREAMING_PLATFORMS.map((platform, index) => (
                <motion.a 
                  key={index}
                  href={platform.url}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card px-8 py-4 text-white font-bold transition-all duration-300 flex items-center text-base uppercase tracking-wider group rounded-xl border border-white/10 hover:border-cyan-500/50"
                >
                  <i className={`${platform.icon} text-2xl mr-3 group-hover:text-cyan-400 transition-colors duration-300`}></i>
                  <span className="group-hover:text-cyan-400 transition-colors duration-300">{platform.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
