<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import MotionReveal from '$lib/components/MotionReveal.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function getEventsUrl(locale: string): string {
		return localizeHref('/events', { locale: locale as 'pl' | 'en' | 'de' | 'uk' });
	}
</script>

<style>
	/* Compact Fact Sheet Style */
	.poster-section {
		padding: var(--space-2xl) 0;
		background: white;
	}

	.poster-section.dark {
		background: var(--color-graphite-dark);
		color: white;
	}

	.poster-section.compact {
		padding: var(--space-xl) 0;
	}

	/* Hero */
	.info-hero {
		text-align: left;
		max-width: none;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(3rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		color: white;
		margin: 0 0 var(--space-md) 0;
		text-transform: uppercase;
	}

	.hero-tagline {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: clamp(0.875rem, 2vw, 1rem);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0 var(--space-lg) 0;
	}

	.hero-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.9);
		max-width: 65ch;
		margin: 0;
		font-weight: 400;
		white-space: pre-line;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		line-height: 1.4;
		color: white;
		max-width: 65ch;
		margin: 0 0 var(--space-xl) 0;
		font-weight: 500;
	}

	/* Info Sections */
	.info-section {
		margin-bottom: 6rem;
	}

	.info-section:last-child {
		margin-bottom: 0;
	}

	.section-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		padding-top: var(--space-xl);
		text-transform: uppercase;
	}

	.info-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.info-item {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.5;
		color: var(--color-graphite);
		padding-left: var(--space-lg);
		position: relative;
		font-weight: 400;
	}

	.info-item::before {
		content: "—";
		position: absolute;
		left: 0;
		color: var(--color-graphite-light);
	}

	/* Registration Data */
	.registration-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-lg);
		margin-bottom: var(--space-2xl);
	}

	.registration-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.registration-label {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-light);
	}

	.registration-value {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.4;
		color: var(--color-graphite-dark);
		font-weight: 400;
	}

	.board-section {
		margin-top: var(--space-lg);
		padding-top: var(--space-lg);
		border-top: 1px solid var(--color-graphite);
	}

	.board-title {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 1rem;
		text-transform: uppercase;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-xs) 0;
	}

	.board-representation {
		font-family: var(--font-serif);
		font-size: 0.8rem;
		line-height: 1.3;
		color: var(--color-graphite);
		margin: 0 0 var(--space-md) 0;
		font-style: italic;
	}

	.board-members {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.board-member {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.member-name {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--color-graphite-dark);
	}

	.member-position {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-light);
	}

	.member-since {
		font-family: var(--font-serif);
		font-size: 0.75rem;
		color: var(--color-graphite);
	}

	/* CTA Section */
	.cta-section {
		text-align: center;
		padding: var(--space-2xl) 0;
		background: var(--color-gold);
	}

	.cta-text {
		font-family: var(--font-serif);
		font-size: clamp(1.125rem, 3vw, 1.5rem);
		line-height: 1.4;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		font-weight: 400;
	}

	.cta-button {
		display: inline-block;
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: white;
		background: var(--color-graphite-dark);
		border: 1px solid var(--color-graphite-dark);
		padding: var(--space-md) var(--space-xl);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.cta-button:hover {
		background: transparent;
		color: var(--color-graphite-dark);
	}

	/* Mobile */
	@media (max-width: 768px) {
		.poster-section {
			padding: var(--space-xl) 0;
		}

		.hero-title {
			margin: 0 0 var(--space-sm) 0;
		}

		.info-section {
			margin-bottom: var(--space-2xl);
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section dark">
	<Container>
		<MotionReveal type="section">
			<div class="info-hero">
				<h1 class="hero-title">{t('pages.info.title')}</h1>
				<p class="hero-subtitle">{t('pages.info.subtitle')}</p>
				<p class="hero-tagline">{t('pages.info.tagline')}</p>
				<p class="hero-intro">{t('pages.info.intro')}</p>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- Info Sections -->
<section class="poster-section">
	<Container>
		{#if data.translations.pages?.info?.sections}
			<!-- How We Work -->
			{#if data.translations.pages.info.sections.how}
				<MotionReveal type="reveal" delay={100}>
					<div class="info-section">
						<h2 class="section-title">{data.translations.pages.info.sections.how.title}</h2>
						<ul class="info-list">
							{#each data.translations.pages.info.sections.how.points as point}
								<li class="info-item">{point}</li>
							{/each}
						</ul>
					</div>
				</MotionReveal>
			{/if}

			<!-- What We Do -->
			{#if data.translations.pages.info.sections.what}
				<MotionReveal type="reveal" delay={200}>
					<div class="info-section">
						<h2 class="section-title">{data.translations.pages.info.sections.what.title}</h2>
						<ul class="info-list">
							{#each data.translations.pages.info.sections.what.points as point}
								<li class="info-item">{point}</li>
							{/each}
						</ul>
					</div>
				</MotionReveal>
			{/if}

			<!-- Our Focus -->
			{#if data.translations.pages.info.sections.focus}
				<MotionReveal type="reveal" delay={300}>
					<div class="info-section">
						<h2 class="section-title">{data.translations.pages.info.sections.focus.title}</h2>
						<ul class="info-list">
							{#each data.translations.pages.info.sections.focus.points as point}
								<li class="info-item">{point}</li>
							{/each}
						</ul>
					</div>
				</MotionReveal>
			{/if}
		{/if}
	</Container>
</section>

<!-- CTA Section -->
<section class="cta-section">
	<Container>
		<MotionReveal type="section">
			<p class="cta-text">{t('pages.info.cta.text')}</p>
			<a href={getEventsUrl(data.locale)} class="cta-button">
				{t('pages.info.cta.button')}
			</a>
		</MotionReveal>
	</Container>
</section>

<!-- Registration Data Section -->
<section class="poster-section">
	<Container>
		{#if data.translations.pages?.info?.registration}
			<MotionReveal type="reveal" delay={100}>
				<div class="info-section">
					<h2 class="section-title">{data.translations.pages.info.registration.title}</h2>
					<div class="registration-grid">
						{#each data.translations.pages.info.registration.items as item}
							<div class="registration-item">
								<span class="registration-label">{item.label}</span>
								<span class="registration-value">{item.value}</span>
							</div>
						{/each}
					</div>

					{#if data.translations.pages.info.registration.board}
						<div class="board-section">
							<h3 class="board-title">{data.translations.pages.info.registration.board.title}</h3>
							<p class="board-representation">{data.translations.pages.info.registration.board.representation}</p>
							<div class="board-members">
								{#each data.translations.pages.info.registration.board.members as member}
									<div class="board-member">
										<span class="member-name">{member.name}</span>
										<span class="member-position">{member.position}</span>
										<span class="member-since">Od {member.since}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</MotionReveal>
		{/if}
	</Container>
</section>
