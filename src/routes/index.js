const {Router} = require("express")
const ProductRouter = require('./api/products.router')
const CartsRouter = require("./api/carts.router")
const HomeRouter = require("./home.router")
const RealTimeProducts = require('./realTimeProducts')

const router = Router()

router.use('/', HomeRouter)
router.use('/realtimeproducts', RealTimeProducts)
router.use('/api/products', ProductRouter)
router.use('/api/carts', CartsRouter)


module.exports = {
    api: router
 }