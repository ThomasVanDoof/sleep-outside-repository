const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  // Convert the response body to JSON first
  const jsonResponse = await res.json();


  // If the response is OK, return it
  if (res.ok) {
    return jsonResponse;
  } else {
    // If not OK, throw a custom object containing the server response
    throw { name: 'servicesError', message: jsonResponse };
  }
}




export default class ExternalServices {
  constructor() {
    // No category needed anymore
  }


  // fetch all products in a category
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }


  // fetch a single product by its ID
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result || data; // some APIs wrap product in Result
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }
}
