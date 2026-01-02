<script lang="ts">
	
	import { BarsOutline, CloseOutline } from 'flowbite-svelte-icons';
import { De as FlagDe, Gb as FlagGb, Pl as FlagPl } from 'svelte-flag-icons';
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
		return localizeHref(route, { locale: currentLocale as 'pl' | 'en' | 'de' });
	}

	function isActive(path: string): boolean {
		return page.url.pathname === getLocalizedPath(path);
	}

	async function switchLanguage(newLocale: 'pl' | 'en' | 'de') {
		const currentPath = page.url.pathname;
		const basePath = deLocalizeHref(currentPath) || '/';
		const newPath = localizeHref(basePath, { locale: newLocale });
		setLocale(newLocale);
		await goto(newPath);
	}

	const currentLocale = $derived(getLocaleFromPath(page.url.pathname));
</script>

<header class="border-b border-graphite bg-white sticky top-0 z-50">
	<Container>
		<nav class="flex items-center justify-between py-3 relative">
			<a href={getLocalizedPath('/')} class="flex items-center" aria-label="Lux Artis - Strona główna">
				<img
					src={logoMini}
					alt="Lux Artis"
					class="h-12 w-auto"
					width="48"
					height="48"
				/>
			</a>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="md:hidden p-2"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
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
				</li>
			</ul>

			<!-- Mobile menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden absolute top-full left-0 right-0 bg-white border-b border-graphite" style="z-index: 40;">
					<Container>
						<ul class="flex flex-col py-4" style="gap: calc(var(--baseline) * 1); list-style: none; margin: 0; padding: 0;">
							<li>
								<a
									href={getLocalizedPath('/')}
									class="nav-link"
									class:active={isActive('/')}
									onclick={() => (mobileMenuOpen = false)}
								>
									Home
								</a>
							</li>
							<li>
								<a
									href={getLocalizedPath('/about')}
									class="nav-link"
									class:active={isActive('/about')}
									onclick={() => (mobileMenuOpen = false)}
								>
									{t('nav.about')}
								</a>
							</li>
							<li>
								<a
									href={getLocalizedPath('/events')}
									class="nav-link"
									class:active={isActive('/events')}
									onclick={() => (mobileMenuOpen = false)}
								>
									{t('nav.events')}
								</a>
							</li>
							<li>
								<a
									href={getLocalizedPath('/people')}
									class="nav-link"
									class:active={isActive('/people')}
									onclick={() => (mobileMenuOpen = false)}
								>
									{t('nav.people')}
								</a>
							</li>
							<li>
								<a
									href={getLocalizedPath('/support')}
									class="nav-link"
									class:active={isActive('/support')}
									onclick={() => (mobileMenuOpen = false)}
								>
									{t('nav.support')}
								</a>
							</li>
							<li>
								<a
									href={getLocalizedPath('/contact')}
									class="nav-link"
									class:active={isActive('/contact')}
									onclick={() => (mobileMenuOpen = false)}
								>
									{t('nav.contact')}
								</a>
							</li>
							<li style="margin-top: calc(var(--baseline) * 2);">
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
								</div>
							</li>
						</ul>
					</Container>
				</div>
			{/if}
		</nav>
	</Container>
</header>
