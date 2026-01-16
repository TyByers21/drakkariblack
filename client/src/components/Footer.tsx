import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Listening Lounge", path: "/listening" },
  { name: "Appearances", path: "/appearances" },
  { name: "Contact", path: "/contact" },
];

const musicPlatforms = [
  { name: "Spotify", url: "https://open.spotify.com/" },
  { name: "Apple Music", url: "https://music.apple.com/us/new" },
  { name: "SoundCloud", url: "https://soundcloud.com/drakkari-black" },
  { name: "YouTube Music", url: "https://www.youtube.com/@drakkariblacktv" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        toast({
          title: "Welcome to the family! 🎵",
          description: "You're now subscribed to Drakkari Black updates. Check your email for a welcome message!",
        });
        setEmail("");
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-charcoal border-t border-cyan-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-4xl brand-font luxury-accent mb-6 animate-glow">
              Drakkari Black
            </div>
            <p className="text-smoke mb-6 text-lg leading-relaxed">
              Defining the sound of a generation through authentic artistry and
              unforgettable experiences.
            </p>
            <div className="flex space-x-6">
              <motion.a
                href="https://instagram.com/drakkariblack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-smoke luxury-accent transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-instagram text-2xl"></i>
              </motion.a>
              <motion.a
                href="https://facebook.com/drakkariblack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-smoke luxury-accent transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-facebook text-2xl"></i>
              </motion.a>
              <motion.a
                href="https://youtube.com/@drakkariblacktv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-smoke luxury-accent transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-youtube text-2xl"></i>
              </motion.a>
              <motion.a
                href="https://tiktok.com/@drakkariblack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-smoke luxury-accent transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-tiktok text-2xl"></i>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xl">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-smoke luxury-accent transition-all duration-300 cursor-pointer text-lg hover:translate-x-2 block">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Music Platforms */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xl">
              Music Platforms
            </h4>
            <ul className="space-y-3">
              {musicPlatforms.map((platform) => (
                <li key={platform.name}>
                  <a
                    href={platform.url}
                    className="text-smoke luxury-accent transition-all duration-300 text-lg hover:translate-x-2 block"
                  >
                    {platform.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 text-xl">Newsletter</h4>
            <p className="text-smoke mb-6 text-lg leading-relaxed">
              Stay updated with latest releases and tour dates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal border border-cyan-500 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-luxury-accent focus:ring-2 focus:ring-luxury-accent/20 transition-all duration-300 text-lg"
                placeholder="Enter your email"
                required
              />
              <div className="animate-glow bg-gradient-primary">
              <button type="submit" className="glass-button flex items-center justify-center text-xl sm:text-lg py-3 sm:py-4 px-6 sm:px-8 group w-full rounded-xl">
                Subscribe
              </button>
                </div>
            </form>
          </div>
        </div>

        <div className="border-t border-cyan-500 pt-12 text-center">
          <p className="text-smoke text-lg">
            © 2026{" "}
            <span className="luxury-accent font-medium">Drakkari Black</span>.
            All rights reserved. |{" "}
            <span className="cyan-400 hover:text-white transition-colors duration-300 cursor-pointer">
              Privacy Policy
            </span>{" "}
            |{" "}
            <span className="cyan-400 hover:text-white transition-colors duration-300 cursor-pointer">
              Terms of Service
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
