# Authentication Components

## Overview
The authentication system provides secure user login and profile management for the PACE System Documentation platform. It includes modern split-screen design, error handling, and accessibility features.

## Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Brand Section (Blue)     │  Login Section (White)          │
│  ┌─────────────────────┐  │  ┌─────────────────────────────┐ │
│  │ [Logo]              │  │  │    Welcome Back             │ │
│  │                     │  │  │                             │ │
│  │ "Secure Document    │  │  │  [Sign In Button]           │ │
│  │  Management System" │  │  │                             │ │
│  │                     │  │  │  [Error Messages]           │ │
│  │ ✓ Feature 1         │  │  │                             │ │
│  │ ✓ Feature 2         │  │  │                             │ │
│  │ ✓ Feature 3         │  │  │                             │ │
│  └─────────────────────┘  │  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## HTML Structure

### Modern Split-Screen Layout
```html
<div id="auth-view">
  <div class="auth-background">
    <div class="auth-split-container">
      <!-- Brand Section -->
      <div class="auth-brand-section">
        <div class="brand-content">
          <img src="/assets/images/placeholder-logo.png" alt="PACE System" class="brand-logo">
          <h1 class="brand-tagline">Secure Document Management</h1>
          <p class="brand-description">
            Enterprise-grade documentation platform with advanced security, 
            version control, and collaborative features designed for modern businesses.
          </p>
          <div class="brand-features">
            <div class="feature-item">
              <i class="fas fa-shield-alt"></i>
              <span>Enterprise Security</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-code-branch"></i>
              <span>Version Control</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-users"></i>
              <span>Team Collaboration</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Login Section -->
      <div class="auth-login-section">
        <div class="login-content">
          <div class="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your documentation</p>
          </div>
          
          <div class="login-form">
            <button class="btn-primary" id="login-button">
              <i class="fas fa-sign-in-alt"></i>
              Sign In with Microsoft
            </button>
          </div>

          <!-- Error Display -->
          <div class="auth-error" id="auth-error" style="display: none;">
            <p id="auth-error-message"></p>
            <button class="btn-clear-session" id="clear-session-button">
              Clear Session & Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Simple Center Layout (Alternative)
```html
<div id="auth-view">
  <div class="auth-container">
    <img src="/assets/images/placeholder-logo.png" alt="PACE System" class="auth-logo">
    <h1>PACE System Documentation</h1>
    <p>Please sign in to access the documentation system</p>
    
    <button class="btn-primary" id="login-button">
      <i class="fas fa-sign-in-alt"></i>
      Sign In with Microsoft
    </button>

    <div class="auth-error" id="auth-error" style="display: none;">
      <p id="auth-error-message"></p>
      <button class="btn-clear-session" id="clear-session-button">
        Clear Session & Retry
      </button>
    </div>
  </div>
</div>
```

## CSS Classes

### Layout Classes
- `.auth-background` - Full-screen background container
- `.auth-split-container` - Split-screen layout container
- `.auth-brand-section` - Left brand section
- `.auth-login-section` - Right login section
- `.auth-container` - Simple centered container (alternative layout)

### Brand Section Classes
- `.brand-content` - Brand content wrapper
- `.brand-logo` - Brand logo image
- `.brand-tagline` - Main heading
- `.brand-description` - Descriptive text
- `.brand-features` - Feature list container
- `.feature-item` - Individual feature item

### Login Section Classes
- `.login-content` - Login content wrapper
- `.login-header` - Login header section
- `.login-form` - Form container
- `.btn-primary` - Primary action button
- `.auth-error` - Error message container
- `.btn-clear-session` - Error recovery button

## JavaScript Implementation

### Authentication Flow
```javascript
// Authentication state management
const authService = {
  async signIn() {
    try {
      // Show loading state
      this.showLoading();
      
      // Authenticate with Microsoft
      const result = await this.authenticateWithMicrosoft();
      
      if (result.success) {
        // Store user data
        localStorage.setItem('userProfile', JSON.stringify(result.user));
        
        // Redirect to main application
        this.showMainApp();
      } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.hideLoading();
    }
  },

  showError(message) {
    const errorElement = document.getElementById('auth-error');
    const errorMessage = document.getElementById('auth-error-message');
    
    errorMessage.textContent = message;
    errorElement.style.display = 'block';
  },

  clearError() {
    const errorElement = document.getElementById('auth-error');
    errorElement.style.display = 'none';
  },

  showLoading() {
    const button = document.getElementById('login-button');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  },

  hideLoading() {
    const button = document.getElementById('login-button');
    button.disabled = false;
    button.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In with Microsoft';
  },

  clearSession() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
};

// Event listeners
document.getElementById('login-button').addEventListener('click', () => {
  authService.signIn();
});

