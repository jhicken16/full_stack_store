const routes = require('../routes')

const swag = require('./swagger')

module.exports = (app) => {
    routes(app)
    swag(app)
}