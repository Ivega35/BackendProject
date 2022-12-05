const express = require("express")

const app= express()
const products = require('./src/products')

app.use(express.json()) 
app.use(express.urlencoded({extended:true})) 

app.get('/products', async(req, res) => {
    let limit = req.query?.limit
    try {
        let prods = await products.getProducts(limit) 
        if (!prods) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prods) 
    } catch(error) {
        return res.status(500).send(error.message) 
    }
})

app.get('/products/:id', async(req, res) => { 
    let { id } = req.params 
    try {
        let selected = await products.getProductById(Number(id)) 
        if (!selected) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(selected) 
    } catch(error) {
        return res.status(500).send(error.message) 
    }
})
app.post('/products', async(req, res) => { 
    let { title,description,price,code,stock,thumbnail } = req.body 
    try {
        let prod = await products.addProduct({ title,description,price,code,stock,thumbnail }) 
        return res.status(200).send(prod) 
    } catch(error) {
        return res.status(500).send(error.message) 
    }
})

app.put('/products/:id', async(req, res) => { 
    let { id } = req.params 
    try {
        let prod = await products.updateProduct(Number(id),req.body) 
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod) 
    } catch(error) {
        return res.status(500).send(error.message) 
    }
})
app.delete('/products/:id', async(req, res) => { 
    let { id } = req.params 
    try {
        let prod = await products.deleteProduct(Number(id)) 
        if (!prod) {
            return res.status(404).send({error: 'not found'})
        }
        return res.status(200).send(prod) 
    } catch(error) {
        return res.status(500).send(error.message) 
    }
}) 

app.set('port',8080)

app.listen( 
    app.get('port'),
    () => {console.log('SERVER READY ON PORT: '+app.get('port'))}
)