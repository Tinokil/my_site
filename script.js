// ===== PORTFOLIO DATA =====

const portfolioProjects = [
    {
        id: 1,
        title: 'Магазин в Telegram',
        category: 'bots',
        description: 'Полноценный магазин с интеграцией Google Sheets, карзиной и системой отравки.',
        tech: ['aiogram', 'Google Sheets API', 'asyncio', 'PostgreSQL'],
        fullDescription: 'Реализан полнофункциональный магазин в Telegram с возможностями:\n\n✔ Каталог товаров\n✔ Оформление заказов\n✔ Личные кабинеты\n✔ Интеграция с Google Sheets\n✔ Кеширование данных через Redis'
    },
    {
        id: 2,
        title: 'Бот с AI сомъетником',
        category: 'bots',
        description: 'Бот для общения с neuroseti через OpenAI API и Claude.',
        tech: ['aiogram', 'OpenAI API', 'Claude API', 'Redis', 'PostgreSQL'],
        fullDescription: 'Бот для интерактивного общения с мощными нейросетями:\n\n✔ Поддержка OpenAI и Claude\n✔ Получение истории диалогов\n✔ Кеширование ответов\n✔ Могучие system prompts'
    },
    {
        id: 3,
        title: 'Парсер Ozon',
        category: 'api',
        description: 'Грабер данных с Ozon с аналитикой и REST API.',
        tech: ['Python', 'BeautifulSoup', 'Selenium', 'FastAPI', 'PostgreSQL'],
        fullDescription: 'Надежный парсер данных с Ozon:\n\n✔ Парсинг товаров и рецензий\n✔ Мониторинг цен\n✔ REST API для быстрого акцесса'
    },
    {
        id: 4,
        title: 'Квест-бот с Mini App',
        category: 'bots',
        description: 'Интерактивный квест с бонусами и интеграцией аокассы.',
        tech: ['aiogram', 'Mini App', 'YooKassa', 'React', 'MongoDB'],
        fullDescription: 'Поведальная игра для новом онаю серию книг:\n\n✔ Interactive Mini App\n✔ Оплата через YooKassa\n✔ Лидерборд с результатами\n✔ Ашивывание бонусов'
    },
    {
        id: 5,
        title: 'Система мониторинга IoT',
        category: 'iot',
        description: 'Веб-дашборд для мониторинга сенсоров эко температуры, влажности.',
        tech: ['ESP32', 'MicroPython', 'Flask', 'Chart.js', 'PostgreSQL'],
        fullDescription: 'Полная система мониторинга дома:\n\n✔ Много сенсоров\n✔ Веб-дашборд в режиме реал-тайм\n✔ История данных\n✔ Нуба\n✔ Alerts на Telegram'
    },
    {
        id: 6,
        title: 'REST API для соцнети',
        category: 'api',
        description: 'Полноценный Backend API для социальной сети с автонтификацией.',
        tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'WebSockets'],
        fullDescription: 'Современный рестфул API:\n\n✔ JWT автонтификация\n✔ WebSockets для реал-тайм\n✔ Pagination и Filtering\n✔ Rate Limiting\n✔ OpenAPI документация'
    }
];

const testimonials = [
    {
        stars: 5,
        text: 'Задача состояла в разработке telegram бота высокой сложности, специалист с ней справился на 100%, рекомендую к сотрудничеству.',
        author: 'Ivan S.',
        role: 'Генеральный директор'
    },
    {
        stars: 5,
        text: 'Всё выполняется быстро и очень качественно. Задачи закрываются в срок, доработки вносятся оперативно!',
        author: 'Maria K.',
        role: 'Product Manager'
    },
    {
        stars: 5,
        text: 'Делал два заказа подряд, сам в телеграмм ботах мало что понимаю, тем более об их инсталлации на сервер. Огромное спасибо!',
        author: 'Peter N.',
        role: 'Entrepreneur'
    }
];

// ===== DOM ELEMENTS =====

