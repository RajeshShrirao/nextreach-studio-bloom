/**
 * Saffron & Smoke — Luxury Hospitality Interactions & Reservation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll state
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#0e0e12';
        navLinks.style.padding = '2rem';
        navLinks.style.borderBottom = '1px solid rgba(194, 125, 83, 0.3)';
      }
    });
  }

  // 3. Signature Plates Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const dishCards = document.querySelectorAll('.dish-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      dishCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Seating zone selection
  const seatingPills = document.querySelectorAll('.seating-pill');
  let selectedZone = 'Main Dining Room';
  seatingPills.forEach(pill => {
    pill.addEventListener('click', () => {
      seatingPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedZone = pill.getAttribute('data-zone') || 'Main Dining Room';
    });
  });

  // 5. Reservation Form Handling & Confirmation Modal
  const bookingForm = document.getElementById('bookingForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const bookingCodeDisplay = document.getElementById('bookingCodeDisplay');
  const bookingSummaryText = document.getElementById('bookingSummaryText');
  const waConfirmBtn = document.getElementById('waConfirmBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName').value.trim();
      const phone = document.getElementById('guestPhone').value.trim();
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('guestCount').value;
      const requests = document.getElementById('specialRequests').value.trim() || 'None';

      if (!name || !phone || !date || !time) {
        alert('Please complete all required fields to reserve your table.');
        return;
      }

      // Generate reference code
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const code = `SS-${new Date(date).getFullYear()}-${randomId}`;

      if (bookingCodeDisplay) bookingCodeDisplay.textContent = code;
      if (bookingSummaryText) {
        bookingSummaryText.innerHTML = `Table for <strong>${guests}</strong> on <strong>${date}</strong> at <strong>${time}</strong> in the <strong>${selectedZone}</strong> for <strong>${name}</strong>. A confirmation SMS &amp; WhatsApp have been dispatched.`;
      }

      // WhatsApp concierge link generator
      if (waConfirmBtn) {
        const waMsg = encodeURIComponent(
          `Hello Saffron & Smoke Concierge, I have made a reservation.\n\nBooking ID: ${code}\nName: ${name}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\nSeating: ${selectedZone}\nPhone: ${phone}\nNotes: ${requests}`
        );
        waConfirmBtn.href = `https://wa.me/919876521430?text=${waMsg}`;
      }

      if (confirmationModal) {
        confirmationModal.classList.add('active');
      }

      bookingForm.reset();
    });
  }

  if (modalCloseBtn && confirmationModal) {
    modalCloseBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
    });
    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove('active');
      }
    });
  }

  // 6. Interactive Menu Drawer
  const menuDrawerOverlay = document.getElementById('menuDrawerOverlay');
  const openMenuBtns = document.querySelectorAll('.open-menu-trigger');
  const closeMenuBtn = document.getElementById('closeMenuBtn');

  openMenuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (menuDrawerOverlay) menuDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeMenuBtn && menuDrawerOverlay) {
    closeMenuBtn.addEventListener('click', () => {
      menuDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    menuDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === menuDrawerOverlay) {
        menuDrawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. Scroll reveal with IntersectionObserver
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.dish-card, .review-card, .pillar-card, .space-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.is-revealed').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});
