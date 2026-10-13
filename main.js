document.addEventListener("DOMContentLoaded", function() {
  const headerContainer = document.getElementById("site-header");
  if (headerContainer) {
    fetch('header.html')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        headerContainer.innerHTML = data;
        
        // --- 1. ΔΥΝΑΜΙΚΗ ΦΟΡΤΩΣΗ ΤΙΤΛΟΥ & ΣΩΣΤΟΥ SVG ΑΡΙΣΤΕΡΑ ---
        setDynamicPageTitle();

        // --- 2. ΑΥΤΟΜΑΤΗ ΑΠΟΚΡΥΨΗ ΤΗΣ ΤΡΕΧΟΥΣΑΣ ΣΕΛΙΔΑΣ ΑΠΟ ΤΟ MENU ---
        hideCurrentPageFromMenu();

        // --- 3. ΕΝΕΡΓΟΠΟΙΗΣΗ THEME SWITCHER ---
        initThemeSwitcher();

        // --- 4. DROPDOWN ΜΕΝΟΥ ΠΛΟΗΓΗΣΗΣ ---
        initNavDropdowns();

        // --- 5. ΕΝΙΑΙΟ TOOLTIP ---
        initGlobalTooltip();

        // --- 6. ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΝΑΛΛΑΓΗΣ UI (Standard -> Alternative με Hash) ---
        initStandardUiToggle();
      })
      .catch(error => console.error('Error loading header:', error));
  }
});

function setDynamicPageTitle() {
  const titleContainer = document.getElementById('dynamicTitleContainer');
  if (!titleContainer) return;

  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1);

  let pageData = {
    title: 'Portfolio',
    svg: '<svg class="title-icon" viewBox="0 0 24 24"><path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z"/></svg>',
    subCategory: null
  };

  // --- ΒΑΣΙΚΕΣ ΣΕΛΙΔΕΣ ---
  if (pageName.includes('bio')) {
    pageData.title = 'Βιογραφικό';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
  } else if (pageName.includes('about')) {
    pageData.title = 'Προφίλ';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24"><path d="M20.89 22v-2.22a4.44 4.44 0 0 0-4.44-4.44H7.56a4.44 4.44 0 0 0-4.44 4.44V22"></path><circle cx="12" cy="6.44" r="4.44"></circle></svg>`;
  } else if (pageName.includes('projects')) {
    pageData.title = 'Εγχειρήματα';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`;
  } else if (pageName.includes('hobbies')) {
    pageData.title = 'Ενδιαφέροντα';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24"><path d="M12 22a10 10 0 1 1 0-20c5.52 0 10 3.98 10 8.89 0 2.78-2.22 5-5 5h-1.44c-.78 0-1.33.67-1.33 1.44 0 .33.11.67.33.89.44.56.78 1.33.78 2.11 0 1.67-1.44 1.67-3.33 1.67z"></path><circle cx="7" cy="14.78" r="0.67" fill="currentColor"></circle><circle cx="7" cy="9.22" r="0.67" fill="currentColor"></circle><circle cx="12" cy="6.44" r="0.67" fill="currentColor"></circle><circle cx="17" cy="9.22" r="0.67" fill="currentColor"></circle></svg>`;
  } else if (pageName.includes('blog')) {
    pageData.title = 'Αρθρογραφία';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 0 3-2 5"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 0 3-2 5"/></svg>`;

  // --- ΥΠΟΕΝΟΤΗΤΕΣ PROJECTS ---
  } else if (pageName.includes('retro-logos')) {
    pageData.title = 'Retro Logos';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 19 6.2 A 9.5 9.5 0 1 0 19 17.8 Q 15.5 14.8 13.2 12.8 Q 12.3 12 13.2 11.2 Q 15.5 9.2 19 6.2 Z" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="10.8" cy="7.1" r="0.8" fill="currentColor"/>
    </svg>`;
    pageData.subCategory = 'projects';

  // --- ΥΠΟΕΝΟΤΗΤΕΣ HOBBIES ---
  } else if (pageName.includes('music')) {
    pageData.title = 'Μουσική';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>`;
    pageData.subCategory = 'hobbies';
   } else if (pageName.includes('linux')) {
    pageData.title = 'Linux';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <g transform="translate(0, -0.9)"><polyline points="4 19 10 13 4 7"></polyline></g>
    <g transform="translate(0, -0.9)"><line x1="12" y1="19" x2="20" y2="19"></line></g>
    </svg>`;
    pageData.subCategory = 'hobbies';

  // --- ΥΠΟΕΝΟΤΗΤΑ BLOGPOST ---
  } else if (pageName.includes('post')) {
    pageData.title = 'Δημοσίευση';
    pageData.svg = `<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>`;
    pageData.subCategory = 'blog';
   }

  titleContainer.innerHTML = `${pageData.svg}<h1>${pageData.title}</h1>`;
}

