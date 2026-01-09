<script lang="ts">
	
	import { BarsOutline, CloseOutline } from 'flowbite-svelte-icons';
import { De as FlagDe, Gb as FlagGb, Pl as FlagPl, Ua as FlagUa } from 'svelte-flag-icons';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import logoMini from '$lib/assets/logo_mini.svg';
	import Container from '$lib/components/Container.svelte';
	import { getLocaleFromPath, getTranslation, getTranslations } from '$lib/i18n';
	import { deLocalizeHref, locales, localizeHref, setLocale } from '$lib/paraglide/runtime';

	let translations = $state<Record<string, any>>({});
	let mobileMenuOpen = $state(false);

	$effect(() => {
		const locale = getLocaleFromPath(page.url.pathname);
		loadData(locale);
	});

	async function loadData(locale: 'pl' | 'en' | 'de') {
		translations = await getTranslations(locale);
	}

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function getLocalizedPath(route: string): string {
		const currentLocale = getLocaleFromPath(page.url.pathname);
		return localizeHref(route, { locale: currentLocale as 'pl' | 'uk' | 'en' | 'de' });
	}

	function isActive(path: string): boolean {
		return page.url.pathname === getLocalizedPath(path);
	}

	async function switchLanguage(newLocale: 'pl' | 'uk' | 'en' | 'de') {
		const currentPath = page.url.pathname;
		const currentLocale = getLocaleFromPath(currentPath);

		// Replace current locale with new locale in path
		let newPath: string;
		if (currentPath.startsWith(`/${currentLocale}/`)) {
			// Path like /pl/about -> /uk/about
			newPath = currentPath.replace(`/${currentLocale}/`, `/${newLocale}/`);
		} else if (currentPath === `/${currentLocale}` || currentPath === `/${currentLocale}/`) {
			// Path like /pl or /pl/ -> /uk
			newPath = `/${newLocale}`;
		} else {
			// Fallback to home page with new locale
			newPath = `/${newLocale}`;
		}

		setLocale(newLocale);
		await goto(newPath);
	}

	const currentLocale = $derived(getLocaleFromPath(page.url.pathname));
	const isMobile = $derived(() => {
		if (!browser) return false;
		return window.matchMedia('(max-width: 768px)').matches;
	});

	$effect(() => {
		if (!browser) return;
		document.body.classList.toggle('menu-open', mobileMenuOpen);
	});
</script>

