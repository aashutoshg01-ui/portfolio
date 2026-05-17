/* ================================================================
   AASHUTOSH KUMAR GUPTA — Portfolio · script.js v5
   ================================================================
   Features:
   ✦ Renders skills, projects, certs from data.js
   ✦ Project detail modal (full case study)
   ✦ Resume modal with tabs (Overview / Skills / Education)
   ✦ Certification detail modal
   ✦ EmailJS contact form
   ✦ Scroll progress, reveal, skill bars, typing
   ✦ Back-to-top, smooth scroll, parallax blobs
   ✦ Mobile menu with body-lock

   ⚙️ EMAILJS SETUP:
   1. https://emailjs.com → Sign up free
   2. Add Gmail service → copy SERVICE_ID
   3. Create email template → copy TEMPLATE_ID
      Variables: {{from_name}} {{from_email}} {{subject}} {{message}}
   4. Account → API Keys → copy PUBLIC_KEY
   5. Paste all three below:
   ================================================================ */
'use strict';

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

/* ── Icons (inline SVGs used in modals) ── */
const ICON = {
  github: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  link:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  dl:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  eye:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
};

/* ─────────────────────────────────────
   INIT
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  renderSkills();
  renderProjects();
  renderCerts();
  initModals();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSkillBars();
  initTyping();
  initBackToTop();
  initSmoothScroll();
  initContactForm();
  initParallax();
  
  initCustomCursor();
  initTiltEffect();
  initThreeJSAvatar();
  initMagneticButtons();
  initSoundFX();
  initAnimatedCounters();
  initSectionReveals();
  initSoundToggle();
});

/* ─────────────────────────────────────
   RENDER: Skills from data.js
───────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid || typeof PORTFOLIO === 'undefined') return;

  grid.innerHTML = PORTFOLIO.skills.map(sk => `
    <div class="sk-card reveal" style="--sk-color:${sk.color}">
      <div class="sk-header">
        <span class="sk-emoji">${sk.icon}</span>
        <span class="sk-title">${sk.title}</span>
      </div>
      <div class="tags">
        ${sk.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      ${sk.bars ? `
      <div class="sk-bars">
        ${sk.bars.map(b => `
          <div class="bar-row">
            <label>${b.label}</label><span>${b.pct}%</span>
            <div class="track"><div class="fill" data-w="${b.pct / 100}"></div></div>
          </div>
        `).join('')}
      </div>` : ''}
    </div>
  `).join('');

  /* Re-observe new reveal elements */
  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ─────────────────────────────────────
   RENDER: Projects (secondary grid)
───────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || typeof PORTFOLIO === 'undefined') return;

  const secondary = PORTFOLIO.projects.filter(p => !p.featured);

  grid.innerHTML = secondary.map(p => `
    <article class="proj-card reveal" data-project="${p.id}" role="button" tabindex="0" aria-label="View ${p.title} case study">
      <div class="proj-inner">
        <div class="proj-num-label">0${PORTFOLIO.projects.indexOf(p) + 1}</div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-sub">${p.subtitle}</p>
        <p class="proj-desc">${p.shortDesc}</p>
        <div class="proj-tech">
          ${p.tech.slice(0, 4).map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="proj-explore">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Click to explore full case study
        </div>
      </div>
    </article>
  `).join('') + `
    <article class="proj-card proj-card-upcoming reveal">
      <div class="upcoming-inner">
        <div class="upcoming-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        </div>
        <p class="upcoming-ttl">Next Project</p>
        <p class="upcoming-sub">Currently in development.<br>New work dropping soon.</p>
        <div class="upcoming-dots"><span></span><span></span><span></span></div>
      </div>
    </article>
  `;

  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ─────────────────────────────────────
   RENDER: Certifications
───────────────────────────────────── */
const CERT_ICONS = { dsa:'🎓', 'ai-ml':'🤖', dbms:'🗄️', flutter:'📱', excel:'📊', cgpa:'⚡' };

function renderCerts() {
  const grid = document.getElementById('certsGrid');
  if (!grid || typeof PORTFOLIO === 'undefined') return;

  grid.innerHTML = PORTFOLIO.certifications.map(c => `
    <div class="cert-card reveal" data-cert="${c.id}" role="button" tabindex="0" aria-label="View ${c.title} details">
      <div class="cert-icon-wrap"><span>${CERT_ICONS[c.id] || '📋'}</span></div>
      <div>
        <div class="cert-ttl">${c.title}</div>
        <div class="cert-org">${c.issuer}</div>
        <div class="cert-dsc">${c.desc.slice(0, 80)}…</div>
      </div>
      <div class="cert-click-hint">Click to view details →</div>
    </div>
  `).join('');

  observeReveal(grid.querySelectorAll('.reveal'));
}

