<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import HeroBanner3D from '$lib/components/HeroBanner3D.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function getEventUrl(locale: string, slug: string): string {
		return localizeHref(`/events/${slug}`, { locale: locale as 'pl' | 'en' | 'de' });
	}

	function getEventsUrl(locale: string): string {
		return localizeHref('/events', { locale: locale as 'pl' | 'en' | 'de' });
	}

	function getAboutUrl(locale: string): string {
		return localizeHref('/about', { locale: locale as 'pl' | 'en' | 'de' });
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
	/* Banner Container */
	.banner-container {
		position: relative;
		height: 100vh;
		overflow: hidden;
	}

	/* Hero Banner Spacer */
	.hero-banner-spacer {
		height: 100vh;
	}

	@media (max-width: 768px) {
		.banner-container {
			height: 70vh;
		}
		
		.hero-banner-spacer {
			height: 0;
		}
	}

	/* Hero Section */
	.hero-section {
		padding: var(--space-2xl) 0;
		background: white;
		text-align: center;
	}

	.hero-header h1 {
		margin-bottom: var(--space-md);
	}

	.hero-subtitle {
		font-size: 1.25rem;
		max-width: 65ch;
		margin: 0 auto;
		color: var(--color-graphite-light);
	}

	/* Mission Section */
	.mission-section {
		padding: var(--space-2xl) 0;
	}

	.mission-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-2xl);
	}

	/* Values Section */
	.values-section {
		padding: var(--space-2xl) 0;
		background: white;
	}

	.values-content {
		max-width: 80ch;
	}

	/* Focus Section */
	.focus-section {
		padding: var(--space-2xl) 0;
		background: white;
	}

	.focus-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-xl);
		margin-top: var(--space-lg);
	}

	.focus-item h3 {
		margin-bottom: var(--space-md);
	}

	/* Context & Process Section */
	.context-process-section {
		padding: var(--space-2xl) 0;
		background: white;
	}

	.context-process-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-2xl);
	}

	/* CTA Section */
	.cta-section {
		padding: var(--space-2xl) 0;
	}

	.cta-content {
		max-width: 80ch;
		margin: 0 auto;
		text-align: center;
	}

	.cta-intro {
		font-size: 1.25rem;
		line-height: 1.5;
		color: var(--color-graphite-dark);
		font-weight: 400;
		font-family: var(--font-sans);
		margin-bottom: var(--space-xl);
	}

	.cta-button {
		display: inline-block;
		padding: var(--space-md) var(--space-xl);
		background: var(--color-graphite-dark);
		color: white;
		text-decoration: none;
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 1rem;
		transition: background-color 0.2s;
	}

	.cta-button:hover {
		background: var(--color-graphite);
	}

	/* Events Section */
	.events-section {
		padding: var(--space-2xl) 0;
		background: white;
	}

	.events-header {
		margin-bottom: var(--space-xl);
	}

	.events-header h2 {
		margin-bottom: var(--space-md);
	}

	.events-header p {
		max-width: 65ch;
	}

	.events-list {
		margin-bottom: var(--space-2xl);
	}

	.event-item {
		padding: var(--space-xl) 0;
		border-bottom: 1px solid rgba(44, 44, 44, 0.1);
	}

	.event-item:last-child {
		border-bottom: none;
	}

	.event-header {
		margin-bottom: var(--space-md);
	}

	.event-header h3 {
		margin-bottom: var(--space-sm);
	}

	.event-header time {
		display: block;
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 1.125rem;
		color: var(--color-graphite-light);
		margin-bottom: var(--space-sm);
	}

	.event-location {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-graphite-light);
		margin: 0;
	}

	.event-description {
		max-width: 65ch;
		margin-bottom: var(--space-md);
	}

	.event-link {
		display: inline-block;
		padding: var(--space-sm) var(--space-lg);
		border: 1px solid var(--color-graphite);
		color: var(--color-graphite);
		text-decoration: none;
		font-family: var(--font-sans);
		font-weight: 400;
		transition: background-color 0.2s, color 0.2s;
	}

	.event-link:hover {
		background: var(--color-graphite);
		color: white;
	}

	.events-cta {
		text-align: center;
	}

	.events-all-link {
		display: inline-block;
		padding: var(--space-md) var(--space-xl);
		background: var(--color-gold);
		color: var(--color-graphite-dark);
		text-decoration: none;
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 1.125rem;
		transition: background-color 0.2s;
	}

	.events-all-link:hover {
		background: var(--color-gold-dark);
	}

	.no-events {
		text-align: center;
		padding: var(--space-2xl) 0;
		color: var(--color-graphite-light);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.mission-grid,
		.context-process-grid {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}

		.focus-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}
	}
