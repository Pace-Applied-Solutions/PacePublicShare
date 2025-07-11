# Change Control Panel Component

## Overview
The Change Control Panel provides document version tracking and commit history for the PACE System Documentation. It displays recent changes, author information, and links to detailed change logs, helping users understand document evolution and maintain audit trails.

## Visual Layout
```
┌─────────────────────────────────────────────────────────────┐
│ 📋 Change Control                                    [▼]    │
│ ─────────────────────────────────────────────────────────── │
│ 👤 John Doe                                        🔗 View  │
│    Updated security protocols and authentication...         │
│    Dec 15, 2024 • 2:30 PM                                  │
│                                                             │
│ 👤 Jane Smith                                      🔗 View  │
│    Added API endpoint documentation for user...             │
│    Dec 14, 2024 • 4:15 PM                                  │
│                                                             │
│ 👤 Mike Johnson                                    🔗 View  │
│    Fixed formatting issues in security section              │
│    Dec 13, 2024 • 1:45 PM                                  │
│                                                             │
│ 🔗 View all changes →                                       │
└─────────────────────────────────────────────────────────────┘
```

## HTML Structure

### Basic Change Control Panel
```html
<div class="document-change-control">
  <div class="change-control-header">
    <h3 class="change-control-title">
      <i class="fas fa-history"></i>
      Change Control
    </h3>
    <button class="change-control-toggle" 
            aria-label="Toggle change control panel"
            aria-expanded="true">
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
  
  <div class="change-control-content">
    <ul class="commit-list" id="commit-list">
      <!-- Commit items will be populated here -->
    </ul>
    
    <div class="change-control-footer">
      <a href="/history" class="view-more-link">
        <i class="fas fa-external-link-alt"></i>
        View all changes
      </a>
    </div>
  </div>
</div>
```

### Individual Commit Item
```html
<li class="commit-item">
  <div class="commit-avatar">
    <img src="/avatars/john-doe.jpg" alt="John Doe" loading="lazy">
  </div>
  <div class="commit-details">
    <p class="commit-message">Updated security protocols and authentication procedures</p>
    <div class="commit-meta">
      <span class="commit-author">John Doe</span>
      <span class="commit-date">Dec 15, 2024 • 2:30 PM</span>
    </div>
  </div>
  <a href="/commit/abc123" class="commit-link" aria-label="View commit details">
    <i class="fas fa-external-link-alt"></i>
  </a>
</li>
```

### Commit Item with Avatar Fallback
```html
<li class="commit-item">
  <div class="commit-avatar">
    <div class="commit-avatar-fallback">JD</div>
  </div>
  <div class="commit-details">
    <p class="commit-message">Added comprehensive API documentation</p>
    <div class="commit-meta">
      <span class="commit-author">John Doe</span>
      <span class="commit-date">2 hours ago</span>
    </div>
  </div>
  <a href="/commit/def456" class="commit-link">
    <i class="fas fa-external-link-alt"></i>
  </a>
</li>
```

### Loading State
```html
<div class="change-control-content">
  <div class="change-control-loading">
    <i class="fas fa-spinner fa-spin"></i>
    Loading change history...
  </div>
</div>
```

### Error State
```html
<div class="change-control-content">
  <div class="change-control-error">
    <i class="fas fa-exclamation-triangle"></i>
    Unable to load change history
    <button class="retry-btn" onclick="retryLoadHistory()">
      <i class="fas fa-redo"></i>
      Retry
    </button>
  </div>
</div>
```

### Empty State
```html
<div class="change-control-content">
  <div class="change-control-empty">
    <i class="fas fa-file-alt"></i>
    No changes recorded
  </div>
</div>
```

## CSS Classes

### Main Container Classes
- `.document-change-control` - Main container
- `.change-control-header` - Header section
- `.change-control-content` - Content area
- `.change-control-content.collapsed` - Collapsed state
- `.change-control-footer` - Footer section

### Header Classes
- `.change-control-title` - Panel title
- `.change-control-toggle` - Expand/collapse button
- `.change-control-toggle:hover` - Hover state

### Commit List Classes
- `.commit-list` - List container
- `.commit-item` - Individual commit item
- `.commit-item:hover` - Hover state
- `.commit-item.view-more` - View more link item