/* ─────────────────────────────────────
   MODAL ENGINE
───────────────────────────────────── */
function initModals() {
  /* ── Project modal ── */
  const projModal   = document.getElementById('projectModal');
  const projBody    = document.getElementById('projectModalBody');
  const projClose   = document.getElementById('projectModalClose');
  const projBackdrop= document.getElementById('projectModalBackdrop');

  const openProject = (id) => {
    const p = PORTFOLIO.projects.find(x => x.id === id);
    if (!p) return;
    projBody.innerHTML = buildProjectModal(p);
    openModal(projModal);
  };

  projClose?.addEventListener('click', () => closeModal(projModal));
  projBackdrop?.addEventListener('click', () => closeModal(projModal));

  /* Featured project */
  const featured = document.getElementById('proj-featured');
  if (featured) {
    featured.addEventListener('click', () => openProject(featured.dataset.project));
    featured.addEventListener('keydown', e => e.key === 'Enter' && openProject(featured.dataset.project));
  }

  /* Secondary project cards (delegated) */
  document.addEventListener('click', e => {
    const card = e.target.closest('.proj-card[data-project]');
    if (card) openProject(card.dataset.project);
  });
  document.addEventListener('keydown', e => {
    const card = e.target.closest('.proj-card[data-project]');
    if (card && e.key === 'Enter') openProject(card.dataset.project);
  });

  /* ── Cert modal ── */
  const certModal    = document.getElementById('certModal');
  const certBody     = document.getElementById('certModalBody');
  const certClose    = document.getElementById('certModalClose');
  const certBackdrop = document.getElementById('certModalBackdrop');

  const openCert = (id) => {
    const c = PORTFOLIO.certifications.find(x => x.id === id);
    if (!c) return;
    certBody.innerHTML = buildCertModal(c);
    openModal(certModal);
  };

  certClose?.addEventListener('click', () => closeModal(certModal));
  certBackdrop?.addEventListener('click', () => closeModal(certModal));

  document.addEventListener('click', e => {
    const card = e.target.closest('.cert-card[data-cert]');
    if (card) openCert(card.dataset.cert);
  });
  document.addEventListener('keydown', e => {
    const card = e.target.closest('.cert-card[data-cert]');
    if (card && e.key === 'Enter') openCert(card.dataset.cert);
  });

  /* ── Resume modal ── */
  const resumeModal    = document.getElementById('resumeModal');
  const resumeBody     = document.getElementById('resumeModalBody');
  const resumeClose    = document.getElementById('resumeModalClose');
  const resumeBackdrop = document.getElementById('resumeModalBackdrop');

  const openResume = () => {
    resumeBody.innerHTML = buildResumeModal();
    openModal(resumeModal);
    /* Activate first tab */
    setTimeout(() => switchResumeTab('overview'), 50);
  };

  resumeClose?.addEventListener('click', () => closeModal(resumeModal));
  resumeBackdrop?.addEventListener('click', () => closeModal(resumeModal));

  document.getElementById('navResumeBtn')?.addEventListener('click', openResume);
  document.getElementById('heroResumeBtn')?.addEventListener('click', openResume);
  document.getElementById('resumeSectionBtn')?.addEventListener('click', openResume);

  /* Tab delegation */
  document.addEventListener('click', e => {
    const tab = e.target.closest('.r-tab[data-tab]');
    if (tab) switchResumeTab(tab.dataset.tab);
  });

  /* Global ESC close */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(projModal);
      closeModal(certModal);
      closeModal(resumeModal);
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  /* Force reflow for animation */
  const panel = modal.querySelector('.modal-panel');
  if (panel) { panel.style.animation = 'none'; panel.offsetHeight; panel.style.animation = ''; }
  /* Focus trap */
  setTimeout(() => modal.querySelector('.modal-close')?.focus(), 100);
}

