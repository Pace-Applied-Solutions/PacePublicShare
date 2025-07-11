# Navigation Sidebar Component

## Overview
The sidebar provides hierarchical navigation for the PACE System Documentation platform. It features a fixed position layout, smooth transitions, and mobile-responsive behavior.

## Visual Layout
```
┌─────────────────────────┐
│ 🏠 Home                 │
│ ─────────────────────── │
│ 📄 Document Name 1      │
│   ├─ Section 1.1        │
│   ├─ Section 1.2        │
│   └─ Section 1.3        │
│                         │
│ 📄 Document Name 2      │
│   ├─ Section 2.1        │
│   ├─ Section 2.2        │
│   └─ Section 2.3        │
│                         │
│ 📄 Document Name 3      │
│   └─ Loading...         │
└─────────────────────────┘
```

## HTML Structure
```html
<aside class="sidebar" id="sidebar">
  <div class="toc-container">
    <!-- Home Link -->
    <div class="toc-home-link">
      <a href="#" class="toc-home-button" id="home-link">
        <i class="fas fa-home"></i>
        Home
      </a>
    </div>

    <!-- Navigation Title -->
    <h2 class="toc-title">Documentation</h2>

    <!-- Navigation List -->
    <ul class="toc-list" id="toc-list">
      <!-- Document Item -->
      <li class="toc-item">
        <a href="#section1" class="toc-link">
          <i class="fas fa-file-alt"></i>
          System Overview
        </a>
      </li>

      <!-- Document with Sections -->
      <li class="toc-item">
        <a href="#section2" class="toc-link">
          <i class="fas fa-file-alt"></i>
          Security Guidelines
        </a>
        <ul class="toc-subsection">
          <li class="toc-subitem">
            <a href="#section2-1">Authentication</a>
          </li>
          <li class="toc-subitem">
            <a href="#section2-2">Authorization</a>
          </li>
          <li class="toc-subitem">
            <a href="#section2-3">Data Protection</a>
          </li>
        </ul>
      </li>

      <!-- Loading State -->
      <li class="toc-item loading">
        <a href="#section3" class="toc-link">
          <i class="fas fa-file-alt"></i>
          API Documentation
          <span class="toc-spinner">
            <i class="fas fa-spinner fa-spin"></i>
          </span>
        </a>
      </li>
    </ul>
  </div>
</aside>

<!-- Mobile Overlay -->
<div class="sidebar-overlay" id="sidebar-overlay"></div>
```

## CSS Classes

### Main Sidebar Classes
- `.sidebar` - Main sidebar container
- `.sidebar.open` - Mobile open state
- `.toc-container` - Content wrapper
- `.toc-title` - Section title
- `.toc-list` - Navigation list
- `.toc-item` - Individual navigation item
- `.toc-item.active` - Active/current item
- `.toc-item.loading` - Loading state

### Home Link Classes
- `.toc-home-link` - Home section wrapper
- `.toc-home-button` - Home button/link
- `.toc-home-button:hover` - Hover state

### Navigation Link Classes
- `.toc-link` - Navigation link
- `.toc-link:hover` - Hover state
- `.toc-subsection` - Subsection list
- `.toc-subitem` - Subsection item

### Loading State Classes
- `.toc-spinner` - Loading spinner container
- `.fa-spinner` - FontAwesome spinner icon

### Mobile Classes
- `.sidebar-overlay` - Mobile background overlay
- `.sidebar-overlay.active` - Active overlay state

## JavaScript Implementation

### Navigation Management
```javascript
class SidebarNavigation {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.overlay = document.getElementById('sidebar-overlay');
    this.tocList = document.getElementById('toc-list');
    this.currentSection = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollSpy();
    this.loadNavigationData();
  }

  setupEventListeners() {
    // Mobile toggle
    document.querySelector('.menu-toggle').addEventListener('click', () => {
      this.toggleMobile();
    });

    // Overlay click to close
    this.overlay.addEventListener('click', () => {
      this.closeMobile();
    });

    // Navigation link clicks
    this.tocList.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        this.navigateToSection(e.target.getAttribute('href'));
      }
    });

    // Home link
    document.getElementById('home-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.navigateHome();
    });
  }

  toggleMobile() {
    this.sidebar.classList.toggle('open');
    this.overlay.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  }

  closeMobile() {
    this.sidebar.classList.remove('open');
    this.overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }

  async loadNavigationData() {
    try {
      const response = await fetch('/api/navigation');
      const data = await response.json();
      this.renderNavigation(data);
    } catch (error) {
      console.error('Failed to load navigation:', error);
      this.showError('Failed to load navigation');
    }
  }

  renderNavigation(data) {
    this.tocList.innerHTML = '';
    
    data.forEach(item => {
      const listItem = this.createNavigationItem(item);
      this.tocList.appendChild(listItem);
    });
  }

  createNavigationItem(item) {
    const li = document.createElement('li');
    li.className = 'toc-item';
    
    const link = document.createElement('a');
    link.href = `#${item.id}`;
    link.className = 'toc-link';
    link.innerHTML = `
      <i class="fas ${item.icon || 'fa-file-alt'}"></i>
      ${item.title}
    `;
    
    li.appendChild(link);
    
    // Add subsections if they exist
    if (item.sections && item.sections.length > 0) {
      const subList = document.createElement('ul');
      subList.className = 'toc-subsection';
      
      item.sections.forEach(section => {
        const subItem = document.createElement('li');
        subItem.className = 'toc-subitem';
        
        const subLink = document.createElement('a');
        subLink.href = `#${section.id}`;
        subLink.textContent = section.title;
        
        subItem.appendChild(subLink);
        subList.appendChild(subItem);
      });
      
      li.appendChild(subList);
    }
    
    return li;
  }

  navigateToSection(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      
      this.setActiveSection(sectionId);
      this.closeMobile(); // Close mobile menu after navigation
    }
  }

  setActiveSection(sectionId) {
    // Remove previous active states
    document.querySelectorAll('.toc-item.active').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active state to current section
    const activeLink = document.querySelector(`a[href="${sectionId}"]`);
    if (activeLink) {
      activeLink.closest('.toc-item').classList.add('active');
    }
    
    this.currentSection = sectionId;
  }

  setupScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            this.setActiveSection(`#${id}`);
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    // Observe all sections
    document.querySelectorAll('[id]').forEach(section => {
      observer.observe(section);
    });
  }

  showLoading(sectionId) {
    const item = document.querySelector(`a[href="#${sectionId}"]`).closest('.toc-item');
    item.classList.add('loading');
  }

  hideLoading(sectionId) {
    const item = document.querySelector(`a[href="#${sectionId}"]`).closest('.toc-item');
    item.classList.remove('loading');
  }

  showError(message) {
    const errorItem = document.createElement('li');
    errorItem.className = 'toc-item error';
    errorItem.innerHTML = `
      <div class="toc-error">
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
      </div>
    `;
    this.tocList.appendChild(errorItem);
  }
}

