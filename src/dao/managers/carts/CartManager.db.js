const cartModel = require('../../models/CartModel')

class CartManager {

    async getCartById(id) {
        const cart = await cartModel.findOne({ _id: id })

        return cart;
    }


    async addcart() {
        const cart = await cartModel.create({ products: [] })

        return cart
    }

    async addProductToCart(cid, pid) {

        //buscar el carrito en el que quiero agregar el producto
        const cart = await cartModel.findOne({ _id: cid });
        //si lo encuentro, buscar el producto
        if (cart._id != '') {
            //buscar si el producto ya existe
            const existing = cart.products.find((prod) => prod.product == pid);
            if (existing) {
                cart.products.forEach((prod, index) => {
                    if (prod.product == pid) {
                        cart.products[index] = { ...prod, product: pid, quantity: (prod.quantity + 1) };
                    }
                });
            } else {
                cart.products = [...cart.products, { product: pid, quantity: 1 }]
            }
        }
        const cartUpdated = await cartModel.updateOne({ _id: cid }, { $set: { products: cart.products } });


        return cartUpdated
    }
}

module.exports = new CartManager();