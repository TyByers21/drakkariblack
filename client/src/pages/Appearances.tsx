import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  Music,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { UPCOMING_EVENTS, SPEAKEASY_SETLIST } from "@/lib/constants";
import AnimatedText from "@/components/AnimatedText";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  enhanceSetlistWithSpotifyArt,
  type SongWithSpotifyArt,
} from "@/lib/spotify";
import drakChillin from "@/images/Drak chillin.png";
import drakChillin2 from "@/images/Drak chillin2.png";
import drakChillin3 from "@/images/Drak chillin3.png";
import drakSexy from "@/images/Drak sexy.png";
import drakCigar from "@/images/Drak cigar.png";
import drakLounge from "@/images/Drak lounge.png";
import tySmooth from "@/images/tySmooth.png";
import drak2Image from "@/images/drak2.jpg";
import cyberTy from "@/images/cyberTy.jpg";
import drak4Image from "@/images/drak4.jpg";
import drakBridge from "@/images/drakBridge.jpg";

const promoImages = [
  
  drakSexy,  
  drakCigar,
  drakLounge,
  tySmooth,
  drakChillin,
  drakChillin2,
  drakChillin3,
  drakBridge,
];

// Function to generate calendar event URLs
function generateCalendarUrls(event: (typeof UPCOMING_EVENTS)[0]) {
  // Parse the event date and time
  const eventDate = new Date(
    `${event.month} ${event.day}, ${event.year} ${event.time}`,
  );

  // Format for different calendar providers
  const startDate = eventDate
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const title = encodeURIComponent(`Drakkari Black at ${event.venue}`);
  const details = encodeURIComponent(
    `Live performance by Drakkari Black at ${event.venue}, ${event.location}. ${event.priceRange}`,
  );
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
END:VCALENDAR`,
  };
}

// Function to handle add to calendar with provider selection
function handleAddToCalendar(
  event: (typeof UPCOMING_EVENTS)[0],
  provider: "google" | "outlook" | "yahoo" | "ics",
) {
  const urls = generateCalendarUrls(event);

  if (provider === "ics") {
    // Create and download ICS file
    const element = document.createElement("a");
    element.setAttribute("href", urls.ics);
    element.setAttribute(
      "download",
      `drakkari-black-${event.venue.toLowerCase().replace(/\s+/g, "-")}.ics`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } else {
    window.open(urls[provider], "_blank");
  }
}

// Image Gallery Modal Component
function ImageGalleryModal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % promoImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + promoImages.length) % promoImages.length);
  };

  return (
    <>
      {/* Image Gallery Grid */}
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
              boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)",
            }}
            onClick={() => openModal(index)}
            data-testid={`promo-image-${index}`}
          >
            <img
              src={image}
              alt={`Promotional poster ${index + 1}`}
              className="w-full h-80 object-cover rounded-xl border border-cyan-500 group-hover:border-luxury-accent transition-all duration-300"
            />
            <div className="absolute inset-4 bg-gradient-to-t from-deep-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] glass-card-static border-cyan-500 p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Promotional Media Gallery</DialogTitle>
            <DialogDescription>
              Browse through Drakkari Black's promotional images
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative">
            {/* Image Display */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={promoImages[currentIndex]}
                alt={`Promotional image ${currentIndex + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
                data-testid="modal-image"
              />
            </motion.div>

            {/* Navigation Controls */}
            {promoImages.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={prevImage}
                    className="text-white hover:text-luxury-accent hover:bg-black/30 ml-4 w-12 h-12 rounded-full glass-button"
                    data-testid="prev-image-button"
                  >
                    <ChevronLeft size={28} />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={nextImage}
                    className="text-white hover:text-luxury-accent hover:bg-black/30 mr-4 w-12 h-12 rounded-full glass-button"
                    data-testid="next-image-button"
                  >
                    <ChevronRight size={28} />
                  </Button>
                </div>
              </>
            )}

            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1} / {promoImages.length}
                </span>
                <div className="w-24 bg-white/20 rounded-full h-1">
                  <div
                    className="bg-luxury-accent h-1 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / promoImages.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SetListModal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enhancedSetlist, setEnhancedSetlist] =
    useState<SongWithSpotifyArt[]>(SPEAKEASY_SETLIST);
  const [isLoadingArtwork, setIsLoadingArtwork] = useState(false);

  // Enhance setlist with Spotify artwork on component mount
  useEffect(() => {
    const loadArtwork = async () => {
      setIsLoadingArtwork(true);
      try {
        const enhanced = await enhanceSetlistWithSpotifyArt(
          SPEAKEASY_SETLIST as SongWithSpotifyArt[],
        );
        setEnhancedSetlist(enhanced);
      } catch (error) {
        console.error("Failed to enhance setlist with Spotify artwork:", error);
        // Keep original setlist if enhancement fails
        setEnhancedSetlist(SPEAKEASY_SETLIST as SongWithSpotifyArt[]);
      } finally {
        setIsLoadingArtwork(false);
      }
    };

    loadArtwork();
  }, []);

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % enhancedSetlist.length);
  };

  const prevSong = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + enhancedSetlist.length) % enhancedSetlist.length,
    );
  };

  const currentSong = enhancedSetlist[currentIndex];

  // Show loading state if no current song
  if (!currentSong) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="btn-primary text-lg px-8 py-4">
            <Music className="mr-3" size={24} />
            View Set List
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md glass-card-static border-cyan-500 p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Speakeasy Set List</DialogTitle>
            <DialogDescription>
              Browse through the songs from Drakkari Black's intimate speakeasy
              performances
            </DialogDescription>
          </DialogHeader>
          <div className="p-8 text-center">
            <div className="text-white">Loading setlist...</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-primary text-lg px-8 py-4">
          <Music className="mr-3" size={24} />
          View Set List
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md glass-card-static border-cyan-500 p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Speakeasy Set List</DialogTitle>
          <DialogDescription>
            Browse through the songs from Drakkari Black's intimate speakeasy
            performances
          </DialogDescription>
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
            <div className="mb-6 relative">
              {isLoadingArtwork && (
                <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center z-10">
                  <div className="text-white text-sm">
                    Loading enhanced artwork...
                  </div>
                </div>
              )}
              <img
                src={currentSong.spotifyImage || currentSong.image}
                alt={`${currentSong.title} album cover`}
                className="w-64 h-64 mx-auto rounded-2xl shadow-2xl border-2 border-cyan-500"
              />
              {currentSong.spotifyImage && (
                <div className="absolute -bottom-2 -right-2 bg-luxury-accent text-black text-xs px-2 py-1 rounded-full">
                  Spotify
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {currentSong.title}
            </h3>
            <p className="text-luxury-accent text-lg font-medium mb-1">
              {currentSong.artist}
            </p>
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

          {/* Progress Counter */}
          <div className="flex justify-center items-center space-x-4 pb-6">
            <div className="text-smoke text-sm">
              {currentIndex + 1} of {enhancedSetlist.length}
            </div>
            <div className="flex-1 max-w-48 bg-smoke/20 rounded-full h-1">
              <div
                className="bg-luxury-accent h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / enhancedSetlist.length) * 100}%`,
                }}
              />
            </div>
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
                  <AnimatedText
                    text="Appearances"
                    className="brand-font text-7xl sm:text-9xl luxury-accent animate-glow"
                    delay={0.8}
                  />
                </span>
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Catch{" "}
              <span className="luxury-accent brand-font text-4xl">
                Drakkari Black
              </span>{" "}
              live at these exclusive venues
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
                className="glass-card p-8 group cursor-pointer rounded-2xl"
              >
                <div className="bg-gradient-accent text-black p-6 rounded-2xl text-center mb-6 group-hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold">
                    {event.month}
                  </div>
                  <div className="text-6xl font-black my-2">{event.day}</div>
                  <div className="text-lg font-semibold">
                    {event.year}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-luxury-accent transition-colors duration-300">
                    {event.venue}
                  </h3>
                  <p className="text-smoke mb-6 text-lg">{event.location}</p>
                  <div className="space-y-3 text-smoke mb-8">
                    <div className="flex items-center">
                      <Clock className="mr-3 text-cyan-400" size={20} />
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar
                        className="mr-3 text-cyan-400"
                        size={20}
                      />
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
                        onClick={() => handleAddToCalendar(event, "google")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Google Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-white hover:bg-red-900/30 focus:bg-red-900/30 cursor-pointer"
                        onClick={() => handleAddToCalendar(event, "outlook")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Outlook Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-white hover:bg-red-900/30 focus:bg-red-900/30 cursor-pointer"
                        onClick={() => handleAddToCalendar(event, "yahoo")}
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
            <h2 className="text-4xl font-bold luxury-accent mb-12 text-center tracking-wide animate-glow">
              Promotional Media
            </h2>
            <ImageGalleryModal />
          </motion.div>

          {/* Speakeasy Set List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <h2 className="text-5xl font-bold luxury-accent mb-8 tracking-wide animate-glow">
              <AnimatedText
                text="Speakeasy Set List"
                className="brand-font text-6xl sm:text-8xl"
                delay={1.0}
              />
            </h2>
            <p className="text-smoke text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore the full list of requestable songs from my exclusive
              speakeasy performance set list
            </p>
            <SetListModal />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
