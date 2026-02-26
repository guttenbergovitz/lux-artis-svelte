<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getLocaleFromPath } from '$lib/i18n';
	import { localizeHref, deLocalizeHref, setLocale } from '$lib/paraglide/runtime';
	import Pl from 'svelte-flag-icons/Pl.svelte';
	import Gb from 'svelte-flag-icons/Gb.svelte';
	import De from 'svelte-flag-icons/De.svelte';
	import Ua from 'svelte-flag-icons/Ua.svelte';

	let isExpanded = $state(false);

	// Language configuration with flag components
	const languages = [
		{ 
			code: 'pl', 
			name: 'Polski',
			flag: Pl
		},
		{ 
			code: 'en', 
			name: 'English',
			flag: Gb
		},
		{ 
			code: 'de', 
			name: 'Deutsch',
			flag: De
		},
		{ 
			code: 'uk', 
			name: 'Українська',
			flag: Ua
		}
	];

	// Get current language from URL path
	const currentLang = $derived(getLocaleFromPath($page.url.pathname));

	async function switchLanguage(newLang: string) {
		if (!browser) return;
		
		const currentPath = $page.url.pathname;
		
		// First delocalize to get canonical path (e.g., /pl/o-nas -> /about)
		const canonicalPath = deLocalizeHref(currentPath);
		
		// Then localize to target language (e.g., /about -> /en/about or /de/uber-uns)
		const newPath = localizeHref(canonicalPath, { locale: newLang as any });

		setLocale(newLang as any);
		await goto(newPath);
		isExpanded = false;
	}

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}

	// Close on outside click
	function handleOutsideClick(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.language-switcher')) {
			isExpanded = false;
		}
	}

	$effect(() => {
		if (browser) {
			if (isExpanded) {
				document.addEventListener('click', handleOutsideClick);
			} else {
				document.removeEventListener('click', handleOutsideClick);
			}
			
			return () => {
				document.removeEventListener('click', handleOutsideClick);
			};
		}
	});
</script>

<div class="language-switcher" class:expanded={isExpanded}>
	<!-- Current Language Button -->
	<button 
		class="current-lang" 
		onclick={toggleExpanded}
		aria-label="Switch language"
	>
		{#each languages as lang}
			{#if lang.code === currentLang}
				<div class="flag-container">
					<svelte:component this={lang.flag} />
				</div>
			{/if}
		{/each}
	</button>

	<!-- Language Options -->
	{#if isExpanded}
		<div class="lang-options">
			{#each languages as lang}
				{#if lang.code !== currentLang}
					<button 
						class="lang-option" 
						onclick={() => switchLanguage(lang.code)}
						aria-label="Switch to {lang.name}"
					>
						<div class="flag-container small">
							<svelte:component this={lang.flag} />
						</div>
						<span class="lang-name">{lang.name}</span>
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.language-switcher {
		position: fixed;
		bottom: var(--space-xl);
		right: var(--space-xl);
		z-index: 100;
		font-family: var(--font-sans);
	}

	.current-lang {
		width: 32px;
		height: 24px;
		background: none;
		border: 1px solid var(--color-graphite);
		cursor: pointer;
		transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
		position: relative;
		overflow: hidden;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.current-lang:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.expanded .current-lang {
		border-color: var(--color-gold);
	}

	.flag-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flag-container.small {
		width: 20px;
		height: 15px;
		flex-shrink: 0;
	}

	.flag-container :global(svg) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1px;
	}

	.lang-options {
		position: absolute;
		bottom: 100%;
		right: 0;
		margin-bottom: var(--space-sm);
		background: rgba(250, 250, 250, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid var(--color-graphite);
		min-width: 100px;
		animation: slideUp 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.lang-option {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		background: none;
		border: none;
		cursor: pointer;
		transition: background 200ms ease-out;
		text-align: left;
	}

	.lang-option:hover {
		background: rgba(212, 175, 55, 0.1);
	}

	.lang-option:not(:last-child) {
		border-bottom: 1px solid rgba(44, 44, 44, 0.1);
	}

	.lang-name {
		font-size: 0.875rem;
		font-weight: 400;
		color: var(--color-graphite);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.language-switcher {
			bottom: var(--space-lg);
			right: var(--space-lg);
		}

		.current-lang {
			width: 28px;
			height: 21px;
		}

		.flag-container.small {
			width: 18px;
			height: 13.5px;
		}

		.lang-options {
			min-width: 90px;
		}

		.lang-name {
			font-size: 0.75rem;
		}
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		.current-lang,
		.lang-option {
			transition: none;
		}

		.current-lang:hover {
			transform: none;
		}

		.lang-options {
			animation: none;
		}
	}
</style>