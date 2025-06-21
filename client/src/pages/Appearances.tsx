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
    <div className="pt-16 min-h-screen">
      <section className="py-20 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">Upcoming Appearances</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Catch Drakkari Black live at these exclusive venues
            </p>
          </motion.div>
          
          {/* Event Calendar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-3 gap-8 mb-16"
          >
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-dark-bg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="bg-primary text-primary-foreground p-4 text-center">
                  <div className="text-3xl font-bold">{event.month}</div>
                  <div className="text-5xl font-black">{event.day}</div>
                  <div className="text-sm font-semibold">{event.year}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{event.venue}</h3>
                  <p className="text-gray-400 mb-4">{event.location}</p>
                  <div className="space-y-2 text-gray-300 mb-6">
                    <div className="flex items-center">
                      <Clock className="mr-2 text-primary" size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Ticket className="mr-2 text-primary" size={16} />
                      <span>{event.priceRange}</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors duration-200">
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
            <h2 className="text-3xl font-semibold gold-accent mb-8 text-center">Promotional Media</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {promoImages.map((image, index) => (
                <motion.img 
                  key={index}
                  src={image} 
                  alt={`Promotional poster ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
