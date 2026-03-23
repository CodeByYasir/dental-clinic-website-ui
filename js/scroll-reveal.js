/* =========================================
   BRIGHTSMILE DENTAL — SCROLL REVEAL
   IntersectionObserver for .reveal elements
   ========================================= */

export function initScrollReveal() {
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Just show everything immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // one-shot
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '-40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}
