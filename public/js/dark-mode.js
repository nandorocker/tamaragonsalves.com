// Dark mode manager - singleton instance
let darkModeInstance = null;

class DarkMode {
  constructor() {
    this.storageKey = "theme-preference";
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.mediaQueryListener = null;
  }

  init() {
    // Get DOM elements
    this.toggleButton = document.getElementById("theme-toggle");
    this.sunIcon = document.getElementById("sun-icon");
    this.moonIcon = document.getElementById("moon-icon");

    // Clean up any existing listeners by cloning and replacing the button
    if (this.toggleButton) {
      const newButton = this.toggleButton.cloneNode(true);
      this.toggleButton.parentNode?.replaceChild(newButton, this.toggleButton);
      this.toggleButton = newButton;
      
      // Also need to update icon references after cloning
      this.sunIcon = this.toggleButton.querySelector("#sun-icon");
      this.moonIcon = this.toggleButton.querySelector("#moon-icon");
    }

    // Set initial theme
    this.applyTheme();

    // Set up event listeners
    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", () => this.toggleTheme());
    }

    // Listen for system theme changes (only add once)
    if (!this.mediaQueryListener) {
      this.mediaQueryListener = () => this.applyTheme();
      this.mediaQuery.addEventListener("change", this.mediaQueryListener);
    }
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

// Initialize dark mode functionality
function initDarkMode() {
  if (!darkModeInstance) {
    darkModeInstance = new DarkMode();
  }
  darkModeInstance.init();
}

// Run on initial page load
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initDarkMode);
} else {
  initDarkMode();
}

// Run after Astro view transitions
document.addEventListener("astro:page-load", initDarkMode);
