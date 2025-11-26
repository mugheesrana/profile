// Advanced Portfolio JavaScript with Dark Theme Support
// Muhammad Mughees Portfolio - Interactive Features

class PortfolioManager {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initAnimations();
        this.initTheme();
        this.handleLoading();
    }

    // Initialize all components
    init() {
        this.navbar = document.querySelector('.navbar');
        this.navMenu = document.querySelector('.nav-menu');
        this.hamburger = document.querySelector('.hamburger');
        this.themeToggle = document.getElementById('theme-toggle');
        this.loadingScreen = document.getElementById('loading-screen');
        this.typewriter = document.querySelector('.typewriter');
        this.dynamicTitle = document.getElementById('dynamic-title');
        this.contactForm = document.getElementById('contactForm');

        // Animation observers
        this.observedElements = new Set();
        this.setupIntersectionObserver();

        // Project filtering
        this.initProjectFiltering();
        
        // Modal management
        this.initModals();
    }

    // Handle loading screen
    handleLoading() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loadingScreen.classList.add('hidden');
                this.startHeroAnimations();
            }, 2500);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        this.navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                this.closeMobileMenu();
            }
        });

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveNavLink();
        });

        // Contact form
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    // Mobile menu toggle
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Theme management
    initTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Scroll handling
    handleScroll() {
        const scrolled = window.pageYOffset > 50;
        this.navbar.classList.toggle('scrolled', scrolled);
    }

    // Update active navigation link
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling
    handleSmoothScroll(e) {
        e.preventDefault();
        
        // Get the target element, handle both direct clicks and clicks on child elements
        let targetHref = e.target.getAttribute('href');
        if (!targetHref && e.target.closest('a[href^="#"]')) {
            targetHref = e.target.closest('a[href^="#"]').getAttribute('href');
        }
        
        if (targetHref && targetHref.startsWith('#')) {
            const target = document.querySelector(targetHref);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                this.closeMobileMenu();
            }
        }
    }

    // Keyboard navigation
    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            this.closeMobileMenu();
            this.closeModal();
        }
    }

    // Handle window resize
    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // Initialize animations
    initAnimations() {
        this.startTypewriterEffect();
        this.startDynamicTitleRotation();
        this.initSkillBars();
        this.initCounterAnimation();
    }

    // Start hero animations after loading
    startHeroAnimations() {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease-out forwards';
        }
        
        if (heroImage) {
            heroImage.style.animation = 'fadeInRight 1s ease-out 0.3s forwards';
        }
    }

    // Typewriter effect for name
    startTypewriterEffect() {
        const text = this.typewriter.getAttribute('data-text') || 'Muhammad Mughees';
        let index = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentText = isDeleting 
                ? text.substring(0, index - 1) 
                : text.substring(0, index + 1);
            
            this.typewriter.textContent = currentText;

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && index === text.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                speed = 500;
            }

            index = isDeleting ? index - 1 : index + 1;
            setTimeout(type, speed);
        };

        // Start typing after a delay
        setTimeout(type, 1000);
    }

    // Dynamic title rotation
    startDynamicTitleRotation() {
        const titles = [
            'Laravel Developer',
            'Full Stack Developer',
            'API Specialist',
            'Payment Integration Expert',
            'Web Solutions Architect'
        ];

        let currentIndex = 0;
        const rotateTitle = () => {
            this.dynamicTitle.style.opacity = '0';
            
            setTimeout(() => {
                this.dynamicTitle.textContent = titles[currentIndex];
                this.dynamicTitle.style.opacity = '1';
                currentIndex = (currentIndex + 1) % titles.length;
            }, 300);
        };

        // Start after initial load
        setTimeout(() => {
            rotateTitle();
            setInterval(rotateTitle, 3000);
        }, 2000);
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                    this.observedElements.add(entry.target);
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            this.observer.observe(section);
        });

        // Observe specific elements
        document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card').forEach(el => {
            this.observer.observe(el);
        });
    }

    // Trigger animations based on element type
    triggerAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';

        if (element.classList.contains('skills')) {
            this.animateSkillBars();
        }
        
        if (element.classList.contains('about')) {
            this.animateCounters();
        }

        if (element.classList.contains('skill-category')) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }

        if (element.classList.contains('project-card')) {
            const delay = Array.from(element.parentNode.children).indexOf(element) * 0.1;
            element.style.animation = `fadeInUp 0.6s ease-out ${delay}s forwards`;
        }

        if (element.classList.contains('timeline-item')) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }

        if (element.classList.contains('cert-card')) {
            const delay = Array.from(element.parentNode.children).indexOf(element) * 0.2;
            element.style.animation = `fadeInUp 0.6s ease-out ${delay}s forwards`;
        }
    }

    // Initialize skill bars
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    // Animate skill bars
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            }, index * 100);
        });
    }

    // Initialize counter animation
    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
        });
    }

    // Animate counters
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
        });
    }

    // Project filtering
    initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects (support multiple categories per card)
                projectCards.forEach(card => {
                    const categoryAttr = card.getAttribute('data-category') || '';
                    const categories = categoryAttr.split(/\s+/).filter(Boolean);
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Contact form handling
    async handleContactForm(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('.btn-submit');
        const formData = new FormData(e.target);
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(formData);
            
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
            
        } catch (error) {
            this.showNotification('Error sending message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Simulate form submission
    simulateFormSubmission(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            minWidth: '300px',
            maxWidth: '400px',
            background: type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)',
            color: 'white',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-large)',
            zIndex: '10001',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        });

        document.body.appendChild(notification);

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.closeNotification(notification));

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            this.closeNotification(notification);
        }, 5000);
    }

    closeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Modal management
    initModals() {
        this.projectModal = document.getElementById('projectModal');
        this.galleryModal = document.getElementById('galleryModal');
        
        // Close modals when clicking outside
        [this.projectModal, this.galleryModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
    }

    closeModal() {
        if (this.projectModal.classList.contains('active')) {
            this.projectModal.classList.remove('active');
        }
        if (this.galleryModal.classList.contains('active')) {
            this.galleryModal.classList.remove('active');
        }
    }
}

