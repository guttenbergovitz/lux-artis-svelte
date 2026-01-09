<script lang="ts">
	import { Accordion, AccordionItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
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
</script>

<style>
	/* Poster Typography for People Page */
	
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
	.people-hero {
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

	/* Intro Grid */
	.intro-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-2xl);
		margin-top: var(--space-xl);
	}

	.intro-block h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2rem);
		line-height: 1.1;
		margin: 0 0 var(--space-md) 0;
		text-transform: uppercase;
	}

	.intro-block h2.white {
		color: white;
	}

	.intro-block h2.dark {
		color: var(--color-graphite-dark);
	}

	.intro-block p {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.4;
		margin: 0;
		font-weight: 400;
	}

	.intro-block p.white {
		color: rgba(255, 255, 255, 0.9);
	}

	.intro-block p.dark {
		color: var(--color-graphite);
	}

	/* Modernist Accordion */
	.people-accordion {
		max-width: 70ch;
	}

	/* Override Flowbite accordion styles with poster aesthetics */
	:global(.people-accordion .accordion-item) {
		border: none !important;
		border-bottom: 1px solid var(--color-graphite) !important;
		background: transparent !important;
	}

	:global(.people-accordion .accordion-header) {
		background: transparent !important;
		border: none !important;
		padding: var(--space-lg) 0 !important;
		transition: all 0.2s ease !important;
	}

	:global(.people-accordion .accordion-header:hover) {
		background: rgba(212, 175, 55, 0.05) !important;
	}

	.accordion-header-content {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		width: 100%;
	}

	:global(.accordion-icon) {
		width: 16px !important;
		height: 16px !important;
		color: var(--color-graphite) !important;
		transition: transform 0.2s ease !important;
		flex-shrink: 0;
	}

	:global(.accordion-item[open] .accordion-icon) {
		transform: rotate(180deg) !important;
	}

	.person-info h4 {
		font-family: var(--font-sans) !important;
		font-weight: 700 !important;
		font-size: clamp(1.25rem, 3vw, 1.75rem) !important;
		line-height: 1.1 !important;
		color: var(--color-graphite-dark) !important;
		margin: 0 !important;
		text-transform: uppercase !important;
	}

	.person-role {
		font-family: var(--font-sans) !important;
		font-weight: 400 !important;
		font-size: 0.875rem !important;
		letter-spacing: 0.05em !important;
		text-transform: uppercase !important;
		color: var(--color-graphite-light) !important;
		margin: var(--space-xs) 0 0 0 !important;
	}

	:global(.people-accordion .accordion-body) {
		padding: 0 0 var(--space-lg) calc(16px + var(--space-md)) !important;
		border: none !important;
		background: transparent !important;
	}

	.person-bio {
		font-family: var(--font-serif) !important;
		font-size: 1rem !important;
		line-height: 1.5 !important;
		color: var(--color-graphite) !important;
		margin: 0 !important;
		font-weight: 400 !important;
		max-width: 60ch;
	}

	.no-people {
		text-align: center;
		padding: calc(var(--space-2xl) * 2) 0;
		font-family: var(--font-serif);
		font-size: 1.25rem;
		color: var(--color-graphite-light);
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.intro-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}

		.people-accordion {
			max-width: none;
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section">
	<Container>
		<div class="people-hero">
			<h1 class="hero-title">{t('pages.people.title')}</h1>
			<p class="hero-subtitle">{t('pages.people.subtitle')}</p>
		</div>
		<div class="latin-separator">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
	</Container>
</section>

<!-- Intro Grid -->
{#if data.translations.pages?.people?.intro}
	<section class="poster-section gold">
		<Container>
			<div class="intro-grid">
				{#if data.translations.pages.people.intro.perspective}
					<article class="intro-block">
						<h2 class="dark">{data.translations.pages.people.intro.perspective.title}</h2>
						<p class="dark">{data.translations.pages.people.intro.perspective.text}</p>
					</article>
				{/if}
				{#if data.translations.pages.people.intro.place}
					<article class="intro-block">
						<h2 class="dark">{data.translations.pages.people.intro.place.title}</h2>
						<p class="dark">{data.translations.pages.people.intro.place.text}</p>
					</article>
				{/if}
				{#if data.translations.pages.people.intro.competencies}
					<article class="intro-block">
						<h2 class="dark">{data.translations.pages.people.intro.competencies.title}</h2>
						<p class="dark">{data.translations.pages.people.intro.competencies.text}</p>
					</article>
				{/if}
			</div>
		</Container>
	</section>
{/if}

<!-- People Accordion -->
<section class="poster-section">
	<Container>
		<div class="latin-separator center">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>

		{#if data.people.length > 0}
			<div class="people-accordion">
				<Accordion flush>
					{#each data.people as person}
						<AccordionItem>
							{#snippet header()}
								<div class="accordion-header-content">
									<ChevronDownOutline class="accordion-icon" />
									<div class="person-info">
										<h4>{person.name}</h4>
										<p class="person-role">{person.role}</p>
									</div>
								</div>
							{/snippet}
							<p class="person-bio">{person.bio}</p>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		{:else}
			<div class="no-people">
				<p>{t('pages.people.noPeople')}</p>
			</div>
		{/if}
	</Container>
</section>

