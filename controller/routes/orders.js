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
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: Not authorized
     *              404:
     *                  description: resources not found user does not have any orders
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: resources not found
     *              
     *         
     */
    router.get('/:userId', 
    [
        checkAuthentication,
        param("userId").exists().toInt().blacklist('<>,./?!`"{(;:')
    ], 
    async (request, response, next) => {

        const result = validationResult(request)
        if(!result.isEmpty()){
            return response.status(422).send(`Invalid param`)
        }

        const { userId } = request.params
        console.log(userId)

        try{
            const usersOrders = await Orders.ordersById(userId)
            response.status(200).send(usersOrders)
        }
        catch(err){
            next(err)
        }
    })
}