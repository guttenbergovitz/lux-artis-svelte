# Modernist Motion System

A motion design system inspired by interwar poster discipline: restraint, structure, and purpose.

## Motion Vocabulary (Limited to 3 Primitives)

### Style 1: Architectural Reveal
- **Usage**: Default element reveals, standard content
- **Motion**: `opacity 0→1` + `translateY 12-32px → 0`
- **Timing**: 600-800ms
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Variants**: 
  - `subtle`: 8px movement, 400ms
  - `standard`: 16px movement, 600ms  
  - `strong`: 32px movement, 800ms

### Style 2: Typographic Wipe
- **Usage**: Headlines, emphasis elements, editorial cuts
- **Motion**: `clip-path` reveal (left→right or bottom→top)
- **Timing**: 700-1100ms
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Directions**: `left`, `bottom`

### Transition Style: Panel Slide
- **Usage**: Section boundaries, scroll-jacked chapters
- **Motion**: Frame slides aligned to grid
- **Timing**: 900-1400ms
- **Easing**: Restrained acceleration curve

## Implementation

### Components

#### MotionReveal.svelte
```svelte
<MotionReveal type="reveal" intensity="standard">
  <h1>Content</h1>
</MotionReveal>
```

**Props:**
- `type`: `'reveal' | 'wipe' | 'section' | 'stagger' | 'parallax' | 'panel'`
- `intensity`: `'subtle' | 'standard' | 'strong'` (for reveal type)
- `direction`: `'left' | 'bottom' | 'up' | 'down'`
- `threshold`: Intersection threshold (default: 0.25)
- `delay`: Animation delay in ms
- `staggerDelay`: Delay between staggered items (default: 80ms)
- `maxStaggerItems`: Maximum items to stagger (default: 8)

#### ScrollJackSection.svelte
```svelte
<ScrollJackSection sections={['Hero', 'Mission', 'Values']}>
  <section data-scroll-section>Content 1</section>
  <section data-scroll-section>Content 2</section>
  <section data-scroll-section>Content 3</section>
</ScrollJackSection>
```

### CSS Classes

#### Motion Classes
- `.motion-reveal` - Standard reveal
- `.motion-reveal-subtle` - Subtle reveal (8px)
- `.motion-reveal-strong` - Strong reveal (32px)
- `.motion-wipe-left` - Left-to-right wipe
- `.motion-wipe-bottom` - Bottom-to-top wipe
- `.section-transition` - Section boundary transition
- `.stagger-container` - Container for staggered items
- `.stagger-item` - Individual staggered element

#### Utility Classes
- `.motion-hover` - Restrained hover effect
- `.motion-focus` - Accessible focus state
- `.parallax-text` - Structural parallax

## Usage Rules

### 1. Communicative Function
Every animation must serve a purpose:
- **Reveal hierarchy**: Headlines appear before body text
- **Separate blocks**: Section transitions mark content boundaries  
- **Guide attention**: Stagger draws eye through sequence
- **Show sequence**: Narrative flow in scroll-jacked sections

### 2. Editorial Staggering
- Use only inside content blocks, not across entire page
- Maximum 6-8 items per stagger group
- 60-120ms delay between items
- Never cascade everything - maintain editorial restraint

### 3. Structural Parallax
- Only for typographic layers or geometric elements
- Small amplitude (0.1-0.3 intensity)
- No scenic backgrounds or decorative elements
- Must serve layout hierarchy

### 4. Scroll-jacking Guidelines
- Use sparingly: 1-3 narrative chapters maximum
- Always provide escape hatch (continue scrolling exits)
- Never hijack entire page navigation
- Include visual indicators for user orientation

## Timing & Easing

### Duration Guidelines
- **Element reveals**: 350-550ms
- **Section transitions**: 600-900ms  
- **Page transitions**: 300-500ms
- **Scroll-jack panels**: 900-1400ms

### Easing Philosophy
- **Mechanical/architectural feel**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **No springs, bounce, or overshoot**
- **Restrained acceleration curves**
- **Immediate readability priority**

## Accessibility

### Reduced Motion Support
When `prefers-reduced-motion: reduce` is detected:
- All transforms disabled
- Only minimal opacity fades (300ms)
- No parallax effects
- No scroll-jacking
- Stagger delays removed

### Performance
- GPU-friendly transforms only (`transform`, `opacity`)
- `will-change` optimization during animation
- Passive scroll listeners
- IntersectionObserver for triggers

## Quality Checklist

✅ **Motion serves layout + hierarchy, not decoration**
✅ **Limited to 3 animation primitives maximum**
✅ **Timing feels mechanical/architectural (150-1400ms)**
✅ **No bouncy, elastic, or playful easing**
✅ **Parallax is structural, not scenic**
✅ **Scroll-jacking used sparingly with escape hatch**
✅ **Page feels printable (motion is added layer)**
✅ **Respects prefers-reduced-motion**
✅ **60fps performance on mid-range devices**

## Examples

### Section Reveal Sequence
```svelte
<!-- Headline leads -->
<MotionReveal type="wipe" direction="left">
  <h2>Section Title</h2>
</MotionReveal>

<!-- Supporting text follows -->
<MotionReveal type="reveal" delay={200}>
  <p>Supporting content...</p>
</MotionReveal>

<!-- Meta information last -->
<MotionReveal type="reveal" intensity="subtle" delay={400}>
  <div class="meta">Additional details</div>
</MotionReveal>
```

### Editorial Stagger
```svelte
<MotionReveal type="stagger" staggerDelay={100} maxStaggerItems={4}>
  <div class="content-blocks">
    <article>Block 1</article>
    <article>Block 2</article>
    <article>Block 3</article>
    <article>Block 4</article>
  </div>
</MotionReveal>
```

### Narrative Scroll-jacking
```svelte
<ScrollJackSection sections={['Intro', 'Development', 'Conclusion']}>
  <section data-scroll-section>
    <MotionReveal type="panel" direction="up">
      <h1>Chapter 1</h1>
    </MotionReveal>
  </section>
  
  <section data-scroll-section>
    <MotionReveal type="panel" direction="up">
      <h1>Chapter 2</h1>
    </MotionReveal>
  </section>
</ScrollJackSection>
```

This motion system maintains the artistic/technical modernism aesthetic while providing purposeful, structural animation that enhances rather than decorates the content.