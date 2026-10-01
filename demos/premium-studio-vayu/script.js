// Studio Vayu - Premium Interactions & Analytics Simulation
document.addEventListener('DOMContentLoaded', () => {
  // 1. Meta Pixel & GA4 Analytics Simulator
  const logAnalytics = (eventName, params = {}) => {
    const monitorText = document.getElementById('analyticsEventText');
    if (monitorText) {
      monitorText.textContent = `${eventName} (${JSON.stringify(params)})`;
    }
    // Simulate standard Meta Pixel & GA4 dispatch
    console.log(`[Meta Pixel fbq('track', '${eventName}')]`, params);
    console.log(`[Google Analytics gtag('event', '${eventName}')]`, params);
  };

  // Initial pageview
  logAnalytics('PageView', { page: window.location.pathname });

  // 2. Interactive Turnkey Cost Estimator
  const areaSlider = document.getElementById('areaSlider');
  const areaValue = document.getElementById('areaValue');
  const finishTier = document.getElementById('finishTier');
  const projectScope = document.getElementById('projectScope');
  const estimateDisplay = document.getElementById('estimateDisplay');
  const timelineDisplay = document.getElementById('timelineDisplay');
  const rfqWaBtn = document.getElementById('rfqWaBtn');

  const calculateEstimate = () => {
    if (!areaSlider || !estimateDisplay) return;

    const sqft = parseInt(areaSlider.value, 10);
    if (areaValue) areaValue.textContent = `${sqft.toLocaleString('en-IN')} sq.ft`;

    let baseRate = 3800; // base rate per sq.ft in INR
    if (finishTier) {
      if (finishTier.value === 'ultra') baseRate = 5800;
      if (finishTier.value === 'platinum') baseRate = 8500;
    }

    let scopeMultiplier = 1.0;
    let months = Math.max(6, Math.round(sqft / 1200) + 4);

    if (projectScope) {
      if (projectScope.value === 'interior') {
        scopeMultiplier = 0.75;
        months = Math.max(4, Math.round(sqft / 1800) + 3);
      } else if (projectScope.value === 'turnkey') {
        scopeMultiplier = 1.25;
        months = Math.max(8, Math.round(sqft / 1000) + 6);
      }
    }

    const totalEstimate = sqft * baseRate * scopeMultiplier;
    const inLakhs = (totalEstimate / 100000).toFixed(1);

    let displayFormatted = `₹${inLakhs} Lakhs`;
    if (totalEstimate >= 10000000) {
      const inCrores = (totalEstimate / 10000000).toFixed(2);
      displayFormatted = `₹${inCrores} Cr`;
    }

    estimateDisplay.textContent = displayFormatted;
    if (timelineDisplay) timelineDisplay.textContent = `${months} - ${months + 3} Months`;

    // Analytics event
    logAnalytics('CustomizeEstimate', { sqft, estimate: displayFormatted });

    if (rfqWaBtn) {
      const tierName = finishTier ? finishTier.options[finishTier.selectedIndex].text : 'Bespoke Luxury';
      const scopeName = projectScope ? projectScope.options[projectScope.selectedIndex].text : 'Turnkey Architecture';
      const message = `Hello Studio Vayu, I calculated an estimate on your portal: ${sqft} sq.ft, ${scopeName}, ${tierName} tier. Estimated budget: ${displayFormatted}. I would like to schedule a private concept consultation.`;
      rfqWaBtn.href = `https://wa.me/919822379976?text=${encodeURIComponent(message)}`;
    }
  };

  if (areaSlider) {
    areaSlider.addEventListener('input', calculateEstimate);
    if (finishTier) finishTier.addEventListener('change', calculateEstimate);
    if (projectScope) projectScope.addEventListener('change', calculateEstimate);
    calculateEstimate();
  }

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-cat');
        projectCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        logAnalytics('FilterPortfolio', { category: cat });
      });
    });
  }

  // 4. Consultation RFQ Form
  const rfqForm = document.getElementById('studioRfqForm');
  const rfqFeedback = document.getElementById('rfqFeedback');

  if (rfqForm && rfqFeedback) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('rfqName').value.trim();
      const clientPhone = document.getElementById('rfqPhone').value.trim();
      const city = document.getElementById('rfqCity').value;
      const budget = document.getElementById('rfqBudget').value;

      logAnalytics('Lead', { clientName, city, budget });

      rfqFeedback.style.display = 'block';
      rfqFeedback.innerHTML = `
        <div style="color: var(--gold-light); font-weight: 700; margin-bottom: 6px;">✓ Consultation Request Received</div>
        Thank you, <strong>${clientName}</strong>. Our Principal Associate will review your brief for <strong>${city}</strong> and initiate contact within 4 business hours.
        <div style="margin-top: 12px;">
          <a href="https://wa.me/919822379976?text=${encodeURIComponent(`Hello Studio Vayu, I submitted a consultation inquiry. Name: ${clientName}, Location: ${city}, Budget Tier: ${budget}.`)}" target="_blank" class="btn btn-whatsapp" style="font-size: 0.8rem; padding: 8px 16px;">
            VIP WhatsApp Concierge Connect →
          </a>
        </div>
      `;
      rfqForm.reset();
    });
  }
});
