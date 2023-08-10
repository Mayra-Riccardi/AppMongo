const productsModel = require('../../models/ProductModel');

class ProductManager {

  async getProducts() {
    try {
      const products = await productsModel.find().lean();
      return products;
    } catch (error) {
      console.log('Error getting products:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const resultado = await productsModel.find({ _id: id }).lean();
      return resultado[0];
    } catch (error) {
      console.log('Error getting product by ID:', error);
      throw error;
    }
  }

  async addProduct(body) {
    try {
      const product = await productsModel.create(body);
      return product;
    } catch (error) {
      console.log('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const result = await productsModel.updateOne({ _id: id }, product);
      return result;
    } catch (error) {
      console.log('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productsModel.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
          return null; // Indicate that the product was not found
      }

      return result;
    } catch (error) {
      console.log('Error deleting product:', error);
      throw error;
    }
  }

}

module.exports = new ProductManager();
