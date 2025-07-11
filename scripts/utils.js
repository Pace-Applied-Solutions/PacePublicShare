/**
 * Utility Functions for Pace Applied Solutions Style Guide
 * Common helper functions for DOM manipulation, formatting, and UI interactions
 */

class PaceUtils {
    /**
     * Format date for display
     * @param {Date|string} date - Date to format
     * @returns {string} Formatted date string
     */
    static formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    /**
     * Create loading spinner element
     * @param {string} message - Loading message
     * @returns {HTMLElement} Loading spinner element
     */
    static createLoadingSpinner(message = 'Loading...') {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-animation">
                <div class="spinner-circle"></div>
            </div>
            <div class="spinner-message">${message}</div>
        `;
        return spinner;
    }

    /**
     * Show notification message
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info, warning)
     * @param {number} duration - Auto-hide duration in milliseconds
     */
    static showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add to page
        const container = document.getElementById('notification-container') || this.createNotificationContainer();
        container.appendChild(notification);

        // Auto-hide after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }

        return notification;
    }

    /**
     * Get appropriate icon for notification type
     * @param {string} type - Notification type
     * @returns {string} FontAwesome icon class
     */
    static getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-triangle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    /**
     * Create notification container if it doesn't exist
     * @returns {HTMLElement} Notification container element
     */
    static createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copied to clipboard!', 'success', 2000);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showNotification('Failed to copy to clipboard', 'error');
            return false;
        }
    }

    /**
     * Generate unique ID
     * @param {string} prefix - Optional prefix for ID
     * @returns {string} Unique ID
     */
    static generateId(prefix = 'pace') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} Validation result
     */
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Get URL parameters
     * @param {string} param - Parameter name
     * @returns {string|null} Parameter value
     */
    static getUrlParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    /**
     * Update URL parameter without page reload
     * @param {string} param - Parameter name
     * @param {string} value - Parameter value
     */
    static updateUrlParameter(param, value) {
        const url = new URL(window.location);
        if (value) {
            url.searchParams.set(param, value);
        } else {
            url.searchParams.delete(param);
        }
        window.history.replaceState({}, '', url);
    }

    /**
     * Create accessible button with proper ARIA attributes
     * @param {string} text - Button text
     * @param {Function} onClick - Click handler
     * @param {Object} options - Additional options
     * @returns {HTMLElement} Button element
     */
    static createAccessibleButton(text, onClick, options = {}) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = options.className || 'btn btn-primary';
        button.onclick = onClick;
        
        if (options.ariaLabel) {
            button.setAttribute('aria-label', options.ariaLabel);
        }
        
        if (options.disabled) {
            button.disabled = true;
        }
        
        return button;
    }

    /**
     * Log user interaction for analytics
     * @param {string} action - Action performed
     * @param {Object} data - Additional data
     */
    static logInteraction(action, data = {}) {
        // Log to console for development
        console.log('User Interaction:', {
            action,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...data
        });
        
        // In production, this would send to analytics service
        // Example: analytics.track(action, data);
    }
}

// CSS for notifications and loading spinners
const utilsCSS = `
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
    }

    .notification {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin-bottom: 10px;
        overflow: hidden;
        animation: slideInRight 0.3s ease-out;
    }

    .notification-success { border-left: 4px solid #28a745; }
    .notification-error { border-left: 4px solid #dc3545; }
    .notification-warning { border-left: 4px solid #ffc107; }
    .notification-info { border-left: 4px solid #17a2b8; }

    .notification-content {
        display: flex;
        align-items: center;
        padding: 15px;
        gap: 10px;
    }

    .notification-message {
        flex: 1;
        font-size: 14px;
        color: #333;
    }

    .notification-close {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding: 30px;
    }

    .spinner-animation {
        width: 40px;
        height: 40px;
    }

    .spinner-circle {
        width: 100%;
        height: 100%;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #EB9110;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .spinner-message {
        color: #666;
        font-size: 14px;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject CSS
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = utilsCSS;
    document.head.appendChild(style);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaceUtils;
}
