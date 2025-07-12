# Font Compatibility Guide

## Overview

This guide addresses cross-platform font compatibility issues, particularly for iOS devices, and provides solutions for ensuring consistent font rendering across all platforms.

## Issue Background

The Pace Applied Solutions style guide originally used two custom fonts:
- **Agency FB**: Used for site titles and prominent headers
- **Bahnschrift Light Condensed**: Used for primary headings (H1)

These fonts are Windows system fonts that are **not available on iOS devices**, causing fallback to generic system fonts and inconsistent brand presentation.

## Root Causes

1. **System Font Limitations**: Agency FB and Bahnschrift Light Condensed are Windows-specific fonts
2. **iOS Font Availability**: iOS devices don't include these fonts by default
3. **Insufficient Fallbacks**: Original font stacks lacked iOS-specific alternatives

## Solutions Implemented

### 1. Local Font Files (Primary Solution)

Added font files to the assets directory for optimal performance:

```
assets/fonts/
├── AGENCYB.TTF      # Agency FB Bold
├── AGENCYR.TTF      # Agency FB Regular
└── BAHNSCHRIFT.TTF  # Bahnschrift/Bahnschrift Light Condensed
```

**@font-face Declarations:**
```css
@font-face {
    font-family: 'Agency FB';
    src: url('../assets/fonts/AGENCYB.TTF') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Bahnschrift Light Condensed';
    src: url('../assets/fonts/BAHNSCHRIFT.TTF') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}
```

### 2. Web Font Fallbacks (Secondary Solution)

Added Google Fonts import for cross-platform compatibility:

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600&family=Oswald:wght@300;400;500;600&display=swap');
```

**Web Font Alternatives:**
- **Oswald**: Similar characteristics to Agency FB for titles
- **Barlow Condensed**: Similar to Bahnschrift Light Condensed for headings

### 3. Enhanced Font Stacks

#### Title Font (Agency FB with fallbacks)
```css
--pace-font-family-title: 'Agency FB', 'Oswald', 'Arial Narrow', 'Helvetica Neue Condensed', 'Avenir Next Condensed', 'Impact', 'Helvetica Neue', Arial, sans-serif;
```

#### Primary Heading Font (Bahnschrift with fallbacks)
```css
--pace-font-family-heading: 'Bahnschrift Light Condensed', 'Bahnschrift Light', 'Bahnschrift', 'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue Condensed', 'Avenir Next Condensed', 'Trebuchet MS', 'Helvetica Neue', Arial, sans-serif;
```

### 4. iOS-Specific Fallbacks

Added iOS system fonts to font stacks:
- **Helvetica Neue Condensed**: Native iOS condensed font
- **Avenir Next Condensed**: iOS system font alternative
- **Impact**: Bold title font available on iOS

## Font Loading Strategy

### Performance Optimization
- **Local fonts load first**: Optimal performance with zero network latency
- **Web fonts as fallbacks**: Google Fonts provide cross-platform compatibility
- Uses `font-display: swap` for faster font loading
- Graceful fallback to system fonts if custom fonts fail to load
- Maintains visual hierarchy even when custom fonts aren't available

### Loading Priority
1. **Local fonts**: Load immediately from assets/fonts/ directory
2. **Web fonts**: Load from Google Fonts CDN as fallbacks
3. **System fonts**: Final fallback layer for maximum compatibility

### Cross-Platform Testing
The solution ensures:
- **Windows**: Local fonts (Agency FB, Bahnschrift) for best performance
- **iOS**: Local fonts first, then web fonts (Oswald, Barlow Condensed) or iOS system fonts
- **Android**: Local fonts first, then web fonts or Android system fonts
- **Other platforms**: Local fonts first, then appropriate system font fallbacks

## Usage Guidelines

### Font Hierarchy
1. **Site Title**: Use sparingly - once per page or content section
2. **Primary Headings (H1)**: Main section headings
3. **Secondary Headings (H2-H5)**: Subsections, use standard font family
4. **Body Text**: Standard Segoe UI font stack

### Implementation
```html
<!-- Site Title -->
<h1 class="pace-site-title">Pace Applied Solutions</h1>

