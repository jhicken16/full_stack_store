const products = require('./products')
const auth = require('./auth')

module.exports = (app, passport) => {
    auth(app, passport)
    products(app)
}