function closeModal(modal) {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────
   BUILD: Project modal HTML
───────────────────────────────────── */
function buildProjectModal(p) {
  return `
    <div class="modal-sub">${p.id.toUpperCase()} · CASE STUDY</div>
    <h2>${p.title}</h2>
    <p class="pf-tag" style="margin-bottom:8px">${p.subtitle}</p>

    <div class="modal-section">
      <div class="modal-section-title">Overview</div>
      <p class="modal-desc">${p.fullDesc}</p>
    </div>

    <div class="modal-2col" style="margin-top:24px">
      <div>
        <div class="modal-section">
          <div class="modal-section-title">Key Features</div>
          <ul class="modal-feats">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Tech Stack</div>
          <div class="modal-tech">
            ${p.tech.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
      </div>
      <div>
        <div class="modal-section">
          <div class="modal-section-title">My Role</div>
          <div class="modal-highlight">${p.role}</div>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Challenge Solved</div>
          <div class="modal-highlight">${p.challenges}</div>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Future Roadmap</div>
          <div class="modal-highlight">${p.improvements}</div>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      ${p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener" class="btn-primary">
          ${ICON.github} View on GitHub
        </a>` : ''}
      ${p.live ? `
        <a href="${p.live}" target="_blank" rel="noopener" class="btn-secondary">
          ${ICON.link} Live Demo
        </a>` : ''}
      <a href="#contact" class="btn-tertiary" onclick="document.getElementById('projectModal').hidden=true;document.body.style.overflow=''">
        Collaborate on This →
      </a>
    </div>
  `;
}

/* ─────────────────────────────────────
   BUILD: Cert modal HTML
───────────────────────────────────── */
function buildCertModal(c) {
  return `
    <div class="cert-icon-large">${CERT_ICONS[c.id] || '📋'}</div>
    <div class="modal-sub">${c.issuer.toUpperCase()} · ${c.date}</div>
    <h2>${c.title}</h2>

    <div class="modal-section">
      <div class="modal-section-title">About This Milestone</div>
      <p class="modal-desc">${c.desc}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Skills Covered</div>
      <div class="cert-skill-tags">
        ${c.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Details</div>
      <div class="modal-highlight">
        <strong>Issuer:</strong> ${c.issuer}<br>
        <strong>Period:</strong> ${c.date}<br>
        <strong>Status:</strong> Completed
      </div>
    </div>

    ${c.verify ? `
    <div class="modal-actions">
      <a href="${c.verify}" target="_blank" rel="noopener" class="btn-primary">${ICON.link} Verify Certificate</a>
    </div>` : `
    <div class="modal-actions">
      <a href="#contact" class="btn-secondary" onclick="document.getElementById('certModal').hidden=true;document.body.style.overflow=''">Discuss This Skill →</a>
    </div>`}
  `;
}

/* ─────────────────────────────────────
   BUILD: Resume modal HTML (with tabs)
───────────────────────────────────── */
function buildResumeModal() {
  const r = PORTFOLIO.resumeSummary;
  const s = PORTFOLIO.skills;

  return `
    <div class="modal-sub">AASHUTOSH KUMAR GUPTA · RESUME</div>
    <h2>Professional Profile</h2>
    <p style="color:var(--t2);font-size:.88rem;margin-top:8px">${PORTFOLIO.degree} · ${PORTFOLIO.university}</p>

    <div class="resume-tabs" style="margin-top:24px">
      <button class="r-tab" data-tab="overview">Overview</button>
      <button class="r-tab" data-tab="skills">Skills</button>
      <button class="r-tab" data-tab="education">Education</button>
    </div>

    <!-- Overview tab -->
    <div class="r-panel" id="rtab-overview">
      <div class="modal-section">
        <div class="modal-section-title">Career Objective</div>
        <p class="modal-desc">${r.objective}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Key Highlights</div>
        <ul class="resume-highlight-list">
          ${r.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Core Strengths</div>
        <div class="resume-strength-grid">
          ${r.strengths.map(s => `<div class="strength-item">${s}</div>`).join('')}
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Experience</div>
        <div class="modal-highlight">${r.experience}</div>
      </div>
    </div>

    <!-- Skills tab -->
    <div class="r-panel" id="rtab-skills">
      ${s.map(sk => `
        <div class="modal-section">
          <div class="modal-section-title">${sk.icon} ${sk.title}</div>
          <div class="modal-tech">${sk.tags.map(t => `<span>${t}</span>`).join('')}</div>
        </div>
      `).join('')}
    </div>

    <!-- Education tab -->
    <div class="r-panel" id="rtab-education">
      ${r.education.map(e => `
        <div class="edu-item">
          <strong>${e.degree}</strong>
          <span>${e.inst}</span>
          <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
            <span class="pill">${e.year}</span>
            <span class="pill gold">${e.grade}</span>
          </div>
        </div>
      `).join('')}
      <div class="modal-section" style="margin-top:24px">
        <div class="modal-section-title">Projects Highlights</div>
        <ul class="resume-highlight-list">
          ${PORTFOLIO.projects.map(p => `<li><strong>${p.title}</strong> — ${p.shortDesc}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="modal-actions">
      <a href="${PORTFOLIO.resume}" download class="btn-primary">${ICON.dl} Download PDF Resume</a>
      <a href="${PORTFOLIO.resume}" target="_blank" class="btn-secondary">${ICON.eye} View Full PDF</a>
      <a href="mailto:${PORTFOLIO.email}?subject=Resume Request" class="btn-tertiary">Request via Email</a>
    </div>
  `;
}

function switchResumeTab(id) {
  document.querySelectorAll('.r-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  document.querySelectorAll('.r-panel').forEach(p => p.classList.toggle('active', p.id === `rtab-${id}`));
}

/* ─────────────────────────────────────
   1. SCROLL PROGRESS
───────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100).toFixed(2) + '%' : '0%';
  }, { passive: true });
}

/* ─────────────────────────────────────
   2. NAVBAR
───────────────────────────────────── */
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
      if (e.isIntersecting)
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.45 });
  sects.forEach(s => io.observe(s));
}

/* ─────────────────────────────────────
   3. MOBILE MENU
───────────────────────────────────── */
function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobNav');
  const close = document.getElementById('mobClose');
  if (!btn || !menu) return;

  const open = () => { menu.classList.add('open'); btn.classList.add('open'); btn.setAttribute('aria-expanded','true'); menu.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
  const shut = () => { menu.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };

  btn.addEventListener('click', () => menu.classList.contains('open') ? shut() : open());
  close?.addEventListener('click', shut);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
  document.addEventListener('keydown', e => e.key === 'Escape' && shut());
  document.addEventListener('click', e => { if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) shut(); });
}

/* ─────────────────────────────────────
   4. SCROLL REVEAL
───────────────────────────────────── */
function observeReveal(elements) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => io.observe(el));
}

