const cartModel = require('../../models/CartModel');
const productModel = require('../../models/ProductModel')

class CartManager {
    async getCartById(id) {
        try {
            const cart = await cartModel.findOne({ _id: id });
            return cart;
        } catch (error) {
            console.error('Error getting cart by ID:', error);
            throw error;
        }
    }

    async addCart() {
        try {
            const cart = await cartModel.create({ products: [] });
            return cart;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }
    async addProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findOne({ _id: cid });
    
            if (!cart) {
                return { cartNotFound: true };
            }
    
            const existing = cart.products.find((prod) => prod.product == pid);
    
            if (existing) {
                cart.products.forEach((prod, index) => {
                    if (prod.product == pid) {
                        cart.products[index] = { ...prod, product: pid, quantity: (prod.quantity + 1) };
                    }
                });
            } else {
                // Verificar si el producto existe en la base de datos antes de agregarlo al carrito
                const product = await productModel.findOne({ _id: pid });
    
                if (!product) {
                    return { productNotFound: true };
                }
    
                cart.products = [...cart.products, { product: pid, quantity: 1 }];
            }
    
            const cartUpdated = await cartModel.updateOne({ _id: cid }, { $set: { products: cart.products } });
    
            return { cartUpdated };
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    }
    
      
}

module.exports = new CartManager();
