document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        currentSlide = index;
    }

    // Initialize
    showSlide(currentSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            showSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
            e.preventDefault();
            showSlide(currentSlide - 1);
        }
    });

    // Optional: mouse click to advance
    document.addEventListener('click', (e) => {
        // Prevent if clicking links
        if(e.target.tagName !== 'A') {
            showSlide(currentSlide + 1);
        }
    });
});
