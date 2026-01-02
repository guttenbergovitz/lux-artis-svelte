<script lang="ts">
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
			<h1>{t('pages.legal.title')}</h1>
			<p style="max-width: 65ch; margin-top: calc(var(--baseline) * 2);">
				{t('pages.legal.subtitle')}
			</p>
		</div>

		<!-- Registration Information -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2>{t('pages.legal.registration.title')}</h2>
			<div style="margin-top: calc(var(--baseline) * 4);">
				<p>{t('pages.legal.registration.krs')}</p>
				<p>{t('pages.legal.registration.nip')}</p>
				<p>{t('pages.legal.registration.regon')}</p>
				<p>{t('pages.legal.registration.registrationDate')}</p>
			</div>
		</div>

		<!-- Supervising Authorities -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2>{t('pages.legal.supervisingAuthorities.title')}</h2>
			<ul style="margin-top: calc(var(--baseline) * 4);">
				{#if data.translations.pages?.legal?.supervisingAuthorities?.items}
					{#each data.translations.pages.legal.supervisingAuthorities.items as item}
						<li>{item}</li>
					{/each}
				{/if}
			</ul>
		</div>

		<!-- Statutory Documents -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2>{t('pages.legal.statutoryDocuments.title')}</h2>
			<p style="margin-top: calc(var(--baseline) * 4);">
				{t('pages.legal.statutoryDocuments.text')}
			</p>
		</div>
	</Container>
</section>

