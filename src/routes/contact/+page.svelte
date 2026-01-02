<script lang="ts">
	import { page } from '$app/state';
	import { getLocaleFromPath, getTranslations, getTranslation } from '$lib/i18n';

	let translations = $state<any>({});

	$effect(() => {
		const locale = getLocaleFromPath(page.url.pathname);
		loadData(locale);
	});

	async function loadData(locale: 'pl' | 'en' | 'de') {
		translations = await getTranslations(locale);
	}

	function t(path: string): string {
		return getTranslation(translations, path);
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		console.log('Form submitted:', Object.fromEntries(formData));
		// TODO: Implement actual form submission
		alert(t('pages.contact.form.successMessage'));
	}
</script>

<main>
	<div class="container">
		<section>
			<h1>{t('pages.contact.title')}</h1>
			<p class="text-muted" style="font-size: 1.5rem;">
				{t('pages.contact.subtitle')}
			</p>
		</section>

		<section>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
				<!-- Address -->
				<address>
					<h2>{t('pages.contact.address.title')}</h2>
					<p style="margin-top: 2rem; font-size: 1.125rem;">
						{t('pages.contact.address.street')}<br />
						{t('pages.contact.address.postal')}<br />
						{t('pages.contact.address.country')}
					</p>
				</address>

				<!-- Contact Form -->
				<div>
					<h2>{t('pages.contact.form.title')}</h2>
					<form onsubmit={handleSubmit} style="margin-top: 2rem;">
						<div style="margin-bottom: 1.5rem;">
							<label for="name" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
								{t('pages.contact.form.name')}
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
							/>
						</div>

						<div style="margin-bottom: 1.5rem;">
							<label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
								{t('pages.contact.form.email')}
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
							/>
						</div>

						<div style="margin-bottom: 1.5rem;">
							<label for="subject" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
								{t('pages.contact.form.subject')}
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								required
								style="width: 100%; padding: 0.75rem; border: 2px solid #d0d0d0; font-size: 1rem; font-family: inherit;"
							/>
						</div>

						<div style="margin-bottom: 1.5rem;">
							<label for="message" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
								{t('pages.contact.form.message')}
							</label>
							<textarea
								id="message"
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
							{t('pages.contact.form.submit')}
						</button>
					</form>
				</div>
			</div>
		</section>
	</div>
</main>

