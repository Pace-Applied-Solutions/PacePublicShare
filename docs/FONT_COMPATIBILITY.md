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

### 1. Web Font Integration

Added Google Fonts import for cross-platform compatibility:

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600&family=Oswald:wght@300;400;500;600&display=swap');
```

**Web Font Alternatives:**
- **Oswald**: Similar characteristics to Agency FB for titles
- **Barlow Condensed**: Similar to Bahnschrift Light Condensed for headings

### 2. Enhanced Font Stacks

#### Title Font (Agency FB replacement)
```css
--pace-font-family-title: 'Agency FB', 'Oswald', 'Arial Narrow', 'Helvetica Neue Condensed', 'Avenir Next Condensed', 'Impact', 'Helvetica Neue', Arial, sans-serif;
```

#### Primary Heading Font (Bahnschrift replacement)
```css
--pace-font-family-heading: 'Bahnschrift Light Condensed', 'Bahnschrift Light', 'Bahnschrift', 'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue Condensed', 'Avenir Next Condensed', 'Trebuchet MS', 'Helvetica Neue', Arial, sans-serif;
```

### 3. iOS-Specific Fallbacks

Added iOS system fonts to font stacks:
- **Helvetica Neue Condensed**: Native iOS condensed font
- **Avenir Next Condensed**: iOS system font alternative
- **Impact**: Bold title font available on iOS

## Font Loading Strategy

### Performance Optimization
- Uses `display=swap` parameter for faster font loading
- Graceful fallback to system fonts if web fonts fail to load
- Maintains visual hierarchy even when custom fonts aren't available

### Cross-Platform Testing
The solution ensures:
- **Windows**: Original fonts (Agency FB, Bahnschrift) when available
- **iOS**: Web fonts (Oswald, Barlow Condensed) or iOS system fonts
- **Android**: Web fonts or Android system fonts
- **Other platforms**: Appropriate system font fallbacks

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

#### 1. Fonts Not Loading
**Symptoms**: Default system fonts appear instead of custom fonts
**Solutions**:
- Check network connectivity
- Verify Google Fonts CDN access
- Inspect browser console for font loading errors
- Test with different networks (corporate firewalls may block Google Fonts)

#### 2. Inconsistent Rendering Across Devices
**Symptoms**: Fonts look different on various devices
**Solutions**:
- Use browser developer tools to inspect computed `font-family` values
- Test on actual iOS devices, not just simulators
- Verify font weights are loading correctly

#### 3. Performance Issues
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
   - Check for 200 status codes

2. **Inspect Element**:
   - Right-click on text elements
   - Check "Computed" styles
   - Verify `font-family` shows expected fonts

3. **Console Warnings**:
   - Look for font loading errors
   - Check for CORS issues with font CDNs

## Fallback Strategy

The font system is designed with multiple fallback layers:

1. **Primary**: Original system fonts (Windows)
2. **Secondary**: Web fonts (cross-platform)
3. **Tertiary**: Platform-specific system fonts (iOS, Android)
4. **Final**: Generic font families (serif, sans-serif)

This ensures readable text in all scenarios, even when preferred fonts are unavailable.

## Future Considerations

### Self-Hosted Fonts
For environments where external CDNs are blocked:
- Consider hosting font files locally
- Implement `@font-face` declarations for custom fonts
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