const router = require("express").Router()
const products = require('./Products')
const carts = require('./Carts')

router.use('/products', products)
router.use('/carts', carts)

module.exports = router