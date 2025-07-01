import { motion } from "framer-motion";
import { Clock, Calendar, Music, ChevronLeft, ChevronRight, X } from "lucide-react";
import { UPCOMING_EVENTS, SPEAKEASY_SETLIST } from "@/lib/constants";
import AnimatedText from "@/components/AnimatedText";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import drakImage from "@/images/drak.jpg";
import drak2Image from "@/images/drak2.jpg";
import drak3Image from "@/images/drak3.jpg";
import drak4Image from "@/images/drak4.jpg";
import bb1Image from "@/images/bb1.jpg";

const promoImages = [
  drakImage,
  drak2Image,
  drak3Image,
  drak4Image,
];

// Function to generate calendar event URLs
function generateCalendarUrls(event: typeof UPCOMING_EVENTS[0]) {
  // Parse the event date and time
  const eventDate = new Date(`${event.month} ${event.day}, ${event.year} ${event.time}`);
  
  // Format for different calendar providers
  const startDate = eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  
  const title = encodeURIComponent(`Drakkari Black at ${event.venue}`);
  const details = encodeURIComponent(`Live performance by Drakkari Black at ${event.venue}, ${event.location}. ${event.priceRange}`);
  const location = encodeURIComponent(`${event.venue}, ${event.location}`);
  
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${details}&location=${location}`,
    yahoo: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startDate}&et=${endDate}&desc=${details}&in_loc=${location}`,
    ics: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${decodeURIComponent(title)}
DESCRIPTION:${decodeURIComponent(details)}
LOCATION:${decodeURIComponent(location)}
END:VEVENT
END:VCALENDAR`
  };
}

// Function to handle add to calendar with provider selection
function handleAddToCalendar(event: typeof UPCOMING_EVENTS[0], provider: 'google' | 'outlook' | 'yahoo' | 'ics') {
  const urls = generateCalendarUrls(event);
  
  if (provider === 'ics') {
    // Create and download ICS file
    const element = document.createElement('a');
    element.setAttribute('href', urls.ics);
    element.setAttribute('download', `drakkari-black-${event.venue.toLowerCase().replace(/\s+/g, '-')}.ics`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } else {
    window.open(urls[provider], '_blank');
  }
}

function SetListModal() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % SPEAKEASY_SETLIST.length);
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + SPEAKEASY_SETLIST.length) % SPEAKEASY_SETLIST.length);
  };

  const currentSong = SPEAKEASY_SETLIST[currentIndex];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-primary text-lg px-8 py-4">
          <Music className="mr-3" size={24} />
          View Set List
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-deep-black border-crimson p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Speakeasy Set List</DialogTitle>
          <DialogDescription>Browse through the songs from Drakkari Black's intimate speakeasy performances</DialogDescription>
        </DialogHeader>
        <div className="relative">
          {/* Song Card */}
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="p-8 text-center"
          >
            <div className="mb-6">
              <img 
                src={currentSong.image} 
                alt={`${currentSong.title} album cover`}
                className="w-64 h-64 mx-auto rounded-2xl shadow-2xl border-2 border-crimson"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h3>
            <p className="text-luxury-accent text-lg font-medium mb-1">{currentSong.artist}</p>
            <p className="text-smoke text-sm opacity-75">{currentSong.album}</p>
          </motion.div>

          {/* Navigation */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={prevSong}
              className="text-white hover:text-luxury-accent hover:bg-black/20 ml-2"
            >
              <ChevronLeft size={24} />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextSong}
              className="text-white hover:text-luxury-accent hover:bg-black/20 mr-2"
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 pb-6">
            {SPEAKEASY_SETLIST.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-luxury-accent' : 'bg-smoke/30'
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white tracking-wider leading-tight">
              <span className="block sm:inline">Upcoming</span>
              <span className="block sm:inline">
                <span className="sm:ml-4">
                  <AnimatedText text="Appearances" className="brand-font luxury-accent animate-glow" delay={0.8} />
                </span>
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Catch <span className="luxury-accent brand-font text-4xl">Drakkari Black</span> live at these exclusive venues
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      <Calendar className="mr-3 text-crimson-accent" size={20} />
                      <span className="font-medium">{event.priceRange}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full btn-primary text-lg flex items-center justify-center">
                        <Calendar className="mr-2" size={20} />
                        Add to Calendar
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black/95 border-red-900/50 backdrop-blur-sm">
                      <DropdownMenuItem 
                        className="text-white hover:bg-red-900/30 focus:bg-red-900/30 cursor-pointer"
                        onClick={() => handleAddToCalendar(event, 'google')}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Google Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-white hover:bg-red-900/30 focus:bg-red-900/30 cursor-pointer"
                        onClick={() => handleAddToCalendar(event, 'outlook')}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Outlook Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-white hover:bg-red-900/30 focus:bg-red-900/30 cursor-pointer"
                        onClick={() => handleAddToCalendar(event, 'yahoo')}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Yahoo Calendar
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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

          {/* Speakeasy Set List */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <h2 className="text-5xl font-bold luxury-accent mb-8 tracking-wide animate-glow">
              <AnimatedText text="Speakeasy Set List" className="brand-font" delay={1.0} />
            </h2>
            <p className="text-smoke text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore the intimate acoustic arrangements from my exclusive speakeasy performances
            </p>
            <SetListModal />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
