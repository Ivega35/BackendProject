const express = require ('express')
const app = express()
const router = require ("./src/Routers/index.js")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', router)

app.set('port', 8080)

app.listen(app.get('port'), ()=>{
    console.log("servidor corriendo")
})