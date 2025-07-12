/**
 * Dynamic Meta Tag Manager for Rich Link Previews
 * Updates Open Graph and Twitter Card meta tags based on current environment
 * Supports Azure Static Web Apps with dynamic URLs for preview environments
 */

class MetaTagManager {
    constructor() {
        this.baseUrl = this.getCurrentBaseUrl();
        this.previewImagePath = '/assets/preview.png';
        this.logoPath = '/assets/logo/android-chrome-192x192.png';
        
        // Initialize dynamic meta tags
        this.updateDynamicMetaTags();
    }

    /**
     * Get the current base URL dynamically
     * @returns {string} Base URL for the current environment
     */
    getCurrentBaseUrl() {
        return window.location.origin;
    }

    /**
     * Update meta tags with current environment URLs
     */
    updateDynamicMetaTags() {
        const metaTags = [
            // Open Graph URLs
            { property: 'og:url', content: this.baseUrl + '/' },
            { property: 'og:image', content: this.baseUrl + this.previewImagePath },
            
            // Twitter Card URLs
            { name: 'twitter:image', content: this.baseUrl + this.previewImagePath },
            
            // Canonical URL
            { rel: 'canonical', href: this.baseUrl + '/' }
        ];

        metaTags.forEach(tag => this.updateMetaTag(tag));
        
        // Update manifest URL
        this.updateManifestUrl();
        
        // Log the updated URLs for debugging
        console.log('📱 Meta tags updated for environment:', {
            baseUrl: this.baseUrl,
            previewImage: this.baseUrl + this.previewImagePath,
            environment: this.getEnvironmentType()
        });
    }

    /**
     * Update or create a meta tag
     * @param {object} tagConfig - Configuration for the meta tag
     */
    updateMetaTag(tagConfig) {
        let selector = '';
        let element = null;

        // Handle different types of meta tags
        if (tagConfig.property) {
            selector = `meta[property="${tagConfig.property}"]`;
        } else if (tagConfig.name) {
            selector = `meta[name="${tagConfig.name}"]`;
        } else if (tagConfig.rel) {
            selector = `link[rel="${tagConfig.rel}"]`;
        }

        element = document.querySelector(selector);

        if (element) {
            // Update existing tag
            if (tagConfig.content) {
                element.setAttribute('content', tagConfig.content);
            } else if (tagConfig.href) {
                element.setAttribute('href', tagConfig.href);
            }
        } else {
            // Create new tag if it doesn't exist
            if (tagConfig.rel) {
                element = document.createElement('link');
                element.setAttribute('rel', tagConfig.rel);
                element.setAttribute('href', tagConfig.href);
            } else {
                element = document.createElement('meta');
                if (tagConfig.property) {
                    element.setAttribute('property', tagConfig.property);
                } else if (tagConfig.name) {
                    element.setAttribute('name', tagConfig.name);
                }
                element.setAttribute('content', tagConfig.content);
            }
            document.head.appendChild(element);
        }
    }

    /**
     * Update the manifest URL to use current environment
     */
    updateManifestUrl() {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
            manifestLink.href = this.baseUrl + '/site.webmanifest';
        }
    }

    /**
     * Get the current environment type
     * @returns {string} Environment type (production, preview, development)
     */
    getEnvironmentType() {
        const hostname = window.location.hostname;
        const allowedHostnames = [
            'localhost',
            '127.0.0.1',
            'azurestaticapps.net',
            'preview.azurestaticapps.net'
        ];
        
        if (allowedHostnames.includes(hostname)) {
            if (hostname === 'localhost' || hostname === '127.0.0.1') {
                return 'development';
            } else if (hostname === 'preview.azurestaticapps.net') {
                return 'preview';
            } else if (hostname === 'azurestaticapps.net') {
                return 'production';
            }
        }
        
        return 'unknown';
    }

    /**
     * Generate a dynamic preview image URL based on environment
     * This could be enhanced to create environment-specific preview images
     * @returns {string} Preview image URL
     */
    getEnvironmentPreviewImage() {
        const envType = this.getEnvironmentType();
        
        // For now, use the same preview image for all environments
        // This could be enhanced to generate different images per environment
        return this.baseUrl + this.previewImagePath;
    }

    /**
     * Update meta tags with custom title and description
     * @param {string} title - Custom title for the page
     * @param {string} description - Custom description for the page
     */
    updatePageMeta(title, description) {
        // Update page title
        document.title = title;
        
        // Update meta description
        this.updateMetaTag({ name: 'description', content: description });
        
        // Update Open Graph tags
        this.updateMetaTag({ property: 'og:title', content: title });
        this.updateMetaTag({ property: 'og:description', content: description });
        
        // Update Twitter Card tags
        this.updateMetaTag({ name: 'twitter:title', content: title });
        this.updateMetaTag({ name: 'twitter:description', content: description });
        
        console.log('📝 Page meta updated:', { title, description });
    }

    /**
     * Validate that all required meta tags are present
     * @returns {object} Validation results
     */
    validateMetaTags() {
        const requiredTags = [
            'og:title', 'og:description', 'og:image', 'og:url',
            'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'
        ];

        const validation = {
            valid: true,
            missing: [],
            present: []
        };

        requiredTags.forEach(tag => {
            const selector = tag.startsWith('og:') ? 
                `meta[property="${tag}"]` : 
                `meta[name="${tag}"]`;
            
            const element = document.querySelector(selector);
            
            if (element && element.getAttribute('content')) {
                validation.present.push(tag);
            } else {
                validation.missing.push(tag);
                validation.valid = false;
            }
        });

        return validation;
    }
}

// Global instance
let metaTagManager = null;

/**
 * Initialize the Meta Tag Manager
 */
function initializeMetaTags() {
    if (!metaTagManager) {
        metaTagManager = new MetaTagManager();
    }
    return metaTagManager;
}

/**
 * Get the Meta Tag Manager instance
 */
function getMetaTagManager() {
    if (!metaTagManager) {
        metaTagManager = initializeMetaTags();
    }
    return metaTagManager;
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMetaTags);
    } else {
        initializeMetaTags();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MetaTagManager, initializeMetaTags, getMetaTagManager };
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.MetaTagManager = MetaTagManager;
    window.getMetaTagManager = getMetaTagManager;
}