<header class="border-b border-graphite sticky top-0 z-50" style="background-color: rgba(250, 250, 250, 0.95); backdrop-filter: blur(8px);">
	<Container>
		<nav class="flex items-center justify-between py-3 relative">
			<a href={getLocalizedPath('/')} class="flex items-center" aria-label="Lux Artis - Strona główna">
				<img
					src={logoMini}
					alt="Lux Artis"
					class="h-10 w-auto"
					width="40"
					height="40"
				/>
			</a>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden p-2"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle menu"
				aria-haspopup="true"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu-overlay"
			>
				{#if mobileMenuOpen}
					<CloseOutline class="w-6 h-6" style="color: var(--color-graphite);" />
				{:else}
					<BarsOutline class="w-6 h-6" style="color: var(--color-graphite);" />
				{/if}
			</button>

			<!-- Desktop menu -->
			<ul class="hidden md:flex items-center" style="gap: calc(var(--baseline) * 0.5); list-style: none; margin: 0; padding: 0;">
				<li>
					<a
						href={getLocalizedPath('/')}
						class="nav-link"
						class:active={isActive('/')}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href={getLocalizedPath('/about')}
						class="nav-link"
						class:active={isActive('/about')}
					>
						{t('nav.about')}
					</a>
				</li>
				<li>
					<a
						href={getLocalizedPath('/events')}
						class="nav-link"
						class:active={isActive('/events')}
					>
						{t('nav.events')}
					</a>
				</li>
				<li>
					<a
						href={getLocalizedPath('/people')}
						class="nav-link"
						class:active={isActive('/people')}
					>
						{t('nav.people')}
					</a>
				</li>
				<li>
					<a
						href={getLocalizedPath('/support')}
						class="nav-link"
						class:active={isActive('/support')}
					>
						{t('nav.support')}
					</a>
				</li>
				<li>
					<a
						href={getLocalizedPath('/contact')}
						class="nav-link"
						class:active={isActive('/contact')}
					>
						{t('nav.contact')}
					</a>
				</li>
				<li class="language-switcher">
					<button
						onclick={() => switchLanguage('pl')}
						class="lang-flag"
						class:active={currentLocale === 'pl'}
						class:inactive={currentLocale !== 'pl'}
						aria-label="Polski"
					>
						<FlagPl class="w-full h-full" />
					</button>
					<button
						onclick={() => switchLanguage('en')}
						class="lang-flag"
						class:active={currentLocale === 'en'}
						class:inactive={currentLocale !== 'en'}
						aria-label="English"
					>
						<FlagGb class="w-full h-full" />
					</button>
					<button
						onclick={() => switchLanguage('de')}
						class="lang-flag"
						class:active={currentLocale === 'de'}
						class:inactive={currentLocale !== 'de'}
						aria-label="Deutsch"
					>
						<FlagDe class="w-full h-full" />
					</button>
					<button
						onclick={() => switchLanguage('uk')}
						class="lang-flag"
						class:active={currentLocale === 'uk'}
						class:inactive={currentLocale !== 'uk'}
						aria-label="Українська"
					>
						<FlagUa class="w-full h-full" />
					</button>
				</li>
			</ul>

			<!-- Mobile full-screen overlay menu -->
			{#if mobileMenuOpen}
				<div
					id="mobile-menu-overlay"
					class="md:hidden mobile-menu-overlay"
					role="dialog"
					aria-modal="true"
					onclick={() => (mobileMenuOpen = false)}
				>
					<div
						class="mobile-menu-panel"
						onclick={(event) => event.stopPropagation()}
					>
						<Container>
							<ul class="mobile-menu-list">
								<li>
									<a
										href={getLocalizedPath('/')}
										class="mobile-menu-link"
										class:active={isActive('/')}
										onclick={() => (mobileMenuOpen = false)}
									>
										Home
									</a>
								</li>
								<li>
									<a
										href={getLocalizedPath('/about')}
										class="mobile-menu-link"
										class:active={isActive('/about')}
										onclick={() => (mobileMenuOpen = false)}
									>
										{t('nav.about')}
									</a>
								</li>
								<li>
									<a
										href={getLocalizedPath('/events')}
										class="mobile-menu-link"
										class:active={isActive('/events')}
										onclick={() => (mobileMenuOpen = false)}
									>
										{t('nav.events')}
									</a>
								</li>
								<li>
									<a
										href={getLocalizedPath('/people')}
										class="mobile-menu-link"
										class:active={isActive('/people')}
										onclick={() => (mobileMenuOpen = false)}
									>
										{t('nav.people')}
									</a>
								</li>
								<li>
									<a
										href={getLocalizedPath('/support')}
										class="mobile-menu-link"
										class:active={isActive('/support')}
										onclick={() => (mobileMenuOpen = false)}
									>
										{t('nav.support')}
									</a>
								</li>
								<li>
									<a
										href={getLocalizedPath('/contact')}
										class="mobile-menu-link"
										class:active={isActive('/contact')}
										onclick={() => (mobileMenuOpen = false)}
									>
										{t('nav.contact')}
									</a>
								</li>
							</ul>

							<div class="mobile-menu-languages">
								<div class="language-switcher mobile-language-switcher">
									<button
										onclick={() => switchLanguage('pl')}
										class="lang-flag"
										class:active={currentLocale === 'pl'}
										class:inactive={currentLocale !== 'pl'}
										aria-label="Polski"
									>
										<FlagPl class="w-full h-full" />
									</button>
									<button
										onclick={() => switchLanguage('en')}
										class="lang-flag"
										class:active={currentLocale === 'en'}
										class:inactive={currentLocale !== 'en'}
										aria-label="English"
									>
										<FlagGb class="w-full h-full" />
									</button>
									<button
										onclick={() => switchLanguage('de')}
										class="lang-flag"
										class:active={currentLocale === 'de'}
										class:inactive={currentLocale !== 'de'}
										aria-label="Deutsch"
									>
										<FlagDe class="w-full h-full" />
									</button>
									<button
										onclick={() => switchLanguage('uk')}
										class="lang-flag"
										class:active={currentLocale === 'uk'}
										class:inactive={currentLocale !== 'uk'}
										aria-label="Українська"
									>
										<FlagUa class="w-full h-full" />
									</button>
								</div>
							</div>
						</Container>
					</div>
				</div>
			{/if}
		</nav>
	</Container>
</header>
