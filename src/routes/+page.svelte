<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import HeroBanner3D from '$lib/components/HeroBanner3D.svelte';
	import MotionReveal from '$lib/components/MotionReveal.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { motionController } from '$lib/utils/motionController';

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

	onMount(() => {
		// Tylko subtelny parallax dla głównych tytułów - bez chaosu
		const heroTitle = document.querySelector('.hero-title');
		
		if (heroTitle) {
			motionController.parallaxText(heroTitle, 0.05); // Bardzo subtelny
		}
	});

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
	/* Interwar Poster Typography System */
	
	/* Banner Container */
	.banner-container {
		position: relative;
		height: 100vh;
		overflow: hidden;
	}

	.hero-banner-spacer {
		height: 100vh;
	}

	@media (max-width: 768px) {
		.banner-container {
			height: 35vh;
		}

		.hero-banner-spacer {
			height: 0;
		}
	}

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

	/* Poster Section Base */
	.poster-section {
		padding: var(--space-xl) 0;
	}

	.poster-section.dark {
		background: var(--color-gold);
		color: var(--color-graphite-dark);
	}

	/* Hero: Large Display Typography */
	.hero-poster {
		text-align: left;
		max-width: none;
		padding: var(--space-lg) 0;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(3rem, 10vw, 8rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.hero-statement {
		font-family: var(--font-serif);
		font-size: clamp(1.125rem, 3.5vw, 1.75rem);
		line-height: 1.3;
		color: var(--color-graphite);
		max-width: 45ch;
		margin: 0;
		font-weight: 400;
	}

	/* Mission: Asymmetric Two-Column Block */
	.mission-poster {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
		align-items: start;
	}

	.mission-block h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.75rem, 5vw, 3rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
		margin: 0 0 var(--space-md) 0;
		text-transform: uppercase;
	}

	.mission-block p {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.4;
		margin: 0;
		font-weight: 400;
	}

	/* Values: Single Column Statement */
	.values-poster {
		max-width: 65ch;
	}

	.values-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.values-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.values-item {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.4;
		color: var(--color-graphite);
		margin: 0;
		font-weight: 400;
		border-left: 3px solid var(--color-graphite-dark);
		padding-left: var(--space-md);
	}

	/* Focus: Grid of Isolated Blocks */
	.focus-poster {
		margin-top: var(--space-md);
	}

	.focus-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
		margin-top: var(--space-lg);
	}

	.focus-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.focus-block {
		position: relative;
		padding: var(--space-sm) 0;
	}

	.focus-block::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 60px;
		height: 3px;
		background: var(--color-graphite-dark);
	}

	.focus-block h3 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-sm) 0;
		text-transform: uppercase;
	}

	.focus-block p {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.4;
		color: var(--color-graphite);
		margin: 0;
		font-weight: 400;
	}

	/* Context: Asymmetric Split */
	.context-poster {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: calc(var(--space-2xl) * 2);
		align-items: start;
	}

	.context-block h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
		margin: 0 0 var(--space-xl) 0;
		text-transform: uppercase;
	}

	.context-block p {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.4;
		margin: 0;
		font-weight: 400;
	}

	/* CTA: Bold Statement Block */
	.cta-poster {
		text-align: left;
		max-width: 55ch;
	}

	.cta-statement {
		font-family: var(--font-serif);
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		line-height: 1.3;
		margin: 0 0 calc(var(--space-2xl) * 1.5) 0;
		font-weight: 400;
	}

	.cta-action {
		display: inline-block;
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-dark);
		text-decoration: none;
		border: 2px solid var(--color-graphite-dark);
		padding: var(--space-md) var(--space-xl);
		transition: all 0.2s ease;
	}

	.cta-action:hover {
		background: var(--color-graphite-dark);
		color: var(--color-gold);
	}

	/* Events: Structured List */
	.events-poster {
		max-width: none;
	}

	.events-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3rem);
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.events-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.4;
		color: var(--color-graphite);
		margin: 0 0 calc(var(--space-2xl) * 1.5) 0;
		max-width: 65ch;
		font-weight: 400;
	}

	.event-block {
		border-top: 1px solid var(--color-graphite);
		padding: var(--space-xl) 0;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--space-xl);
		align-items: start;
	}

	.event-block:last-child {
		border-bottom: 1px solid var(--color-graphite);
	}

	.event-meta h3 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-sm) 0;
		text-transform: uppercase;
	}

	.event-meta time {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 1rem;
		color: var(--color-graphite-light);
		display: block;
		margin-bottom: var(--space-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.event-meta .event-location {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.875rem;
		color: var(--color-graphite-light);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.event-content p {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.4;
		color: var(--color-graphite);
		margin: 0 0 var(--space-md) 0;
		font-weight: 400;
	}

	.event-link {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-dark);
		text-decoration: none;
		border-bottom: 1px solid var(--color-graphite-dark);
		transition: opacity 0.2s ease;
	}

	.event-link:hover {
		opacity: 0.7;
	}

	.events-cta {
		margin-top: calc(var(--space-2xl) * 1.5);
		text-align: left;
	}

	.events-all-action {
		display: inline-block;
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-dark);
		background: var(--color-gold);
		text-decoration: none;
		padding: var(--space-lg) var(--space-xl);
		transition: opacity 0.2s ease;
	}

	.events-all-action:hover {
		opacity: 0.8;
	}

	.no-events {
		font-family: var(--font-serif);
		font-size: 1.25rem;
		color: var(--color-graphite-light);
		text-align: center;
		padding: calc(var(--space-2xl) * 2) 0;
	}

	/* Enhanced parallax containers */
	.hero-title,
	.mission-block h2,
	.values-title {
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}

	/* Mobile: Optimized for readability */
	@media (max-width: 768px) {
		.poster-section {
			padding: var(--space-md) 0;
		}

		.hero-poster {
			padding: var(--space-xs) 0;
		}

		.hero-title {
			margin: 0 0 var(--space-md) 0;
		}

		.mission-poster,
		.context-poster {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}

		.focus-grid {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}

		.event-block {
			grid-template-columns: 1fr;
			gap: var(--space-sm);
		}

		.values-item {
			padding-left: var(--space-sm);
		}

		.latin-separator {
			margin: var(--space-md) 0;
		}
	}
</style>

<!-- Three.js Banner (preserved) -->
<div class="banner-container">
	<HeroBanner3D />
	<!-- Spacer for banner -->
	<div class="hero-banner-spacer" aria-hidden="true"></div>
</div>

<!-- Hero: Large Display Statement -->
<section class="poster-section">
	<Container>
		<MotionReveal type="section" intensity="strong">
			<div class="hero-poster">
				<h1 class="hero-title">{t('pages.home.title')}</h1>
				<p class="hero-statement">{t('pages.home.subtitle')}</p>
			</div>
		</MotionReveal>
		
		<MotionReveal type="wipe" direction="left" delay={600}>
			<div class="latin-separator">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- Mission: Asymmetric Two-Column Block -->
<section class="poster-section dark">
	<Container>
		<MotionReveal type="section" delay={200}>
			<div class="mission-poster">
				<article class="mission-block">
					<h2>{t('pages.home.mission.title')}</h2>
					<p>{t('pages.home.mission.text')}</p>
				</article>

				<article class="mission-block">
					<h2>{t('pages.home.approach.title')}</h2>
					<p>{t('pages.home.approach.text')}</p>
				</article>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- Values: Single Column Statement -->
<section class="poster-section">
	<Container>
		<MotionReveal type="wipe" direction="left" delay={200}>
			<div class="latin-separator center">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
		</MotionReveal>
		
		<MotionReveal type="section" delay={300}>
			<div class="values-poster">
				<h2 class="values-title">{t('pages.home.values.title')}</h2>
				<div class="values-list">
					<p class="values-item">Każdy projekt traktujemy indywidualnie, dbając o detale i atmosferę, które budują głębokie doświadczenie obcowania ze sztuką. Szanujemy wartość artystyczną, pracę twórczą i integralność dzieła.</p>
					<p class="values-item">Droga do rezultatu jest dla nas równie istotna, jak sam efekt. Świadome działanie, refleksja i dialog towarzyszą każdemu etapowi pracy.</p>
					<p class="values-item">Myślimy o kulturze jako o procesie ciągłym, nie jako o serii jednorazowych epizodów. Budujemy długofalowe relacje oparte na zrozumieniu i szacunku.</p>
					<p class="values-item">Otwarta komunikacja i precyzyjne zasady współpracy pozwalają nam budować zaufanie i przyjazną atmosferę.</p>
				</div>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- Focus: Grid of Isolated Blocks -->
<section class="poster-section">
	<Container>
		<MotionReveal type="reveal">
			<div class="focus-poster">
				<h2 class="focus-title">{t('pages.home.focus.title')}</h2>
				{#if data.translations.pages?.home?.focus?.items}
					<div class="focus-grid">
						{#each data.translations.pages.home.focus.items as item, index}
							<MotionReveal type="reveal" intensity="subtle" delay={index * 100 + 200}>
								<article class="focus-block">
									<h3>{item.title}</h3>
									<p>{item.text}</p>
								</article>
							</MotionReveal>
						{/each}
					</div>
				{/if}
			</div>
		</MotionReveal>
		
		<MotionReveal type="wipe" direction="left" delay={600}>
			<div class="latin-separator center">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- Context: Asymmetric Split -->
<section class="poster-section">
	<Container>
		<div class="context-poster">
			<MotionReveal type="reveal" delay={100}>
				<article class="context-block">
					<h2>{t('pages.home.context.title')}</h2>
					<p>{t('pages.home.context.text')}</p>
				</article>
			</MotionReveal>

			<MotionReveal type="reveal" delay={200}>
				<article class="context-block">
					<h2>{t('pages.home.process.title')}</h2>
					<p>{t('pages.home.process.text')}</p>
				</article>
			</MotionReveal>
		</div>
		
		<MotionReveal type="wipe" direction="left" delay={400}>
			<div class="latin-separator">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- CTA: Bold Statement Block -->
<section class="poster-section dark">
	<Container>
		<MotionReveal type="reveal" intensity="standard">
			<div class="cta-poster">
				<p class="cta-statement">{t('pages.home.learnMoreIntro')}</p>
				<a href={getAboutUrl(data.locale)} class="cta-action motion-hover motion-focus">
					{t('pages.home.learnMore')}
				</a>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- Events: Structured List -->
<section class="poster-section">
	<Container>
		<MotionReveal type="wipe" direction="left" delay={100}>
			<div class="latin-separator center">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
		</MotionReveal>
		
		<MotionReveal type="reveal" delay={200}>
			<div class="events-poster">
				<h2 class="events-title">{t('pages.home.upcomingEvents')}</h2>
				<p class="events-intro">{t('pages.home.upcomingEventsIntro')}</p>

				{#if data.upcomingEvents.length > 0}
					<div class="events-list">
						{#each data.upcomingEvents as event, index}
							<MotionReveal type="reveal" intensity="subtle" delay={index * 150 + 400}>
								<article class="event-block">
									<div class="event-meta">
										<h3>{event.title}</h3>
										<time datetime={event.date}>{formatDate(event.date, data.locale)}</time>
										{#if event.venue && event.city}
											<p class="event-location">{event.venue}, {event.city}</p>
										{/if}
									</div>
									<div class="event-content">
										{#if event.description}
											<p>{event.description}</p>
										{/if}
										<a href={getEventUrl(data.locale, event.slug)} class="event-link motion-hover">
											{t('pages.home.readMore')}
										</a>
									</div>
								</article>
							</MotionReveal>
						{/each}
					</div>
					
					<MotionReveal type="reveal" delay={800}>
						<div class="events-cta">
							<a href={getEventsUrl(data.locale)} class="events-all-action motion-hover motion-focus">
								{t('pages.home.viewAllEvents')}
							</a>
						</div>
					</MotionReveal>
				{:else}
					<MotionReveal type="reveal" delay={400}>
						<p class="no-events">{t('common.noUpcomingEvents')}</p>
					</MotionReveal>
				{/if}
			</div>
		</MotionReveal>
	</Container>
</section>
