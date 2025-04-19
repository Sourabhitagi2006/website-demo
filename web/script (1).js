// Slide-in and Zoom-in animation on scroll
const animatedElements = document.querySelectorAll('.slide-in, .zoom-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
animatedElements.forEach(element => observer.observe(element));

// Typing effect for hero tagline
const typingText = document.getElementById('typing-text');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;
function type() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
    } else {
        typingText.classList.remove('typing-text');
    }
}
setTimeout(type, 300);

// Smooth scrolling for anchor links
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;
const itemWidth = carouselItems[0].offsetWidth;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

nextButton.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Form submission with styled feedback
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formMessage = document.getElementById('form-message');

    if (!name || !email || !message) {
        formMessage.textContent = 'PLEASE FILL OUT ALL FIELDS.';
        formMessage.className = 'form-message error';
    } else if (!emailRegex.test(email)) {
        formMessage.textContent = 'PLEASE ENTER A VALID EMAIL ADDRESS.';
        formMessage.className = 'form-message error';
    } else {
        formMessage.textContent = 'MESSAGE SENT SUCCESSFULLY!';
        formMessage.className = 'form-message success';
        document.getElementById('contact-form').reset();
    }

    setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, 3000);
});

// Simulated sensor data update
function updateSensorData() {
    document.getElementById('moisture-data').textContent = `${Math.floor(Math.random() * 20) + 40}%`;
    document.getElementById('temp-data').textContent = `${Math.floor(Math.random() * 10) + 20}°C`;
    document.getElementById('npk-data').textContent = `N: ${Math.floor(Math.random() * 50) + 100}, P: ${Math.floor(Math.random() * 30) + 70}, K: ${Math.floor(Math.random() * 40) + 90}`;
}

// Simulated weather prediction update
function updateWeatherPrediction() {
    const temp = Math.floor(Math.random() * 20) + 15; // 15-35°C
    const humidity = Math.floor(Math.random() * 60) + 30; // 30-90%
    const rainfall = Math.floor(Math.random() * 100); // 0-100%
    document.getElementById('weather-temp').textContent = `${temp}°C`;
    document.getElementById('weather-humidity').textContent = `${humidity}%`;
    document.getElementById('weather-rainfall').textContent = `${rainfall}%`;

    // Farming suggestions based on weather
    let suggestion = '';
    if (rainfall < 30 && humidity < 50) {
        suggestion = 'WATER YOUR CROPS NOW. ';
    } else {
        suggestion = 'WAIT TO WATER UNTIL RAINFALL DECREASES. ';
    }
    if (rainfall < 40 && temp >= 20 && temp <= 25) {
        suggestion += 'CONSIDER APPLYING FERTILIZERS TODAY.';
    } else {
        suggestion += 'AVOID FERTILIZING DUE TO HIGH RAINFALL OR EXTREME TEMPERATURES.';
    }
    document.getElementById('farming-suggestion').textContent = suggestion;
}

setInterval(updateSensorData, 5000);
setInterval(updateWeatherPrediction, 10000);
updateSensorData();
updateWeatherPrediction();

// Back-to-top button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.classList.remove('hidden');
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.add('hidden');
        backToTopButton.classList.remove('visible');
    }
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});