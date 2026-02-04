// ============================================
// Affiliate Tool Comparison Site - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeScrollTracking();
  initializeTableStickiness();
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
          
          // Track in analytics (if you add later)
          trackEvent('navigation', this.getAttribute('href'));
        }
      });
    }
  });
}

// ============================================
// Table Stickiness on Scroll
// ============================================

function initializeTableStickiness() {
  const tableWrapper = document.querySelector('.table-wrapper');
  if (!tableWrapper) return;
  
  window.addEventListener('scroll', function() {
    const comparisonSection = document.querySelector('.comparison');
    const tableTop = comparisonSection.offsetTop;
    const tableBottom = tableTop + comparisonSection.offsetHeight;
    const scrollTop = window.scrollY;
    
    if (scrollTop > tableTop && scrollTop < tableBottom) {
      tableWrapper.classList.add('sticky');
    } else {
      tableWrapper.classList.remove('sticky');
    }
  });
}

// ============================================
// Affiliate Link Tracking
// ============================================

function initializeAffiliateTracking() {
  const affiliateLinks = document.querySelectorAll('.affiliate-btn, .cta-button');
  
  affiliateLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const tool = this.textContent.trim();
      const href = this.getAttribute('href');
      
      // Track the click (for your own analytics)
      trackAffiliateClick(tool, href);
      
      // Optional: Add UTM parameter to track source
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
  
  // You can send this to a backend endpoint
  // fetch('/api/track', { method: 'POST', body: JSON.stringify({...}) })
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
// Optional: FAQ Toggle (if you want collapsible FAQs)
// ============================================

function initializeFAQToggle() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach((item, index) => {
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    
    h3.style.cursor = 'pointer';
    h3.addEventListener('click', function() {
      p.style.display = p.style.display === 'none' ? 'block' : 'none';
      item.classList.toggle('active');
    });
  });
}

// ============================================
// Social Media Share (Optional)
// ============================================

function shareOnSocial(platform) {
  const url = window.location.href;
  const title = 'Die 5 besten KI-Tools für kleine Unternehmen';
  const text = 'Entdecke ChatGPT, Claude, Notion AI und mehr. Unabhängiger Vergleich für kleine Unternehmen.';
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  };
  
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

// ============================================
// Performance: Lazy Load Images (optional)
// ============================================

function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// ============================================
// SEO: Send Page View (Optional Google Analytics)
// ============================================

function initializeAnalytics() {
  // If you want to add Google Analytics or similar, do it here
  // Example:
  // window.gtag('config', 'GA_ID', {
  //   'page_path': window.location.pathname,
  //   'page_title': document.title
  // });
}

// ============================================
// Initialize Everything
// ============================================

function initializePage() {
  initializeScrollTracking();
  initializeTableStickiness();
  initializeAffiliateTracking();
  // initializeLazyLoading(); // Uncomment if you add image lazy loading
  // initializeAnalytics(); // Uncomment if you add Google Analytics
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}

// ============================================
// Export for testing (optional)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    slugify,
    trackEvent,
    trackAffiliateClick,
    shareOnSocial
  };
}
