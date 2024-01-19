const db = require('./db')

module.exports = class CartModel {
    async getCart(customerId){
        
        try{
            const response = await db.query('SELECT cart.quanity, products.name, products.price FROM cart JOIN products ON cart.fk_product_id = products.id Where customer_id = $1', [customerId])
            if(response.rows.length === 0){
                return null
            }
            return response.rows
        }
        catch(err){
            throw new Error(err)
        }
    }

    async addItemToCart(userId, productId, quantity){

        const statement =   `INSERT INTO cart
                            (customer_id, quanity, fk_product_id)
                            VALUES ($1, $2, $3)`
        const values = [userId, quantity, productId]

        try{
            const response = await db.query(statement, values)
            return response.command
        }
        catch(err){
            throw new Error(err)
        }
    }

    async removeUsersCart(userId){
        const statement =   `DELETE FROM cart 
                            WHERE customer_id = $1`
        const values = [userId]

        try{
            const response = await db.query(statement, values)
            return response.command
        }
        catch(err){
            throw new Error(err)
        }
    }
}