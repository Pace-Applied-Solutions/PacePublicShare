/**
 * PRODUCTION CONFIGURATION for Pace Applied Solutions
 * This script generates configuration from environment variables for production deployment
 * 
 * Usage in GitHub Actions or Azure deployment:
 * 1. Set AZURE_CLIENT_ID and AZURE_TENANT_ID as secrets/environment variables
 * 2. This script will generate the appropriate config.local.js file
 */

const fs = require('fs');
const path = require('path');

// Get environment variables
const clientId = process.env.AZURE_CLIENT_ID;
const tenantId = process.env.AZURE_TENANT_ID;

// Validate required environment variables
if (!clientId || !tenantId) {
    console.error('❌ Missing required environment variables:');
    if (!clientId) console.error('   - AZURE_CLIENT_ID is required');
    if (!tenantId) console.error('   - AZURE_TENANT_ID is required');
    console.error('\n💡 Set these as GitHub Secrets or Azure App Settings');
    process.exit(1);
}

// Generate production configuration
const productionConfig = `/**
 * PRODUCTION CONFIGURATION - Generated from environment variables
 * DO NOT EDIT MANUALLY - This file is generated during deployment
 */

(function() {
    const localConfig = {
        // Microsoft Graph/Azure AD Configuration from environment variables
        msalConfig: {
            auth: {
                clientId: '${clientId}',
                authority: 'https://login.microsoftonline.com/${tenantId}',
                redirectUri: window.location.origin,
                postLogoutRedirectUri: window.location.origin
            }
        },
        
        // Environment settings
        environment: {
            name: 'production',
            debug: false,
            apiTimeout: 30000
        },
        
        // Feature flags for production
        features: {
            enableLogging: false,
            enableDebugMode: false,
            enableDevTools: false
        }
    };
    
    // Make configuration available globally
    if (typeof window !== 'undefined') {
        window.LOCAL_CONFIG = localConfig;
        console.log('🚀 Production configuration loaded');
    }
    
    // Export for module environments
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = localConfig;
    }
})();
`;

// Write the configuration file
const outputPath = path.join(__dirname, 'config.local.js');
fs.writeFileSync(outputPath, productionConfig, 'utf8');

console.log('✅ Production configuration generated successfully');
console.log(`📁 Config written to: ${outputPath}`);
console.log(`🔑 Client ID: ${clientId.substring(0, 8)}...`);
console.log(`🏢 Tenant ID: ${tenantId.substring(0, 8)}...`);
