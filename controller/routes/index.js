const products = require('./products')
const auth = require('./auth')
const orders = require('./orders')

module.exports = (app, passport) => {
    auth(app, passport)
    products(app)
    orders(app)

}