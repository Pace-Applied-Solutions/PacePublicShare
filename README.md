# Pace Applied Solutions - Style Guide & Component Library

A comprehensive, interactive style guide and component library demonstrating best practices for web development with integrated Microsoft 365 authentication.

![Pace Applied Solutions](https://img.shields.io/badge/Pace%20Applied%20Solutions-Style%20Guide-EB9110)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

This project serves as a living style guide and reference implementation for Pace Applied Solutions' design system. It features:

- **150+ Component Examples**: Comprehensive library of UI components with live code samples
- **Microsoft 365 Authentication**: Secure integration with Azure AD for enterprise environments
- **Interactive Demo Mode**: Full functionality available without authentication for development
- **Copy-to-Clipboard**: One-click code copying for rapid development
- **Responsive Design**: Mobile-first approach with full responsive capabilities
- **Best Practices**: Production-ready code following industry standards

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server for local development (recommended)
- Azure AD application registration (for authentication features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pace-Applied-Solutions/PacePublicShare.git
   cd PacePublicShare
   ```

2. **Serve the files** (recommended)
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js
   npx serve PacePublicShare
   
   # Using PHP
   cd PacePublicShare && php -S localhost:8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### Demo Mode

The application works immediately in demo mode, providing full access to all components and examples without requiring authentication setup.

## 🔐 Authentication Setup

For production use with Microsoft 365 authentication:

1. **Create Azure AD App Registration**
   - Follow the detailed guide in [`PacePublicShare/docs/AUTHENTICATION_SETUP.md`](./PacePublicShare/docs/AUTHENTICATION_SETUP.md)
   - Note your Client ID and Tenant ID

2. **Configure Local Settings**
   ```bash
   # Copy the template
   cp PacePublicShare/scripts/config.local.template.js PacePublicShare/scripts/config.local.js
   
   # Edit with your Azure AD credentials
   # Note: config.local.js is git-ignored for security
   ```

3. **Update Configuration**
   ```javascript
   // In config.local.js
   const localConfig = {
       msalConfig: {
           auth: {
               clientId: "your-azure-ad-client-id",
               tenantId: "your-azure-ad-tenant-id"
           }
       }
   };
   ```

## 📁 Project Structure

```
PacePublicShare/
├── index.html                    # Main application entry point
├── scripts/
│   ├── app.js                   # Main application logic
│   ├── auth.js                  # Authentication handling
│   ├── config.js                # Public configuration
│   ├── config.local.js          # Local secrets (git-ignored, for testing)
│   ├── config.local.template.js # Template for local config
│   └── utils.js                 # Utility functions
├── styleguide/
│   └── pace-style-guide.css     # Complete CSS framework
├── assets/
│   └── logo/                    # Brand assets and logos
├── docs/
│   ├── PACE_STYLE_GUIDE.md     # Complete style guide documentation
│   └── AUTHENTICATION_SETUP.md # Authentication setup guide
└── .gitignore                   # Git ignore rules
```

## 🎨 Features

### Component Library
- **Typography**: Headers, body text, links, and emphasis styles
- **Buttons**: Primary, secondary, outline, and icon variants
- **Forms**: Inputs, textareas, selects, checkboxes, and radio buttons
- **Navigation**: Headers, breadcrumbs, pagination, and tabs
- **Data Display**: Tables, cards, lists, and statistics
- **Feedback**: Alerts, notifications, modals, and tooltips
- **Layout**: Grids, flexbox utilities, and spacing systems

### Interactive Features
- **Live Code Examples**: Real-time preview of all components
- **Copy-to-Clipboard**: Instant code copying with feedback
- **Responsive Preview**: See how components adapt to different screen sizes
- **Authentication Flow**: Complete Microsoft 365 sign-in/sign-out workflow
- **Keyboard Shortcuts**: Enhanced accessibility and power user features

### Development Features
- **Modular Architecture**: Clean separation of concerns
- **Progressive Enhancement**: Works without JavaScript for basic content
- **Error Handling**: Graceful degradation and user feedback
- **Performance Optimized**: Minimal dependencies and efficient loading
- **Cross-Browser Support**: Tested across modern browsers

## 🛠️ Development

### Local Development

```bash
# Start local server
cd PacePublicShare
python -m http.server 8080
# or
npx serve .

# Open browser
open http://localhost:8080
```

### Building for Production

The application is ready for production deployment as static files:

1. **Configure Authentication** (if needed)
   - Set up Azure AD app registration
   - Update config.local.js with production values

2. **Deploy Static Files**
   - Upload all files to your web server
   - Ensure HTTPS for authentication features
   - Configure proper MIME types for CSS/JS files

### Customization

#### CSS Customization
```css
/* Override default variables in your custom CSS */
:root {
    --pace-primary-color: #your-brand-color;
    --pace-secondary-color: #your-secondary-color;
    --pace-font-family: 'Your Font', sans-serif;
}
```

#### JavaScript Extension
```javascript
// Extend the PaceApp class for custom functionality
class CustomPaceApp extends PaceApp {
    constructor() {
        super();
        // Your custom initialization
    }
    
    // Override or extend methods
    showNotification(message, type) {
        // Custom notification handling
        super.showNotification(message, type);
    }
}
```

## 📖 Documentation

- **[Complete Style Guide](./PacePublicShare/docs/PACE_STYLE_GUIDE.md)**: Comprehensive documentation of all components, guidelines, and best practices
- **[Authentication Setup](./PacePublicShare/docs/AUTHENTICATION_SETUP.md)**: Step-by-step guide for configuring Microsoft 365 authentication

## 🔧 Configuration

### Environment Variables
The application supports multiple configuration layers:

1. **Public Configuration** (`config.js`): Safe for public repositories
2. **Local Configuration** (`config.local.js`): Private settings, git-ignored
3. **Runtime Configuration**: Dynamic configuration based on environment

### Authentication Options
- **Demo Mode**: No authentication required, full component access
- **Microsoft 365**: Enterprise authentication with Azure AD
- **Development Mode**: Local testing with mock authentication

## 🚀 Deployment

### Static Site Hosting
Deploy to any static site hosting service:

- **GitHub Pages**: Automatic deployment from repository
- **Netlify**: Drag-and-drop deployment with continuous integration
- **Vercel**: Git-based deployment with preview URLs
- **Azure Static Web Apps**: Native Azure integration
- **AWS S3**: Simple storage service deployment

### Production Checklist
- [ ] Configure Azure AD app registration
- [ ] Update config.local.js with production settings
- [ ] Enable HTTPS for authentication
- [ ] Configure proper CORS settings
- [ ] Test authentication flow
- [ ] Verify all components render correctly
- [ ] Check performance with production minification

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code patterns and conventions
- Include comprehensive comments for complex logic
- Write responsive CSS using mobile-first approach
- Test across multiple browsers and devices
- Maintain backward compatibility where possible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **[Live Demo](https://pace-applied-solutions.github.io/PacePublicShare/)**: Interactive demo of the style guide
- **[Documentation](./PacePublicShare/docs/)**: Complete documentation and guides
- **[Issues](../../issues)**: Report bugs or request features
- **[Releases](../../releases)**: Version history and downloads

## 📞 Support

For support and questions:

- **Email**: support@paceappliedsolutions.com
- **Documentation**: Check the [docs](./PacePublicShare/docs/) folder
- **Issues**: Create an issue in this repository

---

**Built with ❤️ by Pace Applied Solutions**

*This style guide serves as both a comprehensive reference and a practical tool for building consistent, accessible, and beautiful web applications.*
