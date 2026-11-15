/**
 * ReCycleHub - Interactive Pickup Request Wizard
 * 4-Step Booking Engine with Live Quote, CO2 Calculation & LocalStorage Persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingWizard();
});

function initBookingWizard() {
  const wizardForm = document.getElementById('pickupWizardForm');
  if (!wizardForm) return;

  let currentStep = 1;
  const totalSteps = 4;

  // State
  const bookingState = {
    serviceType: 'Residential',
    category: 'plastic',
    categoryName: 'Plastics & Polymers',
    weightKg: 20,
    preferredDate: '',
    preferredTimeSlot: '09:00 AM - 12:00 PM',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    city: 'San Francisco, CA',
    postalCode: '94107',
    notes: '',
    photoUploaded: false,
    unitRate: 0.45,
    co2Factor: 1.8,
    baseFee: 10.00
  };

  // Set default minimum date (tomorrow)
  const dateInput = document.getElementById('pickupDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    bookingState.preferredDate = dateInput.value;
  }

  // Prepopulate user info if available
  const user = window.ReCycleStore ? window.ReCycleStore.getUser() : null;
  if (user) {
    const nameInput = document.getElementById('customerName');
    const emailInput = document.getElementById('customerEmail');
    const phoneInput = document.getElementById('customerPhone');
    const addrInput = document.getElementById('customerAddress');

    if (nameInput && !nameInput.value) nameInput.value = user.name;
    if (emailInput && !emailInput.value) emailInput.value = user.email;
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone;
    if (addrInput && !addrInput.value) addrInput.value = user.defaultAddress || '';
  }

  // Handle Category Tile Clicks
  const categoryTiles = document.querySelectorAll('input[name="wasteCategory"]');
  categoryTiles.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const catId = e.target.value;
      const catObj = window.ReCycleStore ? window.ReCycleStore.getCategoryById(catId) : null;
      if (catObj) {
        bookingState.category = catObj.id;
        bookingState.categoryName = catObj.name;
        bookingState.unitRate = catObj.ratePerKg;
        bookingState.co2Factor = catObj.co2PerKg;
      }
      updateLiveSummary();
    });
  });

  // Handle Service Type (Residential / Commercial / Industrial)
  const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
  serviceTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      bookingState.serviceType = e.target.value;
      bookingState.baseFee = e.target.value === 'Residential' ? 10.00 : e.target.value === 'Commercial' ? 25.00 : 50.00;
      updateLiveSummary();
    });
  });

  // Handle Weight Slider or Input
  const weightInput = document.getElementById('wasteWeight');
  const weightDisplay = document.getElementById('weightDisplay');
  if (weightInput) {
    weightInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 5;
      bookingState.weightKg = val;
      if (weightDisplay) weightDisplay.textContent = `${val} kg`;
      updateLiveSummary();
    });
  }

  // Photo Simulator
  const photoDropzone = document.getElementById('photoDropzone');
  const photoInput = document.getElementById('wastePhotoInput');
  const photoPreview = document.getElementById('photoPreview');
  if (photoDropzone && photoInput) {
    photoDropzone.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        bookingState.photoUploaded = true;
        if (photoPreview) {
          photoPreview.innerHTML = `
            <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;background:var(--color-mint);border-radius:var(--radius-md);">
              <i class="fa-solid fa-file-image" style="color:var(--color-emerald);font-size:1.5rem;"></i>
              <div style="flex:1;">
                <strong>${e.target.files[0].name}</strong>
                <div style="font-size:0.75rem;color:var(--text-muted);">${(e.target.files[0].size / 1024).toFixed(1)} KB</div>
              </div>
              <span class="badge badge-emerald">Ready</span>
            </div>
          `;
        }
        showToast('Image Attached', 'Waste batch photo uploaded for route assessment.', 'success');
      }
    });
  }

  // Step Navigation Buttons
  const nextBtns = document.querySelectorAll('.wizard-next-btn');
  const prevBtns = document.querySelectorAll('.wizard-prev-btn');

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          currentStep++;
          goToStep(currentStep);
        }
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        goToStep(currentStep);
      }
    });
  });

  function goToStep(step) {
    // Hide all step sections
    document.querySelectorAll('.wizard-step-pane').forEach(pane => {
      pane.style.display = 'none';
    });
    // Show current
    const currentPane = document.getElementById(`wizardStep${step}`);
    if (currentPane) currentPane.style.display = 'block';

    // Update stepper visual items
    const stepIndicators = document.querySelectorAll('.stepper-header .step-item');
    stepIndicators.forEach((item, idx) => {
      const stepNum = idx + 1;
      item.classList.remove('active', 'completed');
      if (stepNum === step) {
        item.classList.add('active');
      } else if (stepNum < step) {
        item.classList.add('completed');
      }
    });

    // Populate review if step 4
    if (step === 4) {
      populateReviewStep();
    }

    // Scroll to top of wizard
    wizardForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateLiveSummary();
  }

  function validateStep(step) {
    if (step === 1) {
      // Must have category selected
      const selectedCat = document.querySelector('input[name="wasteCategory"]:checked');
      if (!selectedCat) {
        showToast('Selection Required', 'Please select a waste category to proceed.', 'warning');
        return false;
      }
      return true;
    }

    if (step === 2) {
      const weightVal = parseFloat(document.getElementById('wasteWeight')?.value) || 0;
      if (weightVal <= 0) {
        showToast('Invalid Weight', 'Please specify an estimated weight greater than 0 kg.', 'warning');
        return false;
      }
      return true;
    }

    if (step === 3) {
      const name = document.getElementById('customerName')?.value.trim();
      const email = document.getElementById('customerEmail')?.value.trim();
      const phone = document.getElementById('customerPhone')?.value.trim();
      const addr = document.getElementById('customerAddress')?.value.trim();
      const postal = document.getElementById('customerPostal')?.value.trim();
      const date = document.getElementById('pickupDate')?.value;

      if (!name || !email || !phone || !addr || !postal || !date) {
        showToast('Missing Details', 'Please fill in all required contact and location fields.', 'warning');
        return false;
      }

      // Basic email check
      if (!email.includes('@') || !email.includes('.')) {
        showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
        return false;
      }

      // Save to state
      bookingState.customerName = name;
      bookingState.customerEmail = email;
      bookingState.customerPhone = phone;
      bookingState.address = addr;
      bookingState.postalCode = postal;
      bookingState.preferredDate = date;
      bookingState.preferredTimeSlot = document.getElementById('timeSlotSelect')?.value || '09:00 AM - 12:00 PM';
      bookingState.notes = document.getElementById('pickupNotes')?.value || '';

      return true;
    }

    return true;
  }

  function updateLiveSummary() {
    const summaryWeight = document.getElementById('sumWeight');
    const summaryCategory = document.getElementById('sumCategory');
    const summaryService = document.getElementById('sumService');
    const summaryCo2 = document.getElementById('sumCo2');
    const summaryPoints = document.getElementById('sumPoints');
    const summaryPrice = document.getElementById('sumPrice');

    const weight = bookingState.weightKg;
    const materialCost = weight * bookingState.unitRate;
    const totalCost = (bookingState.baseFee + materialCost).toFixed(2);
    const co2Saved = (weight * bookingState.co2Factor).toFixed(1);
    const points = Math.round(weight * 5);

    if (summaryWeight) summaryWeight.textContent = `${weight} kg`;
    if (summaryCategory) summaryCategory.textContent = bookingState.categoryName;
    if (summaryService) summaryService.textContent = bookingState.serviceType;
    if (summaryCo2) summaryCo2.textContent = `${co2Saved} kg`;
    if (summaryPoints) summaryPoints.textContent = `+${points} Pts`;
    if (summaryPrice) summaryPrice.textContent = `$${totalCost}`;
  }

  function populateReviewStep() {
    const weight = bookingState.weightKg;
    const totalCost = (bookingState.baseFee + weight * bookingState.unitRate).toFixed(2);
    const co2Saved = (weight * bookingState.co2Factor).toFixed(1);
    const points = Math.round(weight * 5);

    const reviewContent = document.getElementById('reviewStepContent');
    if (reviewContent) {
      reviewContent.innerHTML = `
        <div style="background:var(--bg-surface-alt);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;margin-bottom:1.5rem;">
          <h5 style="margin-bottom:1rem;color:var(--color-forest);display:flex;align-items:center;gap:0.5rem;">
            <i class="fa-solid fa-clipboard-check"></i> Pickup Dispatch Summary
          </h5>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;font-size:0.9rem;">
            <div>
              <span style="color:var(--text-muted);font-size:0.8rem;display:block;">SERVICE & STREAM</span>
              <strong>${bookingState.serviceType} Collection</strong><br>
              <span class="badge badge-${bookingState.category}" style="margin-top:0.25rem;">${bookingState.categoryName}</span>
            </div>
            <div>
              <span style="color:var(--text-muted);font-size:0.8rem;display:block;">ESTIMATED WEIGHT</span>
              <strong>${weight} kg</strong> (${(weight * 2.20462).toFixed(1)} lbs)
            </div>
            <div>
              <span style="color:var(--text-muted);font-size:0.8rem;display:block;">DATE & TIME SLOT</span>
              <strong>${bookingState.preferredDate}</strong><br>
              <span>${bookingState.preferredTimeSlot}</span>
            </div>
            <div>
              <span style="color:var(--text-muted);font-size:0.8rem;display:block;">PICKUP ADDRESS</span>
              <strong>${escapeHtml(bookingState.address)}</strong><br>
              <span>Postal Code: ${escapeHtml(bookingState.postalCode)}</span>
            </div>
            <div>
              <span style="color:var(--text-muted);font-size:0.8rem;display:block;">CONTACT PERSON</span>
              <strong>${escapeHtml(bookingState.customerName)}</strong><br>
              <span>${escapeHtml(bookingState.customerPhone)}</span>
            </div>
            <div>
              <span style="color:var(--text-muted);font-size:0.8rem;display:block;">PROJECTED IMPACT</span>
              <span style="color:var(--color-emerald);font-weight:700;">${co2Saved} kg CO₂ Offset</span><br>
              <span style="color:#D97706;font-weight:700;">+${points} Eco-Reward Points</span>
            </div>
          </div>
          <div style="margin-top:1.25rem;padding-top:1.25rem;border-top:1px dashed var(--color-border);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-weight:600;">Standard Dispatch & Processing Total:</span>
            <span style="font-family:var(--font-heading);font-size:1.75rem;font-weight:800;color:var(--color-forest);">$${totalCost}</span>
          </div>
        </div>
      `;
    }
  }

  // Final Booking Submission
  wizardForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const termsCheckbox = document.getElementById('agreeTerms');
    if (termsCheckbox && !termsCheckbox.checked) {
      showToast('Terms Agreement', 'Please accept the zero-contamination handling terms.', 'warning');
      return;
    }

    const refId = window.ReCycleStore.generateReferenceId();
    const weight = bookingState.weightKg;
    const totalCost = parseFloat((bookingState.baseFee + weight * bookingState.unitRate).toFixed(2));
    const co2Saved = parseFloat((weight * bookingState.co2Factor).toFixed(1));
    const points = Math.round(weight * 5);

    const newPickup = {
      id: refId,
      customerName: bookingState.customerName,
      customerEmail: bookingState.customerEmail,
      customerPhone: bookingState.customerPhone,
      address: bookingState.address,
      city: 'San Francisco, CA',
      postalCode: bookingState.postalCode,
      serviceType: bookingState.serviceType,
      category: bookingState.category,
      categoryName: bookingState.categoryName,
      weightKg: weight,
      preferredDate: bookingState.preferredDate,
      preferredTimeSlot: bookingState.preferredTimeSlot,
      status: 'Pending',
      assignedStaff: 'Unassigned',
      vehicleId: 'TBD',
      amount: totalCost,
      notes: bookingState.notes || 'Zero-contamination sorted collection.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ecoPointsEarned: points,
      co2SavedKg: co2Saved
    };

    // Save to store
    window.ReCycleStore.savePickup(newPickup);

    // Show Confirmation Modal
    showBookingSuccessModal(newPickup);
  });

  function showBookingSuccessModal(pickup) {
    const modalHtml = `
      <div class="modal-overlay active" id="bookingSuccessModal">
        <div class="modal-container" style="max-width:540px;text-align:center;padding:2.5rem 2rem;">
          <div style="width:72px;height:72px;border-radius:50%;background:var(--color-mint);color:var(--color-emerald);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 1.5rem;">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <span class="badge badge-emerald" style="margin-bottom:0.75rem;">Request Confirmed</span>
          <h3 style="margin-bottom:0.5rem;">Pickup Scheduled Successfully!</h3>
          <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:1.5rem;">
            Your zero-waste pickup dispatch order has been lodged with EcoOps logistics.
          </p>

          <div style="background:var(--bg-surface-alt);border:1px dashed var(--color-emerald);border-radius:var(--radius-md);padding:1rem;margin-bottom:1.5rem;display:inline-block;width:100%;">
            <span style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">YOUR REFERENCE TRACKING ID</span>
            <div style="font-family:var(--font-heading);font-size:1.75rem;font-weight:800;color:var(--color-forest);letter-spacing:0.05em;margin-top:0.25rem;">
              ${pickup.id}
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            <a href="user-dashboard.html" class="btn btn-primary btn-block">
              <i class="fa-solid fa-gauge-high"></i> View in User Dashboard
            </a>
            <a href="admin-dashboard.html" class="btn btn-outline btn-block">
              <i class="fa-solid fa-user-shield"></i> Open Admin Dispatch Portal
            </a>
            <button class="btn btn-ghost btn-sm" onclick="document.getElementById('bookingSuccessModal').remove(); window.location.href='index.html';">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    showToast('Pickup Created', `Tracking ID: ${pickup.id}`, 'success');
  }

  // Initial trigger
  updateLiveSummary();
}

