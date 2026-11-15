/**
 * ReCycleHub - Main JavaScript
 * Handles Theme, RTL, Navigation, Scroll Reveal, Accordions, Toasts, and Global Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initHeader();
  initMobileDrawer();
  initActiveNav();
  initProfileMenu();
  initScrollProgress();
  initBackToTop();
  initScrollReveal();
  initAccordions();
  initCounters();
  initQuickPostalChecker();
});

/* --- Theme Management (Light / Dark) --- */
function initTheme() {
  const savedTheme = localStorage.getItem('recyclehub_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('recyclehub_theme', next);
      updateThemeIcons(next);
    });
  });
}

function updateThemeIcons(theme) {
  const themeIcons = document.querySelectorAll('.theme-toggle-btn i');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });
}

/* --- Direction Management (LTR / RTL) --- */
function initDirection() {
  const savedDir = localStorage.getItem('recyclehub_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateDirLabels(savedDir);

  const dirToggles = document.querySelectorAll('.rtl-toggle-btn');
  dirToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('recyclehub_dir', next);
      updateDirLabels(next);
    });
  });
}

function updateDirLabels(dir) {
  const labels = document.querySelectorAll('.rtl-toggle-label');
  labels.forEach(lbl => {
    lbl.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Drawer Navigation --- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close when clicking a nav link in the drawer
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
}

/* --- Active Navigation Highlight --- */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const aliases = {
    'service-details.html': 'services.html',
    'blog-details.html': 'blog.html'
  };
  const activePage = aliases[currentPage] || currentPage;

  document.querySelectorAll('.nav-menu .nav-link, .drawer-nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0].split('?')[0];
    if (!href) return;
    link.classList.toggle('active', href === activePage);
  });
}

/* --- Profile Dropdown Menu --- */
function initProfileMenu() {
  const menu = document.querySelector('.profile-menu');
  if (!menu) return;

  const toggleBtn = menu.querySelector('.profile-toggle-btn');
  if (!toggleBtn) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* --- Scroll Progress Bar --- */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* --- Back to Top --- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* --- Accordions --- */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    const items = acc.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      if (!header || !content) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items if in single-expand mode
        items.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.accordion-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 30 + 'px';
        }
      });
    });
  });
}

/* --- Animated Number Counters --- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = progress * (2 - progress);
      const current = target * easeOutQuad;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.round(current).toLocaleString();
      }

      if (frame === totalFrames) {
        clearInterval(counter);
        el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
      }
    }, frameRate);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => animateCount(c));
  }
}

/* --- Quick Postal Code Service Area Checker --- */
function initQuickPostalChecker() {
  const forms = document.querySelectorAll('.postal-checker-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      const resultBox = form.querySelector('.postal-result') || document.querySelector('#postalResult');
      if (!input) return;

      const val = input.value.trim();
      if (!val) {
        showToast('Required', 'Please enter a valid postal code', 'warning');
        return;
      }

      // Check standard mock serviced postal codes
      const validCodes = ['94102', '94103', '94104', '94105', '94107', '94110', '94115', '94117', '94121', '94122', '94123', '94133', '94158'];
      const isServiced = validCodes.some(code => val.includes(code)) || val.length === 5;

      if (resultBox) {
        resultBox.style.display = 'block';
        if (isServiced) {
          resultBox.className = 'postal-result alert-success';
          resultBox.innerHTML = `
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <i class="fa-solid fa-circle-check" style="color:var(--color-emerald);font-size:1.25rem;"></i>
              <div>
                <strong>Zone Verified: Daily Electric Fleet Active!</strong>
                <p style="margin:0.25rem 0 0;font-size:0.85rem;color:var(--text-muted);">
                  Postal Code <strong>${val}</strong> qualifies for Same-Day & Scheduled Zero-Emission Collection.
                </p>
              </div>
            </div>
          `;
          showToast('Service Available', `Zone ${val} is eligible for scheduled pickup!`, 'success');
        } else {
          resultBox.className = 'postal-result alert-warning';
          resultBox.innerHTML = `
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <i class="fa-solid fa-triangle-exclamation" style="color:#F59E0B;font-size:1.25rem;"></i>
              <div>
                <strong>Depot Expansion Zone</strong>
                <p style="margin:0.25rem 0 0;font-size:0.85rem;color:var(--text-muted);">
                  Postal Code <strong>${val}</strong> is scheduled for Q1 2027 fleet deployment. You can still schedule enterprise bulk pickup.
                </p>
              </div>
            </div>
          `;
          showToast('Depot Notice', `Postal Code ${val} requires custom dispatch.`, 'warning');
        }
      }
    });
  });
}

/* --- Toast Notification Helper --- */
function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'fa-solid fa-circle-check';
  if (type === 'info') iconClass = 'fa-solid fa-circle-info';
  if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';
  if (type === 'error') iconClass = 'fa-solid fa-circle-xmark';

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${escapeHtml(title)}</div>
      <div class="toast-message">${escapeHtml(message)}</div>
    </div>
    <button class="toast-close" aria-label="Close Notification">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.showToast = showToast;
window.escapeHtml = escapeHtml;

