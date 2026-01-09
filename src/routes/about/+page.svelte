<script lang="ts">
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

	function splitParagraphs(text: string): string[] {
		return text.split('\n\n').filter((p) => p.trim());
	}
</script>

<style>
	/* Poster Typography for About Page */
	
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
	.about-hero {
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
		margin: 0 0 var(--space-xl) 0;
		text-transform: uppercase;
	}

	.section-title.white {
		color: white;
	}

	.section-title.dark {
		color: var(--color-graphite-dark);
	}

	.section-text {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.5;
		margin: 0 0 var(--space-lg) 0;
		font-weight: 400;
		max-width: 70ch;
	}

	.section-text.white {
		color: rgba(255, 255, 255, 0.9);
	}

	.section-text.dark {
		color: var(--color-graphite);
	}

	/* Two Column Layout */
	.two-column {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--space-2xl) * 1.5);
		align-items: start;
	}

	/* Values Grid */
	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-2xl);
		margin-top: var(--space-xl);
	}

	.value-block h3 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		line-height: 1.1;
		margin: 0 0 var(--space-md) 0;
		text-transform: uppercase;
	}

	.value-block h3.white {
		color: white;
	}

	.value-block h3.dark {
		color: var(--color-graphite-dark);
	}

	.value-block p {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.4;
		margin: 0;
		font-weight: 400;
	}

	.value-block p.white {
		color: rgba(255, 255, 255, 0.85);
	}

	.value-block p.dark {
		color: var(--color-graphite);
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.two-column {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}

		.values-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section">
	<Container>
		<div class="about-hero">
			<h1 class="hero-title">{t('pages.about.title')}</h1>
			<p class="hero-subtitle">{t('pages.about.subtitle')}</p>
		</div>
		<div class="latin-separator">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
	</Container>
</section>

<!-- Mission & Vision -->
<section class="poster-section gold">
	<Container>
		<div class="two-column">
			<article>
				<h2 class="section-title dark">{t('pages.about.mission.title')}</h2>
				<p class="section-text dark">{t('pages.about.mission.text')}</p>
			</article>
			<article>
				<h2 class="section-title dark">{t('pages.about.vision.title')}</h2>
				<p class="section-text dark">{t('pages.about.vision.text')}</p>
			</article>
		</div>
	</Container>
</section>

<!-- Approach -->
<section class="poster-section">
	<Container>
		<div class="latin-separator center">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
		<h2 class="section-title">{t('pages.about.approach.title')}</h2>
		<p class="section-text">{t('pages.about.approach.text')}</p>
	</Container>
</section>

<!-- Values -->
<section class="poster-section dark">
	<Container>
		<h2 class="section-title white">{t('pages.about.values.title')}</h2>
		<div class="values-grid">
			{#if data.translations.pages?.about?.values?.items}
				{#each data.translations.pages.about.values.items as item}
					<article class="value-block">
						<h3 class="white">{item.title}</h3>
						<p class="white">{item.text}</p>
					</article>
				{/each}
			{/if}
		</div>
	</Container>
</section>

<!-- Extended Sections -->
{#if data.translations.pages?.about?.extended}
	<!-- Culture -->
	<section class="poster-section">
		<Container>
			<div class="latin-separator center">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
			<h2 class="section-title">{t('pages.about.extended.culture.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.culture.text')) as paragraph}
				<p class="section-text">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Activities -->
	<section class="poster-section gold">
		<Container>
			<h2 class="section-title dark">{t('pages.about.extended.activities.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.activities.text')) as paragraph}
				<p class="section-text dark">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Location -->
	<section class="poster-section">
		<Container>
			<div class="latin-separator">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
			<h2 class="section-title">{t('pages.about.extended.location.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.location.text')) as paragraph}
				<p class="section-text">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Audience -->
	<section class="poster-section dark">
		<Container>
			<h2 class="section-title white">{t('pages.about.extended.audience.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.audience.text')) as paragraph}
				<p class="section-text white">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Philosophy -->
	<section class="poster-section">
		<Container>
			<div class="latin-separator center">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
			<h2 class="section-title">{t('pages.about.extended.philosophy.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.philosophy.text')) as paragraph}
				<p class="section-text">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Collaboration -->
	<section class="poster-section gold">
		<Container>
			<h2 class="section-title dark">{t('pages.about.extended.collaboration.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.collaboration.text')) as paragraph}
				<p class="section-text dark">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Community -->
	<section class="poster-section">
		<Container>
			<div class="latin-separator">
				<div class="separator-line"></div>
				<p class="latin-quote">{getRandomQuote()}</p>
			</div>
			<h2 class="section-title">{t('pages.about.extended.community.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.community.text')) as paragraph}
				<p class="section-text">{paragraph}</p>
			{/each}
		</Container>
	</section>

	<!-- Future -->
	<section class="poster-section dark">
		<Container>
			<h2 class="section-title white">{t('pages.about.extended.future.title')}</h2>
			{#each splitParagraphs(t('pages.about.extended.future.text')) as paragraph}
				<p class="section-text white">{paragraph}</p>
			{/each}
		</Container>
	</section>
{/if}
