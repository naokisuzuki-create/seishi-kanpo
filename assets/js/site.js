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

const toc = document.querySelector('.article-toc');
const tocLinks = document.querySelector('.article-toc__links');
const proseHeadings = document.querySelectorAll('.prose h2, .prose h3');

if (toc && tocLinks) {
  if (proseHeadings.length < 2) {
    toc.hidden = true;
  } else {
    proseHeadings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      if (heading.tagName.toLowerCase() === 'h3') link.classList.add('is-sub');
      tocLinks.appendChild(link);
    });
  }
}
