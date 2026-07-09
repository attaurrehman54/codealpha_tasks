// ==========================================
// --- Lightbox & Navigation Logic ---
// ==========================================

// Select DOM elements for the Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const galleryImages = document.querySelectorAll('.gallery-item img');

let currentIndex = 0; // Tracks the currently active image index

// 1. Open Lightbox on Image Click
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index; 
        updateLightboxImage();
        lightbox.classList.add('active'); 
    });
});

// 2. Update Image Source inside Lightbox
function updateLightboxImage() {
    const imageSrc = galleryImages[currentIndex].src;
    lightboxImg.src = imageSrc;
    lightboxImg.alt = galleryImages[currentIndex].alt;
}

// 3. Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

closeBtn.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image (on the overlay)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// 4. Navigation (Next/Prev Buttons)
function showNextImage() {
    // Uses modulo to loop back to the first image after the last one
    currentIndex = (currentIndex + 1) % galleryImages.length; 
    updateLightboxImage();
}

function showPrevImage() {
    // Loops back to the last image if going previous from the first one
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; 
    updateLightboxImage();
}

nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// 5. Keyboard Navigation Support for UX
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return; 

    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'Escape') closeLightbox();
});

// ==========================================
// --- Filter Categories Logic ---
// ==========================================

// Select filter buttons and gallery items
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove 'active' class from all buttons, then add to the clicked one
        filterBtns.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        // Get the category filter value (e.g., 'landscape', 'water')
        const filterValue = btn.getAttribute('data-filter');

        // Loop through all images to check their category
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            // Show item if it matches the filter, otherwise hide it
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});