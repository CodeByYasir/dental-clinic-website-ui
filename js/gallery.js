/* =========================================
   BRIGHTSMILE DENTAL — GALLERY
   Before/after clip-path reveal + category filter
   ========================================= */

export function initGallery() {
  initBeforeAfter();
  initGalleryFilter();
}

function initBeforeAfter() {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    const afterImg = item.querySelector('.gallery-item__after');
    const divider = item.querySelector('.gallery-item__divider');
    const handle = item.querySelector('.gallery-item__handle');
    let isActive = false;

    if (!afterImg) return;

    function setPosition(percent) {
      // Clip from the LEFT — Before on left, After revealed from right as handle moves right
      afterImg.style.clipPath = `inset(0 0 0 ${percent}%)`;
      if (divider) divider.style.left = percent + '%';
      if (handle) handle.style.left = percent + '%';
    }

    function getPercent(clientX, rect) {
      const x = clientX - rect.left;
      return Math.max(2, Math.min(98, (x / rect.width) * 100));
    }

    // Mouse events
    item.addEventListener('mousemove', (e) => {
      if (!isActive) return;
      const rect = item.getBoundingClientRect();
      setPosition(getPercent(e.clientX, rect));
    });

    item.addEventListener('mousedown', (e) => {
      isActive = true;
      item.classList.add('is-active');
      e.preventDefault();
    });

    document.addEventListener('mouseup', () => {
      isActive = false;
    });

    // Touch events — direction-aware to avoid hijacking page scroll
    let touchStartX = 0;
    let touchStartY = 0;
    let gestureDirection = null; // 'horizontal' | 'vertical' | null

    item.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      gestureDirection = null;
      isActive = false;
    }, { passive: true });

    item.addEventListener('touchmove', (e) => {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);

      // Determine intent on first significant movement (5px threshold)
      if (gestureDirection === null && (deltaX > 5 || deltaY > 5)) {
        gestureDirection = deltaX >= deltaY ? 'horizontal' : 'vertical';
        if (gestureDirection === 'horizontal') {
          isActive = true;
          item.classList.add('is-active');
        }
      }

      // Vertical intent — do nothing, let the page scroll
      if (gestureDirection !== 'horizontal') return;

      // Horizontal intent — block scroll and move the slider
      e.preventDefault();
      const rect = item.getBoundingClientRect();
      setPosition(getPercent(touch.clientX, rect));
    }, { passive: false }); // non-passive so preventDefault() works

    item.addEventListener('touchend', () => {
      isActive = false;
      gestureDirection = null;
    }, { passive: true });

    // Init at 50%
    setPosition(50);
  });
}

function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.chip--filter');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
  const countEl = document.getElementById('gallery-count');

  if (!filterBtns.length) return;

  let activeFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      activeFilter = btn.dataset.filter || 'all';
      applyFilter(activeFilter);
    });
  });

  function applyFilter(filter) {
    let visibleCount = 0;

    galleryItems.forEach(item => {
      const category = item.dataset.category;
      const show = filter === 'all' || category === filter;

      if (show) {
        item.classList.remove('is-hidden');
        item.style.opacity = '';
        item.style.transform = '';
        visibleCount++;
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.97)';
        setTimeout(() => {
          if (activeFilter !== filter && filter !== 'all') return;
          if (!show) item.classList.add('is-hidden');
        }, 280);
      }
    });

    // Update count
    if (countEl) {
      countEl.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'result' : 'results'}`;
      countEl.setAttribute('aria-live', 'polite');
    }
  }

  // Initialize
  applyFilter('all');
}
