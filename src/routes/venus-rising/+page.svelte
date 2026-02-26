<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '$lib/components/Container.svelte';
	import StarField from '$lib/components/StarField.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import venusLogo from '$lib/assets/venus-rising-logo.png';
	import { FacebookSolid, InstagramSolid } from 'flowbite-svelte-icons';

	let { data }: { data: { locale: string; translations: Record<string, unknown> } } = $props();

	// State
	let scrollY = $state(0);
	let currentSection = $state(0);
	let isLoaded = $state(false);
	let prefersReducedMotion = $state(false);
	let windowHeight = $state(0);
	let gsap: any = null;
	let ScrollTrigger: any = null;

	// Refs
	let heroSection: HTMLElement;
	let pillarsSection: HTMLElement;
	let dateSection: HTMLElement;
	let ctaSection: HTMLElement;
	let closingSection: HTMLElement;
	let heroTitle: HTMLElement;
	let heroTagline: HTMLElement;
	let venusOrb: HTMLElement;
	let pillars: HTMLElement[] = [];
	let dateChars: HTMLElement[] = [];
	let venusLogoEl: HTMLElement;

	const pillarIcons = ['♪', '◈', '⬡', '◉'];

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function tArray(path: string): string[] {
		const value = getTranslation(data.translations, path);
		try {
			return JSON.parse(value) || [];
		} catch {
			return [];
		}
	}

	function getHomeUrl(locale: string): string {
		return localizeHref('/', { locale: locale as 'pl' | 'en' | 'de' });
	}

	// Pillar data - get texts from translations
	function getPillarData() {
		const pillarsArray = data.translations?.pages?.venusRising?.pillars as string[] || [];
		return pillarsArray.map((text: string, index: number) => ({
			text,
			icon: pillarIcons[index] || '◉'
		}));
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

		// Hero title animation
		gsap.fromTo(
			heroTitle,
			{ opacity: 0, y: 60, filter: 'blur(10px)' },
			{
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: 1.5,
				ease: 'power3.out',
				delay: 0.3
			}
		);

		// Tagline
		gsap.fromTo(
			heroTagline,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: 'power2.out',
				delay: 0.8
			}
		);

		// Venus orb parallax - strong rise effect
		gsap.to(venusOrb, {
			y: -350,
			scale: 1.3,
			ease: 'none',
			scrollTrigger: {
				trigger: heroSection,
				start: 'top top',
				end: 'bottom top',
				scrub: 0.8
			}
		});

		// Pillars stagger animation
		pillars.forEach((pillar, index) => {
			gsap.fromTo(
				pillar,
				{
					opacity: 0,
					x: -40,
					scale: 0.95
				},
				{
					opacity: 1,
					x: 0,
					scale: 1,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: pillar,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					},
					delay: index * 0.15
				}
			);
		});

		// Date section reveal
		gsap.fromTo(
			dateSection,
			{ '--reveal-progress': 0 },
			{
				'--reveal-progress': 1,
				ease: 'power2.inOut',
				scrollTrigger: {
					trigger: dateSection,
					start: 'top 70%',
					end: 'top 30%',
					scrub: 1
				}
			}
		);

		// Date text split animation - simple fade up
		dateChars.forEach((char, index) => {
			gsap.fromTo(
				char,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: dateSection,
						start: 'top 60%',
						toggleActions: 'play none none reverse'
					},
					delay: index * 0.04
				}
			);
		});

		// Venus logo zoom-in on scroll
		gsap.fromTo(
			venusLogoEl,
			{ scale: 0.5, opacity: 0 },
			{
				scale: 1,
				opacity: 1,
				duration: 1,
				ease: 'back.out(1.7)',
				scrollTrigger: {
					trigger: closingSection,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		);

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
</svelte:head>

<!-- Hero Section -->
<section bind:this={heroSection} class="hero-section" class:loaded={isLoaded}>
	<div class="hero-background">
		{#if !prefersReducedMotion}
			<StarField starCount={180} speed={0.3} />
		{/if}
		<div class="hero-gradient"></div>
	</div>

	<!-- Venus Orb -->
	<div bind:this={venusOrb} class="venus-orb" aria-hidden="true">
		<div class="orb-glow"></div>
		<div class="orb-core"></div>
		<div class="orb-ring"></div>
	</div>

	<Container>
		<div class="hero-content">
			<h1 bind:this={heroTitle} class="hero-title">
				<span class="title-line">Venus</span>
				<span class="title-line accent">Rising</span>
				<span class="title-line small">Festival</span>
			</h1>
			<p bind:this={heroTagline} class="hero-tagline">{t('pages.venusRising.tagline')}</p>

			<div class="scroll-indicator" aria-hidden="true">
				<span class="scroll-text">{t('pages.venusRising.scroll')}</span>
				<div class="scroll-line"></div>
			</div>
		</div>
	</Container>
</section>

<!-- Pillars Section -->
<section bind:this={pillarsSection} class="pillars-section">
	<div class="section-glow top"></div>

	<Container>
		<h2 class="lead-statement">{t('pages.venusRising.lead')}</h2>

		<div class="pillars-grid">
			{#each getPillarData() as pillar, index}
				<div bind:this={pillars[index]} class="pillar-card">
					<div class="pillar-beam" aria-hidden="true"></div>
					<div class="pillar-icon">{pillar.icon}</div>
					<p class="pillar-text">{pillar.text}</p>
				</div>
			{/each}
		</div>
	</Container>

	<div class="section-glow bottom"></div>
</section>

<!-- Date Section -->
<section bind:this={dateSection} class="date-section">
	<div class="date-reveal-bg"></div>

	<Container>
		<div class="date-content">
			<div class="date-chars">
				{#each t('pages.venusRising.date').split('') as char, index}
					<span
						bind:this={dateChars[index]}
						class="date-char"
						class:space={char === ' '}
					>
						{char === ' ' ? '\u00A0' : char}
					</span>
				{/each}
			</div>

			<p class="date-location">{t('pages.venusRising.location')}</p>

			<div class="announcement-block">
				<p class="announcement">
					{@html t('pages.venusRising.announcement')}
				</p>
				<p class="announcement">{t('pages.venusRising.announcement2')}</p>
				<div class="social-icons-row">
					<a href="https://www.facebook.com/VenusRisingFestival" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
						<FacebookSolid class="w-5 h-5" />
					</a>
					<a href="https://www.instagram.com/venus_rising_festival" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Instagram">
						<InstagramSolid class="w-5 h-5" />
					</a>
				</div>
			</div>
		</div>
	</Container>
</section>

<!-- CTA Section -->
<section bind:this={ctaSection} class="cta-section">
	<div class="cta-particles" aria-hidden="true">
		{#each Array(20) as _, i}
			<div class="particle" style="--delay: {i * 0.2}s; --x: {Math.random() * 100}%; --duration: {3 + Math.random() * 2}s"></div>
		{/each}
	</div>

	<Container>
		<div class="cta-content">
			<p class="cta-headline">{t('pages.venusRising.ctaHeadline')}</p>
			<p class="cta-subtext">{t('pages.venusRising.ctaSubtext')}</p>
		</div>
	</Container>
</section>

<!-- Closing Section -->
<section bind:this={closingSection} class="closing-section">
	<div class="closing-bg-logo" style="background-image: url({venusLogo});" aria-hidden="true"></div>
	<Container>
		<img bind:this={venusLogoEl} src={venusLogo} alt="Venus Rising" class="venus-logo" />
	</Container>
</section>

<style>
	/* CSS Custom Properties */
	:root {
		--hero-progress: 0;
		--reveal-progress: 0;
		--glow-intensity: 0;
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
		background: var(--color-graphite-dark);
	}

	.hero-background {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			#0a0a12 0%,
			#12121f 40%,
			#1a1a2e 70%,
			#252540 100%
		);
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 80% 50% at 50% 100%,
			rgba(212, 175, 55, 0.15) 0%,
			transparent 70%
		);
		opacity: calc(0.5 + var(--hero-progress) * 0.5);
	}

	/* Venus Orb */
	.venus-orb {
		position: absolute;
		bottom: -20%;
		left: 50%;
		transform: translateX(-50%);
		width: clamp(300px, 50vw, 600px);
		height: clamp(300px, 50vw, 600px);
		pointer-events: none;
	}

	.orb-core {
		position: absolute;
		inset: 20%;
		border-radius: 50%;
		background: radial-gradient(
			circle at 30% 30%,
			#f5e6c8 0%,
			#d4af37 30%,
			#b8941f 60%,
			#8b6914 100%
		);
		box-shadow:
			0 0 60px rgba(212, 175, 55, 0.6),
			0 0 120px rgba(212, 175, 55, 0.3),
			inset 0 0 60px rgba(0, 0, 0, 0.3);
	}

	.orb-glow {
		position: absolute;
		inset: -20%;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(212, 175, 55, 0.4) 0%,
			rgba(212, 175, 55, 0.1) 40%,
			transparent 70%
		);
		filter: blur(20px);
		animation: orbPulse 4s ease-in-out infinite;
	}

	.orb-ring {
		position: absolute;
		inset: 10%;
		border-radius: 50%;
		border: 1px solid rgba(212, 175, 55, 0.3);
		animation: orbRingPulse 3s ease-in-out infinite;
	}

	@keyframes orbPulse {
		0%, 100% { transform: scale(1); opacity: 0.6; }
		50% { transform: scale(1.1); opacity: 0.8; }
	}

	@keyframes orbRingPulse {
		0%, 100% { transform: scale(1); opacity: 0.3; }
		50% { transform: scale(1.05); opacity: 0.5; }
	}

	/* Hero Content */
	.hero-content {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: var(--space-2xl) 0;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-weight: 700;
		margin: 0;
		line-height: 0.9;
		text-transform: uppercase;
	}

	.title-line {
		display: block;
		font-size: clamp(3.5rem, 15vw, 10rem);
		letter-spacing: -0.03em;
		color: #fff;
		text-shadow:
			0 0 40px rgba(255, 255, 255, 0.3),
			0 0 80px rgba(255, 255, 255, 0.1);
	}

	.title-line.accent {
		color: var(--color-gold);
		text-shadow:
			0 0 40px rgba(212, 175, 55, 0.5),
			0 0 80px rgba(212, 175, 55, 0.3),
			0 0 120px rgba(212, 175, 55, 0.2);
	}

	.title-line.small {
		font-size: clamp(1.5rem, 5vw, 3rem);
		letter-spacing: 0.2em;
		margin-top: var(--space-sm);
		opacity: 0.8;
	}

	.hero-tagline {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		color: rgba(255, 255, 255, 0.7);
		margin: var(--space-lg) 0 0;
		letter-spacing: 0.1em;
	}

	/* Scroll Indicator */
	.scroll-indicator {
		position: absolute;
		bottom: var(--space-xl);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		opacity: 0.6;
		animation: scrollBounce 2s ease-in-out infinite;
	}

	.scroll-text {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: rgba(255, 255, 255, 0.5);
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: linear-gradient(to bottom, var(--color-gold), transparent);
	}

	@keyframes scrollBounce {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(10px); }
	}

	/* ===== PILLARS SECTION ===== */
	.pillars-section {
		position: relative;
		background: var(--color-gold);
		color: var(--color-graphite-dark);
		padding: var(--space-2xl) 0;
		overflow: hidden;
	}

	.section-glow {
		position: absolute;
		left: 0;
		right: 0;
		height: 200px;
		pointer-events: none;
	}

	.section-glow.top {
		top: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent);
	}

	.section-glow.bottom {
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
	}

	.lead-statement {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2rem, 6vw, 4rem);
		line-height: 1;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		max-width: 15ch;
		margin: 0 0 var(--space-2xl);
	}

	.pillars-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
	}

	.pillar-card {
		position: relative;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 4px;
		padding: var(--space-lg);
		overflow: hidden;
		transition: transform 0.4s ease, box-shadow 0.4s ease;
	}

	.pillar-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.pillar-beam {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: linear-gradient(
			to top,
			transparent,
			var(--color-graphite-dark) 20%,
			var(--color-graphite-dark) 80%,
			transparent
		);
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.pillar-card:hover .pillar-beam {
		transform: scaleY(1);
	}

	.pillar-icon {
		font-size: 2rem;
		margin-bottom: var(--space-md);
		opacity: 0.6;
	}

	.pillar-text {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.2rem);
		line-height: 1.5;
		margin: 0;
	}

	/* ===== DATE SECTION ===== */
	.date-section {
		position: relative;
		background: #fff;
		color: var(--color-graphite-dark);
		padding: var(--space-2xl) 0;
		overflow: hidden;
	}

	.date-reveal-bg {
		position: absolute;
		inset: 0;
		background: var(--color-gold);
		transform: scaleX(var(--reveal-progress));
		transform-origin: left;
	}

	.date-content {
		position: relative;
		z-index: 1;
	}

	.date-chars {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 0.05em;
		margin-bottom: var(--space-md);
		perspective: 1000px;
	}

	.date-char {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2.5rem, 8vw, 6rem);
		line-height: 1;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		display: inline-block;
		transform-style: preserve-3d;
	}

	.date-char.space {
		width: 0.3em;
	}

	.date-location {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		line-height: 1.2;
		text-transform: uppercase;
		margin: 0 0 var(--space-xl);
		max-width: 20ch;
	}

	.announcement-block {
		max-width: 45ch;
	}

	.announcement {
		font-family: var(--font-serif);
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		line-height: 1.5;
		margin: 0 0 var(--space-sm);
	}

	.announcement strong {
		font-family: var(--font-sans);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.social-icons-row {
		display: flex;
		gap: var(--space-xs);
		margin-top: var(--space-lg);
	}

	.social-icon-link {
		color: var(--color-graphite-dark);
		display: flex;
		align-items: center;
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
	}

	.social-icon-link:nth-child(2) {
		animation-delay: 0.1s;
	}

	.social-icon-link:hover {
		transform: scale(1.25);
	}

	.social-icon-link :global(svg) {
		fill: currentColor;
		width: 44px;
		height: 44px;
	}

	@keyframes bounceIn {
		0% {
			transform: scale(0);
		}
		60% {
			transform: scale(1.15);
		}
		100% {
			transform: scale(1);
		}
	}

	/* ===== CTA SECTION ===== */
	.cta-section {
		position: relative;
		background: var(--color-graphite-dark);
		color: #fff;
		padding: var(--space-2xl) 0;
		overflow: hidden;
		min-height: 60vh;
		display: flex;
		align-items: center;
	}

	.cta-particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--color-gold);
		border-radius: 50%;
		left: var(--x);
		bottom: -10px;
		opacity: 0;
		animation: particleRise var(--duration) ease-out infinite;
		animation-delay: var(--delay);
	}

	@keyframes particleRise {
		0% {
			transform: translateY(0) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 0.8;
			transform: scale(1);
		}
		90% {
			opacity: 0.3;
		}
		100% {
			transform: translateY(-100vh) scale(0.5);
			opacity: 0;
		}
	}

	.cta-content {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.cta-headline {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2.5rem, 8vw, 5rem);
		line-height: 1.1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0 0 var(--space-md);
		color: #fff;
		text-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
	}

	.cta-subtext {
		font-family: var(--font-serif);
		font-size: clamp(1.1rem, 2.5vw, 1.4rem);
		color: #fff;
		margin: 0;
	}

	/* ===== CLOSING SECTION ===== */
	.closing-section {
		background: #fff;
		padding: var(--space-lg) 0;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.closing-bg-logo {
		position: absolute;
		inset: -50%;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		opacity: 0.06;
		pointer-events: none;
		transform: rotate(-8deg);
	}

	.venus-logo {
		display: block;
		width: clamp(550px, 85vw, 1000px);
		height: auto;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}


	/* ===== RESPONSIVE ===== */
	@media (max-width: 768px) {
		.hero-title .title-line {
			font-size: clamp(2.5rem, 12vw, 5rem);
		}

		.venus-orb {
			bottom: -30%;
			width: 250px;
			height: 250px;
		}

		.pillars-grid {
			grid-template-columns: 1fr;
		}

		.date-chars {
			justify-content: center;
		}

		.date-location {
			text-align: center;
			margin-left: auto;
			margin-right: auto;
		}

		.announcement-block {
			text-align: center;
			margin: 0 auto;
		}
	}

	/* ===== REDUCED MOTION ===== */
	@media (prefers-reduced-motion: reduce) {
		.orb-glow,
		.orb-ring,
		.scroll-indicator,
		.particle {
			animation: none;
		}

		.pillar-card,
		.cta-button,
		.back-link {
			transition: none;
		}
	}

	/* Loading state */
	.hero-section:not(.loaded) .hero-title,
	.hero-section:not(.loaded) .hero-tagline {
		opacity: 0;
	}
</style>
