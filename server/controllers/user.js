const { User } = require('../models');
const { hash, cheking } = require('../helpers/bcrypt')
const { generate, decode } = require('../helpers/jwt')


module.exports = class UserControllers {

    static login(req, res, next) {
        const { email, password } = req.body
        // console.log(password);
        User.findOne({ where: { email } })
            .then((data) => {
                if (data) {
                    if (cheking(password, data.password)) {
                        const token = generate({
                            id: data.id,
                            email: data.email
                        })
                        res.status(200).json({ token: token })
                    } else {
                        throw { status: 404, message: 'invalid email or password' }
                    }
                } else {
                    throw { status: 404, message: 'invalid email or password' }
                }
            }).catch(err => {
                // console.log(err, 'dari loginnnnnnnnnnn');
                next(err)
            })

    }

    static register(req, res, next) {
        console.log(req.body);
        const { email, password } = req.body

        User.findOne({ where: { email } })

            .then(data => {

                if (data) {
                    throw ({ status: 400, message: 'Email already registered' })
                } else {
                    return User.create({ email, password })
                }
            })
            .then((data) => {
                const token = generate({
                    id: data.id,
                    email: data.email
                })
                res.status(201).json({token})
            }).catch(next)
    }
    static  googleLogin(req, res, next){
        console.log(req.payload,'cekkk')
        User
            .findOne({
                where: {
                    email: req.payload.email
                }
            })
            .then(user => {
                if(!user){
                    return User.create({
                        email: req.payload.email,
                        password: process.env.PASSWORD_DEFAULT
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                // console.log(user.id)
                let token = generate(payload)
                res.status(200).json({ token: token})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }
}