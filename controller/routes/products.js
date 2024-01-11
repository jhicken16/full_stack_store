const express = require('express')
const router = express.Router()

module.exports = (app) => {
    app.use('/products', router)

    /**
     * @swagger
     * /products:
     *      get:
     *      description: Retrieves all products from the database.
     *      response:
     *          200:
     *              description: Success
     */
    router.get('', (request, response, next) => {
        response.status(420).send('products')
    })
}