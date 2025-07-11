/**
 * LOCAL CONFIGURATION TEMPLATE for Pace Applied Solutions
 * 
 * IMPORTANT: This file is git-ignored and should contain your actual secrets
 * Copy this file to 'config.local.js' and fill in your actual values
 * 
 * Never commit actual secrets to the public repository!
 */

// Configuration object that will be merged with the main config
(function() {
    const localConfig = {
    // Microsoft Graph/Azure AD Configuration
    // Get these values from your Azure App Registration
    msalConfig: {
        auth: {
            // Your actual Azure AD Application (client) ID
            clientId: 'fb1875f3-2f54-4a98-9f38-91c215e777e2',
            
            // Your actual Azure AD Tenant ID (Directory ID)
            authority: 'https://login.microsoftonline.com/your-actual-tenant-id-here',
            
            // These should match your production URLs
            redirectUri: window.location.origin,
            postLogoutRedirectUri: window.location.origin
        }
    },
    
    // Environment-specific settings
    environment: {
        // 'development', 'staging', or 'production'
        mode: 'development',
        
        // Enable debug logging in development
        enableDebugLogging: true,
        
        // API endpoints (if different from default Microsoft Graph)
        customApiEndpoint: null
    },
    
    // Organization-specific settings
    organization: {
        // Your actual organization tenant domain
        tenantDomain: 'your-organization.onmicrosoft.com',
        
        // Allowed email domains for authentication
        allowedDomains: ['your-organization.com', 'your-organization.onmicrosoft.com'],
        
        // Admin contact information
        adminContact: 'admin@your-organization.com'
    }
    };

    // Make configuration available globally for browser environments
    if (typeof window !== 'undefined') {
        window.LOCAL_CONFIG = localConfig;
        console.log('✅ Local configuration loaded from config.local.js');
    }

    // Export configuration for use in other modules (Node.js environments)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = localConfig;
    }
})();
