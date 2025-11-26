const projects = [
    {
        id: 'altair-innovation',
        title: 'Altair Innovation - Car Parts E-commerce',
        description: 'A comprehensive e-commerce platform for car parts with payment integration, inventory management, and admin dashboard.',
        categories: ['ecommerce', 'payment', 'dashboard'],
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'REST API'],
        images: [
            'assets/projects/altair/home.png',
            'assets/projects/altair/products.png',
            'assets/projects/altair/cart.png',
            'assets/projects/altair/admin-dashboard.png'
        ],
        features: [
            'Product catalog with categories and filters',
            'Shopping cart and checkout process',
            'Stripe payment integration',
            'Admin dashboard for inventory management',
            'Order tracking system',
            'User authentication and authorization'
        ],
        demoUrl: 'https://altair-innovation-demo.com',
        codeUrl: 'https://github.com/yourusername/altair-innovation',
        date: '2023-06-15'
    },
    {
        id: 'olx-clone',
        title: 'OLX Clone - Classified Ads Platform',
        description: 'A full-featured classified ads platform with user profiles, real-time messaging, and advanced search functionality.',
        categories: ['ecommerce', 'dashboard', 'api', 'frontend'],
        technologies: ['Laravel', 'React', 'MySQL', 'WebSockets', 'REST API'],
        images: [
            'assets/projects/olx/home.png',
            'assets/projects/olx/listing.png',
            'assets/projects/olx/messaging.png',
            'assets/projects/olx/user-dashboard.png'
        ],
        features: [
            'User registration and authentication',
            'Create and manage product listings',
            'Real-time messaging between users',
            'Advanced search with filters',
            'Image upload and management',
            'Responsive design for all devices'
        ],
        demoUrl: 'https://olx-clone-demo.com',
        codeUrl: 'https://github.com/yourusername/olx-clone',
        date: '2023-03-10'
    },
    {
        id: 'profast-chemicals',
        title: 'AgroChem - Pesticide Management Platform',
        description: 'A comprehensive platform for managing pesticide inventory, sales, and distribution with multi-warehouse support.',
        categories: ['ecommerce', 'dashboard', 'api', 'frontend'],
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'Chart.js', 'REST API'],
        images: [
            'assets/projects/profastchemicals/profastchemicals.com.png',
            'assets/projects/profastchemicals/inventory.png',
            'assets/projects/profastchemicals/sales.png',
            'assets/projects/profastchemicals/reports.png'
        ],
        features: [
            'Inventory management with batch tracking',
            'Multi-warehouse support',
            'Sales and purchase management',
            'Reporting and analytics',
            'User role-based access control',
            'Barcode scanning integration'
        ],
        demoUrl: 'https://profastchemicals-demo.com',
        codeUrl: 'https://github.com/yourusername/profast-chemicals',
        date: '2023-09-22'
    },
    {
        id: 'yacht-booking',
        title: 'Yacht Booking & Management System',
        description: 'A complete booking system for yacht charters with availability calendar, payment processing, and crew management.',
        categories: ['ecommerce', 'payment', 'dashboard', 'api'],
        technologies: ['Laravel', 'React', 'MySQL', 'Stripe', 'FullCalendar'],
        images: [
            'assets/projects/yachtbooking/yachts.png',
            'assets/projects/yachtbooking/booking.png',
            'assets/projects/yachtbooking/availability.png',
            'assets/projects/yachtbooking/admin-dashboard.png'
        ],
        features: [
            'Yacht listing with detailed specifications',
            'Real-time availability calendar',
            'Online booking and payment processing',
            'Crew management system',
            'Customer relationship management',
            'Multi-language support'
        ],
        demoUrl: 'https://yachtbooking-demo.com',
        codeUrl: 'https://github.com/yourusername/yacht-booking',
        date: '2023-11-05'
    },
    {
        id: 'beauty-hub',
        title: 'BeautyHub Store & POS Management',
        description: 'A complete point of sale and inventory management system for beauty and cosmetics stores.',
        categories: ['ecommerce', 'payment', 'dashboard'],
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'Thermal Printing', 'Barcode'],
        images: [
            'assets/projects/beautyhub/beautyhub.cslancer.com_.png',
            'assets/projects/beautyhub/pos.png',
            'assets/projects/beautyhub/inventory.png',
            'assets/projects/beautyhub/reports.png'
        ],
        features: [
            'Point of Sale (POS) system',
            'Inventory management',
            'Customer loyalty program',
            'Sales reporting and analytics',
            'Barcode scanning',
            'Receipt printing'
        ],
        demoUrl: 'https://beautyhub-demo.com',
        codeUrl: 'https://github.com/yourusername/beauty-hub',
        date: '2023-07-18'
    },
    {
        id: 'sports-community',
        title: 'Sports Community & Tournament Management',
        description: 'A platform for managing sports tournaments, teams, and community events with live scoring and statistics.',
        categories: ['dashboard', 'api', 'frontend'],
        technologies: ['Laravel', 'React', 'MySQL', 'WebSockets', 'REST API'],
        images: [
            'assets/projects/jsc/home.png',
            'assets/projects/jsc/tournaments.png',
            'assets/projects/jsc/live-scoring.png',
            'assets/projects/jsc/statistics.png'
        ],
        features: [
            'Tournament creation and management',
            'Team and player registration',
            'Live scoring and updates',
            'Statistics and leaderboards',
            'Event scheduling',
            'Mobile-responsive design'
        ],
        demoUrl: 'https://sports-community-demo.com',
        codeUrl: 'https://github.com/yourusername/sports-community',
        date: '2023-10-30'
    }
];

// Function to get all unique categories from projects
function getAllCategories() {
    const categories = new Set();
    projects.forEach(project => {
        project.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories);
}

// Function to get project by ID
function getProjectById(projectId) {
    return projects.find(project => project.id === projectId) || null;
}

export { projects, getAllCategories, getProjectById };
