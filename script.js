(function () {
  'use strict';

  // --- Typing Animation ---
  const typingEl = document.getElementById('typing');
  const words = ['Backend .NET Developer', 'API Architect', 'Problem Solver', 'Clean Code Advocate'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1500;
      } else {
        typeSpeed = 80 + Math.random() * 40;
      }
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      } else {
        typeSpeed = 40 + Math.random() * 30;
      }
    }
    setTimeout(typeEffect, typeSpeed);
  }

  if (typingEl) typeEffect();

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light');
      themeToggle.innerHTML = '&#9790;';
    } else {
      document.body.classList.remove('light');
      themeToggle.innerHTML = '&#9788;';
    }
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (!prefersDark.matches) {
    setTheme('light');
  }

  themeToggle.addEventListener('click', function () {
    const isLight = document.body.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  });

  // --- Mobile Hamburger ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '&#10005;' : '&#9776;';
  });

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      hamburger.innerHTML = '&#9776;';
    });
  });

  // --- Scroll Animation (fade-up) ---
  const animateElements = document.querySelectorAll(
    '.project-card, .skill-card, .timeline-item, .about-grid > *'
  );

  function handleScroll() {
    animateElements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 80;
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  animateElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);

  // --- Navbar background on scroll ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'var(--border)';
    } else {
      navbar.style.borderBottomColor = 'transparent';
    }
  });
})();
