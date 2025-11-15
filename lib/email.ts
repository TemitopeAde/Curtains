import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will not work.');
}

export const resend = new Resend(process.env.RESEND_API_KEY || '');

// Email templates
export const getWelcomeEmailTemplate = (name?: string) => {
  const greeting = name ? `Hi ${name}` : 'Hello';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Newsletter</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-family: 'Georgia', serif;
          }
          .content {
            background: #ffffff;
            padding: 40px 30px;
            border: 1px solid #e0e0e0;
          }
          .content p {
            margin: 15px 0;
          }
          .cta-button {
            display: inline-block;
            background: #d97706;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
          .benefits {
            background: #fef3c7;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .benefits li {
            margin: 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to Curtains & Co!</h1>
        </div>
        <div class="content">
          <p>${greeting},</p>

          <p>Thank you for subscribing to our newsletter! We're thrilled to have you join our community of home decor enthusiasts.</p>

          <div class="benefits">
            <h3 style="margin-top: 0; color: #92400e;">What You'll Receive:</h3>
            <ul>
              <li><strong>Exclusive Offers:</strong> Be the first to know about special discounts and promotions</li>
              <li><strong>New Arrivals:</strong> Get early access to our latest products</li>
              <li><strong>Design Tips:</strong> Expert advice on transforming your space</li>
              <li><strong>Seasonal Collections:</strong> Curated selections for every season</li>
            </ul>
          </div>

          <p>As a thank you for joining us, here's a special welcome offer:</p>

          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products" class="cta-button">
              Get 10% Off Your First Quote Request
            </a>
          </div>

          <p style="margin-top: 30px;">Browse our collection of premium curtains, bedding, towels, and home decor to find the perfect pieces for your space.</p>

          <p>If you have any questions, feel free to reach out to us anytime.</p>

          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>The Curtains & Co Team</strong>
          </p>
        </div>
        <div class="footer">
          <p>You're receiving this email because you subscribed to our newsletter.</p>
          <p>© ${new Date().getFullYear()} Curtains & Co. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
};

export const sendWelcomeEmail = async (email: string, name?: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Curtains & Co <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Curtains & Co Newsletter! 🎉',
      html: getWelcomeEmailTemplate(name),
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
};

// Contact form email templates
export const getContactNotificationTemplate = (contact: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e0e0e0;
          }
          .info-row {
            padding: 12px;
            border-bottom: 1px solid #f0f0f0;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #666;
            display: inline-block;
            width: 100px;
          }
          .value {
            color: #333;
          }
          .message-box {
            background: #f9fafb;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
            border-left: 4px solid #d97706;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔔 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p><strong>You have received a new message from your website contact form.</strong></p>

          <div class="info-row">
            <span class="label">Name:</span>
            <span class="value">${contact.name}</span>
          </div>

          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${contact.email}">${contact.email}</a></span>
          </div>

          ${contact.phone ? `
          <div class="info-row">
            <span class="label">Phone:</span>
            <span class="value"><a href="tel:${contact.phone}">${contact.phone}</a></span>
          </div>
          ` : ''}

          ${contact.subject ? `
          <div class="info-row">
            <span class="label">Subject:</span>
            <span class="value">${contact.subject}</span>
          </div>
          ` : ''}

          <div class="message-box">
            <h3 style="margin-top: 0; color: #92400e;">Message:</h3>
            <p style="white-space: pre-wrap; margin: 0;">${contact.message}</p>
          </div>

          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">
            <strong>Next Steps:</strong><br>
            Reply to this email or contact ${contact.name} directly at <a href="mailto:${contact.email}">${contact.email}</a>
          </p>
        </div>
        <div class="footer">
          <p>This email was sent from your Curtains & Co website contact form.</p>
          <p>© ${new Date().getFullYear()} Curtains & Co. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
};

export const getContactConfirmationTemplate = (name: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-family: 'Georgia', serif;
          }
          .content {
            background: #ffffff;
            padding: 40px 30px;
            border: 1px solid #e0e0e0;
          }
          .content p {
            margin: 15px 0;
          }
          .highlight-box {
            background: #fef3c7;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #d97706;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Contacting Us!</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>

          <p>We've received your message and appreciate you taking the time to reach out to us.</p>

          <div class="highlight-box">
            <p style="margin: 0;"><strong>✓ Your message has been successfully received</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 14px;">We typically respond within 24 hours during business days.</p>
          </div>

          <p>Our team is reviewing your inquiry and will get back to you as soon as possible. If your matter is urgent, please feel free to call us directly at <strong>+1 (234) 567-890</strong>.</p>

          <p>In the meantime, feel free to browse our collection of premium home decor items:</p>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products"
               style="display: inline-block; background: #d97706; color: white; padding: 12px 30px;
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
              Browse Our Products
            </a>
          </p>

          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>The Curtains & Co Team</strong>
          </p>
        </div>
        <div class="footer">
          <p>This is an automated confirmation email.</p>
          <p>© ${new Date().getFullYear()} Curtains & Co. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
};

export const sendContactNotification = async (contact: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || 'admin@curtainsco.com';

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Curtains & Co <onboarding@resend.dev>',
      to: [adminEmail],
      replyTo: contact.email,
      subject: `New Contact Form: ${contact.subject || 'No Subject'} - ${contact.name}`,
      html: getContactNotificationTemplate(contact),
    });

    if (error) {
      console.error('Error sending contact notification:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending contact notification:', error);
    return { success: false, error };
  }
};

export const sendContactConfirmation = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Curtains & Co <onboarding@resend.dev>',
      to: [email],
      subject: 'We Received Your Message - Curtains & Co',
      html: getContactConfirmationTemplate(name),
    });

    if (error) {
      console.error('Error sending contact confirmation:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending contact confirmation:', error);
    return { success: false, error };
  }
};
