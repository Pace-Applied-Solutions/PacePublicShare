# Content Cards Component

## Overview
Content cards are the primary container for displaying documentation content in the PACE System. They provide a consistent, modern layout with subtle shadows, hover effects, and responsive design.

## Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│                        Content Card                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                    Card Header                          │ │
│ │ System Security Documentation               [📄 PDF]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                    Card Content                         │ │
│ │                                                         │ │
│ │ This document provides comprehensive security           │ │
│ │ guidelines for the PACE system, including:              │ │
│ │                                                         │ │
│ │ • Authentication and authorization procedures           │ │
│ │ • Data encryption and protection measures               │ │
│ │ • Network security configurations                       │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                   Card Footer                           │ │
│ │ Last updated: Dec 15, 2024          [View Details →]   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## HTML Structure

### Basic Content Card
```html
<div class="content-section">
  <div class="section-card">
    <div class="card-header">
      <h2 class="card-title">System Security Documentation</h2>
      <div class="card-actions">
        <button class="btn-download-pdf" aria-label="Download PDF">
          <i class="fas fa-file-pdf"></i>
        </button>
      </div>
    </div>
    
    <div class="card-content">
      <div class="github-html-content">
        <p>This document provides comprehensive security guidelines for the PACE system, including:</p>
        <ul>
          <li>Authentication and authorization procedures</li>
          <li>Data encryption and protection measures</li>
          <li>Network security configurations</li>
        </ul>
      </div>
    </div>
    
    <div class="card-footer">
      <div class="card-meta">
        <span class="card-date">Last updated: Dec 15, 2024</span>
      </div>
      <div class="card-actions">
        <a href="#details" class="btn-secondary">
          <i class="fas fa-arrow-right"></i>
          View Details
        </a>
      </div>
    </div>
  </div>
</div>
```

### Home Page Card Grid
```html
<div class="home-page">
  <div class="content-header">
    <h1>PACE System Documentation</h1>
    <p class="description">
      Comprehensive documentation for the PACE system platform
    </p>
  </div>
  
  <div class="section-cards">
    <!-- Security Documentation Card -->
    <div class="section-card">
      <div class="card-icon">
        <i class="fas fa-shield-alt"></i>
      </div>
      <h2>Security Guidelines</h2>
      <p>
        Complete security protocols, authentication procedures, 
        and data protection measures for enterprise environments.
      </p>
      <div class="card-footer">
        <a href="#security" class="btn-secondary">
          <i class="fas fa-arrow-right"></i>
          View Documentation
        </a>
      </div>
    </div>
    
    <!-- API Documentation Card -->
    <div class="section-card">
      <div class="card-icon">
        <i class="fas fa-code"></i>
      </div>
      <h2>API Reference</h2>
      <p>
        Detailed API documentation with examples, endpoints, 
        and integration guidelines for developers.
      </p>
      <div class="card-footer">
        <a href="#api" class="btn-secondary">
          <i class="fas fa-arrow-right"></i>
          View Documentation
        </a>
      </div>
    </div>
    
    <!-- User Guide Card -->
    <div class="section-card">
      <div class="card-icon">
        <i class="fas fa-users"></i>
      </div>
      <h2>User Guide</h2>
      <p>
        Step-by-step instructions for end users, including 
        common workflows and troubleshooting tips.
      </p>
      <div class="card-footer">
        <a href="#guide" class="btn-secondary">
          <i class="fas fa-arrow-right"></i>
          View Documentation
        </a>
      </div>
    </div>
  </div>
</div>
```

### Card with Loading State
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

### Card with Error State
```html
<div class="section-card">
  <div class="card-error">
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Content Unavailable</h3>
      <p>Unable to load this content. Please try again later.</p>
      <button class="btn-secondary" onclick="retryLoad()">
        <i class="fas fa-redo"></i>
        Retry
      </button>
    </div>
  </div>
</div>
```

## CSS Classes

### Main Card Classes
- `.content-section` - Section wrapper
- `.section-card` - Main card container
- `.section-card:hover` - Hover state
- `.section-cards` - Grid container for multiple cards

### Card Structure Classes
- `.card-header` - Card header section
- `.card-content` - Main content area
- `.card-footer` - Footer section
- `.card-title` - Card title
- `.card-actions` - Action buttons container
- `.card-meta` - Metadata section
- `.card-date` - Date information

### Home Page Card Classes
- `.home-page .section-card` - Home page specific cards
- `.card-icon` - Icon container
- `.card-icon i` - Icon styling

### State Classes
- `.card-loading` - Loading state
- `.card-error` - Error state
- `.loading-container` - Loading content wrapper
- `.error-message` - Error message container

## Complete CSS Implementation

