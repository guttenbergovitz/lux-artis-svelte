/**
 * Locale-aware, deterministic date formatting for event dates and ranges.
 *
 * Formats:
 *   PL / DE  →  dd.mm.YYYY  /  dd.mm.YYYY–dd.mm.YYYY
 *   EN       →  "1 May 2026"  /  "1–2 May 2026"
 *
 * Dates are parsed as local (wall-clock) dates to avoid UTC-offset rollbacks.
 */

const EN_MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
] as const;

function parseLocal(iso: string): Date {
	const [y, m, d] = iso.split('-').map(Number);
	return new Date(y, m - 1, d);
}

function pad(n: number): string {
	return String(n).padStart(2, '0');
}

function formatSingle(date: Date, locale: string): string {
	const d = date.getDate();
	const m = date.getMonth() + 1;
	const y = date.getFullYear();

	switch (locale) {
		case 'pl':
		case 'de':
			return `${pad(d)}.${pad(m)}.${y}`;
		case 'en':
		default:
			return `${d} ${EN_MONTHS[date.getMonth()]} ${y}`;
	}
}

function formatRange(start: Date, end: Date, locale: string): string {
	const sd = start.getDate();
	const sm = start.getMonth() + 1;
	const sy = start.getFullYear();
	const ed = end.getDate();
	const em = end.getMonth() + 1;
	const ey = end.getFullYear();

	switch (locale) {
		case 'pl':
		case 'de':
			return `${pad(sd)}.${pad(sm)}.${sy}–${pad(ed)}.${pad(em)}.${ey}`;
		case 'en':
		default:
			if (sy === ey && sm === em) {
				// Same month & year: "1–2 May 2026"
				return `${sd}–${ed} ${EN_MONTHS[start.getMonth()]} ${sy}`;
			}
			return `${sd} ${EN_MONTHS[start.getMonth()]} ${sy}–${ed} ${EN_MONTHS[end.getMonth()]} ${ey}`;
	}
}

/**
 * Format a single date or date range for display.
 *
 * @param dateStart ISO date string  "YYYY-MM-DD"
 * @param dateEnd   Optional ISO end date  "YYYY-MM-DD"
 * @param locale    App locale: 'pl' | 'en' | 'de' | 'uk'
 */
export function formatEventDate(
	dateStart: string,
	dateEnd: string | undefined,
	locale: string
): string {
	const start = parseLocal(dateStart);

	if (dateEnd && dateEnd !== dateStart) {
		const end = parseLocal(dateEnd);
		return formatRange(start, end, locale);
	}

	return formatSingle(start, locale);
}