### Commit Item Classes
- `.commit-avatar` - Avatar container
- `.commit-avatar-fallback` - Text-based avatar
- `.commit-details` - Commit information
- `.commit-message` - Commit message
- `.commit-meta` - Metadata (author, date)
- `.commit-author` - Author name
- `.commit-date` - Date/time
- `.commit-link` - External link

### State Classes
- `.change-control-loading` - Loading state
- `.change-control-error` - Error state
- `.change-control-empty` - Empty state
- `.view-more-link` - View all changes link

## Complete CSS Implementation

```css
/* Change Control Panel */
.document-change-control {
  margin-top: 2rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  font-size: 0.9rem;
}

.change-control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.change-control-title {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.change-control-title i {
  color: #64748b;
  font-size: 0.8rem;
}

.change-control-toggle {
  background: none;
  border: none;
  padding: 0.25rem;
  color: #64748b;
  cursor: pointer;
  border-radius: 4px;
  transition: all var(--transition-speed) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.change-control-toggle:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

.change-control-toggle:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.change-control-toggle i {
  transition: transform var(--transition-speed) ease;
}

.change-control-toggle.collapsed i {
  transform: rotate(180deg);
}

.change-control-content {
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: 500px;
}

.change-control-content.collapsed {
  max-height: 0;
  overflow: hidden;
}

/* Commit List */
.commit-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.commit-item {
  display: flex;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color var(--transition-speed) ease;
  border-radius: 4px;
  padding: 0.5rem;
}

.commit-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0.5rem;
}

.commit-item:hover {
  background-color: #f8fafc;
}

.commit-item.view-more {
  justify-content: center;
  padding-top: 0.5rem;
  border-bottom: none;
}

/* Commit Avatar */
.commit-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.75rem;
  background-color: #e2e8f0;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.commit-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.commit-avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
}

/* Commit Details */
.commit-details {
  flex: 1;
  min-width: 0;
}

.commit-message {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: #1e293b;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.commit-meta {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: #64748b;
  align-items: center;
  gap: 0.5rem;
}

.commit-author {
  font-weight: 500;
  color: #475569;
}

.commit-date {
  white-space: nowrap;
}

.commit-date::before {
  content: "•";
  margin-right: 0.5rem;
  color: #cbd5e1;
}

/* Commit Link */
.commit-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all var(--transition-speed) ease;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.commit-link:hover {
  background-color: #dbeafe;
  color: #1d4ed8;
  text-decoration: none;
}

.commit-link:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* View More Link */
.view-more-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-radius: 4px;
  transition: all var(--transition-speed) ease;
  justify-content: center;
}

.view-more-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.view-more-link:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Loading State */
.change-control-loading {
  color: #64748b;
  padding: 1rem 0;
  font-style: italic;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.change-control-loading i {
  color: var(--primary-color);
}

/* Error State */
.change-control-error {
  color: #ef4444;
  padding: 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.change-control-error i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.change-control-error .retry-btn {
  background: none;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all var(--transition-speed) ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.change-control-error .retry-btn:hover {
  background-color: #ef4444;
  color: white;
}

/* Empty State */
.change-control-empty {
  color: #64748b;
  padding: 1rem 0;
  font-style: italic;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.change-control-empty i {
  color: #94a3b8;
}

/* Footer */
.change-control-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .commit-item {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .commit-avatar {
    width: 28px;
    height: 28px;
    margin-right: 0.5rem;
  }
  
  .commit-link {
    margin-left: 0;
    margin-top: 0.25rem;
  }
  
  .commit-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .commit-date::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .document-change-control {
    margin-top: 1.5rem;
    padding-top: 0.75rem;
  }
  
  .change-control-header {
    margin-bottom: 0.5rem;
  }
  
  .commit-item {
    padding: 0.25rem;
  }
  
  .commit-avatar {
    width: 24px;
    height: 24px;
  }
  
  .commit-message {
    font-size: 0.8rem;
  }
  
  .commit-meta {
    font-size: 0.7rem;
  }
}

/* Print Styles */
@media print {
  .document-change-control {
    display: none;
  }
}
```

## JavaScript Implementation

