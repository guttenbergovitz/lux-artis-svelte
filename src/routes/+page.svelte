<script lang="ts">
	import { Button, Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
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

	function parseSubtitle(subtitle: string): { intro: string; words: string[] } {
		const parts = subtitle.split('\n');
		const intro = parts[0] || '';
		const wordsText = parts.slice(1).join(' ');
		const words = wordsText
			.split('.')
			.map((w) => w.trim())
			.filter((w) => w.length > 0);
		return { intro, words };
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
		<!-- Hero Section -->
		<div style="text-align: center; margin-bottom: calc(var(--baseline) * 12);">
			<h1>{t('pages.home.title')}</h1>
			{#each [parseSubtitle(t('pages.home.subtitle'))] as { intro, words }}
				<div class="lead-heading">
					<p class="lead-intro">{intro}</p>
					<div class="lead-words">
						{#each words as word}
							<h2 class="lead-word">{word}</h2>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Mission & Approach -->
		<div class="section-divider"></div>
		<div class="grid md:grid-cols-2" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
			<article>
				<h2>{t('pages.home.mission.title')}</h2>
				<p>{t('pages.home.mission.text')}</p>
			</article>

			<article>
				<h2>{t('pages.home.approach.title')}</h2>
				<p>{t('pages.home.approach.text')}</p>
			</article>
		</div>

		<!-- Focus Areas -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2 style="text-align: center;">{t('pages.home.focus.title')}</h2>
			<div class="grid md:grid-cols-3" style="gap: calc(var(--baseline) * 6);">
				{#if data.translations.pages?.home?.focus?.items}
					{#each data.translations.pages.home.focus.items as item}
						<article>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Values -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<div class="bg-gold" style="padding: calc(var(--baseline) * 8); max-width: 65ch; margin-left: auto; margin-right: auto;">
				<h2 style="text-align: center;">{t('pages.home.values.title')}</h2>
				<ul>
					{#if data.translations.pages?.home?.values?.items}
						{#each data.translations.pages.home.values.items as item}
							<li style="font-family: var(--font-sans); font-weight: 300; font-size: 1.9em; line-height: 1.15; color: var(--color-graphite-dark);">
								{item}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>

		<!-- Context & Process -->
		<div class="section-divider"></div>
		<div class="grid md:grid-cols-2" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
			<article>
				<h2>{t('pages.home.context.title')}</h2>
				<p>{t('pages.home.context.text')}</p>
			</article>

			<article>
				<h2>{t('pages.home.process.title')}</h2>
				<p>{t('pages.home.process.text')}</p>
			</article>
		</div>

		<!-- Learn More -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12); max-width: 65ch; margin-left: auto; margin-right: auto;">
			<p style="margin-bottom: calc(var(--baseline) * 4); opacity: 0.8;">
				{t('pages.home.learnMoreIntro')}
			</p>
			<div style="text-align: center;">
				<a href={getAboutUrl(data.locale)}>
					<Button color="yellow" size="xl" style="font-family: var(--font-sans); font-weight: 300; color: var(--color-graphite-dark);">
						{t('pages.home.learnMore')}
					</Button>
				</a>
			</div>
		</div>

		<!-- Upcoming Events -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12);">
			<h2 style="margin-top: 0; margin-bottom: calc(var(--baseline) * 1);">{t('pages.home.upcomingEvents')}</h2>
			<p style="max-width: 65ch; margin-bottom: calc(var(--baseline) * 4);">
				{t('pages.home.upcomingEventsIntro')}
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
				<div style="text-align: center; margin-top: calc(var(--baseline) * 8);">
					<a href={getEventsUrl(data.locale)}>
						<Button color="yellow" size="xl" style="font-family: var(--font-sans); font-weight: 300; color: var(--color-graphite-dark);">
							{t('pages.home.viewAllEvents')}
						</Button>
					</a>
				</div>
			{:else}
				<div style="text-align: center; padding: calc(var(--baseline) * 6) 0;">
					<p>{t('common.noUpcomingEvents')}</p>
				</div>
			{/if}
		</div>
	</Container>
</section>
