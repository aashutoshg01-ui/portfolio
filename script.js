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
});

/* ─────────────────────────────────────
   RENDER: Skills from data.js
───────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid || !window.PORTFOLIO) return;

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
  if (!grid || !window.PORTFOLIO) return;

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
  if (!grid || !window.PORTFOLIO) return;

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
  if (!el || !window.PORTFOLIO) return;
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
      } catch { errEl.hidden = false; }
    } else {
      const name = form.querySelector('[name="from_name"]')?.value || '';
      const email= form.querySelector('[name="from_email"]')?.value || '';
      const sub  = form.querySelector('[name="subject"]')?.value || 'Portfolio Inquiry';
      const msg  = form.querySelector('[name="message"]')?.value || '';
      window.location.href = `mailto:aashutoshg01@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
      okEl.hidden = false;
      form.reset();
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
