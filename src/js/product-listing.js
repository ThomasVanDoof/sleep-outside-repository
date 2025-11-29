import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";

const dataSource = new ExternalServices(category);

const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search");

async function loadProducts() {
  let products;

  if (searchTerm) {
    console.log("Searching for:", searchTerm);
    products = await dataSource.searchProducts(searchTerm, category);
    myList.init(products);
  } else {
    myList.init();
  }
}

loadProducts();
