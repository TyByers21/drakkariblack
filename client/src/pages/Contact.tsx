import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { BOOKING_TYPES } from "@/lib/constants";
import type { InsertContactSubmission } from "@shared/schema";
import AnimatedText from "@/components/AnimatedText";

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

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
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
                  <AnimatedText text="Touch" className="brand-font luxury-accent animate-glow" delay={0.8} />
                </span>
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-smoke text-2xl max-w-3xl mx-auto font-light tracking-wide">
              Ready to book <span className="crimson-accent font-medium">Drakkari Black</span> for your next event? Let's create something unforgettable together.
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
              <h2 className="text-4xl font-bold crimson-accent mb-8 tracking-wide">Booking Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg">
                    <Mail className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Email</h3>
                    <p className="text-smoke text-lg font-medium">booking@drakkariblack.com</p>
                    <p className="text-smoke opacity-75">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg">
                    <Phone className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Phone</h3>
                    <p className="text-smoke text-lg font-medium">+1 (555) 123-4567</p>
                    <p className="text-smoke opacity-75">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-accent p-4 rounded-2xl shadow-lg">
                    <MapPin className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Management</h3>
                    <p className="text-smoke text-lg font-medium">Apex Entertainment Group</p>
                    <p className="text-smoke opacity-75">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="luxury-card p-8">
                <h3 className="text-2xl font-bold luxury-accent mb-6">Booking Types</h3>
                <ul className="space-y-4 text-smoke">
                  {BOOKING_TYPES.map((type, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-crimson-accent mr-4" size={20} />
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
              className="luxury-card p-10"
              style={{ 
                boxShadow: '0 20px 50px rgba(220, 38, 38, 0.3)' 
              }}
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
                              className="bg-black/90 border-red-900/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                              className="bg-black/90 border-red-900/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                            className="bg-black/90 border-red-900/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                            type="tel"
                            className="bg-black/90 border-red-900/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/90 border-red-900/50 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/95 border-red-900/50 backdrop-blur-sm">
                            <SelectItem value="concert" className="text-white hover:bg-red-900/50 focus:bg-red-900/50">Concert Venue</SelectItem>
                            <SelectItem value="festival" className="text-white hover:bg-red-900/50 focus:bg-red-900/50">Music Festival</SelectItem>
                            <SelectItem value="private" className="text-white hover:bg-red-900/50 focus:bg-red-900/50">Private Event</SelectItem>
                            <SelectItem value="corporate" className="text-white hover:bg-red-900/50 focus:bg-red-900/50">Corporate Function</SelectItem>
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
                              type="date"
                              className="bg-black/90 border-red-900/50 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                              type="number"
                              className="bg-black/90 border-red-900/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
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
                            className="bg-black/90 border-red-900/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                            placeholder="Tell us about your event, venue, and any specific requirements..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg transition-colors duration-200"
                  >
                    {contactMutation.isPending ? (
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
    </div>
  );
}
