/* ===================================================
   ELECTRORECK SOCIETY — JAVASCRIPT
   Features: Mobile nav · Scroll spy · Event filters ·
             Registration modal · Form validation
   =================================================== */

(function () {
  'use strict';

  /* ─── DOM REFERENCES ──────────────────────────────── */
  const navbar       = document.querySelector('.navbar');
  const menuToggle   = document.querySelector('.menu-toggle');
  const navLinks     = document.querySelector('.nav-links');
  const filterBtns   = document.querySelectorAll('.filter');
  const eventCards   = document.querySelectorAll('.event-card');
  const emptyState   = document.querySelector('.empty-state');
  const modalBg      = document.getElementById('reg-modal');
  const modalForm    = document.getElementById('reg-form');
  const successState = document.getElementById('success-state');
  const modalClose   = document.querySelector('.modal-close');
  const eventNameField = document.getElementById('field-event');
  const regForm      = document.getElementById('registration-form');

  /* ─── 1. NAVBAR – SCROLL SPY ─────────────────────── */
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ─── 2. MOBILE HAMBURGER MENU ───────────────────── */
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close nav when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('is-open')) {
      menuToggle.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ─── 3. EVENT FILTER ────────────────────────────── */
  let activeFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });

      // Show / hide cards
      let visibleCount = 0;
      eventCards.forEach(card => {
        const cat = card.dataset.category;
        const show = activeFilter === 'all' || cat === activeFilter;
        card.classList.toggle('hidden', !show);
        if (show) visibleCount++;
      });

      // Empty state
      if (emptyState) {
        emptyState.classList.toggle('visible', visibleCount === 0);
      }
    });
  });

  /* ─── 4. REGISTRATION MODAL ──────────────────────── */

  // Open modal
  document.querySelectorAll('[data-register]').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.dataset.register;
      openModal(eventName);
    });
  });

  function openModal(eventName) {
    // Set event name in readonly field
    if (eventNameField) eventNameField.value = eventName;

    // Reset form state
    if (regForm) regForm.reset();
    if (eventNameField) eventNameField.value = eventName; // re-set after reset
    clearAllErrors();

    // Show form, hide success
    if (modalForm)    modalForm.classList.remove('hidden');
    if (successState) successState.classList.remove('visible');

    // Open backdrop
    modalBg.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    setTimeout(() => modalClose && modalClose.focus(), 80);
  }

  function closeModal() {
    modalBg.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Close via ✕ button
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close via backdrop click (outside .modal)
  modalBg.addEventListener('click', e => {
    if (e.target === modalBg) closeModal();
  });

  // Close via Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBg.classList.contains('is-open')) closeModal();
  });

  /* ─── 5. FORM VALIDATION ─────────────────────────── */
  const validators = {
    'field-name': {
      test: v => v.trim().length >= 2,
      msg: 'Please enter your full name (at least 2 characters).'
    },
    'field-email': {
      test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid college email address.'
    },
    'field-roll': {
      test: v => v.trim().length >= 3,
      msg: 'Please enter a valid roll number.'
    },
    'field-dept': {
      test: v => v.trim() !== '',
      msg: 'Please select your department.'
    },
    'field-year': {
      test: v => v.trim() !== '',
      msg: 'Please select your year of study.'
    },
    'field-terms': {
      test: v => v === true,
      msg: 'You must accept the terms and conditions.'
    }
  };

  function getFieldValue(id) {
    const el = document.getElementById(id);
    if (!el) return '';
    if (el.type === 'checkbox') return el.checked;
    return el.value;
  }

  function setError(fieldId, msg) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    el.setAttribute('aria-invalid', 'true');
    let errEl = document.getElementById(fieldId + '-err');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  }

  function clearError(fieldId) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    el.removeAttribute('aria-invalid');
    const errEl = document.getElementById(fieldId + '-err');
    if (errEl) errEl.classList.remove('visible');
  }

  function clearAllErrors() {
    Object.keys(validators).forEach(id => clearError(id));
  }

  // Live validation on blur
  Object.keys(validators).forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (!el) return;
    const eventType = el.type === 'checkbox' ? 'change' : 'blur';
    el.addEventListener(eventType, () => {
      const value = getFieldValue(fieldId);
      if (!validators[fieldId].test(value)) {
        setError(fieldId, validators[fieldId].msg);
      } else {
        clearError(fieldId);
      }
    });
    // Clear error on input
    if (el.type !== 'checkbox') {
      el.addEventListener('input', () => clearError(fieldId));
    }
  });

  // Submit
  if (regForm) {
    regForm.addEventListener('submit', e => {
      e.preventDefault();

      let isValid = true;
      clearAllErrors();

      Object.entries(validators).forEach(([fieldId, rule]) => {
        const value = getFieldValue(fieldId);
        if (!rule.test(value)) {
          setError(fieldId, rule.msg);
          isValid = false;
        }
      });

      if (!isValid) {
        // Scroll to first error
        const firstInvalid = regForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Success!
      showSuccess();
    });
  }

  function showSuccess() {
    if (modalForm)    modalForm.classList.add('hidden');
    if (successState) successState.classList.add('visible');
  }

  /* ─── 6. SMOOTH SCROLL for anchor links ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height') || '78', 10);
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── 7. SCROLL-TO-TOP on success "Register Another" ─ */
  const registerAnotherBtn = document.getElementById('btn-register-another');
  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener('click', () => {
      if (modalForm)    modalForm.classList.remove('hidden');
      if (successState) successState.classList.remove('visible');
      if (regForm)      regForm.reset();
      if (eventNameField) eventNameField.value = eventNameField.dataset.event || '';
      clearAllErrors();
    });
  }

  /* ─── 8. HERO scroll-cue click ───────────────────── */
  const scrollCue = document.querySelector('.scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const eventsSection = document.getElementById('events');
      if (eventsSection) {
        const top = eventsSection.getBoundingClientRect().top + window.scrollY - 78;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

})();
