// ../js/product-detail.js
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Get the product ID from the URL query string
const productId = getParam('product');

if (!productId) {
  console.error("No product ID found in URL");
  // Optionally, you could redirect to the product listing page here
} else {
  // Create a data source for fetching product info
  const dataSource = new ExternalServices();

  // Create the ProductDetails instance
  const product = new ProductDetails(productId, dataSource);

  // Initialize and render the product
  product.init();
}
