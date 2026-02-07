// ============================================
// Affiliate Tool Comparison Site - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeScrollTracking();
  initializeAffiliateTracking();
});

// ============================================
// Smooth Scroll Tracking
// ============================================

function initializeScrollTracking() {
  const navLinks = document.querySelectorAll('.nav a, .cta-button');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href')?.startsWith('#')) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          trackEvent('navigation', this.getAttribute('href'));
        }
      });
    }
  });
}

// ============================================
// Affiliate Link Tracking
// ============================================

function initializeAffiliateTracking() {
  const affiliateLinks = document.querySelectorAll('.affiliate-btn, .cta-button[href*="openai"], .cta-button[href*="claude"], .cta-button[href*="notion"], .cta-button[href*="canva"], .cta-button[href*="zapier"]');
  
  affiliateLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const tool = this.textContent.trim();
      const href = this.getAttribute('href');
      
      trackAffiliateClick(tool, href);
      
      if (href && !href.includes('?')) {
        this.href = href + '?utm_source=ki-tools-vergleich&utm_medium=affiliate&utm_campaign=' + slugify(tool);
      }
    });
  });
}

function trackAffiliateClick(tool, url) {
  console.log('Affiliate Click:', {
    tool: tool,
    url: url,
    timestamp: new Date().toISOString(),
    page: window.location.href
  });
}

function trackEvent(category, action, label = '') {
  console.log('Event Tracked:', {
    category,
    action,
    label,
    timestamp: new Date().toISOString()
  });
}

// ============================================
// Utility Functions
// ============================================

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================
// Initialize Everything
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeScrollTracking();
    initializeAffiliateTracking();
  });
} else {
  initializeScrollTracking();
  initializeAffiliateTracking();
}
