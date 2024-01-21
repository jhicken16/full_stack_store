const express = require('express')
const router = express.Router()

const { param, validationResult } = require('express-validator')

const OrderService = require('../services/OrderService')
const Orders = new OrderService()

const { checkAuthentication } = require('../utility/helpers')

module.exports = (app) => {
    
    app.use('/orders', router)
    /**
     * @swagger
     * /orders/{userId}:
     *      get:
     *          description: retrieves all orders placed by user Uses localAuth which you get from login sending cookie back and forth.
     *          tags:
     *          - orders
     *          parameters:
     *            - in: path
     *              name: userId
     *              schema:
     *                  type: integer
     *              required: true
     *              description: numeric id of user
     *          responses:
     *              200:
     *                  description: success
     *                  content:
     *                      application/json: 
     *                          schema:
     *                              $ref: '#/components/schemas/orders'
     *              401:
     *                  description: not authorized
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: Not authorized
     *              404:
     *                  description: resources not found user does not have any orders
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: resources not found
     *              
     *         
     */
    router.get('', 
    [
        checkAuthentication,
    ], 
    async (request, response, next) => {

        const { id } = request.user
        console.log('id', id)

        try{
            const usersOrders = await Orders.ordersById(id)
            response.status(200).send({orders: usersOrders})
        }
        catch(err){
            next(err)
        }
    })
}