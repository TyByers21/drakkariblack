import { motion } from "framer-motion";
import { Clock, Ticket } from "lucide-react";
import { UPCOMING_EVENTS } from "@/lib/constants";

const promoImages = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=600"
];

export default function Appearances() {
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
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-white tracking-wider">
              Upcoming <span className="luxury-accent animate-glow">Appearances</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Catch <span className="crimson-accent font-medium">Drakkari Black</span> live at these exclusive venues
            </p>
          </motion.div>
          
          {/* Event Calendar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-10 mb-20"
          >
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="luxury-card p-8 group cursor-pointer"
                style={{ 
                  boxShadow: '0 15px 40px rgba(220, 38, 38, 0.2)' 
                }}
              >
                <div className="bg-gradient-accent text-white p-6 rounded-2xl text-center mb-6 group-hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold opacity-90">{event.month}</div>
                  <div className="text-6xl font-black my-2">{event.day}</div>
                  <div className="text-lg font-semibold opacity-90">{event.year}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-luxury-accent transition-colors duration-300">{event.venue}</h3>
                  <p className="text-smoke mb-6 text-lg">{event.location}</p>
                  <div className="space-y-3 text-smoke mb-8">
                    <div className="flex items-center">
                      <Clock className="mr-3 text-crimson-accent" size={20} />
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Ticket className="mr-3 text-crimson-accent" size={20} />
                      <span className="font-medium">{event.priceRange}</span>
                    </div>
                  </div>
                  <button className="w-full btn-primary text-lg">
                    Get Tickets
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Promo Media Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-4xl font-bold luxury-accent mb-12 text-center tracking-wide animate-glow">Promotional Media</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {promoImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="luxury-card p-4 cursor-pointer group"
                  style={{ 
                    boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)' 
                  }}
                >
                  <img 
                    src={image} 
                    alt={`Promotional poster ${index + 1}`}
                    className="w-full h-80 object-cover rounded-xl border border-crimson group-hover:border-luxury-accent transition-all duration-300"
                  />
                  <div className="absolute inset-4 bg-gradient-to-t from-deep-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
