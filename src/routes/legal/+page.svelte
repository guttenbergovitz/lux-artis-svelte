<script lang="ts">
	import { getTranslation } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}
</script>

<main>
	<div class="page">
		<section class="section">
			<div class="container">
				<div class="content-block content-block--narrow">
					<div class="content-block__header">
						<h1>{t('pages.legal.title')}</h1>
						<p class="text-muted content-block__subtitle">
							{t('pages.legal.subtitle')}
						</p>
					</div>

					<div class="content-block__sections">
						<!-- Registration Information -->
						<article class="card">
							<h2 class="card__title">
								{t('pages.legal.registration.title')}
							</h2>
							<div class="card__body card__body--list">
								<p>{t('pages.legal.registration.krs')}</p>
								<p>{t('pages.legal.registration.nip')}</p>
								<p>{t('pages.legal.registration.regon')}</p>
								<p>{t('pages.legal.registration.registrationDate')}</p>
							</div>
						</article>

						<!-- Supervising Authorities -->
						<article class="card">
							<h2 class="card__title">
								{t('pages.legal.supervisingAuthorities.title')}
							</h2>
							<ul class="card__body card__body--list card__body--bulleted">
								{#if data.translations.pages?.legal?.supervisingAuthorities?.items}
									{#each data.translations.pages.legal.supervisingAuthorities.items as item}
										<li>{item}</li>
									{/each}
								{/if}
							</ul>
						</article>

						<!-- Statutory Documents -->
						<article class="card">
							<h2 class="card__title">
								{t('pages.legal.statutoryDocuments.title')}
							</h2>
							<div class="card__body">
								<p>{t('pages.legal.statutoryDocuments.text')}</p>
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	</div>
</main>

