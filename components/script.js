/**
 * Handles the toggling of content sections in the portfolio
 * @param {Event} event - The click event object
 * @returns {void}
 * @throws {Error} When event object is invalid or parent node is not found
 */
const toggleContent = (event) => {
  try {
    if (!event?.currentTarget) {
      throw new Error("Invalid event object");
    }

    const experience = event.currentTarget.closest(".experience");
    if (!experience) {
      throw new Error("Experience section not found");
    }

    experience.classList.toggle("expanded");

    // Update ARIA attributes for accessibility
    const isExpanded = experience.classList.contains("expanded");
    experience.setAttribute("aria-expanded", isExpanded.toString());
  } catch (error) {
    console.error("Error toggling content:", error.message);
  }
};

/**
 * Initialize event listeners when DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Use event delegation for better performance
  document.body.addEventListener("click", (event) => {
    const headerElement = event.target.closest(".header");
    if (headerElement) {
      toggleContent(event);
    }
  });
});
