import { getLocalStorage } from "../js/utils.mjs";


// Load cart items
const cart = getLocalStorage("so-cart");


function calculateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);


  const tax = subtotal * 0.06;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;


  document.querySelector("#subtotal").textContent = subtotal.toFixed(2);
  document.querySelector("#tax").textContent = tax.toFixed(2);
  document.querySelector("#shipping").textContent = shipping.toFixed(2);
  document.querySelector("#total").textContent = total.toFixed(2);
}
calculateSummary();


const form = document.querySelector("#checkoutForm");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    alert("Please fill out all required fields.");
    return;
  }

  const card = document.querySelector("#cardNumber").value;
  if (card.length < 13 || card.length > 16) {
    alert("Invalid credit card number.");
    return;
  }
  // Clear cart
  localStorage.removeItem("so-cart");
});
