import type { LoadEvent } from '@sveltejs/kit';
import { getLocaleFromPath, getTranslations } from '$lib/i18n';
import { loadPeople } from '$lib/content';

export async function load({ url }: LoadEvent) {
	const locale = getLocaleFromPath(url.pathname);
	const [translations, people] = await Promise.all([
		getTranslations(locale),
		loadPeople(locale)
	]);

	return {
		translations,
		people,
		locale
	};
};

