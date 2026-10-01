// Oak & Elm Clinic - Interactive Features
document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Filtering
  const filterButtons = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-card');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 2. Appointment Booking Form
  const bookingForm = document.getElementById('clinicBookingForm');
  const bookingFeedback = document.getElementById('bookingFeedback');

  if (bookingForm && bookingFeedback) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('patientName').value.trim();
      const patientPhone = document.getElementById('patientPhone').value.trim();
      const branch = document.getElementById('clinicBranch').value;
      const service = document.getElementById('clinicService').value;
      const appointmentDate = document.getElementById('appointmentDate').value;
      const slot = document.getElementById('appointmentSlot').value;

      if (!patientName || !patientPhone || !appointmentDate) {
        alert('Please fill out all required fields.');
        return;
      }

      bookingFeedback.style.display = 'block';
      bookingFeedback.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 6px;">✓ Appointment Request Received!</div>
        Dear <strong>${patientName}</strong>, your tentative booking for <strong>${service}</strong> at our <strong>${branch}</strong> clinic on <strong>${appointmentDate} (${slot})</strong> is recorded.
        <div style="margin-top: 10px;">
          <a href="https://wa.me/919822379976?text=${encodeURIComponent(`Hello Oak & Elm Clinic, I would like to confirm my appointment request. Name: ${patientName}, Branch: ${branch}, Treatment: ${service}, Date: ${appointmentDate}, Slot: ${slot}`)}" target="_blank" class="btn btn-whatsapp" style="font-size: 0.85rem; padding: 8px 16px;">
            Confirm Instantly on WhatsApp →
          </a>
        </div>
      `;
      bookingForm.reset();
    });
  }
});