### Change Control Manager
```javascript
class ChangeControlManager {
  constructor() {
    this.panels = new Map();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadAllPanels();
  }

  setupEventListeners() {
    // Toggle panels
    document.addEventListener('click', (e) => {
      if (e.target.matches('.change-control-toggle, .change-control-toggle *')) {
        const toggle = e.target.closest('.change-control-toggle');
        const panel = toggle.closest('.document-change-control');
        this.togglePanel(panel);
      }
    });

    // Retry loading
    document.addEventListener('click', (e) => {
      if (e.target.matches('.retry-btn, .retry-btn *')) {
        const button = e.target.closest('.retry-btn');
        const panel = button.closest('.document-change-control');
        this.retryLoadPanel(panel);
      }
    });
  }

  async loadAllPanels() {
    const panels = document.querySelectorAll('.document-change-control');
    panels.forEach(panel => this.loadPanel(panel));
  }

  async loadPanel(panel) {
    const documentId = panel.dataset.documentId;
    if (!documentId) return;

    try {
      this.showLoading(panel);
      const history = await this.fetchChangeHistory(documentId);
      this.renderHistory(panel, history);
      this.panels.set(documentId, history);
    } catch (error) {
      console.error('Failed to load change history:', error);
      this.showError(panel);
    }
  }

  async fetchChangeHistory(documentId) {
    const response = await fetch(`/api/documents/${documentId}/history`);
    if (!response.ok) {
      throw new Error(`Failed to fetch history: ${response.statusText}`);
    }
    return response.json();
  }

  renderHistory(panel, history) {
    const content = panel.querySelector('.change-control-content');
    
    if (history.commits.length === 0) {
      this.showEmpty(panel);
      return;
    }

    const commitList = document.createElement('ul');
    commitList.className = 'commit-list';

    // Show recent commits (limit to 5)
    const recentCommits = history.commits.slice(0, 5);
    recentCommits.forEach(commit => {
      const commitItem = this.createCommitItem(commit);
      commitList.appendChild(commitItem);
    });

    // Add "view more" link if there are more commits
    if (history.commits.length > 5) {
      const viewMoreItem = this.createViewMoreItem(history.totalCount);
      commitList.appendChild(viewMoreItem);
    }

    content.innerHTML = '';
    content.appendChild(commitList);

    // Add footer
    const footer = document.createElement('div');
    footer.className = 'change-control-footer';
    footer.innerHTML = `
      <a href="/history?doc=${panel.dataset.documentId}" class="view-more-link">
        <i class="fas fa-external-link-alt"></i>
        View all changes
      </a>
    `;
    content.appendChild(footer);
  }

  createCommitItem(commit) {
    const item = document.createElement('li');
    item.className = 'commit-item';

    const avatar = this.createAvatar(commit.author);
    const details = this.createCommitDetails(commit);
    const link = this.createCommitLink(commit);

    item.appendChild(avatar);
    item.appendChild(details);
    item.appendChild(link);

    return item;
  }

  createAvatar(author) {
    const avatar = document.createElement('div');
    avatar.className = 'commit-avatar';

    if (author.avatar) {
      const img = document.createElement('img');
      img.src = author.avatar;
      img.alt = author.name;
      img.loading = 'lazy';
      
      // Add error handling for missing avatars
      img.onerror = () => {
        avatar.innerHTML = `<div class="commit-avatar-fallback">${this.getInitials(author.name)}</div>`;
      };
      
      avatar.appendChild(img);
    } else {
      avatar.innerHTML = `<div class="commit-avatar-fallback">${this.getInitials(author.name)}</div>`;
    }

    return avatar;
  }

  createCommitDetails(commit) {
    const details = document.createElement('div');
    details.className = 'commit-details';

    const message = document.createElement('p');
    message.className = 'commit-message';
    message.textContent = commit.message;

    const meta = document.createElement('div');
    meta.className = 'commit-meta';

    const author = document.createElement('span');
    author.className = 'commit-author';
    author.textContent = commit.author.name;

    const date = document.createElement('span');
    date.className = 'commit-date';
    date.textContent = this.formatDate(commit.date);

    meta.appendChild(author);
    meta.appendChild(date);
    details.appendChild(message);
    details.appendChild(meta);

    return details;
  }

  createCommitLink(commit) {
    const link = document.createElement('a');
    link.className = 'commit-link';
    link.href = commit.url;
    link.setAttribute('aria-label', `View commit: ${commit.message}`);
    link.innerHTML = '<i class="fas fa-external-link-alt"></i>';

    return link;
  }

  createViewMoreItem(totalCount) {
    const item = document.createElement('li');
    item.className = 'commit-item view-more';

    const link = document.createElement('a');
    link.className = 'view-more-link';
    link.href = '#';
    link.innerHTML = `
      <i class="fas fa-plus"></i>
      View ${totalCount - 5} more changes
    `;

    item.appendChild(link);
    return item;
  }

  togglePanel(panel) {
    const content = panel.querySelector('.change-control-content');
    const toggle = panel.querySelector('.change-control-toggle');
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
      content.classList.remove('collapsed');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.remove('collapsed');
    } else {
      content.classList.add('collapsed');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.add('collapsed');
    }
  }

  showLoading(panel) {
    const content = panel.querySelector('.change-control-content');
    content.innerHTML = `
      <div class="change-control-loading">
        <i class="fas fa-spinner fa-spin"></i>
        Loading change history...
      </div>
    `;
  }

  showError(panel) {
    const content = panel.querySelector('.change-control-content');
    content.innerHTML = `
      <div class="change-control-error">
        <i class="fas fa-exclamation-triangle"></i>
        Unable to load change history
        <button class="retry-btn">
          <i class="fas fa-redo"></i>
          Retry
        </button>
      </div>
    `;
  }

  showEmpty(panel) {
    const content = panel.querySelector('.change-control-content');
    content.innerHTML = `
      <div class="change-control-empty">
        <i class="fas fa-file-alt"></i>
        No changes recorded
      </div>
    `;
  }

  retryLoadPanel(panel) {
    this.loadPanel(panel);
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
}

// Initialize change control manager
document.addEventListener('DOMContentLoaded', () => {
  new ChangeControlManager();
});
```

