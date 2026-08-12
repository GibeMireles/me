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

  document.querySelectorAll('.carousel, .projects-carousel').forEach((wrap) => {
    const track = wrap.querySelector('[data-carousel-track]');
    const prevBtn = wrap.querySelector('[data-carousel-prev]');
    const nextBtn = wrap.querySelector('[data-carousel-next]');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = () => Math.round(track.clientWidth * 0.8);

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      if (track.pauseAutoplay) track.pauseAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      if (track.pauseAutoplay) track.pauseAutoplay();
    });
  });

  const projectsTrack = document.querySelector('.projects-track');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

  if (projectsTrack && !reduceMotion && !isSmallScreen) {
    let paused = false;
    let resumeTimeout = null;

    const step = () => {
      if (!paused) {
        const half = projectsTrack.scrollWidth / 2;
        projectsTrack.scrollLeft += 0.6;
        if (projectsTrack.scrollLeft >= half) {
          projectsTrack.scrollLeft -= half;
        }
      }
      requestAnimationFrame(step);
    };

    projectsTrack.pauseAutoplay = () => {
      paused = true;
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        paused = false;
      }, 3000);
    };

    projectsTrack.addEventListener('mouseenter', () => {
      paused = true;
    });
    projectsTrack.addEventListener('mouseleave', () => {
      clearTimeout(resumeTimeout);
      paused = false;
    });
    projectsTrack.addEventListener('touchstart', () => {
      paused = true;
    }, { passive: true });
    projectsTrack.addEventListener('touchend', projectsTrack.pauseAutoplay);

    requestAnimationFrame(step);
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
    es: { collapsed: 'Leer más', expanded: 'Leer menos' },
    en: { collapsed: 'Read more', expanded: 'Read less' },
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
