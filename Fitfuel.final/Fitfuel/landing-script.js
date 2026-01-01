// Landing Page Interactive Script with Enhanced Scroll Animations and Review Carousel

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
  });

  // Enhanced GSAP Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

  // Create custom cursor
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #ccff00;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  `;

  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  cursorFollower.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 1px solid #ccff00;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    mix-blend-mode: difference;
    opacity: 0.3;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);

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

  // Animated Counter
  function animateCounter(id, target, duration = 2000) {
    const element = document.getElementById(id);
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
  }

  // ===========================================
  // RANDOM REVIEW GENERATOR & CAROUSEL
  // ===========================================
  
  // Review Data Generator
  const reviewData = {
    names: [
      "Michael Torres", "Sarah Johnson", "David Chen", "Jessica Lee", 
      "Robert Brown", "Emily Davis", "Chris Wilson", "Amanda Martinez",
      "Alex Turner", "Maria Garcia", "James Wilson", "Sophia Rodriguez",
      "Daniel Kim", "Olivia Parker", "Ryan Cooper", "Emma Thompson"
    ],
    
    roles: [
      "Professional Athlete", "Marathon Runner", "Fitness Transformation", 
      "Yoga Instructor", "CrossFit Enthusiast", "Weight Loss Journey", 
      "Bodybuilder", "Personal Trainer", "Triathlete", "Powerlifter",
      "Calisthenics Coach", "Wellness Coach", "Fitness Model", "Sports Scientist"
    ],
    
    texts: [
      "FitFuel's AI analysis of my medical reports helped identify deficiencies I didn't know I had. My performance improved by 30% in 3 months!",
      "The personalized diet protocol changed everything. I recovered faster, trained harder, and achieved my personal best.",
      "From desk job to fitness competitor in 9 months. The AI coach was like having a personal trainer available 24/7.",
      "I've tried every fitness app out there, but FitFuel's AI-driven approach is on another level. It's like having a team of experts in your pocket.",
      "The training matrix adapted to my injury history and helped me train safely while still making incredible progress.",
      "I lost 25kg and gained 10kg of muscle in 6 months. The AI kept me motivated and adjusted my plan as I progressed.",
      "As a professional athlete, the marginal gains are everything. FitFuel helped me optimize my recovery and nutrition to peak at the right time.",
      "The medical report analysis caught a potential issue early. I'm convinced this platform saved me from a serious injury.",
      "The calorie calculator was spot-on! I finally understand my body's needs and can adjust based on my goals.",
      "Never thought AI could understand fitness so well. The workout plans are challenging yet achievable.",
      "My cholesterol levels improved dramatically after following FitFuel's nutrition recommendations.",
      "The 24/7 AI coach answered all my questions instantly. It's like having a personal trainer in your pocket!"
    ],
    
    results: [
      "Results: Gained 8kg muscle, 15% strength increase",
      "Results: 18% faster recovery, new PB by 12 minutes",
      "Results: Lost 25kg, gained 10kg muscle",
      "Results: Reduced body fat by 12%, improved endurance by 40%",
      "Results: Recovered from injury, returned to training in 4 weeks",
      "Results: Achieved 12% body fat, ran first marathon",
      "Results: Improved vertical jump by 8 inches, increased sprint speed by 5%",
      "Results: Qualified for national championships, set 3 personal records",
      "Results: Lowered BMI from 28 to 22 in 6 months",
      "Results: Increased energy levels by 60%, better sleep quality",
      "Results: Reduced resting heart rate by 15 bpm",
      "Results: Improved blood pressure from 140/90 to 120/80"
    ],
    
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    ]
  };

  // Generate random review
  function generateRandomReview() {
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    const getRandomRating = () => Math.random() > 0.3 ? 5 : (Math.random() > 0.5 ? 4 : 4.5);
    
    return {
      name: getRandomItem(reviewData.names),
      role: getRandomItem(reviewData.roles),
      image: getRandomItem(reviewData.images),
      rating: getRandomRating(),
      text: getRandomItem(reviewData.texts),
      result: getRandomItem(reviewData.results)
    };
  }

  // Generate multiple reviews
  function generateReviews(count = 8) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
      reviews.push(generateRandomReview());
    }
    return reviews;
  }

  // Create review HTML
  function createReviewHTML(review, index) {
    const stars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < stars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return `
      <div class="review-slide" data-index="${index}">
        <div class="glass p-8 rounded-2xl interactive-card h-full">
          <div class="flex items-center mb-6">
            <img src="${review.image}" 
                 alt="${review.name}" 
                 class="w-16 h-16 rounded-full border-2 border-[#ccff00] object-cover">
            <div class="ml-4">
              <h4 class="font-bold text-lg orbitron">${review.name}</h4>
              <p class="text-sm text-[#ccff00]">${review.role}</p>
            </div>
          </div>
          <div class="flex text-yellow-400 mb-4">
            ${starsHTML}
            <span class="ml-2 text-white">${review.rating.toFixed(1)}</span>
          </div>
          <p class="opacity-80 italic mb-6">"${review.text}"</p>
          <div class="pt-4 border-t border-zinc-800">
            <p class="text-sm text-[#ccff00]">${review.result}</p>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize Review Carousel
  function initReviewCarousel() {
    const track = document.getElementById('review-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const autoplayToggle = document.getElementById('autoplay-toggle');
    const autoplayStatus = document.getElementById('autoplay-status');
    
    if (!track) return;
    
    // Generate 8 random reviews
    const reviews = generateReviews(8);
    let currentSlide = 0;
    let autoplayInterval;
    let isAutoplay = true;
    
    // Render reviews
    track.innerHTML = reviews.map((review, index) => createReviewHTML(review, index)).join('');
    
    // Create dots
    dotsContainer.innerHTML = reviews.map((_, index) => 
      `<div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
    ).join('');
    
    // Update carousel position
    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      
      // Add animation class
      track.classList.add('transitioning');
      setTimeout(() => {
        track.classList.remove('transitioning');
      }, 800);
    }
    
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % reviews.length;
      updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + reviews.length) % reviews.length;
      updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      updateCarousel();
    }
    
    // Auto-play functionality
    function startAutoplay() {
      if (isAutoplay) {
        autoplayInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
        autoplayToggle.querySelector('.toggle-circle').style.transform = 'translateX(24px)';
        autoplayStatus.textContent = 'ON';
      }
    }
    
    function stopAutoplay() {
      clearInterval(autoplayInterval);
      autoplayToggle.querySelector('.toggle-circle').style.transform = 'translateX(0)';
      autoplayStatus.textContent = 'OFF';
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
      prevSlide();
      if (isAutoplay) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      if (isAutoplay) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    });
    
    // Dot navigation
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) {
        const index = parseInt(dot.dataset.index);
        goToSlide(index);
        if (isAutoplay) {
          clearInterval(autoplayInterval);
          startAutoplay();
        }
      }
    });
    
    // Auto-play toggle
    autoplayToggle.addEventListener('click', () => {
      isAutoplay = !isAutoplay;
      if (isAutoplay) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });
    
    // Initialize autoplay
    startAutoplay();
    
    // Add hover pause
    track.addEventListener('mouseenter', () => {
      if (isAutoplay) {
        clearInterval(autoplayInterval);
      }
    });
    
    track.addEventListener('mouseleave', () => {
      if (isAutoplay) {
        startAutoplay();
      }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  }

  // Enhanced scroll-triggered animations
  function initScrollAnimations() {
    // Hero section animations
    gsap.from('.reveal-text span span', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#home',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    // Hero image parallax
    gsap.to('.hero-image', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-image-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // About section parallax
    gsap.to('.parallax-container', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Founder cards animation
    gsap.utils.toArray('.founder-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        rotationY: 15,
        opacity: 0,
        duration: 1,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Review section animation
    gsap.from('.review-carousel', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#reviews',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Form group animations
    gsap.utils.toArray('.form-group').forEach((group, i) => {
      gsap.from(group, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Social icon animations
    gsap.utils.toArray('.social-icon').forEach((icon, i) => {
      gsap.from(icon, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: icon,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Footer link animations
    gsap.utils.toArray('.footer-link').forEach((link, i) => {
      gsap.from(link, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Number counting animation
    document.querySelectorAll('[data-count]').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.textContent.includes('%') ? '%' : '';
          
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
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: targetElement,
            offsetY: 80
          },
          ease: 'power2.inOut'
        });
      }
    });
  });

  // Interactive Mouse Trails
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    // Smoother follower movement
    followerX += (mouseX - followerX) * 0.05;
    followerY += (mouseY - followerY) * 0.05;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(updateCursor);
  }

  // Hover effects for interactive elements
  document.querySelectorAll('a, button, .interactive-card, .founder-card, .review-carousel').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Animation on submit
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> MESSAGE SENT!';
          submitBtn.classList.remove('bg-[#ccff00]');
          submitBtn.classList.add('bg-green-500');
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.add('bg-[#ccff00]');
            submitBtn.classList.remove('bg-green-500');
            contactForm.reset();
          }, 3000);
        }
      });
    });
  }

  // Initialize everything
  initScrollAnimations();
  initReviewCarousel();
  updateCursor();

  // Navbar background on scroll
  const nav = document.querySelector('nav');
  gsap.to(nav, {
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
    duration: 0.3,
    scrollTrigger: {
      trigger: '#home',
      start: '100px top',
      end: 'bottom top',
      toggleActions: 'play reverse play reverse'
    }
  });

  // Floating elements animation
  gsap.to('.floating-element', {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.5
  });

  // Scroll indicator animation
  gsap.to('.mouse-scroll', {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Particle Background
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
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
          value: 0.3,
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
          opacity: 0.2,
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
});