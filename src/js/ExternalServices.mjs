const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result || data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }

  async checkout(order) {
    try {
      const response = await fetch(`${baseURL}checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });

      return await convertToJson(response);
    } catch (err) {
      console.error("Checkout error:", err);
      throw err;
    }
  }

  async searchProducts(query, category) {
    const data = await this.getData(category);
    query = query.toLowerCase();

    return data.filter((item) =>
      item.Name.toLowerCase().includes(query)
    );
  }
}