### Usage Example
```javascript
// Add change control panel to a document
function addChangeControlPanel(documentId, containerId) {
  const container = document.getElementById(containerId);
  const panel = document.createElement('div');
  panel.className = 'document-change-control';
  panel.dataset.documentId = documentId;
  
  panel.innerHTML = `
    <div class="change-control-header">
      <h3 class="change-control-title">
        <i class="fas fa-history"></i>
        Change Control
      </h3>
      <button class="change-control-toggle" 
              aria-label="Toggle change control panel"
              aria-expanded="true">
        <i class="fas fa-chevron-up"></i>
      </button>
    </div>
    
    <div class="change-control-content">
      <div class="change-control-loading">
        <i class="fas fa-spinner fa-spin"></i>
        Loading change history...
      </div>
    </div>
  `;
  
  container.appendChild(panel);
}
```

## Accessibility Features

### ARIA Attributes
```html
<div class="document-change-control" role="complementary" aria-label="Document change history">
  <div class="change-control-header">
    <h3 class="change-control-title">Change Control</h3>
    <button class="change-control-toggle" 
            aria-label="Toggle change control panel"
            aria-expanded="true"
            aria-controls="change-control-content">
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
  
  <div class="change-control-content" id="change-control-content">
    <ul class="commit-list" role="list">
      <li class="commit-item" role="listitem">
        <!-- Commit content -->
      </li>
    </ul>
  </div>
</div>
```

### Keyboard Navigation
- Tab navigation through interactive elements
- Enter/Space key toggles panels
- Arrow keys navigate commit list
- Proper focus management

### Screen Reader Support
```javascript
// Announce panel state changes
function announceToggle(panel, isExpanded) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = isExpanded ? 'Change control panel expanded' : 'Change control panel collapsed';
  
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

## Usage Guidelines

### Do's
- Show recent changes (last 5-10 commits)
- Include author information and timestamps
- Provide links to detailed views
- Use relative time formatting
- Include loading and error states

### Don'ts
- Don't show too many commits in the panel
- Don't forget to handle avatar loading errors
- Don't make commit messages too long
- Don't skip accessibility attributes

## Implementation Checklist

- [ ] Panel HTML structure implemented
- [ ] CSS styling applied
- [ ] JavaScript functionality connected
- [ ] Toggle behavior working
- [ ] API integration complete
- [ ] Loading states implemented
- [ ] Error handling functional
- [ ] Accessibility features added
- [ ] Responsive design tested
- [ ] Avatar fallbacks working
