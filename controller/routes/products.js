const express = require('express')
const router = express.Router()

module.exports = (app) => {
    app.use('/products', router)

    /**
     * @swagger
     * /products:
     *      get:
     *          description: Retrieves all products from the database.
     *          response:
     *              200:
     *                  description: Success
     */
    router.get('', async (request, response, next) => {
         //Really you would want more option to take out of the query and apply to the database such as limit and last product or some way for organizing content.
         const { category } = request.query

         try{
             const products = await ProductInteraction.list(category)
             response.status(200).send(products)
         }
         catch(err){
             next(err)
         }
    })
}