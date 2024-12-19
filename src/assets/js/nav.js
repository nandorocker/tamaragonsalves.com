let lastScroll = 0;
const nav = document.getElementById("top_nav");
const scrollThreshold = 100; // Amount of pixels to scroll before hiding nav

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Always show nav when at the top
  if (currentScroll <= 0) {
    nav.classList.remove("nav-hidden");
    return;
  }

  // If we're below threshold and scrolling down, hide nav
  if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
    nav.classList.add("nav-hidden");
  }
  // When scrolling up, show nav
  else if (currentScroll < lastScroll) {
    nav.classList.remove("nav-hidden");
  }

  lastScroll = currentScroll;
});
