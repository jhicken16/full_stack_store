const routesLoader = require('../routes')
const expressLoader = require('./express')
const swagLoader = require('./swagger')
const passportLoader = require('./passport')

module.exports = (app) => {

    const expressApp = expressLoader(app)

    const passport = passportLoader(expressApp)

    routesLoader(app)

    swagLoader(app)

    app.use((err, req, res, next) => {
        const {message, status} = err
        return res.status(status).send({message})
    })
}