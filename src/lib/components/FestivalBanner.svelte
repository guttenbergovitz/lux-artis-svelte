<script lang="ts">
	import { page } from '$app/state';
	import { getTranslation } from '$lib/i18n';

	interface Props {
		translations: Record<string, unknown>;
	}

	let { translations }: Props = $props();
	let isVisible = $derived(!page.url.pathname.includes('/venus-rising'));

	function t(path: string): string {
		return getTranslation(translations, path);
	}
</script>

{#if isVisible}
	<a
		href="/venus-rising"
		class="festival-banner"
		aria-label={t('common.festivalBanner.ariaLabel')}
	>
		<span class="festival-banner-name">Venus Rising Festival</span>
		<span class="festival-banner-separator" aria-hidden="true">·</span>
		<span class="festival-banner-date">{t('common.festivalBanner.date')}</span>
		<span class="festival-banner-separator" aria-hidden="true">·</span>
		<span class="festival-banner-slogan">{t('common.festivalBanner.slogan')}</span>
		<span class="festival-banner-arrow" aria-hidden="true">→</span>
	</a>
{/if}

<style>
	.festival-banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6em;
		padding: 0.55em 1em;
		background: rgba(12, 0, 23, 0.92);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-top: 1px solid rgba(205, 114, 89, 0.25);
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(0.65rem, 1.2vw, 0.82rem);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: #f3b05a;
		text-decoration: none;
		transition: background 0.3s ease, color 0.3s ease;
		white-space: nowrap;
	}

	.festival-banner:hover {
		background: rgba(12, 0, 23, 0.98);
		color: #cd7259;
	}

	.festival-banner-separator {
		opacity: 0.4;
	}

	.festival-banner-arrow {
		opacity: 0.6;
		transition: transform 0.3s ease, opacity 0.3s ease;
	}

	.festival-banner:hover .festival-banner-arrow {
		transform: translateX(3px);
		opacity: 1;
	}

	@media (max-width: 640px) {
		.festival-banner {
			gap: 0.4em;
			padding: 0.5em 0.75em;
			letter-spacing: 0.12em;
		}

		.festival-banner-name {
			display: none;
		}
	}
</style>
