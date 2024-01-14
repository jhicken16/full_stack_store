const httpError = require('http-errors')

const OrderModel = require('../../model/OrderModel')
const Order = new OrderModel()

module.exports = class OrderService{

    async productsToCart(cart, customerId){
            const response = await Order.addCartItemsToOrderItems(cart, customerId)
            return response
        }

    async makeOrder(customerId, shippingAddress){

        try{
            const response = Order.setUpOrder(customerId, shippingAddress)
            if(!response)
            {
                throw httpError(400, 'order failed')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'internal server error')
        }
    }

    async getOrders(){
        
        try{
            const response = await Order.getOrderTable()
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

    async ordersById(id){

        try{
            const response = await Order.ordersById(id)
            if(!response){
                throw httpError(404, 'Resource not found')
            }
            return response
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'internal server error')
        }
    }
}
    
