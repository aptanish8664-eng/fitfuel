// Smooth scrolling and interactive effects for all pages

document.addEventListener('DOMContentLoaded', function() {
  // Parallax scrolling effect
  function handleParallax() {
    const scrolled = window.pageYOffset;
    
    // Move elements at different speeds
    const layers = document.querySelectorAll('[data-speed]');
    layers.forEach(layer => {
      const speed = layer.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
    
    // Fade in/out elements based on scroll
    const fadeElements = document.querySelectorAll('[data-fade]');
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      
      if (rect.top < windowHeight - elementVisible) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }
  
  // Interactive cursor
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #ccff00;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s, opacity 0.2s;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursor);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();
  
  // Hover effects for interactive elements
  document.querySelectorAll('a, button, .interactive').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(204, 255, 0, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
  
  // Scroll events
  window.addEventListener('scroll', handleParallax);
  
  // Initialize
  handleParallax();
});