<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Container from '$lib/components/Container.svelte';
	import { getTranslation } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: any } = $props();

	// Pool of Latin art quotes - longer phrases related to art
	const latinQuotes = [
		"Ars est celere artem et naturam imitari in omnibus operibus",
		"Pulchritudo splendor veritatis est et forma perfecta artis",
		"Natura artis magistra est sed ars naturam vincere potest",
		"Ars sine scientia nihil est omnino et scientia sine arte vana",
		"Forma dat esse rei et pulchritudo formam perficit in arte",
		"Nihil sine magno labore vita dedit mortalibus in arte praesertim",
		"Audentes fortuna iuvat timidosque repellit in omnibus artibus",
		"Veritas vos liberabit ab ignorantia et ars veritatem manifestat",
		"Per aspera ad astra ducit virtus et ars stellas tangit",
		"Memento mori et carpe diem sed ars immortalis manet semper",
		"Vanitas vanitatum et omnia vanitas sed ars aeterna permanet",
		"Sic transit gloria mundi sed ars gloriam transcendit temporalem",
		"Ars poetica est ars vivendi et vivere est creare perpetuo",
		"In vino veritas in arte libertas in silentio sapientia",
		"Cogito ergo sum et creo ergo vivo in arte semper",
		"Tabula rasa mentis creativae est initium omnis artis novae",
		"Terra incognita artis novae semper exploratores quaerit audaces",
		"Status quo non est ars sed mors artis et creativitatis",
		"Magnum opus vitae meae est ars quam mundo relinquo",
		"Deus ex machina artis est inspiratio divina in homine",
		"Sine qua non artis verae est passio et dedicatio totalis",
		"Tempus fugit sed ars manet et memoriam humanam conservat",
		"Vox populi vox artis est quando populus artem intelligit",
		"Astra inclinant non necessitant sed ars fatum vincere potest",
		"Fortuna caeca est sed ars oculos aperit et veritatem ostendit",
		"Mens sana in corpore sano in arte perfecta se manifestat",
		"Carpe diem et crea semper quia vita brevis ars longa est",
		"Omnia vincit amor et nos cedamus amori artis et pulchritudinis",
		"Docendo discimus et creando nos ipsos in arte perficimus",
		"Errare humanum est sed in arte errores novam viam aperiunt"
	];

	// Function to get random quote
	function getRandomQuote(): string {
		return latinQuotes[Math.floor(Math.random() * latinQuotes.length)];
	}

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

