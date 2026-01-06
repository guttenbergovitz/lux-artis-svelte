<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import logo from '$lib/assets/logo.svg';
	import concreteBaseColor from '$lib/assets/concrete1-bl/concrete1_Base_Color.png';
	import concreteNormal from '$lib/assets/concrete1-bl/concrete1_Normal-ogl.png';
	import concreteRoughness from '$lib/assets/concrete1-bl/concrete1_Roughness.png';
	import concreteAO from '$lib/assets/concrete1-bl/concrete1-ao.png';

	let { mouseX = 0, mouseY = 0 } = $props();

	let logoShapes: THREE.ShapeGeometry[] = $state([]);
	let logoCenter = $state({ x: 0, y: 0 });
	let concreteTexture = $state<THREE.Texture | undefined>(undefined);
	let concreteNormalMap = $state<THREE.Texture | undefined>(undefined);
	let concreteRoughnessMap = $state<THREE.Texture | undefined>(undefined);
	let concreteAOMap = $state<THREE.Texture | undefined>(undefined);
	let texturesLoaded = $state(false);

	onMount(async () => {
		const textureLoader = new THREE.TextureLoader();

		const [baseColor, normal, roughness, ao] = await Promise.all([
			textureLoader.loadAsync(concreteBaseColor),
			textureLoader.loadAsync(concreteNormal),
			textureLoader.loadAsync(concreteRoughness),
			textureLoader.loadAsync(concreteAO)
		]);

		[baseColor, normal, roughness, ao].forEach(tex => {
			tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
			tex.repeat.set(2, 2);
		});

		concreteTexture = baseColor;
		concreteNormalMap = normal;
		concreteRoughnessMap = roughness;
		concreteAOMap = ao;
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

<T.PerspectiveCamera makeDefault position={[0, 0, 20]}>
	<OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.025} />
<T.DirectionalLight position={[10, 10, 5]} intensity={0.125} castShadow />
<T.DirectionalLight position={[-5, -5, 3]} intensity={0.05} color={0x2222aa} />

{#if texturesLoaded && concreteTexture}
	<T.Mesh position={[0, 0, -5]} receiveShadow>
		<T.PlaneGeometry args={[50, 50]} />
		<T.MeshStandardMaterial
			map={concreteTexture}
			normalMap={concreteNormalMap}
			normalScale={[2, 2]}
			roughnessMap={concreteRoughnessMap}
			roughness={0.9}
			aoMap={concreteAOMap}
			aoMapIntensity={1.5}
		/>
	</T.Mesh>
{/if}

<T.Group scale={[0.02, -0.02, 1]} position={[-logoCenter.x * 0.02, logoCenter.y * 0.02, 0]}>
	{#each logoShapes as geometry}
		<T.Mesh {geometry}>
			<T.MeshBasicMaterial color={0xd4af37} side={THREE.DoubleSide} />
		</T.Mesh>
	{/each}
</T.Group>
