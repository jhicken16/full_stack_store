const bodyParser = require('body-parser')
const session = require('express-session')

const { SESSION_KEY } = require('../config')

module.exports = (app) => {

    app.use(bodyParser.json())

    app.use(
        session({
            secret: SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 *60 * 24, secure: false, sameSite: "none"},
        })
    )
    
    return app
}