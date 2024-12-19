module.exports = function (eleventyConfig) {
  // Add custom watch targets for CSS and config files
  eleventyConfig.addWatchTarget("src/assets/css/tailwind.css");
  eleventyConfig.addWatchTarget("tailwind.config.js");

  // Passthrough copy for assets (JS, images, fonts)
  eleventyConfig.addPassthroughCopy("src/assets/css", {
    filter: [
      "**/*.css", //copy these
      "!tailwind.css", // don't copy this file
    ],
  });
  eleventyConfig.addPassthroughCopy("src/assets/js/*");
  eleventyConfig.addPassthroughCopy("src/assets/images/**/*");
  eleventyConfig.addPassthroughCopy("src/assets/fonts/**/*");
  eleventyConfig.addPassthroughCopy("src/assets/files/**/*");
  eleventyConfig.addPassthroughCopy("src/assets/vendor/**/*");
  eleventyConfig.addPassthroughCopy({
    "src/assets/meta/favicon.ico": "favicon.ico",
    "src/assets/meta/apple-touch-icon.png": "apple-touch-icon.png",
    "src/assets/meta/og_image.jpg": "og_image.jpg",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/taos/dist/taos.js": "taos.js",
    "node_modules/taos/dist/taos.js.map": "taos.js.map",
  });

  // Optional advanced chokidar setup
  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: true,
    watch: ["src/**/*.css", "src/**/*.js"], // Adjust according to the paths to watch
    open: true, // Automatically open the browser
    port: 8080, // Use a specific port for development
    showAllHosts: true, // For more flexibility in dev environments
    indexFileName: "index.html",
  });

  // Global Data
  eleventyConfig.addGlobalData("images", "/assets/images");
  eleventyConfig.addGlobalData("js", "/assets/js");
  eleventyConfig.addGlobalData("vendor", "/assets/vendor");
  // Add a shortcode for the copyright year
  eleventyConfig.addShortcode("year", () => {
    const startYear = 2024; // Replace with the first year of your portfolio
    const currentYear = new Date().getFullYear();
    return currentYear === startYear
      ? `${currentYear}`
      : `${startYear}–${currentYear}`;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
