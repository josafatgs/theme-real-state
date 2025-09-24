/**
 * Global JavaScript for Real Estate Theme
 */

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');

    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, openDetailsElement.querySelector('summary')) : openDetailsElement.removeAttribute('open');
  }

  onSummaryClick(event) {
    const detailsElement = event.currentTarget.parentNode;
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function addTrapFocus() {
      trapFocus(this.mainDetailsToggle, this.mainDetailsToggle.querySelector('[role="dialog"]'));
      this.mainDetailsToggle.querySelector('[role="dialog"]').addEventListener('transitionend', () => {
        const containerToTrapFocusOn = this.mainDetailsToggle.querySelector('.drawer__inner-empty') ? this.mainDetailsToggle.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
        const focusElement = this.mainDetailsToggle.querySelector('.drawer__inner') || this.mainDetailsToggle.querySelector('.drawer__close');
        trapFocus(containerToTrapFocusOn, focusElement);
      }, { once: true });
    }

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(event, event.currentTarget) : this.openMenuDrawer(event.currentTarget);

      if (window.matchMedia('(max-width: 990px)')) {
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
      }
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        detailsElement.addEventListener('transitionend', () => {
          detailsElement.classList.remove('menu-opening');
        }, { once: true });
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
      details.removeAttribute('open');
    });
    this.mainDetailsToggle.querySelectorAll('.menu-opening').forEach(element => {
      element.classList.remove('menu-opening');
    });
    document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);

    if (elementToFocus) elementToFocus.focus();
  }

  onFocusOut() {
    setTimeout(() => {
      if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeMenuDrawer(event, detailsElement.querySelector('summary'));
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    }

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);

/**
 * Trap focus within a container
 */
function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  container.setAttribute('tabindex', '-1');
  elementToFocus.focus();

  function focusin(event) {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', keydown);
  }

  function focusout() {
    document.removeEventListener('keydown', keydown);
  }

  function keydown(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  }

  document.addEventListener('focusout', focusout);
  document.addEventListener('focusin', focusin);
}

/**
 * Remove trap focus
 */
function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

/**
 * Get focusable elements
 */
function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

const trapFocusHandlers = {};

/**
 * Lead Capture Form Handler
 * Handles form validation, submission, and user feedback
 */
class LeadCaptureForm {
  constructor(form) {
    this.form = form;
    this.submitButton = form.querySelector('.form-submit');
    this.successMessage = document.getElementById('form-success');
    this.errorMessage = document.getElementById('form-error');
    this.errorMessageText = document.getElementById('error-message-text');
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.addInputListeners();
    this.addPhoneFormatting();
  }

  addInputListeners() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
      input.addEventListener('focus', () => this.clearFieldError(input));
    });
  }

  addPhoneFormatting() {
    const phoneInput = this.form.querySelector('input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          if (value.length <= 10) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
          } else {
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
          }
        }
        e.target.value = value;
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    this.hideMessages();
    
    if (this.validateForm()) {
      await this.submitForm();
    } else {
      this.showFormErrors();
    }
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[data-validate]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const validationType = field.dataset.validate;
    const errorMessage = field.dataset.errorMessage;
    let isValid = true;

    // Clear previous states
    this.clearFieldError(field);

    switch (validationType) {
      case 'required':
        if (!value) {
          this.showFieldError(field, errorMessage || 'Este campo es requerido');
          isValid = false;
        }
        break;

      case 'email':
        if (!value) {
          this.showFieldError(field, 'El correo electrónico es requerido');
          isValid = false;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            this.showFieldError(field, errorMessage || 'Por favor ingresa un correo electrónico válido');
            isValid = false;
          }
        }
        break;

      case 'phone':
        if (!value) {
          this.showFieldError(field, 'El teléfono es requerido');
          isValid = false;
        } else {
          const phoneRegex = /^(\+\d{1,3}\s?)?\d{3}\s?\d{3}\s?\d{4}$/;
          if (!phoneRegex.test(value)) {
            this.showFieldError(field, errorMessage || 'Por favor ingresa un número de teléfono válido');
            isValid = false;
          }
        }
        break;
    }

    // Additional validation for select fields
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
      this.showFieldError(field, errorMessage || 'Por favor selecciona una opción');
      isValid = false;
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.classList.add('shake');
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.textContent = message;
    }

    // Remove shake animation after it completes
    setTimeout(() => {
      field.classList.remove('shake');
    }, 500);
  }

  clearFieldError(field) {
    field.classList.remove('error', 'shake');
    field.classList.add('success');
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.textContent = '';
    }

    // Remove success class after a delay
    setTimeout(() => {
      field.classList.remove('success');
    }, 2000);
  }

  showFormErrors() {
    const firstErrorField = this.form.querySelector('.error');
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async submitForm() {
    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      
      // Add additional tracking data
      formData.append('contact[tags]', 'website-lead,real-estate-inquiry');
      formData.append('contact[source]', 'website-contact-form');
      
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      });

      if (response.ok) {
        this.showSuccessMessage();
        this.resetForm();
        
        // Track successful form submission
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'event_category': 'Lead Generation',
            'event_label': 'Contact Form'
          });
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage('Hubo un problema al enviar tu información. Por favor intenta nuevamente o contáctanos directamente.');
    } finally {
      this.setLoadingState(false);
    }
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitButton.classList.add('loading');
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove('loading');
      this.submitButton.disabled = false;
    }
  }

  showSuccessMessage() {
    this.hideMessages();
    this.successMessage.style.display = 'block';
    this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide success message after 10 seconds
    setTimeout(() => {
      this.successMessage.style.display = 'none';
    }, 10000);
  }

  showErrorMessage(message) {
    this.hideMessages();
    this.errorMessageText.textContent = message;
    this.errorMessage.style.display = 'block';
    this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  hideMessages() {
    this.successMessage.style.display = 'none';
    this.errorMessage.style.display = 'none';
  }

  resetForm() {
    this.form.reset();
    
    // Clear all field states
    const fields = this.form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      field.classList.remove('error', 'success', 'shake');
    });

    // Clear all error messages
    const errorElements = this.form.querySelectorAll('.form-error');
    errorElements.forEach(element => {
      element.textContent = '';
    });
  }
}

/**
 * Appointment Form Handler
 * Extends LeadCaptureForm for appointment scheduling functionality
 */
class AppointmentForm extends LeadCaptureForm {
  constructor(form) {
    super(form);
    this.successMessage = document.getElementById('appointment-success');
    this.errorMessage = document.getElementById('appointment-error');
    this.errorMessageText = document.getElementById('appointment-error-message-text');
    this.initAppointmentSpecific();
  }

