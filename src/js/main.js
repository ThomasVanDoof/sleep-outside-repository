import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

// create a ProductData instance in tents 
export const externalServices = new ExternalServices("tents");

// debugging stuff in the browser console
if (typeof window !== "undefined") {
	window.externalServices = externalServices;
}