function initScrollReveal() {
  observeReveal(document.querySelectorAll('.reveal'));
}

/* ─────────────────────────────────────
   5. SKILL BARS
───────────────────────────────────── */
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

/* ─────────────────────────────────────
   6. TYPING ANIMATION
───────────────────────────────────── */
function initTyping() {
  const el = document.getElementById('heroRole');
  if (!el || typeof PORTFOLIO === 'undefined') return;
  const phrases = PORTFOLIO.typingPhrases;
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

/* ─────────────────────────────────────
   7. BACK TO TOP
───────────────────────────────────── */
function initBackToTop() {
  const btt = document.getElementById('btt');
  if (!btt) return;
  const toggle = () => btt.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggle();
}

/* ─────────────────────────────────────
   8. SMOOTH SCROLL
───────────────────────────────────── */
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

/* ─────────────────────────────────────
   9. CONTACT FORM (EmailJS)
───────────────────────────────────── */
function initContactForm() {
  const form  = document.getElementById('contactForm');
  const btn   = document.getElementById('formBtn');
  const okEl  = document.getElementById('fs-ok');
  const errEl = document.getElementById('fs-err');
  if (!form) return;

  const resetStatus = () => { okEl.hidden = true; errEl.hidden = true; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    resetStatus();

    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      const empty = !f.value.trim();
      f.classList.toggle('err', empty);
      if (empty) valid = false;
    });
    const ef = form.querySelector('[type="email"]');
    if (ef && ef.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ef.value)) { ef.classList.add('err'); valid = false; }
    if (!valid) return;

    const configured = typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
    const origHTML = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;

    if (configured) {
      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        okEl.hidden = false;
        form.reset();
        SoundFX.play('chime');
        launchConfetti();
      } catch { errEl.hidden = false; }
    } else {
      const name = form.querySelector('[name="from_name"]')?.value || '';
      const email= form.querySelector('[name="from_email"]')?.value || '';
      const sub  = form.querySelector('[name="subject"]')?.value || 'Portfolio Inquiry';
      const msg  = form.querySelector('[name="message"]')?.value || '';
      window.location.href = `mailto:aashutoshg01@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
      okEl.hidden = false;
      form.reset();
      SoundFX.play('chime');
      launchConfetti();
    }

    btn.innerHTML = origHTML;
    btn.disabled = false;
  });

  form.querySelectorAll('input, textarea').forEach(f =>
    f.addEventListener('input', () => f.classList.remove('err'))
  );
}

/* ─────────────────────────────────────
   10. PARALLAX (hero blobs on mouse)
───────────────────────────────────── */
function initParallax() {
  const blobs = document.querySelectorAll('.bg-blob');
  if (!blobs.length) return;
  window.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth - .5) * 20;
    const cy = (e.clientY / window.innerHeight - .5) * 20;
    blobs.forEach((b, i) => {
      const f = (i + 1) * .4;
      b.style.transform = `translate(${cx * f}px,${cy * f}px)`;
    });
  }, { passive: true });
}

/* ─────────────────────────────────────
   11. CUSTOM CURSOR
───────────────────────────────────── */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !glow) return;

  window.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    
    // Smooth follow for glow
    glow.animate({
      left: e.clientX + 'px',
      top: e.clientY + 'px'
    }, { duration: 500, fill: 'forwards' });
  });

  const hoverElements = document.querySelectorAll('a, button, input, textarea, [role="button"], .proj-card, .cert-card, .nav-logo');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ─────────────────────────────────────
   12. TILT EFFECT
───────────────────────────────────── */
function initTiltEffect() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cards = document.querySelectorAll('.proj-card, .cert-card, .glass-card');
  cards.forEach(card => {
    card.classList.add('tilt-card');
    const inner = card.firstElementChild || card;
    if(inner !== card) inner.classList.add('tilt-card-inner');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height/2) / (rect.height/2)) * -10;
      const rotateY = ((x - rect.width/2) / (rect.width/2)) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ─────────────────────────────────────
   13. THREE.JS 3D AVATAR
───────────────────────────────────── */
function initThreeJSAvatar() {
  const container = document.getElementById('hero-3d-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 16;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Main Robot Group
  const avatar = new THREE.Group();
  scene.add(avatar);

  // 1. Robot Head
  const headGroup = new THREE.Group();
  headGroup.position.y = 2;
  avatar.add(headGroup);

  const headGeom = new THREE.BoxGeometry(2.8, 2.2, 2.8);
  const headMat = new THREE.MeshPhysicalMaterial({ color: 0x0a1025, metalness: 0.95, roughness: 0.05, clearcoat: 1.0, clearcoatRoughness: 0.1 });
  const head = new THREE.Mesh(headGeom, headMat);
  headGroup.add(head);

  // Head edge glow
  const headEdge = new THREE.Mesh(new THREE.BoxGeometry(2.85, 2.25, 2.85), new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: 0.15 }));
  headGroup.add(headEdge);

  // Antenna
  const antennaPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8), new THREE.MeshStandardMaterial({ color: 0x60a5fa, metalness: 0.8 }));
  antennaPole.position.set(0, 1.7, 0);
  headGroup.add(antennaPole);
  const antennaBall = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 3 }));
  antennaBall.position.set(0, 2.4, 0);
  headGroup.add(antennaBall);

  // Robot Eye (Glowing) - bigger and brighter
  const eyeGeom = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);
  eyeGeom.rotateX(Math.PI / 2);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 4 });
  const eye = new THREE.Mesh(eyeGeom, eyeMat);
  eye.position.set(0, 0.15, 1.45);
  headGroup.add(eye);
  // Eye inner pupil
  const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 }));
  pupil.rotation.x = Math.PI / 2;
  pupil.position.set(0, 0.15, 1.48);
  headGroup.add(pupil);

  // Rotating ring halo around head
  const ringGeom = new THREE.TorusGeometry(2.2, 0.06, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, emissive: 0xc9a84c, emissiveIntensity: 1.5, metalness: 0.8 });
  const headRing = new THREE.Mesh(ringGeom, ringMat);
  headRing.rotation.x = Math.PI / 2;
  headGroup.add(headRing);
  // Second ring
  const headRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.04, 16, 64), new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 1, transparent: true, opacity: 0.6 }));
  headRing2.rotation.x = Math.PI / 3;
  headGroup.add(headRing2);

  // 2. Robot Body (Dual layer - solid core + wireframe shell)
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = -2.5;
  avatar.add(bodyGroup);

  const bodyGeom = new THREE.ConeGeometry(2.2, 4, 4);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.7, roughness: 0.3, wireframe: true });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  bodyGroup.add(body);
  // Solid inner body
  const bodyInner = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3.2, 4), new THREE.MeshPhysicalMaterial({ color: 0x0a1025, metalness: 0.9, roughness: 0.1, clearcoat: 0.8 }));
  bodyGroup.add(bodyInner);

  // Inner Core - larger and brighter
  const coreGeom = new THREE.OctahedronGeometry(1.2, 1);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, emissive: 0xc9a84c, emissiveIntensity: 2 });
  const core = new THREE.Mesh(coreGeom, coreMat);
  bodyGroup.add(core);

  // 3. Floating Orbitals - bigger with glow
  const orbitalGeom = new THREE.IcosahedronGeometry(0.8, 1);
  const orbitalMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 1.5, metalness: 0.5, roughness: 0.2 });
  const leftOrbital = new THREE.Mesh(orbitalGeom, orbitalMat);
  leftOrbital.position.set(-3, 0, 0);
  bodyGroup.add(leftOrbital);
  const rightOrbital = new THREE.Mesh(orbitalGeom, orbitalMat);
  rightOrbital.position.set(3, 0, 0);
  bodyGroup.add(rightOrbital);

  // Orbital connecting beams (energy lines)
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.3 });
  const leftBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3, 8), beamMat);
  leftBeam.rotation.z = Math.PI / 2; leftBeam.position.set(-1.5, 0, 0);
  bodyGroup.add(leftBeam);
  const rightBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3, 8), beamMat);
  rightBeam.rotation.z = Math.PI / 2; rightBeam.position.set(1.5, 0, 0);
  bodyGroup.add(rightBeam);

  // Particles (Interactive) - MORE and BIGGER
  const particleGeom = new THREE.BufferGeometry();
  const particleCount = 500;
  const posArray = new Float32Array(particleCount * 3);
  const originalPosArray = new Float32Array(particleCount * 3); 

  for(let i=0; i<particleCount*3; i++) {
    const p = (Math.random() - 0.5) * 24;
    posArray[i] = p;
    originalPosArray[i] = p;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    color: 0xc9a84c,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);

  // Secondary blue particles
  const particleGeom2 = new THREE.BufferGeometry();
  const pCount2 = 200;
  const posArray2 = new Float32Array(pCount2 * 3);
  for(let i=0; i<pCount2*3; i++) posArray2[i] = (Math.random() - 0.5) * 18;
  particleGeom2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
  const particles2 = new THREE.Points(particleGeom2, new THREE.PointsMaterial({ size: 0.08, color: 0x60a5fa, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
  scene.add(particles2);

  // Lighting - MUCH stronger
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight1 = new THREE.PointLight(0xc9a84c, 5, 60);
  pointLight1.position.set(5, 5, 8);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0x60a5fa, 5, 60);
  pointLight2.position.set(-5, -5, 8);
  scene.add(pointLight2);
  // Rim light from behind
  const rimLight = new THREE.PointLight(0xc9a84c, 4, 40);
  rimLight.position.set(0, 3, -8);
  scene.add(rimLight);
  // Bottom fill
  const bottomLight = new THREE.PointLight(0x60a5fa, 2, 30);
  bottomLight.position.set(0, -6, 4);
  scene.add(bottomLight);

  // Interaction Tracking
  let mouseX = 0;
  let mouseY = 0;
  let normalizedMouse = new THREE.Vector2();
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  let scrollY = window.scrollY;

  const raycaster = new THREE.Raycaster();
  let isClicked = false;
  let clickTime = 0;

  // Add event listeners
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
    
    // For Raycaster & Repulsion
    const rect = container.getBoundingClientRect();
    if(event.clientX >= rect.left && event.clientX <= rect.right &&
       event.clientY >= rect.top && event.clientY <= rect.bottom) {
       normalizedMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
       normalizedMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
  });

  container.addEventListener('click', () => {
    raycaster.setFromCamera(normalizedMouse, camera);
    const intersects = raycaster.intersectObjects([head, body, core, leftOrbital, rightOrbital]);
    if (intersects.length > 0) {
      isClicked = true;
      clickTime = clock.getElapsedTime();
      eyeMat.emissive.setHex(0xf87171);
      eyeMat.color.setHex(0xef4444);
      SoundFX.play('whoosh');
    }
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // 1. Mouse Tracking (Aligned with cursor)
    const targetX = mouseX * 0.003;
    const targetY = mouseY * 0.003;

    // Head looks directly at cursor quickly
    headGroup.rotation.y += 0.1 * (targetX - headGroup.rotation.y);
    headGroup.rotation.x += 0.1 * (targetY - headGroup.rotation.x);

    // Body follows slightly slower for a natural rig feel
    bodyGroup.rotation.y += 0.05 * (targetX * 0.5 - bodyGroup.rotation.y);
    bodyGroup.rotation.x += 0.05 * (targetY * 0.5 - bodyGroup.rotation.x);

    // Dynamic Lighting (Lights follow cursor for a flashlight effect)
    pointLight1.position.x += 0.05 * ((mouseX * 0.02) - pointLight1.position.x);
    pointLight1.position.y += 0.05 * (-(mouseY * 0.02) - pointLight1.position.y);
    pointLight2.position.x += 0.05 * (-(mouseX * 0.02) - pointLight2.position.x);

    // Click Reaction Animation (Rapid spin and reset)
    if (isClicked) {
      const timeSinceClick = elapsedTime - clickTime;
      if (timeSinceClick < 1.5) {
        headGroup.rotation.y += 0.3; // Spin rapidly
        bodyGroup.rotation.y -= 0.2;
      } else {
        isClicked = false;
        eyeMat.emissive.setHex(0x3b82f6); // Reset to blue
        eyeMat.color.setHex(0x60a5fa);
      }
    }

    // 2. Scroll Impact (Exploded View / Sliding Down)
    const scrollFactor = Math.min(scrollY / 600, 1);

    // Impactful Edits on Scroll
    headGroup.position.y = 1.5 + (scrollFactor * 3);
    headGroup.rotation.z = scrollFactor * Math.PI / 4;
    
    bodyGroup.position.y = -2 - (scrollFactor * 4);
    bodyGroup.rotation.z = -scrollFactor * Math.PI / 6;
    
    leftOrbital.position.x = -3 - (scrollFactor * 3);
    rightOrbital.position.x = 3 + (scrollFactor * 3);

    camera.position.z = 16 - (scrollFactor * 6);

    // 3. Idle Animations
    core.rotation.y = elapsedTime * 1.5;
    core.rotation.x = elapsedTime * 0.7;
    core.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.08);
    
    // Ring rotations
    headRing.rotation.z = elapsedTime * 0.8;
    headRing2.rotation.z = -elapsedTime * 0.5;
    headRing2.rotation.y = elapsedTime * 0.3;
    
    // Antenna pulse
    antennaBall.scale.setScalar(1 + Math.sin(elapsedTime * 4) * 0.3);
    
    // Pupil pulse
    pupil.scale.setScalar(0.8 + Math.sin(elapsedTime * 2) * 0.2);
    
    // Beam pulsing opacity
    beamMat.opacity = 0.15 + Math.sin(elapsedTime * 3) * 0.15;
    
    leftOrbital.rotation.x = elapsedTime * 1.2;
    leftOrbital.rotation.y = elapsedTime * 1.2;
    rightOrbital.rotation.x = -elapsedTime * 1.2;
    rightOrbital.rotation.y = -elapsedTime * 1.2;
    
    // Orbital orbit (they circle the body)
    leftOrbital.position.x = -3 * Math.cos(elapsedTime * 0.8);
    leftOrbital.position.z = 3 * Math.sin(elapsedTime * 0.8);
    rightOrbital.position.x = 3 * Math.cos(elapsedTime * 0.8);
    rightOrbital.position.z = -3 * Math.sin(elapsedTime * 0.8);
    
    // Floating effect - more pronounced
    avatar.position.y = Math.sin(elapsedTime * 1.5) * 0.6 - (scrollFactor * 2);
    
    // Blue particles rotation
    particles2.rotation.y = -elapsedTime * 0.05;
    particles2.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
    
    // Particle Repulsion Effect
    const positions = particleGeom.attributes.position.array;
    for(let i=0; i<particleCount; i++) {
        const px = originalPosArray[i*3];
        const py = originalPosArray[i*3 + 1];
        const pz = originalPosArray[i*3 + 2];

        // Repel from mouse target
        const dx = px - (targetX * 5);
        const dy = py - (-targetY * 5);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 3) {
            positions[i*3] = px + (dx/dist) * (3 - dist);
            positions[i*3 + 1] = py + (dy/dist) * (3 - dist);
        } else {
            // Slowly return to original
            positions[i*3] += (px - positions[i*3]) * 0.05;
            positions[i*3 + 1] += (py - positions[i*3 + 1]) * 0.05;
        }
    }
    particleGeom.attributes.position.needsUpdate = true;
    particles.rotation.y = elapsedTime * 0.03 + (scrollFactor * 0.5); 

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler (responsive FOV for mobile)
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.fov = w < 400 ? 55 : w < 700 ? 50 : 45;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ─────────────────────────────────────
   14. MAGNETIC BUTTONS
───────────────────────────────────── */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const magnets = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary, .nav-logo');
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', e => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    magnet.addEventListener('mouseleave', () => {
      magnet.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ─────────────────────────────────────
   15. SOUND FX (Web Audio API)
───────────────────────────────────── */
const SoundFX = {
  ctx: null,
  enabled: true,
  unlocked: false,
  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.unlocked = true;
  },
  play(type) {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    try { this[type](); } catch(e) {}
  },
  tick() {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine'; o.frequency.value = 3200;
    g.gain.setValueAtTime(0.06, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(); o.stop(this.ctx.currentTime + 0.06);
  },
  pop() {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 800;
    o.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.1);
    g.gain.setValueAtTime(0.12, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(); o.stop(this.ctx.currentTime + 0.12);
  },
  whoosh() {
    const bufSize = this.ctx.sampleRate * 0.3;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1000;
    f.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.3);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.08, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    src.connect(f); f.connect(g); g.connect(this.ctx.destination);
    src.start(); src.stop(this.ctx.currentTime + 0.3);
  },
  chime() {
    [880, 1100].forEach((freq, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      const t = this.ctx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(t); o.stop(t + 0.4);
    });
  },
  swoosh() {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine'; o.frequency.value = 400;
    o.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.05, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(); o.stop(this.ctx.currentTime + 0.15);
  }
};

function initSoundFX() {
  // Unlock audio on first user gesture
  const unlock = () => {
    SoundFX.init();
    document.removeEventListener('click', unlock);
    document.removeEventListener('touchstart', unlock);
  };
  document.addEventListener('click', unlock, { once: false });
  document.addEventListener('touchstart', unlock, { once: false });

  // Hover tick on buttons
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary, .nav-logo, .soc-link').forEach(el => {
    el.addEventListener('mouseenter', () => SoundFX.play('tick'));
  });

  // Click pop on buttons
  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary, .form-btn').forEach(el => {
    el.addEventListener('click', () => SoundFX.play('pop'));
  });

  // Modal swoosh
  const origOpen = window.openModal;
  if (typeof origOpen === 'undefined') {
    // Patch openModal/closeModal inline
    const _openModal = openModal;
    window._origOpenModal = _openModal;
  }
}

// Patch openModal and closeModal for sound
const _origOpenModal = openModal;
openModal = function(modal) {
  SoundFX.play('swoosh');
  _origOpenModal(modal);
};
const _origCloseModal = closeModal;
closeModal = function(modal) {
  SoundFX.play('swoosh');
  _origCloseModal(modal);
};

/* ─────────────────────────────────────
   16. ANIMATED STAT COUNTERS
───────────────────────────────────── */
function initAnimatedCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const hasPlus = raw.includes('+');
      const num = parseFloat(raw);
      if (isNaN(num)) return;
      const isDecimal = raw.includes('.');
      const duration = 1500;
      const start = performance.now();
      el.classList.add('counting');

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = num * eased;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + (hasPlus ? '+' : '');
        if (progress < 1) requestAnimationFrame(step);
        else { el.textContent = raw; el.classList.remove('counting'); }
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────
   17. SECTION-SPECIFIC REVEALS
───────────────────────────────────── */
function initSectionReveals() {
  // About: text from left, cards from right
  document.querySelectorAll('#about .about-text').forEach(el => {
    el.classList.remove('reveal'); el.classList.add('reveal-left');
  });
  document.querySelectorAll('#about .about-cards').forEach(el => {
    el.classList.remove('reveal'); el.classList.add('reveal-right');
  });
  // Contact: info from left, form scales in
  document.querySelectorAll('.contact-info').forEach(el => {
    el.classList.remove('reveal'); el.classList.add('reveal-left');
  });
  document.querySelectorAll('.contact-form').forEach(el => {
    el.classList.remove('reveal'); el.classList.add('reveal-scale');
  });

  // Observe all new reveal types
  const allReveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale, .reveal-up');
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  allReveals.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────
   18. CONFETTI (on form success)
───────────────────────────────────── */
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  const colors = ['#c9a84c', '#e6c97a', '#60a5fa', '#4ade80', '#f472b6', '#a78bfa'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 4000);
}

/* ─────────────────────────────────────
   19. SOUND TOGGLE
───────────────────────────────────── */
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    SoundFX.enabled = !SoundFX.enabled;
    btn.classList.toggle('muted', !SoundFX.enabled);
    if (SoundFX.enabled) { SoundFX.init(); SoundFX.play('tick'); }
  });
}
