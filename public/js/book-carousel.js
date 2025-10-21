// Book Carousel functionality for the home page
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prev-book");
  const nextBtn = document.getElementById("next-book");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const LG_BREAKPOINT = 1024; // Tailwind's lg breakpoint

  // Determine how many slides to show based on screen size
  function getSlidesPerView() {
    return window.innerWidth >= LG_BREAKPOINT ? 2 : 1;
  }

  // Calculate total number of "pages" based on slides per view
  function getTotalPages() {
    return Math.ceil(slides.length / getSlidesPerView());
  }

  // Update carousel position
  function updateCarousel() {
    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    const offset = -currentIndex * slideWidth;
    
    track.style.transform = `translateX(${offset}%)`;

    // Update button states
    const totalPages = getTotalPages();
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= (slides.length - slidesPerView);
  }

  // Next slide
  function nextSlide() {
    const slidesPerView = getSlidesPerView();
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex += slidesPerView;
      updateCarousel();
    }
  }

  // Previous slide
  function prevSlide() {
    const slidesPerView = getSlidesPerView();
    if (currentIndex > 0) {
      currentIndex -= slidesPerView;
      // Make sure we don't go negative
      if (currentIndex < 0) currentIndex = 0;
      updateCarousel();
    }
  }

  // Event listeners
  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reset to first slide on breakpoint change
      const previousSlidesPerView = currentIndex > 0 ? 
        (window.innerWidth >= LG_BREAKPOINT ? 1 : 2) : 
        getSlidesPerView();
      
      if (previousSlidesPerView !== getSlidesPerView()) {
        currentIndex = 0;
      }
      updateCarousel();
    }, 150);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide();
    }
  }

  // Initialize
  updateCarousel();
});
