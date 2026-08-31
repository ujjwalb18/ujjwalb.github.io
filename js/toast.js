/* =========================================
   TERMINAL TOAST
   One-time nudge pointing visitors at the
   interactive terminal. Never blocks the page,
   shows once per browser (localStorage-gated),
   auto-dismisses, and never nags again.
   ========================================= */

const STORAGE_KEY = 'terminalToastSeen';
const SHOW_DELAY_MS = 1500;   // wait a beat after page load, feels less jarring
const AUTO_HIDE_MS  = 9000;   // dismiss itself if ignored

export function initTerminalToast() {
  const toast   = document.getElementById('terminalToast');
  const link    = document.getElementById('terminalToastLink');
  const closeBtn = document.getElementById('terminalToastClose');
  if (!toast || !link || !closeBtn) return;

  // already seen on a previous visit — never show again
  if (localStorage.getItem(STORAGE_KEY)) return;

  let autoHideTimer;

  const dismiss = () => {
    clearTimeout(autoHideTimer);
    toast.hidden = true;
    localStorage.setItem(STORAGE_KEY, '1');
  };

  const show = () => {
    toast.hidden = false;
    autoHideTimer = setTimeout(dismiss, AUTO_HIDE_MS);
  };

  closeBtn.addEventListener('click', dismiss);

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('terminal');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // give the scroll a moment, then focus the input so typing just works
      setTimeout(() => document.getElementById('termInput')?.focus(), 500);
    }
    dismiss();
  });

  setTimeout(show, SHOW_DELAY_MS);
}
