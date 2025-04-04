// CN University Admin JavaScript
// This file contains the core functionality for the admin dashboard
// It handles tab navigation, CRUD operations for modules, user management, and system monitoring
// Note: This is currently using mock data - would need to be connected to backend canisters in production

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page and event listeners after DOM is fully loaded
    initAdminPage();
});

/**
 * Main initialization function for the admin dashboard
 * Sets up all component functionality and event listeners
 */
function initAdminPage() {
    // Set up tab navigation
    setupTabs();
    
    // Set up module management
    setupModuleManagement();
    
    // Set up user management
    setupUserManagement();
    
    // Set up admin management
    setupAdminManagement();
    
    // Set up system monitoring
    setupSystemMonitoring();
    
    // Set up log viewer
    setupLogViewer();
}

/**
 * Sets up tab navigation functionality
 * Handles switching between different dashboard sections
 */
function setupTabs() {
    const tabLinks = document.querySelectorAll('.sidebar-nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the tab ID from the href attribute
            const tabId = this.getAttribute('href').substring(1);
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Set first tab as active by default
    if (tabLinks.length > 0 && tabContents.length > 0) {
        tabLinks[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
}

/**
 * Sets up module management functionality
 * Handles modal interactions and form submissions for module CRUD operations
 * Note: In production, this would interact with a module management canister
 */
function setupModuleManagement() {
    // Get elements
    const addModuleBtn = document.getElementById('add-module-btn');
    const moduleModal = document.getElementById('module-modal');
    const closeModalBtn = document.querySelector('#module-modal .close-modal');
    const moduleForm = document.getElementById('module-form');
    
    // Add module button click event
    if (addModuleBtn) {
        addModuleBtn.addEventListener('click', function() {
            if (moduleModal) {
                moduleModal.style.display = 'flex';
                // Clear form for new module
                if (moduleForm) moduleForm.reset();
            }
        });
    }
    
    // Close modal button click event
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (moduleModal) moduleModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside content
    if (moduleModal) {
        moduleModal.addEventListener('click', function(e) {
            if (e.target === moduleModal) {
                moduleModal.style.display = 'none';
            }
        });
    }
    
    // Module form submit event
    if (moduleForm) {
        moduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(moduleForm);
            const moduleData = {};
            
            formData.forEach((value, key) => {
                moduleData[key] = value;
            });
            
            // Call function to save module (would connect to backend)
            saveModule(moduleData);
            
            // Close modal
            if (moduleModal) moduleModal.style.display = 'none';
        });
    }
}

/**
 * Saves module data to the system
 * @param {Object} moduleData - The module data to save
 * Note: This is a mock implementation that only updates the UI
 * In production, this would call a canister function to store the data
 */
function saveModule(moduleData) {
    console.log('Saving module:', moduleData);
    // This function would connect to the backend canister
    // For now, we're just logging the data
    
    // Mock implementation: add to the modules table
    const modulesTable = document.querySelector('#modules-tab table tbody');
    if (modulesTable) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${moduleData.title}</td>
            <td>${moduleData.difficulty}</td>
            <td>${moduleData.tokenReward}</td>
            <td>0</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        modulesTable.appendChild(newRow);
    }
}

/**
 * Sets up user management functionality
 * Includes search filtering and other user-related operations
 * Note: In production, this would interact with a user management canister
 */
function setupUserManagement() {
    // Implementation for user management functionality
    const userSearch = document.getElementById('user-search');
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            // Filter user list based on search input
            filterUsers(this.value);
        });
    }
}

/**
 * Filters the user list based on search term
 * @param {string} searchTerm - The search term to filter by
 * Note: In production, this would query the backend for filtered results
 */
function filterUsers(searchTerm) {
    console.log('Filtering users by:', searchTerm);
    // This would connect to the backend to get filtered users
    // Mock implementation for now
}

/**
 * Sets up admin management functionality
 * Handles adding and managing admin users
 * Note: In production, this would interact with an admin management canister
 */
function setupAdminManagement() {
    // Implementation for admin management functionality
    const addAdminBtn = document.getElementById('add-admin-btn');
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', function() {
            // Show add admin form/modal
            console.log('Add admin clicked');
        });
    }
}

/**
 * Sets up system monitoring functionality
 * Updates and displays system metrics
 * Note: In production, this would fetch real metrics from canisters
 */
function setupSystemMonitoring() {
    // Implementation for system monitoring
    // This would fetch metrics from the backend
    updateSystemMetrics();
}

/**
 * Updates the system metrics display with current values
 * Note: This is currently using mock data
 * In production, this would fetch real-time metrics from the canisters
 */
function updateSystemMetrics() {
    // Mock implementation - would fetch from backend
    const metrics = {
        cycle_balance: '10,000,000',
        canister_memory: '56.2MB / 100MB',
        http_requests: '1,250 / day',
        active_users: '120 online'
    };
    
    // Update display
    for (const [key, value] of Object.entries(metrics)) {
        const element = document.getElementById(`metric-${key}`);
        if (element) element.textContent = value;
    }
}

/**
 * Sets up log viewer functionality
 * Handles filtering and displaying system logs
 * Note: In production, this would fetch logs from a logging canister
 */
function setupLogViewer() {
    const logLevelFilter = document.getElementById('log-level-filter');
    const dateFilter = document.getElementById('log-date-filter');
    
    if (logLevelFilter) {
        logLevelFilter.addEventListener('change', function() {
            filterLogs();
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            filterLogs();
        });
    }
}

/**
 * Filters logs based on selected level and date range
 * Note: This is a mock implementation
 * In production, this would query a logging canister with filter parameters
 */
function filterLogs() {
    const logLevel = document.getElementById('log-level-filter')?.value || 'all';
    const dateRange = document.getElementById('log-date-filter')?.value || 'all';
    
    console.log('Filtering logs by level:', logLevel, 'and date:', dateRange);
    // This would fetch filtered logs from the backend
} 