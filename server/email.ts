import Mailgun from 'mailgun.js';
import formData from 'form-data';
import type { InsertContactSubmission } from '@shared/schema';

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

// Using your actual Mailgun sandbox domain
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'sandboxe4f80c3a8247459d823cd54bc6d1a438.mailgun.org';
const FROM_EMAIL = `Drakkari Black Website <noreply@${MAILGUN_DOMAIN}>`;
const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@drakkariblack.com';

export async function sendContactEmail(submission: InsertContactSubmission): Promise<void> {
  if (!process.env.MAILGUN_API_KEY) {
    throw new Error('Mailgun API key not configured');
  }

  // Log the configuration for debugging
  console.log('Sending email via Mailgun...');
  console.log('Domain:', MAILGUN_DOMAIN);
  console.log('From:', FROM_EMAIL);
  console.log('To:', TO_EMAIL);

  const emailHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #dc2626; }
          .field-label { font-weight: bold; color: #dc2626; }
          .footer { padding: 15px; background: #1a1a1a; color: white; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎵 New Contact Form Submission</h1>
          <p>Drakkari Black - Artist Portfolio</p>
        </div>
        
        <div class="content">
          <h2>Contact Details</h2>
          
          <div class="field">
            <div class="field-label">Name:</div>
            ${submission.firstName} ${submission.lastName}
          </div>
          
          <div class="field">
            <div class="field-label">Email:</div>
            ${submission.email}
          </div>
          
          <div class="field">
            <div class="field-label">Phone:</div>
            ${submission.phone || 'Not provided'}
          </div>
          
          <div class="field">
            <div class="field-label">Event Type:</div>
            ${submission.eventType || 'Not specified'}
          </div>
          
          <div class="field">
            <div class="field-label">Event Date:</div>
            ${submission.eventDate || 'Not specified'}
          </div>
          
          <div class="field">
            <div class="field-label">Expected Attendance:</div>
            ${submission.expectedAttendance || 'Not specified'}
          </div>
          
          <div class="field">
            <div class="field-label">Message:</div>
            <p style="white-space: pre-wrap;">${submission.message}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent from the Drakkari Black website contact form.</p>
          <p>Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `;

  const emailText = `
New Contact Form Submission - Drakkari Black

Contact Details:
Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
Phone: ${submission.phone || 'Not provided'}
Event Type: ${submission.eventType || 'Not specified'}
Event Date: ${submission.eventDate || 'Not specified'}
Expected Attendance: ${submission.expectedAttendance || 'Not specified'}

Message:
${submission.message}

Submitted on: ${new Date().toLocaleString()}
  `;

  try {
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `🎵 New Booking Inquiry - ${submission.firstName} ${submission.lastName}`,
      text: emailText,
      html: emailHtml,
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email notification');
  }
}