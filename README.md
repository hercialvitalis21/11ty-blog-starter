# 11ty Performance-Optimized Blog Starter

A blazing fast 11ty blog starter with comprehensive performance optimizations built-in. Achieve excellent Core Web Vitals scores out of the box.

## 🚀 Performance Features

### Bundle Size Optimization
- **CSS Minification**: CleanCSS with cssnano for production builds
- **JavaScript Bundling**: esbuild with tree shaking and minification
- **HTML Minification**: html-minifier removes whitespace and comments
- **Critical CSS**: Inlined above-the-fold styles for faster rendering

### Image Optimization
- **Modern Formats**: Automatic WebP and AVIF generation
- **Responsive Images**: Multiple sizes with `srcset` and `sizes`
- **Lazy Loading**: Intersection Observer API for progressive loading
- **Optimized Attributes**: `loading="lazy"` and `decoding="async"`

### Font Optimization
- **WOFF2 Format**: Modern, compressed font format
- **Font Preloading**: Critical fonts preloaded in `<head>`
- **Font Display**: `font-display: swap` prevents layout shifts
- **System Fallbacks**: Graceful degradation to system fonts

### Caching & Service Worker
- **Service Worker**: Offline support and asset caching
- **Resource Prefetching**: Next pages prefetched on hover
- **Browser Caching**: Optimized cache headers
- **Static Asset Caching**: Long-term caching for immutable assets

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, and CLS monitoring
- **Bundle Analysis**: Built-in performance audit script
- **Lighthouse CI**: Automated performance testing
- **Real User Monitoring**: Performance API integration

## 📊 Performance Targets

This starter is optimized to achieve:
- **Lighthouse Score**: 95+ across all categories
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1
- **Bundle Size**: < 500KB total

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:prod

# Run performance audit
npm run audit

# Full optimization check
npm run optimize
```

## 📋 Performance Commands

- `npm run dev` - Development server with hot reload
- `npm run build:prod` - Production build with optimizations
- `npm run audit` - Bundle size and optimization analysis
- `npm run lighthouse` - Lighthouse CI performance testing
- `npm run perf` - Complete performance analysis
- `npm run optimize` - Clean build + audit

## 🏗️ Project Structure

```
src/
├── _includes/          # Templates and layouts
│   └── base.njk       # Optimized base template
├── _data/             # Site configuration
│   └── site.json      # Site metadata
├── posts/             # Blog posts
├── css/               # Stylesheets
│   └── styles.css     # Optimized CSS
├── js/                # JavaScript
│   └── main.js        # Performance-optimized JS
└── assets/            # Static assets
    ├── images/        # Optimized images
    └── fonts/         # WOFF2 fonts

scripts/
└── performance-audit.js  # Bundle analysis tool
```

## ⚙️ Configuration

### Environment Variables
- `NODE_ENV=production` - Enables all optimizations

### 11ty Configuration
Key optimizations in `.eleventy.js`:
- Image processing with multiple formats
- CSS/JS minification transforms
- HTML minification in production
- Asset copying with caching

### Performance Monitoring
Configure in `.lighthouserc.js`:
- Performance thresholds
- Core Web Vitals targets
- Accessibility requirements

## 🎯 Optimization Checklist

### Images
- [ ] Add optimized images to `src/assets/images/`
- [ ] Use `{%raw%}{% image %}{%endraw%}` shortcode for responsive images
- [ ] Implement lazy loading for below-fold images

### Fonts
- [ ] Download WOFF2 fonts (see `font-optimization.md`)
- [ ] Place fonts in `src/assets/fonts/`
- [ ] Update font preload links in base template

### CSS
- [ ] Keep critical CSS under 14KB
- [ ] Use CSS custom properties for theming
- [ ] Minimize unused CSS

### JavaScript
- [ ] Keep initial bundle under 200KB
- [ ] Use modern JavaScript features
- [ ] Implement code splitting for large features

## 📈 Performance Monitoring

### Built-in Analytics
The starter includes performance monitoring:
- Core Web Vitals tracking
- Bundle size analysis
- Resource timing metrics
- User experience monitoring

### Third-party Integration
Easy integration with:
- Google Analytics 4
- Google Tag Manager
- Performance monitoring services

## 🔧 Customization

### Adding New Optimizations
1. Modify `.eleventy.js` for build-time optimizations
2. Update `src/js/main.js` for runtime optimizations
3. Extend `scripts/performance-audit.js` for new checks

### Performance Budget
Set performance budgets in `.lighthouserc.js`:
```javascript
assertions: {
  'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
  'total-blocking-time': ['warn', { maxNumericValue: 300 }]
}
```

## 🚦 Performance Best Practices

### Loading Strategy
1. **Critical resources**: Inlined or preloaded
2. **Above-fold content**: Prioritized loading
3. **Below-fold content**: Lazy loaded
4. **Non-critical assets**: Deferred loading

### Caching Strategy
1. **HTML**: Short cache (1 hour)
2. **CSS/JS**: Long cache with versioning
3. **Images**: Long cache (1 year)
4. **Fonts**: Long cache (1 year)

## 📚 Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [11ty Documentation](https://www.11ty.dev/docs/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## 🤝 Contributing

Contributions welcome! Please ensure all performance optimizations maintain or improve the current performance scores.

## 📄 License

MIT License - feel free to use for any project!
