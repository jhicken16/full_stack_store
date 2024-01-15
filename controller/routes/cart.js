const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')

const CartService = require('../services/CartService')
const Cart = new CartService()

//temporarily import orderservice
const OrderService = require('../services/OrderService')
const Order = new OrderService()

const { checkAuthentication } = require('../utility/helpers')

module.exports = (app) => {
    app.use('/cart', router)


    /**
     * @swagger
     * /cart:
     *      get:
     *          description: Gets users cart from database. Requires a valid session cookie from login.
     *          tags:
     *           - cart
     *          responses:
     *              200:
     *                  description: Returns an array of objects to user.
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/cart'
     *              401:
     *                  description: Not authenticated. need to log in
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: Not authenticated
     *              404:
     *                  description: resource not found most likely category does not exist
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: resource not found
     *      
     *      
     */
    router.get('', checkAuthentication, async (request, response, next) => {
        console.log('cart called')

        const { id } = request.user
        console.log(id)
        try{
            const usersCart = await Cart.usersCart(id)
            response.status(200).send(usersCart)
        }
        catch(err) {
            next(err)
        }
        
    })

    /**
     * @swagger
     * /cart:
     *      put:
     *          description: Adds new product to users cart
     *          tags:
     *           - cart
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              productId:
     *                                  type: integer
     *                                  example: 4
     *                              quantity:
     *                                  type: integer
     *                                  example: 4
     *          responses:
     *              200:
     *                  description: returns empty object if successful     
     *              401:
     *                  description: Not authenticated. need to log in
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: Not authenticated
     *              422:
     *                  description: invalid characters or body parameters not met correctly
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: invalid body
     */
    router.put('', [
        checkAuthentication,
        body('productId').exists().blacklist('<>/|{}();:?@#!').isInt(),
        body('quantity').exists().blacklist('<>/|{}();:?@#!').isInt()
    ], (request, response, next) => {

        const valid = validationResult(request)

        if(!valid.isEmpty()){
            return response.status(422).send('invalid body')
        }
   
        const { id } = request.user
        const { productId, quantity } = request.body

        try{
            const productAdded = Cart.productToCart(id, productId, quantity)
             response.status(200).send(productAdded)
        }
        catch(err){
            next(err)
        }
       
    })


    /**
     * @swagger
     * /cart:
     *      post:
     *          description: Takes users cart and create order updating order table and order_items table 
     *          tags:
     *          - cart
     *          requestBody: 
     *              required: true
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              order_info:
     *                                  type: object
     *                                  properties: 
     *                                      shipping:
     *                                          type: string
     *                                          example: "4, road name, city, postcode"
     *          parameters:
     *           - in: cookie 
     *             name: id
     *             schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: string
     *                      example: "bce8e3j3485gvnktb 8bhf57"
     *          responses:
     *              200:
     *                  description: success, will receive rows from ordered_items table of product that have just been ordered.
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  type: object
     *                                  properties: 
     *                                      order_id:
     *                                          type: integer
     *                                          description: auto generated id
     *                                          example: 11
     *                                      product_id:
     *                                          type: integer
     *                                          description: auto generated id
     *                                          example: 11
     *                                      quantity:
     *                                          type: integer
     *                                          description:
     *                                          example: 11
     *              401:
     *                  description: unauthorized in to login via login route
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: Not authenticated
     *              
     *                      
     */
    router.post('', checkAuthentication, async (request, response, next) => {

        const { id } = request.user
        const { order_info } = request.body
        console.log(order_info)

        try{

            const cart = await Cart.usersCart(id)

            //set up order
            const order = await Order.makeOrder(id, order_info.shipping)
            console.log(order)

            const addProductToOrderItems = await Order.productsToCart(cart, order.id)
            
            //need to remove every think related to user from cart once order has been made.
            await Cart.clearUserCart(id)

            response.status(420).send(addProductToOrderItems)
        }
        catch(err){
            next(err)
        }

    })
}