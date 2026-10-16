// Get HTML elements
const roofArea = document.getElementById("roofArea");
const rainfall = document.getElementById("rainfall");
const efficiency = document.getElementById("efficiency");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const annualResult = document.getElementById("annualResult");
const monthlyResult = document.getElementById("monthlyResult");
const efficiencyResult = document.getElementById("efficiencyResult");

// Format numbers with commas
function formatNumber(number) {
    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2
    }).format(number);
}

// Calculate rainwater collection
function calculateRainwater() {
    const area = Number(roofArea.value);
    const rain = Number(rainfall.value);
    const rate = Number(efficiency.value);

    // Validate inputs
    if (
        roofArea.value.trim() === "" ||
        rainfall.value.trim() === "" ||
        !Number.isFinite(area) ||
        !Number.isFinite(rain) ||
        area <= 0 ||
        rain <= 0 ||
        area > 1000000 ||
        rain > 10000
    ) {
        annualResult.textContent = "Invalid input";
        monthlyResult.textContent =
            "Enter a valid roof area and annual rainfall.";
        efficiencyResult.textContent = "";
        return;
    }

    // Formula:
    // Roof area (m²) × Rainfall (mm) = Litres
    const grossRainwater = area * rain;

    // Account for collection losses
    const annualWater = grossRainwater * rate;

    // Average monthly collection
    const monthlyWater = annualWater / 12;

    // Display results
    annualResult.textContent =
        formatNumber(annualWater) + " Litres";

    monthlyResult.textContent =
        "Monthly average: " +
        formatNumber(monthlyWater) +
        " Litres";

    efficiencyResult.textContent =
        "Collection efficiency: " +
        Math.round(rate * 100) +
        "%";
}

// Reset calculator values
function resetCalculator() {
    roofArea.value = 100;
    rainfall.value = 800;
    efficiency.value = 0.75;

    calculateRainwater();
}

// Button events
calculateBtn.addEventListener(
    "click",
    calculateRainwater
);

resetBtn.addEventListener(
    "click",
    resetCalculator
);

// Calculate automatically when inputs change
roofArea.addEventListener("input", calculateRainwater);
rainfall.addEventListener("input", calculateRainwater);
efficiency.addEventListener("change", calculateRainwater);

// Show initial estimate
calculateRainwater();