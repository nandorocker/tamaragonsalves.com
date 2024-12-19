document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var topNav = document.getElementById("top-nav");
  var firstDivInTopNav = topNav
    ? topNav.querySelector("div:first-of-type")
    : null;

  // Remove top-nav-bg class if present on first load
  if (topNav && topNav.classList.contains("top-nav-bg")) {
    topNav.classList.remove("top-nav-bg");
  }

  // Function to toggle menu visibility and top-nav background color
  function toggleMenu() {
    var isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);

    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      menu.classList.add("flex");
    } else {
      menu.classList.remove("flex");
      menu.classList.add("hidden");
    }

    if (topNav) {
      topNav.classList.toggle("top-nav-bg");
    }

    // Remove top nav background & opacity classes
    if (firstDivInTopNav) {
      firstDivInTopNav.classList.toggle("bg-mustard-50");
      firstDivInTopNav.classList.toggle("bg-opacity-95");
    }

    // Change SVG color when menu is toggled
    var menuIcon = document.getElementById("menu-icon");
    if (menuIcon) {
      menuIcon.classList.toggle("menu-open-svg");
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Close menu when any menu item is clicked
  if (menu) {
    menu.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && event.target.closest("#menu")) {
        // Check if the clicked element is a link inside the menu
        toggleMenu();
      }
    });
  }
});
