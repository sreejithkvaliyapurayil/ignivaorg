const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');

function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}

menu.hidden = false;
nav.classList.add('collapsible');
menu.addEventListener('click', () => {
  setMenu(menu.getAttribute('aria-expanded') === 'false');
});
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
  const filterButtons = Array.from(filters.querySelectorAll('button'));
  const projects = Array.from(document.querySelectorAll('.project[data-sector]'));
  const count = document.querySelector('#project-count');

  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const selected = event.target.closest('button[data-filter]');
    if (!selected) return;

    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button === selected));
    });

    let visible = 0;
    projects.forEach((project) => {
      project.hidden = selected.dataset.filter !== 'all'
        && project.dataset.sector !== selected.dataset.filter;
      if (!project.hidden) visible += 1;
    });

    count.textContent = visible === 1 ? '1 project shown' : visible + ' projects shown';
  });
}
