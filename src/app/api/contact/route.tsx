import { NextResponse } from 'next/server';
import * as EmailJS from '@emailjs/nodejs';

export async function POST(request: Request) {
  try {
    // Parse and validate input
    const { user_name, user_email, message } = await request.json();
    
    if (!user_name?.trim() || !user_email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Initialize EmailJS with your keys
    EmailJS.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
      privateKey: process.env.EMAILJS_PRIVATE_KEY!,
    });

    // Send email using the Node.js SDK
    const response = await EmailJS.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        user_name: user_name.trim(),
        user_email: user_email.trim(),
        message: message.trim()
      }
    );

    return NextResponse.json({ 
      success: true,
      status: response.status,
      text: response.text
    });
    
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}