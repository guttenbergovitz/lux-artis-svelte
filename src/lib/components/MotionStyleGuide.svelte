<script lang="ts">
	import MotionReveal from './MotionReveal.svelte';
	
	let { class: className = '' }: { class?: string } = $props();
</script>

<div class="motion-style-guide {className}">
	<MotionReveal type="section">
		<section class="guide-section">
			<h1>Modernist Motion System</h1>
			<p class="lead">Architectural motion design inspired by interwar poster discipline: restraint, structure, and purpose.</p>
		</section>
	</MotionReveal>

	<MotionReveal type="section" delay={200}>
		<section class="guide-section">
			<h2>Motion Vocabulary</h2>
			<p>Limited to exactly 3 animation primitives:</p>
			
			<div class="motion-examples">
				<MotionReveal type="stagger" staggerDelay={100}>
					<div class="example-grid">
						<div class="example-item">
							<h3>Style 1: Reveal</h3>
							<p>opacity 0→1 + translateY 12-32px → 0</p>
							<div class="timing">600-800ms, cubic-bezier ease-out</div>
						</div>
						
						<div class="example-item">
							<h3>Style 2: Wipe</h3>
							<p>clip-path reveal (left→right or bottom→top)</p>
							<div class="timing">700-1100ms, architectural easing</div>
						</div>
						
						<div class="example-item">
							<h3>Transition: Panel</h3>
							<p>Frame slide aligned to grid</p>
							<div class="timing">900-1400ms, restrained acceleration</div>
						</div>
					</div>
				</MotionReveal>
			</div>
		</section>
	</MotionReveal>

	<MotionReveal type="wipe" direction="left" delay={300}>
		<section class="guide-section">
			<h2>Timing & Easing</h2>
			<div class="timing-grid">
				<div class="timing-item">
					<h4>Element Reveal</h4>
					<div class="duration">350-550ms</div>
				</div>
				<div class="timing-item">
					<h4>Section Reveal</h4>
					<div class="duration">600-900ms</div>
				</div>
				<div class="timing-item">
					<h4>Page Transition</h4>
					<div class="duration">300-500ms</div>
				</div>
			</div>
			<p>Easing: Restrained cubic-bezier(0.25, 0.46, 0.45, 0.94) - no springs, no overshoot, no bounce.</p>
		</section>
	</MotionReveal>

	<MotionReveal type="section" delay={400}>
		<section class="guide-section">
			<h2>Usage Rules</h2>
			<MotionReveal type="stagger" staggerDelay={80}>
				<div class="rules-list">
					<div class="rule-item">
						<h4>Communicative Function</h4>
						<p>Every animation must reveal hierarchy, separate blocks, guide attention, or show sequence.</p>
					</div>
					
					<div class="rule-item">
						<h4>Editorial Staggering</h4>
						<p>Use stagger only inside a block, max 6-8 items, 60-120ms steps.</p>
					</div>
					
					<div class="rule-item">
						<h4>Structural Parallax</h4>
						<p>Only for typographic layers or geometric shapes. Small amplitude (0.1-0.3).</p>
					</div>
					
					<div class="rule-item">
						<h4>Scroll-jacking</h4>
						<p>Use sparingly for 1-3 narrative chapters. Always provide escape hatch.</p>
					</div>
				</div>
			</MotionReveal>
		</section>
	</MotionReveal>

	<MotionReveal type="section" delay={500}>
		<section class="guide-section">
			<h2>Accessibility</h2>
			<div class="accessibility-info">
				<h4>Reduced Motion Support</h4>
				<p>When <code>prefers-reduced-motion: reduce</code> is detected:</p>
				<ul>
					<li>All transforms disabled</li>
					<li>Only minimal opacity fades (300ms)</li>
					<li>No parallax effects</li>
					<li>No scroll-jacking</li>
				</ul>
			</div>
		</section>
	</MotionReveal>
</div>

<style>
	.motion-style-guide {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--space-2xl) var(--space-lg);
	}

	.guide-section {
		margin-bottom: calc(var(--space-2xl) * 2);
		padding-bottom: var(--space-2xl);
		border-bottom: 1px solid rgba(44, 44, 44, 0.1);
	}

	.guide-section:last-child {
		border-bottom: none;
	}

	h1 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(2.5rem, 6vw, 4rem);
		line-height: 0.95;
		letter-spacing: -0.01em;
		color: var(--color-graphite-dark);
		margin-bottom: var(--space-lg);
		text-transform: uppercase;
	}

	h2 {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		line-height: 1;
		color: var(--color-graphite-dark);
		margin-bottom: var(--space-md);
		text-transform: uppercase;
	}

	h3, h4 {
		font-family: var(--font-sans);
		font-weight: 700;
		color: var(--color-graphite-dark);
		text-transform: uppercase;
		margin-bottom: var(--space-sm);
	}

	.lead {
		font-family: var(--font-serif);
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		line-height: 1.3;
		color: var(--color-graphite);
		margin-bottom: var(--space-xl);
		max-width: 60ch;
	}

	.example-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--space-xl);
		margin-top: var(--space-lg);
	}

	.example-item {
		padding: var(--space-lg);
		border: 1px solid var(--color-graphite);
		background: rgba(212, 175, 55, 0.05);
	}

	.timing {
		font-family: var(--font-sans);
		font-size: 0.875rem;
		color: var(--color-graphite-light);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-top: var(--space-sm);
	}

	.timing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-lg);
		margin: var(--space-lg) 0;
	}

	.timing-item {
		text-align: center;
		padding: var(--space-md);
		border-left: 3px solid var(--color-gold);
	}

	.duration {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 1.5rem;
		color: var(--color-graphite-dark);
		margin-top: var(--space-xs);
	}

	.rules-list {
		display: grid;
		gap: var(--space-lg);
		margin-top: var(--space-lg);
	}

	.rule-item {
		padding-left: var(--space-lg);
		border-left: 3px solid var(--color-graphite-dark);
	}

	.accessibility-info {
		background: rgba(44, 44, 44, 0.05);
		padding: var(--space-lg);
		border-radius: 4px;
	}

	.accessibility-info ul {
		margin-top: var(--space-sm);
		padding-left: var(--space-lg);
	}

	.accessibility-info li {
		margin-bottom: var(--space-xs);
		font-family: var(--font-serif);
		color: var(--color-graphite);
	}

	code {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.875rem;
		background: rgba(44, 44, 44, 0.1);
		padding: 2px 6px;
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		.example-grid,
		.timing-grid {
			grid-template-columns: 1fr;
		}
	}
</style>