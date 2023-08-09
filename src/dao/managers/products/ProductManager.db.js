const productsModel = require('../../models/ProductModel');


class ProductManager {

  async getProducts() {
    const products = await productsModel.find().lean();

    return products;
  }

  async getById(id) {
    const resultado = await productsModel.find({ _id: id }).lean();

    return resultado[0];
  };

  async addProduct(body) {
    const product = await productsModel.create(body);

    return product;
  }

  async updateProduct(id, product) {
    const result = await productsModel.updateOne({ _id: id }, product);

    return result;
  }

  async deleteProduct(id) {
    const result = await productsModel.deleteOne({ _id: id });

    return result;
  }
}
module.exports = new ProductManager();