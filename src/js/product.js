import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

async function addToCartHandler(e) {
  const productId = e.target.dataset.id;

  // fetch product from JSON data
  const product = await dataSource.findProductById(productId);

  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  const productToCart = {
    Id: String(product.Id),
    Name: product.Name || product.NameWithoutBrand || "",
    Image: product.Image || "",
    FinalPrice: Number(product.FinalPrice || product.ListPrice || 0),
    Colors: product.Colors || [{ ColorName: "N/A" }]
  };

  // get cart
  const cart = getLocalStorage("so-cart"); // returns array
  cart.push(productToCart);

  setLocalStorage("so-cart", cart); // save array
}

const addButton = document.getElementById("addToCart");
if (addButton) addButton.addEventListener("click", addToCartHandler);
