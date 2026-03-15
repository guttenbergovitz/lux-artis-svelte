<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';
	import Container from '$lib/components/Container.svelte';
	import { getLocaleFromPath, getTranslation, getTranslations } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { FacebookSolid, InstagramSolid } from 'flowbite-svelte-icons';

	let { noMarginTop = false, smallLogo = false, variant = 'default' }: { noMarginTop?: boolean; smallLogo?: boolean; variant?: 'default' | 'dark' } = $props();

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

<footer class="modernist-footer" class:no-margin-top={noMarginTop} class:small-logo={smallLogo} class:dark={variant === 'dark'}>
	<Container>
		<div class="footer-composition">
			<!-- Dominant logotype positioned as visual anchor -->
			<div class="logotype-block">
				<img
					src={logo}
					alt="Lux Artis"
					class="institutional-logotype"
					width="280"
					height="93"
				/>
			</div>

			<!-- Asymmetric information block -->
			<div class="info-block">
				<div class="institutional-line">
					<span class="descriptor">{t('site.description')}</span>
				</div>

				<div class="meta-grid">
					<div class="legal-cluster">
						<span class="copyright-mark">© {new Date().getFullYear()}</span>
						<span class="entity-name">Fundacja Lux Artis</span>
					</div>

					<div class="access-links">
						<a href={getLocalizedPath('/contact')} class="access-link">Kontakt</a>
						<a href={getLocalizedPath('/legal')} class="access-link">Informacje prawne</a>
					</div>

					<div class="social-links">
						<span class="social-label">Venus Rising</span>
						<div class="social-icons">
							<a href="https://www.facebook.com/VenusRisingFestival" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
								<FacebookSolid class="w-4 h-4" />
							</a>
							<a href="https://www.instagram.com/venus_rising_festival" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
								<InstagramSolid class="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</footer>

<style>
	.modernist-footer {
		background: var(--color-graphite-dark);
		padding: var(--space-2xl) 0;
		margin-top: calc(var(--space-2xl) * 2);
		position: relative;
	}

	.modernist-footer.no-margin-top {
		margin-top: 0;
	}

	.modernist-footer.dark {
		background: #0C0017;
	}

	.modernist-footer.small-logo .institutional-logotype {
		height: 36px;
	}

	.footer-composition {
		display: grid;
		grid-template-columns: 2fr 3fr;
		grid-template-rows: auto;
		gap: calc(var(--space-2xl) * 1.5);
		align-items: end;
		min-height: 140px;
	}

	.logotype-block {
		/* Positioned as dominant visual element */
		display: flex;
		align-items: flex-end;
	}

	.institutional-logotype {
		height: 72px;
		width: auto;
		opacity: 0.95;
		filter: brightness(0) invert(1);
	}

	.info-block {
		/* Asymmetric positioning, technical precision */
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: var(--space-lg);
		padding-left: var(--space-xl);
		border-left: 1px solid rgba(255, 255, 255, 0.15);
	}

	.institutional-line {
		/* Single line institutional descriptor */
	}

	.descriptor {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.85);
		font-weight: 400;
		letter-spacing: 0.01em;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-md);
		font-family: var(--font-sans);
		font-size: 0.8rem;
		line-height: 1.3;
	}

	.legal-cluster {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.copyright-mark {
		color: rgba(255, 255, 255, 0.5);
		font-weight: 400;
		font-size: 0.75rem;
	}

	.entity-name {
		color: rgba(255, 255, 255, 0.7);
		font-weight: 400;
	}

	.access-links {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: right;
	}

	.access-link {
		color: rgba(255, 255, 255, 0.45);
		text-decoration: none;
		font-weight: 400;
		font-size: 0.75rem;
		transition: color 0.25s ease;
		letter-spacing: 0.02em;
	}

	.access-link:hover {
		color: rgba(255, 255, 255, 0.8);
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 6px;
		text-align: right;
	}

	.social-label {
		font-family: var(--font-sans);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.4);
	}

	.social-icons {
		display: flex;
		gap: var(--space-sm);
		justify-content: flex-end;
	}

	.social-link {
		color: #fff;
		opacity: 0.6;
		transition: opacity 0.25s ease, transform 0.25s ease;
		display: flex;
		align-items: center;
	}

	.social-link:hover {
		opacity: 1;
		transform: scale(1.1);
	}

	.social-link :global(svg) {
		fill: currentColor;
		width: 16px;
		height: 16px;
	}

	/* Responsive: Mobile becomes vertical stack with maintained hierarchy */
	@media (max-width: 768px) {
		.footer-composition {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
			min-height: auto;
		}

		.institutional-logotype {
			height: 56px;
		}

		.info-block {
			padding-left: 0;
			border-left: none;
			border-top: 1px solid rgba(255, 255, 255, 0.15);
			padding-top: var(--space-lg);
		}

		.meta-grid {
			grid-template-columns: 1fr;
			gap: var(--space-md);
		}

		.access-links {
			text-align: left;
			flex-direction: row;
			gap: var(--space-md);
		}

		.social-links {
			text-align: left;
			margin-top: var(--space-sm);
		}

		.social-icons {
			justify-content: flex-start;
		}
	}

	/* Ultra-wide: More dramatic asymmetry */
	@media (min-width: 1400px) {
		.footer-composition {
			grid-template-columns: 1fr 2fr;
			gap: calc(var(--space-2xl) * 2);
		}

		.institutional-logotype {
			height: 84px;
		}

		.info-block {
			padding-left: calc(var(--space-xl) * 1.5);
		}
	}
</style>
