import type { LoadEvent } from '@sveltejs/kit';
import { getPastEvents, getUpcomingEvents, loadEvents } from '$lib/content';
import { getLocaleFromPath, getTranslations } from '$lib/i18n';

export async function load({ url }: LoadEvent) {
	const locale = getLocaleFromPath(url.pathname);
	const [translations, events] = await Promise.all([
		getTranslations(locale),
		loadEvents(locale)
	]);
	
	const upcomingEvents = getUpcomingEvents(events);
	const pastEvents = getPastEvents(events);

	return {
		translations,
		events,
		upcomingEvents,
		pastEvents,
		locale
	};
};

