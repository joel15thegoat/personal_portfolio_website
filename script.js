/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
(function() {
  const nameEl = document.getElementById('typewriter-name');
  if (!nameEl) return;

  const text = 'Joel Paul';
  let index = 0;

  function type() {
    if (index < text.length) {
      nameEl.textContent += text.charAt(index);
      index++;
      setTimeout(type, 120);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(type, 300);
  });
})();

/* ============================================================
   AUTO‑EXPAND ABOUT DETAILS ON SCROLL
   ============================================================ */
(function() {
  const aboutDetails = document.getElementById('about-details');
  if (!aboutDetails) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          aboutDetails.setAttribute('open', '');
        }, 400);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutDetails);
})();

/* ============================================================
   SCROLL REVEAL (FADE‑UP) OBSERVER
   ============================================================ */
(function() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally stop observing after reveal, or keep it for future re‑entrance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
})();

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('#navbar a');
const sections = document.querySelectorAll('section');

menuIcon.addEventListener('click', () => {
  const open = !navbar.classList.contains('active');
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
  menuIcon.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   SCROLL SPY (ACTIVE LINK) & MOBILE MENU AUTO‑CLOSE
   ============================================================ */
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  // Only run active‑link highlighting if there are hash‑based navbar links
  const hashLinks = document.querySelectorAll('.navbar a[href^="#"]');
  if (hashLinks.length > 0) {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (!sectionId) return;

      const activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
      if (!activeLink) return;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        activeLink.classList.add('active');
      } else {
        activeLink.classList.remove('active');
      }
    });
  }

  // Close mobile menu on scroll (all pages)
  if (window.innerWidth <= 820) {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.setAttribute('aria-expanded', 'false');
  }
});

/* ============================================================
   PAGE TRANSITIONS & INTERNAL NAVIGATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('mailto:') || href.startsWith('http')) return;

    if (href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = href.slice(1);
        const targetEl = document.getElementById(id);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', href);
        } else {
          window.location.hash = href;
        }
      });
      return;
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = target;
      }, 420);
    });
  });

  requestAnimationFrame(() => {
    document.body.classList.remove('fade-out');
  });

  /* ============================================================
     THANK‑YOU MODAL
     ============================================================ */
  const modalOverlay = document.querySelector('#thankyou-modal');
  const modal = modalOverlay ? modalOverlay.querySelector('.modal') : null;
  const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;
  const modalOk = modalOverlay ? modalOverlay.querySelector('.modal-ok') : null;

  function showModal() {
    if (!modalOverlay || !modal) return;
    modalOverlay.style.display = 'grid';
    requestAnimationFrame(() => modal.classList.add('show'));
  }

  function hideModal() {
    if (!modalOverlay || !modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 260);
  }

  if (modalClose) modalClose.addEventListener('click', hideModal);
  if (modalOk) modalOk.addEventListener('click', hideModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) hideModal();
  });

  /* ============================================================
     CONTACT FORM (AJAX)
     ============================================================ */
  const contactForm = document.querySelector('#contact-form');
  const formSuccess = document.querySelector('#form-success');
  const formError = document.querySelector('#form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.textContent = '';
        formSuccess.style.display = 'none';
      }
      if (formError) {
        formError.textContent = '';
        formError.style.display = 'none';
      }

      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });

        if (response.ok) {
          showModal();
          contactForm.reset();
        } else {
          const data = await response.json();
          if (formError) {
            formError.textContent = data.error || 'There was a problem sending your message. Please try again later.';
            formError.style.display = 'block';
          }
        }
      } catch (error) {
        if (formError) {
          formError.textContent = 'Network error. Please check your connection and try again.';
          formError.style.display = 'block';
        }
      }
    });
  }
});
