const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')

const AuthService = require('../services/AuthService')
const Authentication = new AuthService()

module.exports = (app, passport) => {
    
    app.use('/auth', router)

    /**
     * @swagger
     * /auth/register:
     *      post:
     *          tags:
     *           - 'Authentication'
     *          summary: Creates account for user
     *          description: excepts email, password and name, using this to create account for the user
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
     *                              name:
     *                                  type: string
     *          responses:
     *              "200":
     *                  description: return ok if successful, account has been created
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: string
     *                              example: "ok" 
     *              "409":
     *                  description: Email is already in use
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: string
     *                              example: 'Email already in use.' 
     *              "422":
     *                  description: Input did not pass validation process
     *                  content: 
     *                      application/json:
     *                          schema:
     *                              type: string
     *                              example: "Invalid input on [email || password || name]"              
     */
    router.post('/register',
    [
        body('email').notEmpty().isString().isEmail().blacklist('<>,/?!`"{(;:'),
        body('name').notEmpty().isString().blacklist('<>,./?!`"{(;:'),
        body('password').notEmpty().isString()
    ] 
    ,async (request, response, next) => {
        const result = validationResult(request)
        if ( !result.isEmpty()){
            console.log(result)
            return response.status(422).json({message: `Invalid input on ${result.path}`})
        }
        const data = request.body
        try {
            const res = await Authentication.register(data)
            console.log(res)
            response.status(200).send({message: 'ok'})
        } catch(err){
            next(err)
        } 
    })

    /**
     * @swagger
     * /auth/login:
     *      post:
     *          tags:
     *           - 'Authentication'
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
        response.status(200).send({message: "login supposedly successful"})
    })

/**
 * @swagger
 * /google:
 *  get:
 *     tags:
 *      - 'Authentication'
 *     summary: 'Authenticate with Google'
 *     description: 'This endpoint initiates the Google authentication process.'
 *     operationId: 'authenticateGoogle'
 *     responses:
 *       '302':
 *         description: 'Redirect to Google for authentication.'
 *     security:
 *       - googleAuth:
 *           - 'email'
 *           - 'profile'
 * securityDefinitions:
 *   googleAuth:
 *     type: 'oauth2'
 *     authorizationUrl: 'https://accounts.google.com/o/oauth2/auth'
 *     flow: 'implicit'
 *     scopes:
 *       "email": "Access to user's email"
 *       "profile": "Access to user's profile information"
 */
    router.get('/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    }))

/**
 * @swagger
 * /google/redirect:
 *   get:
 *     tags:
 *       - 'Authentication'
 *     summary: 'Google Authentication Redirect'
 *     description: 'This endpoint handles the redirect from Google after authentication.'
 *     operationId: 'googleRedirect'
 *     responses:
 *       '302':
 *         description: 'Redirect to the client application.'
 *     security:
 *       - googleAuth:
 *           - 'email'
 *           - 'profile'
 */
    router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
        res.redirect('http://localhost:3000')
    })
}