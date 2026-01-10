import { browser } from '$app/environment';

export class MotionController {
	private observers: Map<Element, IntersectionObserver> = new Map();
	private scrollListeners: Map<Element, () => void> = new Map();
	private prefersReducedMotion = false;
	private isScrollJacked = false;
	private scrollJackSections: Element[] = [];

	constructor() {
		if (browser) {
			this.checkReducedMotion();
			this.initializeScrollJacking();
		}
	}

	private checkReducedMotion() {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		this.prefersReducedMotion = mediaQuery.matches;
		
		mediaQuery.addEventListener('change', (e) => {
			this.prefersReducedMotion = e.matches;
		});
	}

	private initializeScrollJacking() {
		// Initialize scroll-jacking system for narrative sections
		this.detectScrollJackSections();
		this.setupScrollJackListeners();
	}

	private detectScrollJackSections() {
		// Auto-detect sections marked for scroll-jacking
		const sections = document.querySelectorAll('[data-scroll-jack="true"]');
		this.scrollJackSections = Array.from(sections);
	}

	private setupScrollJackListeners() {
		if (this.prefersReducedMotion) return;

		let isScrolling = false;
		let scrollTimeout: number;

		const handleScroll = (e: WheelEvent) => {
			const activeSection = this.getActiveScrollJackSection();
			if (!activeSection) return;

			e.preventDefault();
			
			if (isScrolling) return;
			isScrolling = true;

			const direction = e.deltaY > 0 ? 'down' : 'up';
			this.performScrollJackTransition(activeSection, direction);

			clearTimeout(scrollTimeout);
			scrollTimeout = window.setTimeout(() => {
				isScrolling = false;
			}, 1000);
		};

		window.addEventListener('wheel', handleScroll, { passive: false });
	}

