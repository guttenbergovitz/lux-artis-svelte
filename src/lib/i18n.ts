/**
 * Helper to extract locale from URL path
 */
import type { Locale } from './content';

// Route translations mapping (must match vite.config.ts urlPatterns)
const routeTranslations: Record<string, Record<Locale, string>> = {
	'/about': {
		pl: '/o-nas',
		en: '/about',
		de: '/uber-uns',
		uk: '/pro-nas'
	},
	'/contact': {
		pl: '/kontakt',
		en: '/contact',
		de: '/kontakt',
		uk: '/kontakt'
	},
	'/events': {
		pl: '/wydarzenia',
		en: '/events',
		de: '/veranstaltungen',
		uk: '/podiyi'
	},
	'/people': {
		pl: '/ludzie',
		en: '/people',
		de: '/team',
		uk: '/lyudy'
	},
	'/support': {
		pl: '/wspolpraca',
		en: '/support',
		de: '/partner',
		uk: '/spivpratsya'
	},
	'/legal': {
		pl: '/prawne',
		en: '/legal',
		de: '/impressum',
		uk: '/pravova-informatsiya'
	},
	'/random': {
		pl: '/losowa',
		en: '/random',
		de: '/zufallig',
		uk: '/vypadkova'
	}
};

/**
 * Get localized route for a given path and target locale
 */
export function getLocalizedRoute(currentPath: string, targetLocale: Locale): string {
	// Remove current locale prefix
	const currentLocale = getLocaleFromPath(currentPath);
	let pathWithoutLocale = currentPath.replace(new RegExp(`^/${currentLocale}`), '');
	
	// Handle root path
	if (!pathWithoutLocale || pathWithoutLocale === '/') {
		return `/${targetLocale}`;
	}
	
	// Find matching route translation
	for (const [canonicalPath, translations] of Object.entries(routeTranslations)) {
		// Check if current path matches any translation
		const currentTranslation = translations[currentLocale];
		if (pathWithoutLocale === currentTranslation || pathWithoutLocale.startsWith(currentTranslation + '/')) {
			// Get target translation
			const targetTranslation = translations[targetLocale];
			// Replace the route part
			const remainder = pathWithoutLocale.substring(currentTranslation.length);
			return `/${targetLocale}${targetTranslation}${remainder}`;
		}
	}
	
	// If no translation found, use the path as-is
	return `/${targetLocale}${pathWithoutLocale}`;
}

export function getLocaleFromPath(pathname: string): Locale {
	// Extract locale from path like /pl/..., /en/..., /de/..., /uk/...
	const match = pathname.match(/^\/(pl|uk|en|de)(\/|$)/);
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

