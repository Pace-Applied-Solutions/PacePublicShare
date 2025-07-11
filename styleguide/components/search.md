# Search Component

## Overview
The search component provides real-time search functionality across all documentation content. It features an intuitive dropdown interface with grouped results, highlighting, and keyboard navigation.

## Visual Layout
```
┌─────────────────────────────────────────────────────┐
│ 🔍 Search documentation...                          │
└─────────────────────────────────────────────────────┘
                       ↓ (when typing)
┌─────────────────────────────────────────────────────┐
│ Search Results (12 found)                           │
│ ─────────────────────────────────────────────────── │
│ 📄 System Overview                                  │
│    ...security **measures** for data protection... │
│                                                     │
│ 📄 API Documentation                                │
│    ...authentication **measures** required for...  │
│                                                     │
│ 📄 User Guide                                       │
│    ...safety **measures** to consider when...      │
│                                                     │
│ 🔍 View all results →                              │
└─────────────────────────────────────────────────────┘
```

## HTML Structure
```html
<div class="search-container">
  <!-- Search Input -->
  <div class="search-input-wrapper">
    <i class="fas fa-search search-icon"></i>
    <input type="text" 
           id="search-input" 
           placeholder="Search documentation..." 
           autocomplete="off"
           aria-label="Search documentation"
           aria-describedby="search-help">
    <button class="search-clear" id="search-clear" aria-label="Clear search">
      <i class="fas fa-times"></i>
    </button>
  </div>

  <!-- Search Results Dropdown -->
  <div class="search-results" id="search-results" role="listbox" aria-label="Search results">
    <!-- Results Header -->
    <div class="search-results-header">
      <span id="search-results-count">12 results found</span>
      <button class="search-close" id="search-close" aria-label="Close search results">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Results List -->
    <ul class="search-results-list" id="search-results-list">
      <!-- Document Group -->
      <li class="search-result-group">
        <div class="search-result-doc-title">System Overview</div>
        <ul class="search-result-items">
          <li class="search-result-item" role="option" data-section="system-overview-security">
            <div class="search-result-title">Security Measures</div>
            <p class="search-result-snippet">
              Comprehensive <span class="search-highlight">security</span> measures for data protection...
            </p>
          </li>
          <li class="search-result-item" role="option" data-section="system-overview-architecture">
            <div class="search-result-title">Architecture Overview</div>
            <p class="search-result-snippet">
              System architecture with <span class="search-highlight">security</span> considerations...
            </p>
          </li>
        </ul>
      </li>

      <!-- Another Document Group -->
      <li class="search-result-group">
        <div class="search-result-doc-title">API Documentation</div>
        <ul class="search-result-items">
          <li class="search-result-item" role="option" data-section="api-authentication">
            <div class="search-result-title">Authentication</div>
            <p class="search-result-snippet">
              API authentication requires <span class="search-highlight">security</span> tokens...
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- No Results State -->
    <div class="search-no-results" id="search-no-results" style="display: none;">
      <i class="fas fa-search"></i>
      <p>No results found for "<span id="search-query-display"></span>"</p>
      <p class="search-suggestion">Try different keywords or check spelling</p>
    </div>

    <!-- View All Results -->
    <div class="search-view-all">
      <button class="search-view-all-btn" id="search-view-all">
        <i class="fas fa-external-link-alt"></i>
        View all results
      </button>
    </div>
  </div>
</div>
```

## CSS Classes

### Main Container Classes
- `.search-container` - Main search wrapper
- `.search-input-wrapper` - Input field wrapper
- `.search-icon` - Search icon
- `.search-clear` - Clear button
- `.search-results` - Results dropdown
- `.search-results.active` - Active/visible results

### Input Field Classes
- `#search-input` - Main search input
- `#search-input:focus` - Focus state
- `.search-clear` - Clear search button

### Results Container Classes
- `.search-results-header` - Results header
- `.search-results-list` - Main results list
- `.search-result-group` - Document group container
- `.search-result-doc-title` - Document title
- `.search-result-items` - Items within a document

### Result Item Classes
- `.search-result-item` - Individual result item
- `.search-result-item:hover` - Hover state
- `.search-result-item.selected` - Keyboard selection
- `.search-result-title` - Result title
- `.search-result-snippet` - Result preview text
- `.search-highlight` - Highlighted search terms

### State Classes
- `.search-no-results` - No results message
- `.search-view-all` - View all results section
- `.search-loading` - Loading state

## JavaScript Implementation

