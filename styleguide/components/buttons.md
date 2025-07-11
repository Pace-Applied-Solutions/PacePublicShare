# Button Components

## Overview
The PACE System uses a consistent button design language with two primary button types: primary actions and secondary actions. All buttons include accessibility features, hover states, and loading indicators.

## Button Types

### Primary Button
Used for main actions like "Sign In", "Save", "Submit", etc.

```html
<button class="btn-primary" type="button">
  <i class="fas fa-sign-in-alt"></i>
  Sign In
</button>
```

### Secondary Button
Used for secondary actions like "Cancel", "View More", "Learn More", etc.

```html
<button class="btn-secondary" type="button">
  <i class="fas fa-arrow-right"></i>
  Learn More
</button>
```

### Button with Loading State
```html
<button class="btn-primary" id="submit-btn" type="submit">
  <span class="btn-text">Submit</span>
  <span class="btn-loading" style="display: none;">
    <i class="fas fa-spinner fa-spin"></i>
    Processing...
  </span>
</button>
```

### Icon-Only Button
```html
<button class="btn-icon" aria-label="Close dialog">
  <i class="fas fa-times"></i>
</button>
```

### Button Group
```html
<div class="btn-group">
  <button class="btn-primary">Save</button>
  <button class="btn-secondary">Cancel</button>
</div>
```

## CSS Classes

### Primary Button Classes
- `.btn-primary` - Main primary button
- `.btn-primary:hover` - Hover state
- `.btn-primary:focus` - Focus state
- `.btn-primary:disabled` - Disabled state
- `.btn-primary.loading` - Loading state

### Secondary Button Classes
- `.btn-secondary` - Main secondary button
- `.btn-secondary:hover` - Hover state
- `.btn-secondary:focus` - Focus state
- `.btn-secondary:disabled` - Disabled state

### Special Button Classes
- `.btn-icon` - Icon-only button
- `.btn-clear-session` - Error recovery button
- `.btn-download-pdf` - Document download button
- `.btn-group` - Button group container

### State Classes
- `.btn-loading` - Loading state wrapper
- `.btn-text` - Button text wrapper
- `.loading` - Loading modifier class

## Complete CSS Implementation

```css
/* Button Base Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn i {
  margin-right: 8px;
  font-size: 1em;
}

.btn i:last-child {
  margin-right: 0;
  margin-left: 8px;
}

.btn i:only-child {
  margin: 0;
}

/* Primary Button */
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border-radius: 30px;
  padding: 12px 30px;
  box-shadow: 0 4px 10px rgba(235, 145, 16, 0.25);
  min-height: 44px;
  min-width: 120px;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(235, 145, 16, 0.35);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(235, 145, 16, 0.25);
}

.btn-primary:focus:not(:disabled) {
  box-shadow: 0 4px 10px rgba(235, 145, 16, 0.25), 0 0 0 3px rgba(235, 145, 16, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 30px;
  padding: 8px 20px;
  min-height: 44px;
  min-width: 120px;
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(235, 145, 16, 0.2);
}

.btn-secondary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-secondary:focus:not(:disabled) {
  box-shadow: 0 0 0 3px rgba(235, 145, 16, 0.3);
}

/* Icon Button */
.btn-icon {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all var(--transition-speed) ease;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-color);
}

.btn-icon:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Clear Session Button */
.btn-clear-session {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: background-color var(--transition-speed) ease;
}

.btn-clear-session:hover {
  background-color: #e0e0e0;
}

/* Download PDF Button */
.btn-download-pdf {
  background: #e53e3e;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  transition: background-color var(--transition-speed) ease;
}

.btn-download-pdf:hover {
  background: #c53030;
}

.btn-download-pdf i {
  font-size: 1.2em;
  margin: 0;
}

/* Button Group */
.btn-group {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.btn-group .btn {
  flex: 1;
  min-width: 0;
}

/* Loading States */
.btn-loading {
  display: none;
  align-items: center;
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

/* Size Variations */
.btn-small {
  padding: 6px 12px;
  font-size: 12px;
  min-height: 32px;
  min-width: 80px;
}

.btn-large {
  padding: 16px 32px;
  font-size: var(--font-size-md);
  min-height: 52px;
  min-width: 140px;
}

/* Full Width */
.btn-block {
  width: 100%;
  display: flex;
}

/* Danger Button */
.btn-danger {
  background-color: #e53e3e;
  color: white;
  border-radius: 6px;
  padding: 10px 20px;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c53030;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(229, 62, 62, 0.3);
}

/* Success Button */
.btn-success {
  background-color: #38a169;
  color: white;
  border-radius: 6px;
  padding: 10px 20px;
}

.btn-success:hover:not(:disabled) {
  background-color: #2f855a;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(56, 161, 105, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .btn-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    padding: 12px 20px;
  }
  
  .btn-group .btn {
    flex: none;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .btn {
    font-size: 14px;
  }
  
  .btn-small {
    min-width: 60px;
  }
  
  .btn-large {
    min-width: 100px;
  }
}
```

## JavaScript Implementation

