import fs from 'fs'


class ProductManager{

    constructor (){
        this.products= []
        this.path='products.json'
    }
    getProducts= ()=>{
        // const productsList = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        const productsList = JSON.parse(fs.readFileSync('./productitos.json', "utf-8"))
        return(productsList);
       
    }

    generateId= ()=>{
        let list= this.getProducts()
        if(list.length === 0) return 1
        return list[list.length-1].id +1
    }

    validateCode= (code)=>{
        let list= this.getProducts()
        const auxCode= list.find(x => x.code == code )
        if(auxCode!=undefined) return "invalid code"
        return code
    }

    addProducts=(title, description, price, thumbnail,code, stock) =>{
        try {
            let list= this.getProducts()
            const id= this.generateId()
            code = this.validateCode(code)
            const product={id, title, description, price, thumbnail, code, stock}
            list.push(product)
            fs.writeFileSync(this.path, JSON.stringify(list, null))
            console.log(`Product with id ${id} has been created`)
            
        } catch (error) {
            console.log(error)
        }
    }

    

    getProductsById= (id)=>{
        
        try {
            const list= this.getProducts()
            const found= list.find(product => product.id == id)

            if(found) return found
            return (`There isn't any product whose id is ${id}`)

        } catch (error) {
            console.log(error)
        }
    }

    updateProduct= (id, key, value)=>{
        
        try {
            let list=  this.getProducts()
            const pIndex= list.findIndex(p => p.id == id)

            if(pIndex != -1){
                list[pIndex][key]= value
                fs.writeFile(this.path, JSON.stringify(list, null, 2)) 
                console.log(`Product with id ${id} has been updated`)
            }else{
                console.log(`There isn't any product whose id is ${id}`)
            }

            
        } catch (error) {
            console.log(error)
        }

    }
    deleteProduct =(id) => {      
        try {
            const PTDelete=  this.getProductsById(id)
            let list= this.getProducts()
            if (!PTDelete) { 
                console.log("id not found")
            }
            list = list.filter(prod => prod.id != PTDelete.id) 
            fs.writeFile(this.path, JSON.stringify(list, null, 2)) 
            console.log(`product with id ${id} has been eliminated`)
        } catch (error) {
            console.log(error)
        }
    }
}
const manager= new ProductManager()
//manager.updateProduct(1, "stock", 7 )
manager.addProducts("azucar", "Endulzante natural", 550, null, "A202", 2)
//manager.deleteProduct(4)
export default ProductManager
