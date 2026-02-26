<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import logoMini from '$lib/assets/logo_mini.svg';
	import logoMiniBlack from '$lib/assets/logo_mini_black.svg';
	import Container from '$lib/components/Container.svelte';
	import { getLocaleFromPath, getTranslation, getTranslations } from '$lib/i18n';
	import { localizeHref, setLocale } from '$lib/paraglide/runtime';

	let { sidebarOpen = $bindable(), toggleSidebar }: { 
		sidebarOpen: boolean; 
		toggleSidebar: () => void; 
	} = $props();

	let translations = $state<Record<string, any>>({});
	let logoElement = $state<HTMLElement>();
	let currentLogoSrc = $state(logoMini); // Start with white logo (for banner)
	let menuTextColor = $state('white'); // Start with white text (for banner)

	$effect(() => {
		const locale = getLocaleFromPath(page.url.pathname);
		loadData(locale);
	});

	// Smart logo color adaptation based on section position
	$effect(() => {
		if (!browser) return;

		let currentSection = 'banner';
		
		const updateLogoColor = (sectionName: string) => {
			// Prevent unnecessary updates
			if (sectionName === currentSection) return;
			
			// Define which sections need white logo vs black logo
			const whiteLogoSections = ['banner', 'cta']; // Three.js banner and CTA section
			
			const useWhiteLogo = whiteLogoSections.includes(sectionName);
			currentLogoSrc = useWhiteLogo ? logoMini : logoMiniBlack;
			menuTextColor = useWhiteLogo ? 'white' : 'black';
			currentSection = sectionName;
			
			console.log('Section changed:', {
				section: sectionName,
				useWhiteLogo,
				logoSrc: currentLogoSrc === logoMini ? 'white' : 'black'
			});
		};

		const checkSections = () => {
			const sections = [
				{ element: document.querySelector('.banner-container'), name: 'banner' },
				{ element: document.querySelector('.hero-section'), name: 'hero' },
				{ element: document.querySelector('.mission-section'), name: 'mission' },
				{ element: document.querySelector('.values-section'), name: 'values' },
				{ element: document.querySelector('.focus-section'), name: 'focus' },
				{ element: document.querySelector('.context-process-section'), name: 'context' },
				{ element: document.querySelector('.cta-section'), name: 'cta' },
				{ element: document.querySelector('.events-section'), name: 'events' }
			];

			// Find which section is 50px from top of viewport
			for (const section of sections) {
				if (section.element) {
					const rect = section.element.getBoundingClientRect();
					// Check if section top is within 50px of viewport top
					if (rect.top <= 50 && rect.bottom > 50) {
						updateLogoColor(section.name);
						break;
					}
				}
			}
		};

		// Check on scroll
		const handleScroll = () => checkSections();
		
		// Initial check
		setTimeout(checkSections, 100);
		
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	async function loadData(locale: 'pl' | 'en' | 'de') {
		translations = await getTranslations(locale);
	}

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function getLocalizedPath(route: string): string {
		const currentLocale = getLocaleFromPath(page.url.pathname);
		return localizeHref(route, { locale: currentLocale as 'pl' | 'uk' | 'en' | 'de' });
	}

	function isActive(path: string): boolean {
		return page.url.pathname === getLocalizedPath(path);
	}

	async function switchLanguage(newLocale: 'pl' | 'uk' | 'en' | 'de') {
		const currentPath = page.url.pathname;
		const currentLocale = getLocaleFromPath(currentPath);

		let newPath: string;
		if (currentPath.startsWith(`/${currentLocale}/`)) {
			newPath = currentPath.replace(`/${currentLocale}/`, `/${newLocale}/`);
		} else if (currentPath === `/${currentLocale}` || currentPath === `/${currentLocale}/`) {
			newPath = `/${newLocale}`;
		} else {
			newPath = `/${newLocale}`;
		}

		setLocale(newLocale);
		await goto(newPath);
		sidebarOpen = false; // Close sidebar after navigation
	}

	function handleNavClick() {
		sidebarOpen = false;
	}
</script>

<!-- Floating Navigation Elements -->
<div class="floating-nav">
	<!-- Smart Adaptive Logo - Top Left Corner -->
	<div class="floating-logo">
		<a href={getLocalizedPath('/')} class="logo-link" aria-label="Lux Artis">
			<img 
				bind:this={logoElement}
				src={currentLogoSrc} 
				alt="Lux Artis" 
				class="logo-image" 
				width="64" 
				height="64" 
			/>
		</a>
	</div>

	<!-- Menu Toggle - Top Right Corner -->
	<button 
		class="floating-menu-toggle" 
		onclick={toggleSidebar}
		aria-label="Toggle navigation"
		aria-expanded={sidebarOpen}
	>
		<span class="menu-text" style="color: {menuTextColor};">Menu</span>
		<div class="toggle-icon">
			<span class="toggle-dot" class:open={sidebarOpen}></span>
			<span class="toggle-dot" class:open={sidebarOpen}></span>
			<span class="toggle-dot" class:open={sidebarOpen}></span>
		</div>
	</button>

	<!-- Vertical Text - Left Edge -->
	<div class="vertical-text">
		<span class="site-tagline">Fundacja Lux Artis</span>
	</div>

	<!-- Page Indicator - Right Edge -->
	<div class="page-indicator">
		<div class="indicator-line"></div>
		<div class="indicator-dot" class:active={page.url.pathname === getLocalizedPath('/')}></div>
		<div class="indicator-dot" class:active={isActive('/about')}></div>
		<div class="indicator-dot" class:active={isActive('/events')}></div>
		<div class="indicator-dot" class:active={isActive('/contact')}></div>
	</div>
</div>

<!-- Animated Full-Screen Sidebar -->
{#if sidebarOpen}
	<aside 
		class="fullscreen-sidebar" 
		transition:slide={{ duration: 600, easing: quintOut, axis: 'x' }}
		role="navigation"
		aria-label="Main navigation"
	>
		<div class="sidebar-content">
			<!-- Close Button -->
			<button 
				class="sidebar-close" 
				onclick={toggleSidebar}
				aria-label="Close navigation"
			>
				<span class="close-line"></span>
				<span class="close-line"></span>
			</button>

			<!-- Navigation Content -->
			<div class="sidebar-main">
				<nav class="sidebar-nav">
					<div class="nav-section">
						<h2 class="nav-section-title">Home</h2>
						<div class="nav-links">
							<a 
								href={getLocalizedPath('/')} 
								class="sidebar-link" 
								class:active={page.url.pathname === getLocalizedPath('/')}
								onclick={handleNavClick}
							>
								{t('nav.home')}
							</a>
						</div>
					</div>

					<div class="nav-section">
						<h2 class="nav-section-title">Foundation</h2>
						<div class="nav-links">
							<a 
								href={getLocalizedPath('/about')} 
								class="sidebar-link" 
								class:active={isActive('/about')}
								onclick={handleNavClick}
							>
								{t('nav.about')}
							</a>
							<a 
								href={getLocalizedPath('/people')} 
								class="sidebar-link" 
								class:active={isActive('/people')}
								onclick={handleNavClick}
							>
								{t('nav.people')}
							</a>
						</div>
					</div>

					<div class="nav-section">
						<h2 class="nav-section-title">Program</h2>
						<div class="nav-links">
							<a 
								href={getLocalizedPath('/events')} 
								class="sidebar-link" 
								class:active={isActive('/events')}
								onclick={handleNavClick}
							>
								{t('nav.events')}
							</a>
							<a 
								href={getLocalizedPath('/support')} 
								class="sidebar-link" 
								class:active={isActive('/support')}
								onclick={handleNavClick}
							>
								{t('nav.support')}
							</a>
							<a 
								href={getLocalizedPath('/faq')} 
								class="sidebar-link" 
								class:active={isActive('/faq')}
								onclick={handleNavClick}
							>
								{t('nav.faq')}
							</a>
						</div>
					</div>

					<div class="nav-section">
						<h2 class="nav-section-title">Contact</h2>
						<div class="nav-links">
							<a 
								href={getLocalizedPath('/info')} 
								class="sidebar-link" 
								class:active={isActive('/info')}
								onclick={handleNavClick}
							>
								{t('nav.info')}
							</a>
							<a 
								href={getLocalizedPath('/contact')} 
								class="sidebar-link" 
								class:active={isActive('/contact')}
								onclick={handleNavClick}
							>
								{t('nav.contact')}
							</a>
						</div>
					</div>
				</nav>
			</div>
		</div>
	</aside>
{/if}
