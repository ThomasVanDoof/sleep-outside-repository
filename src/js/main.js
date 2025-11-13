import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// create a ProductData instance in tents 
export const productData = new ProductData("tents");

// debugging stuff in the browser console
if (typeof window !== "undefined") {
	window.productData = productData;
}
