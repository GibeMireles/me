document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.carousel').forEach((wrap) => {
    const track = wrap.querySelector('[data-carousel-track]');
    const prevBtn = wrap.querySelector('[data-carousel-prev]');
    const nextBtn = wrap.querySelector('[data-carousel-next]');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = () => Math.round(track.clientWidth * 0.8);

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });

  const pViewport = document.querySelector('.pcarousel__viewport');
  const pTrack = document.querySelector('[data-pcarousel-track]');
  const pPrevBtn = document.querySelector('[data-pcarousel-prev]');
  const pNextBtn = document.querySelector('[data-pcarousel-next]');
  const pDotsWrap = document.querySelector('[data-pcarousel-dots]');

  if (pViewport && pTrack && pPrevBtn && pNextBtn && pDotsWrap) {
    const pCards = Array.from(pTrack.children);

    const getCardsPerView = () => {
      if (pCards.length < 2) return 1;
      const unit = pCards[1].getBoundingClientRect().left - pCards[0].getBoundingClientRect().left;
      return Math.max(1, Math.round(pViewport.clientWidth / unit));
    };

    const updateDots = () => {
      const page = Math.round(pTrack.scrollLeft / pViewport.clientWidth);
      const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
      Array.from(pDotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === page);
        dot.setAttribute('aria-label', lang === 'en' ? `Go to page ${i + 1}` : `Ir a la página ${i + 1}`);
      });
    };

    const buildDots = () => {
      pDotsWrap.innerHTML = '';
      const pageCount = Math.max(1, Math.ceil(pCards.length / getCardsPerView()));
      for (let i = 0; i < pageCount; i += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'pcarousel__dot';
        dot.addEventListener('click', () => {
          pTrack.scrollTo({ left: i * pViewport.clientWidth, behavior: 'smooth' });
        });
        pDotsWrap.appendChild(dot);
      }
      updateDots();
    };

    pPrevBtn.addEventListener('click', () => {
      pTrack.scrollBy({ left: -pViewport.clientWidth, behavior: 'smooth' });
    });
    pNextBtn.addEventListener('click', () => {
      pTrack.scrollBy({ left: pViewport.clientWidth, behavior: 'smooth' });
    });

    let pScrollTimeout;
    pTrack.addEventListener('scroll', () => {
      clearTimeout(pScrollTimeout);
      pScrollTimeout = setTimeout(updateDots, 100);
    });

    let pResizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(pResizeTimeout);
      pResizeTimeout = setTimeout(buildDots, 200);
    });

    buildDots();
  }

  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const toggleLabels = {
    es: { collapsed: 'Ver más →', expanded: 'Ver menos' },
    en: { collapsed: 'Read more →', expanded: 'Read less' },
  };

  const updateToggleLabel = (button) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    button.textContent = expanded ? toggleLabels[lang].expanded : toggleLabels[lang].collapsed;
  };

  document.querySelectorAll('[data-toggle-desc]').forEach((button) => {
    const desc = button.previousElementSibling;
    if (!desc) return;

    button.addEventListener('click', () => {
      const expanded = desc.classList.toggle('is-expanded');
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      updateToggleLabel(button);
    });
  });

  const LANG_KEY = 'site-lang';

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';

    document.querySelectorAll('[data-en]').forEach((el) => {
      if (!el.dataset.es) {
        el.dataset.es = el.textContent;
      }
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
    });

    document.querySelectorAll('[data-aria-en]').forEach((el) => {
      if (!el.dataset.ariaEs) {
        el.dataset.ariaEs = el.getAttribute('aria-label') || '';
      }
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.ariaEn : el.dataset.ariaEs);
    });

    document.querySelectorAll('[data-content-en]').forEach((el) => {
      if (!el.dataset.contentEs) {
        el.dataset.contentEs = el.getAttribute('content') || '';
      }
      el.setAttribute('content', lang === 'en' ? el.dataset.contentEn : el.dataset.contentEs);
    });

    document.querySelectorAll('[data-href-en]').forEach((el) => {
      if (!el.dataset.hrefEs) {
        el.dataset.hrefEs = el.getAttribute('href') || '';
      }
      el.setAttribute('href', lang === 'en' ? el.dataset.hrefEn : el.dataset.hrefEs);
    });

    document.querySelectorAll('[data-toggle-desc]').forEach(updateToggleLabel);

    document.querySelectorAll('.pcarousel__dot').forEach((dot, i) => {
      dot.setAttribute('aria-label', lang === 'en' ? `Go to page ${i + 1}` : `Ir a la página ${i + 1}`);
    });

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'ES' : 'EN';
      langToggle.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    }

    localStorage.setItem(LANG_KEY, lang);
  };

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.lang === 'en' ? 'en' : 'es';
      applyLanguage(current === 'en' ? 'es' : 'en');
    });
  }

  let storedLang = 'es';
  try {
    storedLang = localStorage.getItem(LANG_KEY) || 'es';
  } catch (e) {
    storedLang = 'es';
  }
  applyLanguage(storedLang);
});
