# Loading States Component

## Overview
Loading states provide visual feedback to users during asynchronous operations in the PACE System Documentation platform. They include spinners, progress indicators, and skeleton screens to maintain user engagement and system responsiveness.

## Visual Examples

### Basic Spinner
```
    ⟳
  Loading...
```

### Progress Bar
```
Loading documentation... 65%
████████████████████████████████░░░░░░░░░░░░░░░░
```

### Skeleton Screen
```
┌─────────────────────────────────────────────────────────────┐
│ ██████████████████████████████████████████████████████████  │
│                                                             │
│ ████████████████████████████████████████████████████████    │
│ ████████████████████████████████████████████████████████    │
│ ████████████████████████████████████████████████████████    │
│                                                             │
│ ████████████████████████████████████████████████████████    │
│ ████████████████████████████████████████████████████████    │
└─────────────────────────────────────────────────────────────┘
```

## HTML Structure

### Basic Loading Spinner
```html
<div class="loading-container">
  <div class="spinner"></div>
  <p class="loading-text">Loading content...</p>
</div>
```

### Loading with Progress
```html
<div class="loading-container">
  <div class="spinner"></div>
  <div class="loading-progress">
    <p class="progress-text">Loading documentation...</p>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: 65%"></div>
    </div>
    <p class="progress-percentage">65%</p>
  </div>
</div>
```

### Inline Loading
```html
<button class="btn-primary loading">
  <span class="btn-text">Submit</span>
  <span class="btn-loading">
    <i class="fas fa-spinner fa-spin"></i>
    Processing...
  </span>
</button>
```

### Table of Contents Loading
```html
<li class="toc-item loading">
  <a href="#section" class="toc-link">
    <i class="fas fa-file-alt"></i>
    Document Name
    <span class="toc-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </span>
  </a>
</li>
```

### Search Loading
```html
<div class="search-results active">
  <ul class="search-results-list">
    <li class="search-loading">
      <i class="fas fa-spinner fa-spin"></i>
      Searching...
    </li>
  </ul>
</div>
```

### Card Loading
```html
<div class="section-card">
  <div class="card-loading">
    <div class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading content...</p>
    </div>
  </div>
</div>
```

### Skeleton Screen
```html
<div class="skeleton-container">
  <div class="skeleton-header">
    <div class="skeleton-title"></div>
    <div class="skeleton-meta"></div>
  </div>
  <div class="skeleton-content">
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line medium"></div>
  </div>
</div>
```

### Progressive Loading
```html
<div class="progressive-loading">
  <div class="loading-step completed">
    <i class="fas fa-check"></i>
    <span>Loading metadata...</span>
  </div>
  <div class="loading-step active">
    <i class="fas fa-spinner fa-spin"></i>
    <span>Loading content...</span>
  </div>
  <div class="loading-step">
    <i class="fas fa-circle"></i>
    <span>Loading images...</span>
  </div>
</div>
```

## CSS Classes

### Basic Loading Classes
- `.loading-container` - Main loading wrapper
- `.spinner` - Rotating spinner
- `.loading-text` - Loading message text
- `.loading-progress` - Progress container

### Progress Bar Classes
- `.progress-text` - Progress description
- `.progress-bar-container` - Progress bar wrapper
- `.progress-bar` - Progress bar fill
- `.progress-percentage` - Percentage text

### Inline Loading Classes
- `.btn-loading` - Button loading state
- `.toc-spinner` - TOC loading spinner
- `.search-loading` - Search loading state
- `.card-loading` - Card loading state

### Skeleton Classes
- `.skeleton-container` - Skeleton wrapper
- `.skeleton-header` - Skeleton header
- `.skeleton-title` - Skeleton title
- `.skeleton-meta` - Skeleton metadata
- `.skeleton-content` - Skeleton content
- `.skeleton-line` - Skeleton text lines
- `.skeleton-line.short` - Short skeleton line
- `.skeleton-line.medium` - Medium skeleton line

