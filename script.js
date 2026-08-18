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
  const pProgress = document.querySelector('[data-pcarousel-progress]');
  const pProgressFill = document.querySelector('[data-pcarousel-progress-fill]');
  const PROGRESS_MAX_WIDTH = 160;

  if (pViewport && pTrack && pPrevBtn && pNextBtn && pProgress && pProgressFill) {
    const pCards = Array.from(pTrack.children);

    let cardUnit = pViewport.clientWidth;
    let cardsPerView = 1;
    let pageScrollAmount = pViewport.clientWidth;
    let pageCount = 1;

    const measure = () => {
      cardUnit = pCards.length < 2
        ? pViewport.clientWidth
        : pCards[1].getBoundingClientRect().left - pCards[0].getBoundingClientRect().left;
      cardsPerView = Math.max(1, Math.round(pViewport.clientWidth / cardUnit));
      pageScrollAmount = cardUnit * cardsPerView;
      pageCount = Math.max(1, Math.ceil(pCards.length / cardsPerView));
      pProgress.setAttribute('aria-valuemax', pageCount);
    };

    const updateProgress = () => {
      const page = Math.min(pageCount - 1, Math.round(pTrack.scrollLeft / pageScrollAmount));
      pProgressFill.style.width = `${((page + 1) / pageCount) * PROGRESS_MAX_WIDTH}px`;
      pProgress.setAttribute('aria-valuenow', page + 1);
    };

    const refresh = () => {
      measure();
      updateProgress();
    };

    pPrevBtn.addEventListener('click', () => {
      pTrack.scrollBy({ left: -pageScrollAmount, behavior: 'smooth' });
    });
    pNextBtn.addEventListener('click', () => {
      pTrack.scrollBy({ left: pageScrollAmount, behavior: 'smooth' });
    });

    let pScrollTimeout;
    pTrack.addEventListener('scroll', () => {
      clearTimeout(pScrollTimeout);
      pScrollTimeout = setTimeout(updateProgress, 100);
    });

    let pResizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(pResizeTimeout);
      pResizeTimeout = setTimeout(refresh, 200);
    });

    refresh();
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

  const heroCanvas = document.querySelector('.hero__canvas');
  const heroSection = document.querySelector('.hero');
  if (heroCanvas && heroSection) {
    const ctx = heroCanvas.getContext('2d');
    const NODE_COLOR = '20, 184, 166';
    const NODE_COUNT = 34;
    const LINK_DISTANCE = 150;
    const LINK_OPACITY = 0.14;
    const MAX_PULSES = 6;
    const PULSE_SPAWN_INTERVAL = 700;
    const PULSE_DURATION = 900;
    const INTERACT_RADIUS = 140;
    const ATTRACT_STRENGTH = 0.9;
    const RIPPLE_RADIUS = 220;
    const RIPPLE_MAX_NODES = 8;
    const RIPPLE_RING_DURATION = 600;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let pulses = [];
    let ripples = [];
    let lastPulseSpawn = 0;
    const mouse = { x: -9999, y: -9999 };

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroSection.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    heroSection.addEventListener('click', (e) => {
      if (e.target !== heroSection || prefersReducedMotion) return;
      const rect = heroSection.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripples.push({ x: clickX, y: clickY, start: performance.now() });

      const nearby = nodes
        .map((node, idx) => ({ idx, dist: Math.hypot(node.x - clickX, node.y - clickY) }))
        .filter((n) => n.dist < RIPPLE_RADIUS)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, RIPPLE_MAX_NODES);

      nearby.forEach((n) => {
        pulses.push({
          fromPos: { x: clickX, y: clickY },
          toIdx: n.idx,
          start: performance.now()
        });
      });
    });

    const resize = () => {
      width = heroSection.clientWidth;
      height = heroSection.clientHeight;
      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: 1.2 + Math.random() * 1.8,
        baseOpacity: 0.35 + Math.random() * 0.4,
        pulseSpeed: 0.5 + Math.random() * 0.8,
        pulseOffset: Math.random() * Math.PI * 2,
        hasRing: Math.random() < 0.35
      }));
    };

    const step = (time) => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (mouseDist < INTERACT_RADIUS && mouseDist > 0.01) {
          const pull = (1 - mouseDist / INTERACT_RADIUS) * ATTRACT_STRENGTH;
          node.x += (dxMouse / mouseDist) * pull;
          node.y += (dyMouse / mouseDist) * pull;
        }
      });

      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * LINK_OPACITY;
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            edges.push(i, j);
          }
        }
      }

      if (mouse.x !== -9999) {
        nodes.forEach((node) => {
          const dxMouse = node.x - mouse.x;
          const dyMouse = node.y - mouse.y;
          const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (mouseDist < INTERACT_RADIUS) {
            const opacity = (1 - mouseDist / INTERACT_RADIUS) * LINK_OPACITY * 2.5;
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });
      }

      if (!prefersReducedMotion && edges.length && time - lastPulseSpawn > PULSE_SPAWN_INTERVAL && pulses.length < MAX_PULSES) {
        lastPulseSpawn = time;
        const pairIndex = (Math.floor(Math.random() * (edges.length / 2)) * 2);
        const forward = Math.random() < 0.5;
        pulses.push({
          fromIdx: forward ? edges[pairIndex] : edges[pairIndex + 1],
          toIdx: forward ? edges[pairIndex + 1] : edges[pairIndex],
          start: time
        });
      }

      pulses = pulses.filter((p) => time - p.start < PULSE_DURATION);
      pulses.forEach((p) => {
        const a = p.fromPos || nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        if (!a || !b) return;
        const progress = (time - p.start) / PULSE_DURATION;
        const eased = Math.sin(progress * Math.PI);
        const px = a.x + (b.x - a.x) * progress;
        const py = a.y + (b.y - a.y) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR}, ${eased * 0.85})`;
        ctx.fill();
      });

      ripples = ripples.filter((r) => time - r.start < RIPPLE_RING_DURATION);
      ripples.forEach((r) => {
        const progress = (time - r.start) / RIPPLE_RING_DURATION;
        const radius = progress * RIPPLE_RADIUS * 0.6;
        const opacity = (1 - progress) * 0.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${NODE_COLOR}, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      const t = time / 1000;
      nodes.forEach((node) => {
        const pulse = (Math.sin(t * node.pulseSpeed + node.pulseOffset) + 1) / 2;
        const dxMouse = node.x - mouse.x;
        const dyMouse = node.y - mouse.y;
        const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const proximity = mouseDist < INTERACT_RADIUS ? 1 - mouseDist / INTERACT_RADIUS : 0;

        const opacity = Math.min(1, node.baseOpacity * (0.7 + 0.3 * pulse) + proximity * 0.4);
        const radius = node.radius + proximity * 1.8;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_COLOR}, ${opacity})`;
        ctx.fill();

        if (node.hasRing) {
          const ringRadius = node.radius + 2 + pulse * 3;
          const ringOpacity = (1 - pulse) * 0.3 * node.baseOpacity;
          ctx.beginPath();
          ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${NODE_COLOR}, ${ringOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      const textGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.55
      );
      textGradient.addColorStop(0, 'rgba(15, 23, 42, 0.22)');
      textGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = textGradient;
      ctx.fillRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        requestAnimationFrame(step);
      }
    };

    resize();
    createNodes();
    requestAnimationFrame(step);

    window.addEventListener('resize', () => {
      resize();
      if (prefersReducedMotion) {
        step(performance.now());
      }
    });
  }
});
