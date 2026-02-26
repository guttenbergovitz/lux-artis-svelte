<script lang="ts">
	import { Accordion, AccordionItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import MotionReveal from '$lib/components/MotionReveal.svelte';
	import { getTranslation } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}
</script>

<style>
	/* Poster Typography for FAQ Page */
	.poster-section {
		padding: var(--space-2xl) 0;
		background: white;
	}

	.poster-section.dark {
		background: var(--color-graphite-dark);
		color: white;
	}

	/* Hero Typography */
	.faq-hero {
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
		margin: 0 0 var(--space-xl) 0;
		text-transform: uppercase;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.125rem, 2.5vw, 1.5rem);
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.9);
		max-width: 65ch;
		margin: 0;
		font-weight: 400;
	}

	/* Category Section */
	.category-section {
		margin-bottom: calc(var(--space-2xl) * 2);
	}

	.category-section:last-child {
		margin-bottom: 0;
	}

	.category-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2.25rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	/* Accordion Styling */
	.faq-accordion {
		max-width: none;
	}

	:global(.faq-accordion .accordion-item) {
		border: none !important;
		border-bottom: 1px solid var(--color-graphite) !important;
		background: transparent !important;
	}

	:global(.faq-accordion .accordion-header) {
		background: transparent !important;
		border: none !important;
		padding: var(--space-lg) 0 !important;
		transition: all 0.2s ease !important;
	}

	:global(.faq-accordion .accordion-header:hover) {
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

	.question-text {
		font-family: var(--font-sans) !important;
		font-weight: 600 !important;
		font-size: clamp(1rem, 2.5vw, 1.125rem) !important;
		line-height: 1.3 !important;
		color: var(--color-graphite-dark) !important;
		margin: 0 !important;
	}

	:global(.faq-accordion .accordion-body) {
		padding: 0 0 var(--space-lg) calc(16px + var(--space-md)) !important;
		border: none !important;
		background: transparent !important;
	}

	.answer-text {
		font-family: var(--font-serif) !important;
		font-size: 1rem !important;
		line-height: 1.5 !important;
		color: var(--color-graphite) !important;
		margin: 0 !important;
		font-weight: 400 !important;
		max-width: 70ch;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.poster-section {
			padding: var(--space-xl) 0;
		}

		.hero-title {
			margin: 0 0 var(--space-md) 0;
		}

		.category-section {
			margin-bottom: var(--space-2xl);
		}

		:global(.faq-accordion .accordion-header) {
			padding: var(--space-md) 0 !important;
		}

		:global(.faq-accordion .accordion-body) {
			padding: 0 0 var(--space-md) calc(16px + var(--space-sm)) !important;
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section dark">
	<Container>
		<MotionReveal type="section">
			<div class="faq-hero">
				<h1 class="hero-title">{t('pages.faq.title')}</h1>
				<p class="hero-subtitle">{t('pages.faq.subtitle')}</p>
			</div>
		</MotionReveal>
	</Container>
</section>

<!-- FAQ Categories -->
<section class="poster-section">
	<Container>
		{#if data.translations.pages?.faq?.categories}
			<!-- Institutions -->
			{#if data.translations.pages.faq.categories.institutions}
				<MotionReveal type="reveal" delay={100}>
					<div class="category-section">
						<h2 class="category-title">{data.translations.pages.faq.categories.institutions.title}</h2>
						<div class="faq-accordion">
							<Accordion flush>
								{#each data.translations.pages.faq.categories.institutions.questions as item}
									<AccordionItem>
										{#snippet header()}
											<div class="accordion-header-content">
												<ChevronDownOutline class="accordion-icon" />
												<p class="question-text">{item.question}</p>
											</div>
										{/snippet}
										<p class="answer-text">{item.answer}</p>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					</div>
				</MotionReveal>
			{/if}

			<!-- Sponsors -->
			{#if data.translations.pages.faq.categories.sponsors}
				<MotionReveal type="reveal" delay={200}>
					<div class="category-section">
						<h2 class="category-title">{data.translations.pages.faq.categories.sponsors.title}</h2>
						<div class="faq-accordion">
							<Accordion flush>
								{#each data.translations.pages.faq.categories.sponsors.questions as item}
									<AccordionItem>
										{#snippet header()}
											<div class="accordion-header-content">
												<ChevronDownOutline class="accordion-icon" />
												<p class="question-text">{item.question}</p>
											</div>
										{/snippet}
										<p class="answer-text">{item.answer}</p>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					</div>
				</MotionReveal>
			{/if}

			<!-- Artists -->
			{#if data.translations.pages.faq.categories.artists}
				<MotionReveal type="reveal" delay={300}>
					<div class="category-section">
						<h2 class="category-title">{data.translations.pages.faq.categories.artists.title}</h2>
						<div class="faq-accordion">
							<Accordion flush>
								{#each data.translations.pages.faq.categories.artists.questions as item}
									<AccordionItem>
										{#snippet header()}
											<div class="accordion-header-content">
												<ChevronDownOutline class="accordion-icon" />
												<p class="question-text">{item.question}</p>
											</div>
										{/snippet}
										<p class="answer-text">{item.answer}</p>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					</div>
				</MotionReveal>
			{/if}

			<!-- Audience -->
			{#if data.translations.pages.faq.categories.audience}
				<MotionReveal type="reveal" delay={400}>
					<div class="category-section">
						<h2 class="category-title">{data.translations.pages.faq.categories.audience.title}</h2>
						<div class="faq-accordion">
							<Accordion flush>
								{#each data.translations.pages.faq.categories.audience.questions as item}
									<AccordionItem>
										{#snippet header()}
											<div class="accordion-header-content">
												<ChevronDownOutline class="accordion-icon" />
												<p class="question-text">{item.question}</p>
											</div>
										{/snippet}
										<p class="answer-text">{item.answer}</p>
									</AccordionItem>
								{/each}
							</Accordion>
						</div>
					</div>
				</MotionReveal>
			{/if}
		{/if}
	</Container>
</section>
