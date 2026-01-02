<script lang="ts">
	import { page } from '$app/state';
	import { getLocaleFromPath, getTranslations, getTranslation } from '$lib/i18n';
	import { loadEvents, getUpcomingEvents, type Event } from '$lib/content';
	import { onMount } from 'svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	let translations = $state<any>({});
	let events = $state<Event[]>([]);
	let upcomingEvents = $state<Event[]>([]);

	$effect(() => {
		const locale = getLocaleFromPath(page.url.pathname);
		loadData(locale);
	});

	async function loadData(locale: 'pl' | 'en' | 'de') {
		translations = await getTranslations(locale);
		events = await loadEvents(locale);
		upcomingEvents = getUpcomingEvents(events).slice(0, 3);
	}

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function getEventUrl(locale: string, slug: string): string {
		return localizeHref(`/events/${slug}`, { locale: locale as 'pl' | 'en' | 'de' });
	}

	function getEventsUrl(locale: string): string {
		return localizeHref('/events', { locale: locale as 'pl' | 'en' | 'de' });
	}

	function getAboutUrl(locale: string): string {
		return localizeHref('/about', { locale: locale as 'pl' | 'en' | 'de' });
	}
</script>

<main>
	<section>
		<div class="container">
			<div class="content-block">
				<!-- Hero Section -->
				<div class="hero">
					<h1>{t('pages.home.title')}</h1>
					<p class="hero__subtitle">{t('pages.home.subtitle')}</p>
				</div>

				<!-- Mission & Approach -->
				<div class="grid grid--2 content-block__sections">
					<article class="card">
						<h2 class="card__title">{t('pages.home.mission.title')}</h2>
						<div class="card__body">
							<p>{t('pages.home.mission.text')}</p>
						</div>
					</article>

					<article class="card">
						<h2 class="card__title">{t('pages.home.approach.title')}</h2>
						<div class="card__body">
							<p>{t('pages.home.approach.text')}</p>
						</div>
					</article>
				</div>

				<!-- Focus Areas -->
				<div class="content-block__sections">
					<h2 class="text-center mb-12">{t('pages.home.focus.title')}</h2>
					<div class="grid grid--3">
						{#if translations.pages?.home?.focus?.items}
							{#each translations.pages.home.focus.items as item}
								<article class="card">
									<h3 class="card__title">{item.title}</h3>
									<div class="card__body">
										<p>{item.text}</p>
									</div>
								</article>
							{/each}
						{/if}
					</div>
				</div>

				<!-- Values -->
				<div class="content-block__sections">
					<article class="card content-block content-block--narrow">
						<h2 class="card__title text-center mb-6">{t('pages.home.values.title')}</h2>
						<div class="card__body">
							<ul class="card__list">
								{#if translations.pages?.home?.values?.items}
									{#each translations.pages.home.values.items as item}
										<li class="card__list-item">{item}</li>
									{/each}
								{/if}
							</ul>
						</div>
					</article>
				</div>

				<!-- Context & Process -->
				<div class="grid grid--2 content-block__sections">
					<article class="card">
						<h2 class="card__title">{t('pages.home.context.title')}</h2>
						<div class="card__body">
							<p>{t('pages.home.context.text')}</p>
						</div>
					</article>

					<article class="card">
						<h2 class="card__title">{t('pages.home.process.title')}</h2>
						<div class="card__body">
							<p>{t('pages.home.process.text')}</p>
						</div>
					</article>
				</div>

				<!-- Learn More -->
				<div class="text-center content-block__sections">
					<a href={getAboutUrl(getLocaleFromPath(page.url.pathname))} class="button button--outlined">
						{t('pages.home.learnMore')} →
					</a>
				</div>

				<!-- Upcoming Events -->
				<article class="card">
					<h2 class="card__title text-center mb-8">{t('pages.home.upcomingEvents')}</h2>
					<div class="card__body">
						{#if upcomingEvents.length > 0}
							<div class="card__events">
								{#each upcomingEvents as event}
									<div class="card card--clickable">
										<div class="card__event-content">
											<h3 class="card__event-title">{event.title}</h3>
											<p class="card__event-date">{event.date}</p>
											<p class="card__event-venue">
												{event.venue}, {event.city}
											</p>
											<a
												href={getEventUrl(getLocaleFromPath(page.url.pathname), event.slug)}
												class="button button--text button--sm"
											>
												{t('pages.home.readMore')} →
											</a>
										</div>
									</div>
								{/each}

								<div class="text-center card__events-footer">
									<a
										href={getEventsUrl(getLocaleFromPath(page.url.pathname))}
										class="button button--outlined"
									>
										{t('pages.home.viewAllEvents')}
									</a>
								</div>
							</div>
						{:else}
							<div class="text-center card__empty">
								<p class="text-muted">{t('common.noUpcomingEvents')}</p>
							</div>
						{/if}
					</div>
				</article>
			</div>
		</div>
	</section>
</main>
