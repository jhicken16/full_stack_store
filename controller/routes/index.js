const products = require('./products')


module.exports = (app, passport) => {
    products(app)
}