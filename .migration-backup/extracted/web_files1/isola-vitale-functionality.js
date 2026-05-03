// ISOLA VITALE INTERACTIVE FUNCTIONALITY
// For use with Antigravity Framework

class IsolaVitaleWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupSmoothScrolling();
    this.setupAnimations();
    this.setupProductInteractions();
    this.setupFormHandling();
    this.setupLoadingStates();
  }

  // Navbar functionality
  setupNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class
      if (currentScrollY > 100) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar?.classList.add('navbar-hidden');
      } else {
        navbar?.classList.remove('navbar-hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Intersection Observer for animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add staggered animations for grid items
          if (entry.target.parentElement?.classList.contains('stagger-animation')) {
            const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.product-card, .card, .tech-card, .collection-card, .animate-on-scroll').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Add CSS for animation states
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .navbar-hidden {
        transform: translateY(-100%);
      }
    `;
    document.head.appendChild(style);
  }

  // Product interaction functionality
  setupProductInteractions() {
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart, .btn-add-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAddToCart(button);
      });
    });

    // Product image hover effects
    document.querySelectorAll('.product-image').forEach(image => {
      image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
      });
      
      image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
      });
    });

    // Technology tag interactions
    document.querySelectorAll('.tech-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        this.showTechnologyDetails(tag.textContent.trim());
      });
    });
  }

  // Handle add to cart with animation
  handleAddToCart(button) {
    const originalText = button.textContent;
    const originalBg = button.style.background;
    const originalColor = button.style.color;

    // Change button state
    button.style.background = 'var(--gold-accent)';
    button.style.color = 'var(--emerald-dark)';
    button.innerHTML = 'Added to Collection ✓';
    button.style.transform = 'scale(0.95)';

    // Add cart animation
    this.showCartAnimation(button);

    // Reset button after delay
    setTimeout(() => {
      button.style.background = originalBg;
      button.style.color = originalColor;
      button.innerHTML = originalText;
      button.style.transform = 'scale(1)';
    }, 2000);
  }

  // Cart animation effect
  showCartAnimation(button) {
    const rect = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon') || 
                    document.querySelector('.navbar-content');

    if (!cartIcon) return;

    // Create flying element
    const flyingItem = document.createElement('div');
    flyingItem.style.cssText = `
      position: fixed;
      top: ${rect.top + rect.height/2}px;
      left: ${rect.left + rect.width/2}px;
      width: 20px;
      height: 20px;
      background: var(--emerald-primary);
      border-radius: 50%;
      z-index: 9999;
      pointer-events: none;
      transform: scale(0);
    `;
    
    document.body.appendChild(flyingItem);

    // Animate to cart
    const cartRect = cartIcon.getBoundingClientRect();
    
    flyingItem.animate([
      { 
        transform: 'scale(1)', 
        top: `${rect.top + rect.height/2}px`,
        left: `${rect.left + rect.width/2}px`
      },
      { 
        transform: 'scale(0)', 
        top: `${cartRect.top + cartRect.height/2}px`,
        left: `${cartRect.left + cartRect.width/2}px`
      }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
      flyingItem.remove();
    };
  }

  // Show technology details modal
  showTechnologyDetails(techName) {
    const techData = {
      'OS-01 SENOMORPHIC': {
        title: 'OS-01 Senomorphic Technology',
        description: 'Revolutionary peptide technology that specifically targets and eliminates senescent cells, promoting cellular renewal and combating the fundamental causes of skin aging.',
        benefits: [
          'Targets senescent cells for elimination',
          'Promotes cellular renewal and regeneration',
          'Reduces visible signs of aging',
          'Improves skin texture and firmness'
        ]
      },
      'GLP-1': {
        title: 'GLP-1 Protection System',
        description: 'Advanced metabolic support system that enhances skin\'s natural defense mechanisms while promoting optimal cellular energy and protection against environmental damage.',
        benefits: [
          'Enhances natural defense mechanisms',
          'Promotes optimal cellular energy',
          'Provides environmental protection',
          'Supports metabolic skin health'
        ]
      },
      'FERMENTED': {
        title: 'Fermented Botanical Complex',
        description: 'Precision-fermented botanical ingredients with enhanced bioavailability and potency, delivering maximum efficacy through advanced biotechnology processing.',
        benefits: [
          'Enhanced bioavailability',
          'Increased ingredient potency',
          'Improved skin penetration',
          'Advanced biotechnology processing'
        ]
      },
      'DWAT RESTORATION': {
        title: 'DWAT Restoration Technology',
        description: 'Deep barrier repair technology that rebuilds skin\'s fundamental moisture retention capabilities and strengthens the skin\'s protective barrier function.',
        benefits: [
          'Rebuilds moisture retention',
          'Strengthens protective barrier',
          'Provides long-lasting hydration',
          'Improves skin resilience'
        ]
      },
      'ECTOIN': {
        title: 'Ectoin Environmental Defense',
        description: 'Extremophile-derived protection molecule that shields skin from environmental stressors, pollution, and UV damage while supporting cellular stability.',
        benefits: [
          'Environmental stress protection',
          'Anti-pollution defense',
          'UV damage prevention',
          'Cellular stability support'
        ]
      }
    };

    const data = techData[techName.toUpperCase()] || 
                  Object.values(techData).find(tech => 
                    techName.toUpperCase().includes(tech.title.split(' ')[0]));

    if (data) {
      this.showModal(data);
    }
  }

  // Modal functionality
  showModal(data) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.tech-modal');
    if (!modal) {
      modal = this.createModal();
    }

    // Update modal content
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-description').textContent = data.description;
    
    const benefitsList = modal.querySelector('.modal-benefits');
    benefitsList.innerHTML = data.benefits
      .map(benefit => `<li>${benefit}</li>`)
      .join('');

    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
  }

  // Create modal element
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'tech-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h3 class="modal-title"></h3>
        <p class="modal-description"></p>
        <h4>Key Benefits:</h4>
        <ul class="modal-benefits"></ul>
      </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
      .tech-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .tech-modal.show {
        opacity: 1;
      }
      
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }
      
      .modal-content {
        background: white;
        padding: 40px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        border: 1px solid var(--emerald-primary);
      }
      
      .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: var(--text-secondary);
      }
      
      .modal-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 28px;
        color: var(--emerald-primary);
        margin-bottom: 20px;
      }
      
      .modal-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 25px;
        color: var(--text-primary);
      }
      
      .modal-benefits {
        list-style: none;
        padding: 0;
      }
      
      .modal-benefits li {
        padding: 8px 0;
        border-bottom: 1px solid rgba(45, 90, 39, 0.1);
        position: relative;
        padding-left: 20px;
      }
      
      .modal-benefits li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--emerald-primary);
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);

    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
      this.hideModal(modal);
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
      this.hideModal(modal);
    });

    document.body.appendChild(modal);
    return modal;
  }

  // Hide modal
  hideModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Form handling
  setupFormHandling() {
    // Newsletter signup
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSignup(form);
      });
    });

    // Contact form
    document.querySelectorAll('.contact-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactForm(form);
      });
    });

    // Consultation form
    document.querySelectorAll('.consultation-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleConsultationForm(form);
      });
    });
  }

  // Newsletter signup handling
  handleNewsletterSignup(form) {
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    const originalText = button.textContent;

    if (!this.validateEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    button.textContent = 'Subscribing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
      this.showNotification('Welcome to Isola Vitale! Check your email for exclusive offers.', 'success');
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 1000);
  }

  // Contact form handling
  handleContactForm(form) {
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
      this.showNotification('Thank you for your message. We will respond within 24 hours.', 'success');
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);
  }

  // Consultation form handling
  handleConsultationForm(form) {
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Processing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
      this.showNotification('Your consultation request has been received. Our experts will contact you soon.', 'success');
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }

  // Email validation
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Notification system
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 16px 24px;
          border-radius: 4px;
          color: white;
          font-weight: 500;
          z-index: 10001;
          max-width: 400px;
          transform: translateX(500px);
          transition: transform 0.3s ease;
        }
        
        .notification-success {
          background: var(--emerald-primary);
        }
        
        .notification-error {
          background: var(--error);
        }
        
        .notification-info {
          background: var(--info);
        }
        
        .notification.show {
          transform: translateX(0);
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove notification
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Loading states
  setupLoadingStates() {
    // Page load animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Utility methods
  debounce(func, wait) {
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

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main website functionality
  window.website = new IsolaVitaleWebsite();
  
  // Initialize any page-specific functionality
  if (typeof pageSpecificInit === 'function') {
    pageSpecificInit();
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IsolaVitaleWebsite };
}