  initAppointmentSpecific() {
    this.addDateValidation();
    this.addTimeSlotValidation();
  }

  addDateValidation() {
    const dateInput = this.form.querySelector('input[type="date"]');
    if (dateInput) {
      // Set minimum date to today
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
      
      // Set maximum date to 3 months from now
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
      
      dateInput.addEventListener('change', this.validateAppointmentDate.bind(this));
    }
  }

  addTimeSlotValidation() {
    const timeSelect = this.form.querySelector('#appointment_time');
    const dateInput = this.form.querySelector('#appointment_date');
    
    if (timeSelect && dateInput) {
      dateInput.addEventListener('change', () => {
        this.updateAvailableTimeSlots(dateInput.value, timeSelect);
      });
    }
  }

  validateAppointmentDate(event) {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      this.showFieldError(event.target, 'No puedes seleccionar una fecha pasada');
      return false;
    }
    
    // Check if it's a weekend (optional business rule)
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Optionally restrict weekends
      // this.showFieldError(event.target, 'Por favor selecciona un día entre lunes y viernes');
      // return false;
    }
    
    return true;
  }

  updateAvailableTimeSlots(selectedDate, timeSelect) {
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    const isToday = selectedDateObj.toDateString() === today.toDateString();
    
    // Get current hour if it's today
    const currentHour = isToday ? today.getHours() : 0;
    
    // Enable/disable time slots based on current time
    Array.from(timeSelect.options).forEach(option => {
      if (option.value) {
        const optionHour = parseInt(option.value.split(':')[0]);
        
        if (isToday && optionHour <= currentHour) {
          option.disabled = true;
          option.textContent = option.textContent.replace(' (No disponible)', '') + ' (No disponible)';
        } else {
          option.disabled = false;
          option.textContent = option.textContent.replace(' (No disponible)', '');
        }
      }
    });
    
    // Reset selection if current selection is now disabled
    if (timeSelect.selectedOptions[0] && timeSelect.selectedOptions[0].disabled) {
      timeSelect.value = '';
    }
  }

  async submitForm() {
    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      
      // Add appointment-specific tracking data
      formData.append('contact[tags]', 'website-appointment,real-estate-appointment');
      formData.append('contact[source]', 'website-appointment-form');
      
      // Format appointment details for the message body
      const appointmentDetails = this.formatAppointmentDetails(formData);
      formData.set('contact[body]', appointmentDetails);
      
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json, text/plain, */*'
        }
      });

      if (response.ok) {
        this.showSuccessMessage();
        this.resetForm();
        
        // Track successful appointment request
        if (typeof gtag !== 'undefined') {
          gtag('event', 'appointment_request', {
            'event_category': 'Lead Generation',
            'event_label': 'Appointment Form',
            'custom_parameters': {
              'appointment_type': formData.get('contact[appointment_type]'),
              'appointment_date': formData.get('contact[appointment_date]')
            }
          });
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Appointment form submission error:', error);
      this.showErrorMessage('Hubo un problema al enviar tu solicitud de cita. Por favor intenta nuevamente o contáctanos directamente.');
    } finally {
      this.setLoadingState(false);
    }
  }

  formatAppointmentDetails(formData) {
    const name = formData.get('contact[name]');
    const email = formData.get('contact[email]');
    const phone = formData.get('contact[phone]');
    const date = formData.get('contact[appointment_date]');
    const time = formData.get('contact[appointment_time]');
    const type = formData.get('contact[appointment_type]');
    const message = formData.get('contact[body]') || '';
    const propertyTitle = formData.get('contact[subject]')?.replace('Solicitud de cita para ', '') || 'Propiedad';

    return `
SOLICITUD DE CITA - ${propertyTitle}

Información de contacto:
- Nombre: ${name}
- Email: ${email}
- Teléfono: ${phone}

Detalles de la cita:
- Fecha preferida: ${this.formatDate(date)}
- Hora preferida: ${this.formatTime(time)}
- Tipo de cita: ${this.formatAppointmentType(type)}

${message ? `Mensaje adicional:\n${message}` : ''}

---
Solicitud enviada desde el sitio web el ${new Date().toLocaleString('es-MX')}
    `.trim();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  formatAppointmentType(type) {
    const types = {
      'visita': 'Visita presencial',
      'llamada': 'Llamada telefónica',
      'videollamada': 'Videollamada'
    };
    return types[type] || type;
  }
}

// Initialize lead capture forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const leadForms = document.querySelectorAll('#lead-capture-form');
  leadForms.forEach(form => {
    new LeadCaptureForm(form);
  });

  // Initialize appointment forms
  const appointmentForms = document.querySelectorAll('#appointment-form-element');
  appointmentForms.forEach(form => {
    new AppointmentForm(form);
  });

  // Initialize mobile optimizations
  new MobileTouchOptimizer();
  new MobilePerformanceMonitor();
});

/**
 * Smooth scrolling for anchor links
 */
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

/**
 * Enhanced lazy loading for images with mobile optimization
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Add loading class for smooth transition
        img.classList.add('loading');
        
        // Handle both data-src and srcset for responsive images
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        
        // Handle load event
        img.addEventListener('load', () => {
          img.classList.remove('lazy', 'loading');
          img.classList.add('loaded');
        });
        
        // Handle error event
        img.addEventListener('error', () => {
          img.classList.remove('lazy', 'loading');
          img.classList.add('error');
        });
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    // Optimize for mobile with smaller root margin
    rootMargin: window.innerWidth < 750 ? '50px' : '100px',
    threshold: 0.1
  });

  document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Mobile Touch Optimization
 */
class MobileTouchOptimizer {
  constructor() {
    this.isMobile = window.innerWidth < 750;
    this.isTouch = 'ontouchstart' in window;
    this.init();
  }

  init() {
    if (this.isTouch) {
      this.optimizeTouchInteractions();
      this.addTouchFeedback();
      this.preventDoubleClick();
    }
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  optimizeTouchInteractions() {
    // Add touch-friendly classes
    document.body.classList.add('touch-device');
    
    // Optimize property cards for touch
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
      this.makeTouchFriendly(card);
    });

    // Optimize buttons for touch
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      this.makeTouchFriendly(button);
    });
  }

  makeTouchFriendly(element) {
    // Ensure minimum touch target size (44px)
    const rect = element.getBoundingClientRect();
    if (rect.height < 44) {
      element.style.minHeight = '44px';
    }
    if (rect.width < 44) {
      element.style.minWidth = '44px';
    }

    // Add touch event listeners for better feedback
    element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    element.addEventListener('touchcancel', this.handleTouchEnd.bind(this), { passive: true });
  }

  handleTouchStart(event) {
    event.currentTarget.classList.add('touch-active');
  }

  handleTouchEnd(event) {
    setTimeout(() => {
      event.currentTarget.classList.remove('touch-active');
    }, 150);
  }

  addTouchFeedback() {
    // Add CSS for touch feedback
    const style = document.createElement('style');
    style.textContent = `
      .touch-device .touch-active {
        opacity: 0.7;
        transform: scale(0.98);
        transition: all 0.1s ease;
      }
      
      .touch-device .property-card.touch-active {
        transform: scale(0.98) translateY(-2px);
      }
      
      .touch-device .btn.touch-active {
        transform: scale(0.95);
      }
    `;
    document.head.appendChild(style);
  }

  preventDoubleClick() {
    let lastTouchTime = 0;
    
    document.addEventListener('touchend', (event) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTouchTime;
      
      if (tapLength < 300 && tapLength > 0) {
        event.preventDefault();
      }
      
      lastTouchTime = currentTime;
    }, { passive: false });
  }

  handleOrientationChange() {
    // Recalculate viewport height for mobile browsers
    setTimeout(() => {
      document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    }, 100);
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 750;
    
    // If switching between mobile and desktop, reinitialize
    if (wasMobile !== this.isMobile) {
      this.init();
    }
  }
}