// Initialize sidebar navigation
document.addEventListener('DOMContentLoaded', () => {
  new SidebarNavigation();
});
```

### Dynamic Content Loading
```javascript
// Load section content dynamically
async function loadSectionContent(sectionId) {
  const navigation = new SidebarNavigation();
  
  try {
    navigation.showLoading(sectionId);
    
    const response = await fetch(`/api/content/${sectionId}`);
    const content = await response.json();
    
    // Render content
    renderSectionContent(content);
    
    // Update navigation
    navigation.setActiveSection(`#${sectionId}`);
    
  } catch (error) {
    console.error('Failed to load section:', error);
    showErrorMessage('Failed to load section content');
  } finally {
    navigation.hideLoading(sectionId);
  }
}
```

## Design Specifications

### Layout Measurements
- **Width**: 280px (desktop)
- **Position**: Fixed
- **Top**: 70px (below header)
- **Height**: calc(100vh - 70px)
- **Z-index**: 90

### Spacing
- **Container Padding**: 20px
- **Item Margin**: 6px bottom
- **Link Padding**: 8px 12px
- **Subsection Indent**: 20px

### Colors
- **Background**: `var(--card-background)` (#fff)
- **Border**: `var(--border-color)` (#e5e5e5)
- **Text**: `var(--text-light)` (#666)
- **Hover**: `var(--primary-color)` (#EB9110)
- **Active Background**: `rgba(235,145,16,0.12)`
- **Active Text**: `var(--primary-color)` (#EB9110)

### Typography
- **Title**: 14px, font-weight: 600
- **Links**: 14px, font-weight: 400
- **Active Links**: 14px, font-weight: 500

## Accessibility Features

### ARIA Labels
```html
<aside class="sidebar" role="navigation" aria-label="Documentation navigation">
  <div class="toc-container">
    <h2 class="toc-title">Documentation</h2>
    <ul class="toc-list" role="menu">
      <li class="toc-item" role="menuitem">
        <a href="#section1" aria-current="page">Section 1</a>
      </li>
    </ul>
  </div>
</aside>
```

### Keyboard Navigation
- Tab navigation through all links
- Enter key activates links
- Escape key closes mobile sidebar
- Arrow keys navigate between items

### Screen Reader Support
```javascript
// Announce section changes
function announceSection(sectionTitle) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = `Navigated to ${sectionTitle}`;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
```

## Responsive Design

### Mobile Behavior (≤768px)
```css
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 80vw;
    max-width: 320px;
    height: 100vh;
    z-index: 1001;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
  }
  
  .sidebar-overlay.active {
    display: block;
  }
}
```

### Touch Interactions
- Swipe gestures to open/close
- Touch-friendly target sizes
- Smooth scrolling behavior

## Usage Guidelines

### Do's
- Keep navigation hierarchy shallow (2-3 levels max)
- Use descriptive link text
- Provide loading states for dynamic content
- Maintain consistent iconography
- Test with keyboard navigation

### Don'ts
- Don't overcrowd with too many items
- Don't use generic link text like "Click here"
- Don't forget mobile responsiveness
- Don't skip loading states
- Don't make navigation too complex

## Implementation Checklist

- [ ] Sidebar HTML structure implemented
- [ ] Navigation data source connected
- [ ] Active section highlighting working
- [ ] Mobile toggle functionality
- [ ] Scroll spy implementation
- [ ] Loading states for dynamic content
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Responsive design tested
- [ ] Touch interactions working

## Performance Considerations

### Lazy Loading
```javascript
// Load navigation items as needed
class LazyNavigation {
  constructor() {
    this.loadedSections = new Set();
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.loadedSections.has(entry.target.id)) {
        this.loadSection(entry.target.id);
      }
    });
  }

  async loadSection(sectionId) {
    if (this.loadedSections.has(sectionId)) return;
    
    try {
      this.showLoading(sectionId);
      const content = await this.fetchSectionContent(sectionId);
      this.renderSection(sectionId, content);
      this.loadedSections.add(sectionId);
    } catch (error) {
      this.showError(sectionId, error.message);
    } finally {
      this.hideLoading(sectionId);
    }
  }
}
```

### Memory Management
- Clean up event listeners on component destruction
- Limit number of loaded sections
- Use efficient DOM manipulation
- Implement virtual scrolling for large lists
