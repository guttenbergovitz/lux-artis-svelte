<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '$lib/components/Container.svelte';

	interface Sponsor {
		name: string;
		logo: string;
		url?: string;
	}

	interface SponsorGroup {
		title: string;
		items: Sponsor[];
	}

	const groups: SponsorGroup[] = [
		{
			title: 'Sponsorzy',
			items: [
				{ name: 'Gmina Dolice', logo: '/sponsors/sponsor-gmina-dolice-herb.png', url: 'https://dolice.pl/' },
				{ name: 'PAD RES', logo: '/sponsors/sponsor-pad-res.png', url: 'https://www.pad-res.pl/' },
				{ name: 'Dworek Wiktoria', logo: '/sponsors/sponsor-dworek-wiktoria.jpg', url: 'https://dworekwiktoria.pl/' },
				{ name: 'EKO SERWIS', logo: '/sponsors/sponsor-eko-serwis.png', url: 'https://www.ekoserwis.szczecin.pl/' },
				{ name: 'Renesans', logo: '/sponsors/sponsor-renesans.png', url: 'https://renesanspolska.pl/' },
				{ name: 'GRODZKI', logo: '/sponsors/sponsor-grodzki.png', url: 'http://hotel-grodzki.pl/' },
				{ name: 'PUTRI BALI', logo: '/sponsors/sponsor-putri-bali.jpg', url: 'https://www.facebook.com/ZanetaMiskiewiczKobidoUp/' },
				{ name: 'Hubertus', logo: '/sponsors/sponsor-hubertus.jpg' }
			]
		},
		{
			title: 'Partnerzy',
			items: [
				{ name: 'GCK Dolice', logo: '/sponsors/partner-gck-dolice.jpg', url: 'https://centrumdolice.pl/' },
				{ name: 'No Exit DJ Academy', logo: '/sponsors/partner-no-exit.png', url: 'https://www.instagram.com/noexit.djacademy/' },
				{ name: 'TCC', logo: '/sponsors/partner-tcc.png', url: 'https://www.instagram.com/time.capsule.cars/' },
				{ name: 'LS Project', logo: '/sponsors/partner-ls-project.png', url: 'http://lsproject.pl/' },
				{ name: 'Primary Talent Agency', logo: '/sponsors/partner-primary-talent.jpg', url: 'https://primarytalent.com/' },
				{ name: 'C & C Bookings', logo: '/sponsors/partner-c-and-c.jpg', url: 'https://www.cc-bookings.com/' },
				{ name: 'Little Big Agency', logo: '/sponsors/partner-little-big.jpg', url: 'https://www.lb-agency.net/about' },
				{ name: 'Różowy Patrol', logo: '/sponsors/partner-rozowy-patrol.png', url: 'https://rozowypatrol.pl/' }
			]
		},
		{
			title: 'Patronat',
			items: [{ name: 'Radio Czwórka', logo: '/sponsors/patronat-czworka.jpg', url: 'https://czworka.polskieradio.pl/' }]
		}
	];

	let sectionRef: HTMLElement;
	let prefersReducedMotion = false;

	onMount(() => {
		if (!browser) return;

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;

		const revealEls = sectionRef.querySelectorAll('.reveal');

		if (prefersReducedMotion) {
			revealEls.forEach((el) => el.classList.add('is-visible'));
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
		);

		revealEls.forEach((el) => {
			const rect = el.getBoundingClientRect();
			// Show immediately if already in viewport (fixes mobile IO misses)
			if (rect.top < window.innerHeight && rect.bottom > 0) {
				el.classList.add('is-visible');
			} else {
				observer.observe(el);
			}
		});

		return () => observer.disconnect();
	});
</script>