/**
 * Performance Monitor for Mobile
 */
class MobilePerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Monitor Core Web Vitals on mobile
    if (window.innerWidth < 750) {
      this.monitorLCP();
      this.monitorFID();
      this.monitorCLS();
    }
  }

  monitorLCP() {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry.startTime > 2500) {
          console.warn('LCP is slow:', lastEntry.startTime);
          // Could trigger optimization strategies here
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  monitorFID() {
    // First Input Delay
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.processingStart - entry.startTime > 100) {
            console.warn('FID is slow:', entry.processingStart - entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  monitorCLS() {
    // Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        if (clsValue > 0.1) {
          console.warn('CLS is high:', clsValue);
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }
}
/**

 * Collection Page Functionality
 * Handles sorting, filtering, and pagination for property collections
 */
class CollectionPage {
  constructor() {
    this.sortSelect = document.getElementById('sort-select');
    this.filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    this.propertiesGrid = document.querySelector('.properties-grid');
    this.collectionCount = document.querySelector('.collection-count');
    
    if (this.sortSelect) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.initializeFromURL();
  }

  bindEvents() {
    // Sort functionality
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', this.handleSort.bind(this));
    }

    // Filter functionality
    this.filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', this.handleFilter.bind(this));
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', this.initializeFromURL.bind(this));
  }

  initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set sort value from URL
    const sortBy = urlParams.get('sort_by');
    if (sortBy && this.sortSelect) {
      this.sortSelect.value = sortBy;
    }

    // Set filter checkboxes from URL
    this.filterCheckboxes.forEach(checkbox => {
      const paramName = checkbox.name;
      const paramValues = urlParams.getAll(paramName);
      checkbox.checked = paramValues.includes(checkbox.value);
    });
  }

  handleSort(event) {
    const sortValue = event.target.value;
    this.updateURL({ sort_by: sortValue });
    this.reloadCollection();
  }

  handleFilter() {
    const filters = {};
    
    this.filterCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        if (!filters[checkbox.name]) {
          filters[checkbox.name] = [];
        }
        filters[checkbox.name].push(checkbox.value);
      }
    });

    this.updateURL(filters);
    this.reloadCollection();
  }

  updateURL(params) {
    const url = new URL(window.location);
    
    // Clear existing filter parameters
    this.filterCheckboxes.forEach(checkbox => {
      url.searchParams.delete(checkbox.name);
    });

    // Add new parameters
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, v));
      } else if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    // Update browser history
    window.history.pushState({}, '', url);
  }

  reloadCollection() {
    // Show loading state
    this.showLoadingState();

    // Reload the page with new parameters
    window.location.reload();
  }

  showLoadingState() {
    if (this.propertiesGrid) {
      this.propertiesGrid.style.opacity = '0.6';
      this.propertiesGrid.style.pointerEvents = 'none';
    }
  }
}

/**
 * Property Card Interactions
 * Handles hover effects and click tracking for property cards
 */
class PropertyCard {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Track property card clicks
    const detailsButton = this.element.querySelector('.property-card__btn');
    if (detailsButton) {
      detailsButton.addEventListener('click', this.handleDetailsClick.bind(this));
    }

    // Add keyboard navigation
    this.element.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Make the entire card clickable
    this.element.addEventListener('click', this.handleCardClick.bind(this));
    this.element.setAttribute('tabindex', '0');
    this.element.setAttribute('role', 'button');
    this.element.setAttribute('aria-label', `Ver detalles de ${this.getPropertyTitle()}`);
  }

  handleDetailsClick(event) {
    event.stopPropagation();
    
    // Track analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'property_view', {
        'event_category': 'Property Interaction',
        'event_label': this.getPropertyTitle()
      });
    }
  }

  handleCardClick(event) {
    // Don't trigger if clicking on the button directly
    if (event.target.closest('.property-card__btn')) {
      return;
    }

    const detailsButton = this.element.querySelector('.property-card__btn');
    if (detailsButton) {
      detailsButton.click();
    }
  }

  handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleCardClick(event);
    }
  }

  getPropertyTitle() {
    const titleElement = this.element.querySelector('.property-card__title');
    return titleElement ? titleElement.textContent.trim() : 'Propiedad';
  }
}

/**
 * Pagination Enhancement
 * Adds smooth scrolling and loading states to pagination
 */
class PaginationEnhancer {
  constructor() {
    this.paginationLinks = document.querySelectorAll('.pagination-item:not(.pagination-disabled):not(.pagination-current)');
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.paginationLinks.forEach(link => {
      link.addEventListener('click', this.handlePaginationClick.bind(this));
    });
  }

  handlePaginationClick(event) {
    // Add loading state
    event.target.classList.add('loading');
    
    // Scroll to top of collection
    const collectionHeader = document.querySelector('.collection-header');
    if (collectionHeader) {
      collectionHeader.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }

    // Track pagination usage
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pagination_click', {
        'event_category': 'Collection Navigation',
        'event_label': event.target.textContent.trim()
      });
    }
  }
}

