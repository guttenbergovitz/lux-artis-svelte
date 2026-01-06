<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';
	import logoLight from '$lib/assets/logo_black.svg';
	import backgroundTexture from '$lib/assets/plain-backdrop-decorative-gray-textured.jpg';
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

<footer class="dark-footer">
	<Container>
		<div class="grid md:grid-cols-3 gap-12 mb-12">
			<div>
				<a href={getLocalizedPath('/')} class="inline-block mb-6" aria-label="Lux Artis - Strona główna">
					<img
						src={logoLight}
						alt="Lux Artis"
						class="h-20 w-auto logo-light"
						width="200"
						height="66"
					/>
				</a>
				<p class="footer-text" style="max-width: 65ch;">
					{t('site.description')}
				</p>
			</div>

			<div>
				<h4 class="footer-heading">{t('nav.navigation')}</h4>
				<nav>
					<a href={getLocalizedPath('/about')} class="footer-nav-link">
						{t('nav.about')}
					</a>
					<a href={getLocalizedPath('/events')} class="footer-nav-link">
						{t('nav.events')}
					</a>
					<a href={getLocalizedPath('/people')} class="footer-nav-link">
						{t('nav.people')}
					</a>
					<a href={getLocalizedPath('/support')} class="footer-nav-link">
						{t('nav.support')}
					</a>
				</nav>
			</div>

			<div>
				<h4 class="footer-heading">{t('nav.legal')}</h4>
				<nav>
					<a href={getLocalizedPath('/contact')} class="footer-nav-link">
						{t('nav.contact')}
					</a>
					<a href={getLocalizedPath('/legal')} class="footer-nav-link">
						{t('nav.legal')}
					</a>
				</nav>
			</div>
		</div>
	</Container>
	<div class="footer-bottom">
		<div class="footer-copyright">
			<p>
				© {new Date().getFullYear()} {t('site.title')}
			</p>
		</div>
	</div>
</footer>

<style>
	.dark-footer {
		position: relative;
		background-color: var(--color-graphite-dark);
		background-image: url('$lib/assets/plain-backdrop-decorative-gray-textured.jpg');
		background-size: cover;
		background-position: center;
		padding: calc(var(--baseline) * 16) 0;
	}

	.dark-footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(26, 26, 26, 0.85);
		pointer-events: none;
	}

	.dark-footer > :global(*) {
		position: relative;
		z-index: 1;
	}

	.logo-light {
		filter: brightness(0) invert(1);
	}

	.footer-text {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
	}

	.footer-heading {
		color: var(--color-gold);
		margin-bottom: calc(var(--baseline) * 2);
	}

	:global(.footer-nav-link) {
		display: block;
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		padding: calc(var(--baseline) * 1) 0;
		transition: color 0.2s;
	}

	:global(.footer-nav-link:hover) {
		color: var(--color-gold);
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: calc(var(--baseline) * 4);
		margin-top: calc(var(--baseline) * 4);
	}

	:global(.footer-copyright),
	:global(.footer-copyright p) {
		text-align: center;
		color: rgba(255, 255, 255, 0.6);
	}
</style>
