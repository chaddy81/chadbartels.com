// Reveal on scroll
const revealables = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("reveal-in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

revealables.forEach((el) => {
  el.classList.add("reveal");
  // ensure smooth transition
  el.classList.add("transition-all", "duration-700", "ease-out");
  io.observe(el);
});

// Category filter
const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".post-card");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // UI state
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    buttons.forEach(b => {
      if (b.classList.contains("active")) {
        b.classList.add("border-[var(--accent)]/60","text-[var(--accent)]");
        b.classList.remove("text-[var(--fg)]/80","border-[var(--border)]/80");
      } else {
        b.classList.remove("border-[var(--accent)]/60","text-[var(--accent)]");
        b.classList.add("text-[var(--fg)]/80","border-[var(--border)]/80");
      }
    });

    // Filtering
    const filter = btn.dataset.filter;
    let idx = 0;
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "" : "none";
      if (match) {
        // stagger reflow reveal
        card.style.transitionDelay = `${60 + idx * 50}ms`;
        card.classList.remove("reveal-in");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => card.classList.add("reveal-in"));
        });
        idx++;
      }
    });
  });
});

// Initial active state for filter button
document.querySelectorAll(".filter-btn").forEach((b) => {
  if (b.classList.contains("active")) {
    b.click(); // normalize states
  }
});

// Optional: keyboard shortcuts for filters (1..5)
const keys = ["all","ai","systems","mlops","frontend"];
window.addEventListener("keydown", (e) => {
  const n = parseInt(e.key, 10);
  if (!isNaN(n) && n >= 1 && n <= keys.length) {
    const target = [...buttons].find(b => b.dataset.filter === keys[n-1]);
    if (target) target.click();
  }
});