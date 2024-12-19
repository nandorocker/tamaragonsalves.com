document.addEventListener("DOMContentLoaded", () => {
  class MobileNav {
    static MOBILE_BREAKPOINT = 768;

    constructor() {
      this.elements = {
        menuToggle: document.getElementById("menu_toggle"),
        menu: document.getElementById("menu"),
        topNav: document.getElementById("top_nav"),
        menuIcon: document.getElementById("menu_icon"),
      };

      this.isMobileView = window.innerWidth < MobileNav.MOBILE_BREAKPOINT;
      this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
      this.resizeObserver.observe(document.body);

      if (this.isMobileView) {
        this.init();
      } else {
        this.resetToDesktop();
      }
    }

    handleResize(entries) {
      const newIsMobileView = window.innerWidth < MobileNav.MOBILE_BREAKPOINT;
      if (this.isMobileView !== newIsMobileView) {
        this.isMobileView = newIsMobileView;
        if (this.isMobileView) {
          this.init();
        } else {
          this.resetToDesktop();
        }
      }
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

      // Remove event listeners
      this.removeEventListeners();
    }

    init() {
      this.setupEventListeners();
    }

    toggleMenu() {
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

    setupEventListeners() {
      this.toggleHandler = () => this.toggleMenu();
      this.menuClickHandler = (event) => {
        if (event.target.tagName === "A" && event.target.closest("#menu")) {
          this.toggleMenu();
        }
      };

      this.elements.menuToggle.addEventListener("click", this.toggleHandler);
      this.elements.menu?.addEventListener("click", this.menuClickHandler);
    }

    removeEventListeners() {
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

  new MobileNav();
});
