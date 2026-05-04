/* ================================================
   UTILS
   ================================================ */
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ================================================
   AÑO EN FOOTER
   ================================================ */
$('year').textContent = new Date().getFullYear();

/* ================================================
   DARK MODE — persiste en localStorage
   y respeta prefers-color-scheme
   ================================================ */
const html     = document.documentElement;
const themeBtn = $('theme-btn');
const KEY      = 'as-theme';

const saved = localStorage.getItem(KEY)
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

html.dataset.theme = saved;

themeBtn.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem(KEY, next);
});

/* ================================================
   BARRA DE PROGRESO DE SCROLL
   ================================================ */
const bar = $('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct.toFixed(1) + '%';
}, { passive: true });

/* ================================================
   NAVBAR — sombra al scrollear + link activo
   ================================================ */
const navbar   = $('navbar');
const navLinks = $$('.nav-links a');
const sections = $$('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* Resalta el link de la sección visible */
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
    );
  });
}, { threshold: .35 });

sections.forEach(s => navObs.observe(s));

/* ================================================
   MENÚ HAMBURGUESA
   ================================================ */
const hamburger = $('hamburger');
const navList   = $('nav-links');

hamburger.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* Cierra menú si se hace click fuera */
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navList.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ================================================
   TYPEWRITER
   ================================================ */
const roles = [
  'Técnico Superior en Cs. de Datos',
  'Desarrollador Web',
  'Analista de Datos',
  'Desarrollador Python & Django',
];

const tw = $('tw');
let ri = 0, ci = 0, deleting = false;

function type() {
  const word = roles[ri];

  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      return setTimeout(type, 2000);
    }
    return setTimeout(type, 60);
  }

  tw.textContent = word.slice(0, --ci);
  if (ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    return setTimeout(type, 400);
  }
  setTimeout(type, 30);
}

setTimeout(type, 700);

/* ================================================
   SCROLL REVEAL con IntersectionObserver
   ================================================ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    revealObs.unobserve(e.target);
  });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

$$('.reveal').forEach(el => revealObs.observe(el));

/* ================================================
   FILTRO DE PROYECTOS
   ================================================ */
const filterBtns = $$('.filter-btn');
const cards      = $$('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;

    cards.forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.classList.toggle('hidden', !show);
      /* Fuerza reveal si recién se hace visible */
      if (show) card.classList.add('visible');
    });
  });
});

/* ================================================
   FORMULARIO DE CONTACTO
   ================================================ */
const form      = $('contact-form');
const notice    = $('form-notice');
const submitBtn = $('submit-btn');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const nombre  = form.nombre.value.trim();
  const email   = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    setNotice('Por favor completá los campos obligatorios.', 'err');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setNotice('Ingresá un email válido.', 'err');
    return;
  }

  /* Estado de carga */
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Enviando…';

  /*
   * TODO: conectar con un servicio de envío real.
   * Opciones recomendadas (gratis):
   *   • Formspree  → agregar action="https://formspree.io/f/TU_ID" al <form>
   *   • Web3Forms  → fetch('https://api.web3forms.com/submit', { ... })
   *   • EmailJS    → emailjs.send(serviceId, templateId, params)
   */
  await new Promise(r => setTimeout(r, 1000)); /* Simula envío */

  setNotice('¡Mensaje enviado! Te respondo a la brevedad.', 'ok');
  form.reset();
  submitBtn.disabled = false;
  submitBtn.querySelector('span').textContent = 'Enviar mensaje';
});

function setNotice(msg, type) {
  notice.textContent = msg;
  notice.className   = 'form-notice ' + type;
  setTimeout(() => { notice.textContent = ''; notice.className = 'form-notice'; }, 5000);
}

/* ================================================
   BOTÓN VOLVER ARRIBA
   ================================================ */
const backTop = $('back-top');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

backTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);
