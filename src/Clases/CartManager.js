const fs = require ('fs')

class CartManager{
    
    constructor(path){
        this.path = path
        this.carts = []
        this.id = 1
        this.init()
        this.recoverData()
    }

    init = () => {
        try {
            let file = fs.existsSync(this.path,'utf-8')
            if (!file) {
                fs.writeFileSync(this.path,JSON.stringify([]))
            }
            return null
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    recoverData = () => { 
        try {
            let carts = this.getCarts()
            if (carts.length>0) {
                this.carts = carts
                this.id = carts[this.carts.length-1].id+1
            }
            return null
        } catch (err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    newCart = async () => {
        try {
            let cart = {
                id: this.id,
                products: []
            }
            this.id++
            this.carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'cart created'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    addProductToCart = async (cId,pId) => {
        try {
            let one = await this.getCartById(cId)
            if (!one) {
                let message = 'cart not found'
                return { message }
            }
            let index = one.products.map(prod=>prod.id).indexOf(pId)
            if (index>=0) {
                one.products[index].quantity++
            } else {
                one.products.push({
                    id: pId,
                    quantity: 1
                })
            }
            this.carts.map(cart => cart.id===cId ? one : cart )
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'product added'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }

    deleteProductFromCart = async (cId,pId) => {
        try {
            let one = await this.getCartById(cId)
            if (!one) {
                let message = 'cart not found'
                return { message }
            }
            let index = one.products.map(prod=>prod.id).indexOf(pId)
            if (index<0) {
                let message = 'product not found'
                return { message }
            }
            one.products[index].quantity--
            this.carts.map(cart => cart.id===cId ? one : cart )
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
            let message = 'product deleted'
            return { message }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }
    }
    
    getCarts = () => { 
        try {
            let carts =  fs.readFileSync(this.path)
            carts = JSON.parse(carts)
            if (carts) {
                return carts
            } else {
                let message = 'no carts yet'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.message)
            return { error: err.message }
        }
    }
    
    getCartById = async (id) => { 
        try {
            let one = this.carts.find(cart => cart.id === id)
            if (one) {
                return one
            } else {
                let message = 'id invalido'
                console.log(message)
                return null
            }
        } catch(err) {
            console.log(err.stack)
            return { error: err.message }
        }           
    }



}

let carts = new CartManager('./src/data/carts.json')

module.exports = carts