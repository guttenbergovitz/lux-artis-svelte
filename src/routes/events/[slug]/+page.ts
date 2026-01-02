import type { LoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { loadEvent } from '$lib/content';
import { getLocaleFromPath, getTranslation, getTranslations } from '$lib/i18n';

export async function load({ params, url }: LoadEvent) {
	const locale = getLocaleFromPath(url.pathname);
	const slug = params.slug;
	
	if (!slug) {
		throw error(404, 'Event slug required');
	}

	const [translations, event] = await Promise.all([
		getTranslations(locale),
		loadEvent(locale, slug)
	]);

	if (!event) {
		const notFoundMsg = getTranslation(translations, 'pages.events.notFound') || 'Event not found';
		throw error(404, notFoundMsg);
	}

	return {
		translations,
		event,
		locale
	};
};