// Initialize collection page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile optimizations
  new MobileTouchOptimizer();
  new MobilePerformanceMonitor();
  
  // Initialize collection page if we're on a collection page
  if (document.querySelector('.collection-page')) {
    new CollectionPage();
    new PaginationEnhancer();

    // Initialize property cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
      new PropertyCard(card);
    });
  }
});

/**
 * Responsive Image Loading for Collection Page
 * Optimizes image loading for property cards
 */
class ResponsiveImageLoader {
  constructor() {
    this.images = document.querySelectorAll('.property-card__img');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.images.forEach(img => {
      if (img.dataset.src) {
        observer.observe(img);
      }
    });
  }

  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.classList.add('loaded');
      
      img.addEventListener('load', () => {
        img.classList.add('fade-in');
      });
    }
  }

  loadAllImages() {
    this.images.forEach(img => {
      this.loadImage(img);
    });
  }
}

// Initialize responsive image loader for collection pages
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.collection-page')) {
    new ResponsiveImageLoader();
  }
});

/**
 * Property Filtering System
 * Handles client-side filtering of properties using Shopify tags
 * 
 * Expected tag format:
 * - Property types: 'casa', 'departamento', 'terreno'
 * - Locations: 'ubicacion-zona-norte', 'ubicacion-centro', etc.
 * - Price ranges: 'precio-0-500000', 'precio-500000-1000000', 'precio-1000000-plus'
 * 
 * Filter logic:
 * - OR logic within filter groups (e.g., casa OR departamento)
 * - AND logic between filter groups (e.g., casa AND ubicacion-centro AND precio-0-500000)
 */
class PropertyFilter {
  constructor() {
    this.filterContainer = document.querySelector('.collection-filters');
    this.propertiesGrid = document.querySelector('.properties-grid');
    this.collectionCount = document.querySelector('.collection-count');
    this.clearFiltersBtn = document.getElementById('clear-filters');
    this.mobileToggle = document.getElementById('mobile-filter-toggle');
    this.mobileClose = document.getElementById('mobile-filters-close');
    this.sidebar = document.querySelector('.collection-sidebar');
    this.collectionMain = document.querySelector('.collection-main');
    
    this.allProperties = [];
    this.filteredProperties = [];
    this.activeFilters = new Set();
    
    if (this.filterContainer && this.propertiesGrid) {
      this.init();
    }
  }

  init() {
    this.cacheAllProperties();
    this.createActiveFiltersContainer();
    this.bindEvents();
    this.initializeFromURL();
  }

  cacheAllProperties() {
    // Cache all property cards for filtering
    const propertyCards = this.propertiesGrid.querySelectorAll('.property-card');
    this.allProperties = Array.from(propertyCards).map(card => {
      const tags = card.dataset.tags ? card.dataset.tags.split(',').map(tag => tag.trim()) : [];
      const price = parseFloat(card.dataset.price) || 0;
      
      return {
        element: card,
        tags: tags,
        price: price,
        title: card.querySelector('.property-card__title')?.textContent || '',
        visible: true
      };
    });
    
    this.filteredProperties = [...this.allProperties];
    
    // Debug logging
    console.log(`PropertyFilter: Cached ${this.allProperties.length} properties`);
    if (this.allProperties.length > 0) {
      console.log('Sample property tags:', this.allProperties[0].tags);
    }
  }

  createActiveFiltersContainer() {
    // Create container for active filter tags
    const activeFiltersHtml = '<div class="active-filters" id="active-filters"></div>';
    this.collectionMain.insertAdjacentHTML('afterbegin', activeFiltersHtml);
    this.activeFiltersContainer = document.getElementById('active-filters');
  }

