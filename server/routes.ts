import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { sendContactEmail } from "./email";
import { z } from "zod";
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_KEY?.split('-')[1] || 'us21', // Extract server from API key
});

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

  // Newsletter subscription endpoint with Mailchimp
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Valid email address is required' 
        });
      }

      if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_AUDIENCE_ID) {
        console.error('Mailchimp credentials not configured');
        return res.status(500).json({ 
          success: false, 
          error: 'Email service not configured' 
        });
      }

      // Log the newsletter subscription
      console.log('\n📧 ===============================');
      console.log('   NEW NEWSLETTER SUBSCRIPTION');
      console.log('===============================');
      console.log(`Email: ${email}`);
      console.log(`Subscribed: ${new Date().toLocaleString()}`);

      try {
        // First, let's get the correct list ID by fetching all lists
        const lists = await mailchimp.lists.getAllLists();
        console.log('Available Mailchimp lists:', lists.lists.map((list: any) => ({ 
          id: list.id, 
          name: list.name 
        })));
        
        // Use the first available list (or find the correct one)
        const listId = lists.lists[0]?.id || process.env.MAILCHIMP_AUDIENCE_ID;
        
        if (!listId) {
          throw new Error('No Mailchimp list found');
        }

        console.log(`Using Mailchimp list ID: ${listId}`);

        // Add subscriber to Mailchimp list
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: email,
          status: 'subscribed',
          tags: ['Drakkari Black Website'],
          merge_fields: {
            SOURCE: 'Website Footer'
          }
        });

        console.log(`✅ Successfully added to Mailchimp: ${response.email_address}`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Member ID: ${response.id}`);
        console.log('===============================\n');

        res.json({ 
          success: true, 
          message: 'Successfully subscribed to newsletter',
          subscriber_id: response.id
        });

      } catch (mailchimpError: any) {
        console.error('Mailchimp API error:', mailchimpError);
        
        // Handle case where email is already subscribed
        if (mailchimpError.status === 400 && mailchimpError.title === 'Member Exists') {
          console.log('⚠️  Email already subscribed to list');
          console.log('===============================\n');
          
          res.json({ 
            success: true, 
            message: 'You are already subscribed to our newsletter!' 
          });
        } else {
          console.log('❌ Failed to add to Mailchimp');
          console.log('===============================\n');
          
          res.status(500).json({ 
            success: false, 
            error: 'Failed to subscribe to newsletter' 
          });
        }
      }
      
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
