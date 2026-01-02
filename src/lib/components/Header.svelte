<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { getLocaleFromPath, getTranslations, getTranslation } from '$lib/i18n';
	import { localizeHref, deLocalizeHref, locales, setLocale } from '$lib/paraglide/runtime';

	let translations = $state<any>({});

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
		// Delocalize current path to get base pattern (e.g., /pl/o-nas -> /about)
		const basePath = deLocalizeHref(currentPath) || '/';
		// Localize base path for new locale (e.g., /about -> /en/about)
		const newPath = localizeHref(basePath, { locale: newLocale });
		setLocale(newLocale);
		await goto(newPath);
	}
</script>

<header>
	<nav class="bg-white border-b border-gray-200">
		<div class="container">
			<ul class="flex items-center py-4 text-gray-700">
				<li class="mr-8">
					<a href={getLocalizedPath('/')} aria-label="Lux Artis - Strona główna">
						<img
							src="/images/logo_mini.svg"
							alt="Lux Artis"
							width="40"
							height="40"
							class="w-10 h-10"
						/>
					</a>
				</li>
				<li class={`border-b-2 ${isActive('/') ? 'border-gray-900' : 'border-transparent hover:border-gray-400'} mx-4`}>
					<a href={getLocalizedPath('/')} class="hover:text-black">{t('nav.home')}</a>
				</li>
				<li class={`border-b-2 ${isActive('/about') ? 'border-gray-900' : 'border-transparent hover:border-gray-400'} mx-4`}>
					<a href={getLocalizedPath('/about')} class="hover:text-black">{t('nav.about')}</a>
				</li>
				<li class={`border-b-2 ${isActive('/events') ? 'border-gray-900' : 'border-transparent hover:border-gray-400'} mx-4`}>
					<a href={getLocalizedPath('/events')} class="hover:text-black">{t('nav.events')}</a>
				</li>
				<li class={`border-b-2 ${isActive('/people') ? 'border-gray-900' : 'border-transparent hover:border-gray-400'} mx-4`}>
					<a href={getLocalizedPath('/people')} class="hover:text-black">{t('nav.people')}</a>
				</li>
				<li class={`border-b-2 ${isActive('/support') ? 'border-gray-900' : 'border-transparent hover:border-gray-400'} mx-4`}>
					<a href={getLocalizedPath('/support')} class="hover:text-black">{t('nav.support')}</a>
				</li>
				<li class={`border-b-2 ${isActive('/contact') ? 'border-gray-900' : 'border-transparent hover:border-gray-400'} mx-4`}>
					<a href={getLocalizedPath('/contact')} class="hover:text-black">{t('nav.contact')}</a>
				</li>
				<li class="ml-auto flex gap-2">
					{#each locales as lang}
						{@const currentLocale = getLocaleFromPath(page.url.pathname)}
						<button
							onclick={() => switchLanguage(lang)}
							class={`px-3 py-1 text-sm uppercase ${
								currentLocale === lang
									? 'text-black font-semibold border-b-2 border-gray-900'
									: 'text-gray-500 hover:text-gray-900'
							}`}
						>
							{lang}
						</button>
					{/each}
				</li>
			</ul>
		</div>
	</nav>
</header>

