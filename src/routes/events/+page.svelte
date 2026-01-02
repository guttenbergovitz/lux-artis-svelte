<script lang="ts">
	import { page } from '$app/state';
	import { getLocaleFromPath, getTranslations, getTranslation } from '$lib/i18n';
	import { loadEvents, getUpcomingEvents, getPastEvents, type Event } from '$lib/content';
	import { localizeHref } from '$lib/paraglide/runtime';

	let translations = $state<any>({});
	let events = $state<Event[]>([]);
	let upcomingEvents = $state<Event[]>([]);
	let pastEvents = $state<Event[]>([]);

	$effect(() => {
		const locale = getLocaleFromPath(page.url.pathname);
		loadData(locale);
	});

	async function loadData(locale: 'pl' | 'en' | 'de') {
		translations = await getTranslations(locale);
		events = await loadEvents(locale);
		upcomingEvents = getUpcomingEvents(events);
		pastEvents = getPastEvents(events);
	}

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function getEventUrl(locale: string, slug: string): string {
		return localizeHref(`/events/${slug}`, { locale: locale as 'pl' | 'en' | 'de' });
	}
</script>

<main>
	<div>
		<div class="container section">
			<div class="mb-12">
				<h1>{t('pages.events.title')}</h1>
				<p class="text-muted" style="font-size: var(--font-size-xl);">
					{t('pages.events.subtitle')}
				</p>
			</div>

			<!-- Upcoming Events Section -->
			<section class="mb-24">
				<h2 class="text-primary">{t('pages.events.upcomingEventsSection')}</h2>
				<p class="text-muted mb-8" style="font-size: var(--font-size-lg);">
					{t('pages.events.upcomingEventsIntro')}
				</p>

				{#if upcomingEvents.length > 0}
					<div class="space-y-8">
						{#each upcomingEvents as event}
							<article class="card">
								<div class="card__header">
									<h3 class="card__title">
										<a href={getEventUrl(getLocaleFromPath(page.url.pathname), event.slug)}>
											{event.title}
										</a>
									</h3>
									<p class="card__subtitle">{event.date}</p>
								</div>
								<div class="card__body">
									<p>{event.description}</p>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div class="text-center" style="padding: 2rem 0;">
						<p>{t('pages.events.noUpcomingEvents')}</p>
					</div>
				{/if}
			</section>

			<!-- Past Events Section -->
			<section>
				<h2 class="text-primary">{t('pages.events.pastEventsSection')}</h2>
				<p class="text-muted mb-8" style="font-size: var(--font-size-lg);">
					{t('pages.events.pastEventsIntro')}
				</p>

				{#if pastEvents.length > 0}
					<div class="space-y-8">
						{#each pastEvents as event}
							<article class="card">
								<div class="card__header">
									<h3 class="card__title">
										<a href={getEventUrl(getLocaleFromPath(page.url.pathname), event.slug)}>
											{event.title}
										</a>
									</h3>
									<p class="card__subtitle">{event.date}</p>
								</div>
								<div class="card__body">
									<p>{event.description}</p>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div class="text-center" style="padding: 2rem 0;">
						<p>{t('pages.events.noPastEvents')}</p>
					</div>
				{/if}
			</section>
		</div>
	</div>
</main>

