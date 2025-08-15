// Global variables
let bananas = [];

// Country flag mapping
const countryFlags = {
  Ecuador: "🇪🇨",
  Philippines: "🇵🇭",
  "Costa Rica": "🇨🇷",
  India: "🇮🇳",
  Brazil: "🇧🇷",
  Japan: "🇯🇵",
  USA: "🇺🇸",
  Germany: "🇩🇪",
  France: "🇫🇷",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Mexico: "🇲🇽",
  Colombia: "🇨🇴",
  Peru: "🇵🇪",
  Guatemala: "🇬🇹",
  Honduras: "🇭🇳",
  Panama: "🇵🇦",
  Nicaragua: "🇳🇮",
  Venezuela: "🇻🇪",
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  loadBananas();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  const addForm = document.getElementById("addBananaForm");
  addForm.addEventListener("submit", handleAddBanana);
}

// Load bananas from API
async function loadBananas() {
  try {
    const response = await fetch("/api/bananas");
    if (!response.ok) {
      throw new Error("Failed to fetch bananas");
    }
    bananas = await response.json();
    renderBananas();
    updateStats();
  } catch (error) {
    console.error("Error loading bananas:", error);
    showError("Failed to load banana data");
  }
}

// Handle adding new banana
async function handleAddBanana(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const bananaData = {
    country: formData.get("country"),
    pricePerKg: parseFloat(formData.get("pricePerKg")),
    averageRipeness: parseFloat(formData.get("averageRipeness")),
    currency: formData.get("currency"),
  };

  try {
    const response = await fetch("/api/bananas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bananaData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add banana");
    }

    const newBanana = await response.json();
    bananas.push(newBanana);
    renderBananas();
    updateStats();

    // Reset form
    event.target.reset();
    showSuccess("🍌 New country added to the Banana Index!");
  } catch (error) {
    console.error("Error adding banana:", error);
    showError(error.message);
  }
}

// Handle deleting banana
async function handleDeleteBanana(id) {
  if (
    !confirm("Are you sure you want to remove this country from the index?")
  ) {
    return;
  }

  try {
    const response = await fetch(`/api/bananas/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete banana");
    }

    bananas = bananas.filter((banana) => banana.id !== id);
    renderBananas();
    updateStats();
    showSuccess("Country removed from the index");
  } catch (error) {
    console.error("Error deleting banana:", error);
    showError("Failed to delete country");
  }
}

// Render bananas in the grid
function renderBananas() {
  const bananaList = document.getElementById("bananaList");

  if (bananas.length === 0) {
    bananaList.innerHTML =
      '<div class="loading">No countries in the index yet. Add the first one!</div>';
    return;
  }

  bananaList.innerHTML = bananas
    .map(
      (banana) => `
        <div class="banana-card">
            <button class="delete-btn" onclick="handleDeleteBanana(${
              banana.id
            })" title="Remove from index">×</button>
            <h3>
                <span class="flag">${getCountryFlag(banana.country)}</span>
                ${banana.country}
            </h3>
            <div class="banana-info">
                <div class="info-item">
                    <div class="label">Price per kg</div>
                    <div class="value">$${banana.pricePerKg.toFixed(2)}</div>
                </div>
                <div class="info-item">
                    <div class="label">Ripeness</div>
                    <div class="value">${banana.averageRipeness}/10</div>
                </div>
            </div>
            <div class="ripeness-bar">
                <div class="ripeness-fill" style="width: ${
                  (banana.averageRipeness / 10) * 100
                }%"></div>
            </div>
            <div class="last-updated">Updated: ${banana.lastUpdated}</div>
        </div>
    `
    )
    .join("");
}

// Update statistics
function updateStats() {
  const countryCount = document.getElementById("countryCount");
  const avgPrice = document.getElementById("avgPrice");
  const avgRipeness = document.getElementById("avgRipeness");

  countryCount.textContent = bananas.length;

  if (bananas.length > 0) {
    const totalPrice = bananas.reduce(
      (sum, banana) => sum + banana.pricePerKg,
      0
    );
    const totalRipeness = bananas.reduce(
      (sum, banana) => sum + banana.averageRipeness,
      0
    );

    avgPrice.textContent = `$${(totalPrice / bananas.length).toFixed(2)}`;
    avgRipeness.textContent = (totalRipeness / bananas.length).toFixed(1);
  } else {
    avgPrice.textContent = "$0.00";
    avgRipeness.textContent = "0.0";
  }
}

// Get country flag emoji
function getCountryFlag(country) {
  return countryFlags[country] || "🌍";
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success";
  successDiv.textContent = message;

  const container = document.querySelector(".container");
  container.insertBefore(successDiv, container.firstChild);

  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = message;

  const container = document.querySelector(".container");
  container.insertBefore(errorDiv, container.firstChild);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Add some fun animations
function addBananaAnimation() {
  const bananas = document.querySelectorAll(".banana-card");
  bananas.forEach((banana, index) => {
    banana.style.animationDelay = `${index * 0.1}s`;
    banana.style.animation = "slideInUp 0.6s ease-out forwards";
  });
}

// CSS animation for slide in
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Call animation when bananas are rendered
const originalRenderBananas = renderBananas;
renderBananas = function () {
  originalRenderBananas();
  setTimeout(addBananaAnimation, 100);
};
