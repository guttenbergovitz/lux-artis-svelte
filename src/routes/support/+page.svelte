<script lang="ts">
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

<main>
	<div class="page">
		<section class="section">
			<div class="container">
				<div class="content-block">
					<!-- Header -->
					<div class="content-block content-block--narrow content-block--center content-block__intro">
						<h1>{t('pages.support.title')}</h1>
						<p class="text-muted content-block__subtitle content-block__subtitle--large">
							{t('pages.support.subtitle')}
						</p>
						<p class="content-block__text">
							{t('pages.support.intro.text')}
						</p>
					</div>

					<!-- Support Options Grid -->
					<div class="grid grid--3 content-block__partners">
						<!-- Institutional Partners -->
						<article class="card">
							<div class="card__header">
								<h2 class="card__title">
									{t('pages.support.partners.title')}
								</h2>
								<p class="card__subtitle">
									{t('pages.support.partners.subtitle')}
								</p>
							</div>
							<div class="card__body">
								<p class="card__text mb-4">
									{t('pages.support.partners.description')}
								</p>
								<ul class="card__list">
									{#if data.translations.pages?.support?.partners?.points}
										{#each data.translations.pages.support.partners.points as point}
											<li>{point}</li>
										{/each}
									{/if}
								</ul>
							</div>
						</article>

						<!-- Internships -->
						<article class="card">
							<div class="card__header">
								<h2 class="card__title">
									{t('pages.support.internships.title')}
								</h2>
								<p class="card__subtitle">
									{t('pages.support.internships.subtitle')}
								</p>
							</div>
							<div class="card__body">
								<p class="card__text mb-4">
									{t('pages.support.internships.description')}
								</p>
								<ul class="card__list">
									{#if data.translations.pages?.support?.internships?.points}
										{#each data.translations.pages.support.internships.points as point}
											<li>{point}</li>
										{/each}
									{/if}
								</ul>
							</div>
						</article>

						<!-- Artists Support -->
						<article class="card">
							<div class="card__header">
								<h2 class="card__title">
									{t('pages.support.artists.title')}
								</h2>
								<p class="card__subtitle">
									{t('pages.support.artists.subtitle')}
								</p>
							</div>
							<div class="card__body">
								<p class="card__text mb-4">
									{t('pages.support.artists.description')}
								</p>
								<ul class="card__list">
									{#if data.translations.pages?.support?.artists?.points}
										{#each data.translations.pages.support.artists.points as point}
											<li>{point}</li>
										{/each}
									{/if}
								</ul>
							</div>
						</article>
					</div>

					<!-- Contact CTA -->
					<div class="content-block content-block--narrow content-block--center mt-12">
						<h2>{t('pages.support.form.title')}</h2>
						<p class="text-lg mb-8">
							{t('pages.support.cta.text')}
						</p>

						<form onsubmit={handleSubmit} style="text-align: left; max-width: 600px; margin: 0 auto;">
							<div style="margin-bottom: 1.5rem;">
								<label for="collab-name" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
									{t('pages.support.form.name')}
								</label>
								<input
									type="text"
									id="collab-name"
									name="name"
									required
									style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
								/>
							</div>

							<div style="margin-bottom: 1.5rem;">
								<label for="collab-email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
									{t('pages.support.form.email')}
								</label>
								<input
									type="email"
									id="collab-email"
									name="email"
									required
									style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
								/>
							</div>

							<div style="margin-bottom: 1.5rem;">
								<label for="organization" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
									{t('pages.support.form.organization')}
								</label>
								<input
									type="text"
									id="organization"
									name="organization"
									style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
								/>
							</div>

							<div style="margin-bottom: 1.5rem;">
								<label for="type" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
									{t('pages.support.form.type')}
								</label>
								<select
									id="type"
									name="type"
									required
									style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
								>
									<option value="">{t('pages.support.form.typeOptions.select')}</option>
									<option value="partner">{t('pages.support.form.typeOptions.partner')}</option>
									<option value="internship">{t('pages.support.form.typeOptions.internship')}</option>
									<option value="artist">{t('pages.support.form.typeOptions.artist')}</option>
									<option value="other">{t('pages.support.form.typeOptions.other')}</option>
								</select>
							</div>

							<div style="margin-bottom: 1.5rem;">
								<label for="collab-message" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
									{t('pages.support.form.message')}
								</label>
								<textarea
									id="collab-message"
									name="message"
									required
									rows={6}
									style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit; resize: vertical;"
								></textarea>
							</div>

							<button
								type="submit"
								style="padding: 1rem 2rem; background: #000; color: #fff; border: none; font-size: 1rem; font-weight: 600; cursor: pointer; font-family: inherit;"
							>
								{t('pages.support.form.submit')}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</main>

