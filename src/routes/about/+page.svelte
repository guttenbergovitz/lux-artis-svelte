<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function splitParagraphs(text: string): string[] {
		return text.split('\n\n').filter((p) => p.trim());
	}
</script>

<section class="bg-white" style="padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>
		<!-- Hero -->
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h1>{t('pages.about.title')}</h1>
			<p style="max-width: 65ch; margin-top: calc(var(--baseline) * 2);">
				{t('pages.about.subtitle')}
			</p>
		</div>

		<!-- Mission & Vision - 2 columns -->
		<div class="section-divider"></div>
		<div class="grid md:grid-cols-2" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
			<article>
				<h2>{t('pages.about.mission.title')}</h2>
				<p>{t('pages.about.mission.text')}</p>
			</article>
			<article>
				<h2>{t('pages.about.vision.title')}</h2>
				<p>{t('pages.about.vision.text')}</p>
			</article>
		</div>

		<!-- Approach -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2>{t('pages.about.approach.title')}</h2>
			<p>{t('pages.about.approach.text')}</p>
		</div>

		<!-- Values - 2 columns -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2>{t('pages.about.values.title')}</h2>
			<div class="grid md:grid-cols-2" style="gap: calc(var(--baseline) * 8); margin-top: calc(var(--baseline) * 6);">
				{#if data.translations.pages?.about?.values?.items}
					{#each data.translations.pages.about.values.items as item}
						<article>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Extended sections -->
		{#if data.translations.pages?.about?.extended}
			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.culture.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.culture.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.activities.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.activities.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.location.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.location.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.audience.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.audience.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.philosophy.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.philosophy.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.collaboration.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.collaboration.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.community.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.community.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="section-divider"></div>
			<div style="margin-bottom: calc(var(--baseline) * 12);">
				<h2>{t('pages.about.extended.future.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.future.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		{/if}
	</Container>
</section>
