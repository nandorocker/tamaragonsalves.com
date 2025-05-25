document.addEventListener("DOMContentLoaded", () => {
  class DarkMode {
    constructor() {
      this.storageKey = "theme-preference";
      this.toggleButton = document.getElementById("theme-toggle");
      this.sunIcon = document.getElementById("sun-icon");
      this.moonIcon = document.getElementById("moon-icon");

      this.init();
    }

    init() {
      // Get initial theme from localStorage or system preference
      const savedTheme = localStorage.getItem(this.storageKey);
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Set initial theme
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
      this.setTheme(initialTheme);

      // Set up event listeners
      if (this.toggleButton) {
        this.toggleButton.addEventListener("click", () => this.toggleTheme());
      }

      // Listen for system theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem(this.storageKey)) {
            this.setTheme(e.matches ? "dark" : "light");
          }
        });
    }

    toggleTheme() {
      const currentTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
      localStorage.setItem(this.storageKey, newTheme);
    }

    setTheme(theme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        this.updateIcons(true);
      } else {
        document.documentElement.classList.remove("dark");
        this.updateIcons(false);
      }
    }

    updateIcons(isDark) {
      if (this.sunIcon && this.moonIcon) {
        if (isDark) {
          this.sunIcon.classList.remove("hidden");
          this.moonIcon.classList.add("hidden");
        } else {
          this.sunIcon.classList.add("hidden");
          this.moonIcon.classList.remove("hidden");
        }
      }
    }
  }

  // Initialize dark mode
  new DarkMode();
});
