const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}

menu.hidden = false;
nav.classList.add('collapsible');
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

const filters = document.querySelector('#filters');
if (filters) {
  const buttons = Array.from(filters.querySelectorAll('button'));
  const cards = Array.from(document.querySelectorAll('[data-sector]'));
  const count = document.querySelector('#project-count');

  function showSector(sector) {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === sector)));
    cards.forEach((card) => {
      card.hidden = sector !== 'all' && card.dataset.sector !== sector;
    });
    const total = cards.filter((card) => !card.hidden).length;
    count.textContent = total === 1 ? '1 project' : total + ' projects';
  }

  const sector = new URLSearchParams(location.search).get('sector');
  showSector(buttons.some((button) => button.dataset.filter === sector) ? sector : 'all');
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (button) showSector(button.dataset.filter);
  });
}

const form = document.querySelector('#enquiry');
if (form) {
  form.hidden = false;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const subject = 'IGNIVA Group enquiry — ' + form.querySelector('#interest').value;
    const body = 'Name: ' + form.querySelector('#name').value.trim() + '\n\n' + form.querySelector('#message').value.trim();
    location.href = 'mailto:info@ignivagroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

const showcase = document.querySelector('.home-showcase');
if (showcase) {
  const slides = Array.from(showcase.querySelectorAll('.showcase-slide'));
  const images = slides.map((slide) => slide.querySelector('img'));
  const opening = images[0];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;
  let openingReady = false;

  function schedule() {
    clearTimeout(timer);
    if (openingReady && !document.hidden && !reducedMotion.matches &&
        !showcase.contains(document.activeElement)) {
      timer = setTimeout(advance, 2000);
    }
  }

  function advance() {
    let next = (current + 1) % slides.length;
    while (next !== current && images[next].complete && !images[next].naturalWidth) {
      next = (next + 1) % slides.length;
    }
    const image = images[next];
    if (image.complete && image.naturalWidth) {
      slides[current].hidden = true;
      slides[next].hidden = false;
      current = next;
    }
    schedule();
  }

  function start() {
    openingReady = true;
    if (opening.naturalWidth) showcase.classList.add('opening-ready');
    schedule();
  }

  opening.addEventListener('load', start, { once: true });
  opening.addEventListener('error', start, { once: true });
  if (opening.complete) start();
  reducedMotion.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  showcase.addEventListener('focusin', schedule);
  showcase.addEventListener('focusout', () => setTimeout(schedule, 0));
}
