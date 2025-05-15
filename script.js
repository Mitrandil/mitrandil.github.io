// Loading animation
window.addEventListener('load', () => {
    document.getElementById('loading-overlay').style.display = 'none';
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const theme = localStorage.getItem('theme');

if (theme === 'dark') document.body.setAttribute('data-theme', 'dark');

darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    // Add transition class
    darkModeToggle.classList.add('transitioning');
    setTimeout(() => {
        darkModeToggle.classList.remove('transitioning');
    }, 500);
});

// Enhanced Scroll to Top
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    // Smooth scroll with easing
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img.lazy');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Form validation
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    let isValid = true;
    let errorMessage = '';

    if (!formData.get('phone').match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)) {
        errorMessage += 'Неверный формат телефона\n';
        isValid = false;
    }

    if (!formData.get('email').match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMessage += 'Неверный формат email\n';
        isValid = false;
    }

    if (isValid) {
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    } else {
        alert('Пожалуйста, исправьте следующие ошибки:\n' + errorMessage);
    }
});

// Enhanced Form Validation
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
    });
    
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Анимация карточек при скролле
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.service-card');
    const screenPosition = window.innerHeight / 1.3;

    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        
        if(cardPosition < screenPosition) {
            card.style.opacity = '1';
        }
    });
});

// Button click handlers
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('#service').value = ''; // Reset service selection
    document.querySelector('#message').focus(); // Focus on message field
});

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });
});