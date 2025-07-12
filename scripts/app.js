/**
 * Pace Applied Solutions - Application Bootstrap
 * Handles script loading, initialization, and dependency management
 * 
 * @author Pace Applied Solutions
 * @version 1.0.0
 */

/**
 * Application initialization and dependency management
 */
class PaceApp {
    constructor() {
        this.auth = null;
        this.isAuthenticated = false;
        this.domReady = false;
        this.scriptsReady = false;
        this.config = null;
        this.themeManager = null;
    }

    /**
     * Initialize the application
     */
    async initialize() {
        console.log('🚀 Initializing Pace Application...');
        
        try {
            // Load local configuration first
            await this.loadLocalConfiguration();
            
            // Load application scripts
            await this.loadApplicationScripts();
            
            // Set up DOM ready listener
            this.setupDOMListener();
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.initializeFallbackMode();
        }
    }

    /**
     * Dynamically load local configuration if it exists
     */
    loadLocalConfiguration() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = './scripts/config.local.js';
            script.onload = () => {
                console.log('📝 config.local.js loaded successfully');
                resolve();
            };
            script.onerror = () => {
                console.log('📝 config.local.js not found - running in demo mode');
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Load application scripts in the correct order
     */
    loadApplicationScripts() {
        return new Promise((resolve) => {
            const scripts = [
                './scripts/config.js',
                './scripts/utils.js',
                './scripts/auth.js'
            ];
            
            let loadedCount = 0;
            
            scripts.forEach((src, index) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    loadedCount++;
                    console.log(`📦 Loaded script ${index + 1}/${scripts.length}: ${src}`);
                    
                    if (loadedCount === scripts.length) {
                        console.log('✅ All scripts loaded successfully');
                        this.scriptsReady = true;
                        this.checkReadyState();
                        resolve();
                    }
                };
                script.onerror = () => {
                    console.error(`❌ Failed to load script: ${src}`);
                    // Continue loading other scripts even if one fails
                    loadedCount++;
                    if (loadedCount === scripts.length) {
                        this.scriptsReady = true;
                        this.checkReadyState();
                        resolve();
                    }
                };
                document.head.appendChild(script);
            });
        });
    }

    /**
     * Set up DOM ready listener
     */
    setupDOMListener() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.domReady = true;
                this.checkReadyState();
            });
        } else {
            this.domReady = true;
            this.checkReadyState();
        }
    }

    /**
     * Check if both DOM and scripts are ready
     */
    checkReadyState() {
        if (this.domReady && this.scriptsReady) {
            this.initializeApplication();
        }
    }

    /**
     * Initialize application components
     */
    initializeApplication() {
        try {
            // Initialize theme manager first
            this.themeManager = new ThemeManager();
            this.themeManager.initialize();
            
            // Validate configuration
            if (typeof CONFIG !== 'undefined') {
                this.config = CONFIG;
                const status = CONFIG.getConfigurationStatus();
                console.log('🔧 Configuration Status:', status);
            } else {
                console.warn('⚠️ CONFIG object not available');
                this.initializeFallbackMode();
                return;
            }
            
            // Initialize authentication
            if (typeof getAuth === 'function') {
                this.auth = getAuth();
                this.setupAuthenticationListeners();
            }
            
            // Set up UI event listeners
            this.setupEventListeners();
            
            // Update configuration notice
            this.updateConfigurationNotice();
            
            console.log('✅ Application initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.initializeFallbackMode();
        }
    }

    /**
     * Initialize fallback mode for demo purposes
     */
    initializeFallbackMode() {
        console.log('🎭 Initializing fallback/demo mode');
        this.setupEventListeners();
        this.updateUIForAuthState(false, null);
    }

    /**
     * Set up authentication state listeners
     */
    setupAuthenticationListeners() {
        if (this.auth) {
            this.auth.onAuthStateChanged((authenticated, account) => {
                this.isAuthenticated = authenticated;
                this.updateUIForAuthState(authenticated, account);
            });
        }
    }

    /**
     * Set up UI event listeners
     */
    setupEventListeners() {
        // Sign in button
        const signInBtn = document.getElementById('signInBtn');
        if (signInBtn) {
            signInBtn.addEventListener('click', () => this.handleSignIn());
        }
        
        // Sign out button
        const signOutBtn = document.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => this.handleSignOut());
        }
        
        // View examples button
        const viewExamplesBtn = document.getElementById('viewExamplesBtn');
        if (viewExamplesBtn) {
            viewExamplesBtn.addEventListener('click', () => this.handleViewExamples());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links
        const navViewExamples = document.getElementById('navViewExamples');
        if (navViewExamples) {
            navViewExamples.addEventListener('click', () => {
                this.showExamples();
                this.closeMobileMenu();
            });
        }

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Smooth scrolling for internal links
        document.addEventListener('click', (e) => this.handleInternalLinks(e));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Close mobile menu on window resize
        window.addEventListener('resize', () => this.handleWindowResize());
    }

    /**
     * Handle sign in action
     */
    async handleSignIn() {
        if (this.auth && this.auth.msalInstance) {
            try {
                // Set loading state for sign in button
                const signInBtn = document.getElementById('signInBtn');
                this.setLoading(signInBtn, true);
                
                await this.auth.signIn();
            } catch (error) {
                console.error('Sign in failed:', error);
                this.showNotification('Sign in failed. Please try again.', 'error');
            } finally {
                // Clear loading state
                const signInBtn = document.getElementById('signInBtn');
                this.setLoading(signInBtn, false);
            }
        } else {
            // Demo mode - simulate user authentication for profile display
            this.showNotification('Demo mode: Signing in with demo user profile.', 'info');
            this.simulateAuthenticatedState();
        }
    }

    /**
     * Handle sign out action
     */
    async handleSignOut() {
        if (this.auth) {
            try {
                await this.auth.signOut();
            } catch (error) {
                console.error('Sign out failed:', error);
                this.showNotification('Sign out failed. Please try again.', 'error');
            }
        }
        // Always return to landing regardless of auth success
        this.showLanding();
    }

    /**
     * Set loading state for an element
     */
    setLoading(element, isLoading) {
        if (!element) return;
        
        if (isLoading) {
            element.disabled = true;
            const originalContent = element.innerHTML;
            element.dataset.originalContent = originalContent;
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        } else {
            element.disabled = false;
            if (element.dataset.originalContent) {
                element.innerHTML = element.dataset.originalContent;
                delete element.dataset.originalContent;
            }
        }
    }

    /**
     * Handle view examples action
     */
    handleViewExamples() {
        // Always show examples regardless of authentication state
        this.showExamples();
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Escape key to return to landing
        if (e.key === 'Escape') {
            this.showLanding();
        }
        
        // Ctrl/Cmd + K for quick copy (when focused on code blocks)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.tagName === 'CODE') {
                this.copyToClipboard(focusedElement.textContent);
            }
        }
    }

    /**
     * Handle internal link clicks
     */
    handleInternalLinks(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    /**
     * Update UI based on authentication state
     */
    updateUIForAuthState(authenticated, account) {
        console.log('🔄 Updating UI for auth state:', { authenticated, account: account?.name || 'None' });
        
        // Get UI elements
        const signInBtn = document.getElementById('signInBtn');
        const userProfile = document.getElementById('userProfile');
        const viewExamplesBtn = document.getElementById('viewExamplesBtn');
        const navViewExamples = document.getElementById('navViewExamples');
        
        if (authenticated && account) {
            // User is authenticated - show user profile
            if (signInBtn) signInBtn.classList.add('pace-hidden');
            if (userProfile) {
                userProfile.classList.remove('pace-hidden');
                this.updateUserProfile(account);
            }
            if (viewExamplesBtn) {
                viewExamplesBtn.innerHTML = '<i class="fas fa-play"></i> View Examples';
                viewExamplesBtn.onclick = () => this.showExamples();
            }
            if (navViewExamples) {
                navViewExamples.innerHTML = '<i class="fas fa-play"></i><span>Interactive Examples</span>';
                navViewExamples.onclick = () => this.showExamples();
            }
            
            // Show examples - notification is handled by the sign-in process itself
            this.showExamples();
        } else {
            // User is not authenticated - show sign in button but still allow access to examples
            if (signInBtn) signInBtn.classList.remove('pace-hidden');
            if (userProfile) userProfile.classList.add('pace-hidden');
            if (viewExamplesBtn) {
                // Landing page button should always show "View Examples"
                if (viewExamplesBtn.getAttribute('onclick')) {
                    viewExamplesBtn.innerHTML = '<i class="fas fa-play"></i> View Examples';
                    viewExamplesBtn.onclick = () => this.showExamples();
                } else if (this.auth) {
                    viewExamplesBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In for Profile';
                    viewExamplesBtn.onclick = () => this.handleSignIn();
                } else {
                    viewExamplesBtn.innerHTML = '<i class="fas fa-play"></i> View Examples';
                    viewExamplesBtn.onclick = () => this.showExamples();
                }
            }
            if (navViewExamples) {
                navViewExamples.innerHTML = '<i class="fas fa-play"></i><span>Interactive Examples</span>';
                navViewExamples.onclick = () => this.showExamples();
            }
            
            // Always show examples, regardless of authentication state
            this.showExamples();
        }
    }

    /**
     * Simulate authenticated state for demo mode
     */
    simulateAuthenticatedState() {
        const mockAccount = {
            name: 'Demo User',
            email: 'demo@paceappliedsolutions.com',
            username: 'demo@paceappliedsolutions.com'
        };
        
        // Update UI to show authenticated state
        const signInBtn = document.getElementById('signInBtn');
        const userProfile = document.getElementById('userProfile');
        
        if (signInBtn) signInBtn.classList.add('pace-hidden');
        if (userProfile) {
            userProfile.classList.remove('pace-hidden');
            this.updateUserProfile(mockAccount);
        }
    }

    /**
     * Update user profile display
     */
    updateUserProfile(account) {
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const userAvatar = document.getElementById('userAvatar');
        
        const name = account.name || account.username || 'User';
        const email = account.email || account.username || '';
        
        if (userName) userName.textContent = name;
        if (userEmail) userEmail.textContent = email;
        if (userAvatar) {
            // Use the fetched photo if available, otherwise use default avatar
            if (account.photo) {
                userAvatar.src = account.photo;
                userAvatar.alt = `${name} Profile Photo`;
                console.log('✅ Displaying user profile photo');
            } else {
                // Fallback to initial-based avatar
                const initials = name.charAt(0).toUpperCase();
                userAvatar.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#EB9110"/>
                        <text x="20" y="26" font-family="Arial, sans-serif" font-size="14" 
                              font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                    </svg>
                `)}`;
                userAvatar.alt = `${name} Avatar`;
                console.log('✅ Displaying default avatar for', name);
            }
        }
    }

    /**
     * Show examples section
     */
    showExamples() {
        const landingSection = document.getElementById('landingSection');
        const examplesSection = document.getElementById('examplesSection');
        
        if (landingSection) landingSection.classList.add('pace-hidden');
        if (examplesSection) examplesSection.classList.remove('pace-hidden');
        
        this.scrollToTop();
    }

    /**
     * Show landing section
     */
    showLanding() {
        const landingSection = document.getElementById('landingSection');
        const examplesSection = document.getElementById('examplesSection');
        
        if (landingSection) landingSection.classList.remove('pace-hidden');
        if (examplesSection) examplesSection.classList.add('pace-hidden');
        
        // Reset header to unauthenticated state for demo mode
        if (!this.isAuthenticated) {
            this.resetToUnauthenticatedState();
        }
        
        this.scrollToTop();
    }

    /**
     * Reset header to unauthenticated state
     */
    resetToUnauthenticatedState() {
        const signInBtn = document.getElementById('signInBtn');
        const userProfile = document.getElementById('userProfile');
        
        if (signInBtn) signInBtn.classList.remove('pace-hidden');
        if (userProfile) userProfile.classList.add('pace-hidden');
    }

    /**
     * Scroll to top of page
     */
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Copy text to clipboard with fallback support
     */
    copyToClipboard(text) {
        const cleanText = text.trim();
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(cleanText).then(() => {
                this.showNotification('Code copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy text:', err);
                this.fallbackCopyToClipboard(cleanText);
            });
        } else {
            this.fallbackCopyToClipboard(cleanText);
        }
    }

    /**
     * Fallback copy method for older browsers
     */
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Code copied to clipboard!', 'success');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showNotification('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        if (typeof PaceUtils !== 'undefined' && PaceUtils.showNotification) {
            PaceUtils.showNotification(message, type);
        } else {
            // Fallback for when utils aren't loaded
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Update configuration notice based on setup
     */
    updateConfigurationNotice() {
        const configNotice = document.getElementById('configNotice');
        if (configNotice && this.config) {
            const status = this.config.getConfigurationStatus();
            
            // Hide notice if properly configured
            if (status.isValid && status.hasLocalConfig) {
                configNotice.style.display = 'none';
                return;
            }
            
            // Update notice content based on configuration state
            if (!status.hasLocalConfig) {
                configNotice.querySelector('p').innerHTML = 
                    'Microsoft 365 authentication is running in demo mode. <a href="./docs/AUTHENTICATION_SETUP.md" target="_blank" rel="noopener">Configure authentication</a> to enable user profile features.';
            } else if (!status.isValid) {
                configNotice.classList.remove('pace-notification-warning');
                configNotice.classList.add('pace-notification-error');
                configNotice.querySelector('strong').textContent = 'Configuration Error';
                configNotice.querySelector('p').textContent = 'Authentication configuration is invalid. Please check your Azure AD settings.';
            }
        }
    }

    /**
     * Toggle mobile navigation menu
     */
    toggleMobileMenu() {
        const nav = document.getElementById('mainNav');
        const toggleBtn = document.getElementById('mobileMenuToggle');
        
        if (nav && toggleBtn) {
            const isOpen = nav.classList.contains('pace-nav-open');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    /**
     * Open mobile navigation menu
     */
    openMobileMenu() {
        const nav = document.getElementById('mainNav');
        const toggleBtn = document.getElementById('mobileMenuToggle');
        
        if (nav && toggleBtn) {
            nav.classList.add('pace-nav-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.setAttribute('aria-label', 'Close navigation menu');
            
            // Change icon to close
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    }

    /**
     * Close mobile navigation menu
     */
    closeMobileMenu() {
        const nav = document.getElementById('mainNav');
        const toggleBtn = document.getElementById('mobileMenuToggle');
        
        if (nav && toggleBtn) {
            nav.classList.remove('pace-nav-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Change icon back to hamburger
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    /**
     * Handle clicks outside mobile menu
     */
    handleOutsideClick(e) {
        const nav = document.getElementById('mainNav');
        const toggleBtn = document.getElementById('mobileMenuToggle');
        
        if (nav && toggleBtn && nav.classList.contains('pace-nav-open')) {
            // Check if click is outside the nav and toggle button
            if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        }
    }

    /**
     * Handle window resize
     */
    handleWindowResize() {
        // Close mobile menu when resizing to larger screens
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Escape key to close mobile menu or return to landing
        if (e.key === 'Escape') {
            const nav = document.getElementById('mainNav');
            if (nav && nav.classList.contains('pace-nav-open')) {
                this.closeMobileMenu();
            } else {
                this.showLanding();
            }
        }
        
        // Ctrl/Cmd + K for quick copy (when focused on code blocks)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.tagName === 'CODE') {
                this.copyToClipboard(focusedElement.textContent);
            }
        }
    }
}

// Global functions for backward compatibility and HTML onclick handlers
window.showExamples = function() {
    if (window.paceApp) {
        window.paceApp.showExamples();
    }
};

window.showLanding = function() {
    if (window.paceApp) {
        window.paceApp.showLanding();
    }
};

window.scrollToTop = function() {
    if (window.paceApp) {
        window.paceApp.scrollToTop();
    }
};

window.copyToClipboard = function(text) {
    if (window.paceApp) {
        window.paceApp.copyToClipboard(text);
    }
};

window.demoNotification = function(type) {
    const messages = {
        success: 'Operation completed successfully!',
        error: 'Code copied to clipboard! (Demo mode active)',
        warning: 'This is a demo warning notification.',
        info: 'This is a demo info notification.'
    };
    
    if (window.paceApp) {
        window.paceApp.showNotification(messages[type] || messages.info, type);
    }
};

/**
 * Theme Management Class
 * Handles dark/light theme switching, persistence, and system preference detection
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'auto';
        this.systemPreference = 'light';
        this.toggleButton = null;
        this.storageKey = 'pace-theme-preference';
    }

    /**
     * Initialize theme management
     */
    initialize() {
        console.log('🎨 Initializing theme management...');
        
        // Detect system preference
        this.detectSystemPreference();
        
        // Load saved preference
        this.loadSavedPreference();
        
        // Set up DOM elements
        this.setupDOMElements();
        
        // Apply initial theme
        this.applyTheme();
        
        // Listen for system preference changes
        this.setupSystemPreferenceListener();
        
        console.log('✅ Theme management initialized');
    }

    /**
     * Detect system color scheme preference
     */
    detectSystemPreference() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.systemPreference = darkModeQuery.matches ? 'dark' : 'light';
            console.log('🎯 System preference detected:', this.systemPreference);
        }
    }

    /**
     * Load saved theme preference from localStorage
     */
    loadSavedPreference() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved && ['light', 'dark', 'auto'].includes(saved)) {
                this.currentTheme = saved;
                console.log('💾 Loaded saved theme preference:', saved);
            }
        } catch (error) {
            console.warn('⚠️ Failed to load theme preference:', error);
        }
    }

    /**
     * Save theme preference to localStorage
     */
    savePreference(theme) {
        try {
            localStorage.setItem(this.storageKey, theme);
            console.log('💾 Theme preference saved:', theme);
        } catch (error) {
            console.warn('⚠️ Failed to save theme preference:', error);
        }
    }

    /**
     * Set up DOM elements for theme toggle
     */
    setupDOMElements() {
        this.toggleButton = document.getElementById('themeToggle');
        
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            // Add keyboard support
            this.toggleButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        let newTheme;
        
        if (this.currentTheme === 'auto') {
            // If on auto, switch to opposite of system preference
            newTheme = this.systemPreference === 'dark' ? 'light' : 'dark';
        } else if (this.currentTheme === 'light') {
            newTheme = 'dark';
        } else {
            newTheme = 'light';
        }
        
        this.setTheme(newTheme);
        
        // Announce theme change for screen readers
        this.announceThemeChange(newTheme);
    }

    /**
     * Set specific theme
     */
    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme();
        this.savePreference(theme);
        this.updateToggleButton();
    }

    /**
     * Apply the current theme to the document
     */
    applyTheme() {
        const body = document.body;
        const effectiveTheme = this.getEffectiveTheme();
        
        // Remove existing theme attributes
        body.removeAttribute('data-theme');
        
        // Apply new theme
        if (effectiveTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
        }
        
        console.log('🎨 Applied theme:', effectiveTheme);
    }

    /**
     * Get the effective theme (resolving 'auto' to actual theme)
     */
    getEffectiveTheme() {
        if (this.currentTheme === 'auto') {
            return this.systemPreference;
        }
        return this.currentTheme;
    }

    /**
     * Update the toggle button appearance
     */
    updateToggleButton() {
        if (!this.toggleButton) return;
        
        const effectiveTheme = this.getEffectiveTheme();
        const icon = this.toggleButton.querySelector('.pace-theme-toggle-icon');
        
        // Update button data attribute
        this.toggleButton.setAttribute('data-theme', effectiveTheme);
        
        // Update icon
        if (icon) {
            icon.className = effectiveTheme === 'dark' 
                ? 'pace-theme-toggle-icon fas fa-moon'
                : 'pace-theme-toggle-icon fas fa-sun';
        }
        
        // Update aria-label
        const label = effectiveTheme === 'dark' 
            ? 'Switch to light mode'
            : 'Switch to dark mode';
        this.toggleButton.setAttribute('aria-label', label);
        this.toggleButton.setAttribute('title', label);
    }

    /**
     * Set up listener for system preference changes
     */
    setupSystemPreferenceListener() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addEventListener('change', (e) => {
                this.systemPreference = e.matches ? 'dark' : 'light';
                console.log('🎯 System preference changed to:', this.systemPreference);
                
                // Re-apply theme if currently on auto
                if (this.currentTheme === 'auto') {
                    this.applyTheme();
                    this.updateToggleButton();
                }
            });
        }
    }

    /**
     * Announce theme change for accessibility
     */
    announceThemeChange(theme) {
        const announcement = `Theme changed to ${theme} mode`;
        
        // Create temporary announcement element
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'pace-sr-only';
        announcer.textContent = announcement;
        
        document.body.appendChild(announcer);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }

    /**
     * Get current theme information
     */
    getThemeInfo() {
        return {
            current: this.currentTheme,
            effective: this.getEffectiveTheme(),
            system: this.systemPreference
        };
    }
}

// Initialize application when this script loads
window.paceApp = new PaceApp();
window.paceApp.initialize();

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaceApp;
}
