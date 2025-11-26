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
  if (card.length !== 16 || isNaN(card)) {
    alert("Invalid credit card number.");
    return;
  }
  // Clear cart
  localStorage.removeItem("so-cart");
});

function packageItems(items) {
  return items.map(item => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: item.FinalPrice || item.price,
    quantity: item.quantity || 1
  }));
}
import ExternalServices from "../js/ExternalServices.mjs";
import { formDataToJSON } from "../js/utils.mjs";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    alert("Please fill out all required fields.");
    return;
  }

  const card = document.querySelector("#cardNumber").value;
  if (card.length !== 16 || isNaN(card)) {
    alert("Invalid credit card number.");
    return;
  }

  // 1. Convert form into JSON object
  const formData = formDataToJSON(form);

  // 2. Add required checkout fields
  const subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
  const tax = +(subtotal * 0.06).toFixed(2);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = +(subtotal + tax + shipping).toFixed(2);

  const order = {
    ...formData,
    orderDate: new Date().toISOString(),
    items: packageItems(cart),
    orderTotal: total,
    tax: tax,
    shipping: shipping
  };

  console.log("ORDER READY TO SEND:", order);

  // 3. Send to server
  const service = new ExternalServices();
  const response = await service.checkout(order);

  console.log("SERVER RESPONSE:", response);

  if (response.success) {
    alert("Order placed successfully!");
    localStorage.removeItem("so-cart");
  } else {
    alert("Order failed. Try again.");
  }
});
