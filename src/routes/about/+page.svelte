<script lang="ts">
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

<main>
	<div class="container">
		<!-- Hero -->
		<section>
			<h1>{t('pages.about.title')}</h1>
			<p class="text-muted" style="font-size: 1.5rem; max-width: 80ch;">
				{t('pages.about.subtitle')}
			</p>
		</section>

		<!-- Mission & Vision - 2 columns -->
		<section>
			<div class="grid grid--2">
				<article>
					<h2>{t('pages.about.mission.title')}</h2>
					<p>{t('pages.about.mission.text')}</p>
				</article>
				<article>
					<h2>{t('pages.about.vision.title')}</h2>
					<p>{t('pages.about.vision.text')}</p>
				</article>
			</div>
		</section>

		<!-- Approach -->
		<section>
			<h2>{t('pages.about.approach.title')}</h2>
			<p>{t('pages.about.approach.text')}</p>
		</section>

		<!-- Values - 2 columns -->
		<section>
			<h2>{t('pages.about.values.title')}</h2>
			<div class="grid grid--2" style="margin-top: 3rem;">
				{#if data.translations.pages?.about?.values?.items}
					{#each data.translations.pages.about.values.items as item}
						<article>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					{/each}
				{/if}
			</div>
		</section>

		<!-- Extended sections -->
		{#if data.translations.pages?.about?.extended}
			<section>
				<h2>{t('pages.about.extended.culture.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.culture.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.activities.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.activities.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.location.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.location.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.audience.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.audience.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.philosophy.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.philosophy.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.collaboration.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.collaboration.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.community.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.community.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>

			<section>
				<h2>{t('pages.about.extended.future.title')}</h2>
				{#each splitParagraphs(t('pages.about.extended.future.text')) as paragraph}
					<p>{paragraph}</p>
				{/each}
			</section>
		{/if}
	</div>
</main>
