require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        //Getting the request
        const headerToken = req.get('Authorization')
        //If not Authorized the log error and send 401(unauthorized)
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token
        //assigning token to a decoded string
        try {
            token = jwt.verify(headerToken, SECRET)
        } 
        //catch error throw status 500 (Internal server)
        catch (err) {
            err.statusCode = 500
            throw err
        }
        //if token not verified send error
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}