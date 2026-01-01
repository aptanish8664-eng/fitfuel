// ===== DYNAMIC BACKGROUND ANIMATIONS =====

class DynamicBackground {
  constructor() {
    this.initParticles();
    this.initDataStream();
    this.initMouseTrail();
    this.initScrollEffects();
    this.initTabAnimations();
  }

  // Particle system for background
  initParticles() {
    // Remove existing particle container if any
    const existing = document.querySelector('.particle-bg');
    if (existing) existing.remove();
    
    const container = document.createElement('div');
    container.className = 'particle-bg';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(circle at 20% 50%, rgba(204, 255, 0, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(204, 255, 0, 0.03) 0%, transparent 50%),
                  #050505;
    `;
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        background: rgba(204, 255, 0, 0.1);
        border-radius: 50%;
        animation: float 15s infinite linear;
      `;
      
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-100px) translateX(100px); }
        50% { transform: translateY(0) translateX(200px); }
        75% { transform: translateY(100px) translateX(100px); }
      }
    `;
    document.head.appendChild(style);
  }

  // Data stream effect
  initDataStream() {
    const container = document.createElement('div');
    container.className = 'data-stream';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    `;
    document.body.appendChild(container);

    setInterval(() => {
      const stream = document.createElement('div');
      stream.style.cssText = `
        position: absolute;
        width: 1px;
        height: ${Math.random() * 100 + 50}px;
        background: linear-gradient(to bottom, transparent, #ccff00, transparent);
        animation: streamFall 3s linear infinite;
        opacity: ${Math.random() * 0.4 + 0.1};
        left: ${Math.random() * 100}%;
      `;
      
      container.appendChild(stream);
      
      setTimeout(() => stream.remove(), 4000);
    }, 100);
    
    // Add stream animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes streamFall {
        0% {
          transform: translateY(-100px);
          opacity: 0;
        }
        10% {
          opacity: 0.5;
        }
        90% {
          opacity: 0.5;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  initMouseTrail() {
    // Mouse trail implementation
    const trail = document.createElement('div');
    trail.id = 'mouse-trail';
    trail.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(204,255,0,0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, opacity 0.2s;
    `;
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      
      requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
  }

  initScrollEffects() {
    // Simple scroll effect
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const layers = document.querySelectorAll('[data-depth]');
      layers.forEach(layer => {
        const depth = layer.dataset.depth || 0.3;
        layer.style.transform = `translateY(${scrolled * depth}px)`;
      });
    });
  }

  initTabAnimations() {
    // Add hover effects to tabs
    const tabs = document.querySelectorAll('.nav-btn');
    tabs.forEach(tab => {
      tab.addEventListener('mouseenter', () => {
        tab.style.transform = 'translateX(10px)';
        tab.style.transition = 'transform 0.3s ease';
      });
      
      tab.addEventListener('mouseleave', () => {
        tab.style.transform = 'translateX(0)';
      });
      
      tab.addEventListener('click', () => {
        // Add active state
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.bgAnimations = new DynamicBackground();
  
  // Add CSS for active tab
  const style = document.createElement('style');
  style.textContent = `
    .nav-btn.active {
      background: rgba(204,255,0,0.1) !important;
      color: #ccff00 !important;
      border-left: 3px solid #ccff00;
    }
    
    .interactive-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .interactive-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(204, 255, 0, 0.1);
    }
  `;
  document.head.appendChild(style);
});