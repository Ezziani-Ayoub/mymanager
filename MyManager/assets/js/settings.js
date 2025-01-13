// JavaScript for the Settings Page

// Elements
const languageSelect = document.getElementById('language-select');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const notificationsToggle = document.getElementById('notifications-toggle');

// Function to change language
languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;

    // Example: Update language across other pages (dummy implementation)
    if (selectedLanguage === 'en') {
        alert('Language changed to English.');
    } else if (selectedLanguage === 'fr') {
        alert('Langue changée en Français.');
    } else if (selectedLanguage === 'ar') {
        alert('تم تغيير اللغة إلى العربية.');
    }
    // Add actual implementation to save language setting
});

// Function to toggle dark mode
darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;

    // Toggle dark mode on the current page
    document.body.classList.toggle('dark-mode', isDarkMode);

    // Simulate applying dark mode to other pages (save to localStorage)
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Function to enable/disable notifications
notificationsToggle.addEventListener('change', () => {
    const notificationsEnabled = notificationsToggle.checked;

    // Save notification setting (for example, to localStorage)
    localStorage.setItem('notifications', notificationsEnabled ? 'enabled' : 'disabled');

    if (notificationsEnabled) {
        alert('Notifications enabled.');
    } else {
        alert('Notifications disabled.');
    }
});

// Apply saved settings on page load
window.addEventListener('load', () => {
    // Load and apply dark mode setting
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    // Load and apply notification setting
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications === 'enabled') {
        notificationsToggle.checked = true;
    }
});
