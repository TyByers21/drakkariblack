import formData from 'form-data';
import Mailgun from 'mailgun.js';
import type { InsertContactSubmission } from '@shared/schema';

// Email configuration
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@drakkariblack.com';

// Mailgun rejects a From address that isn't on the verified sending domain,
// so derive it from MAILGUN_DOMAIN rather than hardcoding it.
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || `website@${MAILGUN_DOMAIN}`;

/** Escape user-supplied text so it can't inject markup into the notification email. */
function escapeHtml(value: string | number): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Returns true if an email was actually sent, false if Mailgun isn't configured. */
export async function sendContactEmail(submission: InsertContactSubmission): Promise<boolean> {
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

  if (!process.env.MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.log('📧 Mailgun not configured - skipping email notification.');
    console.log('   Set MAILGUN_API_KEY and MAILGUN_DOMAIN to enable it.');
    return false;
  }

  const firstName = escapeHtml(submission.firstName);
  const lastName = escapeHtml(submission.lastName);
  const email = escapeHtml(submission.email);
  const phone = escapeHtml(submission.phone || 'Not provided');
  const eventType = escapeHtml(submission.eventType || 'Not specified');
  const eventDate = escapeHtml(submission.eventDate || 'Not specified');
  const expectedAttendance = escapeHtml(submission.expectedAttendance || 'Not specified');
  const message = escapeHtml(submission.message);

  // Create email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 20px;">
      <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 100%); border-radius: 10px; margin-bottom: 20px;">
        <h1 style="color: #dc2626; margin: 0; font-size: 28px;">🎵 Drakkari Black</h1>
        <p style="color: #b0b0b0; margin: 10px 0 0 0;">New Booking Inquiry</p>
      </div>

      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Contact Information</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #dc2626;">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
      </div>

      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Event Details</h2>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Expected Attendance:</strong> ${expectedAttendance}</p>
      </div>

      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Message</h2>
        <p style="white-space: pre-wrap;">${message}</p>
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

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    // EU-region accounts need https://api.eu.mailgun.net
    url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net',
  });

  // Let failures propagate: registerRoutes already catches them and keeps the
  // submission, so swallowing here would report success for mail that never sent.
  await mg.messages.create(MAILGUN_DOMAIN, {
    from: `Drakkari Black Website <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    subject: `🎵 New Booking Inquiry - ${submission.firstName} ${submission.lastName}`,
    text: emailText,
    html: emailHtml,
    'h:Reply-To': submission.email,
  });

  console.log(`✅ Email sent successfully to ${TO_EMAIL}`);
  return true;
}
