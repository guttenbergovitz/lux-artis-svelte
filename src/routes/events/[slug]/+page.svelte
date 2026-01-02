<script lang="ts">
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
</script>

<main>
	<div class="container">
		<article>
			<nav>
				<a href={getEventsUrl(data.locale)}>
					← {t('pages.events.backToEvents')}
				</a>
			</nav>

			<header>
				<h1>{data.event.title}</h1>
				<p class="text-muted">
					<time datetime={data.event.date}>{data.event.date}</time> · {data.event.venue}, {data.event.city}
				</p>
			</header>

			<section>
				<h2>{t('pages.events.artists')}</h2>
				<ul>
					{#each data.event.artists as artist}
						<li>{artist}</li>
					{/each}
				</ul>
			</section>

			<section>
				<h2>{t('pages.events.description')}</h2>
				<p>{data.event.description}</p>
			</section>
		</article>
	</div>
</main>

