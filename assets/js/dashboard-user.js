/**
 * ReCycleHub - User Dashboard Engine
 * Handles customer eco-metrics, active pickup live tracker,
 * past pickup manifest modal, and rewards redemption store.
 */

document.addEventListener('DOMContentLoaded', () => {
  initUserDashboard();
});

function initUserDashboard() {
  if (!document.getElementById('userDashboardMetrics')) return;

  const user = window.ReCycleStore.getUser();
  const pickups = window.ReCycleStore.getPickups();

  // 1. Render User Impact Metrics
  const renderUserStats = () => {
    const u = window.ReCycleStore.getUser();
    const uRecycled = document.getElementById('userTotalRecycled');
    const uCo2 = document.getElementById('userCo2Saved');
    const uTrees = document.getElementById('userTreesSaved');
    const uPoints = document.getElementById('userRewardPoints');
    const uTier = document.getElementById('userTierBadge');

    if (uRecycled) uRecycled.textContent = `${u.totalRecycledKg.toLocaleString()} kg`;
    if (uCo2) uCo2.textContent = `${u.co2SavedKg.toLocaleString()} kg`;
    if (uTrees) uTrees.textContent = `${u.treesPreserved} Trees`;
    if (uPoints) uPoints.textContent = u.ecoRewardPoints.toLocaleString();
    if (uTier) uTier.textContent = u.membershipTier;
  };

  // 2. Render Active Pickup Card
  const renderActivePickup = () => {
    const container = document.getElementById('userActivePickupContainer');
    if (!container) return;

    const list = window.ReCycleStore.getPickups();
    // Find first pickup that is NOT completed or rejected
    const active = list.find(p => p.status !== 'Completed' && p.status !== 'Rejected') || list[0];

    if (!active) {
      container.innerHTML = `
        <div class="card" style="text-align:center;padding:2.5rem 1.5rem;">
          <i class="fa-solid fa-calendar-plus" style="font-size:2.5rem;color:var(--color-emerald);margin-bottom:1rem;"></i>
          <h4>No Active Pickup in Queue</h4>
          <p style="color:var(--text-muted);margin:0.5rem 0 1.5rem;">Have recyclable sorted materials ready for collection?</p>
          <a href="pickup-request.html" class="btn btn-primary btn-sm">Schedule New Pickup</a>
        </div>
      `;
      return;
    }

    const stages = ['Pending', 'Scheduled', 'Assigned', 'Collected', 'Processing', 'Completed'];
    const currentIdx = stages.indexOf(active.status);

    let stepsHtml = '';
    stages.forEach((st, idx) => {
      let cls = '';
      if (idx < currentIdx) cls = 'done';
      else if (idx === currentIdx) cls = 'current';

      stepsHtml += `
        <div class="tracking-step ${cls}">
          <div class="tracking-icon">
            <i class="fa-solid ${getStageIcon(st)}"></i>
          </div>
          <div class="tracking-label">${st}</div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="card card-luxury" style="border-left: 4px solid var(--color-emerald);">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem;">
          <div>
            <span class="badge badge-status ${active.status.toLowerCase()}">${active.status}</span>
            <h4 style="margin:0.35rem 0 0;">Pickup Reference: ${active.id}</h4>
          </div>
          <div>
            <span class="badge badge-${active.category}">${active.categoryName}</span>
            <span style="font-weight:700;margin-left:0.5rem;color:var(--text-heading);">${active.weightKg} kg</span>
          </div>
        </div>

        <div class="tracking-pipeline" style="margin:1.5rem 0 1rem;">
          ${stepsHtml}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:1rem;background:var(--bg-surface-alt);padding:1rem;border-radius:var(--radius-md);font-size:0.85rem;">
          <div>
            <span style="color:var(--text-muted);display:block;">COLLECTION DATE</span>
            <strong>${active.preferredDate} (${active.preferredTimeSlot})</strong>
          </div>
          <div>
            <span style="color:var(--text-muted);display:block;">ASSIGNED DRIVER</span>
            <strong>${escapeHtml(active.assignedStaff || 'Assigning soon...')}</strong>
          </div>
          <div>
            <span style="color:var(--text-muted);display:block;">VEHICLE UNIT</span>
            <strong>${escapeHtml(active.vehicleId || 'EV Fleet')}</strong>
          </div>
          <div>
            <span style="color:var(--text-muted);display:block;">CARBON OFFSET</span>
            <strong style="color:var(--color-emerald);">${active.co2SavedKg || (active.weightKg * 1.8).toFixed(1)} kg CO₂</strong>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1.25rem;flex-wrap:wrap;gap:0.75rem;">
          <span style="font-size:0.8rem;color:var(--text-muted);">
            <i class="fa-solid fa-location-dot"></i> ${escapeHtml(active.address)}
          </span>
          <div style="display:flex;gap:0.5rem;">
            <a href="service-details.html?ref=${active.id}" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-file-shield"></i> View Manifest
            </a>
            <a href="pickup-request.html" class="btn btn-lime btn-sm">
              <i class="fa-solid fa-plus"></i> Book Another
            </a>
          </div>
        </div>
      </div>
    `;
  };

  function getStageIcon(st) {
    switch (st) {
      case 'Pending': return 'fa-clock';
      case 'Scheduled': return 'fa-calendar-check';
      case 'Assigned': return 'fa-truck-fast';
      case 'Collected': return 'fa-box-archive';
      case 'Processing': return 'fa-gears';
      case 'Completed': return 'fa-circle-check';
      default: return 'fa-circle';
    }
  }

  // 3. Render Past History Table
  const renderHistoryTable = () => {
    const tableBody = document.getElementById('userPickupsTableBody');
    if (!tableBody) return;

    const list = window.ReCycleStore.getPickups();
    tableBody.innerHTML = list.map(item => `
      <tr>
        <td><strong>${item.id}</strong></td>
        <td>
          <span class="badge badge-${item.category}">${item.categoryName}</span>
        </td>
        <td>${item.weightKg} kg</td>
        <td>${item.preferredDate}</td>
        <td>
          <span class="badge badge-status ${item.status.toLowerCase()}">${item.status}</span>
        </td>
        <td style="color:var(--color-emerald);font-weight:700;">+${item.co2SavedKg || (item.weightKg * 1.8).toFixed(1)} kg</td>
        <td>
          <button class="table-btn btn-view-manifest" data-id="${item.id}" title="View Environmental Manifest">
            <i class="fa-solid fa-certificate"></i>
          </button>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.btn-view-manifest').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const p = window.ReCycleStore.getPickupById(id);
        if (p) openManifestModal(p);
      });
    });
  };

  // 4. Manifest Certificate Modal
  const openManifestModal = (p) => {
    const modalHtml = `
      <div class="modal-overlay active" id="userManifestModal">
        <div class="modal-container" style="max-width:580px;">
          <div class="modal-header">
            <h4 class="modal-title">Verified Circular Manifest Certificate</h4>
            <button class="modal-close-btn" onclick="document.getElementById('userManifestModal').remove()">&times;</button>
          </div>
          <div class="modal-body" style="background:#FAFCF8;color:#174D3A;padding:2rem;">
            <div style="border:2px solid #2E9870;padding:1.5rem;border-radius:var(--radius-md);position:relative;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
                <div style="font-family:var(--font-heading);font-weight:800;font-size:1.25rem;color:var(--color-forest);">
                  ReCycle<span style="color:var(--color-emerald);">Hub</span>
                </div>
                <span class="badge badge-emerald">ISO 14001 CERTIFIED</span>
              </div>
              <h5 style="margin-bottom:0.25rem;">CHAIN OF CUSTODY MANIFEST</h5>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:1.25rem;">REF ID: ${p.id} • DATED ${p.preferredDate}</div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;font-size:0.85rem;margin-bottom:1.5rem;">
                <div>
                  <strong>Generator (Client):</strong><br>
                  ${escapeHtml(p.customerName)}<br>
                  ${escapeHtml(p.address)}
                </div>
                <div>
                  <strong>Recovery Facility:</strong><br>
                  EcoOps MRF Hub 04<br>
                  Zero-Landfill Facility #SF-992
                </div>
                <div>
                  <strong>Material Stream:</strong><br>
                  ${p.categoryName} (${p.weightKg} kg)
                </div>
                <div>
                  <strong>Environmental Offset:</strong><br>
                  ${p.co2SavedKg || (p.weightKg * 1.8).toFixed(1)} kg CO₂ Equiv.
                </div>
              </div>

              <div style="text-align:center;padding-top:1rem;border-top:1px solid #D5E5DC;font-size:0.75rem;color:var(--text-muted);">
                Digitally authenticated on ReCycleHub Verifiable Sustainability Ledger.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('userManifestModal').remove()">Close</button>
            <button class="btn btn-primary btn-sm" onclick="window.print()">
              <i class="fa-solid fa-print"></i> Print Official Certificate
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  };

  // 5. Eco-Rewards Redemption
  const rewardBtns = document.querySelectorAll('.btn-redeem-reward');
  rewardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cost = parseInt(btn.getAttribute('data-cost')) || 500;
      const title = btn.getAttribute('data-title') || 'Reward Voucher';
      const currentUser = window.ReCycleStore.getUser();

      if (currentUser.ecoRewardPoints < cost) {
        showToast('Insufficient Eco-Points', `You need ${cost} points for this perk. Earn more by scheduling pickups!`, 'warning');
        return;
      }

      if (confirm(`Redeem "${title}" for ${cost} Eco-Reward Points?`)) {
        currentUser.ecoRewardPoints -= cost;
        window.ReCycleStore.saveUser(currentUser);
        renderUserStats();
        showToast('Reward Claimed!', `Voucher code generated: ECO-${Math.floor(10000 + Math.random() * 90000)}`, 'success');
      }
    });
  });

  // 6. Draw User Impact Chart
  if (window.EcoCharts) {
    window.EcoCharts.renderLineChart(
      'userImpactTrendChart',
      ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      [14, 28, 45, 62, 88, 120],
      '#2E9870'
    );
  }

  // Initial runs
  renderUserStats();
  renderActivePickup();
  renderHistoryTable();
}

