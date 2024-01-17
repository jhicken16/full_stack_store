const httpError = require('http-errors')
const db = require('../../model/db')
const bcrypt = require('bcrypt')

const CustomerModel = require('../../model/CustomersModel')

const Customer = new CustomerModel()

module.exports = class AuthService {

    async register(data) {
        
        //check if user already exists.
        const { email } = data

        try{
            const doesEmailExist = await Customer.findByEmail(email)

            if(doesEmailExist){
                throw httpError(409, 'Email already in use.')
            }

            //user doesn't exist create new user.
            return await Customer.createCustomer(data)
        }
        catch(err){
            if(err.status){
                throw err
            }
            throw httpError(500, 'Internal server error')
        }
        
    }

    async login(data) {
        const { email } = data

        try{
            const userRow = await Customer.findByEmail(email)
            console.log(userRow)

            if(!userRow){
                console.log('error')
                throw httpError(401, 'no rows')
            }

            const match = await bcrypt.compare(data.password, userRow[0].password)
            if (!match){
                throw httpError(401, 'email or username is incorrect')
            }
            //everything from row including hash
            return userRow[0]
        }
        catch(err){
            throw httpError(err)
        }
    }
}