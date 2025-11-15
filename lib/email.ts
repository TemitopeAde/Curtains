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
