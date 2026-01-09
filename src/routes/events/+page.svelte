<script lang="ts">
	import { Button, Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	// Pool of Latin art quotes - longer phrases related to art
	const latinQuotes = [
		"Ars est celere artem et naturam imitari in omnibus operibus",
		"Pulchritudo splendor veritatis est et forma perfecta artis",
		"Natura artis magistra est sed ars naturam vincere potest",
		"Ars sine scientia nihil est omnino et scientia sine arte vana",
		"Forma dat esse rei et pulchritudo formam perficit in arte",
		"Nihil sine magno labore vita dedit mortalibus in arte praesertim",
		"Audentes fortuna iuvat timidosque repellit in omnibus artibus",
		"Veritas vos liberabit ab ignorantia et ars veritatem manifestat",
		"Per aspera ad astra ducit virtus et ars stellas tangit",
		"Memento mori et carpe diem sed ars immortalis manet semper",
		"Vanitas vanitatum et omnia vanitas sed ars aeterna permanet",
		"Sic transit gloria mundi sed ars gloriam transcendit temporalem",
		"Ars poetica est ars vivendi et vivere est creare perpetuo",
		"In vino veritas in arte libertas in silentio sapientia",
		"Cogito ergo sum et creo ergo vivo in arte semper",
		"Tabula rasa mentis creativae est initium omnis artis novae",
		"Terra incognita artis novae semper exploratores quaerit audaces",
		"Status quo non est ars sed mors artis et creativitatis",
		"Magnum opus vitae meae est ars quam mundo relinquo",
		"Deus ex machina artis est inspiratio divina in homine",
		"Sine qua non artis verae est passio et dedicatio totalis",
		"Tempus fugit sed ars manet et memoriam humanam conservat",
		"Vox populi vox artis est quando populus artem intelligit",
		"Astra inclinant non necessitant sed ars fatum vincere potest",
		"Fortuna caeca est sed ars oculos aperit et veritatem ostendit",
		"Mens sana in corpore sano in arte perfecta se manifestat",
		"Carpe diem et crea semper quia vita brevis ars longa est",
		"Omnia vincit amor et nos cedamus amori artis et pulchritudinis",
		"Docendo discimus et creando nos ipsos in arte perficimus",
		"Errare humanum est sed in arte errores novam viam aperiunt"
	];

	// Function to get random quote
	function getRandomQuote(): string {
		return latinQuotes[Math.floor(Math.random() * latinQuotes.length)];
	}

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function getEventUrl(locale: string, slug: string): string {
		return localizeHref(`/events/${slug}`, { locale: locale as 'pl' | 'en' | 'de' });
	}

	function formatDate(dateString: string, locale: string): string {
		const date = new Date(dateString);
		const localeMap: Record<string, string> = {
			pl: 'pl-PL',
			en: 'en-US',
			de: 'de-DE'
		};
		const dateLocale = localeMap[locale] || 'en-US';
		
		return date.toLocaleDateString(dateLocale, {
			year: 'numeric',
			month: 'long'
		});
	}
</script>

<style>
	/* Poster Typography for Events Page */
	
	/* Elegant Latin Separators */
	.latin-separator {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: var(--space-2xl) 0;
		gap: 4px;
	}

	.latin-separator.center {
		align-items: center;
	}

	.separator-line {
		width: 200px;
		height: 1px;
		background: var(--color-graphite);
		opacity: 0.4;
	}

	.latin-quote {
		font-family: var(--font-sans);
		font-size: 0.65rem;
		font-style: normal !important;
		font-weight: 400;
		color: var(--color-graphite-light);
		opacity: 0.6;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin: 0;
	}

	/* Poster Sections */
	.poster-section {
		padding: calc(var(--space-2xl) * 2) 0;
		background: white;
	}

	.poster-section.dark {
		background: var(--color-graphite-dark);
		color: white;
	}

	.poster-section.gold {
		background: var(--color-gold);
		color: var(--color-graphite-dark);
	}

	/* Hero Typography */
	.events-hero {
		text-align: left;
		max-width: none;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(3rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-xl) 0;
		text-transform: uppercase;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.125rem, 2.5vw, 1.5rem);
		line-height: 1.4;
		color: var(--color-graphite);
		max-width: 65ch;
		margin: 0;
		font-weight: 400;
	}

	/* Section Typography */
	.section-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.5rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.section-title.white {
		color: white;
	}

	.section-title.dark {
		color: var(--color-graphite-dark);
	}

	.section-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.5;
		margin: 0 0 var(--space-2xl) 0;
		font-weight: 400;
		max-width: 65ch;
	}

	.section-intro.white {
		color: rgba(255, 255, 255, 0.9);
	}

	.section-intro.dark {
		color: var(--color-graphite);
	}

	/* Modernist Timeline */
	:global(.events-timeline) {
		max-width: none !important;
	}

	:global(.events-timeline .timeline-item) {
		margin-bottom: calc(var(--space-2xl) * 1.5) !important;
	}

	:global(.events-timeline .timeline-item:last-child) {
		margin-bottom: 0 !important;
	}

	/* Timeline styling overrides */
	:global(.events-timeline .timeline-item-date) {
		font-family: var(--font-sans) !important;
		font-weight: 700 !important;
		font-size: clamp(2rem, 5vw, 3rem) !important;
		line-height: 0.95 !important;
		color: var(--color-graphite-dark) !important;
		text-transform: uppercase !important;
		letter-spacing: -0.01em !important;
		margin-bottom: var(--space-sm) !important;
	}

	:global(.events-timeline .timeline-item-title) {
		font-family: var(--font-sans) !important;
		font-weight: 700 !important;
		font-size: clamp(1.25rem, 3vw, 1.75rem) !important;
		line-height: 1.1 !important;
		color: var(--color-graphite-dark) !important;
		text-transform: uppercase !important;
		margin-bottom: var(--space-md) !important;
	}

	/* Timeline content */
	.event-content {
		padding-left: var(--space-lg);
	}

	.event-meta {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-graphite-light);
		margin: 0 0 var(--space-md) 0;
	}

	.event-description {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.5;
		color: var(--color-graphite);
		margin: 0 0 var(--space-lg) 0;
		font-weight: 400;
		max-width: 60ch;
	}

	/* Modernist Button */
	.event-link {
		display: inline-block;
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-dark);
		text-decoration: none;
		border: 1px solid var(--color-graphite-dark);
		padding: var(--space-sm) var(--space-lg);
		transition: all 0.2s ease;
		background: transparent;
	}

	.event-link:hover {
		background: var(--color-graphite-dark);
		color: white;
	}

	.no-events {
		text-align: center;
		padding: calc(var(--space-2xl) * 2) 0;
		font-family: var(--font-serif);
		font-size: 1.25rem;
		color: var(--color-graphite-light);
	}

	/* Timeline icon styling */
	:global(.timeline-icon) {
		background: var(--color-gold) !important;
		border: none !important;
		width: 24px !important;
		height: 24px !important;
		border-radius: 0 !important;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.event-content {
			padding-left: var(--space-md);
		}

		:global(.events-timeline .timeline-item-date) {
			font-size: clamp(1.5rem, 8vw, 2rem) !important;
		}

		:global(.events-timeline .timeline-item-title) {
			font-size: clamp(1rem, 5vw, 1.25rem) !important;
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section">
	<Container>
		<div class="events-hero">
			<h1 class="hero-title">{t('pages.events.title')}</h1>
			<p class="hero-subtitle">{t('pages.events.subtitle')}</p>
		</div>
		<div class="latin-separator">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
	</Container>
</section>

<!-- Upcoming Events Section -->
<section class="poster-section">
	<Container>
		<h2 class="section-title">{t('pages.events.upcomingEventsSection')}</h2>
		<p class="section-intro">{t('pages.events.upcomingEventsIntro')}</p>

		{#if data.upcomingEvents.length > 0}
			<Timeline order="vertical" class="events-timeline">
				{#each data.upcomingEvents as event, index}
					{@const isLast = index === data.upcomingEvents.length - 1}
					{@const formattedDate = formatDate(event.date, data.locale)}
					<TimelineItem title={event.title} date={formattedDate} isLast={isLast}>
						{#snippet orientationSlot()}
							<span class="timeline-icon">
								<CalendarWeekSolid class="h-3 w-3" style="color: var(--color-graphite-dark);" />
							</span>
						{/snippet}
						<div class="event-content">
							{#if event.venue && event.city}
								<p class="event-meta">{event.venue}, {event.city}</p>
							{/if}
							{#if event.description}
								<p class="event-description">{event.description}</p>
							{/if}
							<a href={getEventUrl(data.locale, event.slug)} class="event-link">
								{t('pages.home.readMore')}
							</a>
						</div>
					</TimelineItem>
				{/each}
			</Timeline>
		{:else}
			<div class="no-events">
				<p>{t('pages.events.noUpcomingEvents')}</p>
			</div>
		{/if}
	</Container>
</section>

<!-- Past Events Section -->
<section class="poster-section">
	<Container>
		<div class="latin-separator center">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
		<h2 class="section-title">{t('pages.events.pastEventsSection')}</h2>
		<p class="section-intro">{t('pages.events.pastEventsIntro')}</p>

		{#if data.pastEvents.length > 0}
			<Timeline order="vertical" class="events-timeline">
				{#each data.pastEvents as event, index}
					{@const isLast = index === data.pastEvents.length - 1}
					{@const formattedDate = formatDate(event.date, data.locale)}
					<TimelineItem title={event.title} date={formattedDate} isLast={isLast}>
						{#snippet orientationSlot()}
							<span class="timeline-icon">
								<CalendarWeekSolid class="h-3 w-3" style="color: var(--color-graphite-dark);" />
							</span>
						{/snippet}
						<div class="event-content">
							{#if event.venue && event.city}
								<p class="event-meta">{event.venue}, {event.city}</p>
							{/if}
							{#if event.description}
								<p class="event-description">{event.description}</p>
							{/if}
							<a href={getEventUrl(data.locale, event.slug)} class="event-link">
								{t('pages.home.readMore')}
							</a>
						</div>
					</TimelineItem>
				{/each}
			</Timeline>
		{:else}
			<div class="no-events">
				<p>{t('pages.events.noPastEvents')}</p>
			</div>
		{/if}
	</Container>
</section>

