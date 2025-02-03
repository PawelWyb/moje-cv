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

// Slider AI
const slider = document.querySelector('.slider');
const beforeImage = document.querySelector('.image-after');

slider.addEventListener('input', (e) => {
    const sliderPos = e.target.value;
    beforeImage.style.clipPath = `inset(0 ${100 - sliderPos}% 0 0)`;
});
