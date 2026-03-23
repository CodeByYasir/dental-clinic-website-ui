/* =========================================
   BRIGHTSMILE DENTAL — NAVIGATION JS
   Sticky scroll, hamburger, active link
   ========================================= */

export function getNavHTML() {
  return `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div class="emergency-banner" id="emergency-banner" role="banner" aria-label="Dental emergency information">
      <div class="emergency-banner__text">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <strong>Dental Emergency?</strong><span class="banner-detail">&nbsp;Same-day appointments available — Call us now:</span>&nbsp;
        <a href="tel:+15551234567" class="emergency-banner__phone">(555) 123-4567</a>
      </div>
      <button class="emergency-banner__close" id="emergency-banner-close" aria-label="Dismiss emergency banner">
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <nav class="nav" id="main-nav-bar" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">
        <a href="index.html" class="nav__logo" aria-label="BrightSmile Dental - Home">
          <div class="nav__logo-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#0D9488"/><path d="M16 6C13 6 10 8.5 10 11.5c0 1.5.5 3 1 4.5 1 2.5 1 5 2 8 .4 1.2.8 2 2 2 .8 0 1.3-.7 1.7-2l.3-1.2.3 1.2c.4 1.3.9 2 1.7 2 1.2 0 1.6-.8 2-2 1-3 1-5.5 2-8 .5-1.5 1-3 1-4.5C24 8.5 21 6 16 6z" fill="white"/></svg>
          </div>
          <div>
            <span class="nav__logo-text">BrightSmile</span>
            <span class="nav__logo-sub">Dental</span>
          </div>
        </a>
        <ul class="nav__links" role="list" id="nav-desktop-links">
          <li><a href="index.html" class="nav__link" data-page="home">Home</a></li>
          <li><a href="about.html" class="nav__link" data-page="about">About Us</a></li>
          <li><a href="services.html" class="nav__link" data-page="services">Services</a></li>
          <li><a href="gallery.html" class="nav__link" data-page="gallery">Gallery</a></li>
          <li><a href="pricing.html" class="nav__link" data-page="pricing">Pricing</a></li>
          <li><a href="resources.html" class="nav__link" data-page="resources">Patient Info</a></li>
          <li><a href="contact.html" class="nav__link" data-page="contact">Contact</a></li>
        </ul>
        <div class="nav__actions">
          <a href="tel:+15551234567" class="nav__phone" aria-label="Call us: (555) 123-4567">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (555) 123-4567
          </a>
          <a href="booking.html" class="btn btn--primary btn--sm">Book Appointment</a>
          <button class="nav__hamburger" id="hamburger-btn" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation menu">
            <span class="nav__hamburger-bar"></span>
            <span class="nav__hamburger-bar"></span>
            <span class="nav__hamburger-bar"></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="nav__mobile-menu" id="mobile-menu" aria-hidden="true" role="dialog" aria-label="Mobile navigation menu">
      <div class="nav__mobile-menu-inner">
        <a href="index.html" class="nav__mobile-link" data-page="home">Home</a>
        <a href="about.html" class="nav__mobile-link" data-page="about">About Us</a>
        <a href="services.html" class="nav__mobile-link" data-page="services">Services</a>
        <a href="gallery.html" class="nav__mobile-link" data-page="gallery">Smile Gallery</a>
        <a href="pricing.html" class="nav__mobile-link" data-page="pricing">Pricing & Insurance</a>
        <a href="resources.html" class="nav__mobile-link" data-page="resources">Patient Resources</a>
        <a href="contact.html" class="nav__mobile-link" data-page="contact">Contact</a>
        <div class="nav__mobile-divider" role="separator"></div>
        <div class="nav__mobile-actions">
          <a href="tel:+15551234567" class="nav__mobile-phone">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call (555) 123-4567
          </a>
          <a href="booking.html" class="btn btn--primary" style="text-align:center;">Book Appointment</a>
        </div>
      </div>
    </div>
  `;
}

