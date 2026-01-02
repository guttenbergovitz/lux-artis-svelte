<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	function t(path: string): string {
		return getTranslation(data.translations, path);
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		console.log('Form submitted:', Object.fromEntries(formData));
		// TODO: Implement actual form submission
		alert(t('pages.contact.form.successMessage'));
	}
</script>

<section class="bg-white" style="padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>
		<!-- Hero -->
		<div style="margin-bottom: calc(var(--baseline) * 12); text-align: center;">
			<h1>{t('pages.contact.title')}</h1>
			<p style="max-width: 65ch; margin-left: auto; margin-right: auto; margin-top: calc(var(--baseline) * 2);">
				{t('pages.contact.subtitle')}
			</p>
			<p style="max-width: 65ch; margin-left: auto; margin-right: auto; margin-top: calc(var(--baseline) * 3);">
				{#if data.locale === 'pl'}
					Zapraszamy do bezpośredniego kontaktu. Każdą propozycję współpracy i pytanie rozpatrujemy indywidualnie. Jesteśmy otwarci na dialog i nowe możliwości.
				{:else if data.locale === 'en'}
					We invite you to contact us directly. We consider each collaboration proposal and question individually. We are open to dialogue and new possibilities.
				{:else if data.locale === 'de'}
					Wir laden Sie ein, uns direkt zu kontaktieren. Wir prüfen jeden Kooperationsvorschlag und jede Frage individuell. Wir sind offen für Dialog und neue Möglichkeiten.
				{/if}
			</p>
		</div>

		<div class="section-divider"></div>
		<div class="grid md:grid-cols-2" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
			<!-- Address -->
			<div>
				<h2 style="font-style: normal;">{t('pages.contact.address.title')}</h2>
				<p style="margin-top: calc(var(--baseline) * 4);">
					{t('pages.contact.address.street')}<br />
					{t('pages.contact.address.postal')}<br />
					{t('pages.contact.address.country')}
				</p>
			</div>

			<!-- Contact Form -->
			<div>
				<h2>{t('pages.contact.form.title')}</h2>
				<form onsubmit={handleSubmit} style="margin-top: calc(var(--baseline) * 4);">
					<div style="margin-bottom: calc(var(--baseline) * 3);">
						<label for="name" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
							{t('pages.contact.form.name')}
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="form-input"
						/>
					</div>

					<div style="margin-bottom: calc(var(--baseline) * 3);">
						<label for="email" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
							{t('pages.contact.form.email')}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="form-input"
						/>
					</div>

					<div style="margin-bottom: calc(var(--baseline) * 3);">
						<label for="subject" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
							{t('pages.contact.form.subject')}
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							required
							class="form-input"
						/>
					</div>

					<div style="margin-bottom: calc(var(--baseline) * 3);">
						<label for="message" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
							{t('pages.contact.form.message')}
						</label>
						<textarea
							id="message"
							name="message"
							required
							rows={6}
							class="form-input"
							style="resize: vertical;"
						></textarea>
					</div>

					<Button type="submit" color="yellow" style="font-family: var(--font-sans); font-weight: 300; color: var(--color-graphite-dark);">
						{t('pages.contact.form.submit')}
					</Button>
				</form>
			</div>
		</div>
	</Container>
</section>

