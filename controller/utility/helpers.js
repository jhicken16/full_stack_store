const httpError = require('http-errors')

function checkAuthentication(request, response, next){
        if (!request.isAuthenticated()){
            throw httpError(401, 'Not authenticated')
        }
        next()
    }

module.exports = {
    checkAuthentication
}