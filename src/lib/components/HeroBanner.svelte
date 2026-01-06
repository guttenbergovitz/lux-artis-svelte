<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import logo from '$lib/assets/logo.svg';
	import backgroundImage from '$lib/assets/plain-backdrop-decorative-gray-textured.jpg';

	let lightRef: HTMLDivElement;
	let reflectionRef: HTMLDivElement;
	let bannerRef: HTMLElement;

	onMount(() => {
		// Ustaw początkową pozycję w lewym górnym rogu
		const rect = bannerRef.getBoundingClientRect();
		const initialX = -rect.width * 0.3;
		const initialY = -rect.height * 0.3;

		gsap.set(lightRef, { x: initialX, y: initialY });
		gsap.set(reflectionRef, { x: initialX * 0.3, y: initialY * 0.3 });

		const handleMouseMove = (e: MouseEvent) => {
			const rect = bannerRef.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;

			// Powolne podążanie za kursorem - światło
			gsap.to(lightRef, {
				x: x,
				y: y,
				duration: 1.5,
				ease: 'power2.out'
			});

			// Szybsze podążanie za kursorem - refleks na logo
			gsap.to(reflectionRef, {
				x: x * 0.3,
				y: y * 0.3,
				duration: 0.8,
				ease: 'power2.out'
			});
		};

		bannerRef.addEventListener('mousemove', handleMouseMove);

		return () => {
			bannerRef.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<section class="hero-banner" bind:this={bannerRef}>
	<div class="light-source" bind:this={lightRef}></div>
	<div class="hero-content">
		<div class="logo-container">
			<img src={logo} alt="Lux Artis" class="hero-logo" />
			<div class="reflection-overlay" bind:this={reflectionRef}></div>
		</div>
	</div>
</section>

<style>
	.hero-banner {
		position: relative;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: url('$lib/assets/plain-backdrop-decorative-gray-textured.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
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

	.light-source {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 110vw;
		height: 110vh;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.7) 15%,
			rgba(255, 255, 255, 0.4) 35%,
			rgba(255, 255, 255, 0.2) 50%,
			transparent 70%
		);
		pointer-events: none;
		z-index: 1;
		mix-blend-mode: screen;
		filter: blur(90px);
	}

	.hero-content {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeInScale 1.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.logo-container {
		position: relative;
		width: 90vw;
		max-width: 800px;
	}

	.hero-logo {
		width: 100%;
		height: auto;
		display: block;
		filter:
			drop-shadow(0 10px 40px rgba(0, 0, 0, 0.3))
			drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))
			brightness(0) saturate(100%)
			invert(60%) sepia(52%) saturate(556%)
			hue-rotate(7deg) brightness(110%) contrast(90%);
	}

	.reflection-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 80%;
		height: 80%;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			circle at center,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0.2) 30%,
			transparent 60%
		);
		pointer-events: none;
		mix-blend-mode: overlay;
		filter: blur(20px);
	}

	@keyframes fadeInScale {
		0% {
			opacity: 0;
			transform: scale(0.95);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Responsive adjustments */
	@media (max-width: 40em) {
		.logo-container {
			width: 85vw;
			max-width: 400px;
		}
	}

	@media (min-width: 80em) {
		.logo-container {
			max-width: 1000px;
		}
	}
</style>
