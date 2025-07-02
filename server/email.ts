import type { InsertContactSubmission } from '@shared/schema';

// Simple email configuration
const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@drakkariblack.com';

export async function sendContactEmail(submission: InsertContactSubmission): Promise<void> {
  // For now, we'll just log the email content to the console
  // This way you can see all contact form submissions in your server logs
  // Later, you can easily add a real email service if needed
  
  console.log('\n🎵 ===============================');
  console.log('   NEW CONTACT FORM SUBMISSION');
  console.log('===============================');
  console.log(`Name: ${submission.firstName} ${submission.lastName}`);
  console.log(`Email: ${submission.email}`);
  console.log(`Phone: ${submission.phone || 'Not provided'}`);
  console.log(`Event Type: ${submission.eventType}`);
  console.log(`Event Date: ${submission.eventDate || 'Not specified'}`);
  console.log(`Location: ${submission.eventLocation || 'Not specified'}`);
  console.log(`Expected Attendance: ${submission.expectedAttendance || 'Not specified'}`);
  console.log(`Budget: ${submission.budget || 'Not specified'}`);
  console.log(`Message: ${submission.message}`);
  console.log(`Submitted: ${new Date().toLocaleString()}`);
  console.log('===============================\n');

  // Email is "sent" successfully (to console)
  // Form submission will complete normally
}