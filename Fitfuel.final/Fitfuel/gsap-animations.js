// GSAP Animations for Landing Page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Custom Cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  gsap.to({}, {
    duration: 0.01,
    repeat: -1,
    onRepeat: function() {
      posX += (mouseX - posX) / 6;
      posY += (mouseY - posY) / 6;
      
      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY
        }
      });
      
      gsap.set(cursorFollower, {
        css: {
          left: posX - 4,
          top: posY - 4
        }
      });
    }
  });

  // Hover effects for cursor
  document.querySelectorAll('a, button, .hoverable').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 2, duration: 0.3 });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
    });
  });

  // Magnetic buttons
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(this, {
        x: (x - rect.width / 2) * 0.2,
        y: (y - rect.height / 2) * 0.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // Hero Section Animations
  const heroTl = gsap.timeline();
  
  // Split text animation
  heroTl
    .fromTo('.reveal-text span span', 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: 'power4.out' 
      }
    )
    .fromTo('#hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.btn-3d',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
      '-=0.6'
    );

  // Mouse scroll animation
  gsap.to('.mouse-scroll', {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Floating elements
  gsap.to('.floating-element', {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.5
  });

  // About Section Animations
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  aboutTl
    .fromTo('.glitch', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.stagger-item',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.parallax-container',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    );

  // Parallax effect for about image
  gsap.to('.parallax-container', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Number counting animation
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.textContent.includes('%') ? '%' : '';
    
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            onUpdate: function() {
              el.innerText = Math.floor(this.targets()[0].innerText) + suffix;
            }
          }
        );
      }
    });
  });

  // Services Section Animations
  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#services',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  servicesTl
    .fromTo('#services h2',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.service-card',
      { opacity: 0, y: 50, rotationY: 15 },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out' 
      },
      '-=0.5'
    );

  // Hover effect for service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 25px 50px rgba(204, 255, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Founders Section Animations
  const foundersTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#team',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  foundersTl
    .fromTo('#team h2',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.founder-card',
      { 
        opacity: 0, 
        y: 80,
        scale: 0.8,
        rotation: -5
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotation: 0,
        duration: 0.8, 
        stagger: 0.15,
        ease: 'back.out(1.7)' 
      },
      '-=0.5'
    );

  // Contact Section Animations
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  contactTl
    .fromTo('#contact h2',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.form-group',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('#contact > div > div:last-child',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.social-icon',
      { opacity: 0, y: 20, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.6'
    );

  // Footer Animations
  gsap.fromTo('.footer-link',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Navbar animation on scroll
  const nav = document.querySelector('nav');
  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      if (self.direction === -1) {
        // Scrolling up
        gsap.to(nav, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else if (self.direction === 1) {
        // Scrolling down
        gsap.to(nav, {
          y: -100,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
  });

  // Glitch effect on hover
  document.querySelectorAll('.glitch').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        '--glitch-intensity': 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        '--glitch-intensity': 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Initialize particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ccff00"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ccff00",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
          }
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }

  // Smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

  // Add CSS for mouse scroll
  const style = document.createElement('style');
  style.textContent = `
    .mouse-scroll {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .mouse {
      width: 30px;
      height: 50px;
      border: 2px solid #ccff00;
      border-radius: 15px;
      position: relative;
    }
    
    .wheel {
      width: 4px;
      height: 10px;
      background: #ccff00;
      border-radius: 2px;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      animation: scroll 2s infinite;
    }
    
    @keyframes scroll {
      0% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
    }
    
    .arrows {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }
    
    .arrow {
      width: 10px;
      height: 10px;
      border-right: 2px solid #ccff00;
      border-bottom: 2px solid #ccff00;
      transform: rotate(45deg);
      margin: -5px;
      animation: arrow 2s infinite;
    }
    
    .arrow:nth-child(2) { animation-delay: 0.2s; }
    .arrow:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes arrow {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});