<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas } from '@threlte/core';
	import Scene3D from './Scene3D.svelte';
	import * as THREE from 'three';

	let mouseX = 0;
	let mouseY = 0;
	let bannerRef: HTMLElement;

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const rect = bannerRef.getBoundingClientRect();
			mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
		};

		bannerRef.addEventListener('mousemove', handleMouseMove);

		return () => {
			bannerRef.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<section class="hero-banner" bind:this={bannerRef}>
	<Canvas renderMode="always">
		<Scene3D {mouseX} {mouseY} />
	</Canvas>
</section>

<style>
	.hero-banner {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url('$lib/assets/plain-backdrop-decorative-gray-textured.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		z-index: 0;
	}

	.hero-banner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(26, 26, 26, 0.5);
		pointer-events: none;
		z-index: 0;
	}

	.hero-banner :global(canvas) {
		position: relative;
		z-index: 1;
	}
</style>
