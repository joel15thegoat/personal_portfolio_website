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

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

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

  if (window.innerWidth <= 820) {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.setAttribute('aria-expanded', 'false');
  }
});

// Page transition for internal navigation (fade-out before navigating)
document.addEventListener('DOMContentLoaded', () => {
  // attach to links that navigate to another page in this site
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    // skip external links and mailto
    if (href.startsWith('mailto:') || href.startsWith('http')) return;

    // Anchor links: smooth-scroll in-page
    if (href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = href.slice(1);
        const targetEl = document.getElementById(id);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // update URL without jumping
          history.pushState(null, '', href);
        } else {
          // fallback to default behavior
          window.location.hash = href;
        }
      });
      return;
    }

    // Internal page navigation: fade-out then navigate
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = target;
      }, 420);
    });
  });

  // remove fade-out if present (enter animation)
  requestAnimationFrame(() => {
    document.body.classList.remove('fade-out');
  });

  // Modal wiring
  const modalOverlay = document.querySelector('#thankyou-modal');
  const modal = modalOverlay ? modalOverlay.querySelector('.modal') : null;
  const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;
  const modalOk = modalOverlay ? modalOverlay.querySelector('.modal-ok') : null;

  function showModal() {
    if (!modalOverlay || !modal) return;
    modalOverlay.style.display = 'grid';
    // allow CSS to animate
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
          if (formSuccess) {
            formSuccess.textContent = '';
            formSuccess.style.display = 'none';
          }
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