// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initFormHandling();
    init3DEffects();
    initFloatingElements();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 767) {
                    navLinksContainer.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('portfolio-grid')) {
                    animateGridItems(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.text-card, .service-card, .portfolio-item, .contact-item, .services-grid, .portfolio-grid');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function animateGridItems(container) {
    const items = container.children;
    Array.from(items).forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Add loading state
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Send email via API
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Success state
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = '#4CAF50';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    
                    // Remove focused class from form groups
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('focused');
                    });
                }, 3000);
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Error state
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
            submitButton.style.background = '#f44336';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// 3D effects and interactions
function init3DEffects() {
    // Add 3D hover effects to cards
    const cards = document.querySelectorAll('.service-card, .text-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) perspective(1000px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg)';
        });
        
        // Add mousemove effect for more dynamic 3D
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Add 3D effect to contact form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'perspective(1000px) rotateX(2deg)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg)';
        });
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Random initial position
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        element.style.left = randomX + 'px';
        element.style.top = randomY + 'px';
        
        // Animate floating movement
        animateFloatingElement(element, index);
    });
}

function animateFloatingElement(element, index) {
    const duration = 3000 + (index * 500); // Stagger animations
    const amplitude = 20;
    
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * amplitude;
        const randomY = (Math.random() - 0.5) * amplitude;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, duration);
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 500) {
        // Show scroll to top button
        let scrollButton = document.querySelector('.scroll-to-top');
        if (!scrollButton) {
            scrollButton = createScrollToTopButton();
            document.body.appendChild(scrollButton);
        }
        scrollButton.classList.add('visible');
    } else {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            scrollButton.classList.remove('visible');
        }
    }
});

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.addEventListener('click', scrollToTop);
    
    // Add styles
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    return button;
}

// Add CSS for scroll to top button visibility
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top.visible {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
window.addEventListener('scroll', throttle(initParallaxEffects, 100));

// Preload critical images for better performance
function preloadImages() {
    const images = [
        'https://pixabay.com/get/g42c3494953fdf8aeb83243987ee8a4a8182935258d130286770011748a7a7461491f8d7c645cea99ddc9a420573a72354280f7e9dd3beb0019ff5c973ce434dc_1280.jpg',
        'https://pixabay.com/get/g18783ad3c33c990902de12a5d8649469f77b3bc2daebe2c725feac3da2e8b2dd94f09512217632754e7dcdd3968c0393d40862337047bb1f70d131722f316c1a_1280.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add custom cursor effect (optional enhancement)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}

// Initialize custom cursor on desktop devices
if (window.innerWidth > 768) {
    initCustomCursor();
}
