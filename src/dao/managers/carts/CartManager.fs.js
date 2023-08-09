const fs = require("fs");
const path = require("path");

const ProductManager = require("../products/ProductManager.fs")

class CartsManager {
  constructor(filename) {
    this.filename = filename;
    this.filepath = this.filename
    this.carts = [];
    this.productManager = new ProductManager(path.join(__dirname, "../data/products.json"));
  }

  async getCarts() {
    try {
      const datos = await fs.promises.readFile(this.filepath, "utf-8");
      const carts = JSON.parse(datos);
      return carts;
    } catch (err) {
      console.log("The error is here", err);
      return []; // Devuelve un array vacío si hay un error en la lectura del archivo
    }
  }

  async addCart() {
    const carts = await this.getCarts();

    let id = 1;
    if (carts.length > 0) {
      id = carts[carts.length - 1].id + 1;
    }

    const newCart = {
      id: id,
      products: [],
    };

    carts.push(newCart);

    try {
      await fs.promises.writeFile(
        this.filepath,
        JSON.stringify(carts, null, 2)
      );
      
      return newCart;
      
    } catch (err) {
      console.log("Error saving this cart", err);
      return null;
    }
  }

  async getCartById(id) {
    try {
      const data = await fs.promises.readFile(this.filepath, "utf-8");
      const carts = JSON.parse(data);
      const cartFound = carts.find((cart) => cart.id === +id);
  
      if (cartFound) {
        return cartFound;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error reading Carts file:", error);
      return null;
    }
  }
  

  async addProductToCart(cid, pid) {
    try {
      // Verificar si el carrito existe
      let cartById = await this.getCartById(+cid);
      
      if (!cartById) {
        return "Cart not found";
      }

      // Verificar si el producto existe en products.json
      let productById = await this.productManager.getById(+pid);
      if (!productById) {
        return "Product not found";
      }

      // Buscar el índice del producto en el carrito
      const index = cartById.products.findIndex((prod) => prod.id === +pid);

      if (index !== -1) {
        // El producto ya existe en el carrito, se incrementa la cantidad
        cartById.products[index].cantidad++;
      } else {
        // El producto no existe en el carrito, se agrega con cantidad 1
        cartById.products.push({ id: productById.id, cantidad: 1 });
      }

      // Actualizar el archivo carts.json con el carrito modificado
      const cartAll = await this.getCarts();
      const updatedCarts = cartAll.map((cart) => {
        if (cart.id === +cid) {
          return cartById;
        }
        return cart;
      });
      await fs.promises.writeFile(
        this.filepath,
        JSON.stringify(updatedCarts, null, 2)
      );

      return "Product added to Cart";
    } catch (error) {
      console.error("Error adding product to Cart:", error);
      return "An error has ocurred while adding product to Cart";
    }
  }

  async deleteCart(id) {
    try {
      const data = await fs.promises.readFile(this.filepath, "utf-8");
      const carts = JSON.parse(data);
  
      const cartFound = carts.findIndex((cart) => cart.id === +id);
  
      if (cartFound !== -1) {
        carts.splice(cartFound, 1);
  
        await fs.promises.writeFile(this.filepath, JSON.stringify(carts, null, 2));
      } else {
        console.log(`Cart with ${id} not found`);
      }
    } catch (error) {
      console.log("Error reading and writing the file from Carts:", error);
    }
  }
  
}

module.exports = CartsManager
