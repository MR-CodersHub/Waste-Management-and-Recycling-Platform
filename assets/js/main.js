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
  initHeroSlider();
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

  const links = Array.from(menu.querySelectorAll('.dropdown-link'));

  const openMenu = () => {
    menu.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    if (!links.length) return;

    e.preventDefault();
    e.stopPropagation();
    openMenu();
    const target = e.key === 'ArrowDown' ? links[0] : links[links.length - 1];
    target.focus();
  });

  menu.addEventListener('keydown', (e) => {
    if (!links.length) return;

    const currentIndex = links.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openMenu();
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % links.length;
      links[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      openMenu();
      const previousIndex = currentIndex < 0 ? links.length - 1 : (currentIndex - 1 + links.length) % links.length;
      links[previousIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      openMenu();
      links[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      openMenu();
      links[links.length - 1].focus();
    }
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  menu.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (!menu.contains(document.activeElement)) closeMenu();
    }, 0);
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const shouldReturnFocus = menu.contains(document.activeElement);
    closeMenu();
    if (shouldReturnFocus) toggleBtn.focus();
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

/* --- Hero Slider (3-Slide Showcase Carousel) --- */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-section');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.hero-slider-dot');
  const prevBtn = slider.querySelector('.hero-slider-prev');
  const nextBtn = slider.querySelector('.hero-slider-next');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoplayTimer = null;
  const slideInterval = 6000;

  function goToSlide(targetIndex) {
    // Current slide deactivate
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.remove('active');
      dots[currentSlide].setAttribute('aria-selected', 'false');
    }

    // New slide index with loop-around
    currentSlide = (targetIndex + slides.length) % slides.length;

    // New slide activate
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
      dots[currentSlide].setAttribute('aria-selected', 'true');
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Next / Prev Button Controls
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  // Dot Indicator Controls
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex)) {
        goToSlide(slideIndex);
        startAutoplay();
      }
    });
  });

  // Pause on hover, resume on mouse leave
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation when slider is focused or on keydown
  window.addEventListener('keydown', (e) => {
    // Only if slider is in visible viewport
    const rect = slider.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.key === 'ArrowRight') {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      isRtl ? prevSlide() : nextSlide();
      startAutoplay();
    } else if (e.key === 'ArrowLeft') {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      isRtl ? nextSlide() : prevSlide();
      startAutoplay();
    }
  });

  // Mobile Touch Swipe Handling
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

    if (Math.abs(diff) > swipeThreshold) {
      if (diff < 0) {
        // Swiped left
        isRtl ? prevSlide() : nextSlide();
      } else {
        // Swiped right
        isRtl ? nextSlide() : prevSlide();
      }
      startAutoplay();
    }
  }

  // Initiate autoplay
  startAutoplay();
}


