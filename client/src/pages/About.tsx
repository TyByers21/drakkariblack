import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">About Drakkari Black</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-semibold gold-accent mb-6">The Journey</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Born from the intersection of classical training and street wisdom, Drakkari Black emerged as a defining voice in contemporary music. His journey began in the underground clubs of Detroit, where raw talent met relentless ambition.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                With over a decade of experience crafting sounds that resonate across generations, Drakkari has collaborated with industry legends while maintaining his unique artistic vision. His music tells stories of triumph, struggle, and the human experience.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                From intimate studio sessions to sold-out arenas, every performance is a testament to his commitment to authentic artistry. Drakkari Black doesn't just make music—he creates experiences that transform listeners.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gold-accent">15+</div>
                  <div className="text-gray-400">Years Active</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gold-accent">500K+</div>
                  <div className="text-gray-400">Monthly Listeners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gold-accent">50+</div>
                  <div className="text-gray-400">Live Shows</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional music studio setup" 
                className="rounded-lg shadow-2xl w-full h-96 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