### Search Service
```javascript
class SearchService {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.searchResultsList = document.getElementById('search-results-list');
    this.searchClear = document.getElementById('search-clear');
    this.searchClose = document.getElementById('search-close');
    this.noResults = document.getElementById('search-no-results');
    
    this.currentQuery = '';
    this.selectedIndex = -1;
    this.searchCache = new Map();
    this.searchTimeout = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }

  setupEventListeners() {
    // Search input events
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearchInput(e.target.value);
    });

    this.searchInput.addEventListener('focus', () => {
      if (this.currentQuery) {
        this.showResults();
      }
    });

    // Clear button
    this.searchClear.addEventListener('click', () => {
      this.clearSearch();
    });

    // Close button
    this.searchClose.addEventListener('click', () => {
      this.hideResults();
    });

    // Result item clicks
    this.searchResultsList.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (item) {
        this.selectResult(item);
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!this.searchResults.contains(e.target) && 
          !this.searchInput.contains(e.target)) {
        this.hideResults();
      }
    });

    // View all results
    document.getElementById('search-view-all').addEventListener('click', () => {
      this.viewAllResults();
    });
  }

  setupKeyboardNavigation() {
    this.searchInput.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.navigateResults(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.navigateResults(-1);
          break;
        case 'Enter':
          e.preventDefault();
          this.selectCurrentResult();
          break;
        case 'Escape':
          this.hideResults();
          break;
      }
    });
  }

  async handleSearchInput(query) {
    this.currentQuery = query.trim();
    
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Show/hide clear button
    this.searchClear.style.display = query ? 'block' : 'none';

    if (query.length < 2) {
      this.hideResults();
      return;
    }

    // Debounce search
    this.searchTimeout = setTimeout(() => {
      this.performSearch(this.currentQuery);
    }, 300);
  }

  async performSearch(query) {
    try {
      // Check cache first
      if (this.searchCache.has(query)) {
        this.displayResults(this.searchCache.get(query), query);
        return;
      }

      // Show loading state
      this.showLoading();

      // Perform search
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const results = await response.json();

      // Cache results
      this.searchCache.set(query, results);

      // Display results
      this.displayResults(results, query);
      
    } catch (error) {
      console.error('Search error:', error);
      this.showError('Search failed. Please try again.');
    }
  }

  displayResults(results, query) {
    this.hideLoading();
    
    if (results.length === 0) {
      this.showNoResults(query);
      return;
    }

    // Group results by document
    const groupedResults = this.groupResultsByDocument(results);
    
    // Clear previous results
    this.searchResultsList.innerHTML = '';
    
    // Render grouped results
    groupedResults.forEach(group => {
      const groupElement = this.createResultGroup(group, query);
      this.searchResultsList.appendChild(groupElement);
    });

    // Update results count
    document.getElementById('search-results-count').textContent = 
      `${results.length} result${results.length === 1 ? '' : 's'} found`;

    this.showResults();
  }

  groupResultsByDocument(results) {
    const groups = new Map();
    
    results.forEach(result => {
      if (!groups.has(result.document)) {
        groups.set(result.document, {
          title: result.document,
          items: []
        });
      }
      groups.get(result.document).items.push(result);
    });
    
    return Array.from(groups.values());
  }

  createResultGroup(group, query) {
    const groupElement = document.createElement('li');
    groupElement.className = 'search-result-group';
    
    const titleElement = document.createElement('div');
    titleElement.className = 'search-result-doc-title';
    titleElement.textContent = group.title;
    
    const itemsElement = document.createElement('ul');
    itemsElement.className = 'search-result-items';
    
    group.items.forEach(item => {
      const itemElement = this.createResultItem(item, query);
      itemsElement.appendChild(itemElement);
    });
    
    groupElement.appendChild(titleElement);
    groupElement.appendChild(itemsElement);
    
    return groupElement;
  }

  createResultItem(result, query) {
    const item = document.createElement('li');
    item.className = 'search-result-item';
    item.setAttribute('role', 'option');
    item.setAttribute('data-section', result.id);
    
    const title = document.createElement('div');
    title.className = 'search-result-title';
    title.textContent = result.title;
    
    const snippet = document.createElement('p');
    snippet.className = 'search-result-snippet';
    snippet.innerHTML = this.highlightSearchTerms(result.snippet, query);
    
    item.appendChild(title);
    item.appendChild(snippet);
    
    return item;
  }

  highlightSearchTerms(text, query) {
    const terms = query.toLowerCase().split(/\s+/);
    let highlightedText = text;
    
    terms.forEach(term => {
      if (term.length > 1) {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="search-highlight">$1</span>');
      }
    });
    
    return highlightedText;
  }

  navigateResults(direction) {
    const items = this.searchResultsList.querySelectorAll('.search-result-item');
    if (items.length === 0) return;
    
    // Remove previous selection
    if (this.selectedIndex >= 0) {
      items[this.selectedIndex].classList.remove('selected');
    }
    
    // Calculate new index
    this.selectedIndex += direction;
    
    if (this.selectedIndex < 0) {
      this.selectedIndex = items.length - 1;
    } else if (this.selectedIndex >= items.length) {
      this.selectedIndex = 0;
    }
    
    // Add new selection
    items[this.selectedIndex].classList.add('selected');
    items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
  }

  selectCurrentResult() {
    if (this.selectedIndex >= 0) {
      const items = this.searchResultsList.querySelectorAll('.search-result-item');
      this.selectResult(items[this.selectedIndex]);
    }
  }

  selectResult(item) {
    const sectionId = item.getAttribute('data-section');
    this.navigateToSection(sectionId);
    this.hideResults();
    this.searchInput.blur();
  }

  navigateToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add highlight effect
      targetElement.classList.add('highlight-section');
      setTimeout(() => {
        targetElement.classList.remove('highlight-section');
      }, 2000);
    }
  }

  showResults() {
    this.searchResults.classList.add('active');
    this.searchResults.setAttribute('aria-expanded', 'true');
  }

  hideResults() {
    this.searchResults.classList.remove('active');
    this.searchResults.setAttribute('aria-expanded', 'false');
    this.selectedIndex = -1;
  }

  showNoResults(query) {
    this.noResults.style.display = 'block';
    this.searchResultsList.style.display = 'none';
    document.getElementById('search-query-display').textContent = query;
    this.showResults();
  }

  showLoading() {
    this.searchResultsList.innerHTML = `
      <li class="search-loading">
        <i class="fas fa-spinner fa-spin"></i>
        Searching...
      </li>
    `;
    this.showResults();
  }

  hideLoading() {
    this.searchResultsList.style.display = 'block';
    this.noResults.style.display = 'none';
  }

  showError(message) {
    this.searchResultsList.innerHTML = `
      <li class="search-error">
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
      </li>
    `;
    this.showResults();
  }

  clearSearch() {
    this.searchInput.value = '';
    this.currentQuery = '';
    this.hideResults();
    this.searchClear.style.display = 'none';
    this.searchInput.focus();
  }

  viewAllResults() {
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(this.currentQuery)}`;
  }
}

