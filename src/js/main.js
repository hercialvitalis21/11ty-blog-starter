// Performance-optimized JavaScript for 11ty blog

// Performance: Use modern JavaScript features with fallbacks
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Performance: Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupOptimizations());
    } else {
      this.setupOptimizations();
    }
  }

  setupOptimizations() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupIntersectionObserver();
    this.setupPerformanceMonitoring();
    this.setupServiceWorker();
    this.setupPrefetching();
  }

  // Performance: Enhanced lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // Performance: Optimize image loading
  setupImageOptimization() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" if not already present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  // Performance: Setup intersection observer for animations
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, {
        threshold: 0.1
      });

      animatedElements.forEach(el => animationObserver.observe(el));
    }
  }

  // Performance: Monitor and report performance metrics
  setupPerformanceMonitoring() {
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Measure Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
          // In production, send to analytics
          this.sendMetric('lcp', entry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          this.sendMetric('fid', entry.processingStart - entry.startTime);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Measure Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
        this.sendMetric('cls', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Performance: Setup service worker for caching
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Performance: Prefetch next pages
  setupPrefetching() {
    if ('IntersectionObserver' in window) {
      const links = document.querySelectorAll('a[href^="/"]');
      const linkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target;
            this.prefetchPage(link.href);
            linkObserver.unobserve(link);
          }
        });
      });

      links.forEach(link => linkObserver.observe(link));
    }
  }

  // Performance: Prefetch page resources
  prefetchPage(url) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    }
  }

  // Performance: Send metrics to analytics (placeholder)
  sendMetric(name, value) {
    // In production, send to your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        non_interaction: true,
      });
    }
  }
}

// Performance: Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance: Throttle function for resize events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance: Initialize optimizations
const optimizer = new PerformanceOptimizer();

// Performance: Add smooth scrolling with performance consideration
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Performance: Optimize scroll events
let ticking = false;
function updateScrollPosition() {
  // Add scroll-based optimizations here
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollPosition);
    ticking = true;
  }
});

// Performance: Handle resize events efficiently
window.addEventListener('resize', throttle(() => {
  // Handle responsive adjustments
}, 250));

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PerformanceOptimizer, debounce, throttle };
}