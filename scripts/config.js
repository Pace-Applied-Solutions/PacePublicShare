/**
 * Configuration for Pace Applied Solutions Microsoft 365 Authentication
 * This file contains the PUBLIC configuration - no secrets should be stored here
 * Actual secrets are loaded from config.local.js (git-ignored)
 */

// Get local configuration if it was loaded (from config.local.js)
// config.local.js sets window.LOCAL_CONFIG if it exists
const LOCAL_CONFIG = (typeof window !== 'undefined' && window.LOCAL_CONFIG) ? window.LOCAL_CONFIG : {};

// Log configuration status
if (Object.keys(LOCAL_CONFIG).length > 0) {
    console.log('✅ Local configuration loaded successfully');
} else {
    console.warn('⚠️ Local configuration not found. Using demo/development settings.');
    console.warn('💡 For production, create config.local.js with actual Azure AD credentials.');
    console.warn('📖 See AUTHENTICATION_SETUP.md for complete instructions.');
}

const CONFIG = {
    // Microsoft Graph/Azure AD Configuration
    // Uses local config if available, otherwise falls back to demo/development values
    msalConfig: {
        auth: {
            // NEVER commit real client IDs to public repos
            clientId: LOCAL_CONFIG.msalConfig?.auth?.clientId || 'demo-client-id-replace-with-real',
            authority: LOCAL_CONFIG.msalConfig?.auth?.authority || 'https://login.microsoftonline.com/common',
            redirectUri: window.location.origin,
            postLogoutRedirectUri: window.location.origin
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: false
        }
    },
    
    // Microsoft Graph API scopes
    loginRequest: {
        scopes: [
            'openid',
            'profile',
            'User.Read',
            'User.ReadBasic.All',
            'email'
        ]
    },
    
    // Graph API endpoints
    graphConfig: {
        graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
        graphProfileEndpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value'
    },
    
    // Application settings
    app: {
        name: 'Pace Applied Solutions Style Guide',
        version: '1.0.0',
        description: 'Public style guide and component library with Microsoft 365 authentication',
        supportEmail: 'support@paceappliedsolutions.com'
    },
    
    // Environment settings (merged from local config)
    environment: {
        mode: LOCAL_CONFIG.environment?.mode || 'development',
        enableDebugLogging: LOCAL_CONFIG.environment?.enableDebugLogging || true,
        customApiEndpoint: LOCAL_CONFIG.environment?.customApiEndpoint || null
    },
    
    // Organization settings (merged from local config)
    organization: {
        tenantDomain: LOCAL_CONFIG.organization?.tenantDomain || 'demo.onmicrosoft.com',
        allowedDomains: LOCAL_CONFIG.organization?.allowedDomains || ['demo.com'],
        adminContact: LOCAL_CONFIG.organization?.adminContact || 'admin@demo.com'
    },
    
    // UI Configuration
    ui: {
        theme: {
            primaryColor: '#EB9110',
            secondaryColor: '#505050',
            accentColor: '#0078d4'
        },
        branding: {
            logoPath: '../assets/logo/Pace-logo-orange.png',
            companyName: 'Pace Applied Solutions',
            tagline: 'Advancing technology solutions for modern business challenges'
        }
    }
};

// Validation helper to check if configuration is properly set up
CONFIG.isValidConfiguration = function() {
    const clientId = this.msalConfig.auth.clientId;
    const authority = this.msalConfig.auth.authority;
    
    // Check if using demo/placeholder values
    if (clientId.includes('demo') || clientId.includes('replace') || clientId.includes('your-')) {
        return false;
    }
    
    if (authority.includes('common') && this.environment.mode === 'production') {
        return false;
    }
    
    return true;
};

// Helper to get configuration status for debugging
CONFIG.getConfigurationStatus = function() {
    const hasLocalConfig = Object.keys(LOCAL_CONFIG).length > 0;
    const clientId = this.msalConfig.auth.clientId;
    const authority = this.msalConfig.auth.authority;
    
    return {
        hasLocalConfig: hasLocalConfig,
        isValid: this.isValidConfiguration(),
        environment: this.environment.mode,
        clientIdSet: !clientId.includes('demo') && !clientId.includes('replace'),
        tenantSet: !authority.includes('common'),
        clientId: clientId.substring(0, 8) + '...', // Show first 8 chars for debugging
        authority: authority,
        configSource: hasLocalConfig ? 'config.local.js' : 'demo/fallback'
    };
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
