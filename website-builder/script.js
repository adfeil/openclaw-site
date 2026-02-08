// ============================================
// Website Builder Comparison - Full Version
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeAffiliateTracking();
  initializeScrollEffects();
  initializeStickyButton();
});

// ============================================
// Navigation & Smooth Scroll
// ============================================

function initializeNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target && href !== '#') {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackEvent('navigation', href);
      }
    });
  });
}

// ============================================
// Affiliate Link Tracking
// ============================================

function initializeAffiliateTracking() {
  const affiliateLinks = document.querySelectorAll(
    'a[href*="wix.com"], ' +
    'a[href*="squarespace.com"], ' +
    'a[href*="webflow.com"], ' +
    'a[href*="shopify.com"], ' +
    'a[href*="hostinger.com"]'
  );
  
  affiliateLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const tool = extractToolName(this.textContent);
      const url = this.getAttribute('href');
      
      trackAffiliateClick(tool, url);
      
      if (url && !url.includes('?')) {
        this.href = url + '?utm_source=website-builder-vergleich&utm_medium=affiliate&utm_campaign=' + slugify(tool);
      }
    });
  });
}

function extractToolName(text) {
  const cleaned = text.toLowerCase().trim();
  if (cleaned.includes('wix')) return 'Wix';
  if (cleaned.includes('squarespace')) return 'Squarespace';
  if (cleaned.includes('webflow')) return 'Webflow';
  if (cleaned.includes('shopify')) return 'Shopify';
  if (cleaned.includes('hostinger')) return 'Hostinger';
  return 'Unknown';
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function trackAffiliateClick(tool, url) {
  console.log('🎯 Website Builder Affiliate Click:', {
    tool: tool,
    url: url,
    timestamp: new Date().toISOString(),
    page: window.location.href
  });
}

function trackEvent(category, action, label = '') {
  console.log('📊 Event:', {
    category,
    action,
    label,
    timestamp: new Date().toISOString()
  });
}

// ============================================
// Scroll Effects (Animations)
// ============================================

function initializeScrollEffects() {
  const cards = document.querySelectorAll(
    '.problem-card, ' +
    '.review-item, ' +
    '.faq-card, ' +
    '.trust-card, ' +
    '.decision-case'
  );
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });
  }
}

// ============================================
// Sticky CTA Button (Smooth Show/Hide)
// ============================================

function initializeStickyButton() {
  const stickyBtn = document.querySelector('.sticky-cta');
  const comparisonSection = document.getElementById('vergleich');
  
  if (!stickyBtn || !comparisonSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hide when comparison is visible
        stickyBtn.style.opacity = '0';
        stickyBtn.style.pointerEvents = 'none';
      } else {
        // Show when comparison is out of view
        stickyBtn.style.opacity = '1';
        stickyBtn.style.pointerEvents = 'auto';
      }
    });
  });
  
  observer.observe(comparisonSection);
  
  // Always show when scrolling up (near top)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 500) {
      stickyBtn.style.opacity = '0';
      stickyBtn.style.pointerEvents = 'none';
    }
  });
}

// ============================================
// Performance Monitoring (Optional)
// ============================================

function logPerformance() {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('⚡ Page Load Time:', pageLoadTime + 'ms');
  }
}

window.addEventListener('load', logPerformance);

// ============================================
// Initialize
// ============================================

console.log('🌐 Website Builder Comparison loaded');
