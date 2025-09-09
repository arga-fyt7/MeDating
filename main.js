document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-theme");
  const body = document.body;
  const icon = toggleBtn.querySelector("ion-icon");

  // cek preferensi theme
  const saved = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startDark = saved ? saved === "dark" : prefersDark;

  body.classList.toggle("dark", startDark);

  const syncUI = () => {
    const isDark = body.classList.contains("dark");
    if (icon) icon.setAttribute("name", isDark ? "sunny" : "moon");
  };

  syncUI();

  toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    syncUI();

    toggleBtn.style.transform = "scale(1.2)";
    setTimeout(() => (toggleBtn.style.transform = "scale(1)"), 180);
  });

  // ============================
  // Bottom Navigation Active State
  // ============================
  document.querySelectorAll(".bottom-nav .nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".bottom-nav .nav-item")
        .forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // ============================
  // Header Menu Switch Sections
  // ============================
  document.querySelectorAll(".header-menu .header-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      // ubah active menu
      document
        .querySelectorAll(".header-menu .header-menu-item")
        .forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      // sembunyikan semua section
      document.querySelectorAll(".content-section").forEach((sec) => {
        sec.classList.remove("active");
      });

      // tampilkan section sesuai menu
      const targetId = item.dataset.menu.toLowerCase(); // "Nearby" -> "nearby"
      const section = document.getElementById(targetId);
      if (section) {
        section.classList.add("active");
      }
    });
  });
});
