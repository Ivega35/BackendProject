import express from 'express'
import ProductManager from "./management/productManager.js"

const app= express();
const manager= new ProductManager();


app.get('/products',(req, res)=>{

    const limit = req.query.limit
    let list= manager.getProducts()
    if(limit) {
        list = list.slice(0, limit)
    } 
    res.send(list)
} )

app.get('/products/:pid', (req, res)=>{
    const pid= req.params.pid
    const identified= manager.getProductsById(+pid)
    res.send(identified)
})

app.listen(8080, ()=>console.log("server up"))