const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const portfolioGrid = document.getElementById('portfolioGrid');
const testimonialsList = document.getElementById('testimonialsList');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    renderPortfolio('all');
    renderTestimonials();
    setupEventListeners();
    setupScrollAnimation();
});

// ===== EVENT LISTENERS =====

function setupEventListeners() {
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Portfolio filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);

    // Scroll events
    window.addEventListener('scroll', updateActiveNav);
}

// ===== NAVIGATION =====

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function handleNavClick(e) {
    const href = this.getAttribute('href');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

function updateActiveNav() {
    let current = '';
    
    document.querySelectorAll('section, header').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// ===== PORTFOLIO =====

function renderPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? portfolioProjects 
        : portfolioProjects.filter(p => p.category === filter);

    filtered.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <div class="portfolio-image">
                <i class="fas fa-${getIcon(project.category)}"></i>
            </div>
            <div class="portfolio-content">
                <span class="portfolio-category">${getCategoryName(project.category)}</span>
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openModal(project));
        portfolioGrid.appendChild(card);
    });
}

function handleFilterClick(e) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderPortfolio(e.target.dataset.filter);
}

function getIcon(category) {
    const icons = {
        bots: 'robot',
        api: 'code',
        iot: 'microchip'
    };
    return icons[category] || 'star';
}

function getCategoryName(category) {
    const names = {
        bots: 'Telegram Bot',
        api: 'REST API',
        iot: 'IoT Project'
    };
    return names[category] || category;
}

// ===== MODAL =====

function openModal(project) {
    modalBody.innerHTML = `
        <div class="modal-project">
            <div style="display: flex; align-items: start; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 3rem; color: var(--primary-light);">
                    <i class="fas fa-${getIcon(project.category)}"></i>
                </div>
                <div style="flex: 1;">
                    <span class="portfolio-category" style="display: inline-block; margin-bottom: 10px;">
                        ${getCategoryName(project.category)}
                    </span>
                    <h2 style="color: var(--text-primary); margin-bottom: 10px;">${project.title}</h2>
                    <p style="color: var(--text-secondary); line-height: 1.6;">${project.fullDescription}</p>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(99, 102, 241, 0.2);">
                <h4 style="color: var(--text-primary); margin-bottom: 15px;">Technology Stack:</h4>
                <div class="portfolio-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
            
            <div style="margin-top: 30px; display: flex; gap: 15px;">
                <a href="#contact" class="btn btn-primary" onclick="closeModal()">
                    <i class="fas fa-envelope"></i> Обсудить проект
                </a>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// ===== TESTIMONIALS =====

function renderTestimonials() {
    testimonialsList.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-stars">
                ${'<i class="fas fa-star"></i>'.repeat(testimonial.stars)}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    ${testimonial.author.charAt(0)}
                </div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== CONTACT FORM =====

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        project: formData.get('project')
    };
    
    // Create mailto link
    const mailtoLink = `mailto:contact@tinokil.dev?subject=Новый пороект&body=От ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0A%0AОписание:%0A${encodeURIComponent(data.project)}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    const originalBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = originalBtn.innerHTML;
    
    originalBtn.innerHTML = '<i class="fas fa-check"></i> Мессаж отправлен!';
    originalBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-light))';
    
    setTimeout(() => {
        originalBtn.innerHTML = originalText;
        originalBtn.style.background = '';
        contactForm.reset();
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====

function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-card, .testimonial-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PARTICLES ANIMATION (Optional Enhancement) =====

function createParticles() {
    const header = document.querySelector('.hero');
    if (!header) return;
    
    // This is already done with CSS animations, but you can add more interactivity here
    console.log('Particles initialized');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Prevent body scroll when modal is open
function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

const originalOpen = openModal;
openModal = function(project) {
    originalOpen(project);
    toggleBodyScroll(true);
};

const originalClose = closeModal;
closeModal = function() {
    originalClose();
    toggleBodyScroll(false);
};

console.log('%c🚀 Tinokil Portfolio loaded!', 'color: #10B981; font-size: 16px; font-weight: bold;');
console.log('%cContact: https://t.me/tinokil_bot', 'color: #6366F1; font-size: 12px;');