const {Router} = require("express")
const productManager = require ('../../dao/managers/products/ProductManager.db')
//const path = require("path");//importo el modulo de fileSystemPath para pasar de una manera más facil la ruta donde voy a almacenar mis productos.
//const filePath = path.join(__dirname, "..", "..", "data", "products.json");//!persistencia en file


//const productManager = new ProductManager(filePath); //!INSTANCIA PARA PERSISTENCIA EN FILE
const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        console.log(products);

        res.send({ status: 200, products });
    } catch (err) {
        res.status(500).send({
            message: "Error ocurrer",
        })
    }
})

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productManager.getById(id)

        if (product) {
            res.status(200).json({ status: 200, product });
        } else {
            res.status(404).json({ status: 404, message: `The Product with ID: ${id} is not found. Please try again with a different ID` });
        }
    } catch (error) {
        console.log("Error retrieving the product", error);
        res.status(500).json({ status:500, message: 'Error retrieving the product' });
    }
});


router.post("/", async (req, res) => {
    const { body } = req;
    try {
      const product = await productManager.addProduct(body);
  
      if (product) {
        const updatedProducts = await productManager.getProducts();
        req.io.emit('updateProducts', updatedProducts); // Aquí está la emisión del evento 'updateProducts'
        res.status(200).json({ status: 200, message: 'Product added successfully', product });

      } else {
        res.status(400).json({ status: 404, message: 'Failed to add the product' });
      }
    } catch (error) {
      res.status(500).json({status: 500, message: 'Error processing the request' });
    }
  });
  
  

router.put('/:pid', async (req, res) => {
    const { body } = req;
    const id = req.params.pid;
    try {
        const product = await productManager.updateProduct(id, body);

        if (!product) {
            res.status(404).json({ error: `The product with the id ${id} is not found, please try with a different ID` });
            return;
        } else {
            res.status(202).json({ status: 200, message: 'Product updated successfully', product });
        }
    } catch (error) {
        console.log("Error updating the product", error);
        res.status(500).json({ error: 'Error updating the product' });
    }
});


router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const product = await productManager.deleteProduct(id);

        if (product === null) {
            return res.status(404).json({ status: 404, message: `The product with the id ${id} is not found, please try with a different ID` });
        } 
        const updatedProducts = await productManager.getProducts();
        req.io.emit('updateProducts', updatedProducts); // Aquí está la emisión del evento 'updateProducts'
        return res.status(200).json({ status: 200, message: `Product with ID: ${id}, successfully deleted` });
    } catch (error) {
        console.log("Error deleting the product", error);
        res.status(500).json({ error: 'Error deleting the product' });
    }
});


  module.exports = router
  