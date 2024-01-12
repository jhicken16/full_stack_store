const db = require('./db')

module.exports = class ProductModel {

    //get all product with category == category
    /**
     * 
     * @param {String} category
     * @return {[Objects]} 
     */
    async getProducts(category){

        const statement =  `SELECT *
                            FROM products
                            WHERE category = $1`
        const values = [category]

        try {
            const response = await db.query(statement, values)
            console.log(response)
            if(response.rows.length === 0){
                return null
            }
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getProductById(productId){
        
        const statement =  `SELECT *
                            FROM products
                            WHERE id = $1`
        const values = [productId]

        try{
            const response = await db.query(statement, values)
            if(response.rows.length === 0){
                return null
            }
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }

}