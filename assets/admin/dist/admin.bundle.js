/**
 * CN University Admin Dashboard - Bundle
 * ----------------------------------
 * This is a bundled version of the admin dashboard JavaScript.
 * It contains all UI functionality for the admin interface, including:
 * - Tab navigation
 * - Module management (CRUD operations)
 * - User management
 * - Admin management
 * - System monitoring
 * - Log viewing and filtering
 * 
 * Note: This file uses mock implementations for data operations.
 * In production, these functions would connect to backend canisters.
 * 
 * Version: 1.0.0
 * Date: April 3, 2023
 */

// CN University Admin Bundle
(function() {
    // Main initialization function
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

    // Tab Navigation
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

    // Module Management
    function setupModuleManagement() {
        // Get elements
        const addModuleBtn = document.getElementById('add-module-btn');
        const moduleModal = document.getElementById('module-modal');
        const closeModalBtn = document.querySelector('#module-modal .close-modal');
        const closeModalBtnSecondary = document.querySelector('#module-modal .close-modal-btn');
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
        
        // Close modal with secondary button
        if (closeModalBtnSecondary) {
            closeModalBtnSecondary.addEventListener('click', function() {
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
        
        // Setup existing module edit buttons
        setupEditButtons();
        setupDeleteButtons();
    }

    function setupEditButtons() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const moduleModal = document.getElementById('module-modal');
        const moduleForm = document.getElementById('module-form');
        
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the module data from the row
                const row = this.closest('tr');
                const title = row.cells[0].textContent;
                const difficulty = row.cells[1].textContent;
                const tokenReward = row.cells[2].textContent;
                
                // Populate the form
                if (moduleForm) {
                    const titleInput = moduleForm.querySelector('#module-title');
                    const difficultySelect = moduleForm.querySelector('#module-difficulty');
                    const tokenRewardInput = moduleForm.querySelector('#module-token-reward');
                    
                    if (titleInput) titleInput.value = title;
                    if (difficultySelect) {
                        for (let i = 0; i < difficultySelect.options.length; i++) {
                            if (difficultySelect.options[i].value === difficulty) {
                                difficultySelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                    if (tokenRewardInput) tokenRewardInput.value = tokenReward;
                }
                
                // Show the modal
                if (moduleModal) moduleModal.style.display = 'flex';
            });
        });
    }

    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this module?')) {
                    // Get the row and remove it
                    const row = this.closest('tr');
                    if (row) {
                        row.remove();
                        // In a real implementation, would call backend to delete the module
                        console.log('Module deleted');
                    }
                }
            });
        });
    }

    function saveModule(moduleData) {
        console.log('Saving module:', moduleData);
        // This function would connect to the backend canister
        // For now, we're just logging the data
        
        // Mock implementation: add to the modules table
        const modulesTable = document.querySelector('#modules-tab table tbody');
        if (modulesTable) {
            // Check if we're editing an existing module
            let existingRow = null;
            const rows = modulesTable.querySelectorAll('tr');
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].cells[0].textContent === moduleData.title) {
                    existingRow = rows[i];
                    break;
                }
            }
            
            if (existingRow) {
                // Update existing row
                existingRow.cells[1].textContent = moduleData.difficulty;
                existingRow.cells[2].textContent = moduleData.tokenReward;
            } else {
                // Add new row
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
                
                // Setup event handlers on the new buttons
                const editBtn = newRow.querySelector('.edit-btn');
                const deleteBtn = newRow.querySelector('.delete-btn');
                
                if (editBtn) {
                    editBtn.addEventListener('click', function() {
                        // Get the modal
                        const moduleModal = document.getElementById('module-modal');
                        const moduleForm = document.getElementById('module-form');
                        
                        // Populate the form
                        if (moduleForm) {
                            const titleInput = moduleForm.querySelector('#module-title');
                            const difficultySelect = moduleForm.querySelector('#module-difficulty');
                            const tokenRewardInput = moduleForm.querySelector('#module-token-reward');
                            
                            if (titleInput) titleInput.value = moduleData.title;
                            if (difficultySelect) {
                                for (let i = 0; i < difficultySelect.options.length; i++) {
                                    if (difficultySelect.options[i].value === moduleData.difficulty) {
                                        difficultySelect.selectedIndex = i;
                                        break;
                                    }
                                }
                            }
                            if (tokenRewardInput) tokenRewardInput.value = moduleData.tokenReward;
                        }
                        
                        // Show the modal
                        if (moduleModal) moduleModal.style.display = 'flex';
                    });
                }
                
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', function() {
                        if (confirm('Are you sure you want to delete this module?')) {
                            newRow.remove();
                            console.log('Module deleted');
                        }
                    });
                }
            }
        }
    }

    // User Management
    function setupUserManagement() {
        // Implementation for user management functionality
        const userSearch = document.getElementById('user-search');
        if (userSearch) {
            userSearch.addEventListener('input', function() {
                // Filter user list based on search input
                filterUsers(this.value);
            });
        }
        
        // Setup view buttons
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const userId = row.cells[0].textContent;
                const username = row.cells[1].textContent;
                
                alert(`Viewing user ${username} (${userId})\nThis would open a detailed view of the user.`);
            });
        });
        
        // Setup suspend buttons
        const suspendButtons = document.querySelectorAll('.suspend-btn');
        suspendButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const userId = row.cells[0].textContent;
                const username = row.cells[1].textContent;
                
                if (confirm(`Are you sure you want to suspend user ${username} (${userId})?`)) {
                    alert(`User ${username} has been suspended.`);
                    this.textContent = 'Unsuspend';
                    this.classList.add('warning-btn');
                    row.classList.add('suspended');
                }
            });
        });
    }

    function filterUsers(searchTerm) {
        console.log('Filtering users by:', searchTerm);
        // This would connect to the backend to get filtered users
        
        // Mock implementation - filter the table directly
        const userTable = document.querySelector('#users-tab table tbody');
        if (userTable) {
            const rows = userTable.querySelectorAll('tr');
            const lowercaseSearch = searchTerm.toLowerCase();
            
            rows.forEach(row => {
                const username = row.cells[1].textContent.toLowerCase();
                const userId = row.cells[0].textContent.toLowerCase();
                
                if (username.includes(lowercaseSearch) || userId.includes(lowercaseSearch)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    }

    // Admin Management
    function setupAdminManagement() {
        // Implementation for admin management functionality
        const addAdminBtn = document.getElementById('add-admin-btn');
        if (addAdminBtn) {
            addAdminBtn.addEventListener('click', function() {
                // Show add admin form/modal
                alert('Add admin functionality would be implemented here.');
            });
        }
        
        // Setup edit buttons
        const editButtons = document.querySelectorAll('#admins-tab .edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const adminId = row.cells[0].textContent;
                
                alert(`Editing admin ${adminId}\nThis would open an admin edit form.`);
            });
        });
        
        // Setup remove buttons
        const removeButtons = document.querySelectorAll('#admins-tab .remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const adminId = row.cells[0].textContent;
                
                if (confirm(`Are you sure you want to remove admin ${adminId}?`)) {
                    alert(`Admin ${adminId} has been removed.`);
                    row.remove();
                }
            });
        });
    }

    // System Monitoring
    function setupSystemMonitoring() {
        // Implementation for system monitoring
        // This would fetch metrics from the backend
        updateSystemMetrics();
        
        // Setup refresh button
        const refreshBtn = document.querySelector('#system-tab .secondary-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                updateSystemMetrics();
                alert('Metrics refreshed!');
            });
        }
        
        // Setup top up button
        const topUpBtn = document.querySelector('#system-tab .primary-btn');
        if (topUpBtn) {
            topUpBtn.addEventListener('click', function() {
                alert('Cycles top-up would be implemented here, connecting to the cycles wallet.');
            });
        }
    }

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

    // Log Viewer
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

    function filterLogs() {
        const logLevel = document.getElementById('log-level-filter')?.value || 'all';
        const dateRange = document.getElementById('log-date-filter')?.value || 'all';
        
        console.log('Filtering logs by level:', logLevel, 'and date:', dateRange);
        
        // Mock implementation - filter logs directly in the DOM
        const logEntries = document.querySelectorAll('.log-entry');
        
        logEntries.forEach(entry => {
            let showByLevel = true;
            let showByDate = true;
            
            // Filter by level
            if (logLevel !== 'all') {
                const entryLevel = entry.querySelector('.log-level').textContent.toLowerCase();
                showByLevel = entryLevel.toLowerCase() === logLevel.toLowerCase();
            }
            
            // Filter by date would require parsing dates - simplified here
            if (dateRange !== 'all') {
                // Just a mock implementation - in a real scenario, would parse dates
                const entryDate = entry.querySelector('.log-time').textContent;
                
                if (dateRange === 'today' && !entryDate.includes('2023-04-03')) {
                    showByDate = false;
                } else if (dateRange === 'yesterday' && !entryDate.includes('2023-04-02')) {
                    showByDate = false;
                }
                // Week and month would require more complex date parsing
            }
            
            // Show or hide based on combined filters
            if (showByLevel && showByDate) {
                entry.style.display = '';
            } else {
                entry.style.display = 'none';
            }
        });
    }

    // Auth functions (would connect to the backend)
    function checkAdminStatus() {
        // Mock implementation - would check with the backend
        const adminInfo = document.getElementById('current-admin');
        if (adminInfo) {
            adminInfo.textContent = 'John Doe (Principal: hvybx...)';
        }
        
        // Logout button functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to log out?')) {
                    alert('You have been logged out.');
                    // In a real implementation, would redirect to login
                    window.location.href = '../index.html';
                }
            });
        }
    }

    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        initAdminPage();
        checkAdminStatus();
    });
})(); 