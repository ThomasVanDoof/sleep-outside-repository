//html-escaping guide helper thang for inserting text into templates
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

//product card template using a template literal
function productCardTemplate(product) {
  let img = product.Image || "";
  img = img.replace(/^(\.\.\/)+/, "");
  if (!img.includes("public/")) {
    img = `public/json/${img}`;
  }

  const brand = (product.Brand && product.Brand.Name) || "";
  const name = product.NameWithoutBrand || product.Name || "";
  const priceNum = typeof product.FinalPrice === "number" ? product.FinalPrice : product.ListPrice;
  const price = typeof priceNum === "number" ? priceNum.toFixed(2) : (priceNum || "");

  return `<li class="product-card">
    <a href="product_pages/?product=${encodeURIComponent(product.Id)}">
      <img src="${escapeHtml(img)}" alt="Image of ${escapeHtml(name)}" />
      <h3 class="card__brand">${escapeHtml(brand)}</h3>
      <h2 class="card__name">${escapeHtml(name)}</h2>
      <p class="product-card__price">$${price}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    if (typeof listElement === "string") {
      this.listElement = (typeof document !== "undefined") ? document.querySelector(listElement) : null;
    } else {
      this.listElement = listElement;
    }
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  //renderList takes the array of products 'n inserts the generated markup into dom
  renderList(products = []) {
    if (!this.listElement) return;
    const html = products.map((p) => productCardTemplate(p)).join("\n");
    this.listElement.innerHTML = html;
  }
}