document.addEventListener("DOMContentLoaded", () => {
  class MobileNav {
    constructor() {
      this.elements = {
        menuToggle: document.getElementById("menu-toggle"),
        menu: document.getElementById("menu"),
        topNav: document.getElementById("top-nav"),
        menuIcon: document.getElementById("menu-icon"),
      };

      this.elements.firstDivInTopNav =
        this.elements.topNav?.querySelector("div:first-of-type");

      this.init();
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
      // Menu toggle click handler
      this.elements.menuToggle.addEventListener("click", () =>
        this.toggleMenu()
      );

      // Menu item click handler
      this.elements.menu?.addEventListener("click", (event) => {
        if (event.target.tagName === "A" && event.target.closest("#menu")) {
          this.toggleMenu();
        }
      });
    }
  }

  new MobileNav();
});
