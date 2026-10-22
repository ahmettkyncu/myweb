(() => {
  const preferenceKey = 'portfolio-theme';
  const root = document.documentElement;
  try {
    if (localStorage.getItem(preferenceKey) === 'light') root.classList.add('light-theme');
  } catch (_) {}

  function update(button) {
    const isLight = root.classList.contains('light-theme');
    const isEnglish = root.lang.toLowerCase().startsWith('en');
    const label = isLight
      ? (isEnglish ? 'Switch to dark theme' : 'Koyu temaya geç')
      : (isEnglish ? 'Switch to light theme' : 'Açık temaya geç');
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.setAttribute('aria-pressed', String(isLight));
    button.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"/></svg><span class="label-tr">Koyu tema</span><span class="label-en">Dark theme</span>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><span class="label-tr">Açık tema</span><span class="label-en">Light theme</span>';
  }

  function mount() {
    if (document.querySelector('.site-theme-toggle')) return true;
    const row = document.querySelector('body.site-theme header > div');
    if (!row) return false;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'site-theme-toggle';
    button.addEventListener('click', () => {
      root.classList.toggle('light-theme');
      try { localStorage.setItem(preferenceKey, root.classList.contains('light-theme') ? 'light' : 'dark'); } catch (_) {}
      update(button);
    });
    row.append(button);
    update(button);
    return true;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
  const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
  observer.observe(root, { childList: true, subtree: true });
})();