  bindEvents() {
    // Filter checkbox events
    const filterCheckboxes = this.filterContainer.querySelectorAll('input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', this.handleFilterChange.bind(this));
    });

    // Clear filters button
    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener('click', this.clearAllFilters.bind(this));
    }

    // Mobile filter toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', this.toggleMobileFilters.bind(this));
    }

    // Mobile filter close
    if (this.mobileClose) {
      this.mobileClose.addEventListener('click', this.closeMobileFilters.bind(this));
    }

    // Close mobile filters when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          this.sidebar.classList.contains('active') && 
          !this.sidebar.contains(e.target) && 
          !this.mobileToggle.contains(e.target)) {
        this.closeMobileFilters();
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', this.initializeFromURL.bind(this));
  }

  handleFilterChange(event) {
    const checkbox = event.target;
    const filterValue = checkbox.value;
    
    if (checkbox.checked) {
      this.activeFilters.add(filterValue);
    } else {
      this.activeFilters.delete(filterValue);
    }

    this.updateURL();
    this.applyFilters();
    this.updateActiveFiltersDisplay();
    this.updateClearButton();
  }

  applyFilters() {
    this.showLoadingState();

    // Filter properties based on active filters
    this.filteredProperties = this.allProperties.filter(property => {
      if (this.activeFilters.size === 0) return true;

      // Group filters by type for OR logic within groups, AND logic between groups
      const filterGroups = {
        propertyType: [],
        location: [],
        priceRange: []
      };

      this.activeFilters.forEach(filter => {
        if (['casa', 'departamento', 'terreno'].includes(filter)) {
          filterGroups.propertyType.push(filter);
        } else if (filter.startsWith('ubicacion-')) {
          filterGroups.location.push(filter);
        } else if (filter.startsWith('precio-')) {
          filterGroups.priceRange.push(filter);
        }
      });

      // Check each filter group (AND logic between groups)
      for (const [groupName, filters] of Object.entries(filterGroups)) {
        if (filters.length > 0) {
          // OR logic within each group
          const matchesGroup = filters.some(filter => property.tags.includes(filter));
          if (!matchesGroup) {
            return false;
          }
        }
      }

      return true;
    });

    // Update DOM
    setTimeout(() => {
      this.updatePropertiesDisplay();
      this.updateCollectionCount();
      this.hideLoadingState();
    }, 300);
  }

  updatePropertiesDisplay() {
    // Hide all properties first
    this.allProperties.forEach(property => {
      property.element.style.display = 'none';
      property.visible = false;
    });

    // Show filtered properties
    this.filteredProperties.forEach(property => {
      property.element.style.display = 'block';
      property.visible = true;
    });

    // Show empty state if no properties match
    this.toggleEmptyState(this.filteredProperties.length === 0);
  }

  updateCollectionCount() {
    if (this.collectionCount) {
      const count = this.filteredProperties.length;
      const text = count === 1 ? 
        `${count} propiedad encontrada` : 
        `${count} propiedades encontradas`;
      this.collectionCount.textContent = text;
    }
  }

  updateActiveFiltersDisplay() {
    if (!this.activeFiltersContainer) return;

    this.activeFiltersContainer.innerHTML = '';

    this.activeFilters.forEach(filter => {
      const filterLabel = this.getFilterLabel(filter);
      const filterTag = document.createElement('div');
      filterTag.className = 'active-filter-tag';
      filterTag.innerHTML = `
        ${filterLabel}
        <button type="button" class="active-filter-remove" data-filter="${filter}" aria-label="Remover filtro ${filterLabel}">
          ×
        </button>
      `;

      // Add remove event listener
      const removeBtn = filterTag.querySelector('.active-filter-remove');
      removeBtn.addEventListener('click', () => {
        this.removeFilter(filter);
      });

      this.activeFiltersContainer.appendChild(filterTag);
    });
  }

  getFilterLabel(filter) {
    // Convert filter values to readable labels
    const filterLabels = {
      'casa': 'Casas',
      'departamento': 'Departamentos',
      'terreno': 'Terrenos',
      'precio-0-500000': 'Hasta $500,000',
      'precio-500000-1000000': '$500,000 - $1,000,000',
      'precio-1000000-plus': 'Más de $1,000,000'
    };

    // Handle location filters
    if (filter.startsWith('ubicacion-')) {
      return filter.replace('ubicacion-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    return filterLabels[filter] || filter;
  }

  removeFilter(filter) {
    this.activeFilters.delete(filter);
    
    // Uncheck the corresponding checkbox
    const checkbox = this.filterContainer.querySelector(`input[value="${filter}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }

    this.updateURL();
    this.applyFilters();
    this.updateActiveFiltersDisplay();
    this.updateClearButton();
  }

  clearAllFilters() {
    this.activeFilters.clear();
    
    // Uncheck all checkboxes
    const checkboxes = this.filterContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    this.updateURL();
    this.applyFilters();
    this.updateActiveFiltersDisplay();
    this.updateClearButton();
  }

  updateClearButton() {
    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.style.display = this.activeFilters.size > 0 ? 'block' : 'none';
    }
  }

  toggleEmptyState(show) {
    let emptyState = this.propertiesGrid.querySelector('.filter-empty-state');
    
    if (show && !emptyState) {
      emptyState = document.createElement('div');
      emptyState.className = 'filter-empty-state';
      emptyState.innerHTML = `
        <div class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" stroke-width="2"/>
            <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" stroke="currentColor" stroke-width="2"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2"/>
          </svg>
          <h3 class="empty-title">No se encontraron propiedades</h3>
          <p class="empty-description">
            No hay propiedades que coincidan con los filtros seleccionados. 
            Intenta ajustar los criterios de búsqueda.
          </p>
          <button type="button" class="btn btn--primary" onclick="propertyFilter.clearAllFilters()">
            Limpiar filtros
          </button>
        </div>
      `;
      this.propertiesGrid.appendChild(emptyState);
    } else if (!show && emptyState) {
      emptyState.remove();
    }
  }

  showLoadingState() {
    if (this.collectionMain) {
      this.collectionMain.classList.add('filtering');
    }
  }

  hideLoadingState() {
    if (this.collectionMain) {
      this.collectionMain.classList.remove('filtering');
    }
  }

  toggleMobileFilters() {
    if (this.sidebar) {
      const isActive = this.sidebar.classList.contains('active');
      
      if (isActive) {
        this.closeMobileFilters();
      } else {
        this.openMobileFilters();
      }
    }
  }

  openMobileFilters() {
    this.sidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay active';
    overlay.addEventListener('click', this.closeMobileFilters.bind(this));
    document.body.appendChild(overlay);
  }

  closeMobileFilters() {
    this.sidebar.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove overlay
    const overlay = document.querySelector('.filter-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  updateURL() {
    const url = new URL(window.location);
    
    // Clear existing filter parameters
    url.searchParams.delete('property_type');
    url.searchParams.delete('location');
    url.searchParams.delete('price_range');

    // Add active filters to URL
    this.activeFilters.forEach(filter => {
      if (filter === 'casa' || filter === 'departamento' || filter === 'terreno') {
        url.searchParams.append('property_type', filter);
      } else if (filter.startsWith('ubicacion-')) {
        url.searchParams.append('location', filter);
      } else if (filter.startsWith('precio-')) {
        url.searchParams.append('price_range', filter);
      }
    });

    // Update browser history without reloading
    window.history.replaceState({}, '', url);
  }

  initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Clear current filters
    this.activeFilters.clear();
    
    // Get filters from URL
    const propertyTypes = urlParams.getAll('property_type');
    const locations = urlParams.getAll('location');
    const priceRanges = urlParams.getAll('price_range');
    
    // Add to active filters
    [...propertyTypes, ...locations, ...priceRanges].forEach(filter => {
      this.activeFilters.add(filter);
    });

    // Update checkboxes
    const checkboxes = this.filterContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.activeFilters.has(checkbox.value);
    });

    // Apply filters
    this.applyFilters();
    this.updateActiveFiltersDisplay();
    this.updateClearButton();
  }
}

// Initialize property filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.collection-page')) {
    window.propertyFilter = new PropertyFilter();
  }
});// 
===================================
// PROPERTY DETAIL PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize property gallery functionality
  initPropertyGallery();
  initLightbox();
});

/**
 * Initialize property gallery thumbnail functionality
 */
function initPropertyGallery() {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  if (!mainImage || thumbnails.length === 0) return;
  
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      const imageSrc = this.dataset.imageSrc;
      const imageIndex = this.dataset.imageIndex;
      
      if (imageSrc) {
        // Update main image
        mainImage.src = imageSrc;
        mainImage.dataset.imageIndex = imageIndex;
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
        
        // Update lightbox trigger
        const lightboxTrigger = document.querySelector('.lightbox-trigger');
        if (lightboxTrigger) {
          lightboxTrigger.dataset.imageIndex = imageIndex;
        }
      }
    });
  });
}

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger, .main-image');
  
  if (!lightbox || !lightboxImage) return;
  
  // Get all product images
  const productImages = [];
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');
  
  // Build images array
  if (mainImage) {
    productImages.push({
      src: mainImage.src,
      alt: mainImage.alt
    });
  }
  
  thumbnails.forEach(thumbnail => {
    const imageSrc = thumbnail.dataset.imageSrc;
    if (imageSrc && !productImages.some(img => img.src === imageSrc)) {
      productImages.push({
        src: imageSrc,
        alt: mainImage ? mainImage.alt : 'Property Image'
      });
    }
  });
  
  let currentImageIndex = 0;
  
  /**
   * Open lightbox with specific image
   */
  function openLightbox(imageIndex = 0) {
    if (productImages.length === 0) return;
    
    currentImageIndex = Math.max(0, Math.min(imageIndex, productImages.length - 1));
    updateLightboxImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    lightboxClose.focus();
  }
  
  /**
   * Close lightbox
   */
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  /**
   * Update lightbox image and counter
   */
  function updateLightboxImage() {
    if (productImages[currentImageIndex]) {
      lightboxImage.src = productImages[currentImageIndex].src;
      lightboxImage.alt = productImages[currentImageIndex].alt;
      
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${productImages.length}`;
      }
    }
  }
  
  /**
   * Navigate to previous image
   */
  function showPreviousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1;
    updateLightboxImage();
  }
  
  /**
   * Navigate to next image
   */
  function showNextImage() {
    currentImageIndex = currentImageIndex < productImages.length - 1 ? currentImageIndex + 1 : 0;
    updateLightboxImage();
  }
  
  // Event listeners for opening lightbox
  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const imageIndex = parseInt(this.dataset.imageIndex) || 0;
      openLightbox(imageIndex);
    });
  });
  
  // Event listeners for closing lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }
  
  // Event listeners for navigation
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPreviousImage);
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPreviousImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    }
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightboxImage.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  lightboxImage.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    }
  }
}

