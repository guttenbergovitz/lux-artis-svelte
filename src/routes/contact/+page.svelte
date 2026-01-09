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
		console.log('Form submitted:', Object.fromEntries(formData));
		// TODO: Implement actual form submission
		alert(t('pages.contact.form.successMessage'));
	}
</script>

<style>
	/* Poster Typography for Contact Page */
	
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

	.poster-section.dark .separator-line {
		background: rgba(255, 255, 255, 0.4);
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

	.poster-section.dark .latin-quote {
		color: rgba(255, 255, 255, 0.6);
	}

	/* Poster Sections */
	.poster-section {
		padding: calc(var(--space-2xl) * 2) 0;
		background: white;
	}

	.poster-section.dark {
		background: var(--color-graphite-dark);
		color: white;
	}

	/* Hero Typography */
	.contact-hero {
		text-align: left;
		max-width: none;
	}

	.hero-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(3rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		color: white;
		margin: 0 0 var(--space-xl) 0;
		text-transform: uppercase;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		font-size: clamp(1.125rem, 2.5vw, 1.5rem);
		line-height: 1.4;
		color: rgba(255, 255, 255, 0.9);
		max-width: 65ch;
		margin: 0 0 var(--space-lg) 0;
		font-weight: 400;
	}

	.hero-intro {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.25rem);
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.85);
		max-width: 65ch;
		margin: 0;
		font-weight: 400;
	}

	/* Two Column Layout */
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--space-2xl) * 1.5);
		align-items: start;
		margin-top: var(--space-2xl);
	}

	/* Address Section */
	.address-section h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2.25rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.address-text {
		font-family: var(--font-serif);
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--color-graphite);
		margin: 0;
		font-weight: 400;
	}

	/* Form Section */
	.form-section h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.5rem, 4vw, 2.25rem);
		line-height: 1.1;
		color: var(--color-graphite-dark);
		margin: 0 0 var(--space-lg) 0;
		text-transform: uppercase;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
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
		align-self: flex-start;
	}

	.form-submit:hover {
		background: var(--color-gold-dark);
		border-color: var(--color-gold-dark);
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}

		.contact-hero {
			text-align: left;
		}
	}
</style>

<!-- Hero Section -->
<section class="poster-section dark">
	<Container>
		<div class="contact-hero">
			<h1 class="hero-title">{t('pages.contact.title')}</h1>
			<p class="hero-subtitle">{t('pages.contact.subtitle')}</p>
			<p class="hero-intro">
				{#if data.locale === 'pl'}
					Zapraszamy do bezpośredniego kontaktu. Każdą propozycję współpracy i pytanie rozpatrujemy indywidualnie. Jesteśmy otwarci na dialog i nowe możliwości.
				{:else if data.locale === 'en'}
					We invite you to contact us directly. We consider each collaboration proposal and question individually. We are open to dialogue and new possibilities.
				{:else if data.locale === 'de'}
					Wir laden Sie ein, uns direkt zu kontaktieren. Wir prüfen jeden Kooperationsvorschlag und jede Frage individuell. Wir sind offen für Dialog und neue Möglichkeiten.
				{/if}
			</p>
		</div>
		<div class="latin-separator">
			<div class="separator-line"></div>
			<p class="latin-quote">{getRandomQuote()}</p>
		</div>
	</Container>
</section>

<!-- Contact Content -->
<section class="poster-section">
	<Container>
		<div class="contact-grid">
			<!-- Address -->
			<div class="address-section">
				<h2>{t('pages.contact.address.title')}</h2>
				<p class="address-text">
					{t('pages.contact.address.street')}<br />
					{t('pages.contact.address.postal')}<br />
					{t('pages.contact.address.country')}
				</p>
			</div>

			<!-- Contact Form -->
			<div class="form-section">
				<h2>{t('pages.contact.form.title')}</h2>
				<form onsubmit={handleSubmit} class="contact-form">
					<div class="form-group">
						<label for="name" class="form-label">
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

					<div class="form-group">
						<label for="email" class="form-label">
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

					<div class="form-group">
						<label for="subject" class="form-label">
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

					<div class="form-group">
						<label for="message" class="form-label">
							{t('pages.contact.form.message')}
						</label>
						<textarea
							id="message"
							name="message"
							required
							class="form-textarea"
						></textarea>
					</div>

					<button type="submit" class="form-submit">
						{t('pages.contact.form.submit')}
					</button>
				</form>
			</div>
		</div>
	</Container>
</section>

