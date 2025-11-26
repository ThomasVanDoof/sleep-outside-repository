import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';


loadHeaderFooter();

const category = getParam('category');
// first create an instance of the ProductData class.
const dataSource = new ProductData();
// then get the element you want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();

function productCardTemplate(product) {
  const brand = (product.Brand && product.Brand.Name) || "";
  const name = product.NameWithoutBrand || product.Name || "";
  const priceNum = typeof product.FinalPrice === "number" ? product.FinalPrice : product.ListPrice;
  const price = typeof priceNum === "number" ? priceNum.toFixed(2) : (priceNum || "");

  return `<li class="product-card">
    <a href="/product_pages/product_detail.html?product=${encodeURIComponent(product.Id)}">
      <img src="${escapeHtml(product.PrimaryMedium || product.Image || '')}" alt="Image of ${escapeHtml(name)}" />
      <h3>${escapeHtml(brand)}</h3>
      <h2>${escapeHtml(name)}</h2>
      <p>$${price}</p>
    </a>
  </li>`;
}
