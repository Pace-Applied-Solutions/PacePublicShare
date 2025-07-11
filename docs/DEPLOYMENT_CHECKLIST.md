# Deployment Security Checklist

This checklist ensures secure deployment of the Pace Applied Solutions Style Guide with Microsoft 365 authentication.

## Pre-Deployment Security Checklist

### ✅ Repository Security
- [ ] `.gitignore` file is in place and includes:
  - [ ] `config.local.js`
  - [ ] `.env*` files
  - [ ] `secrets.json`
  - [ ] `*.key` files
- [ ] No secrets committed to git history
- [ ] All configuration uses environment variables or local files
- [ ] Demo/placeholder values only in public files

### ✅ Authentication Configuration
- [ ] `config.local.template.js` exists as a template
- [ ] `config.local.js` is git-ignored
- [ ] Production configuration validates properly
- [ ] Demo configuration shows appropriate warnings
- [ ] Error handling provides user-friendly messages

### ✅ Azure AD App Registration
- [ ] App registration created with proper name
- [ ] Redirect URIs configured for your domain
- [ ] Minimal required permissions granted:
  - [ ] `openid`
  - [ ] `profile` 
  - [ ] `User.Read`
  - [ ] `email`
- [ ] Implicit grant flow enabled for SPA
- [ ] Supported account types properly configured

## Deployment Steps

### Step 1: Prepare Configuration
```bash
# Copy template to create local config
cp scripts/config.local.template.js scripts/config.local.js

# Edit with your actual Azure AD values
# vim scripts/config.local.js
```

### Step 2: Test Locally
```bash
# Open in browser and test authentication
# Verify configuration notice behavior
# Test sign-in/sign-out flow
```

### Step 3: Deploy (Choose One)

#### Option A: GitHub Pages
⚠️ **Not recommended for production authentication** - secrets cannot be properly secured

1. Remove authentication or use demo mode only
2. Push to GitHub Pages branch
3. Configure custom domain if needed

#### Option B: Azure Static Web Apps (Recommended)
1. Create Azure Static Web App
2. Configure application settings:
   ```
   AZURE_CLIENT_ID=your-client-id
   AZURE_TENANT_ID=your-tenant-id
   ```
3. Deploy from GitHub repository
4. Configure custom domain

#### Option C: Self-Hosted
1. Deploy files to web server
2. Ensure `config.local.js` is not web-accessible
3. Configure HTTPS (required for authentication)
4. Update redirect URIs in Azure AD

## Post-Deployment Verification

### ✅ Security Verification
- [ ] Visit deployed site
- [ ] Verify no secrets visible in source code
- [ ] Check network tab for any exposed credentials
- [ ] Verify HTTPS is working (required for auth)
- [ ] Test authentication flow end-to-end

### ✅ Functionality Verification
- [ ] Style guide loads properly
- [ ] All components render correctly
- [ ] Authentication notice displays appropriately
- [ ] Sign-in redirects to Microsoft 365
- [ ] User profile displays after authentication
- [ ] Sign-out works properly

### ✅ Error Handling Verification
- [ ] Test with no configuration (should show demo mode)
- [ ] Test with invalid configuration (should show error)
- [ ] Test network failures (should show appropriate messages)
- [ ] Test authentication failures (should handle gracefully)

## Environment-Specific Considerations

### Development Environment
- Uses demo configuration if no local config
- Shows configuration warnings
- Allows testing without real Azure AD setup
- Debug logging enabled

### Staging Environment
- Should use separate Azure AD app registration
- Test with real authentication but non-production data
- Validate configuration thoroughly

### Production Environment
- Must have valid `config.local.js` or environment variables
- No debug logging
- Production Azure AD app registration
- HTTPS required
- Custom domain recommended

## Security Best Practices

### ✅ Never Do This
- [ ] ❌ Commit client IDs to public repositories
- [ ] ❌ Store secrets in environment variables for public sites
- [ ] ❌ Use the same app registration across environments
- [ ] ❌ Disable security validations in production
- [ ] ❌ Hardcode tenant IDs in public code

### ✅ Always Do This
- [ ] ✅ Use git-ignored files for secrets
- [ ] ✅ Validate configuration before use
- [ ] ✅ Provide clear error messages
- [ ] ✅ Use HTTPS for authentication
- [ ] ✅ Test authentication flow thoroughly
- [ ] ✅ Monitor for security issues

## Troubleshooting Common Issues

### Configuration Not Found
```javascript
// Check configuration status in browser console
console.log('Config Status:', CONFIG.getConfigurationStatus());
```

### Authentication Redirect Fails
1. Verify redirect URI in Azure AD app registration
2. Check that domain matches exactly (including https/http)
3. Ensure HTTPS is configured for production

### Permissions Errors
1. Check API permissions in Azure AD
2. Verify admin consent has been granted
3. Test with a different user account

## Emergency Procedures

### If Secrets Are Accidentally Committed
1. **Immediately** rotate all compromised credentials
2. Update Azure AD app registration with new secrets
3. Rewrite git history to remove secrets:
   ```bash
   git filter-branch --tree-filter 'rm -f scripts/config.local.js' HEAD
   git push --force
   ```
4. Notify security team

### If Authentication Is Compromised
1. Disable the Azure AD app registration
2. Review audit logs in Azure AD
3. Rotate all credentials
4. Review access patterns for anomalies

---

**Last Updated**: July 11, 2025  
**Version**: 1.0
