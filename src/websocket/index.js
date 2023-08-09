const ProductManager = require('../dao/managers/products/ProductManager.fs')
const productManager = new ProductManager('productos.json')

function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })


  socket.on('addProduct', async (newProduct) => {
    // Agregar el nuevo producto al archivo JSON
    console.log('Evento addProduct recibido:', newProduct);
    const addedProduct = await productManager.addProduct(newProduct);
    console.log('Producto agregado:', addedProduct);


    if (addedProduct) {
      // Obtener la lista actualizada de productos
      const updatedProducts = await productManager.getProductos();
      console.log('List updated:', updatedProducts);


      // Emitir la lista de productos actualizada a todos los clientes conectados
      io.emit('updateProducts', updatedProducts);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    // Eliminar el producto del archivo JSON
    console.log('Event deleteProduct:', productId);
    const deletedProduct = await productManager.deleteProduct(productId);

    if (deletedProduct) {
      // Obtener la lista actualizada de productos
      const updatedProducts = await productManager.getProductos();

      // Emitir la lista de productos actualizada a todos los clientes conectados
      io.emit('updateProducts', updatedProducts);
    }
  });

}

module.exports = socketManager