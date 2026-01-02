<script lang="ts">
	import { Accordion, AccordionItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}
</script>

<section class="bg-white" style="padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>
		<!-- Hero -->
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h1>{t('pages.people.title')}</h1>
			<p style="max-width: 65ch; margin-top: calc(var(--baseline) * 2);">
				{t('pages.people.subtitle')}
			</p>
		</div>

		<!-- Intro -->
		{#if data.translations.pages?.people?.intro}
			<div class="section-divider"></div>
			<div class="grid md:grid-cols-3 people-intro-grid" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
				{#if data.translations.pages.people.intro.perspective}
					<article>
						<h2 class="people-intro-heading">{data.translations.pages.people.intro.perspective.title}</h2>
						<p>{data.translations.pages.people.intro.perspective.text}</p>
					</article>
				{/if}
				{#if data.translations.pages.people.intro.place}
					<article>
						<h2 class="people-intro-heading">{data.translations.pages.people.intro.place.title}</h2>
						<p>{data.translations.pages.people.intro.place.text}</p>
					</article>
				{/if}
				{#if data.translations.pages.people.intro.competencies}
					<article>
						<h2 class="people-intro-heading">{data.translations.pages.people.intro.competencies.title}</h2>
						<p>{data.translations.pages.people.intro.competencies.text}</p>
					</article>
				{/if}
			</div>
		{/if}

		{#if data.people.length > 0}
			<div class="section-divider"></div>
			<div class="people-accordion" style="max-width: 65ch;">
				<Accordion flush>
					{#each data.people as person}
						<AccordionItem>
							{#snippet header()}
								<div class="accordion-header-content">
									<ChevronDownOutline class="accordion-icon" />
									<div>
										<h4 style="margin: 0; font-size: 0.7em;">{person.name}</h4>
										<p class="meta" style="margin-top: calc(var(--baseline) * 0.5); margin-bottom: 0; font-size: 0.4em;">
											{person.role}
										</p>
									</div>
								</div>
							{/snippet}
							<p style="margin-top: calc(var(--baseline) * 2);">
								{person.bio}
							</p>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		{:else}
			<div style="text-align: center; padding: calc(var(--baseline) * 6) 0;">
				<p>{t('pages.people.noPeople')}</p>
			</div>
		{/if}
	</Container>
</section>

