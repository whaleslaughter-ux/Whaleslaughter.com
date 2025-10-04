(function () {
  const slots = document.querySelectorAll('[data-include]');
  if (!slots.length) return;

  slots.forEach(async (slot) => {
    const file = slot.getAttribute('data-include');
    try {
      const res = await fetch(file, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      const html = await res.text();
      slot.innerHTML = html;

      // Highlight current page in the nav after it loads
      if (file === 'nav.html') {
        const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        slot.querySelectorAll('a[href]').forEach(a => {
          const target = (a.getAttribute('href') || '').toLowerCase();
          if (target === here) {
            a.setAttribute('aria-current', 'page');
            a.classList.add('active');
          }
        });
      }
    } catch (e) {
      slot.innerHTML = '<!-- include failed: ' + file + ' -->';
      console.error('Include failed:', file, e);
    }
  });
})();
