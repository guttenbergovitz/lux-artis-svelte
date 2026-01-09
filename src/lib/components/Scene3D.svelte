<script lang="ts">
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import logo from '$lib/assets/logo.svg';
	import concreteBaseColor from '$lib/assets/concrete1-bl/concrete1_Base_Color.png';
	import concreteNormal from '$lib/assets/concrete1-bl/concrete1_Normal-ogl.png';
	import concreteRoughness from '$lib/assets/concrete1-bl/concrete1_Roughness.png';
	import concreteAO from '$lib/assets/concrete1-bl/concrete1-ao.png';
	import goldBaseColor from '$lib/assets/metal-gold-paint/2K/Poliigon_MetalGoldPaint_7253_BaseColor.jpg';
	import goldNormal from '$lib/assets/metal-gold-paint/2K/Poliigon_MetalGoldPaint_7253_Normal.png';
	import goldRoughness from '$lib/assets/metal-gold-paint/2K/Poliigon_MetalGoldPaint_7253_Roughness.jpg';
	import goldMetallic from '$lib/assets/metal-gold-paint/2K/Poliigon_MetalGoldPaint_7253_Metallic.jpg';
	import goldAO from '$lib/assets/metal-gold-paint/2K/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg';

	let { mouseX = 0, mouseY = 0 } = $props();

	let logoShapes: THREE.ShapeGeometry[] = $state([]);
	let logoCenter = $state({ x: 0, y: 0 });
	let concreteTexture = $state<THREE.Texture | undefined>(undefined);
	let concreteNormalMap = $state<THREE.Texture | undefined>(undefined);
	let concreteRoughnessMap = $state<THREE.Texture | undefined>(undefined);
	let concreteAOMap = $state<THREE.Texture | undefined>(undefined);
	let goldTexture = $state<THREE.Texture | undefined>(undefined);
	let goldNormalMap = $state<THREE.Texture | undefined>(undefined);
	let goldRoughnessMap = $state<THREE.Texture | undefined>(undefined);
	let goldMetallicMap = $state<THREE.Texture | undefined>(undefined);
	let goldAOMap = $state<THREE.Texture | undefined>(undefined);
	let texturesLoaded = $state(false);
	let lightPosition = $state({ x: 0, y: 0, z: 12 });
	let sceneRotation = $state({ x: 0, y: 0 });
	let cameraZ = $state(20);
	let scrollY = $state(0);
	let gsapInstance = $state<any>(undefined);
	let isMobile = $state(false);
	let logoScale = $state(0.0167);
	let particles: THREE.Points | undefined = $state(undefined);
	let particleSystem: THREE.BufferGeometry | undefined = $state(undefined);
	let particleMaterial: THREE.PointsMaterial | undefined = $state(undefined);
	let sparkles: THREE.Points | undefined = $state(undefined);
	let sparkleSystem: THREE.BufferGeometry | undefined = $state(undefined);
	let sparkleMaterial: THREE.PointsMaterial | undefined = $state(undefined);
	let additionalLight = $state({ x: 0, y: 0, z: 8, intensity: 0 });

	// Create floating particles
	function createParticleSystem() {
		const particleCount = 80;
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			const i3 = i * 3;
			positions[i3] = (Math.random() - 0.5) * 40; // x
			positions[i3 + 1] = (Math.random() - 0.5) * 30; // y
			positions[i3 + 2] = (Math.random() - 0.5) * 20; // z
			
			velocities[i3] = (Math.random() - 0.5) * 0.01;
			velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
			velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
			
			sizes[i] = Math.random() * 0.5 + 0.2;
		}

		particleSystem = new THREE.BufferGeometry();
		particleSystem.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particleSystem.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
		particleSystem.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		// Create custom shader material for soft glowing particles
		const vertexShader = `
			attribute float size;
			varying float vSize;
			
			void main() {
				vSize = size;
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				gl_PointSize = size * (300.0 / -mvPosition.z);
				gl_Position = projectionMatrix * mvPosition;
			}
		`;

		const fragmentShader = `
			uniform float opacity;
			varying float vSize;
			
			void main() {
				vec2 center = gl_PointCoord - vec2(0.5);
				float dist = length(center);
				
				// Create soft circular glow
				float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
				alpha *= alpha; // Make it softer
				
				// Add subtle sparkle effect
				float sparkle = sin(dist * 20.0) * 0.1 + 0.9;
				
				gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * sparkle * opacity);
			}
		`;

		particleMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				opacity: { value: 0.0 }
			},
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		particles = new THREE.Points(particleSystem, particleMaterial);
	}

	// Create sparkle effects
	function createSparkleSystem() {
		const sparkleCount = 50;
		const positions = new Float32Array(sparkleCount * 3);
		const scales = new Float32Array(sparkleCount);
		const phases = new Float32Array(sparkleCount);

		for (let i = 0; i < sparkleCount; i++) {
			const i3 = i * 3;
			positions[i3] = (Math.random() - 0.5) * 35;
			positions[i3 + 1] = (Math.random() - 0.5) * 25;
			positions[i3 + 2] = (Math.random() - 0.5) * 15;
			
			scales[i] = Math.random() * 0.8 + 0.3;
			phases[i] = Math.random() * Math.PI * 2;
		}

		sparkleSystem = new THREE.BufferGeometry();
		sparkleSystem.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		sparkleSystem.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
		sparkleSystem.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

		// Custom shader for golden sparkles
		const vertexShader = `
			attribute float scale;
			attribute float phase;
			varying float vScale;
			varying float vPhase;
			
			void main() {
				vScale = scale;
				vPhase = phase;
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				gl_PointSize = scale * (200.0 / -mvPosition.z);
				gl_Position = projectionMatrix * mvPosition;
			}
		`;

		const fragmentShader = `
			uniform float time;
			uniform float opacity;
			varying float vScale;
			varying float vPhase;
			
			void main() {
				vec2 center = gl_PointCoord - vec2(0.5);
				float dist = length(center);
				
				// Create star-like sparkle
				float angle = atan(center.y, center.x);
				float sparkle = abs(sin(angle * 4.0)) * 0.3 + 0.7;
				
				// Soft circular falloff
				float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
				alpha *= alpha * sparkle;
				
				// Twinkling effect
				float twinkle = sin(time * 2.0 + vPhase) * 0.3 + 0.7;
				
				// Golden color
				vec3 color = vec3(0.83, 0.69, 0.22); // Gold color
				
				gl_FragColor = vec4(color, alpha * twinkle * opacity);
			}
		`;

		sparkleMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				time: { value: 0.0 },
				opacity: { value: 0.0 }
			},
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		sparkles = new THREE.Points(sparkleSystem, sparkleMaterial);
	}

	// Animate particles
	function animateParticles() {
		if (!particles || !particleSystem) return;

		const positions = particleSystem.attributes.position.array as Float32Array;
		const velocities = particleSystem.attributes.velocity.array as Float32Array;

		for (let i = 0; i < positions.length; i += 3) {
			positions[i] += velocities[i];
			positions[i + 1] += velocities[i + 1];
			positions[i + 2] += velocities[i + 2];

			// Wrap around boundaries
			if (positions[i] > 20) positions[i] = -20;
			if (positions[i] < -20) positions[i] = 20;
			if (positions[i + 1] > 15) positions[i + 1] = -15;
			if (positions[i + 1] < -15) positions[i + 1] = 15;
		}

		particleSystem.attributes.position.needsUpdate = true;
	}

	// Animate sparkles
	function animateSparkles() {
		if (!sparkles || !sparkleSystem || !sparkleMaterial) return;

		const positions = sparkleSystem.attributes.position.array as Float32Array;
		const time = Date.now() * 0.001;

		// Update time uniform for twinkling effect
		if (sparkleMaterial.uniforms && sparkleMaterial.uniforms.time) {
			sparkleMaterial.uniforms.time.value = time;
		}

		for (let i = 0; i < positions.length; i += 3) {
			const originalY = positions[i + 1];
			positions[i + 1] = originalY + Math.sin(time + i * 0.1) * 0.3;
		}

		sparkleSystem.attributes.position.needsUpdate = true;
	}

	// Animation loop
	let animationId: number;
	function animate() {
		animateParticles();
		animateSparkles();
		animationId = requestAnimationFrame(animate);
	}

	onMount(() => {
		animate();
		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	});

	$effect(() => {
		if (!browser || !gsapInstance) return;

		gsapInstance.to(lightPosition, {
			x: mouseX * 8,
			y: mouseY * 8,
			duration: 1.2,
			ease: 'power2.out'
		});

		gsapInstance.to(sceneRotation, {
			x: mouseY * 0.08,
			y: mouseX * 0.08,
			duration: 2.5,
			ease: 'power1.out'
		});

		// Animate additional light based on scroll
		const scrollProgress = Math.min(scrollY / 500, 1);
		gsapInstance.to(additionalLight, {
			x: mouseX * 6 + Math.sin(Date.now() * 0.001) * 3,
			y: mouseY * 6 + Math.cos(Date.now() * 0.001) * 2,
			intensity: scrollProgress * 4,
			duration: 1.5,
			ease: 'power2.out'
		});
	});

	onMount(async () => {
		if (!browser) return;

		const gsap = (await import('gsap')).default;
		gsapInstance = gsap;

		// Check if mobile
		const checkMobile = () => {
			isMobile = window.innerWidth <= 768;
			const isPortrait = window.innerHeight > window.innerWidth;

			if (isPortrait && isMobile) {
				logoScale = 0.02;
				cameraZ = 23;
			} else if (isMobile) {
				logoScale = 0.022;
				cameraZ = 22;
			} else {
				logoScale = 0.0167;
				cameraZ = 20;
			}
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		const handleScroll = () => {
			scrollY = window.scrollY;
			const isPortrait = window.innerHeight > window.innerWidth;
			let baseZ = 20;

			if (isPortrait && isMobile) {
				baseZ = 23;
			} else if (isMobile) {
				baseZ = 22;
			}

			const zoomAmount = Math.min(scrollY / 150, 3);
			gsap.to({ value: cameraZ }, {
				value: baseZ - zoomAmount,
				duration: 0.5,
				ease: 'power2.out',
				onUpdate: function() {
					cameraZ = this.targets()[0].value;
				}
			});

			// Animate particles based on scroll
			if (particleMaterial && particleMaterial.uniforms && particleMaterial.uniforms.opacity) {
				const scrollProgress = Math.min(scrollY / 300, 1);
				console.log('Animating particles opacity to:', scrollProgress * 0.8);
				gsap.to(particleMaterial.uniforms.opacity, {
					value: scrollProgress * 0.8,
					duration: 0.8,
					ease: 'power2.out'
				});
			}

			// Animate sparkles based on scroll
			if (sparkleMaterial && sparkleMaterial.uniforms && sparkleMaterial.uniforms.opacity) {
				const scrollProgress = Math.min(scrollY / 200, 1);
				console.log('Animating sparkles opacity to:', scrollProgress * 0.6);
				gsap.to(sparkleMaterial.uniforms.opacity, {
					value: scrollProgress * 0.6,
					duration: 1.0,
					ease: 'power2.out'
				});
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', checkMobile);
		};
	});

	onMount(async () => {
		const textureLoader = new THREE.TextureLoader();

		const [
			concreteBase, concreteNorm, concreteRough, concreteAo,
			goldBase, goldNorm, goldRough, goldMetal, goldAo
		] = await Promise.all([
			textureLoader.loadAsync(concreteBaseColor),
			textureLoader.loadAsync(concreteNormal),
			textureLoader.loadAsync(concreteRoughness),
			textureLoader.loadAsync(concreteAO),
			textureLoader.loadAsync(goldBaseColor),
			textureLoader.loadAsync(goldNormal),
			textureLoader.loadAsync(goldRoughness),
			textureLoader.loadAsync(goldMetallic),
			textureLoader.loadAsync(goldAO)
		]);

		[concreteBase, concreteNorm, concreteRough, concreteAo].forEach(tex => {
			tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
			tex.repeat.set(2, 2);
		});

		concreteTexture = concreteBase;
		concreteNormalMap = concreteNorm;
		concreteRoughnessMap = concreteRough;
		concreteAOMap = concreteAo;

		goldTexture = goldBase;
		goldNormalMap = goldNorm;
		goldRoughnessMap = goldRough;
		goldMetallicMap = goldMetal;
		goldAOMap = goldAo;

		texturesLoaded = true;

		// Create particle systems
		createParticleSystem();
		createSparkleSystem();

		const loader = new SVGLoader();

		try {
			const data = await loader.loadAsync(logo);
			const tempShapes: THREE.ShapeGeometry[] = [];
			const group = new THREE.Group();

			for (let i = 0; i < data.paths.length; i++) {
				const path = data.paths[i];
				const shapes = SVGLoader.createShapes(path);

				for (let j = 0; j < shapes.length; j++) {
					const shape = shapes[j];
					const geometry = new THREE.ShapeGeometry(shape);
					tempShapes.push(geometry);
					const mesh = new THREE.Mesh(geometry);
					group.add(mesh);
				}
			}

			const box = new THREE.Box3().setFromObject(group);
			const center = box.getCenter(new THREE.Vector3());
			logoCenter = { x: center.x, y: center.y };

			logoShapes = tempShapes;
		} catch (error) {
			console.error('Error loading SVG:', error);
		}
	});
</script>

<T.Color attach="background" args={[0x000000]} />

<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} />

<T.AmbientLight intensity={0.15} />
<T.PointLight position={[lightPosition.x, lightPosition.y, lightPosition.z]} intensity={8} distance={50} decay={0.8} />
<T.PointLight position={[additionalLight.x, additionalLight.y, additionalLight.z]} intensity={additionalLight.intensity} distance={30} decay={1.2} color={0xd4af37} />
<T.DirectionalLight position={[8, 8, 8]} intensity={1.0} />
<T.DirectionalLight position={[-5, -3, 5]} intensity={0.5} />

<T.Group rotation={[sceneRotation.x, sceneRotation.y, 0]}>
	{#if texturesLoaded && concreteTexture}
		<T.Mesh position={[0, 0, -2]} receiveShadow>
			<T.PlaneGeometry args={[50, 50]} />
			<T.MeshStandardMaterial
				map={concreteTexture}
				normalMap={concreteNormalMap}
				normalScale={[2, 2]}
				roughnessMap={concreteRoughnessMap}
				roughness={0.9}
				aoMap={concreteAOMap}
				aoMapIntensity={4.0}
				color={0x151515}
			/>
		</T.Mesh>
	{/if}

	<!-- Particle Systems -->
	{#if particles}
		<T is={particles} />
	{/if}
	
	{#if sparkles}
		<T is={sparkles} />
	{/if}

	<T.Group scale={[logoScale, -logoScale, 1]} position={[-logoCenter.x * logoScale, logoCenter.y * logoScale + 0.8, 0]}>
		{#each logoShapes as geometry}
			<T.Mesh {geometry} castShadow>
				<T.MeshStandardMaterial
					color={0xd4af37}
					metalness={0.9}
					roughness={0.2}
					envMapIntensity={1.5}
					side={THREE.DoubleSide}
				/>
			</T.Mesh>
		{/each}
	</T.Group>
</T.Group>
