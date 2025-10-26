import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, use services like SendGrid, Mailgun, etc.
  
  return nodemailer.createTransporter({
    service: 'gmail', // or use SMTP settings
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });
};

// Send email notification when someone contacts you
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Your email to receive notifications
      subject: `New Contact Message: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Contact Message</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #6b7280; line-height: 1.6;">${contactData.message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Reply to:</strong> 
              <a href="mailto:${contactData.email}" style="color: #6366f1; text-decoration: none;">
                ${contactData.email}
              </a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to the person who contacted you
export const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Thank You for Reaching Out!</h2>
          <p style="color: #374151; line-height: 1.6;">
            Hi ${contactData.name},
          </p>
          <p style="color: #374151; line-height: 1.6;">
            Thank you for your message. I have received your inquiry and will get back to you as soon as possible.
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280;"><strong>Your message:</strong></p>
            <p style="color: #6b7280; line-height: 1.6; margin-top: 10px;">${contactData.message}</p>
          </div>
          <p style="color: #374151; line-height: 1.6;">
            Best regards,<br>
            <strong>Zyad Walid</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    return { success: false, error: error.message };
  }
};
