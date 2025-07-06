import { useState, useEffect } from "react";
import { Music, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { SPEAKEASY_SETLIST } from "@/lib/constants";
import { enhanceSetlistWithSpotifyArt, type SongWithSpotifyArt } from "@/lib/spotify";
import AnimatedText from "@/components/AnimatedText";

export default function SetList() {
  const [enhancedSetlist, setEnhancedSetlist] = useState<SongWithSpotifyArt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSetlist() {
      try {
        const enhanced = await enhanceSetlistWithSpotifyArt(SPEAKEASY_SETLIST);
        setEnhancedSetlist(enhanced);
      } catch (error) {
        console.error('Error loading setlist:', error);
        // Fallback to original setlist without artwork
        setEnhancedSetlist(SPEAKEASY_SETLIST);
      } finally {
        setLoading(false);
      }
    }

    loadSetlist();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedText 
            text="Speakeasy Set List" 
            className="text-6xl md:text-8xl font-bold mb-6 main-heading"
          />
          <AnimatedText 
            text="An intimate collection of soulful covers and timeless favorites" 
            className="text-xl md:text-2xl text-smoke max-w-3xl mx-auto"
            delay={0.3}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-6 text-center">
            <Music className="h-12 w-12 text-crimson mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">{enhancedSetlist.length}</h3>
            <p className="text-smoke">Total Songs</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Clock className="h-12 w-12 text-crimson mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">~3</h3>
            <p className="text-smoke">Hours of Music</p>
          </div>
          <div className="glass-card p-6 text-center">
            <User className="h-12 w-12 text-crimson mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">Various</h3>
            <p className="text-smoke">Legendary Artists</p>
          </div>
        </div>

        {/* Setlist */}
        {loading ? (
          <div className="text-center py-16">
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
                className="glass-card p-6 hover:glass-card-hover transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  {/* Album Artwork */}
                  <div className="relative">
                    {song.spotifyImage ? (
                      <img
                        src={song.spotifyImage}
                        alt={`${song.album} by ${song.artist}`}
                        className="w-16 h-16 rounded-lg object-cover shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-crimson/20 to-charcoal border border-crimson/20 flex items-center justify-center ${song.spotifyImage ? 'hidden' : ''}`}>
                      <Music className="h-8 w-8 text-crimson/60" />
                    </div>
                  </div>

                  {/* Song Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-crimson transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-smoke text-sm truncate">
                      {song.artist}
                    </p>
                    {song.album && (
                      <p className="text-smoke/60 text-xs truncate">
                        {song.album}
                      </p>
                    )}
                  </div>
                </div>

                {/* Track Number */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-smoke/60">
                    Track {index + 1}
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
            This intimate speakeasy set features carefully curated covers spanning multiple decades, 
            each song chosen to create the perfect atmosphere for an unforgettable evening.
          </p>
          <div className="mt-8 glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Book This Experience</h3>
            <p className="text-smoke mb-4">
              Want to hear these songs live? Book Drakkari Black for your next intimate event.
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
    </div>
  );
}