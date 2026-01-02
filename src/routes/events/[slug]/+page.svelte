<script lang="ts">
	import { page } from '$app/state';
	import { getLocaleFromPath, getTranslations, getTranslation } from '$lib/i18n';
	import { loadEvent, type Event } from '$lib/content';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { error } from '@sveltejs/kit';

	let translations = $state<any>({});
	let event = $state<Event | null>(null);

	$effect(() => {
		const locale = getLocaleFromPath(page.url.pathname);
		const slug = page.params.slug;
		if (slug) {
			loadData(locale, slug);
		}
	});

	async function loadData(locale: 'pl' | 'en' | 'de', slug: string) {
		translations = await getTranslations(locale);
		event = await loadEvent(locale, slug);
		
		if (!event) {
			const notFoundMsg = getTranslation(translations, 'pages.events.notFound') || 'Event not found';
			throw error(404, notFoundMsg);
		}
	}

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function getEventsUrl(locale: string): string {
		return localizeHref('/events', { locale: locale as 'pl' | 'en' | 'de' });
	}
</script>

{#if event}
	<main>
		<div class="container">
			<article>
				<nav>
					<a href={getEventsUrl(getLocaleFromPath(page.url.pathname))}>
						← {t('pages.events.backToEvents')}
					</a>
				</nav>

				<header>
					<h1>{event.title}</h1>
					<p class="text-muted">
						<time datetime={event.date}>{event.date}</time> · {event.venue}, {event.city}
					</p>
				</header>

				<section>
					<h2>{t('pages.events.artists')}</h2>
					<ul>
						{#each event.artists as artist}
							<li>{artist}</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2>{t('pages.events.description')}</h2>
					<p>{event.description}</p>
				</section>
			</article>
		</div>
	</main>
{/if}

