import { getLocalStorage, formDataToJSON } from "../js/utils.mjs";
import ExternalServices from "../js/ExternalServices.mjs";

// Load cart items
const cart = getLocalStorage("so-cart");

// Calculate order summary
function calculateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
  const tax = +(subtotal * 0.06).toFixed(2);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = +(subtotal + tax + shipping).toFixed(2);

  document.querySelector("#subtotal").textContent = subtotal.toFixed(2);
  document.querySelector("#tax").textContent = tax.toFixed(2);
  document.querySelector("#shipping").textContent = shipping.toFixed(2);
  document.querySelector("#total").textContent = total.toFixed(2);
}
calculateSummary();

function packageItems(items) {
  return items.map(item => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: +(item.FinalPrice || item.price).toFixed(2),
    quantity: item.quantity || 1
  }));
}


// Handle form submission
const form = document.querySelector("#checkoutForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // HTML validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Credit card validation
  const card = document.querySelector("#cardNumber").value;
  if (card.length !== 16 || isNaN(card)) {
    alert("Invalid credit card number.");
    return;
  }

  // Build order data
  const formData = formDataToJSON(form);
  const subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
  const tax = +(subtotal * 0.06).toFixed(2);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = +(subtotal + tax + shipping).toFixed(2);

const order = {
  orderDate: new Date().toISOString(),

  // Customer info — must match assignment keys
  fname: formData.fname,
  lname: formData.lname,
  street: formData.street,
  city: formData.city,
  state: formData.state,
  zip: formData.zip,

  // Payment info
  cardNumber: formData.cardNumber,
  expiration: formData.expiration,
  code: formData.code,

  // Cart items
  items: packageItems(cart),

  // Totals
  orderTotal: total.toFixed(2),
  shipping: shipping.toFixed(2),
  tax: tax.toFixed(2)
};




  console.log("ORDER READY TO SEND:", order);

  const service = new ExternalServices();

  try {
    const response = await service.checkout(order);
    console.log("SERVER RESPONSE:", response);

    if (response.success) {
      localStorage.removeItem("so-cart");
      window.location.href = "/checkout/success.html"; // redirect to success page
    } else {
      alert("Order failed. Try again.");
    }
  } catch (err) {
    console.error("Checkout failed:", err);

    if (err.name === "servicesError") {
      alert("Server Error: " + JSON.stringify(err.message));
    } else {
      alert("Unexpected error occurred. Please try again.");
    }
  }
});
