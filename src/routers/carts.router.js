import { Router } from "express";
import cartManager from '../management/cartManager.js'

const router= Router()
const manager= new cartManager()

//POST /api/carts --> create cart
router.post('/', (req, res)=>{
    manager.createCart()
    res.status(201).send("New cart created")
})
//GET /api/carts/:cid ---> To list products in the cart whose id it's equal to cid
router.get('/:cid', (req,res)=>{
    const cid= req.params.cid
    const list = manager.getProductsFromACart(cid)
    if(list == false){
        res.send(`The cart ${cid} doesn't exist`)
    }else{
        res.send(list)
    }
})
//POST /api/carts/:cid/products/:pid --> To add a product(pid) to a specific cart(cid)
router.post('/:cid/products/:pid', (req, res)=>{
    const cid= req.params.cid
    const pid= req.params.pid
    manager.addProductToCart(cid,pid)
    res.status(201).send(`producto ${pid} añadido al carrito ${cid}`)

})
export default router