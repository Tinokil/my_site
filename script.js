(function() {
  const tabs = document.querySelectorAll('.nav-btn');
  const panes = {
    home: document.getElementById('homePane'),
    about: document.getElementById('aboutPane'),
    projects: document.getElementById('projectsPane'),
    reviews: document.getElementById('reviewsPane'),
    contact: document.getElementById('contactPane')
  };

  let currentFilter = 'all';
  let reviewIndex = 0;
  let autoInterval;

  function activateTab(tabId) {
    Object.values(panes).forEach(pane => pane.classList.remove('active-pane'));
    panes[tabId].classList.add('active-pane');
    tabs.forEach(btn => {
      if(btn.dataset.tab === tabId) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    if(tabId === 'projects') renderProjects(currentFilter);
    if(tabId === 'reviews') initReviewSlider();
    if(tabId === 'home') renderHomeProjects();
    localStorage.setItem('lastTab', tabId);
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      activateTab(tabId);
      document.getElementById('navLinks')?.classList.remove('mobile-open');
    });
  });

  const menuBtn = document.getElementById('mobileMenuBtn');
  const navDiv = document.getElementById('navLinks');
  if(menuBtn) {
    menuBtn.addEventListener('click', () => {
      navDiv.classList.toggle('mobile-open');
    });
  }

  function renderProjects(filter) {
    const container = document.getElementById('projectsGridContainer');
    if(!container) return;
    let filtered = window.projectsData.filter(p => filter === 'all' ? true : p.category === filter);
    container.innerHTML = filtered.map(proj => `
      <div class="project-card" data-id="${proj.id}">
        <span class="project-tag">${proj.tag}</span>
        <h3 style="margin: 14px 0 8px;">${proj.title}</h3>
        <p style="color: var(--text-muted);">${proj.description}</p>
        <div class="tech-stack">${proj.tech.slice(0,3).map(t => `<span>${t}</span>`).join('')}${proj.tech.length > 3 ? `<span>+${proj.tech.length-3}</span>` : ''}</div>
        <span style="color: var(--purple-base); font-weight:600;">Подробнее →</span>
      </div>
    `).join('');
    attachProjectCardEvents();
  }

  function renderHomeProjects() {
    const container = document.getElementById('homeProjectsGrid');
    if(!container) return;
    const latest = window.projectsData.slice(0, 3);
    container.innerHTML = latest.map(proj => `
      <div class="project-card" data-id="${proj.id}">
        <span class="project-tag">${proj.tag}</span>
        <h3 style="margin: 14px 0 8px;">${proj.title}</h3>
        <p style="color: var(--text-muted);">${proj.description}</p>
        <div class="tech-stack">${proj.tech.slice(0,3).map(t => `<span>${t}</span>`).join('')}${proj.tech.length > 3 ? `<span>+${proj.tech.length-3}</span>` : ''}</div>
        <span style="color: var(--purple-base); font-weight:600;">Подробнее →</span>
      </div>
    `).join('');
    attachProjectCardEvents();
  }

  function attachProjectCardEvents() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(card.dataset.id);
        const project = window.projectsData.find(p => p.id === id);
        if(project) openProjectModal(project);
      });
    });
  }

  function openProjectModal(project) {
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-overlay';
    modalDiv.innerHTML = `
      <div class="modal-content">
        <button class="close-modal">&times;</button>
        <span class="project-tag">${project.tag}</span>
        <h2 style="margin: 16px 0 12px;">${project.title}</h2>
        <p>${project.fullDescription}</p>
        <div class="tech-stack" style="margin: 20px 0;">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <a href="https://t.me/maaks11" target="_blank" class="btn btn-primary" style="display:inline-block;">Обсудить проект</a>
      </div>
    `;
    document.body.appendChild(modalDiv);
    document.body.style.overflow = 'hidden';
    modalDiv.querySelector('.close-modal').addEventListener('click', () => {
      modalDiv.remove();
      document.body.style.overflow = '';
    });
    modalDiv.addEventListener('click', (e) => {
      if(e.target === modalDiv) {
        modalDiv.remove();
        document.body.style.overflow = '';
      }
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      const activePane = document.querySelector('.tab-pane.active-pane');
      if(activePane && activePane.id === 'projectsPane') renderProjects(currentFilter);
    });
  });

  function initReviewSlider() {
    if(!window.testimonialsData || window.testimonialsData.length === 0) return;
    const reviewText = document.getElementById('reviewText');
    const reviewAuthor = document.getElementById('reviewAuthor');
    const dotsContainer = document.getElementById('reviewDots');
    if(!reviewText) return;

    function updateReviewUI() {
      const rev = window.testimonialsData[reviewIndex];
      reviewText.innerText = `«${rev.text}»`;
      reviewAuthor.innerText = rev.author;
      if(dotsContainer) {
        dotsContainer.innerHTML = '';
        window.testimonialsData.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if(idx === reviewIndex) dot.classList.add('active-dot');
          dot.addEventListener('click', () => {
            reviewIndex = idx;
            updateReviewUI();
            resetAutoSlide();
          });
          dotsContainer.appendChild(dot);
        });
      }
    }

    function resetAutoSlide() {
      if(autoInterval) clearInterval(autoInterval);
      autoInterval = setInterval(() => {
        reviewIndex = (reviewIndex + 1) % window.testimonialsData.length;
        updateReviewUI();
      }, 6500);
    }

    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    if(prevBtn) prevBtn.onclick = () => { reviewIndex = (reviewIndex - 1 + window.testimonialsData.length) % window.testimonialsData.length; updateReviewUI(); resetAutoSlide(); };
    if(nextBtn) nextBtn.onclick = () => { reviewIndex = (reviewIndex + 1) % window.testimonialsData.length; updateReviewUI(); resetAutoSlide(); };
    updateReviewUI();
    resetAutoSlide();
  }

  const toProjectsBtn = document.getElementById('toProjectsBtn');
  if(toProjectsBtn) {
    toProjectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab('projects');
    });
  }

  const homeToProjectsBtn = document.getElementById('homeToProjectsBtn');
  if(homeToProjectsBtn) {
    homeToProjectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab('projects');
    });
  }

  renderHomeProjects();
  renderProjects('all');
  initReviewSlider();

  const savedTab = localStorage.getItem('lastTab');
  if(savedTab && panes[savedTab]) activateTab(savedTab);
  else activateTab('home');

  window.addEventListener('beforeunload', () => {
    if(autoInterval) clearInterval(autoInterval);
  });
})();
