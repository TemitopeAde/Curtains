import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { renderToBuffer } from '@react-pdf/renderer';
import { QuotePDF } from '@/lib/pdf/QuotePDF';
import { resend } from '@/lib/email';
import React from 'react';

// POST send quote via email with PDF
export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const body = await request.json();
    const { totalAmount } = body;

    // Fetch the quote with all related data
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      React.createElement(QuotePDF, { quote, totalAmount: parseFloat(totalAmount) })
    );

    // Send email with PDF attachment
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'JD Beddings & Interiors <onboarding@resend.dev>',
      to: [quote.customerEmail],
      subject: `Your Quote from JD Beddings & Interiors - Quote #${quote.id.substring(0, 8).toUpperCase()}`,
      html: getQuoteEmailTemplate(quote, totalAmount),
      attachments: [
        {
          filename: `Quote-${quote.id.substring(0, 8).toUpperCase()}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Error sending quote email:', error);
      return NextResponse.json(
        { error: 'Failed to send quote email' },
        { status: 500 }
      );
    }

    // Update quote with total amount and mark as contacted
    await prisma.quote.update({
      where: { id: params.id },
      data: {
        totalAmount: parseFloat(totalAmount),
        status: 'contacted',
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending quote:', error);
    return NextResponse.json(
      { error: 'Failed to send quote' },
      { status: 500 }
    );
  }
}

// Email template for quote
function getQuoteEmailTemplate(quote: any, totalAmount: number) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Quote from JD Beddings & Interiors</title>
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
          .quote-summary {
            background: #f9fafb;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #d97706;
          }
          .quote-summary h3 {
            margin: 0 0 15px 0;
            color: #1a1a1a;
          }
          .quote-detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .quote-detail:last-child {
            border-bottom: none;
          }
          .total {
            background: #fef3c7;
            padding: 15px 20px;
            border-radius: 5px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .total-label {
            font-size: 18px;
            font-weight: bold;
            color: #92400e;
          }
          .total-value {
            font-size: 24px;
            font-weight: bold;
            color: #d97706;
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
          .attachment-note {
            background: #dbeafe;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Your Quotation is Ready!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">JD Beddings & Interiors</p>
        </div>
        <div class="content">
          <p>Dear ${quote.customerName},</p>

          <p>Thank you for your interest in JD Beddings & Interiors! We're delighted to provide you with a detailed quotation for the items you selected.</p>

          <div class="attachment-note">
            <p style="margin: 0; font-weight: bold;">📎 Your detailed quote is attached as a PDF</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Please find the complete quotation with all itemized details in the attached PDF document.</p>
          </div>

          <div class="quote-summary">
            <h3>Quote Summary</h3>
            <div class="quote-detail">
              <span>Quote Number:</span>
              <strong>#${quote.id.substring(0, 8).toUpperCase()}</strong>
            </div>
            <div class="quote-detail">
              <span>Date:</span>
              <strong>${new Date(quote.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </div>
            <div class="quote-detail">
              <span>Number of Items:</span>
              <strong>${quote.items.length} item(s)</strong>
            </div>
          </div>

          <div class="total">
            <span class="total-label">Total Amount:</span>
            <span class="total-value">$${totalAmount.toFixed(2)}</span>
          </div>

          <p><strong>What's Next?</strong></p>
          <ul style="color: #666;">
            <li>Review the attached PDF for complete details</li>
            <li>This quote is valid for 30 days</li>
            <li>Reply to this email with any questions</li>
            <li>Contact us to proceed with your order</li>
          </ul>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || ''}?text=Hi,%20I%20received%20my%20quote%20(${quote.id.substring(0, 8).toUpperCase()})%20and%20I%20have%20some%20questions" class="cta-button">
              Chat with Us on WhatsApp
            </a>
          </div>

          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            We believe your home should feel like peace — a place where comfort meets elegance. We're here to help transform your space with our premium products.
          </p>

          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>The JD Beddings & Interiors Team</strong>
          </p>
        </div>
        <div class="footer">
          <p>This quote was prepared especially for you by JD Beddings & Interiors.</p>
          <p>Questions? Reply to this email or contact us directly.</p>
          <p>© ${new Date().getFullYear()} JD Beddings & Interiors. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}
