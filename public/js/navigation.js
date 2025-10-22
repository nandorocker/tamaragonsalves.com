// Store navigation instance globally to clean up on page transitions
let navigationInstance = null;

class Navigation {
  static MOBILE_BREAKPOINT = 768;

  constructor() {
    // Elements
    this.elements = {
      menuToggle: document.getElementById("menu_toggle"),
      menu: document.getElementById("menu"),
      topNav: document.getElementById("top_nav"),
      menuIcon: document.getElementById("menu_icon"),
    };

    // Scroll state
    this.lastScroll = 0;
    this.scrollThreshold = 100;

    // Mobile state
    this.isMobileView = window.innerWidth < Navigation.MOBILE_BREAKPOINT;

    // Initialize
    this.init();
  }

  init() {
    // Set up resize observer
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(document.body);

    // Set up scroll listener
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.scrollHandler);

    // Initialize mobile nav if needed
    if (this.isMobileView) {
      this.setupMobileEventListeners();
    }

    // Initial scroll check
    this.handleScroll();
  }

  cleanup() {
    // Remove scroll listener
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
    }

    // Disconnect resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Remove mobile event listeners
    this.removeMobileEventListeners();
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Don't handle scroll-based effects if mobile menu is open
    if (this.elements.topNav.classList.contains("nav-menu-open")) {
      return;
    }

    // Handle scroll-based background
    if (currentScroll > this.scrollThreshold) {
      this.elements.topNav.classList.add("nav-scrolled");
    } else {
      this.elements.topNav.classList.remove("nav-scrolled");
    }

    // Handle nav visibility
    if (currentScroll <= 0) {
      this.elements.topNav.classList.remove("nav-hidden");
    } else if (
      currentScroll > this.lastScroll &&
      currentScroll > this.scrollThreshold
    ) {
      this.elements.topNav.classList.add("nav-hidden");
    } else if (currentScroll < this.lastScroll) {
      this.elements.topNav.classList.remove("nav-hidden");
    }

    this.lastScroll = currentScroll;
  }

  handleResize(entries) {
    const newIsMobileView = window.innerWidth < Navigation.MOBILE_BREAKPOINT;
    if (this.isMobileView !== newIsMobileView) {
      this.isMobileView = newIsMobileView;
      if (this.isMobileView) {
        this.setupMobileEventListeners();
      } else {
        this.resetToDesktop();
      }
    }
  }

  toggleMobileMenu() {
    const { menuToggle, menu, topNav, menuIcon } = this.elements;

    // Toggle aria-expanded
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);

    // Toggle menu visibility
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");

    // Toggle mobile menu open state
    topNav?.classList.toggle("nav-menu-open");

    // Toggle menu icon
    menuIcon?.classList.toggle("menu-open-svg");
  }

  setupMobileEventListeners() {
    this.toggleHandler = () => this.toggleMobileMenu();
    this.menuClickHandler = (event) => {
      if (event.target.tagName === "A" && event.target.closest("#menu")) {
        this.toggleMobileMenu();
      }
    };

    this.elements.menuToggle.addEventListener("click", this.toggleHandler);
    this.elements.menu?.addEventListener("click", this.menuClickHandler);
  }

  resetToDesktop() {
    const { menu, topNav, menuIcon, menuToggle } = this.elements;

    // Reset menu state
    menu.classList.remove("flex");
    menu.classList.add("hidden");

    // Remove mobile menu background
    topNav?.classList.remove("nav-menu-open");

    // Reset menu icon
    menuIcon?.classList.remove("menu-open-svg");

    // Reset aria-expanded
    menuToggle.setAttribute("aria-expanded", "false");

    // Remove mobile event listeners
    this.removeMobileEventListeners();
  }

  removeMobileEventListeners() {
    if (this.toggleHandler) {
      this.elements.menuToggle.removeEventListener(
        "click",
        this.toggleHandler
      );
    }
    if (this.menuClickHandler) {
      this.elements.menu?.removeEventListener("click", this.menuClickHandler);
    }
  }
}

// Initialize navigation function
function initNavigation() {
  // Clean up previous instance if it exists
  if (navigationInstance) {
    navigationInstance.cleanup();
  }

  // Create new instance
  navigationInstance = new Navigation();
}

// Initialize on DOMContentLoaded (first page load)
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}

// Reinitialize on Astro page transitions
document.addEventListener("astro:page-load", initNavigation);
