const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function updateThemeIcon(isLight) {
  // Ανάλογα με την κλάση διάταξης του body, ξέρουμε τι εικονίδια να βάλουμε
  const isHome = document.body.classList.contains('home-layout');

  if (isHome) {
    // Τα εικονίδια της Αρχικής
    if (isLight) {
      themeIcon.setAttribute('viewBox', '2.5 3.5 18 17.9');
      themeIcon.innerHTML = '<path d="M18 12.5 A6.5 6.5 0 1 1 11 6 A5 5 0 0 0 18 12.5 Z" fill="none" stroke="var(--icon-color)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      themeIcon.setAttribute('viewBox', '2.5 3.5 19 19');
      themeIcon.innerHTML = '<circle cx="12" cy="13.2" r="2.55" fill="none" stroke="var(--icon-color)" stroke-width="1.8"/><path d="M12 5.2v1.7 M12 19.5v1.7 M4 13.2h1.7 M18.3 13.2h1.7 M6.34 7.54l1.2 1.2 M16.46 17.66l1.2 1.2 M17.66 7.54l-1.2 1.2 M7.54 17.66l-1.2 1.2" stroke="var(--icon-color)" stroke-width="1.9" stroke-linecap="round"/>';
    }
  } else {
    // Τα εικονίδια των Εσωτερικών σελίδων (page-layout / bio-layout)
    if (isLight) {
      themeIcon.setAttribute('viewBox', '0 0 24 24');
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
      themeIcon.setAttribute('viewBox', '0 0 24 24');
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }
  }
}

const isLightInitial = localStorage.getItem('theme') === 'light';
if (isLightInitial) {
  document.body.classList.add('light-theme');
}
updateThemeIcon(isLightInitial);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight);
});
