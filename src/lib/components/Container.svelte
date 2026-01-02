<script lang="ts">
	type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

	let { class: className = '', size = 'xl', children } = $props<{
		class?: string;
		size?: ContainerSize;
		children: import('svelte').Snippet;
	}>();

	function getSizeClass(s: ContainerSize): string {
		const sizeClasses: Record<ContainerSize, string> = {
			sm: 'max-w-screen-sm',
			md: 'max-w-screen-md',
			lg: 'max-w-screen-lg',
			xl: 'max-w-screen-xl',
			'2xl': 'max-w-screen-2xl',
			full: 'max-w-full'
		};
		return sizeClasses[s];
	}
</script>

<div class="mx-auto px-4 sm:px-6 lg:px-8 {getSizeClass(size || 'xl')} {className}">
	{@render children()}
</div>

