'use server';

import { Resend } from 'resend';
import { notificationEmail, type NotificationProps } from '@/components/emails/notification-email';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envoie un email de notification (évènement / article / utilisateur).
 * Le sujet et le HTML sont générés par le composant `notificationEmail`.
 */
export async function sendNotificationEmail(props: NotificationProps) {
  const { subject, html } = notificationEmail(props);

  return resend.emails.send({
    from: 'Ateliers Angevin <onboarding@resend.dev>',
    to: 'noe.fresneau@gmail.com',
    subject,
    html,
  });
}