### Progressive Loading Classes
- `.progressive-loading` - Progressive loading container
- `.loading-step` - Individual loading step
- `.loading-step.active` - Active step
- `.loading-step.completed` - Completed step

## Complete CSS Implementation

```css
/* Basic Loading Container */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--spacing-lg);
  text-align: center;
}

/* Spinner */
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(235, 145, 16, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite, fadeIn 0.5s forwards;
  margin-bottom: 15px;
  opacity: 0;
}

.loading-text {
  color: var(--text-light);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Progress Loading */
.loading-progress {
  width: 100%;
  max-width: 300px;
  margin-top: 15px;
}

.progress-text {
  font-size: var(--font-size-sm);
  margin-bottom: 8px;
  color: var(--text-light);
  text-align: center;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
  border-radius: 3px;
}

.progress-percentage {
  font-size: 12px;
  color: var(--text-light);
  text-align: center;
  margin: 0;
}

/* Button Loading */
.btn-loading {
  display: none;
  align-items: center;
  gap: 8px;
}

.btn.loading .btn-text {
  display: none;
}

.btn.loading .btn-loading {
  display: flex;
}

.btn.loading {
  cursor: not-allowed;
  opacity: 0.8;
}

/* TOC Loading */
.toc-item.loading > a {
  color: var(--text-light);
  pointer-events: none;
  opacity: 0.7;
  cursor: not-allowed;
  position: relative;
}

.toc-spinner {
  display: inline-block;
  margin-left: 0.5em;
  font-size: 0.95em;
  vertical-align: middle;
}

.toc-spinner .fa-spinner {
  color: var(--primary-color);
  animation: spin 1s linear infinite;
}

/* Search Loading */
.search-loading {
  padding: 20px;
  text-align: center;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.search-loading i {
  color: var(--primary-color);
  animation: spin 1s linear infinite;
}

/* Card Loading */
.card-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: var(--spacing-lg);
}

/* Skeleton Loading */
.skeleton-container {
  padding: var(--spacing-lg);
  animation: fadeIn 0.5s ease;
}

.skeleton-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.skeleton-title {
  width: 60%;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  animation: shimmer 2s infinite;
}

.skeleton-meta {
  width: 30%;
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.skeleton-line.short {
  width: 70%;
}

.skeleton-line.medium {
  width: 85%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Progressive Loading */
.progressive-loading {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: var(--spacing-lg);
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.loading-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: var(--text-light);
  font-size: var(--font-size-sm);
  transition: color var(--transition-speed) ease;
}

.loading-step i {
  width: 20px;
  text-align: center;
  color: #ccc;
}

.loading-step.active {
  color: var(--primary-color);
}

.loading-step.active i {
  color: var(--primary-color);
  animation: spin 1s linear infinite;
}

.loading-step.completed {
  color: #4CAF50;
}

.loading-step.completed i {
  color: #4CAF50;
}

/* Progressive Badge */
.progressive-badge {
  display: inline-block;
  background-color: #f0f0f0;
  color: var(--text-light);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 10px;
  transition: all var(--transition-speed) ease;
}

.progressive-badge.complete {
  background-color: #e6f7e6;
  color: #4CAF50;
}

.progressive-loaded {
  animation: fadeIn 0.5s ease;
}

/* Overlay Loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-overlay .loading-container {
  background-color: var(--card-background);
  border-radius: var(--card-border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-lg);
  min-height: auto;
}

/* Pulse Loading */
.pulse-loading {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Dots Loading */
.dots-loading {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.dots-loading .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary-color);
  animation: dotPulse 1.4s infinite ease-in-out;
}

.dots-loading .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dots-loading .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .loading-container {
    padding: var(--spacing-md);
    min-height: 150px;
  }
  
  .spinner {
    width: 36px;
    height: 36px;
    border-width: 3px;
  }
  
  .loading-progress {
    max-width: 250px;
  }
  
  .skeleton-container {
    padding: var(--spacing-md);
  }
  
  .progressive-loading {
    padding: var(--spacing-md);
  }
  
  .loading-step {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .loading-container {
    padding: 15px;
    min-height: 120px;
  }
  
  .spinner {
    width: 32px;
    height: 32px;
    border-width: 2px;
  }
  
  .loading-text {
    font-size: 13px;
  }
  
  .progress-bar-container {
    height: 4px;
  }
  
  .skeleton-title {
    height: 20px;
  }
  
  .skeleton-line {
    height: 14px;
  }
}

/* Print Styles */
@media print {
  .loading-container,
  .spinner,
  .loading-overlay,
  .skeleton-container,
  .progressive-loading {
    display: none !important;
  }
}
```