<!-- Primary Heading -->
<h1 class="pace-heading-1">Main Section Title</h1>

<!-- Secondary Headings -->
<h2 class="pace-heading-2">Subsection Title</h2>
```

## Troubleshooting

### Common Issues

#### 1. Local Fonts Not Loading
**Symptoms**: Default system fonts appear instead of custom fonts
**Solutions**:
- Verify font files exist in assets/fonts/ directory
- Check file paths in @font-face declarations
- Ensure font files are accessible via HTTP (not blocked by server)
- Inspect browser console for font loading errors

#### 2. Web Fonts Not Loading
**Symptoms**: Fallback to system fonts when local fonts fail
**Solutions**:
- Check network connectivity
- Verify Google Fonts CDN access
- Inspect browser console for font loading errors
- Test with different networks (corporate firewalls may block Google Fonts)

#### 3. Inconsistent Rendering Across Devices
**Symptoms**: Fonts look different on various devices
**Solutions**:
- Use browser developer tools to inspect computed `font-family` values
- Test on actual iOS devices, not just simulators
- Verify font weights are loading correctly
- Check if local font files are compatible with target platforms

#### 4. Performance Issues
**Symptoms**: Slow page loading or font flash
**Solutions**:
- Ensure `display=swap` is used in font imports
- Consider preloading critical fonts
- Use system font fallbacks that match closely

### Testing Checklist

- [ ] Test on iOS Safari (iPhone/iPad)
- [ ] Test on Android Chrome
- [ ] Test on Windows Chrome/Edge
- [ ] Test on macOS Safari
- [ ] Verify font loading in network-restricted environments
- [ ] Check font rendering in both light and dark themes

### Browser DevTools Testing

Use browser developer tools to verify font loading:

1. **Chrome DevTools**:
   - Go to Network tab
   - Filter by "Font" to see font requests
   - Check for 200 status codes on both local and web fonts
   - Verify font file sizes and loading times

2. **Inspect Element**:
   - Right-click on text elements
   - Check "Computed" styles
   - Verify `font-family` shows expected fonts
   - Test with different font weights

3. **Console Warnings**:
   - Look for font loading errors
   - Check for CORS issues with font CDNs
   - Verify local font file accessibility

4. **Application Tab**:
   - Check font cache in Storage section
   - Verify font files are properly cached

## Fallback Strategy

The font system is designed with multiple fallback layers:

1. **Primary**: Local font files (optimal performance)
2. **Secondary**: Web fonts from Google Fonts (cross-platform compatibility)
3. **Tertiary**: Platform-specific system fonts (iOS, Android, Windows)
4. **Final**: Generic font families (serif, sans-serif)

This ensures readable text in all scenarios, even when preferred fonts are unavailable.

## Future Considerations

### Font File Optimization
For better performance:
- Consider using WOFF2 format for smaller file sizes
- Implement font subsetting for reduced bandwidth
- Add font preloading for critical fonts

### Self-Hosted Fonts
Current implementation uses local font files with web font fallbacks:
- ✅ Local TTF files hosted in assets/fonts/
- ✅ @font-face declarations implemented
- ✅ Web font fallbacks via Google Fonts CDN
- Ensure proper font licensing compliance

### Performance Monitoring
- Monitor font loading performance
- Consider using font loading APIs for better control
- Implement font loading strategies for critical rendering path

## Support

For font-related issues:
1. Check this troubleshooting guide
2. Test across multiple devices and browsers
3. Verify network connectivity to font CDNs
4. Report persistent issues with device/browser information

---

**Last Updated**: January 2025
**Tested Platforms**: iOS 14+, Android 10+, Windows 10+, macOS 12+