import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";

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
        alert("Thank you for subscribing to our newsletter!");
        setEmail("");
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      alert("Sorry, there was an error. Please try again later.");
    }
  };

  return (
    <footer className="bg-charcoal border-t border-crimson py-16">
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
                href="#"
                className="text-smoke crimson-accent-hover transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-instagram text-2xl"></i>
              </motion.a>
              <motion.a
                href="#"
                className="text-smoke crimson-accent-hover transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-twitter text-2xl"></i>
              </motion.a>
              <motion.a
                href="#"
                className="text-smoke crimson-accent-hover transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-facebook text-2xl"></i>
              </motion.a>
              <motion.a
                href="#"
                className="text-smoke crimson-accent-hover transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-youtube text-2xl"></i>
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
                    <span className="text-smoke crimson-accent-hover transition-all duration-300 cursor-pointer text-lg hover:translate-x-2 block">
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
                    className="text-smoke crimson-accent-hover transition-all duration-300 text-lg hover:translate-x-2 block"
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
                className="w-full bg-charcoal border border-crimson rounded-xl px-6 py-4 text-white focus:outline-none focus:border-luxury-accent focus:ring-2 focus:ring-luxury-accent/20 transition-all duration-300 text-lg"
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

        <div className="border-t border-crimson pt-12 text-center">
          <p className="text-smoke text-lg">
            © 2025{" "}
            <span className="luxury-accent font-medium">Drakkari Black</span>.
            All rights reserved. |{" "}
            <span className="crimson-accent hover:text-white transition-colors duration-300 cursor-pointer">
              Privacy Policy
            </span>{" "}
            |{" "}
            <span className="crimson-accent hover:text-white transition-colors duration-300 cursor-pointer">
              Terms of Service
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