function hideCurrentPageFromMenu() {
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1);

  let currentPageKey = '';
  if (pageName.includes('bio')) currentPageKey = 'bio';
  else if (pageName.includes('about')) currentPageKey = 'about';
  else if (pageName.includes('projects')) currentPageKey = 'projects';
  else if (pageName.includes('hobbies')) currentPageKey = 'hobbies';
  else if (pageName.includes('blog')) currentPageKey = 'blog';

  if (currentPageKey) {
    const currentMenuItem = document.querySelector(`.menu-item[data-page="${currentPageKey}"]`);
    if (currentMenuItem) {
      currentMenuItem.style.display = 'none';
    }
  }
}

function initThemeSwitcher() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  if (!themeToggle || !themeIcon) return;

  function updateThemeIcon(isLight) {
    if (isLight) {
      themeIcon.setAttribute('viewBox', '0 0 24 24');
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
      themeIcon.setAttribute('viewBox', '0 0 24 24');
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
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
}

// Dropdown μενού
function initNavDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  function setOpen(dd, state) {
    dd.classList.toggle('is-open', state);
    dd.querySelector('.dropdown-trigger').setAttribute('aria-expanded', state);
  }

  function closeAll() {
    dropdowns.forEach(dd => setOpen(dd, false));
  }

  dropdowns.forEach(dd => {
    dd.querySelector('.dropdown-trigger').addEventListener('click', function(e) {
      e.stopPropagation();
      const willOpen = !dd.classList.contains('is-open');
      closeAll();
      setOpen(dd, willOpen);
    });
  });

  document.querySelectorAll('.theme-toggle-btn, .ui-toggle-btn, .home-link').forEach(btn => {
    btn.addEventListener('mouseenter', closeAll);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) closeAll();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAll();
  });
}

// Ενιαίο tooltip
function initGlobalTooltip() {
  const tooltip = document.createElement('div');
  tooltip.className = 'global-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  document.body.appendChild(tooltip);

  const DELAY = 300;
  let timer = null;

  function hide() {
    clearTimeout(timer);
    tooltip.classList.remove('is-visible');
  }

  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function() {
      const dd = el.closest('.nav-dropdown');
      if (dd && dd.classList.contains('is-open')) return;

      clearTimeout(timer);
      timer = setTimeout(() => {
        tooltip.textContent = el.getAttribute('data-tooltip');
        const r = el.getBoundingClientRect();
        const half = tooltip.offsetWidth / 2;
        const x = Math.min(Math.max(r.left + r.width / 2, half + 8), window.innerWidth - half - 8);
        tooltip.style.left = x + 'px';
        tooltip.style.top = (r.bottom + 8) + 'px';
        tooltip.classList.add('is-visible');
      }, DELAY);
    });
    el.addEventListener('mouseleave', hide);
    el.addEventListener('click', hide);
  });

  window.addEventListener('scroll', hide, { passive: true });
}

// --- ΛΕΙΤΟΥΡΓΙΑ ΕΝΑΛΛΑΓΗΣ UI ΑΠΟ STANDARD ΣΕ ALTERNATIVE ΜΕ HASH ---
function initStandardUiToggle() {
  const uiToggleBtn = document.getElementById('uiToggle');
  if (!uiToggleBtn) return;

  uiToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();

    // 1. Βρίσκουμε ποια σελίδα είμαστε (π.χ. bio, about, projects, κλπ.)
    const path = window.location.pathname;
    let pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

    // Αν είμαστε σε υποσελίδα (π.χ. retro-logos.html), το γυρίζουμε στην κεντρική κατηγορία (projects)
    if (pageName === 'retro-logos') pageName = 'projects';
    if (pageName === 'linux' || pageName === 'music') pageName = 'hobbies';
    if (pageName === 'post') pageName = 'blog';

    // 2. Ορίζουμε στη LocalStorage ότι πηγαίνουμε σε Alternative UI mode
    localStorage.setItem('alternativeUI', 'true');

    // 3. Ανακατεύθυνση στο index.html με το αντίστοιχο hash section
    if (pageName && pageName !== 'index' && pageName !== '') {
      window.location.href = `index.html#${pageName}`;
    } else {
      window.location.href = 'index.html#home';
    }
  });
}
