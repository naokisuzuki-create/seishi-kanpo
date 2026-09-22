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

  const resetStartedAt = () => {
    if (startedAt) startedAt.value = String(Date.now());
  };

  const setSubmitting = (submitting) => {
    if (!submit) return;
    submit.disabled = submitting;
    submit.textContent = submitting ? '送信中…' : '送信';
  };

  const resetTurnstile = () => {
    if (window.turnstile && typeof window.turnstile.reset === 'function') {
      try { window.turnstile.reset(); } catch (_) {}
    }
  };

  resetStartedAt();

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

    const turnstileToken = String(new FormData(contactForm).get('cf-turnstile-response') || '').trim();
    if (!turnstileToken) {
      if (status) status.textContent = 'スパム対策の確認が完了していません。少し待ってから、もう一度お試しください。';
      return;
    }

    setSubmitting(true);
    if (status) status.textContent = '送信しています…';

    HTMLFormElement.prototype.submit.call(contactForm);
  });

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || data.type !== 'seishi-kanpo-contact-result') return;

    setSubmitting(false);
    resetTurnstile();
    resetStartedAt();

    if (data.ok === true) {
      contactForm.reset();
      resetStartedAt();
      if (status) status.textContent = data.message || 'お問い合わせを送信しました。ありがとうございます。';
    } else {
      if (status) status.textContent = data.message || '送信できませんでした。時間をおいて、もう一度お試しください。';
    }
  });
}
