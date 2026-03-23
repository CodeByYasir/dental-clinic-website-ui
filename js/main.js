/* =========================================
   BRIGHTSMILE DENTAL — MAIN BOOTSTRAPPER
   Nav/footer injection + module init
   ========================================= */

import { getNavHTML, getFooterHTML, initNav } from './nav.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initModals } from './modal.js';

// ── Inject shared nav and footer ──
const navContainer = document.getElementById('nav-container');
const footerContainer = document.getElementById('footer-container');

if (navContainer) {
  navContainer.innerHTML = getNavHTML();
}

if (footerContainer) {
  footerContainer.innerHTML = getFooterHTML();
}

// ── Initialize universal modules ──
document.addEventListener('DOMContentLoaded', async () => {
  // Universal
  initNav();
  initScrollReveal();
  initModals();

  // ── Page-specific inits ──
  const body = document.body;
  const page = body.dataset.page;

  if (page === 'home') {
    const { initTestimonialSlider } = await import('./slider.js');
    const { initCounters } = await import('./counters.js');
    initTestimonialSlider('#testimonials-slider');
    initCounters();
  }

  if (page === 'booking') {
    const { initBookingForm } = await import('./form.js');
    initBookingForm();
  }

  if (page === 'services') {
    initServiceTabs();
  }

  if (page === 'pricing') {
    initPricingTabs();
    const { initAccordion } = await import('./accordion.js');
    initAccordion('#financing-accordion', false);
    initAccordion('#billing-accordion', false);
    // Out-of-network simple toggle
    const oonBtn = document.getElementById('oon-btn');
    const oonDetails = document.getElementById('oon-details');
    if (oonBtn && oonDetails) {
      oonBtn.addEventListener('click', () => {
        const expanded = oonBtn.getAttribute('aria-expanded') === 'true';
        oonBtn.setAttribute('aria-expanded', String(!expanded));
        oonDetails.style.maxHeight = expanded ? '0' : oonDetails.scrollHeight + 'px';
      });
    }
    // Insurance verify modal trigger
    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        import('./modal.js').then(({ openModal }) => openModal(btn.dataset.modal));
      });
    });
  }

  if (page === 'gallery') {
    const { initGallery } = await import('./gallery.js');
    initGallery();
  }

  if (page === 'resources') {
    const { initAccordion } = await import('./accordion.js');
    initAccordion('.accordion', true);
    initResourceTabs();
  }

  if (page === 'about') {
    // No special JS needed
  }

  if (page === 'contact') {
    initContactForm();
    initDirectionsTabs();
  }
});

// ── Services Tab Switching ──
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.services-tabs__btn');
  const panels = document.querySelectorAll('.service-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });

      panels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(target);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
        targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Keyboard
    btn.addEventListener('keydown', (e) => {
      const btns = Array.from(tabBtns);
      const i = btns.indexOf(btn);
      if (e.key === 'ArrowLeft' && i > 0) {
        btns[i - 1].click(); btns[i - 1].focus();
      }
      if (e.key === 'ArrowRight' && i < btns.length - 1) {
        btns[i + 1].click(); btns[i + 1].focus();
      }
    });
  });

  // Check URL hash for direct tab linking
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const targetBtn = document.querySelector(`[data-tab="${hash}"]`);
    if (targetBtn) targetBtn.click();
  }
}

// ── Pricing Tab Switching ──
function initPricingTabs() {
  const tabBtns = document.querySelectorAll('.pricing-tab-btn');
  const panels = document.querySelectorAll('.pricing-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); b.tabIndex = -1; });
      panels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      btn.tabIndex = 0;
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('is-active');
    });

    btn.addEventListener('keydown', (e) => {
      const btns = Array.from(tabBtns);
      const i = btns.indexOf(btn);
      if (e.key === 'ArrowLeft' && i > 0) { btns[i - 1].click(); btns[i - 1].focus(); }
      if (e.key === 'ArrowRight' && i < btns.length - 1) { btns[i + 1].click(); btns[i + 1].focus(); }
    });
  });
}

// ── Resources Tab Switching ──
function initResourceTabs() {
  const tabBtns = document.querySelectorAll('.resources-tab-btn');
  const panels = document.querySelectorAll('.resources-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => { p.classList.remove('is-active'); p.hidden = true; });

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(target);
      if (panel) { panel.classList.add('is-active'); panel.hidden = false; }
    });

    btn.addEventListener('keydown', (e) => {
      const btns = Array.from(tabBtns);
      const i = btns.indexOf(btn);
      if (e.key === 'ArrowLeft' && i > 0) { btns[i - 1].click(); btns[i - 1].focus(); }
      if (e.key === 'ArrowRight' && i < btns.length - 1) { btns[i + 1].click(); btns[i + 1].focus(); }
    });
  });
}

// ── Directions Tab Switching (contact page) ──
function initDirectionsTabs() {
  const tabBtns = document.querySelectorAll('.directions-tab-btn');
  const panels = document.querySelectorAll('.directions-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => { p.classList.remove('is-active'); p.hidden = true; });

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(target);
      if (panel) { panel.classList.add('is-active'); panel.hidden = false; }
    });

    btn.addEventListener('keydown', (e) => {
      const btns = Array.from(tabBtns);
      const i = btns.indexOf(btn);
      if (e.key === 'ArrowLeft' && i > 0) { btns[i - 1].click(); btns[i - 1].focus(); }
      if (e.key === 'ArrowRight' && i < btns.length - 1) { btns[i + 1].click(); btns[i + 1].focus(); }
    });
  });
}

// ── Contact Form ──
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('form-input--error');
        isValid = false;
      } else {
        field.classList.remove('form-input--error');
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        const successMsg = document.getElementById('contact-success');
        if (successMsg) {
          form.style.display = 'none';
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1200);
    }
  });
}