	private getActiveScrollJackSection(): Element | null {
		const viewportCenter = window.innerHeight / 2;
		
		for (const section of this.scrollJackSections) {
			const rect = section.getBoundingClientRect();
			if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
				return section;
			}
		}
		return null;
	}

	private performScrollJackTransition(section: Element, direction: 'up' | 'down') {
		const currentIndex = this.scrollJackSections.indexOf(section);
		let targetIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1;
		
		// Clamp to valid range
		targetIndex = Math.max(0, Math.min(targetIndex, this.scrollJackSections.length - 1));
		
		if (targetIndex === currentIndex) {
			// Escape scroll-jacking - continue normal scroll
			const targetY = direction === 'down' 
				? section.getBoundingClientRect().bottom + window.pageYOffset
				: section.getBoundingClientRect().top + window.pageYOffset - window.innerHeight;
			
			window.scrollTo({
				top: targetY,
				behavior: 'smooth'
			});
			return;
		}

		const targetSection = this.scrollJackSections[targetIndex];
		const targetY = targetSection.getBoundingClientRect().top + window.pageYOffset;
		
		window.scrollTo({
			top: targetY,
			behavior: 'smooth'
		});
	}

	/**
	 * Reveal element with default motion (opacity + translateY)
	 * Style 1: Standard architectural reveal
	 */
	revealElement(
		element: Element,
		options: {
			threshold?: number;
			rootMargin?: string;
			delay?: number;
			once?: boolean;
			intensity?: 'subtle' | 'standard' | 'strong';
		} = {}
	) {
		const {
			threshold = 0.25,
			rootMargin = '0px 0px -10% 0px',
			delay = 0,
			once = true,
			intensity = 'standard'
		} = options;

		// Apply appropriate motion class based on intensity
		const motionClass = intensity === 'subtle' ? 'motion-reveal-subtle' : 
						   intensity === 'strong' ? 'motion-reveal-strong' : 'motion-reveal';
		
		element.classList.add(motionClass);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add('visible');
						}, delay);
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold, rootMargin }
		);

		observer.observe(element);
		this.observers.set(element, observer);
	}

	/**
	 * Reveal element with wipe animation
	 * Style 2: Typographic emphasis wipe
	 */
	wipeElement(
		element: Element,
		direction: 'left' | 'bottom' = 'left',
		options: {
			threshold?: number;
			rootMargin?: string;
			delay?: number;
			once?: boolean;
		} = {}
	) {
		const {
			threshold = 0.25,
			rootMargin = '0px 0px -10% 0px',
			delay = 0,
			once = true
		} = options;

		element.classList.add(`motion-wipe-${direction}`);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add('visible');
						}, delay);
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold, rootMargin }
		);

		observer.observe(element);
		this.observers.set(element, observer);
	}

	/**
	 * Stagger reveal for multiple elements
	 * Editorial staggering - max 6-8 items
	 */
	staggerReveal(
		container: Element,
		options: {
			threshold?: number;
			rootMargin?: string;
			staggerDelay?: number;
			once?: boolean;
			maxItems?: number;
		} = {}
	) {
		const {
			threshold = 0.25,
			rootMargin = '0px 0px -10% 0px',
			staggerDelay = 80,
			once = true,
			maxItems = 8
		} = options;

		container.classList.add('stagger-container');
		
		// Add stagger-item class to children (limit to maxItems)
		Array.from(container.children).slice(0, maxItems).forEach((child) => {
			child.classList.add('stagger-item');
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						
						// Apply stagger delays if not reduced motion
						if (!this.prefersReducedMotion) {
							Array.from(entry.target.children).slice(0, maxItems).forEach((child, index) => {
								if (child instanceof HTMLElement) {
									child.style.transitionDelay = `${index * staggerDelay}ms`;
								}
							});
						}
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold, rootMargin }
		);

		observer.observe(container);
		this.observers.set(container, observer);
	}

	/**
	 * Section transition (larger movement for section boundaries)
	 * Poster composition shifts
	 */
	sectionTransition(
		element: Element,
		options: {
			threshold?: number;
			rootMargin?: string;
			delay?: number;
			once?: boolean;
			type?: 'slide' | 'fade' | 'wipe';
		} = {}
	) {
		const {
			threshold = 0.15,
			rootMargin = '0px 0px -5% 0px',
			delay = 0,
			once = true,
			type = 'slide'
		} = options;

		const transitionClass = type === 'wipe' ? 'section-wipe' : 
							   type === 'fade' ? 'section-fade' : 'section-transition';
		
		element.classList.add(transitionClass);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add('visible');
						}, delay);
						
						if (once) {
							observer.unobserve(entry.target);
						}
					} else if (!once) {
						entry.target.classList.remove('visible');
					}
				});
			},
			{ threshold, rootMargin }
		);

		observer.observe(element);
		this.observers.set(element, observer);
	}

	/**
	 * Subtle parallax for typographic elements
	 * Structural parallax only - no scenic backgrounds
	 */
	parallaxText(element: Element, intensity: number = 0.2) {
		if (this.prefersReducedMotion) return;

		element.classList.add('parallax-text');

		const handleScroll = () => {
			const rect = element.getBoundingClientRect();
			const scrolled = window.pageYOffset;
			const rate = scrolled * intensity;
			
			// Only apply parallax when element is in viewport
			if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
				(element as HTMLElement).style.transform = `translateY(${rate}px)`;
			}
		};

		// Use passive listener for performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Store cleanup function
		const cleanup = () => {
			window.removeEventListener('scroll', handleScroll);
		};

		this.scrollListeners.set(element, cleanup);
		return cleanup;
	}

	/**
	 * Panel transition for scroll-jacked sections
	 * Frame slides aligned to grid
	 */
	panelTransition(
		element: Element,
		direction: 'up' | 'down' = 'up',
		options: {
			duration?: number;
			easing?: string;
		} = {}
	) {
		const {
			duration = 1200,
			easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
		} = options;

		element.classList.add('panel-transition', `panel-${direction}`);
		
		// Apply custom timing
		if (element instanceof HTMLElement) {
			element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
		}

		// Trigger transition
		requestAnimationFrame(() => {
			element.classList.add('visible');
		});
	}

	/**
	 * Enable scroll-jacking for specific sections
	 */
	enableScrollJack(sections: Element[]) {
		if (this.prefersReducedMotion) return;
		
		sections.forEach(section => {
			section.setAttribute('data-scroll-jack', 'true');
		});
		
		this.scrollJackSections = sections;
	}

	/**
	 * Disable scroll-jacking (escape hatch)
	 */
	disableScrollJack() {
		this.scrollJackSections.forEach(section => {
			section.removeAttribute('data-scroll-jack');
		});
		this.scrollJackSections = [];
	}

	/**
	 * Page transition system
	 */
	pageTransition(
		outElement: Element,
		inElement: Element,
		options: {
			duration?: number;
			type?: 'fade' | 'slide';
		} = {}
	) {
		const { duration = 400, type = 'fade' } = options;

		return new Promise<void>((resolve) => {
			// Exit animation
			outElement.classList.add(`page-transition-exit-${type}`);
			
			setTimeout(() => {
				// Enter animation
				inElement.classList.add(`page-transition-enter-${type}`);
				
				setTimeout(() => {
					// Cleanup
					outElement.classList.remove(`page-transition-exit-${type}`);
					inElement.classList.remove(`page-transition-enter-${type}`);
					resolve();
				}, duration);
			}, duration * 0.3);
		});
	}

	/**
	 * Section parallax for smooth entry/exit effects
	 */
	sectionParallax(
		element: Element,
		options: {
			intensity?: number;
			direction?: 'up' | 'down';
			threshold?: number;
		} = {}
	) {
		if (this.prefersReducedMotion) return;

		const {
			intensity = 0.3,
			direction = 'up',
			threshold = 0.1
		} = options;

		element.classList.add('section-parallax');

		const handleScroll = () => {
			const rect = element.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const elementHeight = rect.height;
			
			// Calculate progress (0 to 1) as element enters/exits viewport
			let progress = 0;
			
			if (direction === 'up') {
				// Element moving up from bottom
				progress = Math.max(0, Math.min(1, 
					(viewportHeight - rect.top) / (viewportHeight + elementHeight)
				));
			} else {
				// Element moving down from top
				progress = Math.max(0, Math.min(1, 
					(rect.bottom) / (viewportHeight + elementHeight)
				));
			}
			
			// Apply parallax transform only when element is in viewport range
			if (progress > threshold && progress < (1 - threshold)) {
				const translateY = (progress - 0.5) * intensity * 100;
				(element as HTMLElement).style.transform = `translateY(${translateY}px)`;
			}
		};

		// Use passive listener for performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Store cleanup function
		const cleanup = () => {
			window.removeEventListener('scroll', handleScroll);
		};

		this.scrollListeners.set(element, cleanup);
		return cleanup;
	}
	destroy() {
		this.observers.forEach((observer) => {
			observer.disconnect();
		});
		this.observers.clear();

		this.scrollListeners.forEach((cleanup) => {
			cleanup();
		});
		this.scrollListeners.clear();
	}
}

// Global instance
export const motionController = new MotionController();