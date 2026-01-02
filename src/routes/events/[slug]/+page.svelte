<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function getEventsUrl(locale: string): string {
		return localizeHref('/events', { locale: locale as 'pl' | 'en' | 'de' });
	}

	function formatDate(dateString: string, locale: string): string {
		const date = new Date(dateString);
		const localeMap: Record<string, string> = {
			pl: 'pl-PL',
			en: 'en-US',
			de: 'de-DE'
		};
		const dateLocale = localeMap[locale] || 'en-US';
		
		return date.toLocaleDateString(dateLocale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<section class="bg-white" style="padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>
		<article>
			<div style="margin-bottom: calc(var(--baseline) * 4);">
				<a href={getEventsUrl(data.locale)} style="text-decoration: none; color: var(--color-graphite-light);">
					← {t('pages.events.backToEvents')}
				</a>
			</div>

			<header style="margin-bottom: calc(var(--baseline) * 12);">
				<h1>{data.event.title}</h1>
				<div style="margin-top: calc(var(--baseline) * 2);">
					<p class="meta">
						<time datetime={data.event.date}>{formatDate(data.event.date, data.locale)}</time>
					</p>
					{#if data.event.venue && data.event.city}
						<p style="margin-top: calc(var(--baseline) * 1);">
							{data.event.venue}, {data.event.city}
						</p>
					{/if}
				</div>
			</header>

			{#if data.event.artists && data.event.artists.length > 0}
				<div class="section-divider"></div>
				<div style="margin-bottom: calc(var(--baseline) * 12);">
					<h2>{t('pages.events.artists')}</h2>
					<ul>
						{#each data.event.artists as artist}
							<li>{artist}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if data.event.description}
				<div class="section-divider"></div>
				<div style="margin-bottom: calc(var(--baseline) * 12);">
					<h2>{t('pages.events.description')}</h2>
					{#each data.event.description.split('\n\n') as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
			{/if}
		</article>
	</Container>
</section>

