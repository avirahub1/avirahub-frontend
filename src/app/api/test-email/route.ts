import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    console.log('RESEND KEY:', process.env.RESEND_API_KEY);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Avira Hub <onboarding@resend.dev>',
      to: 'yourgmail@gmail.com', // apna Gmail
      subject: 'Resend Working Test',
      html: '<h2>Resend API is working ✅</h2>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
