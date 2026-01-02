<script lang="ts">
	import { getTranslation } from '$lib/i18n';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function getHomeUrl(locale: string): string {
		return localizeHref('/', { locale: locale as 'pl' | 'en' | 'de' });
	}
</script>

<main class="text-center mx-auto text-gray-700 p-4 max-w-2xl">
	<h1 class="text-4xl text-sky-700 font-thin uppercase my-8">
		{t('random')}
	</h1>

	<div class="text-left bg-gray-50 p-6 rounded-lg shadow-md my-8">
		<h2 class="text-2xl font-semibold text-sky-600 mb-4 text-center">
			{t('poem_title')}
		</h2>
		<p class="whitespace-pre-line text-lg leading-relaxed italic text-gray-800">
			{t('poem')}
		</p>
	</div>

	<p class="my-4">
		<a href={getHomeUrl(data.locale)} class="text-sky-600 hover:underline">
			{t('home')}
		</a>
	</p>
</main>

