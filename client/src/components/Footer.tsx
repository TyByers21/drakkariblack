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
  { name: "Spotify", url: "https://open.spotify.com/album/5zDcz8n4lq4F7BY6j3TZPe?si=3MuJCZGUSByN9QqpB6qIng" },
  { name: "Apple Music", url: "https://music.apple.com/us/album/d-b-x-the-drakkari-black-xperiment/1869737486" },
  { name: "SoundCloud", url: "https://soundcloud.com/drakkari-black" },
  { name: "YouTube Music", url: "https://www.youtube.com/@drakkariblacktv" },
];

// Mailchimp's standard embedded-form target for the "Drakkari Black" audience.
// These ids are public by design (they ship in every Mailchimp embed form) --
// the secret API key stays out of the browser, so this works on static hosting.
//
// This is a real form POST rather than fetch(): Mailchimp sends no CORS headers,
// so a scripted request is blocked by the browser. Their JSONP endpoint
// (/subscribe/post-json) has been retired and now returns 404. A native form
// submission is not subject to CORS, which is why the official embed uses one.
// target="_blank" sends the confirmation to a new tab so the visitor keeps
// their place on the site.
const MAILCHIMP_ACTION = "https://gmail.us13.list-manage.com/subscribe/post";
const MAILCHIMP_U = "73860a19d2c81dd29fb4ea9d9";
const MAILCHIMP_ID = "ec7b462747";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // The response renders in the new tab and is cross-origin, so it cannot be
  // read from here. Confirm only that the request was handed off.
  const handleNewsletterSubmit = () => {
    toast({
      title: "Almost there! 🎵",
      description:
        "Confirm your subscription in the tab that just opened, then check your email.",
    });
    setEmail("");
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
              <motion.a
                href="https://open.spotify.com/album/5zDcz8n4lq4F7BY6j3TZPe?si=3MuJCZGUSByN9QqpB6qIng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-smoke luxury-accent transition-all duration-300 transform hover:scale-125"
                whileHover={{ y: -3 }}
              >
                <i className="fab fa-spotify text-2xl"></i>
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
            <form
              action={MAILCHIMP_ACTION}
              method="post"
              target="_blank"
              onSubmit={handleNewsletterSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="u" value={MAILCHIMP_U} />
              <input type="hidden" name="id" value={MAILCHIMP_ID} />
              <input
                type="email"
                name="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal border border-cyan-500 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-luxury-accent focus:ring-2 focus:ring-luxury-accent/20 transition-all duration-300 text-lg"
                placeholder="Enter your email"
                required
              />
              {/* Mailchimp bot-prevention honeypot -- must stay empty and hidden */}
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name={`b_${MAILCHIMP_U}_${MAILCHIMP_ID}`}
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>
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