// Initialize search service
document.addEventListener('DOMContentLoaded', () => {
  new SearchService();
});
```

## Design Specifications

### Input Field
- **Height**: 40px
- **Padding**: 10px 15px 10px 40px
- **Border**: 1px solid #e5e5e5
- **Border Radius**: 30px
- **Font Size**: 14px
- **Background**: #f9f9f9 (normal), #ffffff (focus)

### Search Icon
- **Position**: Absolute, left: 15px
- **Size**: 14px
- **Color**: #666

### Results Dropdown
- **Max Height**: 80vh
- **Background**: #ffffff
- **Border Radius**: 10px
- **Shadow**: 0 6px 20px rgba(0,0,0,0.08)
- **Z-index**: 110

### Result Items
- **Padding**: 12px 15px
- **Border Bottom**: 1px solid #e5e5e5
- **Hover Background**: rgba(235, 145, 16, 0.05)
- **Selected Background**: rgba(235, 145, 16, 0.1)

### Typography
- **Result Title**: 500 weight, 14px
- **Result Snippet**: 14px, #666
- **Document Title**: 600 weight, 14px, #EB9110
- **Highlight**: Background rgba(235, 145, 16, 0.2)

## Accessibility Features

### ARIA Attributes
```html
<input type="text" 
       id="search-input" 
       role="combobox"
       aria-expanded="false"
       aria-autocomplete="list"
       aria-describedby="search-help"
       aria-label="Search documentation">

<div class="search-results" 
     role="listbox" 
     aria-label="Search results">
  <li class="search-result-item" 
      role="option" 
      aria-selected="false">
    <!-- Result content -->
  </li>
</div>
```

### Keyboard Navigation
- **Arrow Keys**: Navigate through results
- **Enter**: Select current result
- **Escape**: Close results
- **Tab**: Move to next interactive element

### Screen Reader Support
```javascript
// Announce result count
function announceResults(count) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = `${count} search results available`;
  
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

## Performance Optimizations

### Debouncing
```javascript
// Debounce search input
let searchTimeout;
function debounceSearch(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch(query);
  }, 300);
}
```

### Caching
```javascript
// Cache search results
const searchCache = new Map();
const maxCacheSize = 100;

function cacheResults(query, results) {
  if (searchCache.size >= maxCacheSize) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  searchCache.set(query, results);
}
```

### Virtual Scrolling
```javascript
// Virtual scrolling for large result sets
class VirtualScrollSearch {
  constructor(container, itemHeight = 60) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight);
    this.scrollTop = 0;
    this.items = [];
  }

  renderVisibleItems() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleItems, this.items.length);
    
    // Render only visible items
    this.container.innerHTML = '';
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.createResultItem(this.items[i]);
      this.container.appendChild(item);
    }
  }
}
```

## Usage Guidelines

### Do's
- Provide immediate visual feedback
- Group results logically
- Highlight search terms
- Support keyboard navigation
- Show result counts
- Provide clear error messages

### Don'ts
- Don't search on every keystroke without debouncing
- Don't show too many results at once
- Don't forget loading states
- Don't ignore accessibility requirements
- Don't make the dropdown too wide

## Implementation Checklist

- [ ] Search input with proper styling
- [ ] Debounced search functionality
- [ ] Results dropdown with grouping
- [ ] Keyboard navigation support
- [ ] Search term highlighting
- [ ] Loading and error states
- [ ] Accessibility attributes
- [ ] Mobile responsive design
- [ ] Performance optimizations
- [ ] Cache management
- [ ] Screen reader compatibility
- [ ] Focus management
