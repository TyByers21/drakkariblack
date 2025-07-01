import { motion } from "framer-motion";
import { ShoppingCart, Star, Truck, Shield } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const merchandiseItems = [
  {
    id: 1,
    name: "Drakkari Black Logo Tee",
    price: 29.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Apparel",
    colors: ["Black", "Crimson", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium cotton t-shirt featuring the iconic Drakkari Black logo in metallic gold foil print.",
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "Luxury Hoodie",
    price: 59.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Apparel",
    colors: ["Deep Black", "Midnight Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Ultra-soft premium hoodie with embroidered logo and luxury interior lining.",
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Signature Cap",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Accessories",
    colors: ["Black", "Red"],
    sizes: ["One Size"],
    description: "Structured snapback cap with 3D embroidered logo and premium materials.",
    rating: 4.7,
    reviews: 203
  },
  {
    id: 4,
    name: "Limited Edition Vinyl",
    price: 39.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Music",
    colors: ["Red Marble", "Black"],
    sizes: ["12 inch"],
    description: "Limited edition vinyl record featuring exclusive acoustic versions and unreleased tracks.",
    rating: 5.0,
    reviews: 45
  },
  {
    id: 5,
    name: "Performance Tank",
    price: 22.99,
    originalPrice: 27.99,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Apparel",
    colors: ["Black", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    description: "Moisture-wicking performance tank with subtle logo placement.",
    rating: 4.6,
    reviews: 78
  },
  {
    id: 6,
    name: "Exclusive Poster Set",
    price: 19.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Collectibles",
    colors: ["Full Color"],
    sizes: ["18x24 inch"],
    description: "Set of 3 high-quality concert posters from recent tour dates.",
    rating: 4.8,
    reviews: 156
  }
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing"
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "High-quality materials and printing"
  }
];

export default function Merch() {
  return (
    <div className="min-h-screen bg-deep-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-deep-black to-luxury-gold/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black luxury-accent mb-6 tracking-wide">
              <AnimatedText text="Official Merch" className="brand-font" />
            </h1>
            <p className="text-xl md:text-2xl text-smoke mb-8 max-w-3xl mx-auto leading-relaxed">
              Exclusive Drakkari Black merchandise designed for true fans. 
              Premium quality apparel, accessories, and collectibles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 luxury-card"
              >
                <feature.icon className="w-12 h-12 text-crimson-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-smoke">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center luxury-accent mb-12"
          >
            Featured Products
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {merchandiseItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="luxury-card p-6 group cursor-pointer"
                style={{ 
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.15)' 
                }}
              >
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.originalPrice > item.price && (
                    <Badge className="absolute top-3 left-3 bg-crimson-accent text-white">
                      Sale
                    </Badge>
                  )}
                  <Badge className="absolute top-3 right-3 bg-black/80 text-white">
                    {item.category}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-luxury-accent transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-smoke text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-luxury-gold fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-smoke">({item.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-luxury-accent">${item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-lg text-smoke line-through">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {item.colors.map((color, colorIndex) => (
                        <Badge key={colorIndex} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.sizes.map((size, sizeIndex) => (
                        <Badge key={sizeIndex} variant="secondary" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full btn-primary mt-4 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="luxury-card p-12"
          >
            <h2 className="text-4xl font-bold luxury-accent mb-6">More Coming Soon</h2>
            <p className="text-xl text-smoke mb-8 leading-relaxed">
              Stay tuned for exclusive limited edition drops, new designs, and special collaborations. 
              Follow our social media for the latest updates on new merchandise releases.
            </p>
            <Button className="btn-primary text-lg px-8 py-4">
              Notify Me of New Releases
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}