const projectsData = [

    
    {
        id: 'altair1',
        categories: ['ecommerce', 'payment', 'dashboard'],
        type: 'E-commerce Platform',
        title: 'Altair Innovation - Automotive Parts',
        shortDescription: 'Comprehensive automotive e-commerce platform specializing in air suspensions, wheels, and car parts with integrated Stripe payments, admin dashboard, and inventory management system.',
        status: 'live',
        liveUrl: null,
        thumbnail: 'assets/projects/altair-landing.png',
        description: 'Comprehensive automotive e-commerce platform specializing in air suspensions, wheels, and car parts. Features integrated Stripe payments, comprehensive admin dashboard, and advanced inventory management system for automotive enthusiasts.',
        features: [
            'Automotive parts catalog with detailed specifications',
            'Stripe payment integration for secure transactions',
            'Comprehensive admin dashboard for inventory management',
            'Order management system with tracking',
            'Product categorization (Air Suspensions, Wheels, etc.)',
            'User account management and order history',
            'Responsive design for mobile and desktop',
            'Settings panel for Stripe API key management',
            'Real-time inventory updates',
            'Shopping cart with AJAX functionality',
            'Customer notification system',
            'Advanced search and filtering options'
        ],
        technologies: ['Laravel 10', 'JavaScript ES6', 'AJAX', 'Stripe API', 'MySQL 8', 'Bootstrap 5', 'jQuery', 'PHP 8+'],
        imagesBasePath: 'assets/projects/altair/',
        images: [
            'altair-landing.png',
            'altair-shop.png',
            'altair-list.png',
            'altair-dashboard.png',
            'altair-table.png',
            'altair-model.png',
            'altair-add.png',
            'altair-settings.png',
            'altair-checkout.png',
            'altair-login.png',
            'altair-footer.png',
            'altair-med.png'
        ]
    },
    {
        id: 'olx1',
        categories: ['ecommerce', 'dashboard', 'api', 'frontend'],
        type: 'Full-Stack Web Application',
        title: 'Dynamic Car Marketplace',
        shortDescription: 'Complete OLX-style platform with car listings, dealer management, dynamic admin panel, and fully customizable website content.',
        status: 'live',
        liveUrl: null,
        thumbnail: 'assets/projects/olx/home.png',
        description: 'A complete OLX-style platform built with Laravel featuring car listings, dealer management, powerful admin dashboard, universal filters, location-based search, and dynamic website customization.',
        features: [
            'Dynamic admin panel for full system control',
            'Manage cars, brands, and models',
            'CMS for blogs and content pages',
            'Dealer and user management system',
            'Universal filters and car search',
            'Interactive dashboard with charts'
        ],
        technologies: ['Laravel', 'MySQL', 'Bootstrap', 'jQuery', 'AJAX', 'Chart.js'],
        imagesBasePath: 'assets/projects/olx/',
        images: [
            'short.png',
            'home-list.png',
            'home.png',
            'detail-car.png',
            'cars-filter.png',
            'blog-det.png',
            'dashboard.png',
            'blog-edit.png',
            'brands.png',
            'cars.png',
            'cars-edit.png',
            'gsetting.png',
            'setting.png',
            'footer.png'
        ]
    },
    {
        id: 'profastchemicals1',
        categories: ['ecommerce', 'dashboard', 'api', 'frontend'],
        type: 'Corporate Management Platform',
        title: 'Profastchemicals – Pesticide Company Management',
        shortDescription: 'Corporate management platform with public company profile, product catalog, contact management, and admin dashboard for dynamic content.',
        status: 'live',
        liveUrl: null,
        thumbnail: 'assets/projects/profastchemicals/profastchemicals.com.png',
        description: 'Complete corporate management platform for a pesticide manufacturing company, featuring a public company profile with product catalog, contact information, and a robust admin dashboard to manage products, customer queries, CMS pages, and website content dynamically.',
        features: [
            'Company profile management with dynamic content updates',
            'Product catalog with advanced search and filtering options',
            'Customer queries and contact management system',
            'CMS pages and content sections management',
            'Admin dashboard with comprehensive analytics',
            'Dynamic website content management',
            'User-friendly admin panel for non-technical staff',
            'Responsive design for all devices',
            'SEO optimized pages and content',
            'Secure authentication and authorization system',
            'Email notifications and alerts',
            'Data export and reporting functionality'
        ],
        technologies: ['Laravel 10', 'MySQL 8', 'Blade Templates', 'Bootstrap 5', 'jQuery', 'AJAX', 'PHP 8+', 'HTML5/CSS3'],
        imagesBasePath: 'assets/projects/profastchemicals/',
        images: [
            'profastchemicals.com.png',
            'profastchemicals.com_about-us.png',
            'profastchemicals.com_contact.png',
            'profastchemicals.com_userServices.png'
        ]
    },
    {
        id: 'yachtbooking1',
        categories: ['ecommerce', 'payment', 'dashboard', 'api'],
        type: 'Luxury Yacht Booking Platform',
        title: 'Yacht Booking & Management System',
        shortDescription: 'Dynamic yacht booking platform with real-time availability, payment integration, and comprehensive admin/dashboard panels.',
        status: 'live',
        liveUrl: null,
        thumbnail: 'assets/projects/yachtbooking/yachts.png',
        description: 'A fully dynamic yacht booking platform allowing customers to book yachts, catering, and additional services for leisure trips. Includes a comprehensive admin dashboard to manage yachts, categories, amenities, services, payments, reports, and CMS pages, plus a complete booker dashboard.',
        features: [
            'Dynamic yacht booking system with real-time availability',
            'Comprehensive yacht management with categories and amenities',
            'Integrated catering and additional services booking',
            'Stripe payment integration for secure transactions',
            'Advanced admin dashboard with all management features',
            'Complete booker panel with booking history',
            'Payment gateway management and settings',
            'Dynamic CMS and page builder functionality',
            'Detailed reports and analytics system',
            'Frontend page sections management',
            'General settings and SMTP configuration',
            'Invoice generation and payment tracking',
            'User management and role-based permissions',
            'Responsive design for all devices',
            'Real-time notification system',
            'Advanced search and filtering options'
        ],
        technologies: ['Laravel 10', 'MySQL 8', 'Bootstrap 5', 'Stripe API', 'JavaScript ES6', 'Dynamic CMS', 'Payment Integration', 'PHP 8+'],
        imagesBasePath: 'assets/projects/yachtbooking/',
        images: [
            'yachts.png',
            'adminlightdashboard.png',
            'admindashboarddark.png',
            'admindashbaordcards.png',
            'userdashboard.png',
            'yachtdetails.png',
            'userbookingonfo.png',
            'userpayment.png',
            'adminpaymetnmethod.png',
            'adminbookingrpt.png',
            'adminmanagepages.png',
            'adminmenuetabl.png',
            'menucards.png',
            'gallery.png',
            'pagesection.png',
            'setting.png',
            'contact.png'
        ]
    },
    {
        id: 'beautyhub1',
        categories: ['ecommerce', 'payment', 'dashboard'],
        type: 'E-Commerce & POS System',
        title: 'BeautyHub Store & POS Management',
        shortDescription: 'End-to-end e-commerce and POS system for beauty stores with products, subscriptions, CMS, and reports.',
        status: 'live',
        liveUrl: null,
        thumbnail: 'assets/projects/beautyhub/beautyhub.cslancer.com_.png',
        description: 'An end-to-end e-commerce platform and POS system for beauty stores. Includes product, category, and subscription management, integrated payment gateways, and dynamic CMS modules such as FAQs, banners, and pages. Admin dashboard handles sales, stock, customers, and reports efficiently.',
        features: [
            'Complete e-commerce platform for beauty products',
            'Integrated Point of Sale (POS) system',
            'Product and category management with variants',
            'Multiple payment gateways (Stripe, PayPal, KMoney)',
            'Subscription management system',
            'Dynamic CMS with FAQs, banners, and pages',
            'Comprehensive admin dashboard',
            'Sales and stock management',
            'Customer management and profiles',
            'Advanced reporting and analytics',
            'Inventory tracking and alerts',
            'Order management and processing',
            'User roles and permissions',
            'Responsive design for all devices',
            'Real-time notifications',
            'SEO-optimized product pages'
        ],
        technologies: ['Laravel 10', 'MySQL 8', 'Stripe API', 'jQuery', 'AJAX', 'Bootstrap 5', 'Payment Integration', 'CMS', 'PHP 8+'],
        imagesBasePath: 'assets/projects/beautyhub/',
        images: [
            'beautyhub.cslancer.com_.png',
            'beautyhub.cslancer.com_admin_dashboard.png',
            'beautyhub.cslancer.com_admin_team.png',
            'beautyhub.cslancer.com_shop.png',
            'beautyhub.cslancer.com_product-details_5.png',
            'beautyhub.cslancer.com_product-cart.png',
            'prods.png',
            'cat.png',
            'inventory.png',
            'orsers.png',
            'membership.png',
            'drfaq.png'
        ]
    },
    {
        id: 'jsc1',
        categories: ['dashboard', 'api', 'frontend'],
        type: 'Multi-Platform Sports Management',
        title: 'Sports Community & Tournament Management',
        shortDescription: 'Multi-platform sports community solution with player registration, tournament management, and React/Flutter clients.',
        status: 'live',
        liveUrl: null,
        thumbnail: 'assets/projects/jsc/home.png',
        description: 'A comprehensive multi-platform sports community solution where players register for games and tournaments, coaches manage teams, and admins oversee the complete sports ecosystem. Includes React admin dashboard and Flutter mobile app powered by Laravel REST APIs.',
        features: [
            'Multi-platform sports community management (Laravel + React + Flutter)',
            'Player registration system for games and tournaments',
            'Team management and coach assignment functionality',
            'Tournament creation, management, and scheduling system',
            'Comprehensive React admin dashboard for complete control',
            'Flutter mobile app for players, coaches, and umpires',
            'Laravel REST API backend with JWT authentication',
            'Player statistics tracking and performance analytics',
            'Media management and gallery system for match photos/videos',
            'Real-time notifications across all platforms',
            'Ground booking and timetable management',
            'Match scheduling and automated fixture generation',
            'Role-based access control (Admin, Coach, Player, Umpire)',
            'Live match scoring and result management',
            'Tournament brackets and leaderboard system',
            'App banner and content management system',
            'Advanced reporting and analytics dashboard',
            'Real-time sync between mobile app and web dashboard'
        ],
        technologies: ['Laravel 10', 'React.js 18', 'Flutter 3.0', 'MySQL 8', 'JWT Auth', 'REST API', 'Redux', 'Material-UI', 'Dart', 'PHP 8+'],
        imagesBasePath: 'assets/projects/jsc/',
        images: [
            'home.png',
            'dashbaordtbls.png',
            'gamesmanage.png',
            'gallerycards.png',
            'ordermodel.png'
        ]
    }
];

