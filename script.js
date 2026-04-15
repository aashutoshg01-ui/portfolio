/* ============================================================
   AASHUTOSH KUMAR GUPTA — Portfolio
   script.js · Production-Ready Interactive Layer
   ============================================================
   Features:
   ✦ Scroll progress bar
   ✦ Glass navbar + active section highlight
   ✦ Scroll-reveal animations (staggered fade-up)
   ✦ Skill bar fill on scroll
   ✦ Hero typing animation
   ✦ Back-to-top button
   ✦ Mobile menu
   ✦ Smooth scroll (with offset for navbar)
   ✦ Lightweight — zero external dependencies
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────
   1. DOM READY GUARD
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────
     2. SCROLL PROGRESS BAR
  ───────────────────────────────────────────────────── */
  function updateScrollProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.body.style.setProperty('--scroll-pct', pct.toFixed(2) + '%');
  }


  /* ─────────────────────────────────────────────────────
     3. GLASS NAVBAR (scroll-based)
  ───────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function handleNav() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }


  /* ─────────────────────────────────────────────────────
     4. ACTIVE NAV LINK HIGHLIGHT
  ───────────────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          const isActive = a.getAttribute('href') === '#' + entry.target.id;
          a.style.color  = isActive ? 'var(--gold2)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ─────────────────────────────────────────────────────
     5. SCROLL-REVEAL ANIMATIONS
  ───────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* staggered delay for siblings */
        const delay = i * 85;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────────────────
     6. SKILL BAR FILL ANIMATION
  ───────────────────────────────────────────────────── */
  const skillCards = document.querySelectorAll('.skill-category');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
          const w = parseFloat(bar.dataset.w || 1);
          setTimeout(() => {
            bar.style.transition = 'transform 1.1s cubic-bezier(.22,1,.36,1)';
            bar.style.transform  = `scaleX(${w})`;
          }, i * 120 + 200);
        });

        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(c => skillObserver.observe(c));


  /* ─────────────────────────────────────────────────────
     7. MOBILE MENU
  ───────────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function openMobile() {
    mobileMenu  && mobileMenu.classList.add('open');
    hamburger   && hamburger.classList.add('active');
    document.body.style.overflow = 'hidden'; /* prevent scroll behind menu */
  }
  function closeMobile() {
    mobileMenu  && mobileMenu.classList.remove('open');
    hamburger   && hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger  && hamburger.addEventListener('click', openMobile);
  mobileClose && mobileClose.addEventListener('click', closeMobile);

  /* Close mobile menu when a link is clicked */
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobile);
  });

  /* Close mobile menu on outside click */
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobile();
      }
    }
  });

  /* Expose closeMobile globally (used by inline onclick attributes) */
  window.closeMobile = closeMobile;


  /* ─────────────────────────────────────────────────────
     8. SMOOTH SCROLL (with navbar offset)
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset    = navbar ? navbar.offsetHeight + 16 : 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────────────────
     9. TYPING ANIMATION (Hero headline)
  ───────────────────────────────────────────────────── */
  const typingTarget = document.querySelector('.hero-headline');

  if (typingTarget) {
    const phrases = [
      'Computer Science Student · Aspiring Software Developer · AI & Problem-Solving Enthusiast',
      'Building real-world software, one project at a time.',
      'Exploring AI, Backend Development & Robotics.',
      'B.Tech CSE · KIIT University · Batch 2027',
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let deleting    = false;

    /* Store original text to restore after animation if needed */
    const originalText = typingTarget.textContent;
    typingTarget.textContent = '';

    function type() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        typingTarget.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(type, 2400); /* pause at full phrase */
        }
        setTimeout(type, 38);
      } else {
        typingTarget.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting     = false;
          phraseIndex  = (phraseIndex + 1) % phrases.length;
          return setTimeout(type, 420);
        }
        setTimeout(type, 18);
      }
    }

    /* Slight delay before starting typing — let hero animate in first */
    setTimeout(type, 900);
  }


  /* ─────────────────────────────────────────────────────
     10. BACK-TO-TOP BUTTON
  ───────────────────────────────────────────────────── */
  const btt = document.createElement('button');
  btt.id            = 'btt';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML     = '↑';
  btt.style.cssText = `
    position:fixed; bottom:28px; right:28px; z-index:999;
    width:44px; height:44px; border-radius:50%;
    background:linear-gradient(135deg, var(--gold), var(--gold2));
    color:var(--bg); border:none; cursor:pointer;
    font-size:1.1rem; font-weight:700;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 20px rgba(201,168,76,.38);
    opacity:0; transform:translateY(12px) scale(.88);
    transition:opacity .3s ease, transform .3s ease, box-shadow .25s;
    pointer-events:none;
  `;
  document.body.appendChild(btt);

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btt.addEventListener('mouseenter', () => {
    btt.style.boxShadow = '0 8px 32px rgba(201,168,76,.52)';
    btt.style.transform = 'translateY(-2px) scale(1.06)';
  });

  btt.addEventListener('mouseleave', () => {
    btt.style.boxShadow = '0 4px 20px rgba(201,168,76,.38)';
    btt.style.transform = window.scrollY > 400
      ? 'translateY(0) scale(1)'
      : 'translateY(12px) scale(.88)';
  });

  function toggleBtt() {
    const show = window.scrollY > 400;
    btt.style.opacity        = show ? '1' : '0';
    btt.style.transform      = show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(.88)';
    btt.style.pointerEvents  = show ? 'auto' : 'none';
  }


  /* ─────────────────────────────────────────────────────
     11. UNIFIED SCROLL HANDLER (passive for perf)
  ───────────────────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleNav();
    toggleBtt();
  }, { passive: true });

  /* Initial calls */
  updateScrollProgress();
  handleNav();
  toggleBtt();


  /* ─────────────────────────────────────────────────────
     12. PROJECT CARD — TILT EFFECT (subtle, desktop only)
  ───────────────────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.project-card:not(.upcoming)').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const rx     = ((y / rect.height) - 0.5) * 7;
        const ry     = ((x / rect.width)  - 0.5) * -7;
        card.style.transform = `translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1), box-shadow .3s';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform .12s ease-out, box-shadow .3s';
      });
    });
  }


  /* ─────────────────────────────────────────────────────
     13. CONTACT FORM — LIGHTWEIGHT VALIDATION & FEEDBACK
  ───────────────────────────────────────────────────── */
  const submitBtn = document.querySelector('.form-submit');
  const nameInput = document.querySelector('.contact-form input[type="text"]');
  const emailInput = document.querySelector('.contact-form input[type="email"]');
  const msgInput  = document.querySelector('.contact-form textarea');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = nameInput  ? nameInput.value.trim()  : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const msg   = msgInput   ? msgInput.value.trim()   : '';

      if (!name || !email || !msg) {
        submitBtn.textContent = '⚠ Please fill all fields';
        submitBtn.style.background = 'linear-gradient(135deg, #7c5c1a, #a07820)';
        setTimeout(() => {
          submitBtn.textContent = 'Send Message →';
          submitBtn.style.background = '';
        }, 2200);
        return;
      }

      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #1d6f42, #2e9e5e)';
      submitBtn.disabled = true;

      /* Construct mailto link as fallback */
      const subject = encodeURIComponent('Portfolio Inquiry from ' + name);
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:aashutoshg01@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        if (nameInput)  nameInput.value  = '';
        if (emailInput) emailInput.value = '';
        if (msgInput)   msgInput.value   = '';
      }, 4000);
    });
  }


  /* ─────────────────────────────────────────────────────
     14. KEYBOARD ACCESSIBILITY — ESC closes mobile menu
  ───────────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobile();
  });

}); /* end DOMContentLoaded */
