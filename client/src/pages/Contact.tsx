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
      expectedAttendance: undefined,
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
    <div className="pt-16 min-h-screen">
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-4 text-white">Get In Touch</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Ready to book Drakkari Black for your next event? Let's create something unforgettable together.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-semibold gold-accent mb-6">Booking Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300">booking@drakkariblack.com</p>
                    <p className="text-gray-400 text-sm">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Management</h3>
                    <p className="text-gray-300">Apex Entertainment Group</p>
                    <p className="text-gray-400 text-sm">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-surface p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Booking Types</h3>
                <ul className="space-y-2 text-gray-300">
                  {BOOKING_TYPES.map((type, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-primary mr-3" size={16} />
                      <span>{type}</span>
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
              className="bg-dark-surface p-8 rounded-lg shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
              
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
                              className="bg-dark-bg border-dark-border text-white focus:border-primary"
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
                              className="bg-dark-bg border-dark-border text-white focus:border-primary"
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
                            className="bg-dark-bg border-dark-border text-white focus:border-primary"
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
                            className="bg-dark-bg border-dark-border text-white focus:border-primary"
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
                            <SelectTrigger className="bg-dark-bg border-dark-border text-white focus:border-primary">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-dark-surface border-dark-border">
                            <SelectItem value="concert">Concert Venue</SelectItem>
                            <SelectItem value="festival">Music Festival</SelectItem>
                            <SelectItem value="private">Private Event</SelectItem>
                            <SelectItem value="corporate">Corporate Function</SelectItem>
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
                              className="bg-dark-bg border-dark-border text-white focus:border-primary"
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
                              className="bg-dark-bg border-dark-border text-white focus:border-primary"
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
                            className="bg-dark-bg border-dark-border text-white focus:border-primary resize-none"
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
