const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const httpError = require('http-errors')

const ProductServices = require('../services/ProductService')
const ProductInteraction = new ProductServices()

module.exports = (app) => {
    app.use('/products', router)
   

    /**
     * @swagger
     * /products:
     *      get:
     *          description: Retrieves all products from the database.
     *          requestBody:
     *              required: true
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties: 
     *                              category:
     *                                  type: string
     *                                  example: "cloths"
     *          responses:
     *              200:
     *                  description: Returns array of objects
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/products'
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
     *              422:
     *                  description: error occurs when dangerous characters are in category
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: "Invalid input on category"
     */
    router.get('', 
    [
        body('category').isString().custom((value)=> {
            if (value.includes("'") || value.includes("%") || value.includes("_")) {
                throw new Error('Invalid characters in category');
            }
            return true;
        })
    ],
    async (request, response, next) => {
        
        const valid = validationResult(request)

         //Really you would want more option to take out of the query and apply to the database such as limit and last product or some way for organizing content.
         const { category } = request.body

         try{
            if( !valid.isEmpty() ){
                throw httpError(422, `Invalid input on ${valid.array()[0].path}`)
            }
             const products = await ProductInteraction.list(category)
             response.status(200).send(products)
         }
         catch(err){
            console.log(err)
             next(err)
         }
    })
}