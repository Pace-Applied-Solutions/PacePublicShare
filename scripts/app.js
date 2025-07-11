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
        
        // Landing page sign out button
        const signOutBtn = document.getElementById('signOutBtn');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => this.handleSignOut());
        }
        
        // Authenticated header sign out button
        const authenticatedSignOutBtn = document.getElementById('authenticatedSignOutBtn');
        if (authenticatedSignOutBtn) {
            authenticatedSignOutBtn.addEventListener('click', () => this.handleSignOut());
        }
        
        // View examples button
        const viewExamplesBtn = document.getElementById('viewExamplesBtn');
        if (viewExamplesBtn) {
            viewExamplesBtn.addEventListener('click', () => this.handleViewExamples());
        }

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Smooth scrolling for internal links
        document.addEventListener('click', (e) => this.handleInternalLinks(e));
    }

    /**
     * Handle sign in action
     */
    async handleSignIn() {
        if (this.auth) {
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
            // Demo mode - show examples without auth
            this.showExamples();
            this.showNotification('Demo mode active - showing examples without authentication.', 'info');
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
        if (this.isAuthenticated || !this.auth) {
            this.showExamples();
        } else {
            this.showNotification('Please sign in to access interactive examples.', 'warning');
        }
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
        const authenticatedHeader = document.getElementById('authenticatedHeader');
        const authenticatedSignOutBtn = document.getElementById('authenticatedSignOutBtn');
        
        if (authenticated && account) {
            // User is authenticated - show authenticated UI
            if (signInBtn) signInBtn.classList.add('pace-hidden');
            if (userProfile) {
                userProfile.classList.remove('pace-hidden');
                this.updateUserProfile(account, 'userProfile');
            }
            if (authenticatedHeader) {
                authenticatedHeader.classList.remove('pace-hidden');
                this.updateUserProfile(account, 'authenticatedUserProfile');
            }
            if (authenticatedSignOutBtn) {
                authenticatedSignOutBtn.addEventListener('click', () => this.handleSignOut());
            }
            if (viewExamplesBtn) {
                viewExamplesBtn.innerHTML = '<i class="fas fa-play"></i> View Examples';
                viewExamplesBtn.onclick = () => this.showExamples();
            }
            
            // Auto-show examples for authenticated users
            this.showExamples();
            this.showNotification(`Welcome back, ${account.name || 'User'}!`, 'success');
        } else {
            // User is not authenticated - show landing UI
            if (signInBtn) signInBtn.classList.remove('pace-hidden');
            if (userProfile) userProfile.classList.add('pace-hidden');
            if (authenticatedHeader) authenticatedHeader.classList.add('pace-hidden');
            if (viewExamplesBtn) {
                if (this.auth) {
                    viewExamplesBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In to View';
                    viewExamplesBtn.onclick = () => this.handleSignIn();
                } else {
                    viewExamplesBtn.innerHTML = '<i class="fas fa-play"></i> View Demo';
                    viewExamplesBtn.onclick = () => this.showExamples();
                }
            }
            
            this.showLanding();
        }
    }

    /**
     * Update user profile display
     */
    updateUserProfile(account, profileType = 'userProfile') {
        const prefix = profileType === 'authenticatedUserProfile' ? 'authenticated' : '';
        const userName = document.getElementById(`${prefix}UserName`);
        const userEmail = document.getElementById(`${prefix}UserEmail`);
        const userAvatar = document.getElementById(`${prefix}UserAvatar`);
        
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
        
        this.scrollToTop();
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
                    'Authentication is running in demo mode. <a href="./docs/AUTHENTICATION_SETUP.md" target="_blank" rel="noopener">Configure authentication</a> for production use.';
            } else if (!status.isValid) {
                configNotice.classList.remove('pace-notification-warning');
                configNotice.classList.add('pace-notification-error');
                configNotice.querySelector('strong').textContent = 'Configuration Error';
                configNotice.querySelector('p').textContent = 'Authentication configuration is invalid. Please check your Azure AD settings.';
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
        warning: 'Please sign in to access interactive examples.',
        info: 'Demo mode active - showing examples without authentication.'
    };
    
    if (window.paceApp) {
        window.paceApp.showNotification(messages[type] || messages.info, type);
    }
};

// Initialize application when this script loads
window.paceApp = new PaceApp();
window.paceApp.initialize();

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaceApp;
}
