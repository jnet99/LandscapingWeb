// --- EmailJS setup ---
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy its Service ID below
// 3. Create an Email Template using variables: {{name}}, {{email}}, {{street_address}}, {{lot_size}}, {{phone}}, {{message}}
//    -> copy its Template ID below
// 4. Account -> General -> copy your Public Key below
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('quoteStatus');
const submitBtn = document.getElementById('quoteSubmitBtn');
const modalOverlay = document.getElementById('quoteModalOverlay');
const modalClose = document.getElementById('quoteModalClose');
const modalOkBtn = document.getElementById('quoteModalOkBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  statusEl.textContent = '';
  statusEl.className = 'quote-status';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      form.reset();
      modalOverlay.classList.add('show');
    })
    .catch((err) => {
      console.error('Error sending quote request:', err);
      statusEl.textContent = "Something went wrong — please call us instead.";
      statusEl.classList.add('error');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request my quote';
    });
});

function closeModal(){ modalOverlay.classList.remove('show'); }
modalClose.addEventListener('click', closeModal);
modalOkBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- Nav toggle ---
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));

// --- Scroll-triggered quote popup ---
// Shows once, after the visitor has scrolled past the quote form
// without submitting it, as a gentle reminder.
const popup = document.getElementById('quotePopup');
const popupClose = document.getElementById('quotePopupClose');
const popupCta = document.getElementById('quotePopupCta');
const quoteSection = document.getElementById('quote');
let popupShown = false;
let popupDismissed = false;

const quoteObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.boundingClientRect.top < 0 && !popupShown && !popupDismissed) {
      popup.classList.add('show');
      popupShown = true;
    }
  });
}, { threshold: 0 });
quoteObserver.observe(quoteSection);

function hidePopup() {
  popup.classList.remove('show');
  popupDismissed = true;
}
popupClose.addEventListener('click', hidePopup);
popupCta.addEventListener('click', hidePopup);