<style>
	/* Poster Typography for Support Page */
	
	/* Elegant Latin Separators */
	.latin-separator {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: var(--space-2xl) 0;
		gap: 4px;
	}

	.latin-separator.center {
		align-items: center;
	}

	.separator-line {
		width: 200px;
		height: 1px;
		background: var(--color-graphite);
		opacity: 0.4;
	}

	.latin-quote {
		font-family: var(--font-sans);
		font-size: 0.65rem;
		font-style: normal !important;
		font-weight: 400;
		color: var(--color-graphite-light);
		opacity: 0.6;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin: 0;
	}

	/* Poster Sections */
	.poster-section {
		padding: calc(var(--space-2xl) * 2) 0;
		background: white;
	}

	/* Hero Typography */
	.support-hero {
		text-align: left;
		max-width: none;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(3rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-xl) 0;
		text-transform: uppercase;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.125rem, 2.5vw, 1.5rem);
		line-height: 1.4;
		color: var(--color-graphite);
		max-width: 65ch;
		margin: 0 0 var(--space-lg) 0;
		font-weight: 400;
	}

	.hero-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.5;
		color: var(--color-graphite);
		max-width: 65ch;
		margin: 0;
		font-weight: 400;
	}

	/* Support Options Grid */
	.support-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: calc(var(--space-2xl) * 1.5);
		margin: var(--space-2xl) 0;
	}

	.support-card {
		background: white;
		padding: 0;
	}

	.support-card-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2.25rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-sm) 0;
		text-transform: uppercase;
	}

	.support-card-subtitle {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-graphite-light);
		margin: 0 0 var(--space-lg) 0;
	}

	.support-card-description {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.5;
		color: var(--color-graphite);
		margin: 0 0 var(--space-lg) 0;
		font-weight: 400;
	}

	.support-points {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.support-point {
		font-family: var(--font-serif);
		font-size: 0.9rem;
		line-height: 1.4;
		color: var(--color-graphite);
		margin: 0 0 var(--space-sm) 0;
		padding-left: var(--space-md);
		position: relative;
		font-weight: 400;
	}

	.support-point::before {
		content: "—";
		position: absolute;
		left: 0;
		color: var(--color-graphite-light);
	}

	/* Form Section */
	.form-section {
		max-width: 600px;
		margin: 0 auto;
	}

	.form-section h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.5rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
		text-align: center;
	}

	.form-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.5;
		color: var(--color-graphite);
		margin: 0 0 var(--space-2xl) 0;
		font-weight: 400;
		text-align: center;
		max-width: 65ch;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: var(--space-2xl);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		text-align: left;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.form-label {
		font-family: var(--font-sans);
		font-weight: 400;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-graphite-light);
		margin: 0;
	}

	.form-input {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.4;
		color: var(--color-graphite-dark);
		background: white;
		border: 1px solid var(--color-graphite);
		padding: var(--space-md);
		transition: border-color 0.2s ease;
		font-weight: 400;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--color-graphite-dark);
	}

	.form-textarea {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.4;
		color: var(--color-graphite-dark);
		background: white;
		border: 1px solid var(--color-graphite);
		padding: var(--space-md);
		transition: border-color 0.2s ease;
		font-weight: 400;
		resize: vertical;
		min-height: 120px;
	}

	.form-textarea:focus {
		outline: none;
		border-color: var(--color-graphite-dark);
	}

	.form-submit {
		display: inline-block;
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-graphite-dark);
		background: var(--color-gold);
		border: 1px solid var(--color-gold);
		padding: var(--space-md) var(--space-xl);
		cursor: pointer;
		transition: all 0.2s ease;
		align-self: center;
	}

	.form-submit:hover {
		background: var(--color-gold-dark);
		border-color: var(--color-gold-dark);
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.support-grid {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}

		.support-hero {
			text-align: left;
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section">
	<Container>
		<div class="support-hero">
			<h1 class="hero-title">{t('pages.support.title')}</h1>
			<p class="hero-subtitle">{t('pages.support.subtitle')}</p>
			<p class="hero-intro">{t('pages.support.intro.text')}</p>
		</div>
		<div class="latin-separator">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
	</Container>
</section>

<!-- Support Options Section -->
<section class="poster-section">
	<Container>
		<div class="support-grid">
			<!-- Institutional Partners -->
			<article class="support-card">
				<h3 class="support-card-title">{t('pages.support.partners.title')}</h3>
				<p class="support-card-subtitle">{t('pages.support.partners.subtitle')}</p>
				<p class="support-card-description">
					{t('pages.support.partners.description')}
				</p>
				<ul class="support-points">
					{#if data.translations.pages?.support?.partners?.points}
						{#each data.translations.pages.support.partners.points as point}
							<li class="support-point">{point}</li>
						{/each}
					{/if}
				</ul>
			</article>

			<!-- Internships -->
			<article class="support-card">
				<h3 class="support-card-title">{t('pages.support.internships.title')}</h3>
				<p class="support-card-subtitle">{t('pages.support.internships.subtitle')}</p>
				<p class="support-card-description">
					{t('pages.support.internships.description')}
				</p>
				<ul class="support-points">
					{#if data.translations.pages?.support?.internships?.points}
						{#each data.translations.pages.support.internships.points as point}
							<li class="support-point">{point}</li>
						{/each}
					{/if}
				</ul>
			</article>

			<!-- Artists Support -->
			<article class="support-card">
				<h3 class="support-card-title">{t('pages.support.artists.title')}</h3>
				<p class="support-card-subtitle">{t('pages.support.artists.subtitle')}</p>
				<p class="support-card-description">
					{t('pages.support.artists.description')}
				</p>
				<ul class="support-points">
					{#if data.translations.pages?.support?.artists?.points}
						{#each data.translations.pages.support.artists.points as point}
							<li class="support-point">{point}</li>
						{/each}
					{/if}
				</ul>
			</article>
		</div>
	</Container>
</section>

<!-- Contact Form Section -->
<section class="poster-section">
	<Container>
		<div class="latin-separator center">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
		<div class="form-section">
			<h2>{t('pages.support.form.title')}</h2>
			<p class="form-intro">{t('pages.support.cta.text')}</p>

			<form onsubmit={handleSubmit} class="contact-form">
				<div class="form-group">
					<label for="collab-name" class="form-label">
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

				<div class="form-group">
					<label for="collab-email" class="form-label">
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

				<div class="form-group">
					<label for="organization" class="form-label">
						{t('pages.support.form.organization')}
					</label>
					<input
						type="text"
						id="organization"
						name="organization"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="type" class="form-label">
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

				<div class="form-group">
					<label for="collab-message" class="form-label">
						{t('pages.support.form.message')}
					</label>
					<textarea
						id="collab-message"
						name="message"
						required
						rows={6}
						class="form-textarea"
					></textarea>
				</div>

				<button type="submit" class="form-submit">
					{t('pages.support.form.submit')}
				</button>
			</form>
		</div>
	</Container>
</section>