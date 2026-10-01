// Quick Launch Demo Interactive Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive WhatsApp Message Generator
  const waNiche = document.getElementById('waNiche');
  const waSpend = document.getElementById('waSpend');
  const waGoal = document.getElementById('waGoal');
  const waBubbleText = document.getElementById('waBubbleText');
  const waSendBtn = document.getElementById('waSendBtn');
  
  const updateWaMessage = () => {
    if (!waBubbleText || !waSendBtn) return;
    const niche = waNiche ? waNiche.value : 'D2C Ecommerce';
    const spend = waSpend ? waSpend.value : '₹50,000 - ₹2,00,000/mo';
    const goal = waGoal ? waGoal.value : 'Scale ROAS & Cut CAC';
    
    const message = `Hi Arjun! I saw your portfolio. I run a ${niche} business with ad spend around ${spend}. Our main priority is to ${goal}. Would love to book a 20-min strategy audit call.`;
    
    waBubbleText.textContent = message;
    const encoded = encodeURIComponent(message);
    waSendBtn.href = `https://wa.me/919822379976?text=${encoded}`;
  };

  if (waNiche && waSpend && waGoal) {
    waNiche.addEventListener('change', updateWaMessage);
    waSpend.addEventListener('change', updateWaMessage);
    waGoal.addEventListener('change', updateWaMessage);
    updateWaMessage();
  }

  // 2. Contact Form with validation & WhatsApp forwarding
  const contactForm = document.getElementById('quickContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('clientService').value;
      const notes = document.getElementById('clientNotes').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and WhatsApp number.');
        return;
      }

      formFeedback.style.display = 'block';
      formFeedback.innerHTML = `
        <strong>✓ Inquiry Recorded!</strong><br>
        Thank you, ${name}. Arjun will review your notes and reach out within 2 hours on ${phone}.<br>
        <a href="https://wa.me/919822379976?text=${encodeURIComponent(`Hi Arjun, I just submitted the form on your site. Name: ${name}, Phone: ${phone}, Service: ${service}. Note: ${notes}`)}" target="_blank" class="btn btn-whatsapp" style="margin-top: 10px; font-size: 0.8rem; padding: 6px 14px;">
          Send Direct on WhatsApp Now →
        </a>
      `;
      contactForm.reset();
    });
  }

  // 3. Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