</style>

<!-- Three.js Banner (preserved) -->
<div class="banner-container">
	<HeroBanner3D />
	<!-- Spacer for banner -->
	<div class="hero-banner-spacer" aria-hidden="true"></div>
</div>

<!-- Hero Section -->
<section class="hero-section">
	<Container>
		<header class="hero-header">
			<h1>{t('pages.home.title')}</h1>
			<p class="hero-subtitle">{t('pages.home.subtitle')}</p>
		</header>
	</Container>
</section>

<!-- Mission & Approach -->
<section class="mission-section bg-gold">
	<Container>
		<div class="mission-grid">
			<article class="mission-article">
				<h2>{t('pages.home.mission.title')}</h2>
				<p>{t('pages.home.mission.text')}</p>
			</article>

			<article class="approach-article">
				<h2>{t('pages.home.approach.title')}</h2>
				<p>{t('pages.home.approach.text')}</p>
			</article>
		</div>
	</Container>
</section>

<!-- Values -->
<section class="values-section">
	<Container>
		<h2>{t('pages.home.values.title')}</h2>
		<div class="values-content">
			<p>Stawiamy na głębię i wartość artystyczną. Każdy projekt traktujemy indywidualnie, dbając o detale i atmosferę.</p>
			<p>Droga do rezultatu jest równie istotna. Świadome działanie, refleksja i dialog towarzyszą każdemu etapowi pracy.</p>
			<p>Budujemy trwałe relacje i konteksty. Myślimy o kulturze jako o ciągłym procesie, nie jednorazowych wydarzeniach.</p>
			<p>Działamy uczciwie i profesjonalnie. Otwarta komunikacja i jasne zasady współpracy z artystami i partnerami.</p>
		</div>
	</Container>
</section>

<!-- Focus Areas -->
<section class="focus-section">
	<Container>
		<h2>{t('pages.home.focus.title')}</h2>
		{#if data.translations.pages?.home?.focus?.items}
			<div class="focus-grid">
				{#each data.translations.pages.home.focus.items as item}
					<article class="focus-item">
						<h3>{item.title}</h3>
						<p>{item.text}</p>
					</article>
				{/each}
			</div>
		{/if}
	</Container>
</section>

<!-- Context & Process -->
<section class="context-process-section">
	<Container>
		<div class="context-process-grid">
			<article class="context-article">
				<h2>{t('pages.home.context.title')}</h2>
				<p>{t('pages.home.context.text')}</p>
			</article>

			<article class="process-article">
				<h2>{t('pages.home.process.title')}</h2>
				<p>{t('pages.home.process.text')}</p>
			</article>
		</div>
	</Container>
</section>

<!-- Learn More CTA -->
<section class="cta-section bg-gold">
	<Container>
		<div class="cta-content">
			<p class="cta-intro">{t('pages.home.learnMoreIntro')}</p>
			<a href={getAboutUrl(data.locale)} class="cta-button">
				{t('pages.home.learnMore')}
			</a>
		</div>
	</Container>
</section>

<!-- Upcoming Events -->
<section class="events-section">
	<Container>
		<header class="events-header">
			<h2>{t('pages.home.upcomingEvents')}</h2>
			<p>{t('pages.home.upcomingEventsIntro')}</p>
		</header>

		{#if data.upcomingEvents.length > 0}
			<div class="events-list">
				{#each data.upcomingEvents as event}
					<article class="event-item">
						<header class="event-header">
							<h3>{event.title}</h3>
							<time datetime={event.date}>{formatDate(event.date, data.locale)}</time>
							{#if event.venue && event.city}
								<p class="event-location">{event.venue}, {event.city}</p>
							{/if}
						</header>
						{#if event.description}
							<p class="event-description">{event.description}</p>
						{/if}
						<a href={getEventUrl(data.locale, event.slug)} class="event-link">
							{t('pages.home.readMore')}
						</a>
					</article>
				{/each}
			</div>
			<div class="events-cta">
				<a href={getEventsUrl(data.locale)} class="events-all-link">
					{t('pages.home.viewAllEvents')}
				</a>
			</div>
		{:else}
			<p class="no-events">{t('common.noUpcomingEvents')}</p>
		{/if}
	</Container>
</section>