export function getFooterHTML() {
  return `
    <footer class="footer" role="contentinfo">
      <div class="footer__main">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="index.html" class="footer__logo" aria-label="BrightSmile Dental - Home">
              <div class="footer__logo-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#0D9488"/><path d="M16 6C13 6 10 8.5 10 11.5c0 1.5.5 3 1 4.5 1 2.5 1 5 2 8 .4 1.2.8 2 2 2 .8 0 1.3-.7 1.7-2l.3-1.2.3 1.2c.4 1.3.9 2 1.7 2 1.2 0 1.6-.8 2-2 1-3 1-5.5 2-8 .5-1.5 1-3 1-4.5C24 8.5 21 6 16 6z" fill="white"/></svg>
              </div>
              <div>
                <span class="footer__logo-text">BrightSmile</span>
                <span class="footer__logo-sub">Dental</span>
              </div>
            </a>
            <p class="footer__tagline">Premium dental care for your whole family. Two convenient locations serving our community since 1998.</p>
            <div class="footer__socials" aria-label="Follow us on social media">
              <a href="#" class="footer__social-link" aria-label="Follow us on Facebook">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="Follow us on Instagram">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="footer__social-link" aria-label="Connect on Google">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
              </a>
            </div>
            <div class="footer__badges" style="margin-top: 0.5rem;">
              <div class="footer__rating-badge">
                <span class="stars" aria-label="4.9 out of 5 stars">★★★★★</span>
                <span>4.9 on Google</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="footer__col-title">Quick Links</h3>
            <ul class="footer__links" role="list">
              <li><a href="index.html" class="footer__link">Home</a></li>
              <li><a href="about.html" class="footer__link">About Us</a></li>
              <li><a href="services.html" class="footer__link">Our Services</a></li>
              <li><a href="gallery.html" class="footer__link">Smile Gallery</a></li>
              <li><a href="booking.html" class="footer__link">Book Appointment</a></li>
              <li><a href="contact.html" class="footer__link">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer__col-title">Services</h3>
            <ul class="footer__links" role="list">
              <li><a href="services.html#general" class="footer__link">General Dentistry</a></li>
              <li><a href="services.html#cosmetic" class="footer__link">Cosmetic Dentistry</a></li>
              <li><a href="services.html#orthodontics" class="footer__link">Invisalign</a></li>
              <li><a href="services.html#implants" class="footer__link">Dental Implants</a></li>
              <li><a href="services.html#pediatric" class="footer__link">Pediatric Dentistry</a></li>
              <li><a href="services.html#emergency" class="footer__link">Emergency Care</a></li>
              <li><a href="pricing.html" class="footer__link">Pricing & Insurance</a></li>
              <li><a href="resources.html" class="footer__link">Patient Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 class="footer__col-title">Contact Us</h3>
            <div class="footer__contact-item">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <strong style="color:rgba(255,255,255,0.85);display:block;font-size:0.875rem;">Downtown Location</strong>
                <span>123 Wellness Ave, Suite 200<br>San Francisco, CA 94102</span>
              </div>
            </div>
            <div class="footer__contact-item">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <strong style="color:rgba(255,255,255,0.85);display:block;font-size:0.875rem;">Westside Location</strong>
                <span>456 Pacific Blvd, Suite 105<br>San Francisco, CA 94117</span>
              </div>
            </div>
            <div class="footer__contact-item">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <div><a href="tel:+15551234567">(555) 123-4567</a></div>
            </div>
            <div class="footer__contact-item">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div><a href="mailto:hello@brightsmile.com">hello@brightsmile.com</a></div>
            </div>
            <div class="footer__hours" style="margin-top:1rem;">
              <table aria-label="Office hours">
                <tbody>
                  <tr><td>Mon – Thu</td><td>8:00 AM – 6:00 PM</td></tr>
                  <tr><td>Friday</td><td>8:00 AM – 5:00 PM</td></tr>
                  <tr><td>Saturday</td><td>9:00 AM – 3:00 PM</td></tr>
                  <tr><td>Sunday</td><td>Closed</td></tr>
                </tbody>
              </table>
            </div>
            <div class="footer__emergency">
              <div class="footer__emergency-label">🚨 Emergency Line</div>
              <a href="tel:+15551234567" class="footer__emergency-phone">(555) 123-4567</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-inner">
          <p class="footer__copyright">© 2024 BrightSmile Dental. All rights reserved. This is a demo website.</p>
          <div class="footer__bottom-links">
            <a href="#" class="footer__bottom-link">Privacy Policy</a>
            <a href="#" class="footer__bottom-link">Terms of Use</a>
            <a href="#" class="footer__bottom-link">Accessibility</a>
            <a href="#" class="footer__bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
    <a href="booking.html" class="floating-book-btn" aria-label="Book appointment">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Book Now
    </a>
  `;
}

export function initNav() {
  // ── Emergency Banner ──
  const banner = document.getElementById('emergency-banner');
  const bannerClose = document.getElementById('emergency-banner-close');
  const navBar = document.getElementById('main-nav-bar');

  if (banner && sessionStorage.getItem('emergencyBannerDismissed') === 'true') {
    banner.classList.add('is-hidden');
  } else if (banner) {
    document.body.classList.add('has-emergency-banner');
    navBar && navBar.classList.add('has-banner');
  }

  bannerClose && bannerClose.addEventListener('click', () => {
    banner.classList.add('is-hidden');
    document.body.classList.remove('has-emergency-banner');
    navBar && navBar.classList.remove('has-banner');
    sessionStorage.setItem('emergencyBannerDismissed', 'true');
  });

  // ── Sticky nav shadow on scroll ──
  if (navBar) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        navBar.classList.add('nav--scrolled');
      } else {
        navBar.classList.remove('nav--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    const openMenu = () => {
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation menu');
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus first link
      const firstLink = mobileMenu.querySelector('a, button');
      firstLink && firstLink.focus();
    };

    const closeMenu = () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  // ── Active link detection ──
  const path = window.location.pathname;
  const pageName = path.split('/').pop().replace('.html', '') || 'home';

  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const linkPage = link.dataset.page;
    if (linkPage === pageName || (pageName === '' && linkPage === 'home') || (pageName === 'index' && linkPage === 'home')) {
      link.classList.add('is-active');
    }
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
