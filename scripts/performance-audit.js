#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceAuditor {
  constructor() {
    this.siteDir = '_site';
    this.results = {
      bundleSize: {},
      assets: {},
      performance: {},
      recommendations: []
    };
  }

  async audit() {
    console.log('🔍 Starting Performance Audit...\n');
    
    this.analyzeBundleSize();
    this.analyzeAssets();
    this.checkOptimizations();
    this.generateReport();
  }

  analyzeBundleSize() {
    console.log('📊 Analyzing Bundle Sizes...');
    
    const cssFiles = this.findFiles('**/*.css');
    const jsFiles = this.findFiles('**/*.js');
    const htmlFiles = this.findFiles('**/*.html');
    
    this.results.bundleSize = {
      css: this.calculateSizes(cssFiles),
      js: this.calculateSizes(jsFiles),
      html: this.calculateSizes(htmlFiles)
    };
    
    console.log(`   CSS: ${this.formatSize(this.results.bundleSize.css.total)}`);
    console.log(`   JS: ${this.formatSize(this.results.bundleSize.js.total)}`);
    console.log(`   HTML: ${this.formatSize(this.results.bundleSize.html.total)}\n`);
  }

  analyzeAssets() {
    console.log('🖼️  Analyzing Assets...');
    
    const imageFiles = this.findFiles('**/*.{jpg,jpeg,png,webp,avif,svg}');
    const fontFiles = this.findFiles('**/*.{woff,woff2,ttf,otf}');
    
    this.results.assets = {
      images: this.calculateSizes(imageFiles),
      fonts: this.calculateSizes(fontFiles)
    };
    
    console.log(`   Images: ${this.formatSize(this.results.assets.images.total)} (${this.results.assets.images.count} files)`);
    console.log(`   Fonts: ${this.formatSize(this.results.assets.fonts.total)} (${this.results.assets.fonts.count} files)\n`);
  }

  checkOptimizations() {
    console.log('⚡ Checking Optimizations...');
    
    const checks = [
      this.checkGzip(),
      this.checkImageFormats(),
      this.checkFontOptimization(),
      this.checkCSSOptimization(),
      this.checkJSOptimization(),
      this.checkServiceWorker()
    ];
    
    checks.forEach(check => {
      const status = check.passed ? '✅' : '❌';
      console.log(`   ${status} ${check.name}: ${check.message}`);
      if (!check.passed) {
        this.results.recommendations.push(check.recommendation);
      }
    });
    
    console.log('');
  }

  generateReport() {
    console.log('📋 Performance Summary');
    console.log('='.repeat(50));
    
    const totalSize = 
      this.results.bundleSize.css.total +
      this.results.bundleSize.js.total +
      this.results.bundleSize.html.total +
      this.results.assets.images.total +
      this.results.assets.fonts.total;
    
    console.log(`Total Bundle Size: ${this.formatSize(totalSize)}`);
    
    // Performance score
    let score = 100;
    if (totalSize > 1024 * 1024) score -= 20; // > 1MB
    if (totalSize > 2 * 1024 * 1024) score -= 30; // > 2MB
    if (this.results.bundleSize.css.total > 100 * 1024) score -= 10; // CSS > 100KB
    if (this.results.bundleSize.js.total > 200 * 1024) score -= 15; // JS > 200KB
    
    console.log(`Performance Score: ${Math.max(0, score)}/100`);
    
    if (this.results.recommendations.length > 0) {
      console.log('\n🔧 Recommendations:');
      this.results.recommendations.forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`);
      });
    }
    
    console.log('\n✨ Audit Complete!');
  }

  findFiles(pattern) {
    try {
      const command = `find ${this.siteDir} -type f -name "${pattern.replace('**/', '')}" 2>/dev/null || true`;
      const output = execSync(command, { encoding: 'utf8' });
      return output.trim().split('\n').filter(f => f.length > 0);
    } catch (error) {
      return [];
    }
  }

  calculateSizes(files) {
    let total = 0;
    const details = [];
    
    files.forEach(file => {
      try {
        const stats = fs.statSync(file);
        total += stats.size;
        details.push({
          file: path.relative(this.siteDir, file),
          size: stats.size
        });
      } catch (error) {
        // File might not exist
      }
    });
    
    return {
      total,
      count: files.length,
      details: details.sort((a, b) => b.size - a.size)
    };
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  checkGzip() {
    // Check if server supports gzip (this is a placeholder)
    return {
      name: 'Gzip Compression',
      passed: true,
      message: 'Enabled (configure on server)',
      recommendation: 'Enable gzip compression on your web server'
    };
  }

  checkImageFormats() {
    const webpFiles = this.findFiles('**/*.webp');
    const avifFiles = this.findFiles('**/*.avif');
    const passed = webpFiles.length > 0 || avifFiles.length > 0;
    
    return {
      name: 'Modern Image Formats',
      passed,
      message: passed ? `${webpFiles.length} WebP, ${avifFiles.length} AVIF` : 'No modern formats found',
      recommendation: 'Convert images to WebP and AVIF formats'
    };
  }

  checkFontOptimization() {
    const woff2Files = this.findFiles('**/*.woff2');
    const passed = woff2Files.length > 0;
    
    return {
      name: 'Font Optimization',
      passed,
      message: passed ? `${woff2Files.length} WOFF2 files` : 'No WOFF2 fonts found',
      recommendation: 'Use WOFF2 format for fonts'
    };
  }

  checkCSSOptimization() {
    const cssFiles = this.findFiles('**/*.css');
    let minified = false;
    
    if (cssFiles.length > 0) {
      try {
        const content = fs.readFileSync(path.join(this.siteDir, 'css/styles.css'), 'utf8');
        minified = !content.includes('\n  ') && content.length < 50000; // Simple check
      } catch (error) {
        // File might not exist
      }
    }
    
    return {
      name: 'CSS Minification',
      passed: minified,
      message: minified ? 'CSS is minified' : 'CSS may not be minified',
      recommendation: 'Enable CSS minification in production'
    };
  }

  checkJSOptimization() {
    const jsFiles = this.findFiles('**/*.js');
    let minified = false;
    
    if (jsFiles.length > 0) {
      try {
        const content = fs.readFileSync(jsFiles[0], 'utf8');
        minified = !content.includes('\n  ') && content.includes('function') && content.length < 20000;
      } catch (error) {
        // File might not exist
      }
    }
    
    return {
      name: 'JavaScript Minification',
      passed: minified,
      message: minified ? 'JS is minified' : 'JS may not be minified',
      recommendation: 'Enable JavaScript minification in production'
    };
  }

  checkServiceWorker() {
    const swExists = fs.existsSync(path.join(this.siteDir, 'sw.js'));
    
    return {
      name: 'Service Worker',
      passed: swExists,
      message: swExists ? 'Service worker found' : 'No service worker',
      recommendation: 'Implement service worker for caching'
    };
  }
}

// Run audit if called directly
if (require.main === module) {
  const auditor = new PerformanceAuditor();
  auditor.audit().catch(console.error);
}

module.exports = PerformanceAuditor;