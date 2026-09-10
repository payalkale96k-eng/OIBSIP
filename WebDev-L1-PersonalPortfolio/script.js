/* =========================================================
   PAYAL KALE — PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScrollState();
  initActiveNavLink();
  initSmoothScroll();
  initBackToTop();
  initScrollReveal();
  initContactForm();
  initFooterYear();
  initTerminalTyping();
});

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Navbar background on scroll ---------- */
function initNavbarScrollState() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const updateState = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };

  updateState();
  window.addEventListener('scroll', updateState, { passive: true });
}

/* ---------- Highlight active nav link based on scroll position ---------- */
function initActiveNavLink() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === id);
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
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Smooth scrolling for in-page links ---------- */
function initSmoothScroll() {
  const navHeight = document.getElementById('navbar')?.offsetHeight || 72;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}
/* ---------- Back to top button ---------- */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  const toggleVisibility = () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Scroll reveal animations ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Footer current year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Hero terminal typing effect ---------- */
function initTerminalTyping() {
  const lines = [
    { el: document.getElementById('typedLine1'), text: "name     : 'Payal Kale'" },
    { el: document.getElementById('typedLine2'), text: "branch   : 'AI & Data Science'" },
    { el: document.getElementById('typedLine3'), text: "year     : 'Second Year'" },
    { el: document.getElementById('typedLine4'), text: "status   : 'Learning & Building'" },
  ];

  const cursor = document.getElementById('typedCursor');
  if (!lines[0].el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    lines.forEach((line) => {
      line.el.textContent = line.text;
    });
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      if (cursor) cursor.style.visibility = 'visible';
      return;
    }

    const current = lines[lineIndex];

    if (charIndex <= current.text.length) {
      current.el.textContent = current.text.slice(0, charIndex);
      charIndex++;
      setTimeout(typeNextChar, 28);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 200);
    }
  }

  setTimeout(typeNextChar, 500);
}

/* ---------- Contact form validation + mailto submission ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (value) => value.trim().length > 0,
      message: 'Please enter your name.',
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: 'Please enter a valid email address.',
    },
    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subjectError'),
      validate: (value) => value.trim().length > 0,
      message: 'Please enter a subject.',
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => value.trim().length > 0,
      message: 'Please enter a message.',
    },
  };

  function validateField(field) {
    const value = field.input.value;
    const isValid = field.validate(value);

    field.input.classList.toggle('input-error', !isValid);
    field.error.textContent = isValid ? '' : field.message;

    return isValid;
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener('blur', () => validateField(field));
    field.input.addEventListener('input', () => {
      if (field.input.classList.contains('input-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.values(fields).forEach((field) => {
      if (!validateField(field)) {
        allValid = false;
      }
    });

    if (!allValid) return;

    const name = fields.name.input.value.trim();
    const email = fields.email.input.value.trim();
    const subject = fields.subject.input.value.trim();
    const message = fields.message.input.value.trim();

    const mailtoAddress = 'payalkale96k@gmail.com';
    const mailtoSubject = encodeURIComponent(`Portfolio contact: ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${mailtoAddress}?subject=${mailtoSubject}&body=${mailtoBody}`;

    form.reset();
    Object.values(fields).forEach((field) => {
      field.input.classList.remove('input-error');
      field.error.textContent = '';
    });
  });
}