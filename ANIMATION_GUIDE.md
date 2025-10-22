# Scroll Animation Guide

This site uses a simple, accessible scroll-based entrance animation system.

## How It Works

Elements fade in and slide up slightly (30px) as they enter the viewport while scrolling.

## Usage

### Single Element Animation

Add `data-animate` to any element you want to animate:

```html
<h1 data-animate>This heading will animate in</h1>
<p data-animate>This paragraph will animate in</p>
```

### Staggered Animations

For a group of elements that should animate in sequence, wrap them in a container with `data-stagger`:

```html
<div data-stagger>
  <h2 data-animate>Animates first</h2>
  <p data-animate>Animates second (100ms delay)</p>
  <p data-animate>Animates third (200ms delay)</p>
</div>
```

**Stagger delay:** 100ms between each element

## Animation Properties

- **Duration:** 0.6s
- **Timing:** ease-out
- **Effect:** fade + translateY(30px → 0)
- **Trigger:** When 10% of element is visible
- **Stagger:** 100ms delay between grouped elements

## Accessibility

✅ **Automatically respects `prefers-reduced-motion`**

Users who have motion sensitivity settings enabled will see content appear instantly without animation.

## Examples

### Section with heading and content
```html
<section>
  <h1 data-animate>Services</h1>
  <p data-animate>Our services include...</p>
</section>
```

### Grid with staggered items
```html
<div class="grid" data-stagger>
  <div data-animate>Item 1</div>
  <div data-animate>Item 2</div>
  <div data-animate>Item 3</div>
</div>
```

### Hero section
```html
<section class="hero">
  <div data-stagger>
    <h3 data-animate>Subtitle</h3>
    <h1 data-animate>Main Title</h1>
    <p data-animate>Description</p>
  </div>
</section>
```

## What NOT to Animate

- Navigation/header elements (they should be immediately visible)
- Footer content
- Critical above-the-fold content that must be seen immediately
- Interactive elements that need immediate interaction

## Browser Support

Works in all modern browsers. Gracefully degrades in older browsers (content appears without animation).

## Performance

The system uses IntersectionObserver API which is highly performant and only observes elements once. Once an element has animated in, it stops being observed.
