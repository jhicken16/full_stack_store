const routesLoader = require('../routes')
const expressLoader = require('./express')
const swagLoader = require('./swagger')
const passportLoader = require('./passport')

module.exports = (app) => {

    const expressApp = expressLoader(app)

    const passport = passportLoader(expressApp)

    routesLoader(app, passport)

    swagLoader(app)

    app.use((err, req, res, next) => {
        console.log(err)
        const {message, status} = err
        return res.status(status).json({message: message})
    })
}