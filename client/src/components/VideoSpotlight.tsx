import { motion } from "framer-motion";

// Change these to update the Video Spotlight on every page that shows it.
export const FEATURED_VIDEO = {
  videoId: "JhMnvKTXE7Q",
  title: "The Rain",
  tagline: "New Music Alert!!",
};

export default function VideoSpotlight() {
  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-deep-black via-black/95 to-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-4xl font-bold text-center mb-8 text-cyan-400"
            style={{
              fontFamily: "'Syncopate', sans-serif",
              textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
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
                src={`https://www.youtube.com/embed/${FEATURED_VIDEO.videoId}?cc_load_policy=0`}
                title={`${FEATURED_VIDEO.title} - Drakkari Black`}
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
                {FEATURED_VIDEO.title}
              </h3>
              <p className="text-cyan-400/70 text-sm uppercase tracking-wider">
                {FEATURED_VIDEO.tagline}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
