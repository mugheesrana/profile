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
        this.contactForm.addEventListener('submit', (e) => this.handleContactForm(e));

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
            'PHP Expert',
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
            counter.textContent = '0+';
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

// Project modal functions (called from HTML)
function openProjectModal(projectId) {
    const portfolio = window.portfolioManager;
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Project data (you can expand this with more details)
    const projectData = {
        'altair1': {
            title: 'Altair Innovation - Automotive Parts E-commerce',
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
            challenges: 'Integrating multiple payment methods, managing complex automotive parts inventory, implementing real-time stock updates, and creating an intuitive admin interface for non-technical users.',
            results: 'Successfully launched automotive e-commerce platform serving customers in London area, processing secure payments and managing extensive car parts inventory with excellent user experience.'
        },
        'profastchemicals1': {
            title: 'AgroChem - Pesticide Company Management Platform',
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
            challenges: 'Creating a comprehensive corporate management system that balances public-facing content with powerful admin functionality, implementing intuitive content management for non-technical users, and ensuring seamless integration between frontend presentation and backend management.',
            results: 'Successfully delivered a complete corporate platform that empowers the pesticide company to manage their online presence effectively, resulting in improved customer engagement and streamlined internal operations.'
        },
        'yachtbooking1': {
            title: 'Yacht Booking & Management System',
            description: 'A fully dynamic yacht booking platform allowing customers to book yachts, catering, and additional services for leisure trips. Includes a comprehensive admin dashboard to manage yachts, categories, amenities, services, payments, reports, and CMS pages. Features a complete booker dashboard displaying bookings, payments, and invoices.',
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
            challenges: 'Building a complex booking system with real-time availability, integrating multiple payment gateways, creating a comprehensive admin dashboard that manages yachts, payments, and CMS content, while ensuring seamless user experience for both customers and administrators.',
            results: 'Successfully delivered a complete luxury yacht booking platform that streamlines the entire booking process, from yacht selection to payment processing, with comprehensive management tools for administrators and an intuitive booking experience for customers.'
        },
        'beautyhub1': {
            title: 'BeautyHub Store & POS Management System',
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
            challenges: 'Developing a dual-purpose system that functions both as an e-commerce platform and POS system, integrating multiple payment gateways including local payment methods, creating a flexible CMS for dynamic content management, and ensuring seamless inventory synchronization between online and offline sales.',
            results: 'Successfully launched a comprehensive beauty store management system that streamlined both online sales and in-store operations, resulting in improved inventory management, increased sales efficiency, and enhanced customer experience across all channels.'
        },
        'jsc1': {
            title: 'Sports Community & Tournament Management Platform',
            description: 'A comprehensive multi-platform sports community solution where players register for games and tournaments, coaches manage teams, and admins oversee complete sports ecosystem. Features React admin dashboard for comprehensive management and Flutter mobile app for players, all powered by Laravel REST APIs with real-time synchronization across platforms.',
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
                'Ground booking and time table management',
                'Match scheduling and automated fixture generation',
                'Role-based access control (Admin, Coach, Player, Umpire)',
                'Live match scoring and result management',
                'Tournament brackets and leaderboard system',
                'App banner and content management system',
                'Advanced reporting and analytics dashboard',
                'Real-time sync between mobile app and web dashboard'
            ],
            technologies: ['Laravel 10', 'React.js 18', 'Flutter 3.0', 'MySQL 8', 'JWT Auth', 'REST API', 'Redux', 'Material-UI', 'Dart', 'PHP 8+'],
            challenges: 'Building a complex multi-platform ecosystem that seamlessly integrates Laravel backend with React dashboard and Flutter mobile app, implementing real-time synchronization across all platforms, managing complex sports data relationships (players, teams, tournaments, matches), ensuring optimal performance for mobile users, and creating intuitive interfaces for different user roles with varying technical expertise.',
            results: 'Successfully delivered a complete sports community management ecosystem that revolutionized how sports tournaments are organized and managed. The platform enabled efficient player registration, streamlined tournament management, improved communication between stakeholders, and provided comprehensive analytics for sports administrators, resulting in enhanced user engagement and operational efficiency.'
        }
        // Add more project data as needed
    };

    const project = projectData[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <p class="project-description">${project.description}</p>
            
            <h4>Key Features:</h4>
            <ul class="feature-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h4>Technologies Used:</h4>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <h4>Challenges & Solutions:</h4>
            <p>${project.challenges}</p>
            
            <h4>Results & Impact:</h4>
            <p>${project.results}</p>
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
    
    // Sample gallery images (replace with actual project images)
    const galleries = {
        'altair1': [
            {
                src: 'assets/projects/altair-landing.png',
                alt: 'Altair Innovation - Homepage'
            },
            {
                src: 'assets/projects/altair-shop.png',
                alt: 'Car Parts Shop Page'
            },
            {
                src: 'assets/projects/altair-list.png',
                alt: 'Product Listing Page'
            },
            {
                src: 'assets/projects/altair-dashboard.png',
                alt: 'Admin Dashboard'
            },
            {
                src: 'assets/projects/altair-table.png',
                alt: 'Admin Data Table'
            },
            {
                src: 'assets/projects/altair-model.png',
                alt: 'Product Management Modal'
            },
            {
                src: 'assets/projects/altair-add.png',
                alt: 'Add New Product Form'
            },
            {
                src: 'assets/projects/altair-settings.png',
                alt: 'Settings & Configuration'
            },
            {
                src: 'assets/projects/altair-checkout.png',
                alt: 'Checkout Process'
            },
            {
                src: 'assets/projects/altair-login.png',
                alt: 'Admin Login Page'
            },
            {
                src: 'assets/projects/altair-footer.png',
                alt: 'Footer Section'
            },
            {
                src: 'assets/projects/altair-med.png',
                alt: 'Product Detail View'
            }
        ],
        'olx1': [
            {
                src: 'assets/projects/olx/short.png',
                alt: 'Altair Innovation - Homepage'
            },
            {
                src: 'assets/projects/olx/home-list.png',
                alt: 'Car Parts Shop Page'
            },
            {
                src: 'assets/projects/olx/home.png',
                alt: 'Product Listing Page'
            },
            {
                src: 'assets/projects/olx/detail-car.png',
                alt: 'Admin Dashboard'
            },
            {
                src: 'assets/projects/olx/cars-filter.png',
                alt: 'Admin Data Table'
            },
            {
                src: 'assets/projects/olx/blog-det.png',
                alt: 'Product Management Modal'
            },
            {
                src: 'assets/projects/olx/dashboard.png',
                alt: 'Add New Product Form'
            },
            {
                src: 'assets/projects/olx/short.png',
                alt: 'Settings & Configuration'
            },
            {
                src: 'assets/projects/olx/blog-edit.png',
                alt: 'Checkout Process'
            },
            {
                src: 'assets/projects/olx/brands.png',
                alt: 'Admin Login Page'
            },
            {
                src: 'assets/projects/olx/cars.png',
                alt: 'Footer Section'
            },
            {
                src: 'assets/projects/olx/cars-edit.png',
                alt: 'Product Detail View'
            },
             {
                src: 'assets/projects/olx/cars-filter.png',
                alt: 'Product Detail View'
            },
             {
                src: 'assets/projects/olx/gsetting.png',
                alt: 'Product Detail View'
            },
             {
                src: 'assets/projects/olx/setting.png',
                alt: 'Product Detail View'
            },
             {
                src: 'assets/projects/olx/footer.png',
                alt: 'Product Detail View'
            }
        ],
        'profastchemicals1': [
            {
                src: 'assets/projects/profastchemicals/profastchemicals.com.png',
                alt: 'AgroChem - Company Homepage'
            },
            {
                src: 'assets/projects/profastchemicals/profastchemicals.com_about-us.png',
                alt: 'About Us - Company Information'
            },
            {
                src: 'assets/projects/profastchemicals/profastchemicals.com_contact.png',
                alt: 'Contact Page - Customer Queries'
            },
            {
                src: 'assets/projects/profastchemicals/profastchemicals.com_userServices.png',
                alt: 'Services & Product Catalog'
            }
        ],
        'yachtbooking1': [
            {
                src: 'assets/projects/yachtbooking/yachts.png',
                alt: 'Yacht Booking - Yacht Listings'
            },
            {
                src: 'assets/projects/yachtbooking/adminlightdashboard.png',
                alt: 'Admin Dashboard - Light Mode'
            },
            {
                src: 'assets/projects/yachtbooking/admindashboarddark.png',
                alt: 'Admin Dashboard - Dark Mode'
            },
            {
                src: 'assets/projects/yachtbooking/admindashbaordcards.png',
                alt: 'Admin Dashboard Cards & Statistics'
            },
            {
                src: 'assets/projects/yachtbooking/userdashboard.png',
                alt: 'User Booking Dashboard'
            },
            {
                src: 'assets/projects/yachtbooking/yachtdetails.png',
                alt: 'Yacht Details & Booking Page'
            },
            {
                src: 'assets/projects/yachtbooking/userbookingonfo.png',
                alt: 'User Booking Information'
            },
            {
                src: 'assets/projects/yachtbooking/userpayment.png',
                alt: 'Payment Processing Page'
            },
            {
                src: 'assets/projects/yachtbooking/adminpaymetnmethod.png',
                alt: 'Admin Payment Methods Management'
            },
            {
                src: 'assets/projects/yachtbooking/adminbookingrpt.png',
                alt: 'Admin Booking Reports'
            },
            {
                src: 'assets/projects/yachtbooking/adminmanagepages.png',
                alt: 'Admin Pages Management'
            },
            {
                src: 'assets/projects/yachtbooking/adminmenuetabl.png',
                alt: 'Admin Menu & Table Management'
            },
            {
                src: 'assets/projects/yachtbooking/menucards.png',
                alt: 'Menu Cards & Services'
            },
            {
                src: 'assets/projects/yachtbooking/gallery.png',
                alt: 'Gallery & Image Management'
            },
            {
                src: 'assets/projects/yachtbooking/pagesection.png',
                alt: 'Page Sections & CMS'
            },
            {
                src: 'assets/projects/yachtbooking/setting.png',
                alt: 'System Settings & Configuration'
            },
            {
                src: 'assets/projects/yachtbooking/contact.png',
                alt: 'Contact Management'
            }
        ],
        'beautyhub1': [
            {
                src: 'assets/projects/beautyhub/beautyhub.cslancer.com_.png',
                alt: 'BeautyHub - Homepage & Store Front'
            },
            {
                src: 'assets/projects/beautyhub/beautyhub.cslancer.com_admin_dashboard.png',
                alt: 'Admin Dashboard - Main Overview'
            },
            {
                src: 'assets/projects/beautyhub/beautyhub.cslancer.com_admin_team.png',
                alt: 'Admin Team Management'
            },
            {
                src: 'assets/projects/beautyhub/beautyhub.cslancer.com_shop.png',
                alt: 'Shop & Product Catalog'
            },
            {
                src: 'assets/projects/beautyhub/beautyhub.cslancer.com_product-details_5.png',
                alt: 'Product Details Page'
            },
            {
                src: 'assets/projects/beautyhub/beautyhub.cslancer.com_product-cart.png',
                alt: 'Shopping Cart & Checkout'
            },
            {
                src: 'assets/projects/beautyhub/prods.png',
                alt: 'Product Management Panel'
            },
            {
                src: 'assets/projects/beautyhub/cat.png',
                alt: 'Category Management System'
            },
            {
                src: 'assets/projects/beautyhub/inventory.png',
                alt: 'Inventory Tracking & Management'
            },
            {
                src: 'assets/projects/beautyhub/orsers.png',
                alt: 'Orders Management & Processing'
            },
            {
                src: 'assets/projects/beautyhub/membership.png',
                alt: 'Membership & Subscription System'
            },
            {
                src: 'assets/projects/beautyhub/drfaq.png',
                alt: 'FAQ Management & CMS'
            }
        ],
        'jsc1': [
            {
                src: 'assets/projects/jsc/home.png',
                alt: 'Sports Community - Mobile App Home Screen'
            },
            {
                src: 'assets/projects/jsc/dashbaordtbls.png',
                alt: 'React Admin Dashboard - Data Tables'
            },
            {
                src: 'assets/projects/jsc/gamesmanage.png',
                alt: 'Games & Tournament Management Panel'
            },
            {
                src: 'assets/projects/jsc/gallerycards.png',
                alt: 'Media Gallery & Sports Cards Management'
            },
            {
                src: 'assets/projects/jsc/ordermodel.png',
                alt: 'Registration & Order Management Modal'
            }
        ]
        
    };
    
    galleryImages = galleries[projectId] || [];
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
