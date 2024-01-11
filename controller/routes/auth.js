const express = require('express')
const router = express.Router()

module.exports = (app, passport) => {
    
    app.use('/auth', router)

    router.post('/login', passport.authenticate('local') ,async (request, response, next) => {
        
        const data = request.body
        console.log('login triggered')
        response.status(200).send("login supposedly successful")
    })
}