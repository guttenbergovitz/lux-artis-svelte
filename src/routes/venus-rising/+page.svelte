<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '$lib/components/Container.svelte';
	import StarField from '$lib/components/StarField.svelte';
	import { getTranslation } from '$lib/i18n';
	import venusLogo from '$lib/assets/venus-rising-violet-background.jpg';
	import { FacebookSolid, InstagramSolid } from 'flowbite-svelte-icons';
	import RegulationsModal from '$lib/components/RegulationsModal.svelte';
	import SponsorsSection from '$lib/components/SponsorsSection.svelte';

	let { data }: { data: { locale: string; translations: Record<string, unknown> } } = $props();

	// State
	let scrollY = $state(0);
	let isLoaded = $state(false);
	let prefersReducedMotion = $state(false);
	let windowHeight = $state(0);
	let gsap: any = null;
	let ScrollTrigger: any = null;

	// Refs
	let heroSection: HTMLElement;
	let ideaSection: HTMLElement;
	let lineupSection: HTMLElement;
	let aboutSection: HTMLElement;
	let heroTitle: HTMLElement;
	let venusLogoEl: HTMLElement;
	let artistCards: HTMLElement[] = [];

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	interface Artist {
		name: string;
		bio: string;
	}

	function getArtists(): Artist[] {
		const artists = data.translations?.pages?.venusRising?.artists as Artist[] || [];
		return artists;
	}

	onMount(async () => {
		if (!browser) return;

		// Check reduced motion
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;

		windowHeight = window.innerHeight;

		// Load GSAP
		const gsapModule = await import('gsap');
		const scrollTriggerModule = await import('gsap/ScrollTrigger');

		gsap = gsapModule.default;
		ScrollTrigger = scrollTriggerModule.ScrollTrigger;
		gsap.registerPlugin(ScrollTrigger);

		// Initialize animations after a brief delay
		setTimeout(() => {
			isLoaded = true;
			if (!prefersReducedMotion) {
				initAnimations();
			}
		}, 100);

		// Scroll handler
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		const handleResize = () => {
			windowHeight = window.innerHeight;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			ScrollTrigger?.getAll().forEach((t: any) => t.kill());
		};
	});

	function initAnimations() {
		if (!gsap || !ScrollTrigger) return;

		// Hero badge animation
		gsap.fromTo(
			heroTitle,
			{ opacity: 0, y: 30, scale: 0.9 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1,
				ease: 'back.out(1.2)',
				delay: 0.5
			}
		);

		// Venus logo animation
		if (venusLogoEl) {
			gsap.fromTo(
				venusLogoEl,
				{ opacity: 0, scale: 0.8 },
				{
					opacity: 1,
					scale: 1,
					duration: 1.2,
					ease: 'back.out(1.4)',
					delay: 0.2
				}
			);
		}

		// Artist cards stagger animation
		artistCards.forEach((card, index) => {
			if (card) {
				gsap.fromTo(
					card,
					{
						opacity: 0,
						y: 40
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: card,
							start: 'top 85%',
							toggleActions: 'play none none reverse'
						},
						delay: index * 0.1
					}
				);
			}
		});
	}

	// Computed styles based on scroll
	$effect(() => {
		if (!browser || prefersReducedMotion) return;

		const heroProgress = Math.min(scrollY / windowHeight, 1);
		document.documentElement.style.setProperty('--hero-progress', heroProgress.toString());
	});
</script>

