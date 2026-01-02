<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';
	import Container from '$lib/components/Container.svelte';
	import { getLocaleFromPath, getTranslation, getTranslations } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';

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
</script>

<footer class="border-t border-graphite bg-white py-16">
	<Container>
		<div class="grid md:grid-cols-3 gap-12 mb-12">
			<!-- Logo and Description -->
			<div>
				<a href={getLocalizedPath('/')} class="inline-block mb-6" aria-label="Lux Artis - Strona główna">
					<img
						src={logo}
						alt="Lux Artis"
						class="h-20 w-auto"
						width="200"
						height="66"
					/>
				</a>
				<p style="max-width: 65ch;">
					{t('site.description')}
				</p>
			</div>

			<!-- Navigation Links -->
			<div>
				<h4>{t('nav.navigation')}</h4>
				<nav>
					<a
						href={getLocalizedPath('/about')}
						class="footer-nav-link"
					>
						{t('nav.about')}
					</a>
					<a
						href={getLocalizedPath('/events')}
						class="footer-nav-link"
					>
						{t('nav.events')}
					</a>
					<a
						href={getLocalizedPath('/people')}
						class="footer-nav-link"
					>
						{t('nav.people')}
					</a>
					<a
						href={getLocalizedPath('/support')}
						class="footer-nav-link"
					>
						{t('nav.support')}
					</a>
				</nav>
			</div>

			<!-- Legal Links -->
			<div>
				<h4>{t('nav.legal')}</h4>
				<nav>
					<a
						href={getLocalizedPath('/contact')}
						class="footer-nav-link"
					>
						{t('nav.contact')}
					</a>
					<a
						href={getLocalizedPath('/legal')}
						class="footer-nav-link"
					>
						{t('nav.legal')}
					</a>
				</nav>
			</div>
		</div>

	</Container>
	<div class="border-t border-graphite" style="padding-top: calc(var(--baseline) * 4); padding-bottom: calc(var(--baseline) * 4);">
		<div class="footer-copyright">
			<p>
				© {new Date().getFullYear()} {t('site.title')}
			</p>
		</div>
	</div>
</footer>