## JavaScript Implementation

### Loading Manager
```javascript
class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
    this.init();
  }

  init() {
    this.setupGlobalLoading();
  }

  setupGlobalLoading() {
    // Show loading overlay during page navigation
    window.addEventListener('beforeunload', () => {
      this.showGlobalLoading();
    });

    // Hide loading overlay when page is loaded
    window.addEventListener('load', () => {
      this.hideGlobalLoading();
    });
  }

  showLoading(elementId, options = {}) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const config = {
      type: 'spinner',
      message: 'Loading...',
      showProgress: false,
      overlay: false,
      ...options
    };

    const loadingHTML = this.createLoadingHTML(config);
    
    // Store original content
    this.loadingStates.set(elementId, {
      originalContent: element.innerHTML,
      config: config
    });

    // Show loading
    if (config.overlay) {
      this.showOverlay(loadingHTML);
    } else {
      element.innerHTML = loadingHTML;
    }

    element.classList.add('loading');
  }

  hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const state = this.loadingStates.get(elementId);
    if (state) {
      element.innerHTML = state.originalContent;
      element.classList.remove('loading');
      this.loadingStates.delete(elementId);
    }

    this.hideOverlay();
  }

  createLoadingHTML(config) {
    switch (config.type) {
      case 'spinner':
        return this.createSpinnerHTML(config);
      case 'progress':
        return this.createProgressHTML(config);
      case 'skeleton':
        return this.createSkeletonHTML(config);
      case 'dots':
        return this.createDotsHTML(config);
      default:
        return this.createSpinnerHTML(config);
    }
  }

  createSpinnerHTML(config) {
    return `
      <div class="loading-container">
        <div class="spinner"></div>
        <p class="loading-text">${config.message}</p>
      </div>
    `;
  }

  createProgressHTML(config) {
    return `
      <div class="loading-container">
        <div class="spinner"></div>
        <div class="loading-progress">
          <p class="progress-text">${config.message}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${config.progress || 0}%"></div>
          </div>
          <p class="progress-percentage">${config.progress || 0}%</p>
        </div>
      </div>
    `;
  }

  createSkeletonHTML(config) {
    return `
      <div class="skeleton-container">
        <div class="skeleton-header">
          <div class="skeleton-title"></div>
          <div class="skeleton-meta"></div>
        </div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line medium"></div>
        </div>
      </div>
    `;
  }

  createDotsHTML(config) {
    return `
      <div class="loading-container">
        <div class="dots-loading">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <p class="loading-text">${config.message}</p>
      </div>
    `;
  }

  updateProgress(elementId, progress) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const progressBar = element.querySelector('.progress-bar');
    const progressText = element.querySelector('.progress-percentage');

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (progressText) {
      progressText.textContent = `${progress}%`;
    }
  }

  showGlobalLoading(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'global-loading-overlay';
    overlay.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p class="loading-text">${message}</p>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  hideGlobalLoading() {
    const overlay = document.getElementById('global-loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  showOverlay(content) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loading-overlay';
    overlay.innerHTML = content;

    document.body.appendChild(overlay);
  }

  hideOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  showProgressiveLoading(elementId, steps) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const stepsHTML = steps.map((step, index) => `
      <div class="loading-step" data-step="${index}">
        <i class="fas fa-circle"></i>
        <span>${step}</span>
      </div>
    `).join('');

    element.innerHTML = `
      <div class="progressive-loading">
        ${stepsHTML}
      </div>
    `;

    return new ProgressiveLoader(element, steps);
  }
}

// Progressive Loader Class
class ProgressiveLoader {
  constructor(element, steps) {
    this.element = element;
    this.steps = steps;
    this.currentStep = -1;
  }

  nextStep() {
    if (this.currentStep >= 0) {
      const currentElement = this.element.querySelector(`[data-step="${this.currentStep}"]`);
      currentElement.classList.remove('active');
      currentElement.classList.add('completed');
      currentElement.querySelector('i').className = 'fas fa-check';
    }

    this.currentStep++;
    if (this.currentStep < this.steps.length) {
      const nextElement = this.element.querySelector(`[data-step="${this.currentStep}"]`);
      nextElement.classList.add('active');
      nextElement.querySelector('i').className = 'fas fa-spinner fa-spin';
    }
  }

  complete() {
    const activeElement = this.element.querySelector('.loading-step.active');
    if (activeElement) {
      activeElement.classList.remove('active');
      activeElement.classList.add('completed');
      activeElement.querySelector('i').className = 'fas fa-check';
    }
  }
}

// Initialize loading manager
const loadingManager = new LoadingManager();

// Utility functions
function showLoading(elementId, options) {
  loadingManager.showLoading(elementId, options);
}

function hideLoading(elementId) {
  loadingManager.hideLoading(elementId);
}

function updateProgress(elementId, progress) {
  loadingManager.updateProgress(elementId, progress);
}

function showGlobalLoading(message) {
  loadingManager.showGlobalLoading(message);
}

function hideGlobalLoading() {
  loadingManager.hideGlobalLoading();
}
```

