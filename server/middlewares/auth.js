const { Task } = require('../models')
const { generate, decode } = require('../helpers/jwt')


module.exports = class Auth {
    static authentication(req, res, next) {
        // console.log(req.headers.token);
        try {
            if (req.headers.token) {
                req.myUser = decode(req.headers.token)
                next()
            } else {
                throw ({ status: 400, message: 'invalid token' })
            }
        } catch (error) {
            next(error)
        }
    }
    
    static authorization(req, res, next) {
        console.log(req.myUser,'dari authhhhhhhh');
        Task.findOne({
            where: {
                id: req.params.id,
                UserId: req.myUser.id
            }
        })
            .then((found) => {
                if (found) {
                    next()
                } else {
                    throw ({ status: 403, message: 'Not Access' })
                }
            }).catch(next)
    }
}
