export function createRectCache(element: HTMLElement) {
  let rect = element.getBoundingClientRect();

  const updateRect = () => {
    rect = element.getBoundingClientRect();
  };

  // Update the cached rect when the window is resized or scrolled
  window.addEventListener("resize", updateRect, { passive: true });
  window.addEventListener("scroll", updateRect, { passive: true });

  return {
    // Getter to access the latest bounding rect
    get current() {
      return rect;
    },
    // Cleanup function to remove event listeners
    destroy() {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    },
  };
}
