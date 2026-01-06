import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		enhancedImages(), // must come before the SvelteKit plugin
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
						['uk', '/uk'],
						['en', '/en'],
						['de', '/de']
					]
				},
				{
					pattern: '/about',
					localized: [
						['pl', '/pl/o-nas'],
						['uk', '/uk/pro-nas'],
						['en', '/en/about'],
						['de', '/de/uber-uns']
					]
				},
				{
					pattern: '/contact',
					localized: [
						['pl', '/pl/kontakt'],
						['uk', '/uk/kontakt'],
						['en', '/en/contact'],
						['de', '/de/kontakt']
					]
				},
				{
					pattern: '/events',
					localized: [
						['pl', '/pl/wydarzenia'],
						['uk', '/uk/podiyi'],
						['en', '/en/events'],
						['de', '/de/veranstaltungen']
					]
				},
				{
					pattern: '/people',
					localized: [
						['pl', '/pl/ludzie'],
						['uk', '/uk/lyudy'],
						['en', '/en/people'],
						['de', '/de/team']
					]
				},
				{
					pattern: '/support',
					localized: [
						['pl', '/pl/wspolpraca'],
						['uk', '/uk/spivpratsya'],
						['en', '/en/support'],
						['de', '/de/partner']
					]
				},
				{
					pattern: '/legal',
					localized: [
						['pl', '/pl/prawne'],
						['uk', '/uk/pravova-informatsiya'],
						['en', '/en/legal'],
						['de', '/de/impressum']
					]
				},
				{
					pattern: '/random',
					localized: [
						['pl', '/pl/losowa'],
						['uk', '/uk/vypadkova'],
						['en', '/en/random'],
						['de', '/de/zufallig']
					]
				},
				{
					pattern: '/events/:slug',
					localized: [
						['pl', '/pl/wydarzenia/:slug'],
						['uk', '/uk/podiyi/:slug'],
						['en', '/en/events/:slug'],
						['de', '/de/veranstaltungen/:slug']
					]
				},
				{
					pattern: '/:path(.*)?',
					localized: [
						['pl', '/pl/:path(.*)?'],
						['uk', '/uk/:path(.*)?'],
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
