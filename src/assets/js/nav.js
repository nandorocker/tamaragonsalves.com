class NavigationHandler {
  constructor() {
    this.nav = document.getElementById("top_nav");
    this.lastScroll = 0;
    this.scrollThreshold = 100;

    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);

    // Initialize
    this.init();
  }

  init() {
    // Add scroll event listener
    window.addEventListener("scroll", this.handleScroll);

    // Initial check for page load with scroll
    this.handleScroll();
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Handle scroll-based background
    if (currentScroll > this.scrollThreshold) {
      this.nav.classList.add("nav-scrolled");
    } else {
      this.nav.classList.remove("nav-scrolled");
    }

    // Handle nav visibility
    if (currentScroll <= 0) {
      // At the top
      this.nav.classList.remove("nav-hidden");
    } else if (
      currentScroll > this.lastScroll &&
      currentScroll > this.scrollThreshold
    ) {
      // Scrolling down
      this.nav.classList.add("nav-hidden");
    } else if (currentScroll < this.lastScroll) {
      // Scrolling up
      this.nav.classList.remove("nav-hidden");
    }

    this.lastScroll = currentScroll;
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new NavigationHandler();
});
