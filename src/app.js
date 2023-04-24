import express from 'express'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'

const app= express();

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(8080, ()=>console.log("server up"))

