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
  // Bottom Navigation Active State and Section Switching
  // ============================
  document.querySelectorAll(".bottom-nav .nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".bottom-nav .nav-item")
        .forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      // Switch sections based on data-menu
      const menu = item.dataset.menu;
      if (menu === "home") {
        // Show nearby as default home
        document.querySelectorAll(".content-section").forEach((sec) => sec.classList.remove("active"));
        document.getElementById("nearby").classList.add("active");
        // Update header menu
        document.querySelectorAll(".header-menu-item").forEach((btn) => btn.classList.remove("active"));
        document.querySelector('.header-menu-item[data-menu="nearby"]').classList.add("active");
      } else if (menu === "explorer") {
        // Show online for explorer
        document.querySelectorAll(".content-section").forEach((sec) => sec.classList.remove("active"));
        document.getElementById("online").classList.add("active");
        document.querySelectorAll(".header-menu-item").forEach((btn) => btn.classList.remove("active"));
        document.querySelector('.header-menu-item[data-menu="online"]').classList.add("active");
      }
      // Other menus can be added later
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

  
// Ganti booster <-> profile
function toggleProfileSlot() {
  document.querySelector('.booster').classList.toggle('hidden');
  document.querySelector('.profile-img').classList.toggle('hidden');
}

// Add event listener to booster button to toggle profile slot
document.addEventListener("DOMContentLoaded", () => {
  const boosterBtn = document.querySelector(".booster");
  if (boosterBtn) {
    boosterBtn.addEventListener("click", toggleProfileSlot);
  }

  // Automatically toggle every 5 seconds
  setInterval(toggleProfileSlot, 5000);
});

const searchBtn = document.querySelector('.toggle-btn[aria-label="Search"]');
const searchModal = document.getElementById('searchModal');
const closeBtn = document.querySelector('.close-btn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Dummy data contoh (nama + foto + deskripsi)
const data = [
  { name: "Arga Abiyyu", desc: "2 km • Online", img: "https://ui-avatars.com/api/?name=Arga&background=random&size=200" },
  { name: "Sinta Dewi", desc: "5 km • Baru Bergabung", img: "https://ui-avatars.com/api/?name=Sinta&background=random&size=200" },
  { name: "Budi Santoso", desc: "3 km • Aktif 1 jam lalu", img: "https://ui-avatars.com/api/?name=Budi&background=random&size=200" },
  { name: "Maya Putri", desc: "1 km • Online", img: "https://ui-avatars.com/api/?name=Maya&background=random&size=200" },
];

function openSearch() {
  searchModal.classList.remove('hidden');
  searchInput.focus();
}

function closeSearch() {
  searchModal.classList.add('hidden');
  searchInput.value = "";
  searchResults.innerHTML = "";
}

searchBtn.addEventListener('click', openSearch);
closeBtn.addEventListener('click', closeSearch);

searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) closeSearch();
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeSearch();
});

// Live search
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = data.filter(item => item.name.toLowerCase().includes(query));

  if (filtered.length > 0) {
    searchResults.innerHTML = filtered.map(item => `
      <li>
        <img src="${item.img}" alt="${item.name}">
        <div class="search-info">
          <span class="name">${item.name}</span>
          <span class="desc">${item.desc}</span>
        </div>
      </li>
    `).join("");
  } else {
    searchResults.innerHTML = `<div class="search-empty">Tidak ditemukan 😢</div>`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".profile-card");

  cards.forEach((card, i) => {
    card.querySelectorAll(".status-badge, .online-dot").forEach(el => el.remove());

    // bikin siklus: 0=online, 1=live, 2=voice
    const rand = i % 3;

    if (rand === 0) {
      const dot = document.createElement("div");
      dot.className = "online-dot";
      card.appendChild(dot);
    } else {
      const badge = document.createElement("span");
      badge.className = "status-badge " + (rand === 1 ? "live" : "voice");
      badge.textContent = rand === 1 ? "LIVE" : "VOICE";
      card.appendChild(badge);
    }
  });
});

