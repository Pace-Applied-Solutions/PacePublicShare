# PacePublicShare

**Official Pace Applied Solutions Public Assets & Style Guide**

Welcome to the Pace Applied Solutions public repository containing brand assets, design system, and reference implementations for integration into your projects.

## 🚀 Quick Start

### Option 1: Direct Asset Usage
Reference assets directly from GitHub CDN:
```html
<img src="https://raw.githubusercontent.com/Pace-Applied-Solutions/PacePublicShare/main/assets/logo/Pace-logo-orange.png" 
     alt="Pace Applied Solutions" width="200">
```

### Option 2: CSS Framework Integration
Include the complete Pace design system:
```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/Pace-Applied-Solutions/PacePublicShare/main/styleguide/pace-style-guide.css">
<button class="pace-button pace-button-primary">Get Started</button>
```

### Option 3: Clone & Deploy
```bash
git clone https://github.com/Pace-Applied-Solutions/PacePublicShare.git
cd PacePublicShare
# Open styleguide/examples.html in your browser
```

## 📁 What's Included

```
PacePublicShare/
├── 📄 PACE_STYLE_GUIDE.md          # Complete design system documentation
├── 🎨 assets/logo/                 # Brand assets (PNG, ICO, SVG)
├── 🎯 styleguide/
│   ├── examples.html               # Live component demo with auth
│   └── pace-style-guide.css        # Complete CSS framework
└── 🔐 scripts/                     # Microsoft 365 authentication
    ├── auth.js                     # Authentication logic
    ├── config.js                   # Configuration
    └── utils.js                    # Utilities
```

## 🎨 Brand Assets

| Asset | Use Case | File |
|-------|----------|------|
| ![Orange Logo](./assets/logo/Pace-logo-orange.png) | Primary branding, light backgrounds | `Pace-logo-orange.png` |
| ![Blue Logo](./assets/logo/Pace-logo-blue.png) | Professional contexts, documents | `Pace-logo-blue.png` |
| ![White Logo](./assets/logo/Pace-logo-white.png) | Dark backgrounds, overlays | `Pace-logo-white.png` |

**Complete favicon package included** for all platforms (ICO, PNG, Apple Touch, Android)

## 🎯 Live Demo

**[View Live Examples →](./styleguide/examples.html)**

Features working Microsoft 365 authentication and complete component library.

## 📖 Documentation

**[📄 Complete Style Guide →](./PACE_STYLE_GUIDE.md)**

Comprehensive design system documentation including:
- ✅ Color system and usage guidelines  
- ✅ Typography standards and hierarchy
- ✅ Complete component library
- ✅ Responsive design patterns
- ✅ Accessibility standards (WCAG 2.1 AA)
- ✅ Code examples and implementation
- ✅ Microsoft 365 authentication integration

## 🔧 Implementation Examples

### Basic Button
```html
<button class="pace-button pace-button-primary">
  <i class="fas fa-save"></i>
  Save Changes
</button>
```

### Authentication Integration
```html
<script src="./scripts/config.js"></script>
<script src="./scripts/auth.js"></script>
<script>
  const auth = getAuth();
  auth.signIn(); // Microsoft 365 authentication
</script>
```

### Responsive Card Layout
```html
<div class="pace-container">
  <div class="pace-grid pace-grid-2">
    <div class="pace-card">
      <div class="pace-card-content">
        <h3 class="pace-heading-3">Card Title</h3>
        <p class="pace-text-body">Your content here</p>
      </div>
    </div>
  </div>
</div>
```

## 🔐 Authentication Setup

This repository includes Microsoft 365 authentication integration. **No secrets are stored in this public repository.**

For production use, you'll need to configure authentication:

1. **Quick Setup**: See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for complete instructions
2. **Local Development**: Copy `scripts/config.local.template.js` to `scripts/config.local.js` and add your Azure AD credentials
3. **Security**: All sensitive configuration is git-ignored and handled through local files

**Note**: The demo will work without configuration but won't authenticate with real Microsoft 365 accounts.

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Fork this repository
2. Enable GitHub Pages in Settings
3. Your site will be available at: `https://username.github.io/PacePublicShare/styleguide/examples.html`

### Local Development
1. Clone the repository
2. Open `styleguide/examples.html` in any modern browser
3. Authentication works with valid Pace Microsoft 365 credentials

### CDN Integration
All assets and CSS are available via GitHub's raw content CDN for external project integration.

## �️ Technical Details

- **CSS Framework**: 25KB minified, modern CSS with custom properties
- **Authentication**: MSAL.js 2.35.0 for Microsoft 365 integration
- **Icons**: FontAwesome 6.4.0 for consistent iconography
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 85+, Safari 14+)
- **Mobile**: Fully responsive, mobile-first design
- **Accessibility**: WCAG 2.1 AA compliant

## 📞 Support

For questions, issues, or contributions:
- **Documentation**: See [PACE_STYLE_GUIDE.md](./PACE_STYLE_GUIDE.md)
- **Issues**: Use GitHub Issues for bug reports
- **Contact**: Pace Applied Solutions Development Team

## 📄 License

© 2025 Pace Applied Solutions. All rights reserved.

---

**Ready to build with Pace?** Start with the [complete style guide documentation](./PACE_STYLE_GUIDE.md) or jump right into the [live examples](./styleguide/examples.html).

These assets are provided for public use in connection with Pace Applied Solutions projects and partnerships. Please respect our branding guidelines when using these materials.

---

**Pace Applied Solutions** - Advancing technology solutions for modern business challenges.
