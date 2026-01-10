<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		staggerDelay = 80,
		threshold = 0.25,
		rootMargin = '0px 0px -10% 0px',
		once = true,
		class: className = ''
	}: {
		children: any;
		staggerDelay?: number;
		threshold?: number;
		rootMargin?: string;
		once?: boolean;
		class?: string;
	} = $props();

	let element: HTMLElement;
	let isVisible = $state(false);
	let prefersReducedMotion = $state(false);

	onMount(() => {
		if (!browser) return;

		// Check for reduced motion preference
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;
		
		const handleChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
		};
		
		mediaQuery.addEventListener('change', handleChange);

		// Set up intersection observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						
						// Apply stagger to child elements
						if (!prefersReducedMotion) {
							const children = entry.target.children;
							Array.from(children).forEach((child, index) => {
								if (child instanceof HTMLElement) {
									child.style.transitionDelay = `${index * staggerDelay}ms`;
								}
							});
						}
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						isVisible = false;
					}
				});
			},
			{
				threshold,
				rootMargin
			}
		);

		if (element) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	// Base styles for children
	$: containerStyle = isVisible ? 'opacity: 1;' : 'opacity: 0;';
</script>

<div 
	bind:this={element}
	class={className}
	style={containerStyle}
>
	{@render children()}
</div>

<style>
	:global(.stagger-item) {
		opacity: 0;
		transform: translateY(12px);
		transition: opacity 400ms ease-out, transform 400ms ease-out;
	}

	:global(.stagger-container.visible .stagger-item) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.stagger-item) {
			transform: none;
			transition: opacity 300ms ease-out;
		}
		
		:global(.stagger-container.visible .stagger-item) {
			transform: none;
		}
	}
</style>