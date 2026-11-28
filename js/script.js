/* ========================================
   SWEETIVERSE — Main Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay    = document.querySelector('.mobile-overlay');

  function setMenuOpen(isOpen) {
    if (!hamburger || !mobileMenu || !overlay) return;
    hamburger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', () => {
      setMenuOpen(!mobileMenu.classList.contains('open'));
    });
    overlay.addEventListener('click', () => setMenuOpen(false));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMenuOpen(false);
      }
    });
  }

  /* ---------- Navbar Scroll Shadow ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---------- Active Nav Link ---------- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-menu a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll Reveal (Bi-Directional: Scroll Down & Up) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
          if (entry.boundingClientRect.top < 0) {
            el.classList.add('from-top');
          } else {
            el.classList.remove('from-top');
          }
        }
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -10px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Image Placeholder Fallback ---------- */
  document.querySelectorAll('.card-image img, .cat-visual-img, .hero-img, .logo-img').forEach(img => {
    function handleError() {
      img.classList.add('img-hidden');
    }
    img.addEventListener('error', handleError);
    // Already broken (cached miss)
    if (img.complete && img.naturalWidth === 0 && img.src) {
      handleError();
    }
  });

  /* ---------- Order Channel Tabs ---------- */
  const orderTabs = document.querySelectorAll('.order-tab-btn');
  const orderPanels = document.querySelectorAll('.order-tab-panel');
  if (orderTabs.length && orderPanels.length) {
    orderTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-order-tab');
        orderTabs.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', String(isActive));
        });
        orderPanels.forEach(panel => {
          const match = panel.getAttribute('data-order-panel') === target;
          panel.classList.toggle('hidden', !match);
        });
      });
    });
  }

  /* ---------- Official Brand Icons ---------- */
  let iconUid = 0;
  function getBrandSvg(name) {
    const uid = ++iconUid;
    switch (name) {
      case 'instagram':
        return `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig-${uid}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#F58529"/><stop offset="50%" stop-color="#DD2A7B"/><stop offset="100%" stop-color="#515BD4"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#ig-${uid})"/><rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.3" cy="7.7" r="1.05" fill="#fff"/></svg>`;
      case 'tiktok':
        return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#111111"/><g transform="translate(2.5 2.5) scale(0.79)"><path fill="#25F4EE" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3Z" transform="translate(-0.7 -0.6)"/><path fill="#FE2C55" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3Z" transform="translate(0.7 0.6)"/><path fill="#FFFFFF" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3Z"/></g></svg>`;
      case 'shopee':
        return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="#EE4D2D" stroke-width="2" stroke-linecap="round" d="M8.5 7.5a3.5 3.5 0 0 1 7 0"/><path fill="#EE4D2D" d="M4.2 7.5h15.6l-.9 12.2A2.2 2.2 0 0 1 16.7 21.8H7.3a2.2 2.2 0 0 1-2.2-2.1L4.2 7.5Z"/><path fill="#FFFFFF" d="M14.35 12.1c-.48-.44-1.22-.68-2.15-.68-1.45 0-2.4.72-2.4 1.78 0 1 .76 1.5 2.15 1.78 1 .2 1.48.44 1.48.96 0 .56-.56.92-1.44.92-.82 0-1.48-.28-2.02-.8l-.92 1.04c.68.68 1.66 1.06 2.9 1.06 1.62 0 2.75-.78 2.75-2.18 0-1.02-.7-1.64-2.22-1.95-.98-.2-1.4-.42-1.4-.86 0-.44.44-.74 1.1-.74.66 0 1.2.22 1.66.6l.51-.93Z"/></svg>`;
      case 'gform':
        return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="2" width="17" height="20" rx="2.8" fill="#7248B9"/><circle cx="8.2" cy="8.5" r="1.15" fill="#fff"/><rect x="10.8" y="7.6" width="6" height="1.8" rx=".9" fill="#fff"/><circle cx="8.2" cy="12.5" r="1.15" fill="#fff"/><rect x="10.8" y="11.6" width="6" height="1.8" rx=".9" fill="#fff"/><circle cx="8.2" cy="16.5" r="1.15" fill="#fff"/><rect x="10.8" y="15.6" width="6" height="1.8" rx=".9" fill="#fff"/></svg>`;
      case 'whatsapp':
      case 'whatsapp-white': {
        const bg = name === 'whatsapp-white' ? 'transparent' : '#25D366';
        const fg = '#FFFFFF';
        return `<svg viewBox="0 0 24 24" aria-hidden="true">${bg !== 'transparent' ? `<rect width="24" height="24" rx="6" fill="${bg}"/>` : ''}<g transform="${bg !== 'transparent' ? 'translate(2.5 2.5) scale(0.79)' : ''}"><path fill="${fg}" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></g></svg>`;
      }
      case 'location':
        return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#655A7C" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>`;
      default:
        return '';
    }
  }
  document.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = getBrandSvg(el.getAttribute('data-icon'));
  });

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
