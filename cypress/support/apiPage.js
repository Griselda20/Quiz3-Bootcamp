class ApiPage {
  baseUrl = 'https://api.escuelajs.co/api/v1';

  // GET Requests
  getCategories() {
    return cy.request('GET', `${this.baseUrl}/categories`);
  }

  getSingleCategory(id) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/categories/${id}`,
      failOnStatusCode: false
    });
  }

  getProducts() {
    return cy.request('GET', `${this.baseUrl}/products?limit=10`);
  }

  // POST Request
  createCategory(payload) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/categories`,
      body: payload,
      failOnStatusCode: false
    });
  }

  // PUT Request
  updateCategory(id, payload) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/categories/${id}`,
      body: payload,
      failOnStatusCode: false
    });
  }

  // DELETE Request
  deleteCategory(id) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/categories/${id}`,
      failOnStatusCode: false
    });
  }
}

export default new ApiPage();