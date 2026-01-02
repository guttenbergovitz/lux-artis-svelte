import type { Handle } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { localizeHref } from '$lib/paraglide/runtime';

const handleParaglide: Handle = ({ event, resolve }) => {
	const originalPath = event.url.pathname;

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		// Get base path from delocalized URL (this is what Paraglide thinks the path should be)
		const baseUrl = new URL(request.url);
		const basePath = baseUrl.pathname;

		// Check what the correct localized path should be for the current locale
		const expectedLocalizedPath = localizeHref(basePath, { locale });

		// If original path doesn't match expected localized path, return 404
		// This ensures that only the correct localized paths work
		if (originalPath !== expectedLocalizedPath) {
			throw error(404, 'Not found');
		}

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};

export const handle: Handle = handleParaglide;
