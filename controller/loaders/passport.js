const passport = require('passport-local')

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
    
    return passport
}