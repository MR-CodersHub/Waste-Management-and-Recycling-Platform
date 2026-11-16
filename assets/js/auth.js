(() => {
  'use strict';

  const REMEMBER_KEY = 'recyclehub_remembered_email';
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_PATTERN = /^\+?[0-9\s().-]+$/;

  document.addEventListener('DOMContentLoaded', initAuth);

  function initAuth() {
    initPasswordToggles();
    initLoginForm();
    initSignupForm();
    initSupportActions();
    initRegistrationNotice();
  }

  function initPasswordToggles() {
    document.querySelectorAll('[data-password-toggle]').forEach(button => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;

      button.addEventListener('click', () => {
        const isVisible = input.type === 'text';
        input.type = isVisible ? 'password' : 'text';
        button.setAttribute('aria-pressed', String(!isVisible));
        button.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');

        const icon = button.querySelector('i');
        if (icon) {
          icon.className = isVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
        }

        input.focus({ preventScroll: true });
      });
    });
  }

  function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const emailInput = document.getElementById('loginEmail');
    const rememberInput = document.getElementById('rememberMe');

    const rememberedEmail = safeGetItem(REMEMBER_KEY);
    if (emailInput && rememberedEmail) {
      emailInput.value = rememberedEmail;
    }
    if (rememberInput && rememberedEmail) {
      rememberInput.checked = true;
    }

    bindFieldValidation(form);
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!validateForm(form)) return;

      if (emailInput && rememberInput) {
        if (rememberInput.checked) {
          safeSetItem(REMEMBER_KEY, emailInput.value.trim());
        } else {
          safeRemoveItem(REMEMBER_KEY);
        }
      }

      setSubmitting(form.querySelector('[data-submit]'), 'Signing In...');
      notify('Demo Sign-In', 'Frontend demo only — opening the customer dashboard preview.', 'info');

      window.setTimeout(() => {
        window.location.href = 'user-dashboard.html';
      }, 850);
    });
  }

  function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    bindFieldValidation(form);
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!validateForm(form)) return;

      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const phoneInput = document.getElementById('signupPhone');

      const newUser = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        phone: phoneInput.value.trim(),
        membershipTier: 'EcoGuardian Member',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalRecycledKg: 0,
        co2SavedKg: 0,
        treesPreserved: 0,
        ecoRewardPoints: 250,
        defaultAddress: '',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      };

      if (window.ReCycleStore && typeof window.ReCycleStore.saveUser === 'function') {
        try {
          window.ReCycleStore.saveUser(newUser);
        } catch (error) {
          notify('Profile Not Saved', 'Your demo profile could not be saved in this browser, but you can still continue.', 'warning');
        }
      }

      setSubmitting(form.querySelector('[data-submit]'), 'Creating Account...');
      notify('Demo Account Created', 'Your demo profile is ready. Sign in with your new credentials to continue.', 'success');

      window.setTimeout(() => {
        window.location.href = 'login.html?registered=1';
      }, 1000);
    });
  }

  function initSupportActions() {
    const forgotLink = document.getElementById('forgotPassword');
    if (forgotLink) {
      forgotLink.addEventListener('click', event => {
        event.preventDefault();
        notify('Password Recovery', 'Password recovery is not connected in this frontend demo. Please contact support for help.', 'info');
      });
    }

    document.querySelectorAll('[data-social-provider]').forEach(button => {
      button.addEventListener('click', () => {
        notify(`${button.dataset.socialProvider} Sign-In`, 'Social authentication is not connected in this frontend demo.', 'info');
      });
    });
  }

  function initRegistrationNotice() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') !== '1' || !document.getElementById('loginForm')) return;

    notify('Account Created', 'Your demo profile is ready. Sign in to continue.', 'success');
  }

  function bindFieldValidation(form) {
    const fields = Array.from(form.querySelectorAll('.auth-field input'));

    fields.forEach(input => {
      input.addEventListener('input', () => {
        const field = input.closest('.auth-field');
        if (field && field.classList.contains('has-error')) {
          validateInput(input);
        }

        if (input.id === 'signupPassword') {
          const confirmInput = document.getElementById('signupConfirm');
          if (confirmInput && confirmInput.value) {
            validateInput(confirmInput);
          }
        }
      });

      input.addEventListener('change', () => {
        const field = input.closest('.auth-field');
        if (field && field.classList.contains('has-error')) {
          validateInput(input);
        }
      });

      input.addEventListener('blur', () => {
        const field = input.closest('.auth-field');
        const shouldValidate = input.type === 'checkbox'
          ? field && field.classList.contains('has-error')
          : input.value.trim() !== '' || (field && field.classList.contains('has-error'));

        if (shouldValidate) {
          validateInput(input);
        }
      });
    });
  }

  function validateForm(form) {
    const fields = Array.from(form.querySelectorAll('.auth-field input'));
    const results = fields.map(input => validateInput(input));
    const isValid = results.every(Boolean);

    if (!isValid) {
      const firstInvalid = form.querySelector('.auth-field.has-error input');
      if (firstInvalid) firstInvalid.focus();
    }

    return isValid;
  }

  function validateInput(input) {
    const message = getValidationMessage(input);
    const field = input.closest('.auth-field');
    const errorElement = field ? field.querySelector('.auth-error') : null;

    if (field) {
      field.classList.toggle('has-error', Boolean(message));
    }

    input.setAttribute('aria-invalid', message ? 'true' : 'false');

    if (errorElement) {
      errorElement.textContent = message;
    }

    return !message;
  }

  function getValidationMessage(input) {
    const value = input.value.trim();

    switch (input.id) {
      case 'loginEmail':
      case 'signupEmail':
        if (!value) return 'Enter your email address.';
        if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address.';
        return '';

      case 'loginPassword':
        if (!input.value) return 'Enter your password.';
        return '';

      case 'signupName':
        if (!value) return 'Enter your full name.';
        if (value.length < 2) return 'Your name must be at least 2 characters.';
        return '';

      case 'signupPhone': {
        if (!value) return 'Enter your phone number.';
        const digits = value.replace(/\D/g, '');
        if (!PHONE_PATTERN.test(value) || digits.length < 7 || digits.length > 15) {
          return 'Enter a valid phone number.';
        }
        return '';
      }

      case 'signupPassword':
        if (!input.value) return 'Create a password.';
        if (input.value.length < 8) return 'Use at least 8 characters.';
        return '';

      case 'signupConfirm': {
        if (!input.value) return 'Confirm your password.';
        const password = document.getElementById('signupPassword');
        if (password && input.value !== password.value) return 'Passwords do not match.';
        return '';
      }

      case 'signupTerms':
        if (!input.checked) return 'Accept the Terms and Privacy Policy to continue.';
        return '';

      default:
        return '';
    }
  }

  function setSubmitting(button, label) {
    if (!button) return;

    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i><span>${label}</span>`;
  }

  function notify(title, message, type) {
    if (typeof window.showToast === 'function') {
      window.showToast(title, message, type);
    }
  }

  function safeGetItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSetItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }

  function safeRemoveItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      return;
    }
  }
})();
