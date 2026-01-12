import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Phone, MapPin, Check, Heart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";

import { BOOKING_TYPES } from "@/lib/constants";
import type { InsertContactSubmission } from "@shared/schema";
import AnimatedText from "@/components/AnimatedText";
import cashappQR from "@/images/cashapp-qr.png";
import venmoQR from "@/images/venmo-qr.png";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      expectedAttendance: 0,
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: InsertContactSubmission) => {
    setIsSubmitting(true);
    
    try {
      // Use FormSubmit.co to send email directly to info@drakkariblack.com
      const formData = new FormData();
      formData.append('_subject', `🎵 New Booking Inquiry - ${data.firstName} ${data.lastName}`);
      formData.append('_template', 'table');
      formData.append('_autoresponse', 'Thank you for your interest in booking Drakkari Black! We will get back to you within 24 hours.');
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone || '');
      formData.append('eventType', data.eventType || '');
      formData.append('eventDate', data.eventDate || '');
      formData.append('expectedAttendance', data.expectedAttendance?.toString() || '');
      formData.append('message', data.message);
      
      const response = await fetch('https://formsubmit.co/info@drakkariblack.com', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span className="block sm:inline">Get In</span>
              <span className="block sm:inline">
                <span className="sm:ml-4">
                  <AnimatedText text="Touch" className="brand-font text-7xl sm:text-9xl luxury-accent animate-glow" delay={0.8} />
                </span>
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Ready to book <span className="text-4xl brand-font luxury-accent mb-6 animate-glow">Drakkari Black</span> for your next event? Let's create something unforgettable together.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-10"
            >
              <h2 className="text-4xl font-bold animate-glow brand-accent mb-8 tracking-wide">Booking Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 glass-card p-6 rounded-2xl">
                  <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Email</h3>
                    <p className="text-smoke text-lg font-medium">info@drakkariblack.com</p>
                    <p className="text-smoke opacity-75">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 glass-card p-6 rounded-2xl">
                  <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg">
                    <Phone className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Phone</h3>
                    <p className="text-smoke text-lg font-medium">+1 (786) 200-4889</p>
                    <p className="text-smoke opacity-75">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 glass-card p-6 rounded-2xl">
                  <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg">
                    <MapPin className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Management</h3>
                    <p className="text-smoke text-lg font-medium">Arcane Entertainment Group</p>
                    <p className="text-smoke opacity-75">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold luxury-accent mb-6">Booking Types</h3>
                <ul className="space-y-4 text-smoke">
                  {BOOKING_TYPES.map((type, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-cyan-400 mr-4" size={20} />
                      <span className="text-lg font-medium">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-10 rounded-2xl"
            >
              <h2 className="text-3xl font-bold luxury-accent mb-8 tracking-wide">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">First Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-black/90 border-cyan-900/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                              placeholder="John"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Last Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-black/90 border-cyan-900/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                              placeholder="Doe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="bg-black/90 border-cyan-900/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="john@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            value={field.value || ""}
                            type="tel"
                            className="bg-black/90 border-cyan-900/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Event Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger className="bg-black/90 border-cyan-900/50 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/95 border-cyan-900/50 backdrop-blur-sm">
                            <SelectItem value="concert" className="text-white hover:bg-cyan-900/50 focus:bg-cyan-900/50">Concert Venue</SelectItem>
                            <SelectItem value="festival" className="text-white hover:bg-cyan-900/50 focus:bg-cyan-900/50">Music Festival</SelectItem>
                            <SelectItem value="private" className="text-white hover:bg-cyan-900/50 focus:bg-cyan-900/50">Private Event</SelectItem>
                            <SelectItem value="corporate" className="text-white hover:bg-cyan-900/50 focus:bg-cyan-900/50">Corporate Function</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Event Date</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              value={field.value || ""}
                              type="date"
                              className="bg-black/90 border-cyan-900/50 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedAttendance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Expected Attendance</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              value={field.value ? field.value.toString() : ""}
                              type="number"
                              className="bg-black/90 border-cyan-900/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                              placeholder="1000"
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={5}
                            className="bg-black/90 border-cyan-900/50 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                            placeholder="Tell us about your event, venue, and any specific requirements..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Mail className="mr-2" size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support the Artist Section */}
      <section className="py-20 bg-deep-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Support the Artist
            </h2>
            <div className="w-24 h-1 bg-gradient-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-smoke text-xl max-w-2xl mx-auto">
              Show your appreciation and support <span className="text-luxury-accent font-semibold">Drakkari Black</span> by sending a tip
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CashApp QR */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <DollarSign className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">CashApp</h3>
              <div className="bg-white p-3 rounded-xl mb-4 mx-auto w-fit">
                <img 
                  src={cashappQR} 
                  alt="CashApp QR Code - $DrakkariBlack" 
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
              <p className="text-smoke text-lg font-medium">$DrakkariBlack</p>
              <p className="text-smoke opacity-75 text-sm mt-2">Scan with CashApp to send support</p>
            </motion.div>

            {/* Venmo QR */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Venmo</h3>
              <div className="bg-white p-3 rounded-xl mb-4 mx-auto w-fit">
                <img 
                  src={venmoQR} 
                  alt="Venmo QR Code - @DrakkariBlack" 
                  className="w-56 h-56 mx-auto object-contain"
                />
              </div>
              <p className="text-smoke text-lg font-medium">@DrakkariBlack</p>
              <p className="text-smoke opacity-75 text-sm mt-2">Scan with Venmo to send support</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-smoke text-lg">
              Your support helps keep the music alive. Thank you! 🎵
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
