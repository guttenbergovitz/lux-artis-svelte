<script lang="ts">
	import { Button, Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function getEventUrl(locale: string, slug: string): string {
		return localizeHref(`/events/${slug}`, { locale: locale as 'pl' | 'en' | 'de' });
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
			month: 'long'
		});
	}
</script>

<section class="bg-white" style="padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>
		<!-- Hero -->
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h1>{t('pages.events.title')}</h1>
			<p style="max-width: 65ch; margin-top: calc(var(--baseline) * 2);">
				{t('pages.events.subtitle')}
			</p>
		</div>

		<!-- Upcoming Events Section -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2 style="margin-bottom: calc(var(--baseline) * 1);">{t('pages.events.upcomingEventsSection')}</h2>
			<p style="max-width: 65ch; margin-bottom: calc(var(--baseline) * 4);">
				{t('pages.events.upcomingEventsIntro')}
			</p>

			{#if data.upcomingEvents.length > 0}
				<Timeline order="vertical" class="events-timeline">
					{#each data.upcomingEvents as event, index}
						{@const isLast = index === data.upcomingEvents.length - 1}
						{@const formattedDate = formatDate(event.date, data.locale)}
						<TimelineItem title={event.title} date={formattedDate} isLast={isLast}>
							{#snippet orientationSlot()}
								<span class="absolute -left-4 flex h-6 w-6 items-center justify-center ring-8 ring-white" style="border-radius: 0; background-color: var(--color-gold);">
									<CalendarWeekSolid class="h-4 w-4" style="color: var(--color-graphite-dark);" />
								</span>
							{/snippet}
							<div style="padding-left: calc(var(--baseline) * 2);">
								{#if event.venue && event.city}
									<p class="meta" style="margin-bottom: calc(var(--baseline) * 1);">
										{event.venue}, {event.city}
									</p>
								{/if}
								{#if event.description}
									<p style="margin-bottom: calc(var(--baseline) * 2); max-width: 65ch;">
										{event.description}
									</p>
								{/if}
								<a href={getEventUrl(data.locale, event.slug)}>
									<Button color="gray" outline style="font-family: var(--font-sans); font-weight: 300;">
										{t('pages.home.readMore')}
									</Button>
								</a>
							</div>
						</TimelineItem>
					{/each}
				</Timeline>
			{:else}
				<div style="text-align: center; padding: calc(var(--baseline) * 6) 0;">
					<p>{t('pages.events.noUpcomingEvents')}</p>
				</div>
			{/if}
		</div>

		<!-- Past Events Section -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2 style="margin-bottom: calc(var(--baseline) * 1);">{t('pages.events.pastEventsSection')}</h2>
			<p style="max-width: 65ch; margin-bottom: calc(var(--baseline) * 4);">
				{t('pages.events.pastEventsIntro')}
			</p>

			{#if data.pastEvents.length > 0}
				<Timeline order="vertical" class="events-timeline">
					{#each data.pastEvents as event, index}
						{@const isLast = index === data.pastEvents.length - 1}
						{@const formattedDate = formatDate(event.date, data.locale)}
						<TimelineItem title={event.title} date={formattedDate} isLast={isLast}>
							{#snippet orientationSlot()}
								<span class="absolute -left-4 flex h-6 w-6 items-center justify-center ring-8 ring-white" style="border-radius: 0; background-color: var(--color-gold);">
									<CalendarWeekSolid class="h-4 w-4" style="color: var(--color-graphite-dark);" />
								</span>
							{/snippet}
							<div style="padding-left: calc(var(--baseline) * 2);">
								{#if event.venue && event.city}
									<p class="meta" style="margin-bottom: calc(var(--baseline) * 1);">
										{event.venue}, {event.city}
									</p>
								{/if}
								{#if event.description}
									<p style="margin-bottom: calc(var(--baseline) * 2); max-width: 65ch;">
										{event.description}
									</p>
								{/if}
								<a href={getEventUrl(data.locale, event.slug)}>
									<Button color="gray" outline style="font-family: var(--font-sans); font-weight: 300;">
										{t('pages.home.readMore')}
									</Button>
								</a>
							</div>
						</TimelineItem>
					{/each}
				</Timeline>
			{:else}
				<div style="text-align: center; padding: calc(var(--baseline) * 6) 0;">
					<p>{t('pages.events.noPastEvents')}</p>
				</div>
			{/if}
		</div>
	</Container>
</section>