/**
 * Smooth scroll to appointment form
 */
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href="#appointment-form"]')) {
    e.preventDefault();
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
      appointmentForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

/**
 * Lazy loading for images (performance optimization)
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);
/**

 * Mobile Navigation Enhancement
 * Enhanced mobile navigation with better accessibility and smooth animations
 */
class MobileNavigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.mobileToggle = document.querySelector('.header__menu-toggle');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.mobileClose = document.querySelector('.mobile-nav__close');
    this.mobileOverlay = document.querySelector('.mobile-nav__overlay');
    this.mobileToggles = document.querySelectorAll('.mobile-nav__toggle');
    this.mobileLinks = document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__toggle), .mobile-nav__sublink');
    
    if (this.mobileToggle && this.mobileNav) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.setupAccessibility();
  }

  bindEvents() {
    // Mobile menu toggle
    this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
    
    // Mobile menu close
    if (this.mobileClose) {
      this.mobileClose.addEventListener('click', this.closeMobileMenu.bind(this));
    }
    
    // Overlay close
    if (this.mobileOverlay) {
      this.mobileOverlay.addEventListener('click', this.closeMobileMenu.bind(this));
    }
    
    // Submenu toggles
    this.mobileToggles.forEach(toggle => {
      toggle.addEventListener('click', this.toggleSubmenu.bind(this));
    });
    
    // Close menu on link click (for anchor links)
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          this.closeMobileMenu();
        }
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  setupAccessibility() {
    // Set initial ARIA attributes
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.setAttribute('aria-controls', 'mobile-menu');
    
    this.mobileToggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  toggleMobileMenu() {
    const isOpen = this.mobileNav.classList.contains('mobile-nav--open');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileNav.classList.add('mobile-nav--open');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-open');
    
    // Focus management
    const firstFocusable = this.mobileNav.querySelector('button, a');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
    
    // Track analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'mobile_menu_open', {
        'event_category': 'Navigation',
        'event_label': 'Mobile Menu'
      });
    }
  }

  closeMobileMenu() {
    this.mobileNav.classList.remove('mobile-nav--open');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    
    // Reset all submenus
    this.mobileToggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
      const submenu = toggle.nextElementSibling;
      if (submenu) {
        submenu.style.maxHeight = '0';
      }
    });
    
    // Return focus to toggle button
    this.mobileToggle.focus();
  }

  toggleSubmenu(event) {
    const toggle = event.currentTarget;
    const submenu = toggle.nextElementSibling;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    // Close other submenus
    this.mobileToggles.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        otherToggle.setAttribute('aria-expanded', 'false');
        const otherSubmenu = otherToggle.nextElementSibling;
        if (otherSubmenu) {
          otherSubmenu.style.maxHeight = '0';
        }
      }
    });
    
    // Toggle current submenu
    toggle.setAttribute('aria-expanded', !isExpanded);
    if (!isExpanded) {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
    } else {
      submenu.style.maxHeight = '0';
    }
  }

  handleKeydown(event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape' && this.mobileNav.classList.contains('mobile-nav--open')) {
      this.closeMobileMenu();
    }
    
    // Handle Enter and Space for custom buttons
    if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('mobile-nav__toggle')) {
      event.preventDefault();
      this.toggleSubmenu(event);
    }
  }

  handleResize() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth >= 768 && this.mobileNav.classList.contains('mobile-nav--open')) {
      this.closeMobileMenu();
    }
  }
}

/**
 * Desktop Navigation Enhancement
 * Enhanced desktop navigation with better dropdown handling
 */
class DesktopNavigation {
  constructor() {
    this.dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    
    if (this.dropdownToggles.length > 0) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.dropdownToggles.forEach(toggle => {
      const dropdown = toggle.nextElementSibling;
      
      // Click to toggle
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown(toggle);
      });
      
      // Hover to show (desktop only)
      if (window.innerWidth >= 768) {
        const navItem = toggle.closest('.nav-item');
        
        navItem.addEventListener('mouseenter', () => {
          this.showDropdown(toggle);
        });
        
        navItem.addEventListener('mouseleave', () => {
          this.hideDropdown(toggle);
        });
      }
      
      // Keyboard navigation
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleDropdown(toggle);
        } else if (e.key === 'Escape') {
          this.hideDropdown(toggle);
          toggle.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.showDropdown(toggle);
          const firstLink = dropdown.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });
      
      // Handle dropdown link navigation
      const dropdownLinks = dropdown.querySelectorAll('a');
      dropdownLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextLink = dropdownLinks[index + 1];
            if (nextLink) nextLink.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (index === 0) {
              toggle.focus();
            } else {
              dropdownLinks[index - 1].focus();
            }
          } else if (e.key === 'Escape') {
            this.hideDropdown(toggle);
            toggle.focus();
          }
        });
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      this.dropdownToggles.forEach(toggle => {
        const navItem = toggle.closest('.nav-item');
        if (!navItem.contains(e.target)) {
          this.hideDropdown(toggle);
        }
      });
    });
  }

  toggleDropdown(toggle) {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    // Close other dropdowns
    this.dropdownToggles.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        this.hideDropdown(otherToggle);
      }
    });
    
    // Toggle current dropdown
    if (isExpanded) {
      this.hideDropdown(toggle);
    } else {
      this.showDropdown(toggle);
    }
  }

  showDropdown(toggle) {
    toggle.setAttribute('aria-expanded', 'true');
  }

  hideDropdown(toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Sticky Header Enhancement
 * Enhanced sticky header with scroll direction detection
 */
class StickyHeader {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollTop = 0;
    this.scrollThreshold = 100;
    this.hideThreshold = 200;
    
    if (this.header) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > this.scrollThreshold) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (scrollTop > this.lastScrollTop && scrollTop > this.hideThreshold) {
      // Scrolling down
      this.header.classList.add('header--hidden');
    } else {
      // Scrolling up
      this.header.classList.remove('header--hidden');
    }
    
    this.lastScrollTop = scrollTop;
  }
}