<section class="sponsors-section" bind:this={sectionRef}>
	<Container>
		<div class="sponsors-content">
			{#each groups as group, groupIndex}
				<div class="sponsor-group" class:patronat={group.title === 'Patronat'}>
					<h3 class="group-title reveal" style="transition-delay: {groupIndex * 0.12}s">
						{group.title}
					</h3>
					<div class="logos-grid">
						{#each group.items as item, itemIndex}
							{@const delay = groupIndex * 0.12 + itemIndex * 0.1}
							{#if item.url}
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									class="logo-item reveal"
	
									aria-label={item.name}
									style="transition-delay: {delay}s"
								>
									<img src={item.logo} alt={item.name} loading="lazy" />
								</a>
							{:else}
								<div
									class="logo-item reveal"
	
									aria-label={item.name}
									style="transition-delay: {delay}s"
								>
									<img src={item.logo} alt={item.name} loading="lazy" />
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>

<style>
	.sponsors-section {
		background: #ffffff;
		padding: calc(var(--space-2xl) * 1.6) 0;
	}

	.sponsors-content {
		display: flex;
		flex-direction: column;
		gap: calc(var(--space-2xl) * 1.6);
	}

	.sponsor-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: calc(var(--space-xl) * 1.4);
	}

	.group-title {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(0.85rem, 1.6vw, 1.1rem);
		text-transform: uppercase;
		letter-spacing: 0.45em;
		color: var(--vr-plum);
		opacity: 0.45;
		margin: 0;
		text-align: center;
	}

	.logos-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: calc(var(--space-xl) * 1.4);
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
		align-items: center;
	}

	.logo-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg);
		width: 100%;
		min-height: clamp(120px, 14vw, 180px);
		transition:
			transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
			filter 0.5s ease,
			opacity 0.5s ease;
		cursor: default;
	}

	.logo-item[href] {
		cursor: pointer;
	}

	.logo-item[href]:hover {
		transform: translateY(-6px) scale(1.04);
	}

	.logo-item img {
		max-width: 100%;
		max-height: clamp(160px, 18vw, 260px);
		width: auto;
		height: auto;
		object-fit: contain;
		filter: grayscale(100%);
		opacity: 0.6;
		transition:
			filter 0.5s ease,
			opacity 0.5s ease;
	}

	.logo-item[href]:hover img {
		filter: grayscale(0%);
		opacity: 1;
	}

	/* Scroll reveal */
	.reveal {
		opacity: 0;
		transform: translateY(40px) scale(0.94);
		transition:
			opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
	}

	:global(.reveal.is-visible) {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	/* Tablet — 2 columns */
	/* Patronat — single large centered logo */
	.sponsor-group.patronat .logos-grid {
		grid-template-columns: 1fr;
		max-width: 520px;
	}

	.sponsor-group.patronat .logo-item {
		min-height: clamp(160px, 20vw, 240px);
	}

	.sponsor-group.patronat .logo-item img {
		max-height: clamp(220px, 28vw, 360px);
	}

	@media (max-width: 900px) {
		.logos-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: calc(var(--space-xl) * 1.2);
			max-width: 700px;
		}

		.logo-item img {
			max-height: clamp(150px, 20vw, 220px);
		}

		.sponsor-group.patronat .logos-grid {
			max-width: 420px;
		}

		.sponsor-group.patronat .logo-item img {
			max-height: clamp(200px, 28vw, 300px);
		}
	}

	/* Mobile — 2 columns narrower */
	@media (max-width: 768px) {
		.sponsors-section {
			padding: var(--space-2xl) 0;
		}

		.sponsors-content {
			gap: calc(var(--space-2xl) * 1.2);
		}

		.sponsor-group {
			gap: var(--space-xl);
		}

		.logos-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: calc(var(--space-lg) * 1.2);
			max-width: 100%;
		}

		.logo-item {
			padding: var(--space-md);
			min-height: clamp(100px, 18vw, 140px);
		}

		.logo-item img {
			max-height: clamp(130px, 22vw, 190px);
		}
	}

	/* Mobile — single column, larger logos, no grayscale */
	@media (max-width: 640px) {
		.logos-grid {
			grid-template-columns: 1fr;
			gap: calc(var(--space-lg) * 1.2);
		}

		.logo-item {
			padding: var(--space-md);
			min-height: 110px;
		}

		.logo-item img {
			max-height: clamp(130px, 30vw, 180px);
			filter: grayscale(0%);
			opacity: 1;
		}

		.sponsor-group.patronat .logo-item {
			min-height: 140px;
		}

		.sponsor-group.patronat .logo-item img {
			max-height: clamp(160px, 36vw, 220px);
		}
	}

	/* Very small screens */
	@media (max-width: 400px) {
		.logo-item {
			min-height: 90px;
			padding: var(--space-sm);
		}

		.logo-item img {
			max-height: clamp(100px, 28vw, 140px);
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.logo-item,
		.logo-item img {
			transition: none;
		}
	}
</style>
