# PACE Applied Solutions Style Guide

**Version 1.0** | July 2025  
Complete Design System Documentation

---

## Table of Contents

1. [Introduction](#introduction)
2. [Brand Assets](#brand-assets)
3. [Color System](#color-system)
4. [Dark Mode System](#dark-mode-system)
5. [Typography](#typography)
6. [Component Library](#component-library)
7. [Layout System](#layout-system)
8. [Authentication Components](#authentication-components)
9. [Responsive Design](#responsive-design)
10. [Implementation Guidelines](#implementation-guidelines)
11. [Code Examples](#code-examples)
12. [Accessibility Standards](#accessibility-standards)
13. [Development Resources](#development-resources)

---

## Introduction

### Purpose
This comprehensive style guide establishes visual and functional standards for all Pace Applied Solutions digital products. It ensures consistency across platforms while providing developers and designers with clear implementation guidelines.

### Design Philosophy
- **Enterprise-Grade**: Professional appearance suitable for business environments
- **Accessibility-First**: WCAG 2.1 AA compliant design patterns
- **Modern & Clean**: Contemporary design with subtle animations and micro-interactions
- **Responsive**: Mobile-first approach with progressive enhancement
- **Performance-Focused**: Optimized for fast loading and smooth interactions
- **Theme-Aware**: Built-in dark/light mode support with system preference detection

### Implementation Framework
The style guide is implemented as a modular CSS framework with the `pace-` namespace prefix, allowing easy integration into existing projects without conflicts. The framework includes a comprehensive theme system supporting both light and dark modes.

---

## Brand Assets

### Logo Variants

#### Primary Logo (Orange)
- **File**: `Pace-logo-orange.png`
- **Usage**: Primary brand element, light backgrounds
- **Color**: #EB9110 (PACE Orange)
- **Minimum Size**: 120px width
- **Format**: PNG with transparent background

#### Professional Logo (Blue)
- **File**: `Pace-logo-blue.png`
- **Usage**: Professional documents, secondary branding
- **Color**: Custom blue variant
- **Context**: Formal presentations, business communications

#### Reverse Logo (White)
- **File**: `Pace-logo-white.png`
- **Usage**: Dark backgrounds, overlay contexts
- **Color**: White (#FFFFFF)
- **Applications**: Hero sections, footer areas, dark themes

### Icon System

#### Favicon Package
Complete favicon implementation for all platforms:
- `favicon.ico` - Multi-size standard favicon (16x16, 32x32, 48x48)
- `favicon-16x16.png` - Small browser tab icon
- `favicon-32x32.png` - Standard browser tab icon
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `android-chrome-192x192.png` - Android home screen icon
- `android-chrome-512x512.png` - Android splash screen icon

#### Implementation
```html
<!-- Complete favicon implementation -->
<link rel="icon" type="image/x-icon" href="./assets/logo/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="./assets/logo/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="./assets/logo/favicon-32x32.png">
<link rel="apple-touch-icon" href="./assets/logo/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="./assets/logo/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="./assets/logo/android-chrome-512x512.png">
```

### CDN Access
All assets are available via GitHub CDN for external projects:
```
https://raw.githubusercontent.com/Pace-Applied-Solutions/PacePublicShare/main/assets/logo/[filename]
```

---

## Color System

### CSS Custom Properties
The color system is built using CSS custom properties for maintainability and theming:

```css
:root {
  /* Primary Brand Colors */
  --pace-primary-color: #EB9110;        /* PACE Orange */
  --pace-primary-dark: #d48209;         /* PACE Orange Dark */
  --pace-primary-light: #f4a84a;        /* PACE Orange Light */
  
  /* Secondary Colors */
  --pace-secondary-color: #505050;      /* Neutral Gray */
  --pace-accent-color: #0078d4;         /* Microsoft Blue */
  
  /* Neutral Palette */
  --pace-background-color: #f9f9f9;     /* Light Background */
  --pace-card-background: #ffffff;      /* Card Backgrounds */
  --pace-border-color: #e5e5e5;         /* Borders */
  
  /* Text Colors */
  --pace-text-color: #333333;           /* Primary Text */
  --pace-text-light: #666666;           /* Secondary Text */
  --pace-text-muted: #999999;           /* Muted Text */
  
  /* Status Colors */
  --pace-success-color: #28a745;        /* Success States */
  --pace-warning-color: #ffc107;        /* Warning States */
  --pace-error-color: #dc3545;          /* Error States */
  --pace-info-color: #17a2b8;           /* Info States */
  
  /* Shadows and Effects */
  --pace-shadow-color: rgba(0,0,0,0.08);
  --pace-shadow-hover: rgba(0,0,0,0.15);
}
```

### Color Usage Guidelines

#### Primary Orange (#EB9110)
- **Primary Actions**: Call-to-action buttons, submit buttons
- **Brand Elements**: Logo, navigation highlights, key indicators
- **Interactive States**: Active states, selected items
- **Accessibility**: Contrast ratio 4.5:1 with white text

#### Secondary Gray (#505050)
- **Secondary Actions**: Cancel buttons, less important actions
- **Text Elements**: Headings, labels, secondary information
- **UI Elements**: Form controls, navigation items

#### Microsoft Blue (#0078d4)
- **System Integration**: Microsoft 365 authentication, external links
- **Information**: Help text, tooltips, informational messages
- **Navigation**: Breadcrumbs, pagination, tabs

---

## Dark Mode System

### Overview
The Pace Style Guide includes a comprehensive dark mode system that automatically adapts to user preferences while maintaining brand consistency and accessibility standards.

### Implementation Architecture

#### Theme Detection
The system supports three theme modes:
- **Light**: Explicitly selected light theme
- **Dark**: Explicitly selected dark theme  
- **Auto**: Follows system preference (`prefers-color-scheme`)

#### CSS Implementation
```css
/* Light theme (default) */
:root {
  --pace-background-color: #f9f9f9;
  --pace-card-background: #fff;
  --pace-text-color: #333;
  --pace-text-light: #666;
  --pace-border-color: #e5e5e5;
  --pace-shadow-color: rgba(0,0,0,0.08);
}

/* Dark theme overrides */
[data-theme="dark"] {
  --pace-background-color: #111827;
  --pace-card-background: #1F2937;
  --pace-text-color: #F9FAFB;
  --pace-text-light: #D1D5DB;
  --pace-border-color: #374151;
  --pace-shadow-color: rgba(0,0,0,0.3);
}

/* System preference detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Apply dark theme variables */
  }
}
```

#### Brand Color Preservation
The primary brand color (`--pace-primary-color: #EB9110`) remains consistent across both themes to maintain brand identity and recognition.

### JavaScript Theme Management

#### Theme Manager API
```javascript
// Access the theme manager
const themeManager = window.paceApp.themeManager;

// Set theme explicitly
themeManager.setTheme('dark');   // Force dark mode
themeManager.setTheme('light');  // Force light mode
themeManager.setTheme('auto');   // Follow system preference

// Get current theme information
const themeInfo = themeManager.getThemeInfo();
console.log(themeInfo.current);   // User's preference ('light', 'dark', 'auto')
console.log(themeInfo.effective); // Actually applied theme ('light', 'dark')
console.log(themeInfo.system);    // System preference ('light', 'dark')
```

#### Persistence
User theme preferences are automatically saved to `localStorage` and restored on page load.

### Theme Toggle Component

#### HTML Structure
```html
<div class="pace-theme-toggle">
  <label class="pace-theme-toggle-label" for="themeToggle">Theme</label>
  <button 
    id="themeToggle" 
    class="pace-theme-toggle-switch" 
    type="button"
    aria-label="Toggle dark mode"
    title="Toggle between light and dark theme"
  >
    <span class="pace-theme-toggle-handle">
      <i class="pace-theme-toggle-icon fas fa-sun"></i>
    </span>
  </button>
</div>
```

#### Visual States
- **Light Mode**: Sun icon, toggle positioned left
- **Dark Mode**: Moon icon, toggle positioned right
- **Smooth Transitions**: CSS transitions for all state changes

### Accessibility Features

#### WCAG 2.1 AA Compliance
- **Contrast Ratios**: All text maintains minimum 4.5:1 contrast ratio
- **Focus Management**: Proper focus indicators in both themes
- **Screen Reader Support**: Theme changes are announced to assistive technologies
- **Keyboard Navigation**: Full keyboard support for theme toggle

#### Color Considerations
```css
/* Dark theme specific accessibility improvements */
[data-theme="dark"] .pace-button:focus {
  box-shadow: 0 0 0 2px var(--pace-card-background), 0 0 0 4px var(--pace-primary-color);
}

[data-theme="dark"] .pace-input:focus {
  border-color: var(--pace-primary-color);
  box-shadow: 0 0 0 2px var(--pace-primary-color);
}
```

### Responsive Behavior

#### Mobile Optimization
- Theme toggle label hidden on mobile devices
- Touch-friendly button sizing
- Consistent behavior across all screen sizes

#### Media Query Support
```css
@media (max-width: 768px) {
  .pace-theme-toggle {
    margin-left: 0;
    margin-top: var(--pace-spacing-sm);
  }
  
  .pace-theme-toggle-label {
    display: none;
  }
}
```

### Testing and Validation

#### System Preference Testing
1. Change OS theme preference
2. Verify automatic theme switching (when set to 'auto')
3. Confirm user preference overrides system preference

#### Persistence Testing
1. Toggle theme manually
2. Refresh page
3. Verify theme preference is restored

#### Accessibility Testing
1. Test with screen readers
2. Verify keyboard navigation
3. Check color contrast ratios
4. Validate focus management

---

## Typography

### Font Stack
```css
font-family: 'Aptos', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
```

### Type Scale

#### Headings
```css
.pace-heading-1 {
  font-size: 1.75rem;    /* 28px */
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.pace-heading-2 {
  font-size: 1.5rem;     /* 24px */
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 0.875rem;
}

.pace-heading-3 {
  font-size: 1.25rem;    /* 20px */
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.75rem;
}

.pace-heading-4 {
  font-size: 1.125rem;   /* 18px */
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 0.625rem;
}
```

#### Body Text
```css
.pace-text-body {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;
  color: var(--pace-text-color);
}

.pace-text-small {
  font-size: 0.875rem;   /* 14px */
  line-height: 1.5;
  color: var(--pace-text-light);
}

.pace-text-large {
  font-size: 1.125rem;   /* 18px */
  line-height: 1.55;
  font-weight: 400;
}
```

### Usage Guidelines
- **Hierarchy**: Use heading levels semantically (H1 → H2 → H3 → H4)
- **Line Height**: Optimized for readability with adequate breathing room
- **Color Contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Responsive**: Font sizes scale appropriately across devices

---

## Component Library

### Buttons

#### Primary Button
```css
.pace-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 2.5rem;
}

.pace-button-primary {
  background-color: var(--pace-primary-color);
  color: white;
}

.pace-button-primary:hover {
  background-color: var(--pace-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px var(--pace-shadow-hover);
}
```

#### Button Variants
- `.pace-button-primary` - Main actions (orange)
- `.pace-button-secondary` - Secondary actions (gray)
- `.pace-button-outline` - Tertiary actions (outlined)
- `.pace-button-microsoft` - Microsoft integration (blue)
- `.pace-button-icon` - Icon-only buttons

### Cards

#### Basic Card
```css
.pace-card {
  background: var(--pace-card-background);
  border: 1px solid var(--pace-border-color);
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px var(--pace-shadow-color);
  transition: all 0.2s ease;
}

.pace-card:hover {
  box-shadow: 0 4px 8px var(--pace-shadow-hover);
  transform: translateY(-2px);
}

.pace-card-content {
  padding: 1.5rem;
}
```

### Form Elements

#### Input Fields
```css
.pace-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--pace-border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: var(--pace-card-background);
}

.pace-input:focus {
  outline: none;
  border-color: var(--pace-primary-color);
  box-shadow: 0 0 0 3px rgba(235, 145, 16, 0.1);
}
```

### Loading States

#### Spinner
```css
.pace-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--pace-border-color);
  border-top: 2px solid var(--pace-primary-color);
  border-radius: 50%;
  animation: pace-spin 1s linear infinite;
}

@keyframes pace-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## Layout System

### Grid System
```css
.pace-grid {
  display: grid;
  gap: 1.5rem;
}

.pace-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.pace-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.pace-grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

### Container System
```css
.pace-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .pace-container {
    padding: 0 2rem;
  }
}
```

### Spacing Scale
```css
:root {
  --pace-space-1: 0.25rem;    /* 4px */
  --pace-space-2: 0.5rem;     /* 8px */
  --pace-space-3: 0.75rem;    /* 12px */
  --pace-space-4: 1rem;       /* 16px */
  --pace-space-5: 1.25rem;    /* 20px */
  --pace-space-6: 1.5rem;     /* 24px */
  --pace-space-8: 2rem;       /* 32px */
  --pace-space-10: 2.5rem;    /* 40px */
  --pace-space-12: 3rem;      /* 48px */
}
```

---

## Authentication Components

### Microsoft 365 Integration

#### Authentication Demo Layout
```css
.pace-auth-demo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  overflow: hidden;
  min-height: 400px;
  display: flex;
}

.pace-auth-brand-section {
  flex: 1;
  background: rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pace-auth-login-section {
  flex: 1;
  background: var(--pace-card-background);
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### User Profile Component
```css
.pace-user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.1);
}

.pace-user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid var(--pace-border-color);
}
```

---

## Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
:root {
  --breakpoint-mobile: 320px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-large: 1200px;
}

/* Media Query Mixins */
@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1200px) {
  /* Large screen styles */
}
```

### Responsive Typography
```css
@media (max-width: 767px) {
  .pace-heading-1 { font-size: 1.5rem; }
  .pace-heading-2 { font-size: 1.25rem; }
  .pace-container { padding: 0 1rem; }
}
```

---

## Implementation Guidelines

### CSS Framework Integration

#### Basic Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Pace Style Guide CSS -->
  <link rel="stylesheet" href="pace-style-guide.css">
  
  <!-- FontAwesome for Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="pace-base">
  <!-- Your content here -->
</body>
</html>
```

#### Authentication Integration
```html
<!-- MSAL.js for Microsoft 365 -->
<script src="https://alcdn.msauth.net/browser/2.35.0/js/msal-browser.min.js"></script>

<!-- Pace Authentication Scripts -->
<script src="./scripts/config.js"></script>
<script src="./scripts/utils.js"></script>
<script src="./scripts/auth.js"></script>
```

#### Dark Mode Integration
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Pace Style Guide CSS -->
  <link rel="stylesheet" href="pace-style-guide.css">
  
  <!-- FontAwesome for Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Pace Scripts for Theme Management -->
  <script src="./scripts/app.js"></script>
</head>
<body class="pace-base">
  <header class="pace-page-header">
    <div class="pace-container">
      <h1 class="pace-page-title">Your Application</h1>
      
      <!-- Theme Toggle -->
      <div class="pace-theme-toggle">
        <label class="pace-theme-toggle-label" for="themeToggle">Theme</label>
        <button 
          id="themeToggle" 
          class="pace-theme-toggle-switch" 
          type="button"
          aria-label="Toggle dark mode"
          title="Toggle between light and dark theme"
        >
          <span class="pace-theme-toggle-handle">
            <i class="pace-theme-toggle-icon fas fa-sun"></i>
          </span>
        </button>
      </div>
    </div>
  </header>
  
  <div class="pace-container">
    <!-- Your theme-aware content here -->
  </div>
</body>
</html>
```

### JavaScript Usage
```javascript
// Initialize authentication
document.addEventListener('DOMContentLoaded', async function() {
  const auth = getAuth();
  
  // Set up authentication state listener
  auth.onAuthStateChanged((isAuthenticated, account) => {
    // Update UI based on auth state
  });
  
  // Sign in functionality
  document.getElementById('signInBtn').addEventListener('click', async () => {
    await auth.signIn();
  });
});
```

### Theme Management
```javascript
// Access theme manager after app initialization
const themeManager = window.paceApp.themeManager;

// Set theme programmatically
themeManager.setTheme('dark');   // Force dark mode
themeManager.setTheme('light');  // Force light mode
themeManager.setTheme('auto');   // Follow system preference

// Get current theme information
const themeInfo = themeManager.getThemeInfo();
console.log('Current theme:', themeInfo.current);   // User's preference
console.log('Effective theme:', themeInfo.effective); // Actually applied theme
console.log('System preference:', themeInfo.system);  // OS preference

// Listen for theme changes
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      console.log('Theme toggled:', themeManager.getThemeInfo().effective);
    });
  }
});
```

---

## Code Examples

### Basic Button Implementation
```html
<!-- Primary Action Button -->
<button class="pace-button pace-button-primary">
  <i class="fas fa-save"></i>
  Save Changes
</button>

<!-- Secondary Action Button -->
<button class="pace-button pace-button-secondary">
  <i class="fas fa-times"></i>
  Cancel
</button>
```

### Card Component
```html
<div class="pace-card">
  <div class="pace-card-content">
    <h4 class="pace-heading-4">Card Title</h4>
    <p class="pace-text-body">Card content goes here with proper spacing and typography.</p>
    <div class="pace-button-group">
      <button class="pace-button pace-button-primary">Action</button>
      <button class="pace-button pace-button-outline">Secondary</button>
    </div>
  </div>
</div>
```

### Form Implementation
```html
<form class="pace-form">
  <div class="pace-form-group">
    <label for="email" class="pace-label">Email Address</label>
    <input type="email" id="email" class="pace-input" placeholder="Enter your email">
  </div>
  
  <div class="pace-form-group">
    <label for="message" class="pace-label">Message</label>
    <textarea id="message" class="pace-input pace-textarea" placeholder="Your message"></textarea>
  </div>
  
  <div class="pace-button-group">
    <button type="submit" class="pace-button pace-button-primary">Send Message</button>
    <button type="reset" class="pace-button pace-button-secondary">Clear</button>
  </div>
</form>
```

### Grid Layout
```html
<div class="pace-container">
  <div class="pace-grid pace-grid-3">
    <div class="pace-card">
      <div class="pace-card-content">
        <h4 class="pace-heading-4">Feature One</h4>
        <p class="pace-text-body">Description of the first feature.</p>
      </div>
    </div>
    <div class="pace-card">
      <div class="pace-card-content">
        <h4 class="pace-heading-4">Feature Two</h4>
        <p class="pace-text-body">Description of the second feature.</p>
      </div>
    </div>
    <div class="pace-card">
      <div class="pace-card-content">
        <h4 class="pace-heading-4">Feature Three</h4>
        <p class="pace-text-body">Description of the third feature.</p>
      </div>
    </div>
  </div>
</div>
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Primary text**: 7.0:1 contrast ratio (AAA level)
- **Secondary text**: 4.5:1 contrast ratio (AA level)
- **UI elements**: 3.0:1 contrast ratio minimum

#### Keyboard Navigation
```css
.pace-button:focus,
.pace-input:focus {
  outline: 2px solid var(--pace-primary-color);
  outline-offset: 2px;
}
```

#### Screen Reader Support
```html
<!-- Proper labeling -->
<button class="pace-button pace-button-icon" aria-label="Close dialog">
  <i class="fas fa-times" aria-hidden="true"></i>
</button>

<!-- Status updates -->
<div class="pace-notification" role="alert" aria-live="polite">
  Success! Your changes have been saved.
</div>
```

#### Semantic HTML
- Use proper heading hierarchy (H1 → H2 → H3)
- Include landmark roles (main, nav, aside, footer)
- Provide alternative text for images
- Use form labels and fieldsets appropriately

---

## Development Resources

### File Structure
```
pace-style-guide/
├── pace-style-guide.css         # Complete CSS framework
├── examples.html                # Live component examples
├── scripts/
│   ├── auth.js                  # Authentication logic
│   ├── config.js                # Configuration settings
│   └── utils.js                 # Utility functions
└── assets/
    └── logo/                    # Brand assets
        ├── Pace-logo-orange.png
        ├── Pace-logo-blue.png
        ├── Pace-logo-white.png
        └── favicon.ico
```

### External Dependencies
- **MSAL.js 2.35.0** - Microsoft 365 authentication
- **FontAwesome 6.4.0** - Icon library
- **Modern CSS** - Grid, Flexbox, Custom Properties

### Browser Support
- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Graceful Degradation**: Basic functionality in older browsers

### Performance Considerations
- **CSS Size**: ~25KB minified
- **Load Time**: < 100ms on modern connections
- **Render Blocking**: Minimal above-the-fold impact
- **Animations**: Hardware-accelerated transforms

### Customization
The framework supports theming through CSS custom properties:
```css
:root {
  --pace-primary-color: #your-brand-color;
  --pace-font-family: 'Your-Font', sans-serif;
  --pace-border-radius: 8px;
}
```

---

## Conclusion

This style guide provides a comprehensive foundation for building consistent, accessible, and professional user interfaces using the Pace Applied Solutions design system. The modular CSS framework and authentication components enable rapid development while maintaining design quality and brand consistency.

For questions or contributions, please contact the Pace Applied Solutions development team.

**Document Version**: 1.0  
**Last Updated**: July 11, 2025  
**Authors**: Pace Applied Solutions Design Team