```css
/* Content Section Wrapper */
.content-section {
  scroll-margin-top: calc(var(--header-height) + var(--spacing-md));
  margin-bottom: var(--spacing-lg);
}

/* Section Card Base */
.section-card {
  background-color: var(--card-background);
  border-radius: var(--card-border-radius);
  box-shadow: 0 5px 15px var(--shadow-color);
  padding: var(--spacing-lg);
  overflow: hidden;
  transition: all var(--transition-speed) ease;
  border: 1px solid var(--border-color);
  position: relative;
  display: flex;
  flex-direction: column;
}

.section-card:hover {
  background-color: #faf8f3;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-color);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.card-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

/* Card Content */
.card-content {
  flex: 1;
  margin-bottom: var(--spacing-md);
}

.card-content .github-html-content {
  margin: 0;
}

.card-content p:first-child {
  margin-top: 0;
}

.card-content p:last-child {
  margin-bottom: 0;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-light);
  font-size: var(--font-size-sm);
}

.card-date {
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-date::before {
  content: "\f017";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: var(--text-light);
}

/* Home Page Cards */
.home-page .section-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  padding: 30px 25px;
}

.home-page .section-card h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-color);
}

.home-page .section-card p {
  margin-bottom: var(--spacing-md);
  color: var(--text-light);
  line-height: 1.6;
  flex-grow: 1;
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: rgba(235, 145, 16, 0.1);
  border-radius: 50%;
  margin: 0 auto 20px;
  transition: all var(--transition-speed) ease;
}

.card-icon i {
  font-size: 24px;
  color: var(--primary-color);
}

.home-page .section-card:hover .card-icon {
  background-color: rgba(235, 145, 16, 0.2);
  transform: scale(1.05);
}

.home-page .section-card:hover .card-icon i {
  transform: scale(1.1);
}

/* Section Cards Grid */
.section-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: var(--spacing-lg);
}

/* Loading State */
.card-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: var(--spacing-lg);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(235, 145, 16, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.loading-text {
  color: var(--text-light);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.card-error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: var(--spacing-lg);
}

.error-message {
  background-color: #fff5f5;
  border-left: 4px solid #e74c3c;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  padding: var(--spacing-lg);
  text-align: center;
  max-width: 400px;
}

.error-message i {
  font-size: 48px;
  color: #e74c3c;
  margin-bottom: 16px;
}

.error-message h3 {
  color: #e74c3c;
  margin-bottom: 12px;
  font-size: 18px;
}

.error-message p {
  color: var(--text-light);
  margin-bottom: 20px;
  line-height: 1.5;
}

/* Card Animations */
.section-card {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Progressive Loading */
.progressive-loaded {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-card {
    padding: 20px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .card-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .home-page .section-card {
    padding: 20px;
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 16px;
  }
  
  .card-icon i {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .section-card {
    padding: 16px;
  }
  
  .card-title {
    font-size: 18px;
  }
  
  .home-page .section-card h2 {
    font-size: 18px;
  }
  
  .card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

/* Print Styles */
@media print {
  .section-card {
    box-shadow: none;
    border: 1px solid #ccc;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .card-actions {
    display: none;
  }
  
  .section-card:hover {
    background-color: white;
    transform: none;
  }
}
```

## JavaScript Implementation

