const router = require('express').Router()

const carts = require ('../Clases/CartManager.js')

router.put('/:cid/add/:pid', async(req, res, next) => {
    let { cid,pid } = req.params
    try {
        let cart = await carts.addProductToCart(Number(cid),Number(pid))
        if (!cart) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(cart)
    } catch(error) {
        return next()
    }
})

router.put('/:cid/delete/:pid', async(req, res, next) => {
    let { cid,pid } = req.params
    try {
        let cart = await carts.deleteProductFromCart(Number(cid),Number(pid))
        if (!cart) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(cart)
    } catch(error) {
        return next()
    }
})

module.exports = router