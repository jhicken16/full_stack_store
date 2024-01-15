const httpError = require('http-errors')

const CartModel = require('../../model/CartModel')
const Cart = new CartModel()

module.exports = class CartService {
    async usersCart(customerId) {
        try{
            const response = await Cart.getCart(customerId)
            if(!response){
                throw httpError(404, 'Resource not found')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'Internal server error')
        }
    }

    async productToCart(userId, productId, quantity){
        
        //need to check id matches user, product exists how much is available

        try{
            const response = await Cart.addItemToCart(userId, productId, quantity)
            return response
        }
        catch(err){
            throw httpError(500, 'Internal server error')
        }
    }

    async clearUserCart(userId){
        try{
            const response = await Cart.removeUsersCart(userId)
            return response
        }
        catch(err){
            throw httpError(500, 'Internal server error')
        }
    }
}