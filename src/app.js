import express from 'express'
import handlebars from 'express-handlebars'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'
import viewsRouter from './routers/views.router.js'
import rtpRouter from './routers/rtp.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'


const app= express();

//configuración de carpeta public (static)
//app.use(express.static(__dirname+'/public'))
//configuracion handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)
app.use('/realtimeproducts', rtpRouter)


const httpServer= app.listen(8080, ()=>console.log("server up"))

const socketServer = new Server(httpServer) //Handshake --> server side

socketServer.on('connection', socketClient =>{
    socketClient.on('productList', pList =>{
        socketServer.emit(pList)
    })
})