<svelte:head>
	<title>{t('pages.venusRising.title')} — Lux Artis</title>
	<meta
		name="description"
		content={t('pages.venusRising.metaDescription')}
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Hero Section -->
<section bind:this={heroSection} class="hero-section" class:loaded={isLoaded}>
	{#if !prefersReducedMotion}
		<div class="stars-background">
			<StarField starCount={120} speed={0.15} />
		</div>
	{/if}

	<Container>
		<div class="hero-content">
			<div class="logo-wrapper">
				<img bind:this={venusLogoEl} src={venusLogo} alt="Venus Rising Festival" class="hero-logo" />
			</div>

			<div bind:this={heroTitle} class="hero-badge">
				<span class="badge-date">{t('pages.venusRising.tagline')}</span>
				<span class="badge-slogan">{t('pages.venusRising.slogan')}</span>
			</div>

			<div class="festival-ended-badge">
				<span class="festival-ended-text">{t('pages.venusRising.festivalEnded')}</span>
			</div>
		</div>
	</Container>
</section>

<!-- Idea Section -->
<section bind:this={ideaSection} class="idea-section">
	<Container>
		<div class="idea-content">
			<div class="idea-block">
				<span class="idea-number">01</span>
				<h2 class="idea-label">{t('pages.venusRising.ideaLabel')}</h2>
				<p class="idea-text">{t('pages.venusRising.idea')}</p>
			</div>
			<div class="idea-divider"></div>
			<div class="idea-block">
				<span class="idea-number">02</span>
				<h2 class="idea-label">{t('pages.venusRising.goalLabel')}</h2>
				<p class="idea-text">{t('pages.venusRising.goal')}</p>
			</div>
		</div>
	</Container>
</section>

<!-- Queens of Sound / Lineup Section -->
<section bind:this={lineupSection} class="lineup-section">
	<Container>
		<h2 class="section-title">{t('pages.venusRising.queensTitle')}</h2>
		<p class="section-intro">{t('pages.venusRising.queensIntro')}</p>

		<div class="artists-grid">
			{#each getArtists() as artist, index (artist.name)}
				{@const firstSentenceEnd = artist.bio.indexOf('. ') + 1}
				{@const leadText = artist.bio.slice(0, firstSentenceEnd)}
				{@const restText = artist.bio.slice(firstSentenceEnd + 1)}
				<article bind:this={artistCards[index]} class="artist-card">
					<h3 class="artist-name">{artist.name}</h3>
					<p class="artist-lead">{leadText}</p>
					<p class="artist-bio">{restText}</p>
				</article>
			{/each}
		</div>
	</Container>
</section>

<!-- About Festival Section -->
<section bind:this={aboutSection} class="about-section">
	<Container>
		<div class="about-content">
			<div class="about-hero">
				<p class="about-lead">{t('pages.venusRising.about1')}</p>
			</div>
			<div class="about-details">
				<p class="about-text">{t('pages.venusRising.about2')}</p>
				<p class="about-text">{t('pages.venusRising.about3')}</p>
			</div>
			<p class="about-cta">{t('pages.venusRising.about4')}</p>
			<div class="regulations-block">
				<RegulationsModal translations={data.translations} />
			</div>
		</div>
	</Container>
</section>

<!-- Entry Section - Orange -->
<section class="entry-section">
	<Container>
		<div class="entry-content">
			<div class="entry-typography">
				<span class="entry-word">{t('pages.venusRising.freeEntry')}</span>
			</div>
			<div class="entry-info">
				<p class="location-text">{t('pages.venusRising.location')}</p>
				<div class="social-block">
					<a href="https://www.facebook.com/VenusRisingFestival" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
						<FacebookSolid />
					</a>
					<a href="https://www.instagram.com/venus_rising_festival" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Instagram">
						<InstagramSolid />
					</a>
				</div>
			</div>
		</div>
	</Container>
</section>

<!-- Partners & Sponsors Section -->
<SponsorsSection />

<style>
	/* CSS Custom Properties - Venus Gradient Palette */
	:root {
		--hero-progress: 0;
		/* Venus Gradient - Dark to Light */
		--vr-night: #0C0017;        /* Darkest - backgrounds */
		--vr-plum: #48243D;         /* Dark purple/maroon */
		--vr-mauve: #8E4454;        /* Dusty rose */
		--vr-coral: #CD7259;        /* Terracotta/coral */
		--vr-gold: #F3B05A;         /* Golden orange */
		--vr-sun: #F9F871;          /* Bright yellow */
	}

	/* ===== HERO SECTION ===== */
	.hero-section {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: var(--vr-night);
	}

	/* Hero Content */
	.hero-content {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: var(--space-xl) 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
	}

	.logo-wrapper {
		position: relative;
		width: clamp(350px, 85vw, 900px);
	}

	.hero-logo {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 8px;
	}

	.stars-background {
		position: absolute;
		inset: 0;
		z-index: 15;
		pointer-events: none;
	}

	/* Hero Badge - Sharp Electronic Style */
	.hero-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15em;
		border: 1px solid rgba(205, 114, 89, 0.4);
		padding: var(--space-sm) var(--space-xl);
		background: rgba(12, 0, 23, 0.4);
	}

	.badge-date {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(0.65rem, 1.5vw, 0.8rem);
		text-transform: uppercase;
		letter-spacing: 0.35em;
		color: var(--vr-gold);
		opacity: 0.8;
	}

	.badge-slogan {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(1.1rem, 3vw, 1.6rem);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: var(--vr-coral);
	}

	/* Festival Ended Badge */
	.festival-ended-badge {
		border: 1px solid rgba(243, 176, 90, 0.5);
		padding: var(--space-sm) var(--space-xl);
		background: rgba(12, 0, 23, 0.6);
		text-align: center;
		max-width: 600px;
	}

	.festival-ended-text {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(0.75rem, 1.8vw, 0.95rem);
		letter-spacing: 0.1em;
		line-height: 1.6;
		color: var(--vr-gold);
		opacity: 0.9;
	}

	/* ===== IDEA SECTION ===== */
	.idea-section {
		background: linear-gradient(180deg, var(--vr-night) 0%, var(--vr-plum) 100%);
		padding: var(--space-2xl) 0 calc(var(--space-2xl) * 1.5);
		position: relative;
	}

	.idea-section::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 1px;
		height: 60px;
		background: linear-gradient(180deg, var(--vr-coral), transparent);
	}

	.idea-content {
		display: flex;
		justify-content: center;
		align-items: stretch;
		gap: 0;
		max-width: 1000px;
		margin: 0 auto;
	}

	.idea-block {
		flex: 1;
		padding: var(--space-xl);
		text-align: center;
		position: relative;
	}

	.idea-number {
		display: block;
		font-family: 'Lato', var(--font-sans);
		font-weight: 100;
		font-size: clamp(3rem, 8vw, 5rem);
		color: var(--vr-coral);
		opacity: 0.3;
		line-height: 1;
		margin-bottom: var(--space-sm);
	}

	.idea-label {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(2rem, 5vw, 3.5rem);
		text-transform: uppercase;
		letter-spacing: 0.3em;
		color: var(--vr-gold);
		margin: 0 0 var(--space-md);
	}

	.idea-text {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.7;
		color: var(--vr-sun);
		margin: 0;
		opacity: 0.9;
	}

	.idea-divider {
		width: 1px;
		background: linear-gradient(180deg, transparent, var(--vr-coral), transparent);
		margin: var(--space-lg) 0;
	}

	/* ===== LINEUP SECTION ===== */
	.lineup-section {
		background: var(--vr-plum);
		padding: var(--space-2xl) 0;
	}

	.section-title {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(2.5rem, 8vw, 5rem);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--vr-coral);
		margin: 0 0 var(--space-md);
		text-align: center;
	}

	.section-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2vw, 1.2rem);
		color: var(--vr-gold);
		text-align: center;
		max-width: 60ch;
		margin: 0 auto var(--space-xl);
		opacity: 0.9;
		line-height: 1.6;
	}

	.artists-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.artist-card {
		background: transparent;
		border: none;
		border-left: 4px solid var(--vr-coral);
		border-radius: 0;
		padding: var(--space-lg) var(--space-xl);
		position: relative;
		transition: border-color 0.3s ease;
	}

	.artist-card::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		background: linear-gradient(90deg, rgba(205, 114, 89, 0.08) 0%, transparent 50%);
		pointer-events: none;
	}

	.artist-card:hover {
		border-color: var(--vr-gold);
	}

	.artist-name {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--vr-coral);
		margin: 0 0 var(--space-xs);
		line-height: 1;
		position: relative;
	}

	.artist-lead {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.5;
		color: var(--vr-gold);
		margin: 0 0 var(--space-sm);
		max-width: 65ch;
	}

	.artist-bio {
		font-family: var(--font-serif);
		font-size: clamp(0.8rem, 1.4vw, 0.88rem);
		line-height: 1.7;
		color: rgba(243, 176, 90, 0.55);
		margin: 0;
		max-width: 70ch;
	}

	/* ===== ABOUT SECTION ===== */
	.about-section {
		background: var(--vr-plum);
		padding: var(--space-xl) 0;
		position: relative;
	}

	.about-content {
		max-width: 700px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.about-hero {
		text-align: center;
	}

	.about-lead {
		font-family: var(--font-serif);
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		line-height: 1.7;
		color: var(--vr-gold);
		margin: 0;
		opacity: 0.8;
	}

	.about-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		text-align: center;
	}

	.about-text {
		font-family: var(--font-serif);
		font-size: clamp(0.85rem, 1.8vw, 0.95rem);
		line-height: 1.6;
		color: var(--vr-gold);
		margin: 0;
		opacity: 0.6;
	}

	.about-cta {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		color: var(--vr-gold);
		font-size: clamp(0.9rem, 2vw, 1.1rem);
		text-align: center;
		margin: var(--space-sm) 0 0;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		opacity: 0.7;
	}

	/* ===== REGULATIONS DOWNLOAD ===== */
	.regulations-block {
		display: flex;
		justify-content: center;
		padding-top: var(--space-sm);
	}

	/* ===== ENTRY SECTION - Orange ===== */
	.entry-section {
		background: var(--vr-coral);
		padding: var(--space-2xl) 0;
	}

	.entry-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xl);
	}

	.entry-typography {
		text-align: center;
	}

	.entry-word {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(2.5rem, 10vw, 6rem);
		text-transform: uppercase;
		color: #ffffff;
		letter-spacing: 0.12em;
		line-height: 1.1;
	}

	.entry-info {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
	}

	.entry-info .location-text {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(0.9rem, 2vw, 1.1rem);
		color: #ffffff;
		line-height: 1.5;
		letter-spacing: 0.02em;
		white-space: pre-line;
		margin: 0;
		opacity: 0.9;
	}

	.entry-section .social-block {
		display: flex;
		gap: var(--space-lg);
	}

	.entry-section .social-icon-link {
		color: #ffffff;
		display: flex;
		align-items: center;
		transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.entry-section .social-icon-link:hover {
		opacity: 0.7;
		transform: scale(1.15);
	}

	.entry-section .social-icon-link :global(svg) {
		fill: currentColor;
		width: 48px;
		height: 48px;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 768px) {
		.logo-wrapper {
			width: clamp(280px, 95vw, 500px);
		}

		.hero-badge {
			padding: var(--space-sm) var(--space-md);
		}

		.badge-date {
			font-size: 0.6rem;
			letter-spacing: 0.2em;
		}

		.badge-slogan {
			font-size: 0.95rem;
			letter-spacing: 0.12em;
		}

		.festival-ended-badge {
			padding: var(--space-sm) var(--space-md);
			max-width: 100%;
		}

		.festival-ended-text {
			font-size: 0.75rem;
			letter-spacing: 0.06em;
		}

		.idea-content {
			flex-direction: column;
			gap: var(--space-lg);
		}

		.idea-divider {
			width: 60%;
			height: 1px;
			margin: 0 auto;
		}

		.idea-block {
			padding: var(--space-md);
		}

		.idea-number {
			font-size: 2.5rem;
		}

		.idea-label {
			font-size: 1.8rem;
			letter-spacing: 0.2em;
		}

		.section-title {
			font-size: 2rem;
			letter-spacing: 0.1em;
		}

		.artist-card {
			padding: var(--space-md) var(--space-lg);
		}

		.artist-name {
			font-size: 1.5rem;
			letter-spacing: 0.1em;
		}

		.artist-lead {
			font-size: 0.95rem;
		}

		.artist-bio {
			font-size: 0.8rem;
		}

		.entry-word {
			font-size: 2rem;
		}

		.entry-info .location-text {
			font-size: 0.85rem;
		}

		.entry-section .social-icon-link :global(svg) {
			width: 36px;
			height: 36px;
		}

		.about-lead {
			font-size: 0.95rem;
		}

		.about-text {
			font-size: 0.85rem;
		}

		.about-cta {
			font-size: 0.85rem;
		}
	}

	@media (max-width: 480px) {
		.hero-content {
			padding: var(--space-md) 0;
			gap: var(--space-md);
		}

		.logo-wrapper {
			width: 95vw;
		}

		.hero-badge {
			padding: var(--space-xs) var(--space-sm);
		}

		.badge-date {
			font-size: 0.55rem;
		}

		.badge-slogan {
			font-size: 0.85rem;
		}

		.idea-section,
		.lineup-section,
		.about-section,
		.entry-section {
			padding: var(--space-xl) 0;
		}

		.section-title {
			font-size: 1.6rem;
		}

		.artist-name {
			font-size: 1.3rem;
		}

		.artist-lead {
			font-size: 0.9rem;
		}

		.entry-word {
			font-size: 1.6rem;
		}

		.entry-section .social-icon-link :global(svg) {
			width: 32px;
			height: 32px;
		}
	}

	/* ===== REDUCED MOTION ===== */
	@media (prefers-reduced-motion: reduce) {
		.artist-card,
		.social-icon-link {
			transition: none;
		}
	}

	/* Loading state */
	.hero-section:not(.loaded) .hero-logo,
	.hero-section:not(.loaded) .hero-badge {
		opacity: 0;
	}
</style>
