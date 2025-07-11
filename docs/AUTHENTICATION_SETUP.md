# Profile Photo Configuration

## Microsoft 365 Integration

The profile photo functionality integrates with Microsoft Graph API to fetch user profile photos. The implementation includes:

### API Permissions Required
- `User.Read` - Includes profile photo access
- `User.ReadBasic.All` - May be required for some tenant configurations

### Profile Photo Flow
1. **Authentication** - User signs in with Microsoft 365
2. **Photo Fetch** - System calls Microsoft Graph `/me/photo/$value` endpoint
3. **Display** - Photo is displayed in user profile UI
4. **Fallback** - If no photo available, generates initial-based avatar

### Implementation Details
- **Graph Endpoint**: `https://graph.microsoft.com/v1.0/me/photo/$value`
- **Fallback Strategy**: SVG avatars with user initials
- **Error Handling**: Graceful fallback to default avatars
- **Performance**: Async photo loading with loading states

### Demo Mode
For testing and environments without Microsoft 365 access:
- Automatically generates demo user with profile photo
- Simulates realistic authentication flow
- Provides fallback functionality for development

### Troubleshooting
- **No photo displayed**: Check `User.Read` permissions and tenant settings
- **Default avatar shown**: Normal when users haven't set profile photos
- **Permission errors**: Ensure proper consent and admin approval

---

For complete setup instructions, see [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md).

## Security Overview

🔒 **No secrets are stored in this public repository**
- All sensitive configuration is kept in `config.local.js` (git-ignored)
- Public files contain only demo/template values
- Production secrets are never committed to version control

## Prerequisites

1. **Azure AD App Registration** - You need an app registered in Azure Active Directory
2. **Microsoft 365 Tenant** - Access to your organization's Microsoft 365 tenant
3. **Admin Permissions** - Ability to configure app registrations in Azure AD

## Step-by-Step Setup

### 1. Create Azure AD App Registration

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure the following:
   - **Name**: `Pace Style Guide` (or your preferred name)
   - **Supported account types**: `Accounts in this organizational directory only`
   - **Redirect URI**: 
     - Type: `Single-page application (SPA)`
     - URI: `https://your-domain.github.io` (or your actual domain)

### 2. Configure App Registration

After creating the app registration:

1. **Note the Application (client) ID** from the Overview page
2. **Note the Directory (tenant) ID** from the Overview page
3. Go to **Authentication** and add additional redirect URIs if needed:
   - `http://localhost:3000` (for local development)
   - `https://127.0.0.1:3000` (for local development)
4. Under **Implicit grant and hybrid flows**, ensure:
   - ✅ Access tokens
   - ✅ ID tokens
5. Go to **API permissions** and ensure these permissions are granted:
   - `openid` (Sign users in)
   - `profile` (View users' basic profile)
   - `User.Read` (Read user profile **and profile photo**)
   - `User.ReadBasic.All` (Read basic profile info for all users)
   - `email` (View users' email address)

> **Note**: The `User.Read` permission includes access to the user's profile photo via Microsoft Graph API. The `User.ReadBasic.All` permission may be required in some tenant configurations for profile photo access.

### 3. Create Local Configuration

1. Copy the template file:
   ```bash
   cp scripts/config.local.template.js scripts/config.local.js
   ```

2. Edit `scripts/config.local.js` with your actual values:
   ```javascript
   const LOCAL_CONFIG = {
       msalConfig: {
           auth: {
               clientId: 'your-actual-client-id-from-step-2',
               authority: 'https://login.microsoftonline.com/your-actual-tenant-id-from-step-2',
               redirectUri: window.location.origin,
               postLogoutRedirectUri: window.location.origin
           }
       },
       environment: {
           mode: 'production', // or 'development'
           enableDebugLogging: false,
           customApiEndpoint: null
       },
       organization: {
           tenantDomain: 'your-organization.onmicrosoft.com',
           allowedDomains: ['your-organization.com'],
           adminContact: 'admin@your-organization.com'
       }
   };
   ```

### 4. Test Authentication

1. Open your application in a browser
2. Click the "Sign In" button
3. You should be redirected to Microsoft 365 login
4. After successful login, you should see your profile information

## Environment Configuration

### Development Mode
- Uses demo configuration if `config.local.js` doesn't exist
- Allows testing without real Azure AD setup
- Shows warnings about demo mode in console

### Production Mode
- Requires valid `config.local.js` with real Azure AD credentials
- Validates configuration before allowing authentication
- Displays user-friendly error messages for configuration issues

## File Structure

```
scripts/
├── config.js                    # Public configuration (no secrets)
├── config.local.template.js     # Template for local configuration
├── config.local.js             # Your actual secrets (git-ignored)
├── auth.js                     # Authentication logic
└── utils.js                    # Utility functions
```

## Security Best Practices

### ✅ Safe Practices
- Store secrets in `config.local.js` (git-ignored)
- Use environment-specific configuration
- Validate configuration before use
- Log configuration status (without secrets) for debugging

### ❌ Avoid These Mistakes
- Never commit client IDs or tenant IDs to public repositories
- Don't store secrets in environment variables for public sites
- Don't use the same app registration for multiple environments
- Don't disable security validations in production

## Deployment Options

### GitHub Pages
1. Ensure `config.local.js` is created on your local machine for testing
2. For GitHub Pages deployment, you'll need to handle configuration differently:
   - Option A: Use GitHub Secrets and a build process
   - Option B: Create a separate private repository for configuration
   - Option C: Use Azure Static Web Apps with environment variables

### Azure Static Web Apps (Recommended)
1. Deploy to Azure Static Web Apps
2. Configure application settings in Azure portal:
   ```
   AZURE_CLIENT_ID=your-client-id
   AZURE_TENANT_ID=your-tenant-id
   ```
3. Modify the configuration to read from environment variables

### Self-Hosted
1. Create `config.local.js` on your server
2. Ensure the file is not accessible via web requests
3. Configure your web server to serve the application

## Troubleshooting

### Common Issues

1. **"Authentication not configured" warning**
   - Create `config.local.js` with your actual Azure AD credentials

2. **"Invalid authentication configuration" error**
   - Verify your client ID and tenant ID are correct
   - Check that redirect URIs match your app registration

3. **Login redirect fails**
   - Ensure redirect URIs are configured in Azure AD app registration
   - Check that the domain matches exactly (including https/http)

4. **Permissions errors**
   - Verify API permissions are granted in Azure AD
   - Check that consent has been provided for the application

5. **Profile photo not loading**
   - Ensure the `User.Read` permission is granted and consented
   - Check that the user has a profile photo set in Microsoft 365
   - Verify that your tenant allows profile photo access via Graph API
   - Profile photos may take time to sync in new tenants

6. **Profile photo shows default avatar**
   - This is normal behavior when users don't have a profile photo
   - Default avatars are generated using user initials
   - Users can add photos through their Microsoft 365 profile

### Debug Information

Open browser console to see configuration status:
```javascript
console.log('Config Status:', CONFIG.getConfigurationStatus());
```

## Support

For questions about this authentication setup:
- Check the [Microsoft Graph documentation](https://docs.microsoft.com/en-us/graph/)
- Review [MSAL.js documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa)
- Contact your Azure AD administrator for tenant-specific issues

---

**Last Updated**: July 11, 2025  
**Version**: 1.0
