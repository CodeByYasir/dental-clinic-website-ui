/* =========================================
   BRIGHTSMILE DENTAL — MODAL
   Open/close + focus trap + escape key
   ========================================= */

let activeModal = null;
let previousFocus = null;

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => !el.closest('[aria-hidden="true"]'));
}

function trapFocus(e, container) {
  const focusable = getFocusableElements(container);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

export function openModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;

  previousFocus = document.activeElement;
  activeModal = overlay;

  overlay.removeAttribute('hidden');
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Set aria-hidden on main content
  const mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.setAttribute('aria-hidden', 'true');

  // Focus the close button or first focusable element
  const modal = overlay.querySelector('.modal');
  if (modal) {
    const closeBtn = modal.querySelector('.modal__close');
    const firstFocusable = getFocusableElements(modal)[0];
    setTimeout(() => {
      (closeBtn || firstFocusable)?.focus();
    }, 100);
  }

  // Trap focus
  overlay._trapFocusHandler = (e) => {
    if (e.key === 'Tab') {
      const modal = overlay.querySelector('.modal');
      if (modal) trapFocus(e, modal);
    }
    if (e.key === 'Escape') closeModal(overlayId);
  };
  document.addEventListener('keydown', overlay._trapFocusHandler);

  // Close on backdrop click
  overlay._backdropHandler = (e) => {
    if (e.target === overlay) closeModal(overlayId);
  };
  overlay.addEventListener('click', overlay._backdropHandler);
}

export function closeModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('hidden', '');
  document.body.style.overflow = '';

  // Restore aria-hidden on main content
  const mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.removeAttribute('aria-hidden');

  // Remove event listeners
  if (overlay._trapFocusHandler) {
    document.removeEventListener('keydown', overlay._trapFocusHandler);
  }
  if (overlay._backdropHandler) {
    overlay.removeEventListener('click', overlay._backdropHandler);
  }

  // Restore focus
  previousFocus?.focus();
  activeModal = null;
  previousFocus = null;
}

export function initModals() {
  // Wire up all [data-modal-open] triggers
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      openModal(trigger.dataset.modalOpen);
    });
  });

  // Wire up all .modal__close buttons
  document.querySelectorAll('.modal__close').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) closeModal(overlay.id);
    });
  });
}
