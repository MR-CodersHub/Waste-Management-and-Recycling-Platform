/**
 * ReCycleHub - Admin Dashboard Operations Engine
 * Handles metric calculations, live search, status filtering,
 * modal workflows (Assign Driver, Update Status, View Details),
 * collection calendar, and reports CSV export.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  if (!document.getElementById('adminOverviewMetrics')) return;

  let currentPickups = window.ReCycleStore.getPickups();
  let filterStatus = 'all';
  let searchQuery = '';
  let selectedCategory = 'all';

  // 1. Calculate & Render Overview Metrics
  const renderMetrics = () => {
    const list = window.ReCycleStore.getPickups();
    const totalRequests = list.length;
    const pendingCount = list.filter(p => p.status === 'Pending').length;
    const scheduledCount = list.filter(p => p.status === 'Scheduled' || p.status === 'Assigned').length;
    const completedCount = list.filter(p => p.status === 'Completed' || p.status === 'Processing').length;
    const totalWeight = list.reduce((acc, curr) => acc + (Number(curr.weightKg) || 0), 0);

    const mTotal = document.getElementById('metricTotalRequests');
    const mPending = document.getElementById('metricPending');
    const mScheduled = document.getElementById('metricScheduled');
    const mCompleted = document.getElementById('metricCompleted');
    const mWeight = document.getElementById('metricTotalWeight');

    if (mTotal) mTotal.textContent = totalRequests;
    if (mPending) mPending.textContent = pendingCount;
    if (mScheduled) mScheduled.textContent = scheduledCount;
    if (mCompleted) mCompleted.textContent = completedCount;
    if (mWeight) mWeight.textContent = `${totalWeight.toLocaleString()} kg`;
  };

  // 2. Render Table with Active Filters
  const renderTable = () => {
    const tableBody = document.getElementById('adminPickupsTableBody');
    if (!tableBody) return;

    let filtered = window.ReCycleStore.getPickups();

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase());
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.id.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        (p.assignedStaff && p.assignedStaff.toLowerCase().includes(q))
      );
    }

    const countDisplay = document.getElementById('tableRowCount');
    if (countDisplay) countDisplay.textContent = `Showing ${filtered.length} requests`;

    if (!filtered.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center;padding:3rem 1rem;color:var(--text-muted);">
            <i class="fa-solid fa-inbox" style="font-size:2rem;margin-bottom:0.75rem;display:block;color:var(--text-subtle);"></i>
            No pickup requests matched your current criteria.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(item => `
      <tr>
        <td>
          <strong>${item.id}</strong>
          <div style="font-size:0.75rem;color:var(--text-muted);">${item.serviceType}</div>
        </td>
        <td>
          <div class="table-customer-cell">
            <span class="table-customer-name">${escapeHtml(item.customerName)}</span>
            <span class="table-customer-email">${escapeHtml(item.customerPhone)}</span>
          </div>
        </td>
        <td>
          <span class="badge badge-${item.category}">
            ${item.categoryName}
          </span>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">${item.weightKg} kg</div>
        </td>
        <td>
          <div style="max-width:200px;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${escapeHtml(item.address)}">
            ${escapeHtml(item.address)}
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${item.postalCode}</div>
        </td>
        <td>
          <div style="font-weight:600;font-size:0.85rem;">${item.preferredDate}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${item.preferredTimeSlot}</div>
        </td>
        <td>
          <div style="font-size:0.85rem;font-weight:600;">${escapeHtml(item.assignedStaff || 'Unassigned')}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(item.vehicleId || 'TBD')}</div>
        </td>
        <td>
          <span class="badge badge-status ${item.status.toLowerCase()}">
            <span class="status-dot ${item.status.toLowerCase()}"></span>
            ${item.status}
          </span>
        </td>
        <td>
          <div class="table-action-btns">
            <button class="table-btn btn-view-pickup" data-id="${item.id}" title="View Details">
              <i class="fa-regular fa-eye"></i>
            </button>
            <button class="table-btn btn-assign-pickup" data-id="${item.id}" title="Assign Staff & Vehicle">
              <i class="fa-solid fa-truck"></i>
            </button>
            <button class="table-btn btn-status-pickup" data-id="${item.id}" title="Update Status">
              <i class="fa-solid fa-sliders"></i>
            </button>
            <button class="table-btn delete btn-delete-pickup" data-id="${item.id}" title="Delete Record">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    bindTableActionEvents();
  };

  // 3. Bind Actions
  const bindTableActionEvents = () => {
    // View Modal
    document.querySelectorAll('.btn-view-pickup').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const p = window.ReCycleStore.getPickupById(id);
        if (p) openViewModal(p);
      });
    });

    // Assign Modal
    document.querySelectorAll('.btn-assign-pickup').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const p = window.ReCycleStore.getPickupById(id);
        if (p) openAssignModal(p);
      });
    });

    // Update Status Modal
    document.querySelectorAll('.btn-status-pickup').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const p = window.ReCycleStore.getPickupById(id);
        if (p) openStatusModal(p);
      });
    });

    // Delete
    document.querySelectorAll('.btn-delete-pickup').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm(`Are you sure you want to delete pickup record ${id}?`)) {
          window.ReCycleStore.deletePickup(id);
          renderMetrics();
          renderTable();
          showToast('Record Deleted', `Pickup ${id} has been removed.`, 'info');
        }
      });
    });
  };

  // Modals Implementation
  const openViewModal = (p) => {
    const modalHtml = `
      <div class="modal-overlay active" id="adminActiveModal">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title">Pickup Details – ${p.id}</h4>
            <button class="modal-close-btn" onclick="document.getElementById('adminActiveModal').remove()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid var(--color-border);">
              <div>
                <span class="badge badge-status ${p.status.toLowerCase()}">${p.status}</span>
                <span class="badge badge-${p.category}" style="margin-left:0.5rem;">${p.categoryName}</span>
              </div>
              <div style="font-size:0.85rem;color:var(--text-muted);">
                Amount: <strong style="color:var(--color-forest);font-size:1.1rem;">$${p.amount}</strong>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;font-size:0.9rem;margin-bottom:1.5rem;">
              <div>
                <strong style="display:block;color:var(--text-muted);font-size:0.75rem;">CUSTOMER</strong>
                ${escapeHtml(p.customerName)}<br>
                ${escapeHtml(p.customerEmail)}<br>
                ${escapeHtml(p.customerPhone)}
              </div>
              <div>
                <strong style="display:block;color:var(--text-muted);font-size:0.75rem;">LOCATION</strong>
                ${escapeHtml(p.address)}<br>
                ${escapeHtml(p.city || 'San Francisco, CA')} ${escapeHtml(p.postalCode)}
              </div>
              <div>
                <strong style="display:block;color:var(--text-muted);font-size:0.75rem;">SCHEDULED SLOT</strong>
                ${p.preferredDate}<br>
                ${p.preferredTimeSlot}
              </div>
              <div>
                <strong style="display:block;color:var(--text-muted);font-size:0.75rem;">FLEET DISPATCH</strong>
                Driver: ${escapeHtml(p.assignedStaff || 'Unassigned')}<br>
                Vehicle: ${escapeHtml(p.vehicleId || 'TBD')}
              </div>
            </div>

            <div style="background:var(--bg-surface-alt);padding:1rem;border-radius:var(--radius-md);margin-bottom:1rem;">
              <strong style="display:block;color:var(--text-muted);font-size:0.75rem;margin-bottom:0.25rem;">CUSTOMER NOTES</strong>
              <p style="margin:0;font-size:0.85rem;">${escapeHtml(p.notes || 'No special instructions.')}</p>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.85rem;color:var(--text-muted);padding-top:0.5rem;">
              <span>CO₂ Offset: <strong>${p.co2SavedKg || (p.weightKg * 1.8).toFixed(1)} kg</strong></span>
              <span>Reward Points: <strong>+${p.ecoPointsEarned || Math.round(p.weightKg * 5)} pts</strong></span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('adminActiveModal').remove()">Close</button>
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('adminActiveModal').remove(); window.open('service-details.html', '_blank')">Full Audit</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  };

  const openAssignModal = (p) => {
    const fleet = window.ReCycleStore.getFleet();
    const options = fleet.map(f => `
      <option value="${f.name}|${f.vehicle}" ${p.assignedStaff === f.name ? 'selected' : ''}>
        ${f.name} – ${f.vehicle} (${f.role})
      </option>
    `).join('');

    const modalHtml = `
      <div class="modal-overlay active" id="adminActiveModal">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title">Assign Dispatch Fleet – ${p.id}</h4>
            <button class="modal-close-btn" onclick="document.getElementById('adminActiveModal').remove()">&times;</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:1.25rem;">
              Select available route operator and zero-emission vehicle for <strong>${escapeHtml(p.customerName)}</strong> (${p.weightKg} kg ${p.categoryName}).
            </p>
            <div class="form-group">
              <label class="form-label">Available Drivers & Vehicles</label>
              <select class="form-control" id="selectDriverVehicle">
                <option value="Unassigned|TBD">-- Select Route Operator --</option>
                ${options}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Update Status to 'Assigned'</label>
              <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer;">
                <input type="checkbox" id="autoSetAssigned" checked> Automatically advance status to 'Assigned'
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('adminActiveModal').remove()">Cancel</button>
            <button class="btn btn-emerald btn-sm" id="btnSaveAssignment">Confirm Assignment</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('btnSaveAssignment').addEventListener('click', () => {
      const selected = document.getElementById('selectDriverVehicle').value;
      const [driver, vehicle] = selected.split('|');
      const autoAssigned = document.getElementById('autoSetAssigned').checked;
      const newStatus = (autoAssigned && driver !== 'Unassigned') ? 'Assigned' : p.status;

      window.ReCycleStore.updatePickupStatus(p.id, newStatus, driver, vehicle);
      document.getElementById('adminActiveModal').remove();
      renderMetrics();
      renderTable();
      showToast('Fleet Assigned', `${driver} assigned to ${p.id}`, 'success');
    });
  };

  const openStatusModal = (p) => {
    const statuses = ['Pending', 'Scheduled', 'Assigned', 'Collected', 'Processing', 'Completed', 'Rejected'];
    const options = statuses.map(s => `
      <option value="${s}" ${p.status === s ? 'selected' : ''}>${s}</option>
    `).join('');

    const modalHtml = `
      <div class="modal-overlay active" id="adminActiveModal">
        <div class="modal-container" style="max-width:460px;">
          <div class="modal-header">
            <h4 class="modal-title">Update Status – ${p.id}</h4>
            <button class="modal-close-btn" onclick="document.getElementById('adminActiveModal').remove()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Lifecycle Stage</label>
              <select class="form-control" id="selectNewStatus">
                ${options}
              </select>
            </div>
            <div style="font-size:0.85rem;color:var(--text-muted);background:var(--bg-surface-alt);padding:0.75rem;border-radius:var(--radius-sm);">
              Advancing status triggers real-time customer notifications and updates the live tracking timeline.
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('adminActiveModal').remove()">Cancel</button>
            <button class="btn btn-primary btn-sm" id="btnSaveStatus">Update Status</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('btnSaveStatus').addEventListener('click', () => {
      const newStatus = document.getElementById('selectNewStatus').value;
      window.ReCycleStore.updatePickupStatus(p.id, newStatus);
      document.getElementById('adminActiveModal').remove();
      renderMetrics();
      renderTable();
      showToast('Status Updated', `Request ${p.id} is now ${newStatus}`, 'success');
    });
  };

  // 4. Search & Filter Input Listeners
  const searchInput = document.getElementById('adminSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderTable();
    });
  }

  const statusFilterPills = document.querySelectorAll('.admin-filter-status');
  statusFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      statusFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterStatus = pill.getAttribute('data-status');
      renderTable();
    });
  });

  const categorySelect = document.getElementById('adminCategoryFilter');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      selectedCategory = e.target.value;
      renderTable();
    });
  }

  // 5. Export CSV
  const exportBtn = document.getElementById('btnExportCsv');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = window.ReCycleStore.getPickups();
      const headers = ['ID', 'Customer', 'Email', 'Phone', 'Service', 'Category', 'WeightKg', 'Date', 'TimeSlot', 'Staff', 'Vehicle', 'Status', 'Amount', 'CO2SavedKg'];
      const rows = data.map(d => [
        d.id,
        `"${d.customerName}"`,
        d.customerEmail,
        d.customerPhone,
        d.serviceType,
        d.category,
        d.weightKg,
        d.preferredDate,
        `"${d.preferredTimeSlot}"`,
        `"${d.assignedStaff}"`,
        `"${d.vehicleId}"`,
        d.status,
        d.amount,
        d.co2SavedKg
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `ReCycleHub_Dispatch_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      showToast('Report Exported', 'CSV manifest report successfully generated and downloaded.', 'success');
    });
  }

  // 6. Draw Dashboard Charts
  if (window.EcoCharts) {
    // Bar Chart
    window.EcoCharts.renderBarChart(
      'adminWeeklyChart',
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [340, 480, 520, 610, 590, 780, 420],
      '#2E9870'
    );

    // Donut Chart
    window.EcoCharts.renderDonutChart(
      'adminCategoryDonut',
      ['Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Organic'],
      [28, 210, 42, 65, 145, 85],
      ['#0284C7', '#D97706', '#0D9488', '#475569', '#7C3AED', '#16A34A']
    );
  }

  // Initial runs
  renderMetrics();
  renderTable();
}
