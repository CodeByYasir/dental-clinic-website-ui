/* =========================================
   BRIGHTSMILE DENTAL — STAT COUNTERS
   Animated count-up on scroll into view
   ========================================= */

export function initCounters() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, prefersReducedMotion);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el, instant) {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.countSuffix || '';
  const prefix = el.dataset.countPrefix || '';
  const duration = 2000;

  if (instant || isNaN(target)) {
    el.textContent = prefix + target.toLocaleString() + suffix;
    return;
  }

  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}
