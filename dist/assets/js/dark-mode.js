document.addEventListener("DOMContentLoaded", () => {
  class DarkMode {
    constructor() {
      this.storageKey = "theme-preference";
      this.toggleButton = document.getElementById("theme-toggle");
      this.sunIcon = document.getElementById("sun-icon");
      this.moonIcon = document.getElementById("moon-icon");
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      this.init();
    }

    init() {
      // Set initial theme
      this.applyTheme();

      // Set up event listeners
      if (this.toggleButton) {
        this.toggleButton.addEventListener("click", () => this.toggleTheme());
      }

      // Listen for system theme changes
      this.mediaQuery.addEventListener("change", () => {
        this.applyTheme();
      });
    }

    getEffectiveTheme() {
      const savedTheme = localStorage.getItem(this.storageKey);

      // If no saved preference, use system preference
      if (!savedTheme) {
        return this.mediaQuery.matches ? "dark" : "light";
      }

      // If saved preference is "system", use system preference
      if (savedTheme === "system") {
        return this.mediaQuery.matches ? "dark" : "light";
      }

      // Otherwise use saved preference
      return savedTheme;
    }

    applyTheme() {
      const theme = this.getEffectiveTheme();
      this.setTheme(theme);
    }

    toggleTheme() {
      const currentEffectiveTheme = this.getEffectiveTheme();
      const savedTheme = localStorage.getItem(this.storageKey);

      // Cycle through: system -> light -> dark -> system
      let newTheme;
      if (!savedTheme || savedTheme === "system") {
        // Currently following system, switch to opposite of current system preference
        newTheme = currentEffectiveTheme === "dark" ? "light" : "dark";
      } else if (savedTheme === "light") {
        newTheme = "dark";
      } else if (savedTheme === "dark") {
        newTheme = "system";
      }

      if (newTheme === "system") {
        localStorage.removeItem(this.storageKey);
      } else {
        localStorage.setItem(this.storageKey, newTheme);
      }

      this.applyTheme();
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
