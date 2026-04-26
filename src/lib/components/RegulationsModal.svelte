<script lang="ts">
	import { browser } from '$app/environment';
	import { getTranslation } from '$lib/i18n';
	import { fade, fly } from 'svelte/transition';

	interface Props {
		translations: Record<string, unknown>;
	}

	let { translations }: Props = $props();
	let isOpen = $state(false);

	let regulations = $derived((translations?.pages as any)?.venusRising?.regulations as any);

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function open() {
		isOpen = true;
		if (browser) document.body.style.overflow = 'hidden';
	}

	function close() {
		isOpen = false;
		if (browser) document.body.style.overflow = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<button type="button" class="regulations-btn" onclick={open}>
	<svg class="regulations-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
		<polyline points="14 2 14 8 20 8"/>
		<line x1="12" y1="18" x2="12" y2="12"/>
		<polyline points="9 15 12 18 15 15"/>
	</svg>
	{t('pages.venusRising.regulationsLabel')}
</button>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="modal-backdrop" onclick={close} transition:fade={{ duration: 200 }}>
		<div
			class="modal-content"
			onclick={(e) => e.stopPropagation()}
			transition:fly={{ y: 30, duration: 300 }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="regulations-title"
			tabindex="-1"
		>
			<div class="modal-header">
				<h2 id="regulations-title">{regulations?.title ?? ''}</h2>
				<button type="button" class="modal-close" onclick={close} aria-label={regulations?.close ?? 'Close'}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="18" y1="6" x2="6" y2="18"/>
						<line x1="6" y1="6" x2="18" y2="18"/>
					</svg>
				</button>
			</div>
			<div class="modal-body">
				{#if regulations?.subtitle}
					<p class="modal-subtitle">{@html regulations.subtitle.replace(/\n/g, '<br>')}</p>
				{/if}
				{#if regulations?.sections}
					{#each regulations.sections as section}
						<div class="reg-section">
							<h3>{section.title}</h3>
							{#if section.points}
								<ul>
									{#each section.points as point}
										<li>{point}</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.regulations-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(0.75rem, 1.5vw, 0.85rem);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #cd7259;
		text-decoration: none;
		border: 1px solid rgba(205, 114, 89, 0.35);
		padding: 0.55em 1.2em;
		background: transparent;
		cursor: pointer;
		transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
	}

	.regulations-btn:hover {
		color: #f3b05a;
		border-color: rgba(243, 176, 90, 0.5);
		background: rgba(243, 176, 90, 0.05);
	}

	.regulations-icon {
		width: 1em;
		height: 1em;
		flex-shrink: 0;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-md);
		background: rgba(12, 0, 23, 0.85);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}

	.modal-content {
		width: 100%;
		max-width: 720px;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #0c0017 0%, #1a0a2e 100%);
		border: 1px solid rgba(205, 114, 89, 0.25);
		border-radius: 4px;
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		border-bottom: 1px solid rgba(205, 114, 89, 0.2);
		flex-shrink: 0;
	}

	.modal-header h2 {
		font-family: 'Lato', var(--font-sans);
		font-weight: 300;
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: #f3b05a;
		margin: 0;
		line-height: 1.3;
	}

	.modal-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: transparent;
		border: 1px solid rgba(205, 114, 89, 0.3);
		color: #cd7259;
		cursor: pointer;
		transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
		flex-shrink: 0;
	}

	.modal-close:hover {
		color: #f3b05a;
		border-color: rgba(243, 176, 90, 0.5);
		background: rgba(243, 176, 90, 0.08);
	}

	.modal-close svg {
		width: 18px;
		height: 18px;
	}

	.modal-body {
		padding: var(--space-md) var(--space-lg) var(--space-lg);
		overflow-y: auto;
		flex: 1;
	}

	.modal-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(0.85rem, 1.6vw, 0.95rem);
		line-height: 1.6;
		color: rgba(249, 248, 113, 0.7);
		margin: 0 0 var(--space-md);
	}

	.reg-section {
		margin-bottom: var(--space-md);
	}

	.reg-section:last-child {
		margin-bottom: 0;
	}

	.reg-section h3 {
		font-family: 'Lato', var(--font-sans);
		font-weight: 400;
		font-size: clamp(0.8rem, 1.8vw, 0.9rem);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #cd7259;
		margin: 0 0 var(--space-xs);
	}

	.reg-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.reg-section li {
		font-family: var(--font-serif);
		font-size: clamp(0.8rem, 1.6vw, 0.9rem);
		line-height: 1.6;
		color: rgba(243, 176, 90, 0.75);
		padding-left: 1.2em;
		position: relative;
	}

	.reg-section li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 5px;
		height: 5px;
		background: #cd7259;
		border-radius: 50%;
		opacity: 0.6;
	}

	@media (max-width: 640px) {
		.modal-content {
			max-height: 90vh;
		}

		.modal-header,
		.modal-body {
			padding: var(--space-sm) var(--space-md);
		}
	}
</style>
