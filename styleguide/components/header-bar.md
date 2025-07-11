# Header Bar Component

## Overview
The header bar provides the main navigation and branding for the PACE System Documentation platform. It includes the logo, search functionality, and user profile controls.

## Visual Example
```
[🏠 PACE System] [        Search...        ] [👤 User Profile ▼]
```

## HTML Structure
```html
<header class="app-header">
  <div class="header-content">
    <!-- Left Section: Logo and Menu -->
    <div class="header-left">
      <button class="menu-toggle" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="logo">
        <a href="/">
          <img src="/assets/images/placeholder-logo-small.png" alt="PACE System" width="30" height="30">
          <span>PACE System</span>
        </a>
      </div>
    </div>

    <!-- Center Section: Search -->
    <div class="header-center">
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" id="search-input" placeholder="Search documentation..." autocomplete="off">
        <div class="search-results" id="search-results">
          <!-- Search results populated dynamically -->
        </div>
      </div>
    </div>

    <!-- Right Section: User Profile -->
    <div class="header-right">
      <div class="user-profile">
        <div class="user-avatar">
          <img src="/path/to/avatar.jpg" alt="User Avatar">
        </div>
        <div class="user-info-container">
          <div class="user-name">John Doe</div>
          <div class="user-email">john.doe@company.com</div>
        </div>
        <button class="user-menu-toggle">
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-name">John Doe</div>
            <div class="user-dropdown-email">john.doe@company.com</div>
          </div>
          <ul class="user-dropdown-menu">
            <li class="user-dropdown-item">
              <i class="fas fa-user"></i>
              Profile
            </li>
            <li class="user-dropdown-item">
              <i class="fas fa-cog"></i>
              Settings
            </li>
            <li class="user-dropdown-item">
              <i class="fas fa-sign-out-alt"></i>
              Sign Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</header>
```

## CSS Classes

### Main Header
- `.app-header` - Main header container
- `.header-content` - Inner content wrapper
- `.header-left` - Left section (logo/menu)
- `.header-center` - Center section (search)
- `.header-right` - Right section (user profile)

### Logo Section
- `.logo` - Logo container
- `.logo a` - Logo link wrapper
- `.logo span` - Logo text

### Menu Toggle
- `.menu-toggle` - Mobile menu button
- `.menu-toggle:hover` - Hover state

### Search Section
- `.search-container` - Search wrapper
- `.search-icon` - Search icon
- `#search-input` - Search input field
- `.search-results` - Results dropdown
- `.search-results.active` - Active results state

### User Profile Section
- `.user-profile` - User profile container
- `.user-avatar` - Avatar image container
- `.user-info-container` - User name/email wrapper
- `.user-name` - User display name
- `.user-email` - User email address
- `.user-menu-toggle` - Dropdown toggle button
- `.user-dropdown` - Dropdown menu
- `.user-dropdown.active` - Active dropdown state

## JavaScript Functionality

### Search Implementation
```javascript
// Search functionality
document.getElementById('search-input').addEventListener('input', function(e) {
  const query = e.target.value.trim();
  const resultsContainer = document.getElementById('search-results');
  
  if (query.length > 2) {
    // Perform search
    performSearch(query).then(results => {
      displaySearchResults(results, resultsContainer);
      resultsContainer.classList.add('active');
    });
  } else {
    resultsContainer.classList.remove('active');
  }
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
  const searchContainer = document.querySelector('.search-container');
  if (!searchContainer.contains(e.target)) {
    document.getElementById('search-results').classList.remove('active');
  }
});
```

### User Dropdown Implementation
```javascript
// User dropdown toggle
document.querySelector('.user-menu-toggle').addEventListener('click', function(e) {
  e.stopPropagation();
  const dropdown = document.querySelector('.user-dropdown');
  dropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const userProfile = document.querySelector('.user-profile');
  if (!userProfile.contains(e.target)) {
    document.querySelector('.user-dropdown').classList.remove('active');
  }
});
```

### Mobile Menu Toggle
```javascript
// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
});
```

## Design Specifications

### Measurements
- Header height: 70px
- Logo height: 30px
- Search input height: 40px
- User avatar size: 36px
- Dropdown width: 260px

### Colors
- Background: `var(--card-background)` (#fff)
- Text: `var(--text-color)` (#333)
- Logo text: `var(--text-color)` (#333)
- Search border: `var(--border-color)` (#e5e5e5)
- Search focus: `var(--primary-color)` (#EB9110)

### Typography
- Logo text: 17px, font-weight: 600
- User name: 14px, font-weight: 500
- User email: 12px, font-weight: 400
- Search placeholder: 14px, font-weight: 400

## Accessibility

### ARIA Labels
```html
<button class="menu-toggle" aria-label="Toggle navigation">
  <i class="fas fa-bars"></i>
</button>

<input type="text" id="search-input" 
       placeholder="Search documentation..." 
       autocomplete="off"
       aria-label="Search documentation">
```

### Keyboard Navigation
- Tab order: Menu toggle → Search input → User profile
- Enter key activates buttons
- Escape key closes dropdowns
- Arrow keys navigate dropdown items

### Screen Reader Support
- Logo has descriptive alt text
- Buttons have descriptive labels
- Dropdown states are announced
- Search results are announced

## Responsive Behavior

### Mobile (≤768px)
- Logo text hidden on small screens
- Search bar hidden on very small screens (≤480px)
- User info text hidden
- Menu toggle becomes primary navigation

### Tablet (769px-1024px)
- Full functionality maintained
- Slight padding adjustments

### Desktop (≥1025px)
- Full functionality
- Optimal spacing and sizing

## Usage Guidelines

### Do's
- Always include the logo and brand name
- Provide clear search functionality
- Show user context and profile access
- Maintain consistent spacing and alignment
- Use proper focus states for accessibility

### Don'ts
- Don't overcrowd the header with too many elements
- Don't use the header for content that should be in the sidebar
- Don't remove accessibility attributes
- Don't modify the logo without following brand guidelines

## Implementation Checklist

- [ ] Header structure implemented with semantic HTML
- [ ] Logo properly sized and linked
- [ ] Search functionality connected to backend
- [ ] User profile populated with real data
- [ ] Dropdown menus working correctly
- [ ] Mobile responsiveness tested
- [ ] Accessibility attributes added
- [ ] Keyboard navigation functional
- [ ] Focus states visible and accessible
