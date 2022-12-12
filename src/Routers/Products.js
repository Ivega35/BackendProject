const router = require ('express').Router()

const products = require ("../Clases/ProductManager.js")

router.get('/', async(req,res, next) =>{
    let limit = req.query?.limit
    try {
        let p = await products.getProducts(limit)
        if(!p){
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(p)
    } catch (error) {
        return next()
    }
})

router.get('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let p = await products.getProductById(Number(id))
        if (!p) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(p)
    } catch(error) {
        return next()
    }
})

router.post('', async(req, res, next) => {
    let { title,description,price,code,stock,thumbnail } = req.body
    try {
        let prod = await products.addProduct({ title,description,price,code,stock,thumbnail })
        return res.status(200).send(prod)
    } catch(error) {
        return next()
    }
})

router.put('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.updateProduct(Number(id),req.body)
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return next()
    }
})

router.delete('/:id', async(req, res, next) => {
    let { id } = req.params
    try {
        let prod = await products.deleteProduct(Number(id))
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod)
    } catch(error) {
        return next(error)
    }
})

module.exports = router