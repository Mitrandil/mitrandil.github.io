// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Обработчик формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    this.reset();
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