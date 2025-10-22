/**
 * Scroll-based entrance animations
 * Respects prefers-reduced-motion for accessibility
 */

(function () {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, don't run animations
  if (prefersReducedMotion) {
    return;
  }

  // Configuration
  const config = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
    staggerDelay: 100, // Milliseconds between staggered animations
  };

  // Intersection Observer callback
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.animationDelay || 0;

        // Add slight delay before adding the visible class
        setTimeout(() => {
          element.classList.add('animate-in');
        }, delay);

        // Stop observing this element
        observer.unobserve(element);
      }
    });
  };

  // Create the observer
  const observer = new IntersectionObserver(observerCallback, {
    threshold: config.threshold,
    rootMargin: config.rootMargin,
  });

  // Function to initialize animations
  const initScrollAnimations = () => {
    // Find all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach((element, index) => {
      // Check if element is part of a stagger group
      const staggerGroup = element.closest('[data-stagger]');

      if (staggerGroup) {
        // Find all animated elements within this stagger group
        const groupElements = staggerGroup.querySelectorAll('[data-animate]');
        const elementIndex = Array.from(groupElements).indexOf(element);

        // Set stagger delay
        element.dataset.animationDelay = elementIndex * config.staggerDelay;
      }

      // Add the initial animation class
      element.classList.add('animate-before');

      // Observe the element
      observer.observe(element);
    });
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  // Re-initialize on Astro page transitions
  document.addEventListener('astro:page-load', () => {
    initScrollAnimations();
  });
})();
