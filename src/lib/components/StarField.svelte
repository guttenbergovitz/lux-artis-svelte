<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		starCount = 150,
		color = '#ffffff',
		accentColor = '#d4af37',
		speed = 0.5,
		class: className = ''
	}: {
		starCount?: number;
		color?: string;
		accentColor?: string;
		speed?: number;
		class?: string;
	} = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let stars: Star[] = [];
	let animationId: number;
	let mouseX = 0;
	let mouseY = 0;
	let targetMouseX = 0;
	let targetMouseY = 0;

	interface Star {
		x: number;
		y: number;
		z: number;
		size: number;
		opacity: number;
		twinkleSpeed: number;
		twinklePhase: number;
		isGold: boolean;
	}

	function createStars(width: number, height: number) {
		stars = [];
		for (let i = 0; i < starCount; i++) {
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				z: Math.random() * 3 + 1,
				size: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.3,
				twinkleSpeed: Math.random() * 0.02 + 0.01,
				twinklePhase: Math.random() * Math.PI * 2,
				isGold: Math.random() < 0.2
			});
		}
	}

	function draw(time: number) {
		if (!ctx || !canvas) return;

		const width = canvas.width;
		const height = canvas.height;

		// Smooth mouse follow
		mouseX += (targetMouseX - mouseX) * 0.05;
		mouseY += (targetMouseY - mouseY) * 0.05;

		// Clear with fade effect for trails
		ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
		ctx.fillRect(0, 0, width, height);

		stars.forEach((star) => {
			// Parallax based on z-depth and mouse
			const parallaxX = (mouseX - width / 2) * (star.z * 0.02);
			const parallaxY = (mouseY - height / 2) * (star.z * 0.02);

			let x = star.x + parallaxX;
			let y = star.y + parallaxY;

			// Slow upward drift
			star.y -= speed * star.z * 0.1;
			if (star.y < -10) {
				star.y = height + 10;
				star.x = Math.random() * width;
			}

			// Twinkle effect
			const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
			const currentOpacity = star.opacity * twinkle;

			// Draw star with glow
			const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
			const starColor = star.isGold ? accentColor : color;

			gradient.addColorStop(0, starColor);
			gradient.addColorStop(0.3, starColor + Math.floor(currentOpacity * 200).toString(16).padStart(2, '0'));
			gradient.addColorStop(1, 'transparent');

			ctx.beginPath();
			ctx.fillStyle = gradient;
			ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
			ctx.fill();

			// Core of the star
			ctx.beginPath();
			ctx.fillStyle = starColor;
			ctx.globalAlpha = currentOpacity;
			ctx.arc(x, y, star.size * 0.5, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 1;
		});

		animationId = requestAnimationFrame(draw);
	}

	function handleResize() {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * window.devicePixelRatio;
		canvas.height = rect.height * window.devicePixelRatio;
		ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
		createStars(rect.width, rect.height);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		targetMouseX = e.clientX - rect.left;
		targetMouseY = e.clientY - rect.top;
	}

	onMount(() => {
		if (!browser) return;

		ctx = canvas.getContext('2d');
		handleResize();

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);

		animationId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<canvas bind:this={canvas} class="star-field {className}"></canvas>

<style>
	.star-field {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
