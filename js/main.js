/* =========================================
   MAIN
   Entry point. Loads components first (since
   other modules need their DOM), then wires
   up everything else.
   ========================================= */

import { loadAllComponents } from './components.js';
import { initSidebar }       from './sidebar.js';
import { initSticker }       from './sticker.js';
import { renderSkills }      from './skills.js';
import { renderProjects }    from './projects.js';
import { initTerminal }      from './terminal.js';
import { initNav }           from './nav.js';
import { initTerminalToast } from './toast.js';

(async function init() {
  // 1. inject all HTML partials first — everything else depends on this
  await loadAllComponents();

  // 2. fill in current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3. render data-driven sections in parallel
  await Promise.all([
    renderSkills(),
    renderProjects(),
  ]);

  // 4. wire up interactive bits
  initSidebar();
  initSticker();
  initTerminal();
  initNav();
  initTerminalToast();

  // 5. everything is ready — fade out and remove the preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  }
})();
