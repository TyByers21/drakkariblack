import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

export default function About() {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-wider leading-tight">
              <span className="block sm:inline">About</span>
              <span className="block sm:inline">
                <span className="sm:ml-4">
                  <AnimatedText text="Drakkari Black" className="brand-font text-6xl sm:text-8xl luxury-accent animate-glow" delay={0.8} />
                </span>
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold animate-glow brand-accent mb-8 tracking-wide">The Journey</h2>
              <p className="text-smoke text-xl leading-relaxed font-light">
                <span className="text-white font-medium">Drakkari Black</span> is an artist who doesn't chase trends—he creates atmospheres. Born from the intersection of classical training and urban wisdom, he emerged from the underground clubs of Atlanta with a sound that's both eclectic and undeniably commercial, blending <span className="luxury-accent font-medium">rich acoustic textures with haunting melodies</span> that linger long after the song ends.
              </p>
              <p className="text-smoke text-xl leading-relaxed font-light">
                His voice is his signature—melodic, emotive, and unmistakably intimate—pulling listeners into a world that feels cinematic yet deeply personal. Each track unfolds like a confession whispered in the dark, balancing raw vulnerability with polished songwriting that resonates across genres. His music carries the weight of lived experience: <span className="brand-accent animate-glow text-white font-medium">love, loss, reflection, and quiet resilience</span>, all woven into hypnotic lyrics and infectious harmonies.
              </p>
              <p className="text-smoke text-xl leading-relaxed font-light">
                With over a decade of experience crafting sounds that resonate across generations, Drakkari has collaborated with industry legends while maintaining his unique artistic vision. From intimate studio sessions to sold-out stages, every performance is a testament to authentic artistry. In an era hungry for something real, his sound stands apart—compelling, immersive, and impossible to ignore. <span className="luxury-accent font-medium">This is an artist poised for global discovery. A voice meant to travel far.</span>
              </p>
              
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-cyan-500">
                <div className="text-center glass-card p-6 rounded-2xl">
                  <div className="text-4xl font-black luxury-accent animate-glow">15+</div>
                  <div className="text-smoke text-lg mt-2">Years Active</div>
                </div>
                <div className="text-center glass-card p-6 rounded-2xl">
                  <div className="text-4xl font-black luxury-accent  animate-glow">50K+</div>
                  <div className="text-smoke text-lg mt-2">Monthly Listeners</div>
                </div>
                <div className="text-center glass-card p-6 rounded-2xl">
                  <div className="text-4xl font-black luxury-accent animate-glow">50+</div>
                  <div className="text-smoke text-lg mt-2">Live Shows</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative luxury-card p-8"
            >
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional music studio setup" 
                className="rounded-xl shadow-2xl w-full h-96 object-cover border border-cyan-500" 
              />
              <div className="absolute inset-8 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent rounded-xl"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="text-2xl font-bold animate-glow luxury-accent mb-2">In The Studio</h3>
                <p className="text-smoke">Where the magic happens</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
