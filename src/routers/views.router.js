import { Router } from "express";
import ProductManager from "../management/productManager.js";

const router = Router()
const manager = new ProductManager()

const pList = manager.getProducts()

router.get('/', (req, res)=>{
    res.render('home', {pList})
})

export default router