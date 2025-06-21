import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Listening Lounge", path: "/listening" },
  { name: "Appearances", path: "/appearances" },
  { name: "Contact", path: "/contact" }
];

const musicPlatforms = [
  { name: "Spotify", url: "#" },
  { name: "Apple Music", url: "#" },
  { name: "SoundCloud", url: "#" },
  { name: "YouTube Music", url: "#" }
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-dark-surface border-t border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold gold-accent mb-4">DRAKKARI BLACK</div>
            <p className="text-gray-400 mb-4">
              Defining the sound of a generation through authentic artistry and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 gold-accent-hover transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 gold-accent-hover transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 gold-accent-hover transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 gold-accent-hover transition-colors duration-200">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-gray-400 gold-accent-hover transition-colors duration-200 cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Music Platforms */}
          <div>
            <h4 className="text-white font-semibold mb-4">Music Platforms</h4>
            <ul className="space-y-2">
              {musicPlatforms.map((platform) => (
                <li key={platform.name}>
                  <a 
                    href={platform.url}
                    className="text-gray-400 gold-accent-hover transition-colors duration-200"
                  >
                    {platform.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with latest releases and tour dates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors duration-200" 
                placeholder="Enter your email"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-dark-border pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Drakkari Black. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
