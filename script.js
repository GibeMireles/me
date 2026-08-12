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

  if (projectsTrack && !reduceMotion) {
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
});
