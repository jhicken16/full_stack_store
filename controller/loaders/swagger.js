const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'e-commerce',
            version: '1.0.0',

        },
        
    },
    //An array of were to find the api's; paths values.
    apis: [ './swaggerComponents.yaml', './controller/routes/products.js', './controller/routes/auth.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

console.log(swaggerDocs)

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}