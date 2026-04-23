/* ============================================================
   AASHUTOSH KUMAR GUPTA — Portfolio · script.js v4
   ============================================================
   ⚙️ EMAILJS SETUP — paste your keys below:
   1. https://emailjs.com → create account
   2. Add Gmail service  → copy SERVICE_ID
   3. Create template    → copy TEMPLATE_ID
      Template vars: {{from_name}} {{from_email}} {{subject}} {{message}}
   4. Account → API Keys → copy PUBLIC_KEY
   ============================================================ */
'use strict';

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSkillBars();
  initTyping();
  initBackToTop();
  initSmoothScroll();
  initContactForm();
  initProjectTilt();
  initParallax();
});

/* 1. Scroll progress */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100).toFixed(2) + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
}

/* 2. Navbar */
function initNavbar() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sects = document.querySelectorAll('section[id]');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { threshold: 0.5 });
  sects.forEach(s => io.observe(s));
}

/* 3. Mobile menu */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobNav');
  const close = document.getElementById('mobClose');
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.add('open'); btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const shut = () => {
    menu.classList.remove('open'); btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => menu.classList.contains('open') ? shut() : open());
  close && close.addEventListener('click', shut);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
  document.addEventListener('keydown', e => e.key === 'Escape' && shut());
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) shut();
  });
  window.closeMob = shut;
}

/* 4. Scroll reveal */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* 5. Skill bars */
function initSkillBars() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      card.classList.add('bar-animated');
      card.querySelectorAll('.fill').forEach((fill, i) => {
        const w = parseFloat(fill.dataset.w || 1);
        setTimeout(() => { fill.style.transform = `scaleX(${w})`; }, i * 150 + 250);
      });
      io.unobserve(card);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.sk-card').forEach(c => io.observe(c));
}

/* 6. Typing animation */
function initTyping() {
  const el = document.getElementById('heroRole');
  if (!el) return;
  const phrases = [
    'Computer Science Student · Software Developer · AI Enthusiast',
    'Building real-world software, one project at a time.',
    'B.Tech CSE · KIIT University · Batch 2027',
    'AI/ML · Backend Development · Robotics Systems',
  ];
  el.classList.add('typing');
  let pi = 0, ci = 0, del = false;
  const tick = () => {
    const phrase = phrases[pi];
    el.textContent = del ? phrase.slice(0, --ci) : phrase.slice(0, ++ci);
    if (!del && ci === phrase.length) { del = true; return setTimeout(tick, 2800); }
    if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; return setTimeout(tick, 400); }
    setTimeout(tick, del ? 16 : 40);
  };
  setTimeout(tick, 1200);
}

/* 7. Back to top */
function initBackToTop() {
  const btt = document.getElementById('btt');
  if (!btt) return;
  const toggle = () => btt.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggle();
}

/* 8. Smooth scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      const nav = document.getElementById('navbar');
      window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight + 16 : 80), behavior: 'smooth' });
    });
  });
}

/* 9. Contact form with EmailJS */
function initContactForm() {
  const form  = document.getElementById('contactForm');
  const btn   = document.getElementById('formBtn');
  const okEl  = document.getElementById('fs-ok');
  const errEl = document.getElementById('fs-err');
  if (!form) return;

  const reset = () => { okEl.hidden = true; errEl.hidden = true; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    reset();

    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      const empty = !f.value.trim();
      f.classList.toggle('err', empty);
      if (empty) valid = false;
    });
    const ef = form.querySelector('[type="email"]');
    if (ef && ef.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ef.value)) {
      ef.classList.add('err'); valid = false;
    }
    if (!valid) return;

    const configured = typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled  = true;

    if (configured) {
      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        okEl.hidden = false; form.reset();
      } catch {
        errEl.hidden = false;
      }
    } else {
      const name = form.querySelector('[name="from_name"]')?.value || '';
      const email= form.querySelector('[name="from_email"]')?.value || '';
      const sub  = form.querySelector('[name="subject"]')?.value   || 'Portfolio Inquiry';
      const msg  = form.querySelector('[name="message"]')?.value   || '';
      window.location.href = `mailto:aashutoshg01@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
      okEl.hidden = false; form.reset();
    }

    btn.innerHTML = 'Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    btn.disabled = false;
  });

  form.querySelectorAll('input, textarea').forEach(f =>
    f.addEventListener('input', () => f.classList.remove('err'))
  );
}

/* 10. Project tilt (desktop) */
function initProjectTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('.proj-card:not(.proj-card-upcoming), .proj-featured').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - .5) * 5;
      const ry = ((e.clientX - r.left) / r.width  - .5) * -5;
      card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transformStyle = 'preserve-3d';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
      card.style.transform  = '';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s ease-out';
    });
  });
}

/* 11. Subtle parallax on hero blobs */
function initParallax() {
  const blobs = document.querySelectorAll('.bg-blob');
  if (!blobs.length) return;
  window.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth  - .5) * 20;
    const cy = (e.clientY / window.innerHeight - .5) * 20;
    blobs.forEach((b, i) => {
      const factor = (i + 1) * .4;
      b.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });
  }, { passive: true });
}
