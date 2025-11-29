import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";


export const externalServices = new ExternalServices("tents");

// debugging stuff in the browser console
if (typeof window !== "undefined") {
  window.externalServices = externalServices;
}
document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const query = document.querySelector("#search-input").value.trim();

  if (!query) return;

  // Redirect to product list page with query string
  window.location.href = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
});
