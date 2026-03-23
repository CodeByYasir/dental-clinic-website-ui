/* =========================================
   BRIGHTSMILE DENTAL — ACCORDION
   ARIA-compliant expand/collapse
   ========================================= */

export function initAccordion(containerSelector = '.accordion', exclusive = false) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const items = Array.from(container.querySelectorAll('.accordion-item'));

    items.forEach((item, index) => {
      const trigger = item.querySelector('.accordion-trigger');
      const panel = item.querySelector('.accordion-panel');

      if (!trigger || !panel) return;

      // Set initial ARIA state
      const isOpen = item.classList.contains('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }

      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';

        if (exclusive) {
          // Close all others first
          items.forEach(otherItem => {
            if (otherItem !== item) {
              closeItem(otherItem);
            }
          });
        }

        if (expanded) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });

      // Keyboard: arrow key navigation between triggers
      trigger.addEventListener('keydown', (e) => {
        const triggers = items.map(i => i.querySelector('.accordion-trigger'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = triggers[(index + 1) % triggers.length];
          next?.focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = triggers[(index - 1 + triggers.length) % triggers.length];
          prev?.focus();
        }
        if (e.key === 'Home') {
          e.preventDefault();
          triggers[0]?.focus();
        }
        if (e.key === 'End') {
          e.preventDefault();
          triggers[triggers.length - 1]?.focus();
        }
      });
    });
  });
}

function openItem(item) {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');
  if (!trigger || !panel) return;

  item.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.style.maxHeight = panel.scrollHeight + 'px';
}

function closeItem(item) {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');
  if (!trigger || !panel) return;

  item.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  panel.style.maxHeight = '0';
}
