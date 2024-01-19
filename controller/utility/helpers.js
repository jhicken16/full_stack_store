const httpError = require('http-errors')

function checkAuthentication(request, response, next){
        console.log(request.isAuthenticated())
        if (!request.isAuthenticated()){
            next(httpError(401, 'Not authenticated'))
        }
        next()
    }

module.exports = {
    checkAuthentication
}