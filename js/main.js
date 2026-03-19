// Dropdown filter logic for Works page
document.addEventListener('DOMContentLoaded', () => {
  const dropdownItems = document.querySelectorAll('.nav-dropdown-item');
  const items = document.querySelectorAll('.work-item');
  const grid = document.querySelector('.works-grid');
  const sketchbookViewer = document.querySelector('.sketchbook-viewer');

  function applyFilter(filter) {
    // Show/hide grid items
    items.forEach(item => {
      if (item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // Switch grid layout: 2 columns for character-design, 3 for others
    if (filter === 'character-design') {
      grid.classList.add('grid-2');
    } else {
      grid.classList.remove('grid-2');
    }

    // Sketchbook: hide grid, show viewer; otherwise hide viewer, show grid
    if (filter === 'sketchbook') {
      if (grid) grid.style.display = 'none';
      if (sketchbookViewer) sketchbookViewer.classList.remove('hidden');
    } else {
      if (grid) grid.style.display = '';
      if (sketchbookViewer) sketchbookViewer.classList.add('hidden');
    }

    // Update active state on dropdown items
    dropdownItems.forEach(di => {
      di.classList.toggle('active', di.dataset.filter === filter);
    });
  }

  // On works page, dropdown items are buttons with data-filter
  dropdownItems.forEach(item => {
    if (item.dataset.filter) {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        applyFilter(item.dataset.filter);
      });
    }
  });

  // Apply initial filter: use URL param if present, otherwise default to animation
  const urlFilter = new URLSearchParams(window.location.search).get('filter');
  if (urlFilter) {
    applyFilter(urlFilter);
  } else if (grid) {
    // Only apply default filter on works page
    const activeItem = document.querySelector('.nav-dropdown-item.active');
    if (activeItem && activeItem.dataset.filter) {
      applyFilter(activeItem.dataset.filter);
    }
  }

  // Gallery overlay (lightbox) logic for Character Design detail pages
  const overlay = document.querySelector('.gallery-overlay');
  if (overlay) {
    const mainImages = overlay.querySelectorAll('.gallery-main-image img');
    const arrowLeft = overlay.querySelector('.gallery-arrow--left');
    const arrowRight = overlay.querySelector('.gallery-arrow--right');
    const closeBtn = overlay.querySelector('.gallery-close');
    const backdrop = overlay.querySelector('.gallery-overlay-backdrop');
    const galleryThumbs = overlay.querySelectorAll('.gallery-thumb');
    let currentIndex = 0;

    function updateGalleryThumbs() {
      galleryThumbs.forEach((t, i) => {
        t.classList.toggle('gallery-thumb-active', i === currentIndex);
      });
    }

    function showImage(index) {
      mainImages[currentIndex].classList.remove('gallery-active');
      currentIndex = (index + mainImages.length) % mainImages.length;
      mainImages[currentIndex].classList.add('gallery-active');
      updateGalleryThumbs();
    }

    function openOverlay(index) {
      mainImages.forEach(img => img.classList.remove('gallery-active'));
      currentIndex = index;
      mainImages[currentIndex].classList.add('gallery-active');
      updateGalleryThumbs();
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeOverlay() {
      overlay.hidden = true;
      document.body.style.overflow = '';
    }

    // Open on gallery item click
    document.querySelectorAll('.character-gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        openOverlay(parseInt(item.dataset.index, 10));
      });
    });

    // Thumb click jumps to that image
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        showImage(parseInt(thumb.dataset.index, 10));
      });
    });

    arrowLeft.addEventListener('click', () => showImage(currentIndex - 1));
    arrowRight.addEventListener('click', () => showImage(currentIndex + 1));
    closeBtn.addEventListener('click', closeOverlay);
    backdrop.addEventListener('click', closeOverlay);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (overlay.hidden) return;
      if (e.key === 'Escape') closeOverlay();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }

  // Sketchbook viewer navigation
  if (sketchbookViewer) {
    const skSlides = sketchbookViewer.querySelectorAll('.sketchbook-slide');
    const skLeft = sketchbookViewer.querySelector('.sketchbook-arrow--left');
    const skRight = sketchbookViewer.querySelector('.sketchbook-arrow--right');
    const skCounter = sketchbookViewer.querySelector('.sketchbook-counter');
    const skThumbs = sketchbookViewer.querySelectorAll('.sketchbook-thumb');
    let skIndex = 0;

    function updateSketchThumbs() {
      skThumbs.forEach((t, i) => {
        t.classList.toggle('sketchbook-thumb-active', i === skIndex);
      });
    }

    function showSketch(index) {
      skSlides[skIndex].classList.remove('sketchbook-active');
      skIndex = (index + skSlides.length) % skSlides.length;
      skSlides[skIndex].classList.add('sketchbook-active');
      skCounter.textContent = (skIndex + 1) + ' / ' + skSlides.length;
      updateSketchThumbs();
    }

    skCounter.textContent = '1 / ' + skSlides.length;
    skLeft.addEventListener('click', () => showSketch(skIndex - 1));
    skRight.addEventListener('click', () => showSketch(skIndex + 1));

    skThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        showSketch(parseInt(thumb.dataset.index, 10));
      });
    });

    document.addEventListener('keydown', (e) => {
      if (sketchbookViewer.classList.contains('hidden')) return;
      if (e.key === 'ArrowLeft') showSketch(skIndex - 1);
      if (e.key === 'ArrowRight') showSketch(skIndex + 1);
    });
  }

  // Video items: play on hover, pause on leave
  document.querySelectorAll('.work-item--video').forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;
    item.addEventListener('mouseenter', () => video.play());
    item.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });

  // Slideshow loop for character design items
  const slideshows = document.querySelectorAll('.slideshow');
  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 2000);
  });
});
