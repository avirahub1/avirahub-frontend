import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'name, email, and message are required.' },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const created = await Contact.create({ name, email, phone, message });

    // Fire-and-forget email notification; do not block response
    if (ADMIN_EMAIL && process.env.RESEND_API_KEY) {
      const createdAt = created.createdAt || new Date();
      const html = `
        <h2>New Contact Lead - Avira Hub</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <p><strong>Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
      `;

      resend.emails
        .send({
          from: 'Avira Hub <no-reply@avirahub.in>',
          to: [ADMIN_EMAIL],
          subject: 'New Contact Lead - Avira Hub',
          html,
        })
        .then((res) => {
          console.log('Resend email sent for contact lead:', res);
        })
        .catch((err) => {
          console.error('Failed to send contact lead email via Resend:', err);
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating contact', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing id query parameter' },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

