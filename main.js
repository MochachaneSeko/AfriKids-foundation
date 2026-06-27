document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Scroll-in animations ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .team-card, .info-item, .age-tag').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ── Contact form ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn     = form.querySelector('button[type="submit"]');
      const success = document.getElementById('formSuccess');
      const name    = document.getElementById('name')?.value.trim();

      btn.textContent = 'Sending…';
      btn.disabled    = true;

      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        if (success) {
          success.style.display = 'block';
          success.textContent   = `Thank you${name ? ', ' + name : ''}! We'll be in touch soon. 🌟`;
        }
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled    = false;
          if (success) success.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

  // ── Footer year ──
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});