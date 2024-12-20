const brands = {
  "brand-violet": {
    image: "./assets/images/watch-1-violet.png",
    sizes: [
      { id: "size-s", size: "S", price: "$69.00", discountPrice: "$49.00" },
      { id: "size-m", size: "M", price: "$79.00", discountPrice: "$59.00" },
      { id: "size-l", size: "L", price: "$89.00", discountPrice: "$69.00" },
      { id: "size-xl", size: "XL", price: "$99.00", discountPrice: "$79.00" },
    ],
  },
  "brand-cyan": {
    image: "./assets/images/watch-1-cyan.png",
    sizes: [
      { id: "size-s", size: "S", price: "$59.00", discountPrice: "$39.00" },
      { id: "size-m", size: "M", price: "$69.00", discountPrice: "$49.00" },
      { id: "size-l", size: "L", price: "$79.00", discountPrice: "$59.00" },
      { id: "size-xl", size: "XL", price: "$89.00", discountPrice: "$69.00" },
    ],
  },
  "brand-blue": {
    image: "./assets/images/watch-1-blue.png",
    sizes: [
      { id: "size-s", size: "S", price: "$79.00", discountPrice: "$59.00" },
      { id: "size-m", size: "M", price: "$89.00", discountPrice: "$69.00" },
      { id: "size-l", size: "L", price: "$99.00", discountPrice: "$79.00" },
      { id: "size-xl", size: "XL", price: "$109.00", discountPrice: "$89.00" },
    ],
  },
  "brand-black": {
    image: "./assets/images/watch-1-black.png",
    sizes: [
      { id: "size-s", size: "S", price: "$89.00", discountPrice: "$69.00" },
      { id: "size-m", size: "M", price: "$99.00", discountPrice: "$79.00" },
      { id: "size-l", size: "L", price: "$109.00", discountPrice: "$89.00" },
      { id: "size-xl", size: "XL", price: "$119.00", discountPrice: "$99.00" },
    ],
  },
};

let selectedBrandButtonId = "brand-violet";
let selectedSizeButtonId = "size-s";

const brandButtonIds = Object.keys(brands);
const cart = [];

function updatePriceSection() {
  const currentBrand = brands[selectedBrandButtonId];
  const currentSize = currentBrand.sizes.find(
    (size) => size.id === selectedSizeButtonId
  );

  const originalPriceElement = document.getElementById("original-price");
  const discountPriceElement = document.getElementById("discount-price");

  originalPriceElement.textContent = currentSize.price;
  discountPriceElement.textContent = currentSize.discountPrice;

  const productImage = document.getElementById("product-image");
  productImage.src = currentBrand.image;

  console.log(
    `Updated prices for ${selectedBrandButtonId} - ${selectedSizeButtonId}:`,
    currentSize
  );
}

function handleBrandButtonClick(clickedId) {
  brandButtonIds.forEach((id) => {
    const button = document.getElementById(id);
    button.firstElementChild.classList.remove("ring-2");
  });

  const clickedButton = document.getElementById(clickedId);
  clickedButton.firstElementChild.classList.add("ring-2");

  selectedBrandButtonId = clickedId;
  generateSizeButtons();
  updatePriceSection();
}

function handleSizeButtonClick(clickedId) {
  const sizeButtons = document.querySelectorAll("#size-buttons button");
  sizeButtons.forEach((button) => {
    button.classList.remove("ring-[#6576FF]");
    button.classList.add("ring-[#DBDFEA]");
  });

  const clickedButton = document.getElementById(clickedId);
  clickedButton.classList.add("ring-[#6576FF]");
  clickedButton.classList.remove("ring-[#DBDFEA]");

  selectedSizeButtonId = clickedId;
  updatePriceSection();
}

function generateSizeButtons() {
  const sizeButtonsContainer = document.getElementById("size-buttons");
  sizeButtonsContainer.innerHTML = "";

  const selectedBrandSizes = brands[selectedBrandButtonId].sizes;

  selectedBrandSizes.forEach(({ id, size, price }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.className = `text-[13px] px-[18px] py-[8px] ring-1 rounded-[3px] mb-2 md:mb-0 ${
      id === selectedSizeButtonId ? "ring-[#6576FF]" : "ring-[#DBDFEA]"
    }`;

    button.innerHTML = `
      <span class="text-[#364A63] font-[700] mr-[4px]">${size}</span>
      <span class="text-[#8091A7] font-[400]">${price}</span>
    `;

    button.addEventListener("click", () => handleSizeButtonClick(id));
    sizeButtonsContainer.appendChild(button);
  });
}

