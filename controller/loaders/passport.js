const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth2')

const { G } = require('../config')

const AuthService = require('../services/AuthService')
const Authentication = new AuthService()

module.exports = (app) => {

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true 
        },
        async function (req, username, password, done){
            console.log('local strategy triggered')
            const data = req.body
            try{
                const user = await Authentication.login(data)
                done(null, user)
            }
            catch(err){
                return done(err)
            }
        }
    ))

    //This needs refactoring by quit a bit.
    passport.use(
        new GoogleStrategy({
            callbackURL: 'http://localhost:4000/auth/google/redirect',
            clientID: G.CLIENTID,
            clientSecret: G.CLIENTSECRET
        }, async (accessToken, refreshToken, profile, done) => {
            const data = {
                email: profile.email,
                name: profile.displayName,
                //this stinks need to refactor database save the gooogle id to check user is how they say they are. do I want a new table for google 0ath grants
                password: profile.given_name + profile.id + profile.family_name
            }
            try{
                const register = await Authentication.register(data)
                done(null, register)
            }
            catch(err){
                console.log(err)
                if(err.status === 409){
                    try{
                        const login = await Authentication.login({email: data.email, password: data.password})
                        done(null, login)
                    }
                    catch(err){
                        done(err)
                    }
                }
                else{
                    done(err)
                }  
            }
        })
    )
    
    return passport
}