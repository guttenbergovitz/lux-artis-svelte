/**
 * Helper to extract locale from URL path
 */
import type { Locale } from './content';

export function getLocaleFromPath(pathname: string): Locale {
	// Extract locale from path like /pl/..., /en/..., /de/...
	const match = pathname.match(/^\/(pl|en|de)(\/|$)/);
	if (match) {
		return match[1] as Locale;
	}
	// Default to Polish
	return 'pl';
}

// For now, we'll load translations dynamically from the Solid Start app structure
// This is a temporary solution until Paraglide messages are set up
export async function getTranslations(locale: Locale) {
	try {
		// Load from the copied content structure
		const translations = await import(`./content/locales/${locale}.json`);
		return translations.default;
	} catch (error) {
		console.error(`Error loading translations for locale ${locale}:`, error);
		return {};
	}
}

// Helper to get nested translation value
export function getTranslation(translations: any, path: string): string {
	const keys = path.split('.');
	let value = translations;
	
	for (const key of keys) {
		if (value && typeof value === 'object' && key in value) {
			value = value[key];
		} else {
			return '';
		}
	}
	
	return typeof value === 'string' ? value : '';
}

