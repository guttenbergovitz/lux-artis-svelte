<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		type = 'reveal',
		intensity = 'standard',
		direction = 'left',
		threshold = 0.25,
		rootMargin = '0px 0px -10% 0px',
		delay = 0,
		once = true,
		staggerDelay = 80,
		maxStaggerItems = 8,
		parallaxIntensity = 0.2,
		class: className = '',
		...restProps
	}: {
		children: any;
		type?: 'reveal' | 'wipe' | 'section' | 'stagger' | 'parallax' | 'panel';
		intensity?: 'subtle' | 'standard' | 'strong';
		direction?: 'left' | 'bottom' | 'up' | 'down';
		threshold?: number;
		rootMargin?: string;
		delay?: number;
		once?: boolean;
		staggerDelay?: number;
		maxStaggerItems?: number;
		parallaxIntensity?: number;
		class?: string;
		[key: string]: any;
	} = $props();

	let element: HTMLElement;
	let isVisible = $state(false);
	let prefersReducedMotion = $state(false);
	let scrollCleanup: (() => void) | null = null;

	onMount(() => {
		if (!browser) return;

		// Check for reduced motion preference
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;
		
		const handleChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
		};
		
		mediaQuery.addEventListener('change', handleChange);

		// Apply appropriate motion class
		const motionClass = getMotionClass();
		if (motionClass) {
			element.classList.add(motionClass);
		}

		// Set up motion system based on type
		if (type === 'parallax') {
			setupParallax();
		} else if (type === 'stagger') {
			setupStagger();
		} else {
			setupIntersectionObserver();
		}

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
			if (scrollCleanup) {
				scrollCleanup();
			}
		};
	});

	function getMotionClass(): string {
		switch (type) {
			case 'reveal':
				return intensity === 'subtle' ? 'motion-reveal-subtle' :
					   intensity === 'strong' ? 'motion-reveal-strong' : 'motion-reveal';
			case 'wipe':
				return `motion-wipe-${direction}`;
			case 'section':
				return 'section-transition';
			case 'stagger':
				return 'stagger-container';
			case 'panel':
				return `panel-transition panel-${direction}`;
			case 'parallax':
				return 'parallax-text';
			default:
				return 'motion-reveal';
		}
	}

	function setupIntersectionObserver() {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							isVisible = true;
							entry.target.classList.add('visible');
						}, delay);
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						isVisible = false;
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold, rootMargin }
		);

		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}

	function setupStagger() {
		// Add stagger-item class to children
		const children = Array.from(element.children).slice(0, maxStaggerItems);
		children.forEach((child) => {
			child.classList.add('stagger-item');
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							isVisible = true;
							entry.target.classList.add('visible');
							
							// Apply stagger delays if not reduced motion
							if (!prefersReducedMotion) {
								children.forEach((child, index) => {
									if (child instanceof HTMLElement) {
										child.style.transitionDelay = `${index * staggerDelay}ms`;
									}
								});
							}
						}, delay);
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						isVisible = false;
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold, rootMargin }
		);

		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}

	function setupParallax() {
		if (prefersReducedMotion) return;

		const handleScroll = () => {
			const rect = element.getBoundingClientRect();
			const scrolled = window.pageYOffset;
			const rate = scrolled * parallaxIntensity;
			
			// Only apply parallax when element is in viewport
			if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
				element.style.transform = `translateY(${rate}px)`;
			}
		};

		// Use passive listener for performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		scrollCleanup = () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}
</script>

<div 
	bind:this={element}
	class={className}
	{...restProps}
>
	{@render children()}
</div>

<style>
	/* Component-specific styles if needed */
	div {
		/* Ensure proper stacking context for motion */
		position: relative;
	}
</style>