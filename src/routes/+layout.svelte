<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import 'flowbite/dist/flowbite.min.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
	let sidebarOpen = $state(false);

	// Share sidebar state with Header
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@400;700&family=Didact+Gothic&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app-container" class:sidebar-open={sidebarOpen}>
	<Header {sidebarOpen} {toggleSidebar} />
	
	<div class="content-wrapper">
		<main class="main-content">
			{@render children()}
		</main>
		<Footer />
	</div>
</div>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>
