const httpError = require('http-errors')

const ProductModel = require('../../model/ProductModel')
const Products = new ProductModel()

module.exports = class ProductServices {
    
    async list(category){

        try{
            const response = await Products.getProducts(category)
            if(!response){
                throw httpError(404, 'Recourses not found')
            }
            console.log(response)
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'Internal Server Error')
        }
    }

    async product(productId) {
        try{
            const response = await Products.getProductById(productId)
            if(!response){
                throw httpError(404, 'Recourse not found')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'Internal Server Error')
        }
    }
}