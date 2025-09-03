// Enhanced JavaScript for Professional Website
(function() {
  'use strict';

  // DOM Elements
  const darkModeToggle = document.getElementById('darkModeToggle');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  // Dark Mode Toggle (Dark theme by default)
  function initDarkMode() {
    const isLightMode = localStorage.getItem('lightMode') === 'true';
    if (isLightMode) {
      document.body.classList.add('light-mode');
      updateThemeIcon(true);
    } else {
      updateThemeIcon(false);
    }

    darkModeToggle.addEventListener('click', toggleLightMode);
  }

  function toggleLightMode() {
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem('lightMode', isLightMode);
    updateThemeIcon(isLightMode);
  }

  function updateThemeIcon(isLightMode) {
    const themeIcon = darkModeToggle.querySelector('.theme-icon');
    themeIcon.textContent = isLightMode ? '🌙' : '☀️';
  }

  // Enhanced Scroll to Top Button
  function initScrollTopButton() {
    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
  }

  function handleScroll() {
    const scrolled = window.pageYOffset > 300;
    scrollTopBtn.classList.toggle('visible', scrolled);
    
    // Add scroll progress indicator
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled_percent = (winScroll / height) * 100;
    
    // Update any progress bars if they exist
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = scrolled_percent + '%';
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Enhanced Navigation Scrollspy
  function initScrollSpy() {
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
  }

  function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section's nav link
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Enhanced Smooth Scroll for Navigation Links
  function initSmoothScroll() {
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Also handle CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', handleNavClick);
    });
  }

  function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Advanced Intersection Observer for Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.section-content, .feature-card, .step, .achievement, .enhancement, .section'
    );
    
    animatedElements.forEach((el, index) => {
      observer.observe(el);
      
      // Add initial hidden state with stagger delay
      el.style.opacity = '0';
      el.style.transform = 'translateY(60px)';
      el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    });

    // Special staggered animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.animate-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.2 });

    // Observe containers with staggered animations
    document.querySelectorAll('.stagger-container').forEach(container => {
      staggerObserver.observe(container);
    });
  }

  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add subtle bounce effect for cards
        if (entry.target.classList.contains('feature-card') || 
            entry.target.classList.contains('achievement') ||
            entry.target.classList.contains('step')) {
          
          setTimeout(() => {
            entry.target.style.transform = 'translateY(0) scale(1.02)';
            setTimeout(() => {
              entry.target.style.transform = 'translateY(0) scale(1)';
            }, 200);
          }, 100);
        }
      }
    });
  }

  // Enhanced Parallax Effect
  function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (heroBackground || parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        if (heroBackground) {
          const parallax = scrolled * 0.3;
          heroBackground.style.transform = `translateY(${parallax}px)`;
        }
        
        // Other parallax elements
        parallaxElements.forEach((element, index) => {
          const speed = 0.1 + (index * 0.05);
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      });
    }
  }

  // Enhanced Typing Animation
  function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.style.opacity = '1';
      
      let index = 0;
      const typeInterval = setInterval(() => {
        heroTitle.textContent += text[index];
        index++;
        
        if (index >= text.length) {
          clearInterval(typeInterval);
          // Add cursor blink effect
          heroTitle.style.borderRight = '2px solid var(--text-accent)';
          heroTitle.style.animation = 'blink 1s infinite';
          
          setTimeout(() => {
            heroTitle.style.borderRight = 'none';
            heroTitle.style.animation = 'none';
          }, 3000);
        }
      }, 80);
    }
  }

  // Mouse Movement Effects
  function initMouseEffects() {
    document.addEventListener('mousemove', (e) => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }

      // Parallax mouse effect for orbs
      const orbs = document.querySelectorAll('.gradient-orb');
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // Loading Animation
  function initLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay when everything is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
          loadingOverlay.remove();
        }, 500);
      }, 1000);
    });
  }

  // Initialize all functionality
  function init() {
    initLoadingAnimation();
    initDarkMode();
    initScrollTopButton();
    initScrollSpy();
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffect();
    initMouseEffects();
    
    // Initialize typing animation after a delay
    setTimeout(initTypingAnimation, 1500);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
