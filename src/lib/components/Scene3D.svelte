<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import logo from '$lib/assets/logo.svg';

	export let mouseX = 0;
	export let mouseY = 0;

	let logoShapes: THREE.ShapeGeometry[] = [];
	let logoCenter = { x: 0, y: 0 };

	onMount(async () => {
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

<!-- Grafitowe tło -->
<T.Color attach="background" args={[0x2c2c2c]} />

<T.PerspectiveCamera makeDefault position={[0, 0, 20]}>
	<OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={1} />

<T.Group scale={[0.02, -0.02, 1]} position={[-logoCenter.x * 0.02, logoCenter.y * 0.02, 0]}>
	{#each logoShapes as geometry}
		<T.Mesh {geometry}>
			<T.MeshBasicMaterial color={0xd4af37} side={THREE.DoubleSide} />
		</T.Mesh>
	{/each}
</T.Group>
