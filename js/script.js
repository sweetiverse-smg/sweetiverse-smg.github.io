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

  /* ---------- Scroll Reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
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
