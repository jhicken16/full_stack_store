const express = require('express')
const router = express.Router()

module.exports = (app, passport) => {
    
    app.use('/auth', router)

    /**
     * @swagger
     * /auth/login:
     *      post:
     *          summary: logs in user
     *          description: This is a path that logs the user in and stores related user information in sessions object
     *          requestBody:
     *              required: true
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              email:
     *                                  type: string
     *                              password:
     *                                  type: string
     *          responses:
     *              "200":
     *                  description: return ok if successful
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  encoded: 
     *                                      type: string
     *              "401":
     *                  description: incorrect username or password you are not authorized.
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: string 
     *              "404":
     *                  description: user was not found
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: string                   
     */
    router.post('/login', passport.authenticate('local') ,async (request, response, next) => {
        
        const data = request.body
        console.log('login triggered')
        response.status(200).send("login supposedly successful")
    })
}