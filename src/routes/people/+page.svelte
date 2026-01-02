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
				<div class="content-block">
					<div class="content-block__header">
						<h1>{t('pages.people.title')}</h1>
						<p class="text-muted content-block__subtitle">
							{t('pages.people.subtitle')}
						</p>
					</div>

					{#if data.people.length > 0}
						<div class="grid grid--2">
							{#each data.people as person}
								<article class="card">
									<h2 class="card__title">{person.name}</h2>
									<p class="card__subtitle">{person.role}</p>
									<div class="card__body">
										<p>{person.bio}</p>
									</div>
								</article>
							{/each}
						</div>
					{:else}
						<div class="text-center" style="padding: 2rem 0;">
							<p>{t('pages.people.noPeople')}</p>
						</div>
					{/if}
				</div>
			</div>
		</section>
	</div>
</main>

