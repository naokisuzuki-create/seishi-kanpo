const button = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (button && nav) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
    nav.classList.toggle('is-open', !open);
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const filterItems = document.querySelectorAll('.filterable-item');

if (filterButtons.length && filterItems.length) {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      const filter = filterButton.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove('is-active'));
      filterButton.classList.add('is-active');

      filterItems.forEach((item) => {
        const visible = filter === 'all' || item.dataset.category === filter;
        item.hidden = !visible;
      });
    });
  });
}


const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const startedAt = document.querySelector('#form-started-at');
  const status = document.querySelector('#contact-status');
  const submit = document.querySelector('#contact-submit');

  if (startedAt) startedAt.value = String(Date.now());

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const honeypot = contactForm.querySelector('input[name="website"]');
    const started = Number(startedAt?.value || 0);
    const elapsed = Date.now() - started;

    if (honeypot && honeypot.value.trim() !== '') {
      if (status) status.textContent = '送信できませんでした。';
      return;
    }

    if (elapsed < 3000) {
      if (status) status.textContent = '少し時間をおいてから、もう一度送信してください。';
      return;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (status) status.textContent = '現在、送信先の最終設定中です。';
    if (submit) submit.blur();
  });
}
