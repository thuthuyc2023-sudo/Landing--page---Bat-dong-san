/**
 * VINHOMES GRAND PARK — LANDING PAGE
 * Frontend Vanilla JavaScript
 * Lightweight, accessible, no external JS dependencies needed except Bootstrap bundle.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.nav-link, .hero-cta-group a[href^="#"]');
  const navbarCollapse = document.getElementById('navbarResponsive');
  const consultForm = document.getElementById('consultForm');
  const formFeedback = document.getElementById('formFeedback');

  // 1. Navbar scrolled effect (add subtle shadow when scrolling down)
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Auto-close mobile navbar on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // If it's an internal anchor
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          // Close collapse menu if open (on mobile)
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }

          // Smooth scroll with navbar offset
          const navbarHeight = navbar.offsetHeight || 75;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id], footer[id]');
  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    const navbarHeight = navbar.offsetHeight || 75;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navbarHeight - 50;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.navbar-nav a[href*="#${sectionId}"]`);

      if (activeLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // 4. Consultation Form Submissions & Success Popup
  const consultModalEl = document.getElementById('consultModal');
  const successModalEl = document.getElementById('successModal');
  const modalConsultForm = document.getElementById('modalConsultForm');

  const showSuccessPopup = () => {
    // Hide consult modal if currently shown
    if (consultModalEl) {
      const bsConsultModal = bootstrap.Modal.getInstance(consultModalEl);
      if (bsConsultModal) {
        bsConsultModal.hide();
      }
    }

    // Show success popup modal
    if (successModalEl) {
      const bsSuccessModal = new bootstrap.Modal(successModalEl);
      bsSuccessModal.show();
    }
  };

  // Handle Footer Consult Form
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showSuccessPopup();
      consultForm.reset();
    });
  }

  // Handle Modal Consult Form
  if (modalConsultForm) {
    modalConsultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showSuccessPopup();
      modalConsultForm.reset();
    });
  }
});

