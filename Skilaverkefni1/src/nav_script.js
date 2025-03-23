document.addEventListener('DOMContentLoaded', function() {
    // First load the header
    loadHeader();
});

// Function to load header
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // After header is loaded, load the mobile nav
            loadMobileNav();
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to load mobile nav after header
function loadMobileNav() {
    fetch('mobile_nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('mobile-nav-container').innerHTML = data;
            // After mobile nav is loaded, set up all event handlers
            setupEventHandlers();
        })
        .catch(error => console.error('Error loading mobile nav:', error));
}

// Single function to set up all event handlers
function setupEventHandlers() {
    // Menu button click - open menu
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            document.getElementById('menu').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });
    }

    // Close button click - close menu
    const closeButton = document.getElementById('close-menu');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('menu').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    }

    // Menu item clicks - close menu and navigate
    const menuItems = document.querySelectorAll('#menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('menu').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    });
}