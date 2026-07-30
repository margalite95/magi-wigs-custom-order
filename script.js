const form = document.getElementById('orderForm');
const hairTypeField = document.getElementById('hairTypeField');
const cards = [...document.querySelectorAll('.look-card')];
const thanksPage = document.getElementById('thanks-page');
const submitButton = form.querySelector('.btn-submit');
const messageBox = document.getElementById('form-message');

document.getElementById('year').textContent = new Date().getFullYear();

cards.forEach((card) => {
  card.addEventListener('click', () => {
    cards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');
    hairTypeField.value = card.dataset.hair;
    document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const originalText = submitButton.textContent;
  submitButton.textContent = 'שולח נתונים...';
  submitButton.disabled = true;
  submitButton.style.opacity = '.72';
  messageBox.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Form submission failed');

    form.reset();
    cards.forEach((card) => card.classList.remove('selected'));
    thanksPage.classList.add('open');
    thanksPage.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  } catch (error) {
    messageBox.style.color = '#ff8e8e';
    messageBox.textContent = 'אירעה שגיאה בשליחה. אפשר לנסות שוב או לפנות אלינו בוואטסאפ.';
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
  }
});

window.closeThanksPage = () => {
  thanksPage.classList.remove('open');
  thanksPage.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

thanksPage.addEventListener('click', (event) => {
  if (event.target === thanksPage) window.closeThanksPage();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && thanksPage.classList.contains('open')) {
    window.closeThanksPage();
  }
});
