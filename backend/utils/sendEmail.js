import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ subject, html }) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Avira Hub <onboarding@resend.dev>',
    to: [process.env.ADMIN_EMAIL],
    subject,
    html,
  });
}
