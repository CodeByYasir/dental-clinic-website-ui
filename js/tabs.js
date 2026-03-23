/* =========================================
   BRIGHTSMILE DENTAL — TABS
   ARIA tablist + tabpanel switching
   ========================================= */

export function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const tabList = container.querySelector('[role="tablist"]');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(
      document.querySelectorAll('[role="tabpanel"]')
    ).filter(panel => {
      return tabs.some(tab => tab.getAttribute('aria-controls') === panel.id);
    });

    function activateTab(tab) {
      // Deactivate all
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        t.classList.remove('is-active');
      });

      // Hide all panels
      panels.forEach(p => {
        p.hidden = true;
        p.classList.remove('is-active');
      });

      // Activate clicked tab
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.classList.add('is-active');

      // Show target panel
      const targetPanel = document.getElementById(tab.getAttribute('aria-controls'));
      if (targetPanel) {
        targetPanel.hidden = false;
        targetPanel.classList.add('is-active');
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (e) => {
        let newIndex;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIndex = (index - 1 + tabs.length) % tabs.length;
          activateTab(tabs[newIndex]);
          tabs[newIndex].focus();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIndex = (index + 1) % tabs.length;
          activateTab(tabs[newIndex]);
          tabs[newIndex].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          activateTab(tabs[0]);
          tabs[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          activateTab(tabs[tabs.length - 1]);
          tabs[tabs.length - 1].focus();
        }
      });
    });

    // Initialize: activate first tab
    const activeTab = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (activeTab) activateTab(activeTab);
  });
}

// Simple version for plain button-based tab switching (not ARIA)
export function initSimpleTabs(navSelector, panelSelector, activeClass = 'is-active') {
  const navBtns = document.querySelectorAll(navSelector);
  const panels = document.querySelectorAll(panelSelector);

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      navBtns.forEach(b => {
        b.classList.remove(activeClass);
        b.setAttribute('aria-selected', 'false');
      });

      panels.forEach(p => {
        p.classList.remove(activeClass);
        p.hidden = true;
      });

      btn.classList.add(activeClass);
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(target);
      if (targetPanel) {
        targetPanel.classList.add(activeClass);
        targetPanel.hidden = false;
      }
    });
  });
}
