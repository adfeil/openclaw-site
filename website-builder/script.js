// ============================================
// Modern KI-Tools Comparison - v2
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeAffiliateTracking();
  initializeScrollEffects();
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
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Track navigation
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
    'a[href*="openai.com"], ' +
    'a[href*="claude.ai"], ' +
    'a[href*="notion.so"], ' +
    'a[href*="canva.com"], ' +
    'a[href*="zapier.com"]'
  );
  
  affiliateLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const tool = extractToolName(this.textContent);
      const url = this.getAttribute('href');
      
      // Track the click
      trackAffiliateClick(tool, url);
      
      // Add UTM params if not present
      if (url && !url.includes('?')) {
        this.href = url + '?utm_source=ki-tools-v2&utm_medium=affiliate&utm_campaign=' + slugify(tool);
      }
    });
  });
}

function extractToolName(text) {
  const cleaned = text.toLowerCase().trim();
  if (cleaned.includes('chatgpt')) return 'ChatGPT';
  if (cleaned.includes('claude')) return 'Claude';
  if (cleaned.includes('notion')) return 'Notion';
  if (cleaned.includes('canva')) return 'Canva';
  if (cleaned.includes('zapier')) return 'Zapier';
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
  console.log('🎯 Affiliate Click:', {
    tool: tool,
    url: url,
    timestamp: new Date().toISOString(),
    page: window.location.href,
    userAgent: navigator.userAgent
  });
  
  // You can send this to your own backend:
  // fetch('/api/track-affiliate', { 
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ tool, url, timestamp: new Date() })
  // });
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
// Scroll Effects (Parallax, Animations)
// ============================================

function initializeScrollEffects() {
  const cards = document.querySelectorAll('.tool-card, .review-item, .faq-card, .trust-card');
  
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
// Performance Monitoring (Optional)
// ============================================

function logPerformance() {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('⚡ Page Load Time:', pageLoadTime + 'ms');
  }
}

// Log performance when page fully loads
window.addEventListener('load', logPerformance);

// ============================================
// Init
// ============================================

console.log('🚀 KI-Tools Vergleich v2 loaded');

/* ===== Mobile Menu Toggle (Master Template) ===== */
(function () {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    setOpen(!isOpen);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target === btn || btn.contains(e.target)) return;
    if (e.target === nav || nav.contains(e.target)) return;
    setOpen(false);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
