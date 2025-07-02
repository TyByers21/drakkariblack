import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { sendContactEmail } from "./email";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification via Mailgun
      try {
        await sendContactEmail(validatedData);
        console.log(`Contact email sent for submission ${submission.id}`);
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
        // Don't fail the entire request if email fails
      }
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error('Contact form submission error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  // Spotify token endpoint
  app.post("/api/spotify-token", async (req, res) => {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "Spotify credentials not configured" });
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        return res.status(500).json({ error: "Failed to get Spotify access token" });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error getting Spotify token:", error);
      res.status(500).json({ error: "Failed to get Spotify access token" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Valid email address is required' 
        });
      }

      // Log the newsletter subscription
      console.log('\n📧 ===============================');
      console.log('   NEW NEWSLETTER SUBSCRIPTION');
      console.log('===============================');
      console.log(`Email: ${email}`);
      console.log(`Subscribed: ${new Date().toLocaleString()}`);
      console.log('===============================\n');

      // Send email notification using FormSubmit.co server-side
      try {
        const formData = new FormData();
        formData.append('_subject', '🎵 New Newsletter Subscription - Drakkari Black');
        formData.append('_template', 'table');
        formData.append('_autoresponse', 'Welcome to the Drakkari Black family! You\'re now subscribed to receive updates about new music, tour dates, and exclusive content.');
        formData.append('email', email);
        formData.append('subscriptionType', 'Newsletter');
        formData.append('timestamp', new Date().toLocaleString());
        
        const response = await fetch('https://formsubmit.co/info@drakkariblack.com', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          console.log('✅ Newsletter subscription email sent successfully');
        } else {
          console.log('⚠️  Newsletter email sending failed, but subscription logged');
        }
      } catch (emailError) {
        console.error('Newsletter email error:', emailError);
        // Don't fail the entire request if email fails
      }
      
      res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to process subscription' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
