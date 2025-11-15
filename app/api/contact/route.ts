import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        subject: subject || null,
        message,
        status: 'new',
      },
    });

    // Send notification to admin
    const notificationResult = await sendContactNotification({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (!notificationResult.success) {
      console.error('Failed to send admin notification:', notificationResult.error);
    }

    // Send confirmation to customer
    const confirmationResult = await sendContactConfirmation(email, name);

    if (!confirmationResult.success) {
      console.error('Failed to send customer confirmation:', confirmationResult.error);
    }

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your message. Please try again.' },
      { status: 500 }
    );
  }
}

// Get all contacts (admin only - you may want to add auth here)
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        contacts,
        count: contacts.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching contacts' },
      { status: 500 }
    );
  }
}
