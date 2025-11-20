import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// renders the cart
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const listEl = document.querySelector(".product-list");

  if (listEl) {
    listEl.innerHTML = htmlItems.join("");
    attachRemoveListeners();
  }

  // NEW: update cart total
  updateCartTotal();
}

// NEW: calculate and display total
function updateCartTotal() {
  const cart = getLocalStorage("so-cart");
  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (!footer || !totalElement) return;

  if (!cart || cart.length === 0) {
    footer.classList.add("hide");
    totalElement.textContent = "";
    return;
  }

  footer.classList.remove("hide");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0
  );

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// clears entire cart
function clearCartContents() {
  localStorage.removeItem("so-cart");
  const listEl = document.querySelector(".product-list");
  if (listEl) listEl.innerHTML = "";

  // NEW: update total after clearing
  updateCartTotal();
}

function setupClearButton() {
  const clearButton = document.querySelector(".cart-clear");
  if (clearButton) {
    clearButton.addEventListener("click", clearCartContents);
  }
}

// template for a cart item
function cartItemTemplate(item) {
  return `
<li class="cart-card divider">
  <span class="cart-item-remove" data-id="${item.Id}" style="cursor:pointer;float:right;">X</span>

  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>

  <h2 class="card__name">${item.Name}</h2>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Qty: 1</p>
  <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
</li>`;
}

// clears item relating to ID
function removeItem(itemId) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCart = cartItems.filter((item) => item.Id !== itemId);

  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".cart-item-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.getAttribute("data-id");
      removeItem(itemId);
    });
  });
}

renderCartContents();
setupClearButton();
