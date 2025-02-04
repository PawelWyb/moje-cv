// Particles.js Configuration
const particlesConfig = {
    particles: {
        number: { 
            value: 80, 
            density: { 
                enable: true, 
                value_area: 800 
            } 
        },
        color: { value: "#2ecc71" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3, random: true },
        move: { enable: true, speed: 2, direction: "none" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    },
    retina_detect: true
};

particlesJS('particles-js', particlesConfig);

// Animowane teksty w nagłówku
const typedName = new Typed('#typed-name', {
    strings: ['Paweł Wybieralski'],
    typeSpeed: 100,
    showCursor: false
});

const typedSubtitle = new Typed('#typed-subtitle', {
    strings: ['Technik Logistyk ^1000 | Specjalista AI'],
    typeSpeed: 50,
    startDelay: 1500,
    showCursor: false
});

// Dark Mode
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function toggleTheme() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    // Wymuszamy aktualizację cząsteczek
    particlesJS('particles-js', particlesConfig);
}

// Efekt paralaksy
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth'));
        layer.style.transform = `translateY(${scrolled * depth}px)`;
    });
});

// Galeria projektów
let currentGallerySlide = 0;
const gallerySlide = document.querySelector('.gallery-slide');
const totalGallerySlides = document.querySelectorAll('.gallery-slide img').length;

document.querySelector('.gallery-btn.prev').addEventListener('click', () => {
    currentGallerySlide = (currentGallerySlide > 0) 
        ? currentGallerySlide - 1 
        : totalGallerySlides - 1;
    gallerySlide.style.transform = `translateX(-${currentGallerySlide * 100}%)`;
});

document.querySelector('.gallery-btn.next').addEventListener('click', () => {
    currentGallerySlide = (currentGallerySlide < totalGallerySlides - 1) 
        ? currentGallerySlide + 1 
        : 0;
    gallerySlide.style.transform = `translateX(-${currentGallerySlide * 100}%)`;
});

// Sekcja AI
let currentAISlide = 0;
const aiSlides = document.querySelectorAll('.ai-slide');
const totalAISlides = aiSlides.length;

document.querySelector('.ai-arrow.prev').addEventListener('click', () => {
    aiSlides[currentAISlide].classList.remove('active');
    currentAISlide = (currentAISlide > 0) 
        ? currentAISlide - 1 
        : totalAISlides - 1;
    aiSlides[currentAISlide].classList.add('active');
});

document.querySelector('.ai-arrow.next').addEventListener('click', () => {
    aiSlides[currentAISlide].classList.remove('active');
    currentAISlide = (currentAISlide < totalAISlides - 1) 
        ? currentAISlide + 1 
        : 0;
    aiSlides[currentAISlide].classList.add('active');
});

// Suwaki AI
document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
        const sliderPos = e.target.value;
        const container = e.target.closest('.image-container');
        container.querySelector('.image-after').style.clipPath = 
            `inset(0 ${100 - sliderPos}% 0 0)`;
    });
});

// Panel koperty
function toggleEnvelope() {
    const modal = document.querySelector('.envelope-modal');
    const body = document.body;
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
    } else {
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
    }
}

document.querySelector('.envelope-modal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.envelope-modal')) {
        toggleEnvelope();
    }
});

// Inicjalizacja motywu
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Nowe funkcje dla Chatbota AI
function toggleChatbot() {
    const chatWindow = document.querySelector('.chatbot-window');
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) document.getElementById('userMessage').focus();
}

function addChatMessage(text, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleUserMessage() {
    const userInput = document.getElementById('userMessage');
    const message = userInput.value.trim();
    if (!message) return;

    const loader = document.querySelector('.chat-header .loader');
    loader.classList.remove('hidden');
    addChatMessage(message, true);
    userInput.value = '';

    try {
        const response = await puter.ai.chat(message);
        addChatMessage(response);
    } catch (error) {
        console.error('Błąd AI:', error);
        addChatMessage('Przepraszam, wystąpił błąd. Spróbuj ponownie.');
    } finally {
        loader.classList.add('hidden');
    }
}

// Inicjalizacja czatu
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    themeToggle.addEventListener('click', toggleTheme);
    
    document.getElementById('sendMessage').addEventListener('click', handleUserMessage);
    document.getElementById('userMessage').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserMessage();
        }
    });
});
