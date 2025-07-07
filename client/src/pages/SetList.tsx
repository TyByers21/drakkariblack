import { useState, useEffect } from "react";
import { Music, Clock, User, X, Play, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SPEAKEASY_SETLIST } from "@/lib/constants";
import {
  enhanceSetlistWithSpotifyArt,
  type SongWithSpotifyArt,
} from "@/lib/spotify";
import AnimatedText from "@/components/AnimatedText";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SetList() {
  const [enhancedSetlist, setEnhancedSetlist] = useState<SongWithSpotifyArt[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<
    (SongWithSpotifyArt & { trackNumber?: number }) | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadSetlist() {
      try {
        const enhanced = await enhanceSetlistWithSpotifyArt(SPEAKEASY_SETLIST);
        setEnhancedSetlist(enhanced);
      } catch (error) {
        console.error("Error loading setlist:", error);
        // Fallback to original setlist without artwork
        setEnhancedSetlist(SPEAKEASY_SETLIST);
      } finally {
        setLoading(false);
      }
    }

    loadSetlist();
  }, []);

  const handleSongClick = (song: SongWithSpotifyArt, index: number) => {
    setSelectedSong({ ...song, trackNumber: index + 1 });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSong(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 mt-12">
          <AnimatedText
            text="Speakeasy Set List"
            className="text-6xl m-2 luxury-accent animate-glow md:text-8xl font-bold mb-8 main-heading"
          />
          <div className="mb-4"></div>
          
          <div className="mt-6 pt-4 border-t border-crimson/20">
            <p className="text-xl  m-2 md:text-2xl text-smoke max-w-3xl mx-auto text-smoke">
              An intimate collection of soulful covers and timeless favorites
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card bg-gradient-primary p-6 text-center">
            <Music className="h-12 w-12 text-crimson mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">
              {enhancedSetlist.length}
            </h3>
            <p className="text-smoke">Total Songs</p>
          </div>
          <div className="glass-card p-6 bg-gradient-primary text-center">
            <Clock className="h-12 w-12 text-crimson mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">~ 4</h3>
            <p className="text-smoke">Hours of Music</p>
          </div>
          <div className="glass-card bg-gradient-primary p-6 text-center">
            <User className="h-12 w-12 text-crimson mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">Various</h3>
            <p className="text-smoke">Legendary Artists</p>
          </div>
        </div>

        {/* Setlist */}
        {loading ? (
          <div className="text-center  py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-crimson mx-auto mb-4"></div>
            <p className="text-smoke">Loading setlist...</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {enhancedSetlist.map((song, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`glass-card p-6 transition-all duration-300 group cursor-pointer ${
                  modalOpen ? '' : 'hover:glass-card-hover'
                }`}
                onClick={() => handleSongClick(song, index)}
                whileHover={modalOpen ? {} : { scale: 1.02 }}
                whileTap={modalOpen ? {} : { scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  {/* Album Artwork */}
                  <div className="relative">
                    {(song.spotifyImage || song.image) ? (
                      <img
                        src={song.spotifyImage || song.image}
                        alt={`${song.album} by ${song.artist}`}
                        className="w-16 h-16 rounded-lg object-cover shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br from-crimson/20 to-charcoal border border-crimson/20 flex items-center justify-center ${(song.spotifyImage || song.image) ? "hidden" : ""}`}
                    >
                      <Music className="h-8 w-8 text-crimson/60" />
                    </div>
                  </div>

                  {/* Song Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-crimson transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-smoke text-sm truncate">{song.artist}</p>
                    {song.album && (
                      <p className="text-smoke/60 text-xs truncate">
                        {song.album}
                      </p>
                    )}
                  </div>
                </div>

                {/* Genre and Enhancement Status */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-smoke/60">
                    {song.genre || "Various"}
                  </span>
                  {song.spotifyId && (
                    <span className="text-xs text-crimson/60">
                      ♪ Spotify Enhanced
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-smoke text-lg">
            This intimate speakeasy set features carefully curated covers
            spanning multiple decades, each song chosen to create the perfect
            atmosphere for an unforgettable evening.
          </p>
          <div className="mt-8 glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Book This Experience</h3>
            <p className="text-smoke mb-4">
              Want to hear these songs live? Book Drakkari Black for your next
              intimate event.
            </p>
            <motion.a
              href="/contact"
              className="inline-block glass-button px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:glass-button-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Performance
            </motion.a>
          </div>
        </div>
      </div>

      {/* Song Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="glass-card-static border-crimson/20 max-w-2xl">
          {selectedSong && (
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-6">
                  Song Details
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Detailed information about the selected song from the speakeasy setlist
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Album Artwork */}
                <div className="flex-shrink-0">
                  {(selectedSong.spotifyImage || selectedSong.image) ? (
                    <img
                      src={selectedSong.spotifyImage || selectedSong.image}
                      alt={`${selectedSong.album} by ${selectedSong.artist}`}
                      className="w-48 h-48 rounded-lg object-cover shadow-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-48 h-48 rounded-lg bg-gradient-to-br from-crimson/20 to-charcoal border border-crimson/20 flex items-center justify-center ${(selectedSong.spotifyImage || selectedSong.image) ? "hidden" : ""}`}
                  >
                    <Music className="h-24 w-24 text-crimson/60" />
                  </div>
                </div>

                {/* Song Information */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedSong.title}
                    </h3>
                    <p className="text-xl text-crimson mb-1">
                      by {selectedSong.artist}
                    </p>
                    {selectedSong.album && (
                      <p className="text-lg text-smoke/80">
                        from "{selectedSong.album}"
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="glass-card p-4">
                      <p className="text-sm text-smoke mb-1">Genre</p>
                      <p className="text-xl font-semibold text-white">
                        {selectedSong.genre || "Various"}
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <p className="text-sm text-smoke mb-1">Set List</p>
                      <p className="text-xl font-semibold text-crimson">
                        Speakeasy
                      </p>
                    </div>
                  </div>

                  {selectedSong.spotifyId && (
                    <div className="mt-6">
                      <p className="text-sm text-crimson/80 mb-2 flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Enhanced with Spotify data
                      </p>
                      <p className="text-xs text-smoke/60">
                        Album artwork and metadata provided by Spotify Web API
                      </p>
                    </div>
                  )}
                  
                  {!selectedSong.spotifyId && selectedSong.image && (
                    <div className="mt-6">
                      <p className="text-sm text-crimson/80 mb-2 flex items-center gap-2">
                        <Music className="h-4 w-4" />
                        Original curated artwork
                      </p>
                      <p className="text-xs text-smoke/60">
                        Handpicked album artwork for the speakeasy collection
                      </p>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-crimson/20">
                    <p className="text-sm text-smoke">
                      This song is part of Drakkari Black's carefully curated
                      speakeasy set, featuring intimate acoustic arrangements
                      perfect for upscale venues and private events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