function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(project => {
        const categoriesAttr = (project.categories || []).join(' ');
        const features = (project.features || []).slice(0, 6);
        const tech = (project.technologies || []).slice(0, 6);
        const statusClass = project.status === 'live' ? 'status-live' : 'status-private';
        const statusLabel = project.status === 'live' ? 'Live' : 'Private';

        return `
            <div class="project-card" data-category="${categoriesAttr}">
                <div class="project-image">
                    <div class="project-gallery">
                        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <button class="gallery-btn" onclick="openGallery('${project.id}')">
                                <i class="fas fa-images"></i>
                                View Gallery
                            </button>
                        </div>
                    </div>
                    <div class="project-status">
                        <span class="${statusClass}">${statusLabel}</span>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-category">${project.type}</div>
                    <h3>${project.title}</h3>
                    <p>${project.shortDescription}</p>
                    <div class="project-features">
                        ${features.map(f => `<span><i class=\"fas fa-check\"></i> ${f}</span>`).join('')}
                    </div>
                    <div class="project-tech">
                        ${tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <button class="project-link" data-tooltip="View Details" onclick="openProjectModal('${project.id}')">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        ${project.liveUrl ? `
                        <a class="project-link" href="${project.liveUrl}" target="_blank" rel="noopener" data-tooltip="View Live Project">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Project modal functions (called from HTML)
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <p class="project-description">${project.description}</p>
            
            <h4>Key Features:</h4>
            <ul class="feature-list">
                ${(project.features || []).map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h4>Technologies Used:</h4>
            <div class="tech-tags">
                ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ${project.liveUrl ? `
            <h4>Live Demo:</h4>
            <p><a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">View Live Project</a></p>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
}

// Gallery slider global variables
let currentSlideIndex = 0;
let galleryImages = [];

// Gallery modal functions
function openGallery(projectId) {
    const modal = document.getElementById('galleryModal');
    const galleryContainer = document.getElementById('galleryContainer');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const galleryDots = document.getElementById('galleryDots');
    const project = projectsData.find(p => p.id === projectId);
    const basePath = project && project.imagesBasePath ? project.imagesBasePath : '';
    const imageFiles = project && Array.isArray(project.images) ? project.images : [];

    galleryImages = imageFiles.map(file => ({
        src: `${basePath}${file}`,
        alt: project ? project.title : 'Project Gallery'
    }));
    currentSlideIndex = 0;
    
    if (galleryImages.length === 0) return;
    
    // Update counter
    currentSlideSpan.textContent = '1';
    totalSlidesSpan.textContent = galleryImages.length.toString();
    
    // Create slides
    galleryContainer.innerHTML = galleryImages.map((image, index) => 
        `<div class="gallery-slide">
            <img src="${image.src}" alt="${image.alt}" loading="${index === 0 ? 'eager' : 'lazy'}">
        </div>`
    ).join('');
    
    // Create dots
    galleryDots.innerHTML = galleryImages.map((_, index) => 
        `<button class="gallery-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>`
    ).join('');
    
    // Show modal
    modal.classList.add('active');
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleGalleryKeyboard);
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.removeEventListener('keydown', handleGalleryKeyboard);
}

function nextSlide() {
    if (currentSlideIndex < galleryImages.length - 1) {
        currentSlideIndex++;
    } else {
        currentSlideIndex = 0; // Loop to first slide
    }
    updateSliderPosition();
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
    } else {
        currentSlideIndex = galleryImages.length - 1; // Loop to last slide
    }
    updateSliderPosition();
}

function goToSlide(index) {
    if (index >= 0 && index < galleryImages.length) {
        currentSlideIndex = index;
        updateSliderPosition();
    }
}

function updateSliderPosition() {
    const galleryContainer = document.getElementById('galleryContainer');
    const currentSlideSpan = document.getElementById('currentSlide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    // Update slider position
    const translateX = -currentSlideIndex * 100;
    galleryContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update counter
    currentSlideSpan.textContent = (currentSlideIndex + 1).toString();
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

function handleGalleryKeyboard(e) {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
        case 'Escape':
            e.preventDefault();
            closeGallery();
            break;
    }
}

function getProjectTitle(projectId) {
    const titles = {
        'altair1': 'Altair Innovation - Car Parts E-commerce',
        'profastchemicals1': 'AgroChem - Pesticide Company Management',
        'yachtbooking1': 'Yacht Booking & Management System',
        'beautyhub1': 'BeautyHub Store & POS Management System',
        'jsc1': 'Sports Community & Tournament Management Platform'
    };
    return titles[projectId] || 'Project Gallery';
}

// Scroll to contact function
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add CSS for notifications
const notificationStyles = `
    .notification {
        font-family: var(--font-primary);
        font-size: 0.9rem;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow-large);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: currentColor;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .project-modal-content {
        max-width: 600px;
    }
    
    .project-description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        color: var(--text-secondary);
    }
    
    .feature-list {
        list-style: none;
        margin-bottom: 2rem;
    }
    
    .feature-list li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-secondary);
    }
    
    .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--success-color);
        font-weight: bold;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .tech-tag {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 50px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .project-modal-content h4 {
        color: var(--primary-color);
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize portfolio manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    window.portfolioManager = new PortfolioManager();
    
    // Add some CSS for initial state of animated elements
    const initialStyles = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .skill-category,
        .project-card,
        .timeline-item,
        .cert-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .typing-cursor::after {
            content: '';
            animation: none;
        }
    `;
    
    const animationStyleSheet = document.createElement('style');
    animationStyleSheet.textContent = initialStyles;
    document.head.appendChild(animationStyleSheet);
    
    // WhatsApp Popup Widget
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const whatsappPopup = document.querySelector('.whatsapp-popup');
    const whatsappClose = document.querySelector('.whatsapp-close');
    
    if (whatsappFloat && whatsappPopup) {
        let popupTimer;
        let isPopupOpen = false;
        let autoShowCount = 0;
        const maxAutoShows = 3; // Limit auto-shows to avoid being annoying
        
        // Show popup automatically every 5 seconds (but only if not already open)
        function showPopupAuto() {
            if (!isPopupOpen && autoShowCount < maxAutoShows) {
                whatsappPopup.classList.add('show');
                isPopupOpen = true;
                autoShowCount++;
                
                // Auto hide after 5 seconds if user doesn't interact
                setTimeout(() => {
                    if (isPopupOpen && !whatsappPopup.matches(':hover')) {
                        hidePopup();
                    }
                }, 5000);
            }
        }
        
        function hidePopup() {
            whatsappPopup.classList.remove('show');
            isPopupOpen = false;
        }
        
        // Start the auto-show timer after page has loaded for a bit
        setTimeout(() => {
            popupTimer = setInterval(showPopupAuto, 8000); // Show every 8 seconds
            showPopupAuto(); // Show immediately on first call
        }, 3000); // Wait 3 seconds after page load
        
        // Manual toggle on float button click
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            if (isPopupOpen) {
                hidePopup();
            } else {
                whatsappPopup.classList.add('show');
                isPopupOpen = true;
            }
        });
        
        // Close popup when close button is clicked
        if (whatsappClose) {
            whatsappClose.addEventListener('click', (e) => {
                e.preventDefault();
                hidePopup();
            });
        }
        
        // Keep popup open when hovering
        whatsappPopup.addEventListener('mouseenter', () => {
            clearTimeout();
        });
        
        // Resume auto-hide when mouse leaves (if popup is still open)
        whatsappPopup.addEventListener('mouseleave', () => {
            if (isPopupOpen) {
                setTimeout(() => {
                    if (isPopupOpen && !whatsappPopup.matches(':hover')) {
                        hidePopup();
                    }
                }, 2000);
            }
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (isPopupOpen && !whatsappFloat.contains(e.target) && !whatsappPopup.contains(e.target)) {
                hidePopup();
            }
        });
    }
    
    console.log('🚀 Muhammad Mughees Portfolio Loaded Successfully!');
    console.log('💻 Dark theme with advanced interactions ready');
    console.log('📱 WhatsApp widget initialized and ready!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
}
