let selectedBrandButtonId = "brand-violet"; // Initially select the brand button
let selectedSizeButtonId = "size-s"; // Initially select the size button

// List of brand-button IDs
const brandButtonIds = [
  "brand-violet",
  "brand-cyan",
  "brand-blue",
  "brand-black",
];
// List of size-button IDs
const sizeButtonIds = ["size-s", "size-m", "size-l", "size-xl"];

// Function to handle brand button clicks
function handleBrandButtonClick(clickedId) {
  // Remove 'ring-2' from all brand buttons
  brandButtonIds.forEach((id) => {
    const button = document.getElementById(id);
    button.firstElementChild.classList.remove("ring-2");
  });

  // Add 'ring-2' to the clicked brand button
  const clickedButton = document.getElementById(clickedId);
  clickedButton.firstElementChild.classList.add("ring-2");

  // Update the selected brand button ID
  selectedBrandButtonId = clickedId;
  console.log("Currently selected brand button:", selectedBrandButtonId);
}

// Function to handle size button clicks
function handleSizeButtonClick(clickedId) {
  // Remove 'ring-[#6576FF]' and add 'ring-[#DBDFEA]' to all size buttons
  sizeButtonIds.forEach((id) => {
    const button = document.getElementById(id);
    button.classList.add("ring-[#DBDFEA]");
    button.classList.remove("ring-[#6576FF]");
  });

  // Add 'ring-[#6576FF]' to the clicked size button
  const clickedButton = document.getElementById(clickedId);
  clickedButton.classList.add("ring-[#6576FF]");
  clickedButton.classList.remove("ring-[#DBDFEA]");

  // Update the selected size button ID
  selectedSizeButtonId = clickedId;
  console.log("Currently selected size button:", selectedSizeButtonId);
}

// Set initial state - make the first brand button active
document.addEventListener("DOMContentLoaded", () => {
  const firstBrandButton = document.getElementById(selectedBrandButtonId);
  firstBrandButton.firstElementChild.classList.add("ring-2");
});

// Set initial state - make the first size button active
document.addEventListener("DOMContentLoaded", () => {
  const firstSizeButton = document.getElementById(selectedSizeButtonId);
  firstSizeButton.classList.add("ring-[#6576FF]");
  firstSizeButton.classList.remove("ring-[#DBDFEA]");
});

// Attach click event listeners to all brand buttons
brandButtonIds.forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("click", () => handleBrandButtonClick(id));
});

// Attach click event listeners to all size buttons
sizeButtonIds.forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("click", () => handleSizeButtonClick(id));
});

document.addEventListener("DOMContentLoaded", () => {
  // Select the relevant elements
  const quantityInput = document.getElementById("quantity-input");
  const increaseBtn = document.getElementById("increase-btn");
  const decreaseBtn = document.getElementById("decrease-btn");

  // Function to log the current value
  function logCurrentValue() {
    console.log("Current Quantity:", quantityInput.value);
  }

  // Handle "+" button click
  increaseBtn.addEventListener("click", () => {
    quantityInput.stepUp(); // Increase input value
    logCurrentValue();
  });

  // Handle "-" button click
  decreaseBtn.addEventListener("click", () => {
    quantityInput.stepDown(); // Decrease input value
    logCurrentValue();
  });

  // Handle manual input changes
  quantityInput.addEventListener("input", () => {
    logCurrentValue();
  });
});
