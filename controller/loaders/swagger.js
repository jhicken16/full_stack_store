const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'e-commerce',
            version: '1.0.0',

        },
        
    },
    //An array of were to find the api's; paths values.
    apis: ['./routes/products.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}