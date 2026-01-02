import type { LoadEvent } from '@sveltejs/kit';
import { getLocaleFromPath, getTranslations } from '$lib/i18n';

export async function load({ url }: LoadEvent) {
	const locale = getLocaleFromPath(url.pathname);
	const translations = await getTranslations(locale);

	return {
		translations,
		locale
	};
};

