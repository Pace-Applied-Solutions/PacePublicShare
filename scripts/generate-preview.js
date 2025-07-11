/**
 * Preview Image Generator for Azure Static Web Apps
 * Generates environment-specific preview images for rich link previews
 * Can be enhanced to create dynamic preview images based on environment
 */

const fs = require('fs');
const path = require('path');

/**
 * Generate environment-specific meta tags and preview configurations
 */
function generatePreviewConfig() {
    // Get environment information
    const environment = process.env.NODE_ENV || 'development';
    const buildId = process.env.GITHUB_RUN_NUMBER || 'local';
    const prNumber = process.env.GITHUB_REF_NAME?.includes('refs/pull/') ? 
        process.env.GITHUB_REF_NAME.split('/')[2] : null;
    
    // Determine the deployment URL pattern
    let baseUrl = 'http://localhost:3000';
    
    if (environment === 'production') {
        baseUrl = 'https://white-mud-0cad69810.2.azurestaticapps.net';
    } else if (prNumber) {
        // Preview environment for PR
        baseUrl = `https://white-mud-0cad69810-${prNumber}.centralus.2.azurestaticapps.net`;
    }
    
    const config = {
        environment,
        buildId,
        prNumber,
        baseUrl,
        previewImage: `${baseUrl}/assets/preview.png`,
        timestamp: new Date().toISOString()
    };
    
    console.log('🖼️ Preview configuration generated:', config);
    
    // Update meta tags in the HTML file
    updateHtmlMetaTags(config);
    
    // Generate environment-specific manifest
    updateWebManifest(config);
    
    return config;
}

/**
 * Update HTML meta tags with environment-specific URLs
 * @param {object} config - Environment configuration
 */
function updateHtmlMetaTags(config) {
    const htmlPath = path.join(__dirname, '../index.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.warn('⚠️ index.html not found, skipping meta tag updates');
        return;
    }
    
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Update Open Graph URLs
    htmlContent = htmlContent.replace(
        /(<meta property="og:url" content=")[^"]*(")/g,
        `$1${config.baseUrl}/$2`
    );
    
    htmlContent = htmlContent.replace(
        /(<meta property="og:image" content=")[^"]*(")/g,
        `$1${config.previewImage}$2`
    );
    
    // Update Twitter Card URLs
    htmlContent = htmlContent.replace(
        /(<meta name="twitter:image" content=")[^"]*(")/g,
        `$1${config.previewImage}$2`
    );
    
    // Update canonical URL
    htmlContent = htmlContent.replace(
        /(<link rel="canonical" href=")[^"]*(")/g,
        `$1${config.baseUrl}/$2`
    );
    
    // Add environment badge to title for non-production
    if (config.environment !== 'production' && config.prNumber) {
        htmlContent = htmlContent.replace(
            /(<title>)(.*?)(<\/title>)/g,
            `$1$2 (Preview #${config.prNumber})$3`
        );
        
        // Update Open Graph title
        htmlContent = htmlContent.replace(
            /(<meta property="og:title" content=")(.*?)(")/g,
            `$1$2 (Preview #${config.prNumber})$3`
        );
        
        // Update Twitter title
        htmlContent = htmlContent.replace(
            /(<meta name="twitter:title" content=")(.*?)(")/g,
            `$1$2 (Preview #${config.prNumber})$3`
        );
    }
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log('✅ HTML meta tags updated with environment URLs');
}

/**
 * Update web manifest with environment-specific URLs
 * @param {object} config - Environment configuration
 */
function updateWebManifest(config) {
    const manifestPath = path.join(__dirname, '../site.webmanifest');
    
    if (!fs.existsSync(manifestPath)) {
        console.warn('⚠️ site.webmanifest not found, skipping manifest updates');
        return;
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Update start_url
    manifest.start_url = config.baseUrl + '/';
    
    // Update scope
    manifest.scope = config.baseUrl + '/';
    
    // Update icon URLs to be absolute
    manifest.icons = manifest.icons.map(icon => ({
        ...icon,
        src: config.baseUrl + '/' + icon.src.replace(/^\.\//, '')
    }));
    
    // Update screenshots
    if (manifest.screenshots) {
        manifest.screenshots = manifest.screenshots.map(screenshot => ({
            ...screenshot,
            src: config.baseUrl + '/' + screenshot.src.replace(/^\.\//, '')
        }));
    }
    
    // Add environment info for preview environments
    if (config.environment !== 'production' && config.prNumber) {
        manifest.name = `Pace Style Guide (Preview #${config.prNumber})`;
        manifest.short_name = `Pace #${config.prNumber}`;
    }
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Web manifest updated with environment URLs');
}

/**
 * Validate that preview image exists
 */
function validatePreviewImage() {
    const previewPath = path.join(__dirname, '../assets/preview.png');
    
    if (!fs.existsSync(previewPath)) {
        console.error('❌ Preview image not found at assets/preview.png');
        console.log('💡 Please ensure you have a preview.png file in the assets directory');
        console.log('📏 Recommended size: 1200x630 pixels for optimal social media preview');
        return false;
    }
    
    console.log('✅ Preview image found at assets/preview.png');
    return true;
}

// Main execution
if (require.main === module) {
    console.log('🚀 Generating preview configuration...');
    
    // Validate preview image exists
    if (!validatePreviewImage()) {
        process.exit(1);
    }
    
    // Generate configuration
    const config = generatePreviewConfig();
    
    console.log('✅ Preview configuration complete!');
    console.log('🔗 Preview URL:', config.previewImage);
    console.log('🌐 Base URL:', config.baseUrl);
}

module.exports = {
    generatePreviewConfig,
    updateHtmlMetaTags,
    updateWebManifest,
    validatePreviewImage
};
