/* =========================================
   BRIGHTSMILE DENTAL — BOOKING FORM
   Multi-step validation + confirmation
   ========================================= */

export function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll('.form-step'));
  const progressSteps = document.querySelectorAll('.form-progress__step');
  const successScreen = document.getElementById('booking-success');

  let currentStep = 0;

  // Time slots generation
  generateTimeSlots();

  // Set min date to today (no Sundays)
  const dateInput = document.getElementById('appointment-date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    dateInput.addEventListener('change', () => {
      const date = new Date(dateInput.value + 'T00:00:00');
      if (date.getDay() === 0) {
        showFieldError(dateInput, 'We are closed on Sundays. Please choose another date.');
        dateInput.value = '';
      } else {
        clearFieldError(dateInput);
        generateTimeSlots(date);
      }
    });
  }

  // Dynamic service dropdown based on category tiles
  const categoryInputs = form.querySelectorAll('input[name="service_category"]');
  const specificServiceSelect = document.getElementById('specific-service');
  const serviceOptions = {
    general: ['Comprehensive Exam + Cleaning', 'Dental Filling', 'Root Canal', 'Crown or Bridge', 'Tooth Extraction', 'Night Guard'],
    cosmetic: ['Zoom Teeth Whitening', 'Take-Home Whitening Kit', 'Porcelain Veneers', 'Composite Bonding', 'Smile Makeover', 'Gum Contouring'],
    orthodontics: ['Invisalign Consultation', 'Invisalign Treatment', 'Traditional Braces', 'Retainer Fitting'],
    implants: ['Implant Consultation', 'Single Tooth Implant', 'Implant-Supported Bridge', 'All-on-4', 'Bone Grafting'],
    pediatric: ["Child's First Visit", 'Child Exam + Cleaning', 'Dental Sealants', 'Fluoride Treatment', 'Space Maintainer'],
    emergency: ['Severe Toothache', 'Broken or Chipped Tooth', 'Lost Crown or Filling', 'Knocked-Out Tooth', 'Dental Abscess / Swelling'],
  };
  categoryInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (specificServiceSelect) {
        const opts = serviceOptions[input.value] || [];
        specificServiceSelect.innerHTML = '<option value="">Select a service…</option>' +
          opts.map(o => `<option value="${o.toLowerCase().replace(/\s+/g, '-')}">${o}</option>`).join('');
      }
    });
  });

  // Delegate next/prev/submit/edit button clicks (handles dynamically present buttons)
  form.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-next-step]');
    const prevBtn = e.target.closest('[data-prev-step]');
    const editBtn = e.target.closest('[data-go-to-step]');
    const submitBtn = e.target.closest('[type="submit"]');

    if (btn) {
      if (validateStep(currentStep)) goToStep(currentStep + 1);
    } else if (prevBtn) {
      goToStep(currentStep - 1);
    } else if (editBtn) {
      goToStep(parseInt(editBtn.dataset.goToStep, 10) - 1);
    } else if (submitBtn) {
      e.preventDefault();
      if (validateStep(currentStep)) submitForm();
    }
  });

  function goToStep(index) {
    if (index < 0 || index >= steps.length) return;

    steps[currentStep].classList.remove('is-active');
    steps[currentStep].hidden = true;
    progressSteps[currentStep]?.classList.remove('is-active');
    progressSteps[currentStep]?.classList.add('is-completed');

    currentStep = index;

    steps[currentStep].classList.add('is-active');
    steps[currentStep].hidden = false;
    progressSteps[currentStep]?.classList.add('is-active');
    progressSteps[currentStep]?.classList.remove('is-completed');

    // Update progress bar fill
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;

    // Scroll form into view
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // If last step, build summary
    if (currentStep === steps.length - 1) {
      buildConfirmationSummary();
    }
  }

  function validateStep(stepIndex) {
    const step = steps[stepIndex];
    let isValid = true;

    // Clear previous errors
    step.querySelectorAll('.form-input--error, .form-select--error, .form-textarea--error').forEach(el => {
      el.classList.remove('form-input--error', 'form-select--error', 'form-textarea--error');
    });
    step.querySelectorAll('.form-error').forEach(el => el.remove());

    // Track radio group names already validated to avoid duplicate checks
    const checkedRadioGroups = new Set();

    // Required fields — only actual form controls (not container divs)
    step.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
      if (field.type === 'radio') {
        if (checkedRadioGroups.has(field.name)) return;
        checkedRadioGroups.add(field.name);
        const groupChecked = step.querySelector(`input[name="${field.name}"]:checked`);
        if (!groupChecked) {
          // Show error on the radiogroup container if it has an id, else on the first radio
          const container = step.querySelector(`[role="radiogroup"][id$="-group"]`) ||
                            step.querySelector(`input[name="${field.name}"]`);
          showFieldError(field, getRequiredMessage(field));
          isValid = false;
        }
      } else if (field.type === 'checkbox') {
        if (!field.checked) {
          showFieldError(field, getRequiredMessage(field));
          isValid = false;
        }
      } else {
        if (!field.value || field.value.trim() === '') {
          showFieldError(field, getRequiredMessage(field));
          isValid = false;
        } else {
          clearFieldError(field);
        }
      }
    });

    // Email validation
    const emailField = step.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
      showFieldError(emailField, 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone validation
    const phoneField = step.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
      showFieldError(phoneField, 'Please enter a valid 10-digit phone number.');
      isValid = false;
    }

    // Time slot selection (step 2) — must have a checked radio in the time-slots group
    if (stepIndex === 1) {
      const selectedTime = step.querySelector('input[name="appointment_time"]:checked');
      const timeSlotsErr = document.getElementById('time-slots-error');
      if (!selectedTime) {
        if (timeSlotsErr) timeSlotsErr.textContent = 'Please select an available time slot.';
        isValid = false;
      } else {
        if (timeSlotsErr) timeSlotsErr.textContent = '';
      }
    }

    // Privacy checkbox (step 3)
    if (stepIndex === 2) {
      const privacyCheck = step.querySelector('#privacy-consent');
      if (privacyCheck && !privacyCheck.checked) {
        showFieldError(privacyCheck, 'Please accept the privacy policy to continue.');
        isValid = false;
      }
    }

    // Scroll to first error
    if (!isValid) {
      const firstError = step.querySelector('.form-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add('form-input--error');
    field.setAttribute('aria-invalid', 'true');

    const errorId = (field.id || 'field') + '-error';
    field.setAttribute('aria-describedby', errorId);

    // Remove existing error
    const existing = document.getElementById(errorId);
    if (existing) existing.remove();

    const errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.id = errorId;
    errorEl.setAttribute('role', 'alert');
    errorEl.innerHTML = `
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      ${message}
    `;

    const parent = field.closest('.form-group') || field.parentNode;
    parent.appendChild(errorEl);

    // Re-validate on input
    field.addEventListener('input', () => clearFieldError(field), { once: true });
  }

  function clearFieldError(field) {
    field.classList.remove('form-input--error', 'form-select--error');
    field.removeAttribute('aria-invalid');

    const errorId = (field.id || 'field') + '-error';
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.remove();
  }

  function getRequiredMessage(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    const labelText = label ? label.textContent.replace('*', '').trim() : 'This field';
    return `${labelText} is required.`;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^\+?[\d\s\-().]{10,}$/.test(phone.replace(/\D/g, '')) && phone.replace(/\D/g, '').length >= 10;
  }

  function generateTimeSlots(selectedDate) {
    const container = document.getElementById('time-slots-container');
    if (!container) return;

    const slots = [
      '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
      '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
    ];

    // Randomly mark a few slots as unavailable for realism
    const unavailable = new Set([2, 5, 9, 13]);

    container.innerHTML = slots.map((slot, i) => {
      const id = `time-slot-${i}`;
      const disabled = unavailable.has(i);
      return `
        <label class="time-slot-label${disabled ? ' time-slot-label--unavailable' : ''}">
          <input type="radio" name="appointment_time" value="${slot}" id="${id}"${disabled ? ' disabled' : ''} />
          <span>${slot}</span>
        </label>`;
    }).join('');

    // Clear time-slots error when user picks a slot
    container.addEventListener('change', () => {
      const timeSlotsErr = document.getElementById('time-slots-error');
      if (timeSlotsErr) timeSlotsErr.textContent = '';
    }, { once: false });
  }

  function buildConfirmationSummary() {
    const svcEl = document.getElementById('summary-service');
    const apptEl = document.getElementById('summary-appointment');
    const patientEl = document.getElementById('summary-patient');
    if (!svcEl && !apptEl && !patientEl) return;

    const category = form.querySelector('[name="service_category"]:checked')?.value || '';
    const specific = form.querySelector('#specific-service');
    const specificText = specific && specific.selectedIndex > 0 ? specific.options[specific.selectedIndex].text : (category || 'Not specified');
    const doctor = form.querySelector('#doctor-pref');
    const doctorText = doctor && doctor.selectedIndex > 0 ? doctor.options[doctor.selectedIndex].text : 'No preference';
    const patientType = form.querySelector('[name="patient_type"]:checked')?.value === 'returning' ? 'Returning Patient' : 'New Patient';

    const dateVal = form.querySelector('#appointment-date')?.value || '';
    const timeVal = form.querySelector('input[name="appointment_time"]:checked')?.value || 'Not selected';
    const location = form.querySelector('[name="location"]:checked')?.value === 'westside' ? 'Westside Clinic' : 'Downtown Clinic';

    const firstName = form.querySelector('#first-name')?.value || '';
    const lastName = form.querySelector('#last-name')?.value || '';
    const email = form.querySelector('#patient-email')?.value || '';
    const phone = form.querySelector('#patient-phone')?.value || '';
    const insurance = form.querySelector('#insurance-provider');
    const insuranceText = insurance && insurance.selectedIndex > 0 ? insurance.options[insurance.selectedIndex].text : 'No insurance / Self-pay';

    const formattedDate = dateVal
      ? new Date(dateVal + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'Not selected';

    const row = (label, value) => `<div class="booking-summary__row"><dt>${label}</dt><dd>${value}</dd></div>`;

    if (svcEl) svcEl.innerHTML = row('Service', specificText) + row('Doctor', doctorText) + row('Patient Type', patientType);
    if (apptEl) apptEl.innerHTML = row('Date', formattedDate) + row('Time', timeVal) + row('Location', location);
    if (patientEl) patientEl.innerHTML = row('Name', `${firstName} ${lastName}`) + row('Email', email || '—') + row('Phone', phone || '—') + row('Insurance', insuranceText);
  }

  function submitForm() {
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) { confirmBtn.classList.add('is-loading'); confirmBtn.disabled = true; }

    setTimeout(() => {
      form.hidden = true;

      if (successScreen) {
        successScreen.hidden = false;

        // Populate success email
        const emailSpan = document.getElementById('success-email');
        if (emailSpan) emailSpan.textContent = form.querySelector('#patient-email')?.value || 'your email';

        // Generate confirmation number
        const confirmNum = document.getElementById('confirmation-number');
        if (confirmNum) confirmNum.textContent = 'BS-' + Math.random().toString(36).toUpperCase().slice(2, 8);

        // Success summary card
        const successDetails = document.getElementById('success-details');
        if (successDetails) {
          const dateVal = form.querySelector('#appointment-date')?.value || '';
          const timeVal = form.querySelector('input[name="appointment_time"]:checked')?.value || '';
          const location = form.querySelector('[name="location"]:checked')?.value === 'westside' ? 'Westside Clinic' : 'Downtown Clinic';
          const formattedDate = dateVal ? new Date(dateVal + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '';
          successDetails.innerHTML = `<p><strong>${formattedDate}</strong> at <strong>${timeVal}</strong></p><p>${location}</p>`;
        }

        // ICS calendar link
        const calendarBtn = document.getElementById('add-to-calendar');
        if (calendarBtn) {
          const dateVal = form.querySelector('#appointment-date')?.value;
          const timeVal = form.querySelector('input[name="appointment_time"]:checked')?.value || '9:00 AM';
          if (dateVal) calendarBtn.href = generateICSLink(dateVal, timeVal);
        }

        successScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1500);
  }

  function generateICSLink(dateStr, timeStr) {
    // Simple ICS for demo
    const date = new Date(dateStr + 'T09:00:00');
    const pad = n => String(n).padStart(2, '0');
    const dtStart = `${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}T090000`;
    const dtEnd = `${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}T100000`;

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'SUMMARY:BrightSmile Dental Appointment',
      'DESCRIPTION:Your appointment at BrightSmile Dental. Questions? Call (555) 123-4567.',
      'LOCATION:123 Wellness Ave Suite 200 San Francisco CA 94102',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    return URL.createObjectURL(blob);
  }
}
