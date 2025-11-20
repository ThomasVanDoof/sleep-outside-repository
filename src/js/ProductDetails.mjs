import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;       // the ID of the product to show
    this.dataSource = dataSource;     // instance of ProductData
    this.product = {};                // will store the fetched product details
  }

  async init() {
    // 1. Fetch product details from API
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error("Product not found:", this.productId);
      return;
    }

    // 2. Render product details in HTML
    this.renderProductDetails();

    // 3. Attach "Add to Cart" button listener
    const addButton = document.getElementById('addToCart');
    if (addButton) {
      addButton.addEventListener('click', this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cart = getLocalStorage('so-cart');

    cart.push({
      Id: String(this.product.Id),
      Name: this.product.Name || this.product.NameWithoutBrand || '',
      Image: this.product.PrimaryMedium || this.product.Image || '',
      FinalPrice: Number(this.product.FinalPrice || this.product.ListPrice || 0),
      Colors: this.product.Colors || [{ ColorName: 'N/A' }]
    });

    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    // Example: populate existing HTML elements
    document.getElementById('productName').textContent = this.product.Name || this.product.NameWithoutBrand;
    document.getElementById('productPrice').textContent = `$${this.product.FinalPrice.toFixed(2)}`;
    document.getElementById('productImage').src = this.product.PrimaryLarge || this.product.PrimaryMedium || this.product.Image;
    // Add other fields like description, colors, etc.
  }
}
// FIND THE WAY TO GET THE IMAGES TO WORK, IT PROBABLY HAS SOMETHING TO DO WITH API!!!