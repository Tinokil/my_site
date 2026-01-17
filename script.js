document.addEventListener('DOMContentLoaded', function() {
    renderPortfolio('all');
    renderTestimonialsCarousel();
    setupEventListeners();
    setupScrollAnimation();
});

function setupEventListeners() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderPortfolio(e.target.dataset.filter);
        });
    });

    modalClose.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    let current = '';
    
    document.querySelectorAll('section, header').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

function renderPortfolio(filter = 'all') {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    if (filtered.length === 0) {
        portfolioGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--text-secondary);">Проектов нет</p>';
        return;
    }

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        const icon = getCategoryIcon(project.category);
        
        card.innerHTML = `
            <div class="portfolio-image">
                <i class="fas fa-${icon}"></i>
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

function getCategoryIcon(category) {
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
        api: 'Интеграции',
        iot: 'IoT Project'
    };
    return names[category] || category;
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const icon = getCategoryIcon(project.category);
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <div style="display: flex; align-items: start; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 3rem; color: var(--primary-light);">
                    <i class="fas fa-${icon}"></i>
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
                <h4 style="color: var(--text-primary); margin-bottom: 15px;">Технологии:</h4>
                <div class="portfolio-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
            
            <div style="margin-top: 30px; display: flex; gap: 15px;">
                <a href="#contact" class="btn btn-primary" onclick="closeModal(document.getElementById('projectModal'))">
                    <i class="fas fa-envelope"></i> Обсудить проект
                </a>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    track.innerHTML = '';

    if (testimonials.length === 0) {
        track.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 40px; grid-column: 1 / -1;">Отзывы скоро появятся</div>';
        return;
    }

    const allTestimonials = [...testimonials, ...testimonials];

    allTestimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        card.innerHTML = `
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
        `;
        
        track.appendChild(card);
    });

    let position = 0;
    const cardWidth = 320 + 30;
    const visibleCards = window.innerWidth > 768 ? 3 : 1;
    const maxScroll = testimonials.length * cardWidth;

    function scrollCarousel() {
        position -= 2;
        if (position <= -maxScroll) {
            position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
    }

    setInterval(scrollCarousel, 30);
    track.style.transition = 'none';
}

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal.classList.contains('active')) {
            closeModal(modal);
        }
    }
});