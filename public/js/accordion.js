document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion, groupIndex) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item, index) => {
      const input = item.querySelector("input");
      const label = item.querySelector("label");

      // Skip items missing input or label
      if (!input || !label) {
        console.error(
          `Missing input or label in accordion item ${
            index + 1
          } of accordion group ${groupIndex + 1}`
        );
        return;
      }

      const uniqueId = `accordion-group-${groupIndex + 1}-item-${index + 1}`;
      input.id = uniqueId;
      label.setAttribute("for", uniqueId);
    });
  });
});