/**
 * Image Gallery Lightbox
 * Handles lightbox functionality for property image galleries
 */
class ImageLightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightboxImage');
    this.lightboxCounter = document.getElementById('lightboxCounter');
    this.closeButton = document.querySelector('.lightbox-close');
    this.prevButton = document.querySelector('.lightbox-prev');
    this.nextButton = document.querySelector('.lightbox-next');
    this.overlay = document.querySelector('.lightbox-overlay');
    
    this.images = [];
    this.currentIndex = 0;
    this.isOpen = false;
    
    if (this.lightbox) {
      this.init();
    }
  }

  init() {
    this.collectImages();
    this.bindEvents();
    this.bindKeyboardEvents();
  }

  collectImages() {
    // Get all product images for the lightbox
    const productImages = document.querySelectorAll('.gallery-main img, .thumbnail img');
    const product = window.product || {};
    
    if (product.images && product.images.length > 0) {
      this.images = product.images.map((image, index) => ({
        src: image.replace(/(_\d+x\d+)?(\.[^.]+)$/, '_1200x900$2'), // Get larger version
        alt: `${product.title || 'Property'} - Image ${index + 1}`,
        index: index
      }));
    } else {
      // Fallback: collect from DOM
      this.images = Array.from(productImages).map((img, index) => ({
        src: img.src.replace(/(_\d+x\d+)?(\.[^.]+)$/, '_1200x900$2'),
        alt: img.alt || `Property Image ${index + 1}`,
        index: index
      }));
    }
  }

  bindEvents() {
    // Lightbox triggers
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger, .thumbnail');
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const imageIndex = parseInt(trigger.dataset.imageIndex) || 0;
        this.openLightbox(imageIndex);
      });
    });

    // Main image click
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
      mainImage.addEventListener('click', () => {
        this.openLightbox(0);
      });
      mainImage.style.cursor = 'pointer';
    }

    // Close events
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeLightbox());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeLightbox());
    }

    // Navigation events
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.previousImage());
    }
    
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.nextImage());
    }

    // Touch/swipe events for mobile
    this.bindTouchEvents();
  }

  bindKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.previousImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextImage();
          break;
      }
    });
  }

  bindTouchEvents() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    if (this.lightboxImage) {
      this.lightboxImage.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      });

      this.lightboxImage.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only handle horizontal swipes (ignore vertical scrolling)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            this.previousImage();
          } else {
            this.nextImage();
          }
        }
      });
    }
  }

  openLightbox(imageIndex = 0) {
    if (this.images.length === 0) return;

    this.currentIndex = Math.max(0, Math.min(imageIndex, this.images.length - 1));
    this.isOpen = true;
    
    // Show lightbox
    this.lightbox.style.display = 'flex';
    document.body.classList.add('lightbox-open');
    
    // Load image
    this.loadImage(this.currentIndex);
    
    // Update navigation visibility
    this.updateNavigation();
    
    // Focus management for accessibility
    this.closeButton.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Track analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'lightbox_open', {
        'event_category': 'Property Gallery',
        'event_label': 'Image View',
        'custom_parameters': {
          'image_index': this.currentIndex
        }
      });
    }
  }

  closeLightbox() {
    this.isOpen = false;
    
    // Hide lightbox
    this.lightbox.style.display = 'none';
    document.body.classList.remove('lightbox-open');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to trigger element
    const activeTrigger = document.querySelector('.thumbnail.active, .lightbox-trigger');
    if (activeTrigger) {
      activeTrigger.focus();
    }
  }

  loadImage(index) {
    if (!this.images[index]) return;

    const image = this.images[index];
    
    // Show loading state
    this.lightboxImage.style.opacity = '0.5';
    
    // Create new image to preload
    const img = new Image();
    img.onload = () => {
      this.lightboxImage.src = img.src;
      this.lightboxImage.alt = image.alt;
      this.lightboxImage.style.opacity = '1';
      this.updateCounter();
    };
    
    img.onerror = () => {
      // Fallback to original src if high-res version fails
      this.lightboxImage.src = image.src.replace('_1200x900', '_800x600');
      this.lightboxImage.alt = image.alt;
      this.lightboxImage.style.opacity = '1';
      this.updateCounter();
    };
    
    img.src = image.src;
  }

  previousImage() {
    if (this.images.length <= 1) return;
    
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
    this.loadImage(this.currentIndex);
    this.updateNavigation();
  }

  nextImage() {
    if (this.images.length <= 1) return;
    
    this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    this.loadImage(this.currentIndex);
    this.updateNavigation();
  }

  updateCounter() {
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
  }

  updateNavigation() {
    // Show/hide navigation buttons based on image count
    if (this.images.length <= 1) {
      if (this.prevButton) this.prevButton.style.display = 'none';
      if (this.nextButton) this.nextButton.style.display = 'none';
    } else {
      if (this.prevButton) this.prevButton.style.display = 'flex';
      if (this.nextButton) this.nextButton.style.display = 'flex';
    }
  }
}

/**
 * Gallery Thumbnail Navigation
 * Handles thumbnail navigation for the main image
 */
class GalleryThumbnails {
  constructor() {
    this.mainImage = document.getElementById('mainImage');
    this.thumbnails = document.querySelectorAll('.thumbnail');
    
    if (this.mainImage && this.thumbnails.length > 0) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchMainImage(thumbnail, index);
      });

      // Keyboard navigation
      thumbnail.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.switchMainImage(thumbnail, index);
        }
      });
    });
  }

  switchMainImage(clickedThumbnail, index) {
    // Update main image
    const newImageSrc = clickedThumbnail.dataset.imageSrc;
    if (newImageSrc && this.mainImage) {
      // Add loading state
      this.mainImage.style.opacity = '0.7';
      
      // Create new image to preload
      const img = new Image();
      img.onload = () => {
        this.mainImage.src = img.src;
        this.mainImage.style.opacity = '1';
      };
      img.src = newImageSrc;
    }

    // Update active thumbnail
    this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
    clickedThumbnail.classList.add('active');

    // Update lightbox trigger data
    const lightboxTrigger = document.querySelector('.lightbox-trigger');
    if (lightboxTrigger) {
      lightboxTrigger.dataset.imageIndex = index.toString();
    }

    // Track thumbnail interaction
    if (typeof gtag !== 'undefined') {
      gtag('event', 'thumbnail_click', {
        'event_category': 'Property Gallery',
        'event_label': 'Thumbnail Navigation',
        'custom_parameters': {
          'thumbnail_index': index
        }
      });
    }
  }
}