function createCartItem(item) {
  const row = document.createElement("tr");
  row.classList.add("border-b");

  const quantity = item.quantity;
  const price = parseFloat(item.discountPrice.replace("$", ""));
  const totalItemPrice = quantity * price;

  row.innerHTML = `
    <td class="py-2">
      <div class="flex items-center gap-2">
        <img src="${item.image}" alt="${
    item.brand
  }" class="w-8 h-8 md:w-10 md:h-10 rounded" />
        <span class="text-[#364A63] text-[12px] md:text-[14px] font-[400]">Classy Modern Smart watch</span>
      </div>
    </td>
    <td class="text-[#364A63] py-4 text-[12px] md:text-[14px] font-[400] capitalize">${
      item.brand.split("-")[1]
    }</td>
    <td class="text-[#364A63] py-4 text-[12px] md:text-[14px] font-[700] text-center">${
      item.size
    }</td>
    <td class="text-[#364A63] py-4 text-[12px] md:text-[14px] font-[700] text-center">${
      item.quantity
    }</td>
    <td class="text-[#364A63] py-4 text-[12px] md:text-[14px] font-[700] text-right">${
      item.discountPrice
    }</td>
  `;

  return { row, totalItemPrice };
}

function openCartModal() {
  const modal = document.getElementById("cart-modal");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    const { row, totalItemPrice } = createCartItem(item);
    cartItemsList.appendChild(row);
    totalPrice += totalItemPrice;
  });

  cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCartModal();
    }
  });
}

function closeCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

function handleQuantityChange(change) {
  const input = document.getElementById("quantity-input");
  const currentValue = parseInt(input.value, 10);
  const newValue = currentValue + change;

  if (newValue >= 1) {
    input.value = newValue;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const firstBrandButton = document.getElementById(selectedBrandButtonId);
  firstBrandButton.firstElementChild.classList.add("ring-2");

  generateSizeButtons();
  updatePriceSection();

  brandButtonIds.forEach((id) => {
    document
      .getElementById(id)
      .addEventListener("click", () => handleBrandButtonClick(id));
  });

  const quantityInput = document.getElementById("quantity-input");
  document
    .getElementById("increase-btn")
    .addEventListener("click", () => handleQuantityChange(1));
  document
    .getElementById("decrease-btn")
    .addEventListener("click", () => handleQuantityChange(-1));

  quantityInput.addEventListener("input", () => {
    const value = parseInt(quantityInput.value, 10);
    if (value < 1) quantityInput.value = 1;
  });

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value, 10);
    const currentBrand = brands[selectedBrandButtonId];
    const currentSize = currentBrand.sizes.find(
      (size) => size.id === selectedSizeButtonId
    );

    const cartItem = {
      brand: selectedBrandButtonId,
      image: currentBrand.image,
      size: currentSize.size,
      price: currentSize.price,
      discountPrice: currentSize.discountPrice,
      quantity: quantity,
    };

    const existingItemIndex = cart.findIndex(
      (item) =>
        item.brand === cartItem.brand &&
        item.size === cartItem.size &&
        item.price === cartItem.price &&
        item.discountPrice === cartItem.discountPrice
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    document.getElementById("cart-items-count").textContent = cart.length;
    alert("Item added to cart");
  });

  document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length > 0) {
      openCartModal();
    } else {
      alert("Your cart is empty!");
    }
  });

  document
    .getElementById("continue-shopping")
    .addEventListener("click", closeCartModal);

  document.getElementById("checkoutProceed").addEventListener("click", () => {
    if (cart.length > 0) {
      closeCartModal();
      cart.length = 0;
      document.getElementById("cart-items-count").textContent = "0";
      alert("Thank you for your purchase! Your order has been processed.");
    } else {
      alert(
        "Your cart is empty! Please add items to your cart before proceeding."
      );
    }
  });

  document.getElementById("favorite").addEventListener("click", function () {
    this.querySelector("i").classList.toggle("text-[#6576FF]");
  });
});
