// Modern JavaScript for the website
(function() {
  'use strict';

  // DOM Elements
  const darkModeToggle = document.getElementById('darkModeToggle');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  // Dark Mode Toggle
  function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      updateThemeIcon(true);
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon(isDarkMode);
  }

  function updateThemeIcon(isDarkMode) {
    const themeIcon = darkModeToggle.querySelector('.theme-icon');
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
  }

  // Scroll to Top Button
  function initScrollTopButton() {
    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
  }

  function handleScroll() {
    const scrolled = window.pageYOffset > 300;
    scrollTopBtn.classList.toggle('visible', scrolled);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Navigation Scrollspy
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

  // Smooth Scroll for Navigation Links
  function initSmoothScroll() {
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
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

  // Intersection Observer for Animations
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section-content, .feature-card, .step, .achievement, .enhancement').forEach(el => {
      observer.observe(el);
    });
  }

  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }

  // Parallax Effect for Hero Background
  function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${parallax}px)`;
      });
    }
  }

  // Typing Animation for Hero Title
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
        }
      }, 100);
    }
  }

  // Initialize all functionality
  function init() {
    initDarkMode();
    initScrollTopButton();
    initScrollSpy();
    initSmoothScroll();
    initIntersectionObserver();
    initParallaxEffect();
    
    // Add initial animation styles
    document.querySelectorAll('.section-content, .feature-card, .step, .achievement, .enhancement').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Initialize typing animation after a delay
    setTimeout(initTypingAnimation, 500);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