### Card Manager
```javascript
class CardManager {
  constructor() {
    this.cards = new Map();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
  }

  setupEventListeners() {
    // Card click handling
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.section-card');
      if (card && !e.target.closest('.card-actions')) {
        this.handleCardClick(card);
      }
    });

    // Retry button handling
    document.addEventListener('click', (e) => {
      if (e.target.matches('.retry-btn, .retry-btn *')) {
        const button = e.target.closest('.retry-btn');
        const cardId = button.dataset.cardId;
        this.retryLoadCard(cardId);
      }
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadCardContent(entry.target);
        }
      });
    }, {
      rootMargin: '50px'
    });

    // Observe all cards
    document.querySelectorAll('.section-card').forEach(card => {
      observer.observe(card);
    });
  }

  async loadCardContent(card) {
    const cardId = card.dataset.cardId;
    if (!cardId || this.cards.has(cardId)) return;

    try {
      this.showLoading(card);
      const content = await this.fetchCardContent(cardId);
      this.renderCard(card, content);
      this.cards.set(cardId, content);
    } catch (error) {
      this.showError(card, error.message);
    }
  }

  async fetchCardContent(cardId) {
    const response = await fetch(`/api/cards/${cardId}`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.statusText}`);
    }
    return response.json();
  }

  renderCard(card, content) {
    card.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">${content.title}</h2>
        <div class="card-actions">
          ${content.downloadUrl ? `
            <button class="btn-download-pdf" onclick="downloadPDF('${content.downloadUrl}')">
              <i class="fas fa-file-pdf"></i>
            </button>
          ` : ''}
        </div>
      </div>
      
      <div class="card-content">
        <div class="github-html-content">
          ${content.htmlContent}
        </div>
      </div>
      
      <div class="card-footer">
        <div class="card-meta">
          <span class="card-date">${this.formatDate(content.lastModified)}</span>
        </div>
        <div class="card-actions">
          <a href="${content.detailsUrl}" class="btn-secondary">
            <i class="fas fa-arrow-right"></i>
            View Details
          </a>
        </div>
      </div>
    `;
    
    card.classList.add('progressive-loaded');
  }

  showLoading(card) {
    card.innerHTML = `
      <div class="card-loading">
        <div class="loading-container">
          <div class="spinner"></div>
          <p class="loading-text">Loading content...</p>
        </div>
      </div>
    `;
  }

  showError(card, message) {
    const cardId = card.dataset.cardId;
    card.innerHTML = `
      <div class="card-error">
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Content Unavailable</h3>
          <p>${message}</p>
          <button class="btn-secondary retry-btn" data-card-id="${cardId}">
            <i class="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>
    `;
  }

  handleCardClick(card) {
    const link = card.querySelector('.btn-secondary');
    if (link) {
      link.click();
    }
  }

  retryLoadCard(cardId) {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (card) {
      this.cards.delete(cardId);
      this.loadCardContent(card);
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

// Initialize card manager
document.addEventListener('DOMContentLoaded', () => {
  new CardManager();
});
```

### Card Utilities
```javascript
// Utility functions for card operations
function createCard(data) {
  const card = document.createElement('div');
  card.className = 'section-card';
  card.dataset.cardId = data.id;
  
  card.innerHTML = `
    <div class="card-header">
      <h2 class="card-title">${data.title}</h2>
      <div class="card-actions">
        ${data.actions.map(action => `
          <button class="btn-${action.type}" onclick="${action.onclick}">
            <i class="fas fa-${action.icon}"></i>
            ${action.label}
          </button>
        `).join('')}
      </div>
    </div>
    
    <div class="card-content">
      ${data.content}
    </div>
    
    <div class="card-footer">
      <div class="card-meta">
        <span class="card-date">${data.date}</span>
      </div>
      <div class="card-actions">
        <a href="${data.detailsUrl}" class="btn-secondary">
          <i class="fas fa-arrow-right"></i>
          View Details
        </a>
      </div>
    </div>
  `;
  
  return card;
}

function downloadPDF(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = '';
  link.click();
}

function addCardToGrid(card, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.appendChild(card);
  }
}
```

## Usage Examples

### Dynamic Card Creation
```javascript
// Create and add a new card
const cardData = {
  id: 'security-guide',
  title: 'Security Guidelines',
  content: '<p>Comprehensive security protocols...</p>',
  date: 'Dec 15, 2024',
  detailsUrl: '/security-guide',
  actions: [
    {
      type: 'download-pdf',
      icon: 'file-pdf',
      label: '',
      onclick: 'downloadPDF("/docs/security.pdf")'
    }
  ]
};

const newCard = createCard(cardData);
addCardToGrid(newCard, 'section-cards');
```

### Card with Custom Actions
```html
<div class="section-card" data-card-id="custom-card">
  <div class="card-header">
    <h2 class="card-title">Custom Documentation</h2>
    <div class="card-actions">
      <button class="btn-icon" onclick="editCard('custom-card')" aria-label="Edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="btn-icon" onclick="shareCard('custom-card')" aria-label="Share">
        <i class="fas fa-share"></i>
      </button>
      <button class="btn-download-pdf" onclick="downloadPDF('/docs/custom.pdf')">
        <i class="fas fa-file-pdf"></i>
      </button>
    </div>
  </div>
  
  <div class="card-content">
    <div class="github-html-content">
      <p>This is custom documentation content...</p>
    </div>
  </div>
</div>
```

## Accessibility Features

### ARIA Attributes
```html
<div class="section-card" role="article" aria-labelledby="card-title-1">
  <div class="card-header">
    <h2 class="card-title" id="card-title-1">Security Guidelines</h2>
    <div class="card-actions">
      <button class="btn-download-pdf" 
              aria-label="Download Security Guidelines PDF">
        <i class="fas fa-file-pdf"></i>
      </button>
    </div>
  </div>
  
  <div class="card-content">
    <div class="github-html-content">
      <!-- Content -->
    </div>
  </div>
</div>
```

### Keyboard Navigation
- Tab navigation through interactive elements
- Enter key activation for buttons and links
- Proper focus management
- Skip links for screen readers

## Usage Guidelines

### Do's
- Use cards for related content grouping
- Provide clear, descriptive titles
- Include relevant metadata (dates, authors)
- Use consistent spacing and alignment
- Add loading states for dynamic content

### Don'ts
- Don't overcrowd cards with too much content
- Don't use cards for single pieces of information
- Don't forget responsive design
- Don't skip accessibility attributes
- Don't use inconsistent card heights in grids

## Implementation Checklist

- [ ] Card HTML structure implemented
- [ ] CSS styling applied
- [ ] JavaScript functionality connected
- [ ] Loading states working
- [ ] Error handling implemented
- [ ] Responsive design tested
- [ ] Accessibility features added
- [ ] Grid layout responsive
- [ ] Hover effects functional
- [ ] Print styles included