// Initialize navigation components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
  new DesktopNavigation();
  new StickyHeader();
  
  // Initialize gallery components on product pages
  if (document.querySelector('.property-detail')) {
    new ImageLightbox();
    new GalleryThumbnails();
  }
});
/**
 * 
Mobile Accessibility Enhancements
 */
class MobileAccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceFormAccessibility();
    this.addKeyboardNavigation();
    this.improveScreenReaderSupport();
    this.addFocusManagement();
  }

  enhanceFormAccessibility() {
    // Add live regions for form feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      // Create live region for form status
      if (!document.getElementById('form-status-live')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'form-status-live';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        document.body.appendChild(liveRegion);
      }

      // Enhance form field labels
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label && !input.getAttribute('aria-labelledby')) {
          input.setAttribute('aria-labelledby', label.id || input.id + '_label');
          if (!label.id) {
            label.id = input.id + '_label';
          }
        }
      });
    });
  }

  addKeyboardNavigation() {
    // Enhance keyboard navigation for property cards
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = card.querySelector('.property-card__btn');
          if (link) {
            link.click();
          }
        }
      });
    });

    // Add keyboard support for WhatsApp button
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          whatsappBtn.click();
        }
      });
    }
  }

  improveScreenReaderSupport() {
    // Add screen reader announcements for dynamic content
    const announceToScreenReader = (message) => {
      const liveRegion = document.getElementById('form-status-live');
      if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 1000);
      }
    };

    // Announce form submission states
    document.addEventListener('formSubmissionStart', () => {
      announceToScreenReader('Enviando formulario...');
    });

    document.addEventListener('formSubmissionSuccess', () => {
      announceToScreenReader('Formulario enviado exitosamente');
    });

    document.addEventListener('formSubmissionError', () => {
      announceToScreenReader('Error al enviar formulario. Por favor revise los campos.');
    });
  }

  addFocusManagement() {
    // Manage focus for better accessibility
    const manageFocus = () => {
      // Skip to main content functionality
      const skipLink = document.querySelector('.skip-to-content-link');
      if (skipLink) {
        skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          const mainContent = document.getElementById('MainContent');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // Focus management for modals and overlays
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      // Trap focus in forms when they have errors
      document.addEventListener('formValidationError', (e) => {
        const form = e.target;
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    };

    manageFocus();
  }
}

/**
 * Enhanced Form Validation with Accessibility
 */
class AccessibleFormValidator {
  constructor(form) {
    this.form = form;
    this.init();
  }

  init() {
    this.addAriaDescriptions();
    this.enhanceErrorHandling();
    this.addProgressiveEnhancement();
  }

  addAriaDescriptions() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      // Add aria-describedby for error messages
      const errorElement = input.parentNode.querySelector('.form-error');
      if (errorElement && !input.getAttribute('aria-describedby')) {
        input.setAttribute('aria-describedby', errorElement.id);
      }

      // Add aria-invalid for validation states
      input.addEventListener('invalid', () => {
        input.setAttribute('aria-invalid', 'true');
      });

      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.setAttribute('aria-invalid', 'false');
        }
      });
    });
  }

  enhanceErrorHandling() {
    // Custom validation messages
    const setCustomValidity = (input, message) => {
      input.setCustomValidity(message);
      input.setAttribute('aria-invalid', 'true');
      
      const errorElement = input.parentNode.querySelector('.form-error');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
      }
    };

    // Clear custom validity
    const clearCustomValidity = (input) => {
      input.setCustomValidity('');
      input.setAttribute('aria-invalid', 'false');
      
      const errorElement = input.parentNode.querySelector('.form-error');
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.removeAttribute('role');
      }
    };

    // Add to form validator instances
    this.setCustomValidity = setCustomValidity;
    this.clearCustomValidity = clearCustomValidity;
  }

  addProgressiveEnhancement() {
    // Add visual feedback for form interactions
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      // Add loading states
      input.addEventListener('blur', () => {
        if (input.value && input.checkValidity()) {
          input.classList.add('validated');
        }
      });

      // Add character count for textareas
      if (input.tagName === 'TEXTAREA' && input.hasAttribute('maxlength')) {
        const maxLength = input.getAttribute('maxlength');
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.setAttribute('aria-live', 'polite');
        input.parentNode.appendChild(counter);

        const updateCounter = () => {
          const remaining = maxLength - input.value.length;
          counter.textContent = `${remaining} caracteres restantes`;
          
          if (remaining < 20) {
            counter.classList.add('warning');
          } else {
            counter.classList.remove('warning');
          }
        };

        input.addEventListener('input', updateCounter);
        updateCounter();
      }
    });
  }
}

/**
 * Mobile Performance Optimizer
 */
class MobilePerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.deferNonCriticalCSS();
    this.optimizeAnimations();
    this.addIntersectionObserver();
  }

  optimizeImages() {
    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.remove('lazy');
        img.classList.add('loaded');
        resolve();
      };
      
      tempImg.onerror = reject;
      tempImg.src = img.dataset.src;
    });
  }

  deferNonCriticalCSS() {
    // Defer non-critical CSS loading
    const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
    deferredStyles.forEach(link => {
      link.addEventListener('load', () => {
        link.media = 'all';
      });
    });
  }

  optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.classList.add('reduced-motion');
    }

    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.documentElement.classList.add('paused-animations');
      } else {
        document.documentElement.classList.remove('paused-animations');
      }
    });
  }

  addIntersectionObserver() {
    // Add intersection observer for animations
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1
      });

      document.querySelectorAll('.benefit-card, .property-card').forEach(el => {
        animationObserver.observe(el);
      });
    }
  }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
  new MobileAccessibilityEnhancer();
  new MobilePerformanceOptimizer();

  // Initialize accessible form validators
  document.querySelectorAll('form').forEach(form => {
    new AccessibleFormValidator(form);
  });
});