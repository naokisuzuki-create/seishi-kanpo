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

