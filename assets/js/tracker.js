/**
 * ReCycleHub - Live Service Status Tracking Engine
 * Tracks: Pending -> Scheduled -> Assigned -> Collected -> Processing -> Completed
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceTracker();
});

function initServiceTracker() {
  const trackForm = document.getElementById('serviceTrackForm');
  const trackInput = document.getElementById('trackingIdInput');
  const trackResultContainer = document.getElementById('trackResultContainer');

  if (!trackForm) return;

  const STAGES = [
    { key: 'Pending', label: 'Request Lodged', icon: 'fa-regular fa-clock', desc: 'Order verified & awaiting depot route slot.' },
    { key: 'Scheduled', label: 'Route Scheduled', icon: 'fa-regular fa-calendar-check', desc: 'Assigned to logistics collection day.' },
    { key: 'Assigned', label: 'Fleet Dispatched', icon: 'fa-solid fa-truck-fast', desc: 'Driver and electric vehicle assigned.' },
    { key: 'Collected', label: 'Material Collected', icon: 'fa-solid fa-box-archive', desc: 'Weighed and loaded at customer site.' },
    { key: 'Processing', label: 'MRF Processing', icon: 'fa-solid fa-gears', desc: 'Optical sort & mechanical shredding.' },
    { key: 'Completed', label: 'Loop Closed', icon: 'fa-solid fa-circle-check', desc: 'Remanufactured into PCR circular goods.' }
  ];

  const stageOrder = ['Pending', 'Scheduled', 'Assigned', 'Collected', 'Processing', 'Completed'];

  const performLookup = (trackingId) => {
    if (!trackingId) {
      showToast('Tracking ID Required', 'Please enter your Reference ID (e.g., RCH-89210-2026)', 'warning');
      return;
    }

    const pickup = window.ReCycleStore ? window.ReCycleStore.getPickupById(trackingId) : null;

    if (!pickup) {
      trackResultContainer.style.display = 'block';
      trackResultContainer.innerHTML = `
        <div class="card" style="text-align:center;padding:3rem 1.5rem;border-color:#EF4444;">
          <div style="width:60px;height:60px;border-radius:50%;background:#FEE2E2;color:#EF4444;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;">
            <i class="fa-solid fa-circle-exclamation"></i>
          </div>
          <h4>Tracking Reference Not Found</h4>
          <p style="color:var(--text-muted);max-width:440px;margin:0.5rem auto 1.5rem;">
            No pickup dispatch record matches <strong>${escapeHtml(trackingId)}</strong>. Please verify the code or check your confirmation email.
          </p>
          <div style="font-size:0.85rem;color:var(--text-muted);">
            Try demo IDs: 
            <button class="btn btn-outline btn-sm demo-track-btn" data-id="RCH-89210-2026">RCH-89210-2026</button>
            <button class="btn btn-outline btn-sm demo-track-btn" data-id="RCH-89211-2026">RCH-89211-2026</button>
            <button class="btn btn-outline btn-sm demo-track-btn" data-id="RCH-89212-2026">RCH-89212-2026</button>
          </div>
        </div>
      `;
      bindDemoButtons();
      return;
    }

    renderTrackingView(pickup);
  };

  const renderTrackingView = (pickup) => {
    trackResultContainer.style.display = 'block';
    const currentStatus = pickup.status;
    const currentStageIndex = stageOrder.indexOf(currentStatus);

    let pipelineHtml = '';
    STAGES.forEach((stage, idx) => {
      let stateClass = '';
      if (idx < currentStageIndex) {
        stateClass = 'done';
      } else if (idx === currentStageIndex) {
        stateClass = 'current';
      }

      pipelineHtml += `
        <div class="tracking-step ${stateClass}">
          <div class="tracking-icon">
            <i class="${stage.icon}"></i>
          </div>
          <div class="tracking-label">${stage.label}</div>
          <div class="tracking-sub">${stage.desc}</div>
        </div>
      `;
    });

    trackResultContainer.innerHTML = `
      <div class="card card-luxury" style="margin-top:2rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;padding-bottom:1.5rem;border-bottom:1px solid var(--color-border);">
          <div>
            <span class="badge badge-emerald" style="margin-bottom:0.35rem;">VERIFIED MANIFEST</span>
            <h3 style="margin:0;">Ref: ${pickup.id}</h3>
            <span style="font-size:0.85rem;color:var(--text-muted);">Lodged: ${new Date(pickup.createdAt).toLocaleString()}</span>
          </div>
          <div style="text-align:right;">
            <span class="badge badge-status ${pickup.status.toLowerCase()}" style="font-size:0.95rem;padding:0.4rem 1rem;">
              <span class="status-dot ${pickup.status.toLowerCase()}"></span>
              Current Status: ${pickup.status}
            </span>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.35rem;">
              Last checkpoint updated: ${new Date(pickup.updatedAt || pickup.createdAt).toLocaleTimeString()}
            </div>
          </div>
        </div>

        <!-- Tracking Visual Stepper -->
        <div class="tracking-pipeline">
          ${pipelineHtml}
        </div>

        <!-- Dispatch Meta Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1.5rem;padding:1.5rem;background:var(--bg-surface-alt);border-radius:var(--radius-lg);margin-top:1.5rem;">
          <div>
            <span style="font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);font-weight:700;">CUSTOMER & LOCATION</span>
            <div style="font-weight:700;margin-top:0.25rem;">${escapeHtml(pickup.customerName)}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);">${escapeHtml(pickup.address)}, ${escapeHtml(pickup.city || '')}</div>
          </div>
          <div>
            <span style="font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);font-weight:700;">MATERIAL STREAM</span>
            <div style="margin-top:0.25rem;">
              <span class="badge badge-${pickup.category}">${pickup.categoryName}</span>
            </div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.25rem;">Weight: <strong>${pickup.weightKg} kg</strong></div>
          </div>
          <div>
            <span style="font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);font-weight:700;">ASSIGNED LOGISTICS</span>
            <div style="font-weight:700;margin-top:0.25rem;">${escapeHtml(pickup.assignedStaff)}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);">Vehicle: <strong>${escapeHtml(pickup.vehicleId)}</strong></div>
          </div>
          <div>
            <span style="font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);font-weight:700;">TIME SLOT</span>
            <div style="font-weight:700;margin-top:0.25rem;">${escapeHtml(pickup.preferredDate)}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);">${escapeHtml(pickup.preferredTimeSlot)}</div>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-top:1.75rem;padding-top:1.25rem;border-top:1px solid var(--color-border);">
          <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.85rem;color:var(--text-muted);">
            <i class="fa-solid fa-leaf" style="color:var(--color-emerald);font-size:1.2rem;"></i>
            Estimated Carbon Savings: <strong style="color:var(--color-forest);">${pickup.co2SavedKg || (pickup.weightKg * 1.8).toFixed(1)} kg CO₂</strong>
          </div>
          <div style="display:flex;gap:0.75rem;">
            <a href="admin-dashboard.html" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-pencil"></i> Manage in Admin
            </a>
            <button class="btn btn-primary btn-sm" onclick="window.print()">
              <i class="fa-solid fa-print"></i> Print Manifest
            </button>
          </div>
        </div>
      </div>
    `;

    trackResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const bindDemoButtons = () => {
    document.querySelectorAll('.demo-track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (trackInput) trackInput.value = id;
        performLookup(id);
      });
    });
  };

  trackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (trackInput) performLookup(trackInput.value.trim());
  });

  bindDemoButtons();

  // If query string ?ref= exists, auto lookup
  const urlParams = new URLSearchParams(window.location.search);
  const refFromUrl = urlParams.get('ref');
  if (refFromUrl) {
    if (trackInput) trackInput.value = refFromUrl;
    performLookup(refFromUrl);
  }
}

