// Galeria zdjęć
let currentSlide = 0;
const slides = document.querySelector('.gallery-slide');
const totalSlides = document.querySelectorAll('.gallery-photo').length;

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
});

document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
});

// Sekcja AI
let currentSlider = 0;
const sliders = document.querySelectorAll('.ai-slider');
const totalSliders = sliders.length;

document.querySelector('.ai-arrow.prev').addEventListener('click', () => {
    sliders[currentSlider].classList.remove('active');
    currentSlider = (currentSlider > 0) ? currentSlider - 1 : totalSliders - 1;
    sliders[currentSlider].classList.add('active');
});

document.querySelector('.ai-arrow.next').addEventListener('click', () => {
    sliders[currentSlider].classList.remove('active');
    currentSlider = (currentSlider < totalSliders - 1) ? currentSlider + 1 : 0;
    sliders[currentSlider].classList.add('active');
});

document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
        const sliderPos = e.target.value;
        const container = e.target.closest('.image-container');
        container.querySelector('.image-after').style.clipPath = `inset(0 ${100 - sliderPos}% 0 0)`;
    });
});
