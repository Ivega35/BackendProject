import { Router } from "express";
import ProductManager from "../management/productManager.js";

const router = Router()
const manager= new ProductManager()

// GET /api/products --> To get all of products. 
//the number of products to return could be limitated by query(limit)
router.get('/',(req, res)=>{

    const limit = req.query.limit
    let list= manager.getProducts()
    if(limit) {
        list = list.slice(0, limit)
    } 
    res.send(list)
} )
//GET /api/products/:pid --> To get a product in particular (pid)
router.get('/:pid', (req, res)=>{
    const pid= req.params.pid
    const identified= manager.getProductsById(+pid)
    res.send(identified)
})
// POST /api/products --> To create any product by body
router.post('/', (req, res)=>{
    const data = req.body
    if(!data.title || !data.description || !data.price || !data.stock|| !data.category){
        res.status(206).send("incomplete fields")
   }else{
        manager.addProducts(data)
        res.status(201).send("Product created")
    }
})
//PUT /api/products/:pid --> To update any product by body
router.put('/:pid', (req, res)=>{
    const pid = req.params.pid
    const data= req.body
    manager.updateProduct(pid, data)
    res.status(202).send("Product updated")
})
//DELETE /api/products/:pid --> To delete any product
router.delete('/:pid', (req, res)=>{
    const pid= req.params.pid
    manager.deleteProduct(pid)
    res.send("Product deleted")
})
export default router