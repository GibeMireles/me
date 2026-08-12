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

  document.querySelectorAll('[data-toggle-desc]').forEach((button) => {
    const desc = button.previousElementSibling;
    if (!desc) return;

    button.addEventListener('click', () => {
      const expanded = desc.classList.toggle('is-expanded');
      button.textContent = expanded ? 'Leer menos' : 'Leer más';
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
});
