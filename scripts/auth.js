/**
 * Microsoft 365 Authentication for Pace Applied Solutions
 * Provides seamless authentication integration with Microsoft Graph API
 * @requires MSAL.js 2.x library
 */

class PaceAuth {
    constructor() {
        this.msalInstance = null;
        this.account = null;
        this.isAuthenticated = false;
        this.authCallbacks = [];
        
        // Initialize MSAL
        this.initializeMSAL();
    }

    /**
     * Initialize Microsoft Authentication Library (MSAL)
     */
    async initializeMSAL() {
        try {
            // Validate configuration before proceeding
            if (!this.validateConfiguration()) {
                throw new Error('Invalid authentication configuration detected');
            }

            // Check if MSAL library is loaded
            if (typeof msal === 'undefined') {
                await this.loadMSALLibrary();
            }

            // Create MSAL instance
            this.msalInstance = new msal.PublicClientApplication(CONFIG.msalConfig);
            
            // Handle redirect response
            await this.handleRedirectResponse();
            
            // Check if user is already signed in
            await this.checkAuthState();
            
            console.log('MSAL initialized successfully');
            this.logConfigurationStatus();
        } catch (error) {
            console.error('Failed to initialize MSAL:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Dynamically load MSAL library if not already loaded
     */
    async loadMSALLibrary() {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src*="msal-browser"]')) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://alcdn.msauth.net/browser/2.35.0/js/msal-browser.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load MSAL library'));
            document.head.appendChild(script);
        });
    }

    /**
     * Handle redirect response from Azure AD
     */
    async handleRedirectResponse() {
        try {
            const response = await this.msalInstance.handleRedirectPromise();
            if (response) {
                this.account = response.account;
                this.isAuthenticated = true;
                this.notifyAuthCallbacks(true);
                PaceUtils.showNotification('Successfully signed in!', 'success');
            }
        } catch (error) {
            console.error('Redirect handling failed:', error);
            PaceUtils.showNotification('Sign-in failed. Please try again.', 'error');
        }
    }

    /**
     * Check current authentication state
     */
    async checkAuthState() {
        const accounts = this.msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            this.account = accounts[0];
            this.isAuthenticated = true;
            this.notifyAuthCallbacks(true);
        }
    }

    /**
     * Sign in user with Microsoft 365
     */
    async signIn() {
        try {
            PaceUtils.logInteraction('auth_signin_attempt');
            
            const loginResponse = await this.msalInstance.loginPopup(CONFIG.loginRequest);
            
            if (loginResponse) {
                this.account = loginResponse.account;
                this.isAuthenticated = true;
                this.notifyAuthCallbacks(true);
                
                PaceUtils.logInteraction('auth_signin_success', {
                    userEmail: this.account.username,
                    authMethod: 'popup'
                });
                
                PaceUtils.showNotification(`Welcome, ${this.account.name}!`, 'success');
                return loginResponse;
            }
        } catch (error) {
            console.error('Sign-in failed:', error);
            PaceUtils.logInteraction('auth_signin_failed', {
                error: error.message,
                errorCode: error.errorCode
            });
            
            if (error.errorCode === 'user_cancelled') {
                PaceUtils.showNotification('Sign-in was cancelled', 'info');
            } else {
                PaceUtils.showNotification('Sign-in failed. Please try again.', 'error');
            }
            throw error;
        }
    }

    /**
     * Sign out user
     */
    async signOut() {
        try {
            PaceUtils.logInteraction('auth_signout_attempt');
            
            const logoutRequest = {
                account: this.account,
                postLogoutRedirectUri: CONFIG.msalConfig.auth.postLogoutRedirectUri
            };

            await this.msalInstance.logoutPopup(logoutRequest);
            
            this.account = null;
            this.isAuthenticated = false;
            this.notifyAuthCallbacks(false);
            
            PaceUtils.logInteraction('auth_signout_success');
            PaceUtils.showNotification('Successfully signed out', 'success');
        } catch (error) {
            console.error('Sign-out failed:', error);
            PaceUtils.showNotification('Sign-out failed. Please try again.', 'error');
        }
    }

    /**
     * Get access token for Microsoft Graph API
     */
    async getAccessToken() {
        if (!this.isAuthenticated) {
            throw new Error('User not authenticated');
        }

        try {
            const silentRequest = {
                scopes: CONFIG.loginRequest.scopes,
                account: this.account
            };

            const response = await this.msalInstance.acquireTokenSilent(silentRequest);
            return response.accessToken;
        } catch (error) {
            console.error('Token acquisition failed:', error);
            
            // Try interactive token acquisition
            try {
                const response = await this.msalInstance.acquireTokenPopup(CONFIG.loginRequest);
                return response.accessToken;
            } catch (interactiveError) {
                console.error('Interactive token acquisition failed:', interactiveError);
                throw interactiveError;
            }
        }
    }

    /**
     * Get user profile information from Microsoft Graph
     */
    async getUserProfile() {
        try {
            const accessToken = await this.getAccessToken();
            
            const response = await fetch(CONFIG.graphConfig.graphMeEndpoint, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Graph API request failed: ${response.status}`);
            }

            const profile = await response.json();
            return profile;
        } catch (error) {
            console.error('Failed to get user profile:', error);
            throw error;
        }
    }

    /**
     * Get user profile photo
     */
    async getUserPhoto() {
        try {
            const accessToken = await this.getAccessToken();
            
            const response = await fetch(CONFIG.graphConfig.graphProfileEndpoint, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                return URL.createObjectURL(blob);
            } else {
                // Return default avatar if no photo available
                return this.getDefaultAvatar();
            }
        } catch (error) {
            console.error('Failed to get user photo:', error);
            return this.getDefaultAvatar();
        }
    }

    /**
     * Get default avatar for users without photos
     */
    getDefaultAvatar() {
        // Generate avatar based on user's initials
        if (this.account && this.account.name) {
            const initials = this.account.name
                .split(' ')
                .map(name => name.charAt(0))
                .join('')
                .toUpperCase()
                .slice(0, 2);
            
            // Create SVG avatar with initials
            const svg = `
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#EB9110"/>
                    <text x="20" y="26" font-family="Arial, sans-serif" font-size="14" 
                          font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
                </svg>
            `;
            
            return 'data:image/svg+xml;base64,' + btoa(svg);
        }
        
        // Fallback avatar
        return 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#ccc"/>
                <path d="M20 12c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 18c-4.4 0-8-1.8-8-4v-2c0-2.2 3.6-4 8-4s8 1.8 8 4v2c0 2.2-3.6 4-8 4z" fill="white"/>
            </svg>
        `);
    }

    /**
     * Register callback for authentication state changes
     */
    onAuthStateChanged(callback) {
        this.authCallbacks.push(callback);
    }

    /**
     * Notify all registered callbacks of auth state change
     */
    notifyAuthCallbacks(isAuthenticated) {
        this.authCallbacks.forEach(callback => {
            try {
                callback(isAuthenticated, this.account);
            } catch (error) {
                console.error('Auth callback error:', error);
            }
        });
    }

    /**
     * Check if current user has specific domain
     */
    isUserFromPaceDomain() {
        if (!this.account || !this.account.username) {
            return false;
        }
        
        // Check if user email ends with Pace Applied Solutions domain
        const paceDoмains = ['paceappliedsolutions.com', 'pace.com']; // Add actual Pace domains
        return paceDoмains.some(domain => this.account.username.toLowerCase().endsWith(`@${domain}`));
    }

    /**
     * Get authentication status
     */
    getAuthInfo() {
        return {
            isAuthenticated: this.isAuthenticated,
            account: this.account,
            isPaceUser: this.isUserFromPaceDomain()
        };
    }

    /**
     * Validate authentication configuration
     */
    validateConfiguration() {
        const status = CONFIG.getConfigurationStatus();
        
        if (!status.isValid) {
            console.warn('Authentication Configuration Issues Detected:');
            console.warn('- Has Local Config:', status.hasLocalConfig);
            console.warn('- Client ID Set:', status.clientIdSet);
            console.warn('- Tenant Set:', status.tenantSet);
            console.warn('- Environment:', status.environment);
            
            if (status.environment === 'production' && !status.isValid) {
                return false;
            }
            
            // Allow demo mode in development
            if (status.environment === 'development') {
                console.warn('Running in development mode with demo configuration');
                return true;
            }
        }
        
        return true;
    }

    /**
     * Log configuration status for debugging
     */
    logConfigurationStatus() {
        if (CONFIG.environment.enableDebugLogging) {
            const status = CONFIG.getConfigurationStatus();
            console.log('Authentication Configuration Status:', status);
        }
    }

    /**
     * Handle initialization errors with user-friendly messages
     */
    handleInitializationError(error) {
        const status = CONFIG.getConfigurationStatus();
        
        if (!status.hasLocalConfig) {
            PaceUtils.showNotification(
                'Authentication not configured. Please set up config.local.js for production use.',
                'warning'
            );
        } else if (!status.isValid) {
            PaceUtils.showNotification(
                'Authentication configuration is invalid. Please check your Azure AD settings.',
                'error'
            );
        } else {
            PaceUtils.showNotification(
                'Authentication system initialization failed. Please try refreshing the page.',
                'error'
            );
        }
    }
}

// Global authentication instance
let paceAuth = null;

/**
 * Initialize authentication system
 */
function initializeAuth() {
    if (!paceAuth) {
        paceAuth = new PaceAuth();
    }
    return paceAuth;
}

/**
 * Get authentication instance (singleton)
 */
function getAuth() {
    if (!paceAuth) {
        paceAuth = initializeAuth();
    }
    return paceAuth;
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuth);
    } else {
        initializeAuth();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PaceAuth, initializeAuth, getAuth };
}
