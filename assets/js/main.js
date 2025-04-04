// ICP Studio - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application components
 */
function initApp() {
    // Load modules data if on the homepage
    if (document.getElementById('module-cards-container')) {
        loadModules();
    }
    
    // Update footer with current year
    updateFooterYear();
    
    // Check user authentication status
    checkAuthStatus();
}

/**
 * Load module data and render module cards
 */
function loadModules() {
    const modulesContainer = document.getElementById('module-cards-container');
    
    // Sample module data - In a real app, this would come from the canister
    const modules = [
        {
            id: 1,
            title: 'Introduction to ICP',
            description: 'Learn the fundamentals of the Internet Computer Protocol.',
            difficulty: 'Beginner',
            tokenReward: 50
        },
        {
            id: 2,
            title: 'Creating Your First Canister',
            description: 'Build and deploy your first canister on the Internet Computer.',
            difficulty: 'Beginner',
            tokenReward: 100
        },
        {
            id: 3,
            title: 'Working with Motoko',
            description: 'Master the Motoko programming language for ICP development.',
            difficulty: 'Intermediate',
            tokenReward: 150
        }
    ];
    
    // Clear loading message
    modulesContainer.innerHTML = '';
    
    // Render each module card
    modules.forEach(module => {
        const moduleCard = createModuleCard(module);
        modulesContainer.appendChild(moduleCard);
    });
}

/**
 * Create a module card element
 * @param {Object} module - Module data
 * @returns {HTMLElement} - The module card element
 */
function createModuleCard(module) {
    const card = document.createElement('div');
    card.className = 'module-card';
    
    card.innerHTML = `
        <div class="module-card-header">
            <h3>${module.title}</h3>
        </div>
        <div class="module-card-body">
            <p>${module.description}</p>
            <p><strong>Difficulty:</strong> ${module.difficulty}</p>
        </div>
        <div class="module-card-footer">
            <span class="token-reward">${module.tokenReward} Tokens</span>
            <a href="/modules/${module.id}" class="cta-button">Start</a>
        </div>
    `;
    
    return card;
}

/**
 * Update footer with current year
 */
function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const year = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, year);
    }
}

/**
 * Check user authentication status
 */
function checkAuthStatus() {
    // In a real app, this would interact with the Internet Identity service
    const isLoggedIn = localStorage.getItem('user_authenticated') === 'true';
    
    if (isLoggedIn) {
        // Update UI for authenticated users
        updateAuthenticatedUI();
    } else {
        // Update UI for non-authenticated users
        updateUnauthenticatedUI();
    }
}

/**
 * Update UI for authenticated users
 */
function updateAuthenticatedUI() {
    // This would update UI elements based on authentication
    // For example, show user profile, token count, etc.
    const tokenCount = localStorage.getItem('user_tokens') || 0;
    
    const tokenElement = document.querySelector('.token-count');
    if (tokenElement) {
        tokenElement.innerHTML = `${tokenCount} <span>Tokens</span>`;
    }
    
    // Update progress bar
    const progressElement = document.querySelector('.progress');
    if (progressElement) {
        // Calculate progress (example: based on completed modules)
        const completedModules = localStorage.getItem('completed_modules') || 0;
        const totalModules = 12; // Total modules in the course
        const progress = (completedModules / totalModules) * 100;
        
        progressElement.style.width = `${progress}%`;
    }
}

/**
 * Update UI for non-authenticated users
 */
function updateUnauthenticatedUI() {
    // This would update UI elements for non-authenticated users
    // For example, show login prompts, hide personal data, etc.
} 