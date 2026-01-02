/**
 * Content loading utilities for events, people, and organization data
 */

export type Locale = 'pl' | 'en' | 'de';

export interface Event {
	id: string;
	slug: string;
	date: string;
	venue: string;
	city: string;
	title: string;
	artists: string[];
	description: string;
}

export interface Person {
	id: string;
	name: string;
	role: string;
	bio: string;
	position: 'board' | 'collaborator';
}

export interface Organization {
	legalName: string;
	krs: string;
	nip: string;
	regon: string;
	registrationDate: string;
	address: {
		street: string;
		postal: string;
		city: string;
		country: string;
	};
	supervisingAuthorities: string[];
	board: Array<{
		name: string;
		position: string;
		bio: string;
	}>;
	purpose: string;
	representation: string;
	history: string;
}

/**
 * Load events for a given locale
 */
export async function loadEvents(locale: Locale): Promise<Event[]> {
	try {
		const data = await import(`./content/${locale}/events/index.json`);
		return data.default || [];
	} catch (error) {
		console.error(`Error loading events for locale ${locale}:`, error);
		return [];
	}
}

/**
 * Load a single event by slug
 */
export async function loadEvent(locale: Locale, slug: string): Promise<Event | null> {
	try {
		// First, get all events to find the one with matching slug
		const events = await loadEvents(locale);
		const event = events.find((e) => e.slug === slug);
		
		if (event) {
			return event;
		}
		
		// If not found in index, try to load individual file
		// Events are stored as {date}-{id}.json, but we search by slug
		// For now, return null if not found in index
		return null;
	} catch (error) {
		console.error(`Error loading event ${slug} for locale ${locale}:`, error);
		return null;
	}
}

/**
 * Load people for a given locale
 */
export async function loadPeople(locale: Locale): Promise<Person[]> {
	try {
		const data = await import(`./content/${locale}/people/index.json`);
		return data.default || [];
	} catch (error) {
		console.error(`Error loading people for locale ${locale}:`, error);
		return [];
	}
}

/**
 * Load organization data for a given locale
 */
export async function loadOrganization(locale: Locale): Promise<Organization | null> {
	try {
		const data = await import(`./content/${locale}/organization.json`);
		return data.default || null;
	} catch (error) {
		console.error(`Error loading organization for locale ${locale}:`, error);
		return null;
	}
}

/**
 * Get upcoming events (events with date >= today)
 */
export function getUpcomingEvents(events: Event[]): Event[] {
	const now = new Date();
	return events.filter((e) => new Date(e.date) >= now);
}

/**
 * Get past events (events with date < today)
 */
export function getPastEvents(events: Event[]): Event[] {
	const now = new Date();
	return events.filter((e) => new Date(e.date) < now);
}

