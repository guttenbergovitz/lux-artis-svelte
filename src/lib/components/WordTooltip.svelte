<script lang="ts">
	import { browser } from '$app/environment';

	let { word, definition, index }: { word: string; definition: string; index: number } = $props();

	let isHovered = $state(false);
	let showTooltip = $state(false);
	let lineRef: SVGLineElement | undefined = $state();
	let circleRef: SVGCircleElement | undefined = $state();
	let tooltipRef: HTMLDivElement | undefined = $state();

	const isRight = index % 2 === 0;

	async function handleMouseEnter() {
		if (!browser) return;
		isHovered = true;
		showTooltip = false;

		setTimeout(async () => {
			if (lineRef && circleRef) {
				const gsap = (await import('gsap')).default;
				const lineLength = lineRef.getTotalLength();

				const tl = gsap.timeline();

				tl.fromTo(
					lineRef,
					{ strokeDasharray: lineLength, strokeDashoffset: lineLength },
					{ strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }
				)
				.fromTo(
					circleRef,
					{ scale: 0, transformOrigin: 'center' },
					{ scale: 1, duration: 0.25, ease: 'power2.out' },
					'-=0.1'
				)
				.call(() => {
					showTooltip = true;

					setTimeout(() => {
						if (tooltipRef) {
							const origin = isRight ? 'left center' : 'right center';
							gsap.fromTo(
								tooltipRef,
								{
									scale: 0.8,
									opacity: 0,
									transformOrigin: origin
								},
								{
									scale: 1,
									opacity: 1,
									duration: 0.4,
									ease: 'power2.out'
								}
							);
						}
					}, 10);
				});
			}
		}, 50);
	}

	function handleMouseLeave() {
		isHovered = false;
		showTooltip = false;
	}
</script>

<span class="word-wrapper" onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave}>
	<h2 class="lead-word interactive">{word}</h2>
	{#if isHovered}
		<svg
			class="connection-line"
			class:left={!isRight}
			class:right={isRight}
			width="250"
			height="50"
			style="position: absolute; pointer-events: none;"
		>
			{#if isRight}
				<line bind:this={lineRef} x1="0" y1="25" x2="200" y2="25" stroke="var(--color-gold)" stroke-width="2" />
				<circle bind:this={circleRef} cx="200" cy="25" r="5" fill="var(--color-gold)" />
			{:else}
				<line bind:this={lineRef} x1="250" y1="25" x2="50" y2="25" stroke="var(--color-gold)" stroke-width="2" />
				<circle bind:this={circleRef} cx="50" cy="25" r="5" fill="var(--color-gold)" />
			{/if}
		</svg>
		{#if showTooltip}
			<div
				bind:this={tooltipRef}
				class="word-definition"
				class:left={!isRight}
				class:right={isRight}
			>
				{definition}
			</div>
		{/if}
	{/if}
</span>

<style>
	.word-wrapper {
		position: relative;
		display: inline-block;
	}

	.interactive {
		cursor: help;
		transition: color 0.3s;
	}

	.interactive:hover {
		color: var(--color-gold);
	}

	.connection-line {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
	}

	.connection-line.right {
		left: 100%;
		margin-left: 20px;
	}

	.connection-line.left {
		right: 100%;
		margin-right: 20px;
	}

	.connection-line line {
		stroke-dasharray: 200;
		stroke-dashoffset: 200;
	}

	.word-definition {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: white;
		border: 2px solid var(--color-gold);
		padding: calc(var(--baseline) * 2) calc(var(--baseline) * 3);
		border-radius: 0;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		width: 450px;
		max-width: 450px;
		z-index: 11;
		font-family: var(--font-serif);
		font-size: 1em;
		line-height: 1.6;
		color: var(--color-graphite-dark);
		text-align: left;
		hyphens: none;
		opacity: 0;

		/* Prevent widows, orphans and rags */
		orphans: 3;
		widows: 3;
		word-spacing: -0.05em;
		hanging-punctuation: first last;
	}

	.word-definition.right {
		left: calc(100% + 230px);
	}

	.word-definition.left {
		right: calc(100% + 230px);
	}

	@media (max-width: 768px) {
		.word-definition {
			min-width: 250px;
			max-width: 90vw;
		}
	}
</style>
