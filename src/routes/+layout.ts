import type { LayoutLoad } from './$types';
import { getLocaleFromPath, getTranslations } from '$lib/i18n';

export const load: LayoutLoad = async ({ url }) => {
	const locale = getLocaleFromPath(url.pathname);
	const translations = await getTranslations(locale);
	return { translations, locale };
};
