//Slider
const images = document.querySelectorAll('#imageSlider img');
let currentIndex = 0;

document.getElementById('prevBtn').addEventListener('click', () => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    images[currentIndex].classList.add('active');
});

document.getElementById('nextBtn').addEventListener('click', () => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    images[currentIndex].classList.add('active');
});

// Auto-slide every 5 seconds
setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    images[currentIndex].classList.add('active');
}, 5000);