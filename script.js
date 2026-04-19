/* ============================================================
   AASHUTOSH KUMAR GUPTA — Portfolio
   script.js  ·  Production v3
   ============================================================
   Features:
   ✦ EmailJS contact form (sends to aashutoshg01@gmail.com)
   ✦ Scroll progress bar
   ✦ Sticky glass navbar
   ✦ Active nav link highlight
   ✦ Scroll-reveal animations
   ✦ Skill bar fill on scroll
   ✦ Hero typing animation
   ✦ Back-to-top button
   ✦ Mobile menu with body-scroll lock
   ✦ Project card tilt (desktop)
   ✦ Keyboard accessibility
   ============================================================

   ⚙️  EMAILJS SETUP (REQUIRED)
   ─────────────────────────────
   1. Go to https://emailjs.com and create a free account
   2. Add an Email Service (Gmail recommended):
      Dashboard → Email Services → Add New Service → Gmail
      → Copy your SERVICE_ID (e.g. "service_abc123")
   3. Create an Email Template:
      Dashboard → Email Templates → Create New Template
      Use these template variables:
        Subject:  New Portfolio Message: {{subject}}
        Body:
          Name:    {{from_name}}
          Email:   {{from_email}}
          Subject: {{subject}}
          Message: {{message}}
      → Save → Copy TEMPLATE_ID (e.g. "template_xyz789")
   4. Get your Public Key:
      Dashboard → Account → API Keys → Public Key
   5. Paste all three values below:
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   EMAILJS CONFIG — REPLACE THESE VALUES
───────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';     // ← paste here
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';     // ← paste here
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // ← paste here

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Initialize EmailJS */
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

});

/* ─────────────────────────────────────────────
   1. SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100).toFixed(2) + '%' : '0%';
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   2. NAVBAR — glass on scroll + active links
───────────────────────────────────────────── */
function initNavbar() {
  const nav     = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  if (!nav) return;

  /* Glass effect on scroll */
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active link on scroll via IntersectionObserver */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => {
          const active = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('active', active);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => io.observe(s));
}

/* ─────────────────────────────────────────────
   3. MOBILE MENU
───────────────────────────────────────────── */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobNav');
  const close = document.getElementById('mobClose');
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const shut = () => {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => menu.classList.contains('open') ? shut() : open());
  close && close.addEventListener('click', shut);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
  document.addEventListener('keydown', e => e.key === 'Escape' && shut());

  /* Close on outside click */
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) shut();
  });

  /* Expose for any inline onclick usage */
  window.closeMob = shut;
}

/* ─────────────────────────────────────────────
   4. SCROLL REVEAL
───────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const io  = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────────
   5. SKILL BARS — animate to data-w on reveal
───────────────────────────────────────────── */
function initSkillBars() {
  const cards = document.querySelectorAll('.sk-card');
  const io    = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.fill').forEach((fill, i) => {
        const w = parseFloat(fill.dataset.w || 1);
        setTimeout(() => { fill.style.transform = `scaleX(${w})`; }, i * 130 + 200);
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  cards.forEach(c => io.observe(c));
}

/* ─────────────────────────────────────────────
   6. TYPING ANIMATION — hero role line
───────────────────────────────────────────── */
function initTyping() {
  const el = document.querySelector('.hero-role');
  if (!el) return;

  const phrases = [
    'Computer Science Student · Aspiring Software Developer · AI Enthusiast',
    'Building real-world software, one project at a time.',
    'Exploring AI, Backend Development & Robotics.',
    'B.Tech CSE · KIIT University · Batch 2027',
  ];

  /* Add blinking cursor via CSS class */
  el.classList.add('typing-cursor');

  let pi = 0, ci = 0, del = false;

  const tick = () => {
    const phrase = phrases[pi];
    el.textContent = del ? phrase.slice(0, --ci) : phrase.slice(0, ++ci);

    if (!del && ci === phrase.length) { del = true; return setTimeout(tick, 2600); }
    if (del && ci === 0)             { del = false; pi = (pi + 1) % phrases.length; return setTimeout(tick, 400); }
    setTimeout(tick, del ? 18 : 38);
  };

  setTimeout(tick, 1000);
}

/* ─────────────────────────────────────────────
   7. BACK TO TOP
───────────────────────────────────────────── */
function initBackToTop() {
  const btt = document.getElementById('btt');
  if (!btt) return;

  const toggle = () => btt.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggle();
}

/* ─────────────────────────────────────────────
   8. SMOOTH SCROLL (offset for fixed navbar)
───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id  = a.getAttribute('href');
      if (id === '#') return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      const nav    = document.getElementById('navbar');
      const offset = nav ? nav.offsetHeight + 16 : 80;
      window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   9. CONTACT FORM — EmailJS
───────────────────────────────────────────── */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const btnEl  = document.getElementById('formBtn');
  const okEl   = document.getElementById('fs-ok');
  const errEl  = document.getElementById('fs-err');
  if (!form) return;

  const showStatus = (el, show) => { el.hidden = !show; };
  const resetStatus = () => { showStatus(okEl, false); showStatus(errEl, false); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resetStatus();

    /* Validate */
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const empty = !field.value.trim();
      field.classList.toggle('err', empty);
      if (empty) valid = false;
    });

    /* Email format check */
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.classList.add('err');
      valid = false;
    }

    if (!valid) return;

    /* Check EmailJS is configured */
    const configured = typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    btnEl.textContent = 'Sending…';
    btnEl.disabled    = true;

    if (configured) {
      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        showStatus(okEl, true);
        form.reset();
      } catch (err) {
        console.error('EmailJS error:', err);
        showStatus(errEl, true);
      }
    } else {
      /* Fallback: open mailto with form data */
      const name    = form.querySelector('[name="from_name"]')?.value   || '';
      const email   = form.querySelector('[name="from_email"]')?.value  || '';
      const subject = form.querySelector('[name="subject"]')?.value     || 'Portfolio Inquiry';
      const message = form.querySelector('[name="message"]')?.value     || '';
      const body    = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href =
        `mailto:aashutoshg01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showStatus(okEl, true);
      form.reset();
    }

    btnEl.textContent = 'Send Message →';
    btnEl.disabled    = false;
  });

  /* Remove error state on input */
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('err'));
  });
}

/* ─────────────────────────────────────────────
   10. PROJECT CARD TILT (desktop pointer only)
───────────────────────────────────────────── */
function initProjectTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.proj-card:not(.proj-upcoming)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * 6;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) * -6;
      card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1), box-shadow .3s';
      card.style.transform  = '';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s ease-out, box-shadow .3s';
    });
  });
}
