import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product"); // ?product=ID
const dataSource = new ExternalServices(); // flexible for any category
const product = new ProductDetails(productId, dataSource);
product.init();

const baseURL = import.meta.env.VITE_SERVER_URL;

// fetch product by ID from API
async function findProductById(id) {
  const response = await fetch(`${baseURL}product/${id}`);
  const data = await response.json();
  return data.Result || data; // depending on API response structure
}

async function addToCartHandler(e) {
  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  const productToCart = {
    Id: String(product.Id),
    Name: product.Name || product.NameWithoutBrand || "",
    Image: product.PrimaryMedium || product.Image || "",
    FinalPrice: Number(product.FinalPrice || product.ListPrice || 0),
    Colors: product.Colors || [{ ColorName: "N/A" }],
  };

  const cart = getLocalStorage("so-cart");
  cart.push(productToCart);
  setLocalStorage("so-cart", cart);
}

// attach listener
const addButton = document.getElementById("addToCart");
if (addButton) addButton.addEventListener("click", addToCartHandler);

// optional: fetch and render product details on page load
(async () => {
  if (!productId) return;

  if (!product) return;

  document.querySelector("#productName").textContent =
    product.Name || product.NameWithoutBrand;
  document.querySelector("#productPrice").textContent =
    `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector("#productImage").src =
    product.PrimaryLarge || product.PrimaryMedium || product.Image;
})();
