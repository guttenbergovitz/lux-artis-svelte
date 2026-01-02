<script lang="ts">
	import { page } from '$app/state';
	import { getLocaleFromPath, getTranslations, getTranslation } from '$lib/i18n';
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

<footer class="footer">
	<div class="container">
		<div class="footer-inner">
			<!-- Logo and Description -->
			<div class="footer-section">
				<a href={getLocalizedPath('/')} class="inline-block mb-4">
					<img
						src="/images/logo.svg"
						alt="Lux Artis"
						width="200"
						height="66"
						class="h-16 md:h-20 w-auto opacity-90 transition-opacity hover:opacity-100"
					/>
				</a>
				<p class="text-sm text-muted leading-relaxed max-w-280px">
					{t('site.description')}
				</p>
			</div>

			<!-- Navigation Links -->
			<div class="footer-section">
				<h3 class="footer-title">{t('nav.home')}</h3>
				<nav class="list-items">
					<a href={getLocalizedPath('/about')} class="footer-link">
						{t('nav.about')}
					</a>
					<a href={getLocalizedPath('/events')} class="footer-link">
						{t('nav.events')}
					</a>
					<a href={getLocalizedPath('/people')} class="footer-link">
						{t('nav.people')}
					</a>
					<a href={getLocalizedPath('/support')} class="footer-link">
						{t('nav.support')}
					</a>
				</nav>
			</div>

			<!-- Legal Links -->
			<div class="footer-section">
				<h3 class="footer-title">{t('nav.legal')}</h3>
				<nav class="list-items">
					<a href={getLocalizedPath('/contact')} class="footer-link">
						{t('nav.contact')}
					</a>
					<a href={getLocalizedPath('/legal')} class="footer-link">
						{t('nav.legal')}
					</a>
				</nav>
			</div>
		</div>

		<div class="divider my-6 border-graphite-200" />

		<div class="text-center text-sm text-muted pt-4">
			© {new Date().getFullYear()} {t('site.title')}
		</div>
	</div>
</footer>