document.getElementById('clear-session-button').addEventListener('click', () => {
  authService.clearSession();
});
```

### Error Handling
```javascript
// Common authentication errors
const AUTH_ERRORS = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  ACCOUNT_LOCKED: 'Account temporarily locked. Please contact support.',
  PERMISSION_DENIED: 'Access denied. Please contact your administrator.'
};

function handleAuthError(error) {
  let message = AUTH_ERRORS.NETWORK_ERROR;
  
  if (error.code) {
    switch (error.code) {
      case 'invalid_credentials':
        message = AUTH_ERRORS.INVALID_CREDENTIALS;
        break;
      case 'session_expired':
        message = AUTH_ERRORS.SESSION_EXPIRED;
        break;
      case 'account_locked':
        message = AUTH_ERRORS.ACCOUNT_LOCKED;
        break;
      case 'permission_denied':
        message = AUTH_ERRORS.PERMISSION_DENIED;
        break;
    }
  }
  
  authService.showError(message);
}
```

## Design Specifications

### Split-Screen Layout
- **Container**: 1200px max-width, 600px height
- **Brand Section**: 60% width, blue gradient background
- **Login Section**: 40% width, white background
- **Border Radius**: 12px
- **Shadow**: 0 10px 30px rgba(0, 0, 0, 0.08)

### Brand Section
- **Background**: Linear gradient from #0c2e55 to #0a4a8b
- **Logo Size**: 120px width
- **Title**: 28px, font-weight: 600
- **Description**: 15px, opacity: 0.9
- **Feature Icons**: 18px, in 40px containers

### Login Section
- **Padding**: 60px 40px
- **Title**: 28px, font-weight: 600
- **Button**: 44px height, 30px border-radius
- **Error Background**: rgba(231, 76, 60, 0.08)

### Colors
- **Brand Background**: `linear-gradient(135deg, #0c2e55 0%, #0a4a8b 100%)`
- **Login Background**: `#ffffff`
- **Button Background**: `var(--primary-color)` (#EB9110)
- **Button Hover**: `var(--primary-dark)` (#d48209)
- **Error Border**: `#e74c3c`
- **Error Background**: `rgba(231, 76, 60, 0.08)`

## Accessibility Features

### ARIA Labels
```html
<button class="btn-primary" 
        id="login-button"
        aria-label="Sign in with Microsoft account">
  <i class="fas fa-sign-in-alt"></i>
  Sign In with Microsoft
</button>

<div class="auth-error" 
     id="auth-error" 
     role="alert" 
     aria-live="polite"
     style="display: none;">
  <p id="auth-error-message"></p>
</div>
```

### Keyboard Navigation
- Tab order: Sign in button → Clear session button (if visible)
- Enter key activates buttons
- Error messages announced to screen readers

### Focus Management
```javascript
// Focus management for error states
function showError(message) {
  const errorElement = document.getElementById('auth-error');
  const errorMessage = document.getElementById('auth-error-message');
  
  errorMessage.textContent = message;
  errorElement.style.display = 'block';
  
  // Focus the error for screen readers
  errorElement.focus();
}
```

## Responsive Design

### Mobile (≤768px)
```css
@media (max-width: 768px) {
  .auth-split-container {
    flex-direction: column;
    height: auto;
  }
  
  .auth-brand-section,
  .auth-login-section {
    width: 100%;
    padding: 30px 20px;
  }
  
  .brand-tagline {
    font-size: 22px;
  }
  
  .btn-primary {
    width: 100%;
  }
}
```

### Touch Targets
- Minimum button size: 44px height
- Adequate spacing between interactive elements
- Touch-friendly hover states

## Usage Guidelines

### Do's
- Always provide clear error messages
- Include loading states for better UX
- Maintain consistent branding
- Provide session recovery options
- Test with screen readers

### Don'ts
- Don't expose sensitive error details
- Don't make authentication overly complex
- Don't forget mobile responsiveness
- Don't skip accessibility testing

## Implementation Checklist

- [ ] Authentication service integrated
- [ ] Error handling implemented
- [ ] Loading states functional
- [ ] Responsive design tested
- [ ] Accessibility features verified
- [ ] Screen reader compatibility confirmed
- [ ] Keyboard navigation working
- [ ] Brand elements properly placed
- [ ] Session management working
- [ ] Error recovery functional

## Security Considerations

### Best Practices
- Never store passwords in localStorage
- Use secure session tokens
- Implement proper error handling without exposing system details
- Validate all user inputs
- Use HTTPS for all authentication requests

### Error Messages
- Keep error messages generic to avoid information disclosure
- Log detailed errors server-side for debugging
- Provide helpful recovery options
- Rate limit authentication attempts
