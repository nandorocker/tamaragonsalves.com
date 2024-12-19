document.addEventListener("DOMContentLoaded", () => {
  class MobileNav {
    static MOBILE_BREAKPOINT = 768;

    constructor() {
      this.elements = {
        menuToggle: document.getElementById("menu-toggle"),
        menu: document.getElementById("menu"),
        topNav: document.getElementById("top-nav"),
        menuIcon: document.getElementById("menu-icon"),
      };

      this.elements.firstDivInTopNav =
        this.elements.topNav?.querySelector("div:first-of-type");

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
      const { menu, topNav, firstDivInTopNav, menuIcon, menuToggle } =
        this.elements;

      // Reset menu state
      menu.classList.remove("flex");
      menu.classList.add("hidden");

      // Reset navigation background
      topNav?.classList.add("top-nav-bg");

      // Reset first div classes
      firstDivInTopNav?.classList.remove("bg-mustard-50", "bg-opacity-95");

      // Reset menu icon
      menuIcon?.classList.remove("menu-open-svg");

      // Reset aria-expanded
      menuToggle.setAttribute("aria-expanded", "false");

      // Remove event listeners
      this.removeEventListeners();
    }

    init() {
      this.removeInitialTopNavBg();
      this.setupEventListeners();
    }

    removeInitialTopNavBg() {
      if (this.elements.topNav?.classList.contains("top-nav-bg")) {
        this.elements.topNav.classList.remove("top-nav-bg");
      }
    }

    toggleMenu() {
      const { menuToggle, menu, topNav, firstDivInTopNav, menuIcon } =
        this.elements;

      // Toggle aria-expanded
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);

      // Toggle menu visibility
      menu.classList.toggle("hidden");
      menu.classList.toggle("flex");

      // Toggle navigation background
      topNav?.classList.toggle("top-nav-bg");

      // Toggle first div classes
      firstDivInTopNav?.classList.toggle("bg-mustard-50");
      firstDivInTopNav?.classList.toggle("bg-opacity-95");

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
