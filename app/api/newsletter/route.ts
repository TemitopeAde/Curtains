import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 400 }
        );
      } else {
        // Resubscribe if previously unsubscribed
        await prisma.newsletter.update({
          where: { email: email.toLowerCase() },
          data: {
            subscribed: true,
            name: name || existingSubscriber.name,
          },
        });

        // Send welcome email
        await sendWelcomeEmail(email, name || existingSubscriber.name || undefined);

        return NextResponse.json(
          { message: 'Welcome back! You have been resubscribed to our newsletter.' },
          { status: 200 }
        );
      }
    }

    // Create new subscriber
    const subscriber = await prisma.newsletter.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        subscribed: true,
      },
    });

    // Send welcome email
    const emailResult = await sendWelcomeEmail(email, name);

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      {
        message: 'Successfully subscribed! Check your email for a welcome message.',
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred while subscribing. Please try again.' },
      { status: 500 }
    );
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      );
    }

    // Update subscription status instead of deleting
    await prisma.newsletter.update({
      where: { email: email.toLowerCase() },
      data: { subscribed: false },
    });

    return NextResponse.json(
      { message: 'Successfully unsubscribed from newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'An error occurred while unsubscribing. Please try again.' },
      { status: 500 }
    );
  }
}

// Get all subscribers (admin only - you may want to add auth here)
export async function GET() {
  try {
    const subscribers = await prisma.newsletter.findMany({
      where: { subscribed: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        subscribers,
        count: subscribers.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching subscribers' },
      { status: 500 }
    );
  }
}
