import type { Handle } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { localizeHref } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = async ({ event, resolve }) => {
	const originalPath = event.url.pathname;

	// Skip Paraglide middleware for static assets (fonts, app assets, etc.)
	if (
		originalPath.startsWith('/fonts/') ||
		originalPath.startsWith('/_app/') ||
		originalPath.startsWith('/favicon')
	) {
		return resolve(event);
	}

	return paraglideMiddleware(event.request, async ({ request, locale }) => {
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

		const response = await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
		
		// Set cache headers for content pages
		const pathname = event.url.pathname;
		
		// Cache static content pages (not API routes or dynamic routes that change frequently)
		if (pathname.startsWith('/pl/') || pathname.startsWith('/en/') || pathname.startsWith('/de/')) {
			// Different cache times for different types of content
			if (pathname.includes('/wydarzenia/') || pathname.includes('/events/') || pathname.includes('/veranstaltungen/')) {
				// Event detail pages - cache for 1 hour, revalidate in background
				response.headers.set(
					'Cache-Control',
					'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
				);
			} else {
				// Static pages - cache for 1 day, revalidate in background
				response.headers.set(
					'Cache-Control',
					'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
				);
			}
		}
		
		return response;
	});
};

export const handle: Handle = handleParaglide;
