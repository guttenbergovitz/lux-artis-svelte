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
		console.log('Collaboration form submitted:', Object.fromEntries(formData));
		// TODO: Implement actual form submission
		alert(t('pages.support.form.successMessage'));
	}
</script>

<section class="bg-white" style="padding-top: calc(var(--baseline) * 8); padding-bottom: calc(var(--baseline) * 12);">
	<Container>
		<!-- Header -->
		<div style="margin-bottom: calc(var(--baseline) * 12); text-align: center;">
			<h1>{t('pages.support.title')}</h1>
			<p style="max-width: 65ch; margin-left: auto; margin-right: auto; margin-top: calc(var(--baseline) * 2);">
				{t('pages.support.subtitle')}
			</p>
			<p style="max-width: 65ch; margin-left: auto; margin-right: auto; margin-top: calc(var(--baseline) * 2);">
				{t('pages.support.intro.text')}
			</p>
		</div>

		<!-- Support Options Grid -->
		<div class="section-divider"></div>
		<div class="grid md:grid-cols-3" style="gap: calc(var(--baseline) * 8); margin-bottom: calc(var(--baseline) * 12);">
			<!-- Institutional Partners -->
			<article class="support-article">
				<div class="support-header">
					<h3 class="support-title">{t('pages.support.partners.title')}</h3>
					<p class="meta support-subtitle">{t('pages.support.partners.subtitle')}</p>
				</div>
				<div class="section-divider"></div>
				<p style="margin-bottom: calc(var(--baseline) * 2);">
					{t('pages.support.partners.description')}
				</p>
				<ul class="support-points-list">
					{#if data.translations.pages?.support?.partners?.points}
						{#each data.translations.pages.support.partners.points as point}
							<li class="support-point-item">{point}</li>
						{/each}
					{/if}
				</ul>
			</article>

			<!-- Internships -->
			<article class="support-article">
				<div class="support-header">
					<h3 class="support-title">{t('pages.support.internships.title')}</h3>
					<p class="meta support-subtitle">{t('pages.support.internships.subtitle')}</p>
				</div>
				<div class="section-divider"></div>
				<p style="margin-bottom: calc(var(--baseline) * 2);">
					{t('pages.support.internships.description')}
				</p>
				<ul class="support-points-list">
					{#if data.translations.pages?.support?.internships?.points}
						{#each data.translations.pages.support.internships.points as point}
							<li class="support-point-item">{point}</li>
						{/each}
					{/if}
				</ul>
			</article>

			<!-- Artists Support -->
			<article class="support-article">
				<div class="support-header">
					<h3 class="support-title">{t('pages.support.artists.title')}</h3>
					<p class="meta support-subtitle">{t('pages.support.artists.subtitle')}</p>
				</div>
				<div class="section-divider"></div>
				<p style="margin-bottom: calc(var(--baseline) * 2);">
					{t('pages.support.artists.description')}
				</p>
				<ul class="support-points-list">
					{#if data.translations.pages?.support?.artists?.points}
						{#each data.translations.pages.support.artists.points as point}
							<li class="support-point-item">{point}</li>
						{/each}
					{/if}
				</ul>
			</article>
		</div>

		<!-- Contact CTA -->
		<div class="section-divider"></div>
		<div style="margin-bottom: calc(var(--baseline) * 12); text-align: center;">
			<h2>{t('pages.support.form.title')}</h2>
			<p style="max-width: 65ch; margin-left: auto; margin-right: auto; margin-top: calc(var(--baseline) * 2); margin-bottom: calc(var(--baseline) * 6);">
				{t('pages.support.cta.text')}
			</p>

			<form onsubmit={handleSubmit} style="max-width: 600px; margin: 0 auto; text-align: left;">
				<div style="margin-bottom: calc(var(--baseline) * 3);">
					<label for="collab-name" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
						{t('pages.support.form.name')}
					</label>
					<input
						type="text"
						id="collab-name"
						name="name"
						required
						class="form-input"
					/>
				</div>

				<div style="margin-bottom: calc(var(--baseline) * 3);">
					<label for="collab-email" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
						{t('pages.support.form.email')}
					</label>
					<input
						type="email"
						id="collab-email"
						name="email"
						required
						class="form-input"
					/>
				</div>

				<div style="margin-bottom: calc(var(--baseline) * 3);">
					<label for="organization" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
						{t('pages.support.form.organization')}
					</label>
					<input
						type="text"
						id="organization"
						name="organization"
						class="form-input"
					/>
				</div>

				<div style="margin-bottom: calc(var(--baseline) * 3);">
					<label for="type" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
						{t('pages.support.form.type')}
					</label>
					<select
						id="type"
						name="type"
						required
						class="form-input"
					>
						<option value="">{t('pages.support.form.typeOptions.select')}</option>
						<option value="partner">{t('pages.support.form.typeOptions.partner')}</option>
						<option value="internship">{t('pages.support.form.typeOptions.internship')}</option>
						<option value="artist">{t('pages.support.form.typeOptions.artist')}</option>
						<option value="other">{t('pages.support.form.typeOptions.other')}</option>
					</select>
				</div>

				<div style="margin-bottom: calc(var(--baseline) * 3);">
					<label for="collab-message" class="meta" style="display: block; margin-bottom: calc(var(--baseline) * 1);">
						{t('pages.support.form.message')}
					</label>
					<textarea
						id="collab-message"
						name="message"
						required
						rows={6}
						class="form-input"
						style="resize: vertical;"
					></textarea>
				</div>

				<Button type="submit" color="yellow" style="font-family: var(--font-sans); font-weight: 300; color: var(--color-graphite-dark);">
					{t('pages.support.form.submit')}
				</Button>
			</form>
		</div>
	</Container>
</section>
