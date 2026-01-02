import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',

			// Order matters: url → cookie → baseLocale as a sensible fallback
			strategy: ['url', 'cookie', 'baseLocale'],

			// Prefix for EVERY language (including default)
			urlPatterns: [
				{
					pattern: '/',
					localized: [
						['pl', '/pl'],
						['en', '/en'],
						['de', '/de']
					]
				},
				{
					pattern: '/about',
					localized: [
						['pl', '/pl/o-nas'],
						['en', '/en/about'],
						['de', '/de/uber-uns']
					]
				},
				{
					pattern: '/contact',
					localized: [
						['pl', '/pl/kontakt'],
						['en', '/en/contact'],
						['de', '/de/kontakt']
					]
				},
				{
					pattern: '/events',
					localized: [
						['pl', '/pl/wydarzenia'],
						['en', '/en/events'],
						['de', '/de/veranstaltungen']
					]
				},
				{
					pattern: '/people',
					localized: [
						['pl', '/pl/ludzie'],
						['en', '/en/people'],
						['de', '/de/team']
					]
				},
				{
					pattern: '/support',
					localized: [
						['pl', '/pl/wspolpraca'],
						['en', '/en/support'],
						['de', '/de/partner']
					]
				},
				{
					pattern: '/legal',
					localized: [
						['pl', '/pl/prawne'],
						['en', '/en/legal'],
						['de', '/de/impressum']
					]
				},
				{
					pattern: '/random',
					localized: [
						['pl', '/pl/losowa'],
						['en', '/en/random'],
						['de', '/de/zufallig']
					]
				},
				{
					pattern: '/events/:slug',
					localized: [
						['pl', '/pl/wydarzenia/:slug'],
						['en', '/en/events/:slug'],
						['de', '/de/veranstaltungen/:slug']
					]
				},
				{
					pattern: '/:path(.*)?',
					localized: [
						['pl', '/pl/:path(.*)?'],
						['en', '/en/:path(.*)?'],
						['de', '/de/:path(.*)?']
					]
				}
			],

			// Note: true only in serverless. Better NOT in a normal server.
			disableAsyncLocalStorage: true
		})
	],

	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
