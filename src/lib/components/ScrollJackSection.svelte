<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		sections = [],
		enabled = true,
		showIndicator = true,
		showEscapeHint = false, // Disabled by default for cleaner look
		class: className = '',
		...restProps
	}: {
		children: any;
		sections?: string[];
		enabled?: boolean;
		showIndicator?: boolean;
		showEscapeHint?: boolean;
		class?: string;
		[key: string]: any;
	} = $props();

	let container: HTMLElement;
	let currentSection = $state(0);
	let isScrollJacking = $state(false);
	let prefersReducedMotion = $state(false);
	let isScrolling = $state(false);
	let lastScrollTime = 0;

	onMount(() => {
		if (!browser || !enabled) return;

		// Check for reduced motion preference
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;
		
		if (prefersReducedMotion) {
			return; // Disable scroll-jacking for reduced motion
		}

		const handleChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion = e.matches;
		};
		
		mediaQuery.addEventListener('change', handleChange);

		// Set up scroll-jacking
		setupScrollJacking();

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	function setupScrollJacking() {
		let scrollTimeout: number;
		const SCROLL_THRESHOLD = 50; // Minimum delta to trigger
		const SCROLL_COOLDOWN = 800; // Cooldown between transitions

		const handleWheel = (e: WheelEvent) => {
			const now = Date.now();
			
			// Check if we're in scroll-jack zone
			if (!isInScrollJackZone()) {
				isScrollJacking = false;
				return;
			}

			// Ignore small scroll movements (trackpad sensitivity)
			if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;
			
			// Cooldown to prevent rapid firing
			if (now - lastScrollTime < SCROLL_COOLDOWN) return;
			
			// Only prevent default if we're actively scroll-jacking
			if (isScrollJacking && !isScrolling) {
				e.preventDefault();
				
				const direction = e.deltaY > 0 ? 'down' : 'up';
				handleScrollJackNavigation(direction);
				lastScrollTime = now;
			}
		};

		const handleScrollJackNavigation = (direction: 'up' | 'down') => {
			isScrolling = true;
			
			const newSection = direction === 'down' 
				? Math.min(currentSection + 1, sections.length - 1)
				: Math.max(currentSection - 1, 0);

			// If we can move to a new section, do it with slide effect
			if (newSection !== currentSection) {
				slideToSection(newSection, direction);
				currentSection = newSection;
			} else {
				// We're at boundary - allow natural scroll to escape
				isScrollJacking = false;
				escapeScrollJacking(direction);
			}

			clearTimeout(scrollTimeout);
			scrollTimeout = window.setTimeout(() => {
				isScrolling = false;
			}, 1000); // Longer timeout for slide animation
		};

		const slideToSection = (sectionIndex: number, direction: 'up' | 'down') => {
			const sectionElements = container.querySelectorAll('[data-scroll-section]');
			
			// Apply slide classes for animation
			sectionElements.forEach((section, index) => {
				section.classList.remove('slide-in', 'slide-out');
				
				if (direction === 'down') {
					// Sliding down - current section slides out, new slides in
					if (index < sectionIndex) {
						section.classList.add('slide-out');
					} else if (index === sectionIndex) {
						section.classList.add('slide-in');
					}
				} else {
					// Sliding up - reverse effect
					if (index > sectionIndex) {
						section.classList.add('slide-out');
					} else if (index === sectionIndex) {
						section.classList.add('slide-in');
					}
				}
			});
		};

		const escapeScrollJacking = (direction: 'up' | 'down') => {
			const containerRect = container.getBoundingClientRect();
			let targetY: number;
			
			if (direction === 'down') {
				// Scroll past the container
				targetY = containerRect.bottom + window.pageYOffset + 200;
			} else {
				// Scroll before the container
				targetY = Math.max(0, containerRect.top + window.pageYOffset - window.innerHeight + 200);
			}
			
			window.scrollTo({
				top: targetY,
				behavior: 'smooth'
			});
		};

		const isInScrollJackZone = (): boolean => {
			const rect = container.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			
			// More precise zone detection
			const topThreshold = viewportHeight * 0.2;
			const bottomThreshold = viewportHeight * 0.8;
			
			return rect.top <= topThreshold && rect.bottom >= bottomThreshold;
		};

		// Set up intersection observer for smoother section tracking
		const observer = new IntersectionObserver(
			(entries) => {
				let maxIntersection = 0;
				let activeIndex = 0;
				
				entries.forEach((entry, index) => {
					if (entry.intersectionRatio > maxIntersection) {
						maxIntersection = entry.intersectionRatio;
						activeIndex = index;
					}
				});
				
				// Only update if we have significant intersection
				if (maxIntersection > 0.3) {
					currentSection = activeIndex;
					isScrollJacking = true;
				}
				
				// Disable scroll-jacking if no sections are significantly visible
				const hasSignificantIntersection = entries.some(entry => entry.intersectionRatio > 0.3);
				if (!hasSignificantIntersection) {
					isScrollJacking = false;
				}
			},
			{
				threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
				rootMargin: '-15% 0px -15% 0px'
			}
		);

		// Observe all scroll sections
		const sectionElements = container.querySelectorAll('[data-scroll-section]');
		sectionElements.forEach((section) => {
			observer.observe(section);
		});

		// Add wheel listener with passive: false only when needed
		const wheelOptions = { passive: false };
		window.addEventListener('wheel', handleWheel, wheelOptions);

		return () => {
			window.removeEventListener('wheel', handleWheel);
			observer.disconnect();
		};
	}
</script>

<div 
	bind:this={container}
	class="scroll-jack-container {className}"
	data-scroll-jack="true"
	{...restProps}
>
	{@render children()}
	
	{#if showIndicator && enabled && !prefersReducedMotion}
		<div class="scroll-jack-indicator" class:active={isScrollJacking}>
			{#each sections as section, index}
				<div 
					class="scroll-jack-dot" 
					class:active={index === currentSection}
					title={section}
				></div>
			{/each}
		</div>
	{/if}
	
	{#if showEscapeHint && enabled && !prefersReducedMotion && isScrollJacking}
		<div class="scroll-jack-escape visible">
			Continue scrolling to exit
		</div>
	{/if}
</div>

<style>
	.scroll-jack-container {
		position: relative;
	}
	
	/* Ensure sections are properly spaced */
	.scroll-jack-container :global([data-scroll-section]) {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>