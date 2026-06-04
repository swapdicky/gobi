const step = 200; // 固定距離 (px)

window.addEventListener("scroll", () => {
  clearTimeout(window.scrollTimeout);

  window.scrollTimeout = setTimeout(() => {
    const current = window.scrollY;
    const target = Math.round(current / step) * step;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, 100);
});