## Usage Examples

### Basic Loading
```javascript
// Show loading
showLoading('content-area', {
  message: 'Loading documentation...'
});

// Hide loading after operation
setTimeout(() => {
  hideLoading('content-area');
}, 2000);
```

### Progress Loading
```javascript
// Show progress loading
showLoading('upload-area', {
  type: 'progress',
  message: 'Uploading document...',
  progress: 0
});

// Update progress
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  updateProgress('upload-area', progress);
  
  if (progress >= 100) {
    clearInterval(interval);
    hideLoading('upload-area');
  }
}, 500);
```

### Progressive Loading
```javascript
// Show progressive loading
const loader = loadingManager.showProgressiveLoading('content-area', [
  'Loading metadata...',
  'Loading content...',
  'Loading images...',
  'Finalizing...'
]);

// Simulate step completion
async function loadContent() {
  loader.nextStep(); // Loading metadata
  await delay(1000);
  
  loader.nextStep(); // Loading content
  await delay(1500);
  
  loader.nextStep(); // Loading images
  await delay(2000);
  
  loader.nextStep(); // Finalizing
  await delay(500);
  
  loader.complete();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Accessibility Features

### ARIA Attributes
```html
<div class="loading-container" role="status" aria-live="polite">
  <div class="spinner" aria-hidden="true"></div>
  <p class="loading-text">Loading content...</p>
</div>
```

### Screen Reader Support
```javascript
// Announce loading state changes
function announceLoading(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

## Usage Guidelines

### Do's
- Always provide loading feedback for operations > 200ms
- Use appropriate loading type for the operation
- Include descriptive loading messages
- Ensure loading states are accessible
- Test loading states across devices

### Don'ts
- Don't use loading states for instant operations
- Don't forget to hide loading states
- Don't use animated loading for print styles
- Don't overuse complex loading animations

## Implementation Checklist

- [ ] Loading HTML structures implemented
- [ ] CSS animations working
- [ ] JavaScript loading manager functional
- [ ] Progress updates working
- [ ] Accessibility attributes added
- [ ] Screen reader compatibility
- [ ] Responsive design tested
- [ ] Print styles included
- [ ] Error handling for failed loading
- [ ] Performance optimizations applied
