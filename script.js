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
    location.href = 'mailto:info@igniva.org?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

const showcase = document.querySelector('.home-showcase');
if (showcase) {
  const slides = Array.from(showcase.querySelectorAll('.showcase-slide'));
  const controls = showcase.querySelector('.showcase-controls');
  const rotation = controls.querySelector('[data-rotation]');
  const position = controls.querySelector('[data-position]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let playing = !reducedMotion.matches;
  let hovered = false;

  function schedule() {
    clearTimeout(timer);
    if (playing && !hovered && !document.hidden) {
      timer = setTimeout(() => showSlide(index + 1), 6500);
    }
  }

  function showSlide(next) {
    slides[index].hidden = true;
    slides[index].classList.remove('entering');
    index = (next + slides.length) % slides.length;
    const slide = slides[index];
    slide.hidden = false;
    slide.classList.add('entering');
    position.textContent = (index + 1) + ' / ' + slides.length;
    schedule();
  }

  function setPlaying(value) {
    playing = value;
    rotation.textContent = playing ? 'Pause' : 'Play';
    position.setAttribute('aria-live', playing ? 'off' : 'polite');
    schedule();
  }

  showcase.addEventListener('focusin', (event) => {
    if (!showcase.contains(event.relatedTarget) && event.target.matches(':focus-visible')) setPlaying(false);
  });
  showcase.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') {
      hovered = true;
      schedule();
    }
  });
  showcase.addEventListener('pointerleave', () => {
    hovered = false;
    schedule();
  });
  rotation.addEventListener('click', () => setPlaying(!playing));
  controls.querySelector('[data-previous]').addEventListener('click', () => {
    setPlaying(false);
    showSlide(index - 1);
  });
  controls.querySelector('[data-next]').addEventListener('click', () => {
    setPlaying(false);
    showSlide(index + 1);
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) setPlaying(false);
  });
  document.addEventListener('visibilitychange', schedule);
  position.textContent = '1 / ' + slides.length;
  controls.hidden = false;
  setPlaying(playing);
}
