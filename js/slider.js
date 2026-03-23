/* =========================================
   BRIGHTSMILE DENTAL — TESTIMONIAL SLIDER
   Auto-play, swipe, ARIA-accessible
   ========================================= */

import { testimonials } from './data/testimonials.js';

export function initTestimonialSlider(containerSelector = '#testimonials-slider') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Build HTML
  container.innerHTML = buildSliderHTML();

  const track = container.querySelector('.slider__track');
  const slides = container.querySelectorAll('.slider__slide');
  const prevBtn = container.querySelector('.slider__prev');
  const nextBtn = container.querySelector('.slider__next');
  const dotsContainer = container.querySelector('.slider__dots');
  const liveRegion = container.querySelector('.slider__live');

  let current = 0;
  let autoPlayTimer = null;
  const total = slides.length;

  // Build dots
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider__dot';
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) {
      dot.setAttribute('aria-current', 'true');
      dot.classList.add('is-active');
    }
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider__dot');

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].removeAttribute('aria-current');

    current = (index + total) % total;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-current', 'true');

    // Update live region for screen readers
    const author = testimonials[current].author;
    liveRegion.textContent = `Now showing testimonial from ${author}`;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });

  // Keyboard
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoPlay(); }
  });

  // Touch/swipe
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
      resetAutoPlay();
    }
  }, { passive: true });

  // Auto-play
  function startAutoPlay() {
    autoPlayTimer = setInterval(next, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause on hover/focus
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  container.addEventListener('focusin', stopAutoPlay);
  container.addEventListener('focusout', startAutoPlay);

  // Init
  goTo(0);
  startAutoPlay();
}

function buildSliderHTML() {
  const slidesHTML = testimonials.map((t, i) => `
    <div class="slider__slide ${i === 0 ? 'is-active' : ''}" role="group" aria-roledescription="slide" aria-label="Testimonial ${i + 1} of ${testimonials.length}">
      <div class="testimonial-card">
        <div class="stars" aria-label="${t.rating} out of 5 stars">
          ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}
        </div>
        <blockquote class="testimonial-card__quote">
          ${t.quote}
        </blockquote>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar" aria-hidden="true" style="background: linear-gradient(135deg, ${t.color}, ${t.color}BB);">
            ${t.initials}
          </div>
          <div>
            <div class="testimonial-card__name">${t.author}</div>
            <div class="testimonial-card__role">${t.role}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="slider" role="region" aria-label="Patient testimonials" aria-roledescription="carousel">
      <div class="slider__track">
        ${slidesHTML}
      </div>
      <div class="slider__controls" aria-label="Slider controls">
        <button class="slider__prev btn btn--icon btn--outline" aria-label="Previous testimonial">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="slider__dots" role="tablist" aria-label="Testimonials navigation"></div>
        <button class="slider__next btn btn--icon btn--outline" aria-label="Next testimonial">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="slider__live sr-only" aria-live="polite" aria-atomic="true"></div>
    </div>
  `;
}
