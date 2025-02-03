// Galeria projektów
let currentGallerySlide = 0;
const gallerySlide = document.querySelector('.gallery-slide');
const totalGallerySlides = document.querySelectorAll('.gallery-slide img').length;

document.querySelector('.gallery-btn.prev').addEventListener('click', () => {
    currentGallerySlide = (currentGallerySlide > 0) ? currentGallerySlide - 1 : totalGallerySlides - 1;
    gallerySlide.style.transform = `translateX(-${currentGallerySlide * 100}%)`;
});

document.querySelector('.gallery-btn.next').addEventListener('click', () => {
    currentGallerySlide = (currentGallerySlide < totalGallerySlides - 1) ? currentGallerySlide + 1 : 0;
    gallerySlide.style.transform = `translateX(-${currentGallerySlide * 100}%)`;
});

// Sekcja AI
let currentAISlide = 0;
const aiSlides = document.querySelectorAll('.ai-slide');
const totalAISlides = aiSlides.length;

document.querySelector('.ai-arrow.prev').addEventListener('click', () => {
    aiSlides[currentAISlide].classList.remove('active');
    currentAISlide = (currentAISlide > 0) ? currentAISlide - 1 : totalAISlides - 1;
    aiSlides[currentAISlide].classList.add('active');
});

document.querySelector('.ai-arrow.next').addEventListener('click', () => {
    aiSlides[currentAISlide].classList.remove('active');
    currentAISlide = (currentAISlide < totalAISlides - 1) ? currentAISlide + 1 : 0;
    aiSlides[currentAISlide].classList.add('active');
});

// Inicjalizacja sliderów AI
document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
        const sliderPos = e.target.value;
        const container = e.target.closest('.image-container');
        container.querySelector('.image-after').style.clipPath = `inset(0 ${100 - sliderPos}% 0 0)`;
    });
});
