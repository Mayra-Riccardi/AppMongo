// routes/mainRouter.js
const express = require('express');
const router = express.Router();
const path = require('path')
//const filePath = path.join(__dirname, "..", "data", "products.json");//!se usa solo para persistencia en file

const productManager = require('../dao/managers/products/ProductManager.db')
//const productManager = new ProductManager(filePath)//!se usa solo para persistencia en file

router.get('/', async (req, res) => {
  const products = await productManager.getProducts()
  res.render('home', {
   title: 'Vista de productos Home',
   products
   }) // Renderiza
});


module.exports = router;
