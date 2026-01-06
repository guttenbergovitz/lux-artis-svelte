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
	});

	onMount(async () => {
		if (!browser) return;

		const gsap = (await import('gsap')).default;
		gsapInstance = gsap;

		const handleScroll = () => {
			scrollY = window.scrollY;
			const zoomAmount = Math.min(scrollY / 150, 3);
			gsap.to({ value: cameraZ }, {
				value: 20 - zoomAmount,
				duration: 0.5,
				ease: 'power2.out',
				onUpdate: function() {
					cameraZ = this.targets()[0].value;
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
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
				aoMapIntensity={3.0}
				color={0x202020}
			/>
		</T.Mesh>
	{/if}

	<T.Group scale={[0.025, -0.025, 1]} position={[-logoCenter.x * 0.025, logoCenter.y * 0.025 + 0.8, 0]}>
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
