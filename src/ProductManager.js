const fs = require('fs')
const express= require('express')
const app= express()

class ProductManager{
    
    constructor(path){

        this.products= [];
        this.path= path;
        this.init();
        this.id= 1;
        this.codes= [];
        this.recoverData()
    
        init = () =>{
            try{
                const existFile= fs.existsSync(this.path);
                if(existFile) return;
                fs.writeFileSync(this.path, JSON.stringify([]))
            } catch(error){
                console.log("error")
            }
        }

        recoverData = () => { 
            try {
                let products = this.getProducts()
                this.products = products
                this.id = products[this.products.length-1].id+1
                this.codes = products.map(prod => prod.code)
                return null
            } catch (err) {
                console.log(err.message)
                return { error: err.message }
            }
        }
    
        getProducts = (limit) =>{
            try {
                let products =  fs.readFileSync(this.path)
                products = JSON.parse(products)
                if (products) {
                    if (limit) {
                        products = products.slice(0,limit) 
                    }
                    return products
                } else {
                    let message = 'no products yet'
                    console.log(message)
                    return null
                }
            }catch (error) {
                console.log("error")
            }
        }

        addProduct = async(title, description, price, code, stock, thumbnail) => {
    
            if (!title || !description || !price || !code || !stock || !thumbnail){
                let message = "campos incompletos"
                return {message};
            }
            try {
                if (!this.codes.includes(code)) { 
                    let product = {title,description,price,code,stock,thumbnail}
                    product.id = this.id 
                    this.id++ 
                    this.codes.push(code) 
                    this.products.push(product) 
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2)) 
                    let message = 'producto creado'
                    return { message }
                }
                let message = 'codigo invalido'
                return { message }
            } catch(err) {
                console.log(err.message)
                return { error: err.message }
            }
        }

        getProductsById= (id) =>{
            const productFound = this.products.find(prod => prod.code === id )

            if(productFound){
                return productFound;
            }else{
                console.log("El producto no existe.");
            }
        }

        updateProduct = async (id,data) => { 
            
            try {
                const selected = await this.getProductById(id)
                if (!selected) { 
                    let message = 'ID no encontrado'
                    console.log(message)
                    return null
                }
                if (!data) { 
                    let message = 'must enter almost one key'
                    return { message }
                }
                if (!data.id) { 
                    for (let prop in data) {
                        selected[prop] = data[prop]
                    }
                    this.products.map(prod => prod.id===id ? selected : prod )
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2)) 
                    let message = 'Producto actualizado'
                    return { message }
                } else { 
                    let message = 'No se puede modificar'
                    return { message }
                }
            } catch(err) {
                console.log(err.message)
                return { error: err.message }
            }
        }
    

        deleteProduct = async (id) => { 
            try {
               
                const selected = await this.getProductById(id) 
                if (!selected) { 
                    let message = 'ID no encontrado'
                    console.log(message)
                    return null
                }
                this.products = this.products.filter(prod => prod.id !== id) 
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2)) 
                let message = 'Producto eliminado'
                return { message }
            } catch(err) {
                console.log(err.message)
                return { error: err.message }
            }        
        }
    }
}
const electronicProducts = new ProductManager("./electronic-products.json")

module.exports = electronicProducts