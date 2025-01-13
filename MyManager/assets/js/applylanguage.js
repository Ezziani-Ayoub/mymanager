// Global variable to store the Google Translate Element
let googleTranslateElementInstance = null;

// Initialize Google Translate
function googleTranslateElementInit() {
    googleTranslateElementInstance = new google.translate.TranslateElement({
        pageLanguage: 'en',  // Default language of the page
        includedLanguages: 'en,fr,ar',  // Available languages (English, French, Arabic)
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Change language based on the dropdown selection
function changeLanguage(languageCode) {
    if (googleTranslateElementInstance) {
        googleTranslateElementInstance.showBanner(false);  // Hide the Google Translate banner
        
        // Trigger the language change by selecting the value from the embedded translate iframe
        const iframe = document.querySelector('iframe.goog-te-menu-frame');
        if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const selectLanguage = iframeDoc.querySelector('.goog-te-combo');
            if (selectLanguage) {
                selectLanguage.value = languageCode;
                selectLanguage.dispatchEvent(new Event('change'));  // Trigger language change event
            }
        }
    }
}

// Apply Google Translate on page load and set up the language change listener
window.addEventListener('DOMContentLoaded', () => {
    // Dynamically load the Google Translate script
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleTranslateScript.type = 'text/javascript';
    document.body.appendChild(googleTranslateScript);

    // Set up the language change event listener
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        changeLanguage(selectedLanguage);  // Change the language in the Google Translate widget
    });
});
