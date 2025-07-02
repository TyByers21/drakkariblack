import nodemailer from 'nodemailer';
import type { InsertContactSubmission } from '@shared/schema';

// Email configuration
const TO_EMAIL = 'info@drakkariblack.com';
const FROM_EMAIL = 'website@drakkariblack.com';

export async function sendContactEmail(submission: InsertContactSubmission): Promise<void> {
  // Always log to console first
  console.log('\n🎵 ===============================');
  console.log('   NEW CONTACT FORM SUBMISSION');
  console.log('===============================');
  console.log(`Name: ${submission.firstName} ${submission.lastName}`);
  console.log(`Email: ${submission.email}`);
  console.log(`Phone: ${submission.phone || 'Not provided'}`);
  console.log(`Event Type: ${submission.eventType}`);
  console.log(`Event Date: ${submission.eventDate || 'Not specified'}`);
  console.log(`Expected Attendance: ${submission.expectedAttendance || 'Not specified'}`);
  console.log(`Message: ${submission.message}`);
  console.log(`Submitted: ${new Date().toLocaleString()}`);
  console.log('===============================\n');

  // Create email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 20px;">
      <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 100%); border-radius: 10px; margin-bottom: 20px;">
        <h1 style="color: #dc2626; margin: 0; font-size: 28px;">🎵 Drakkari Black</h1>
        <p style="color: #b0b0b0; margin: 10px 0 0 0;">New Booking Inquiry</p>
      </div>
      
      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Contact Information</h2>
        <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${submission.email}" style="color: #dc2626;">${submission.email}</a></p>
        <p><strong>Phone:</strong> ${submission.phone || 'Not provided'}</p>
      </div>
      
      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Event Details</h2>
        <p><strong>Event Type:</strong> ${submission.eventType}</p>
        <p><strong>Event Date:</strong> ${submission.eventDate || 'Not specified'}</p>
        <p><strong>Expected Attendance:</strong> ${submission.expectedAttendance || 'Not specified'}</p>
      </div>
      
      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Message</h2>
        <p style="white-space: pre-wrap;">${submission.message}</p>
      </div>
      
      <div style="text-align: center; padding: 20px; background-color: #1a1a1a; border-radius: 10px; color: #888;">
        <p>Submitted on: ${new Date().toLocaleString()}</p>
        <p>From: Drakkari Black Website Contact Form</p>
      </div>
    </div>
  `;

  const emailText = `
🎵 DRAKKARI BLACK - NEW BOOKING INQUIRY

Contact Information:
Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
Phone: ${submission.phone || 'Not provided'}

Event Details:
Event Type: ${submission.eventType}
Event Date: ${submission.eventDate || 'Not specified'}
Expected Attendance: ${submission.expectedAttendance || 'Not specified'}

Message:
${submission.message}

Submitted on: ${new Date().toLocaleString()}
From: Drakkari Black Website Contact Form
  `;

  // Try to send email
  try {
    // Create a simple transporter that will work with most email services
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Drakkari Black Website" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `🎵 New Booking Inquiry - ${submission.firstName} ${submission.lastName}`,
      text: emailText,
      html: emailHtml,
      replyTo: submission.email
    });

    console.log('✅ Email sent successfully to info@drakkariblack.com');
  } catch (error) {
    console.log('⚠️  Email sending failed, but form submission saved:', error);
    console.log('📧 To enable email notifications, set EMAIL_USER and EMAIL_PASS environment variables');
  }
}