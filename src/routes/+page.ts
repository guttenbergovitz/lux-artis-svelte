import type { LoadEvent } from '@sveltejs/kit';
import { getUpcomingEvents, loadEvents } from '$lib/content';
import { getLocaleFromPath, getTranslations } from '$lib/i18n';

export async function load({ url }: LoadEvent) {
	const locale = getLocaleFromPath(url.pathname);
	const [translations, events] = await Promise.all([
		getTranslations(locale),
		loadEvents(locale)
	]);
	
	const upcomingEvents = getUpcomingEvents(events).slice(0, 3);

	return {
		translations,
		events,
		upcomingEvents,
		locale
	};
};

