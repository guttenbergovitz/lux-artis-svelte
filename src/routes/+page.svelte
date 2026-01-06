<script lang="ts">
	import { Button, Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid, CalendarMonthOutline, UsersGroupOutline, LinkOutline, CheckCircleOutline, LightbulbSolid, ClipboardListSolid } from 'flowbite-svelte-icons';
	import Container from '$lib/components/Container.svelte';
	import HeroBanner3D from '$lib/components/HeroBanner3D.svelte';
	import WordTooltip from '$lib/components/WordTooltip.svelte';
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import lucasExposure from '$lib/assets/deco/lucas-exposure.png';

	let { data }: { data: any } = $props();

	const wordDefinitions: Record<string, string> = {
		'Proces': 'Świadome podejście do tworzenia sztuki jako ciągłej drogi transformacji i rozwoju.',
		'Obecność': 'Pełne zaangażowanie w teraźniejszość, autentyczność i uważność w artystycznej ekspresji.',
		'Dialog': 'Otwarta wymiana między artystą, dziełem i odbiorcą, budująca głębsze połączenia.'
	};

	onMount(async () => {
		if (!browser) return;

		const gsap = (await import('gsap')).default;
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);
		gsap.utils.toArray('.reveal-section').forEach((section: any) => {
			gsap.from(section, {
				opacity: 0,
				y: 100,
				duration: 1.2,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					end: 'top 20%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		gsap.utils.toArray('.stagger-item').forEach((item: any) => {
			gsap.from(item, {
				opacity: 0,
				y: 50,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: item,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		const leadWords = document.querySelectorAll('.lead-word');
		leadWords.forEach((word, index) => {
			gsap.from(word, {
				opacity: 0,
				rotateX: -90,
				y: 50,
				duration: 1,
				delay: index * 0.2,
				ease: 'back.out(1.7)',
				scrollTrigger: {
					trigger: '.lead-words',
					start: 'top 70%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		const heroTitle = document.querySelector('.hero-words-section h1');
		const heroIntro = document.querySelector('.lead-intro');
		const leadWordsContainer = document.querySelector('.lead-words');

		if (heroTitle && heroIntro && leadWordsContainer) {
			gsap.to([heroTitle, heroIntro], {
				opacity: 0,
				y: -400,
				scrollTrigger: {
					trigger: '.hero-words-section',
					start: 'top top',
					end: 'top -80%',
					scrub: 1
				}
			});

			gsap.to(leadWordsContainer, {
				y: -400,
				scrollTrigger: {
					trigger: '.hero-words-section',
					start: 'top top',
					end: 'top -80%',
					scrub: 1,
					onComplete: () => {
						if (leadWordsContainer instanceof HTMLElement) {
							leadWordsContainer.style.position = 'sticky';
							leadWordsContainer.style.top = '50%';
							leadWordsContainer.style.transform = 'translateY(-50%)';
						}
					}
				}
			});

			gsap.fromTo(leadWordsContainer,
				{ filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,248,220,0))' },
				{
					filter: 'brightness(5) drop-shadow(0 0 40px rgba(255,248,220,0.8))',
					yoyo: true,
					repeat: 1,
					duration: 0.8,
					scrollTrigger: {
						trigger: '.hero-words-section',
						start: 'top -80%',
						end: 'top -150%',
						scrub: 1
					}
				}
			);
		}

		const lucasImage = document.querySelector('.lucas-parallax-image');
		if (lucasImage) {
			gsap.fromTo(lucasImage,
				{ opacity: 0, y: 0 },
				{
					opacity: 0.6,
					y: -200,
					scrollTrigger: {
						trigger: '.hero-words-section',
						start: 'top 80%',
						end: 'bottom top',
						scrub: 1,
						toggleActions: 'play none none reverse'
					}
				}
			);
		}

		ScrollTrigger.create({
			trigger: '.hero-words-section',
			start: 'top top',
			end: 'bottom top',
			pin: true,
			pinSpacing: false
		});

		ScrollTrigger.create({
			trigger: '.mission-section',
			start: 'top top',
			end: 'bottom top',
			pin: true,
			pinSpacing: false
		});

		const focusItems = document.querySelectorAll('.focus-item');
		focusItems.forEach((item, index) => {
			gsap.from(item, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: item,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		const valuesBox = document.querySelector('.values-box');
		if (valuesBox) {
			gsap.from(valuesBox, {
				y: 20,
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: valuesBox,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		}


		const eventItems = document.querySelectorAll('.event-item');
		eventItems.forEach((item, index) => {
			gsap.from(item, {
				opacity: 0,
				y: 20,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: item,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		if (browser) {
			const missionSection = document.querySelector('.mission-section');
			const goldLight = document.querySelector('.gold-light-effect');

			if (missionSection && goldLight) {
				let currentX = 50;
				let currentY = 50;

				missionSection.addEventListener('mousemove', (e: Event) => {
					const mouseEvent = e as MouseEvent;
					const rect = missionSection.getBoundingClientRect();
					const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
					const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;

					currentX = x;
					currentY = y;

					gsap.to(goldLight, {
						'--light-x': `${x}%`,
						'--light-y': `${y}%`,
						duration: 1.2,
						ease: 'power1.out'
					});
				});

				const sparkles = [
					{ offset: { x: 120, y: 60 }, duration: 2.5, delay: 0 },
					{ offset: { x: -100, y: 90 }, duration: 3.2, delay: 0.5 },
					{ offset: { x: 80, y: -80 }, duration: 2.8, delay: 1.0 },
					{ offset: { x: -70, y: -100 }, duration: 3.5, delay: 1.5 },
					{ offset: { x: 130, y: -50 }, duration: 2.2, delay: 0.8 }
				];

				sparkles.forEach((sparkle, index) => {
					const sparkleVars = {
						[`--sparkle-${index + 1}-x`]: currentX,
						[`--sparkle-${index + 1}-y`]: currentY
					};

					gsap.to(goldLight, {
						...sparkleVars,
						duration: sparkle.duration,
						ease: 'sine.inOut',
						delay: sparkle.delay,
						repeat: -1,
						yoyo: true,
						onUpdate: function() {
							const progress = this.progress();
							const angle = progress * Math.PI * 2;
							const offsetX = Math.cos(angle + sparkle.delay) * sparkle.offset.x;
							const offsetY = Math.sin(angle + sparkle.delay) * sparkle.offset.y;

							gsap.set(goldLight, {
								[`--sparkle-${index + 1}-x`]: `calc(${currentX}% + ${offsetX}px)`,
								[`--sparkle-${index + 1}-y`]: `calc(${currentY}% + ${offsetY}px)`
							});
						}
					});
				});
			}
		}
	});

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

<style>
	.hero-words-section {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		z-index: 1;
		overflow: hidden;
	}

	.lucas-parallax-image {
		position: absolute;
		top: 0;
		left: 0;
		width: auto;
		height: auto;
		max-width: 60%;
		opacity: 0;
		z-index: -1;
		pointer-events: none;
	}

	.mission-section {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-gold);
		z-index: 2;
		padding-top: calc(var(--baseline) * 8);
		padding-bottom: calc(var(--baseline) * 8);
		overflow: hidden;
	}

	.gold-light-effect {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		--light-x: 50%;
		--light-y: 50%;
		--sparkle-1-x: 50%;
		--sparkle-1-y: 50%;
		--sparkle-2-x: 50%;
		--sparkle-2-y: 50%;
		--sparkle-3-x: 50%;
		--sparkle-3-y: 50%;
		--sparkle-4-x: 50%;
		--sparkle-4-y: 50%;
		--sparkle-5-x: 50%;
		--sparkle-5-y: 50%;
	}

	.gold-light-effect::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background:
			radial-gradient(
				circle 220px at var(--sparkle-1-x, 50%) var(--sparkle-1-y, 50%),
				rgba(255, 255, 255, 0.7) 0%,
				rgba(255, 248, 220, 0.45) 22%,
				transparent 60%
			),
			radial-gradient(
				circle 200px at var(--sparkle-2-x, 50%) var(--sparkle-2-y, 50%),
				rgba(255, 255, 255, 0.65) 0%,
				rgba(255, 248, 220, 0.42) 24%,
				transparent 62%
			),
			radial-gradient(
				circle 210px at var(--sparkle-3-x, 50%) var(--sparkle-3-y, 50%),
				rgba(255, 255, 255, 0.68) 0%,
				rgba(255, 248, 220, 0.44) 23%,
				transparent 61%
			),
			radial-gradient(
				circle 205px at var(--sparkle-4-x, 50%) var(--sparkle-4-y, 50%),
				rgba(255, 255, 255, 0.66) 0%,
				rgba(255, 248, 220, 0.43) 25%,
				transparent 63%
			),
			radial-gradient(
				circle 215px at var(--sparkle-5-x, 50%) var(--sparkle-5-y, 50%),
				rgba(255, 255, 255, 0.67) 0%,
				rgba(255, 248, 220, 0.435) 21%,
				transparent 59%
			);
		mix-blend-mode: soft-light;
		pointer-events: none;
	}

	.gold-light-effect::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background:
			radial-gradient(
				circle 550px at var(--light-x, 50%) var(--light-y, 50%),
				rgba(255, 255, 255, 0.5) 0%,
				rgba(255, 248, 220, 0.3) 32%,
				transparent 62%
			);
		mix-blend-mode: overlay;
		pointer-events: none;
	}

	.mission-section :global(h2),
	.mission-section :global(p) {
		position: relative;
		z-index: 1;
	}

	.focus-heading {
		font-size: 1.8em;
		word-break: break-word;
		hyphens: auto;
	}

	.mission-article,
	.approach-article {
		position: relative;
	}

	.background-icon {
		position: absolute;
		top: 50%;
		right: calc(var(--baseline) * 2);
		transform: translateY(-50%) scale(7);
		z-index: 0;
		pointer-events: none;
	}

	@media (max-width: 768px) {
		.background-icon {
			right: calc(var(--baseline) * 1);
			opacity: 0.8;
		}
	}
</style>

<HeroBanner3D />

<div style="height: 100vh;"></div>

<section class="hero-words-section">
	<img src={lucasExposure} alt="" class="lucas-parallax-image" />
	<Container>
		<div style="text-align: center;">
			<h1>{t('pages.home.title')}</h1>
			{#each [parseSubtitle(t('pages.home.subtitle'))] as { intro, words }}
				<div class="lead-heading">
					<p class="lead-intro">{intro}</p>
					<div class="lead-words">
						{#each words as word, index}
							{#if wordDefinitions[word]}
								<WordTooltip {word} definition={wordDefinitions[word]} {index} />
							{:else}
								<h2 class="lead-word">{word}</h2>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>

<section class="mission-section">
	<div class="gold-light-effect"></div>
	<Container>
		<div class="grid md:grid-cols-2 reveal-section" style="gap: calc(var(--baseline) * 8); position: relative; z-index: 1; align-items: start;">
			<article class="stagger-item mission-article" style="padding: calc(var(--baseline) * 4) 0; position: relative;">
				<div class="background-icon">
					<LightbulbSolid size="lg" style="color: #fff; opacity: 0.15;" />
				</div>
				<h2>{t('pages.home.mission.title')}</h2>
				<p>{t('pages.home.mission.text')}</p>
			</article>

			<article class="stagger-item approach-article" style="padding: calc(var(--baseline) * 4) 0; position: relative;">
				<div class="background-icon">
					<ClipboardListSolid size="lg" style="color: #fff; opacity: 0.15;" />
				</div>
				<h2>{t('pages.home.approach.title')}</h2>
				<p>{t('pages.home.approach.text')}</p>
			</article>
		</div>
	</Container>
</section>

<section class="bg-white" style="position: relative; z-index: 3; padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>

		<!-- Focus Areas -->
		<div class="section-divider"></div>
		<div class="reveal-section" style="margin-bottom: calc(var(--baseline) * 12);">
			<h2 class="focus-title" style="text-align: center; padding-bottom: calc(var(--baseline) * 1.5);">{t('pages.home.focus.title')}</h2>
			<div class="grid md:grid-cols-3" style="gap: calc(var(--baseline) * 6);">
				{#if data.translations.pages?.home?.focus?.items}
					{#each data.translations.pages.home.focus.items as item, index}
						<article class="focus-item focus-item-{index}" style="display: flex; gap: calc(var(--baseline) * 3);">
							<div style="flex-shrink: 0; padding-right: calc(var(--baseline) * 1.5); border-right: 1px solid rgba(51, 51, 51, 0.25);">
								{#if index === 0}
									<CalendarMonthOutline size="xl" style="color: #333; stroke-width: 0.8;" />
								{:else if index === 1}
									<UsersGroupOutline size="xl" style="color: #333; stroke-width: 0.8;" />
								{:else}
									<LinkOutline size="xl" style="color: #333; stroke-width: 0.8;" />
								{/if}
							</div>
							<div>
								<h3 class="focus-heading">{item.title}</h3>
								<p>{item.text}</p>
							</div>
						</article>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Values -->
		<div class="section-divider"></div>
		<div class="reveal-section values-box" style="margin-bottom: calc(var(--baseline) * 12);">
			<div class="bg-gold" style="padding: calc(var(--baseline) * 8); max-width: 65ch; margin-left: auto; margin-right: auto;">
				<h2 style="text-align: center;">{t('pages.home.values.title')}</h2>
				<ul style="list-style: none; padding: 0; margin: 0;">
					{#if data.translations.pages?.home?.values?.items}
						{#each data.translations.pages.home.values.items as item, index}
							<li style="font-family: var(--font-sans); font-weight: 300; font-size: 1.9em; line-height: 1.15; color: var(--color-graphite-dark); margin-bottom: calc(var(--baseline) * 2); display: flex; align-items: center; gap: calc(var(--baseline) * 2);">
								<CheckCircleOutline size="sm" style="color: #000; opacity: 0.2; flex-shrink: 0; stroke-width: 1;" />
								<span>{item}</span>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>

		<!-- Context & Process -->
		<div class="section-divider"></div>
		<div class="grid md:grid-cols-2 reveal-section" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
			<article class="stagger-item">
				<h2>{t('pages.home.context.title')}</h2>
				<p>{t('pages.home.context.text')}</p>
			</article>

			<article class="stagger-item">
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
						<TimelineItem title={event.title} date={formattedDate} isLast={isLast} class="event-item">
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
