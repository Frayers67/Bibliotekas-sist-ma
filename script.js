// Konteineru datu bāze
const containers = [
    {
        id: 1,
        name: "Eco punkts - Centrs",
        address: "Brīvības iela 100, Rīga",
        categories: ["plastmasa", "stikls", "papirs"],
        hours: "24/7",
        lat: 56.9496,
        lng: 24.1052
    },
    {
        id: 2,
        name: "Šķirošanas laukums - Āgenskalns",
        address: "Melnsila iela 22, Rīga",
        categories: ["plastmasa", "stikls", "papirs", "elektronika", "baterijas"],
        hours: "Katru dienu 8:00 - 20:00",
        lat: 56.9394,
        lng: 24.0856
    },
    {
        id: 3,
        name: "Drēbju nodošanas punkts",
        address: "Dzirnavu iela 57, Rīga",
        categories: ["drebes"],
        hours: "P-Pk 10:00 - 19:00, S 10:00 - 15:00",
        lat: 56.9537,
        lng: 24.1228
    },
    {
        id: 4,
        name: "Elektronikas pieņemšana",
        address: "Krasta iela 68, Rīga",
        categories: ["elektronika", "baterijas"],
        hours: "P-Pk 9:00 - 18:00",
        lat: 56.9284,
        lng: 24.1456
    },
    {
        id: 5,
        name: "Bio atkritumu konteiners - Pļavnieki",
        address: "Andreja Saharova iela 16, Rīga",
        categories: ["bio"],
        hours: "24/7",
        lat: 56.9234,
        lng: 24.1876
    },
    {
        id: 6,
        name: "Lielgabarīta atkritumu punkts",
        address: "Getliņu iela 5, Rīga",
        categories: ["elektronika", "drebes", "plastmasa", "stikls", "papirs", "baterijas"],
        hours: "Katru dienu 8:00 - 19:00",
        lat: 56.8934,
        lng: 24.2156
    },
    {
        id: 7,
        name: "Eco konteiners - Purvciems",
        address: "Dzelzavas iela 74, Rīga",
        categories: ["plastmasa", "stikls", "papirs"],
        hours: "24/7",
        lat: 56.9612,
        lng: 24.1723
    },
    {
        id: 8,
        name: "Tekstila savākšanas konteiners",
        address: "Brivibas gatve 214, Rīga",
        categories: ["drebes"],
        hours: "24/7",
        lat: 56.9723,
        lng: 24.1534
    },
    {
        id: 9,
        name: "Bateriju nodošanas punkts - Maxima",
        address: "Lāčplēša iela 40, Rīga",
        categories: ["baterijas"],
        hours: "Katru dienu 8:00 - 22:00",
        lat: 56.9478,
        lng: 24.1289
    },
    {
        id: 10,
        name: "Šķiroto atkritumu laukums - Imanta",
        address: "Kurzemes prospekts 102, Rīga",
        categories: ["plastmasa", "stikls", "papirs", "bio", "elektronika"],
        hours: "P-Pk 7:00 - 20:00, S-Sv 9:00 - 17:00",
        lat: 56.9567,
        lng: 23.9987
    }
];

// Kategoriju nosaukumi latviski
const categoryNames = {
    plastmasa: "Plastmasa",
    stikls: "Stikls",
    papirs: "Papīrs",
    elektronika: "Elektronika",
    drebes: "Drēbes",
    baterijas: "Baterijas",
    bio: "Bio"
};

// Kategoriju ikonas
const categoryIcons = {
    plastmasa: "♻️",
    stikls: "🫙",
    papirs: "📄",
    elektronika: "💻",
    drebes: "👕",
    baterijas: "🔋",
    bio: "🥬"
};

// Pašreizējais filtrs
let currentFilter = "all";
let searchQuery = "";

// Inicializācija
document.addEventListener("DOMContentLoaded", () => {
    renderContainers();
    setupEventListeners();
});

// Notikumu klausītāji
function setupEventListeners() {
    // Filtru pogas
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.category;
            renderContainers();
        });
    });

    // Meklēšana
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderContainers();
    });
}

// Filtrē konteinerus
function filterContainers() {
    return containers.filter(container => {
        // Kategorijas filtrs
        const categoryMatch = currentFilter === "all" || 
            container.categories.includes(currentFilter);
        
        // Meklēšanas filtrs
        const searchMatch = searchQuery === "" ||
            container.name.toLowerCase().includes(searchQuery) ||
            container.address.toLowerCase().includes(searchQuery);
        
        return categoryMatch && searchMatch;
    });
}

// Renderē konteinerus
function renderContainers() {
    const grid = document.getElementById("containers-grid");
    const filteredContainers = filterContainers();

    if (filteredContainers.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <p>😕 Nav atrasts neviens konteiners ar šādiem kritērijiem</p>
                <p>Mēģini mainīt filtrus vai meklēšanas vaicājumu</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredContainers.map(container => `
        <div class="container-card">
            <h3>📍 ${container.name}</h3>
            <p class="address">${container.address}</p>
            <div class="categories">
                ${container.categories.map(cat => `
                    <span class="category-tag ${cat}">
                        ${categoryIcons[cat]} ${categoryNames[cat]}
                    </span>
                `).join("")}
            </div>
            <p class="hours">🕐 ${container.hours}</p>
        </div>
    `).join("");
}

