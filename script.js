(() => {
  // Header border on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));

    // Hide floating WhatsApp button while the contacts block is on screen
    const fab = document.querySelector('.wa-float');
    const cta = document.querySelector('.cta');
    if (fab && cta) {
      new IntersectionObserver(([e]) => fab.classList.toggle('hide', e.isIntersecting), { threshold: 0.3 }).observe(cta);
    }
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Gallery filters
  const gallery = document.querySelector('.gallery');
  const items = [...gallery.querySelectorAll('li')];
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      items.forEach((li) => { li.hidden = f !== 'all' && li.dataset.cat !== f; });
      gallery.classList.toggle('filtered', f !== 'all');
    });
  });

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('figcaption');
  let current = 0;
  const visible = () => items.filter((li) => !li.hidden);

  const show = (i) => {
    const list = visible();
    current = (i + list.length) % list.length;
    const img = list[current].querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
  };

  items.forEach((li) => {
    li.querySelector('.g-item').addEventListener('click', () => {
      show(visible().indexOf(li));
      if (typeof lb.showModal === 'function') lb.showModal();
      else lb.setAttribute('open', '');
    });
  });

  const close = () => (typeof lb.close === 'function' ? lb.close() : lb.removeAttribute('open'));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.tagName === 'FIGURE') close();
  });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