### Button State Management
```javascript
class ButtonManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Handle all button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('.btn, .btn *')) {
        const button = e.target.closest('.btn');
        if (button && !button.disabled) {
          this.handleButtonClick(button, e);
        }
      }
    });

    // Handle form submissions
    document.addEventListener('submit', (e) => {
      const submitBtn = e.target.querySelector('button[type="submit"]');
      if (submitBtn) {
        this.showLoading(submitBtn);
      }
    });
  }

  handleButtonClick(button, event) {
    // Add ripple effect
    this.addRippleEffect(button, event);
    
    // Handle loading state if needed
    if (button.dataset.loading === 'true') {
      this.showLoading(button);
    }
  }

  showLoading(button, text = 'Loading...') {
    if (button.classList.contains('loading')) return;
    
    const originalText = button.innerHTML;
    const loadingHtml = `
      <span class="btn-loading">
        <i class="fas fa-spinner fa-spin"></i>
        ${text}
      </span>
    `;
    
    button.dataset.originalText = originalText;
    button.innerHTML = loadingHtml;
    button.classList.add('loading');
    button.disabled = true;
  }

  hideLoading(button) {
    if (!button.classList.contains('loading')) return;
    
    const originalText = button.dataset.originalText;
    button.innerHTML = originalText;
    button.classList.remove('loading');
    button.disabled = false;
    delete button.dataset.originalText;
  }

  addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.6);
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: ripple-animation 0.6s ease-out;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setButtonState(button, state) {
    button.classList.remove('loading', 'success', 'error');
    
    switch (state) {
      case 'loading':
        this.showLoading(button);
        break;
      case 'success':
        button.classList.add('success');
        button.innerHTML = '<i class="fas fa-check"></i> Success';
        setTimeout(() => this.resetButton(button), 2000);
        break;
      case 'error':
        button.classList.add('error');
        button.innerHTML = '<i class="fas fa-times"></i> Error';
        setTimeout(() => this.resetButton(button), 2000);
        break;
    }
  }

  resetButton(button) {
    this.hideLoading(button);
    button.classList.remove('success', 'error');
  }
}

// Initialize button manager
const buttonManager = new ButtonManager();

// Utility functions
function showButtonLoading(buttonId, text = 'Loading...') {
  const button = document.getElementById(buttonId);
  if (button) {
    buttonManager.showLoading(button, text);
  }
}

function hideButtonLoading(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    buttonManager.hideLoading(button);
  }
}

function setButtonSuccess(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    buttonManager.setButtonState(button, 'success');
  }
}

function setButtonError(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    buttonManager.setButtonState(button, 'error');
  }
}
```

### Ripple Effect CSS
```css
@keyframes ripple-animation {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.btn {
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  animation: ripple-animation 0.6s ease-out;
}
```

## Design Specifications

### Primary Button
- **Background**: #EB9110 (PACE Orange)
- **Text**: White
- **Padding**: 12px 30px
- **Border Radius**: 30px
- **Min Height**: 44px
- **Shadow**: 0 4px 10px rgba(235, 145, 16, 0.25)

### Secondary Button
- **Background**: Transparent
- **Text**: #EB9110
- **Border**: 2px solid #EB9110
- **Padding**: 8px 20px
- **Border Radius**: 30px
- **Min Height**: 44px

### Icon Button
- **Background**: None
- **Padding**: 8px
- **Border Radius**: 50%
- **Min Size**: 44x44px
- **Color**: #666

## Accessibility Features

### ARIA Attributes
```html
<button class="btn-primary" 
        aria-label="Sign in to your account"
        aria-describedby="signin-help">
  <i class="fas fa-sign-in-alt"></i>
  Sign In
</button>

<button class="btn-icon" 
        aria-label="Close dialog"
        aria-expanded="false">
  <i class="fas fa-times"></i>
</button>
```

### Keyboard Support
- Tab navigation
- Enter/Space key activation
- Focus indicators
- Proper focus management

### Screen Reader Support
```javascript
// Announce button state changes
function announceButtonState(button, state) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  
  switch (state) {
    case 'loading':
      announcement.textContent = 'Loading, please wait';
      break;
    case 'success':
      announcement.textContent = 'Action completed successfully';
      break;
    case 'error':
      announcement.textContent = 'Action failed, please try again';
      break;
  }
  
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

## Usage Examples

### Form Submission
```html
<form id="contact-form">
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  
  <div class="btn-group">
    <button type="submit" class="btn-primary" id="submit-btn">
      <i class="fas fa-paper-plane"></i>
      Send Message
    </button>
    <button type="button" class="btn-secondary" onclick="resetForm()">
      <i class="fas fa-undo"></i>
      Reset
    </button>
  </div>
</form>

<script>
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  showButtonLoading('submit-btn', 'Sending...');
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: new FormData(e.target)
    });
    
    if (response.ok) {
      setButtonSuccess('submit-btn');
    } else {
      setButtonError('submit-btn');
    }
  } catch (error) {
    setButtonError('submit-btn');
  }
});
</script>
```

### Modal Dialog
```html
<div class="modal-footer">
  <div class="btn-group">
    <button class="btn-primary" onclick="saveChanges()">
      <i class="fas fa-save"></i>
      Save Changes
    </button>
    <button class="btn-secondary" onclick="closeModal()">
      <i class="fas fa-times"></i>
      Cancel
    </button>
  </div>
</div>
```

## Usage Guidelines

### Do's
- Use primary buttons for main actions
- Use secondary buttons for alternative actions
- Provide clear, descriptive labels
- Include loading states for async operations
- Ensure minimum 44px touch targets
- Use icons to enhance meaning

### Don'ts
- Don't use too many primary buttons on one page
- Don't make button text too long
- Don't forget loading states
- Don't use buttons for navigation (use links instead)
- Don't skip accessibility attributes

## Implementation Checklist

- [ ] Button HTML structure implemented
- [ ] CSS classes applied correctly
- [ ] JavaScript functionality connected
- [ ] Loading states working
- [ ] Accessibility attributes added
- [ ] Keyboard navigation functional
- [ ] Focus states visible
- [ ] Responsive design tested
- [ ] Icon usage consistent
- [ ] Color contrast verified (4.5:1 minimum)
