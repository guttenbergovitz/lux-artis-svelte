import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import { getLocaleFromPath, getTranslations } from '$lib/i18n';

type Locale = 'pl' | 'uk' | 'en' | 'de';

export const load: PageServerLoad = async ({ url }) => {
	const locale = getLocaleFromPath(url.pathname);
	const translations = await getTranslations(locale);

	return {
		translations,
		locale
	};
};

const confirmationMessages: Record<Locale, { subject: string; body: string }> = {
	pl: {
		subject: 'Potwierdzenie otrzymania wiadomości - Lux Artis',
		body: `Dziękujemy za kontakt z Fundacją Lux Artis.

Otrzymaliśmy Twoją wiadomość i odpowiemy najszybciej jak to możliwe.

Pozdrawiamy,
Zespół Lux Artis

---
Fundacja Lux Artis
ul. Fredry 9/2
70-413 Szczecin
www.luxartis.org`
	},
	uk: {
		subject: 'Підтвердження отримання повідомлення - Lux Artis',
		body: `Дякуємо за контакт з Фундацією Lux Artis.

Ми отримали Ваше повідомлення і відповімо якнайшвидше.

З повагою,
Команда Lux Artis

---
Fundacja Lux Artis
ul. Fredry 9/2
70-413 Szczecin
www.luxartis.org`
	},
	en: {
		subject: 'Message confirmation - Lux Artis',
		body: `Thank you for contacting Lux Artis Foundation.

We have received your message and will respond as soon as possible.

Best regards,
Lux Artis Team

---
Fundacja Lux Artis
ul. Fredry 9/2
70-413 Szczecin
www.luxartis.org`
	},
	de: {
		subject: 'Nachrichtenbestätigung - Lux Artis',
		body: `Vielen Dank für Ihre Kontaktaufnahme mit der Lux Artis Stiftung.

Wir haben Ihre Nachricht erhalten und werden so schnell wie möglich antworten.

Mit freundlichen Grüßen,
Lux Artis Team

---
Fundacja Lux Artis
ul. Fredry 9/2
70-413 Szczecin
www.luxartis.org`
	}
};

export const actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const subject = formData.get('subject')?.toString();
		const message = formData.get('message')?.toString();

		// Get locale from URL path
		const localeMatch = url.pathname.match(/^\/(pl|uk|en|de)(\/|$)/);
		const locale = (localeMatch?.[1] || 'pl') as Locale;

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return fail(400, { error: 'Missing required fields' });
		}

		try {
			// Debug: Log SMTP configuration (without password)
			console.log('SMTP Configuration:', {
				host: env.SMTP_HOST,
				port: env.SMTP_PORT,
				secure: env.SMTP_SECURE,
				user: env.SMTP_USER
			});

			// Create transporter
			const transporter = nodemailer.createTransport({
				host: env.SMTP_HOST,
				port: parseInt(env.SMTP_PORT || '587'),
				secure: env.SMTP_SECURE === 'true',
				auth: {
					user: env.SMTP_USER,
					pass: env.SMTP_PASS
				},
				tls: {
					rejectUnauthorized: false
				}
			});

			// Email to organization
			const organizationEmailContent = `
Nowa wiadomość z formularza kontaktowego

Imię: ${name}
Email: ${email}
Temat: ${subject}

Wiadomość:
${message}

---
Wysłano ze strony luxartis.org (Język: ${locale})
			`;

			await transporter.sendMail({
				from: env.EMAIL_FROM,
				to: env.EMAIL_TO,
				subject: `[Formularz kontaktowy] ${subject}`,
				text: organizationEmailContent,
				replyTo: email
			});

			// Confirmation email to user
			const confirmation = confirmationMessages[locale];

			await transporter.sendMail({
				from: env.EMAIL_FROM,
				to: email,
				subject: confirmation.subject,
				text: confirmation.body
			});

			return { success: true };
		} catch (error) {
			console.error('Error sending email:', error);
			console.error('Error details:', error instanceof Error ? error.message : String(error));
			if (error instanceof Error && 'code' in error) {
				console.error('Error code:', (error as any).code);
			}
			return fail(500, { error: 'Failed to send email' });
		}
	}
} satisfies Actions;
