const { Task,User } = require('../models');

module.exports = class TaskControllers {

    static add(req, res, next) {

        console.log(req.myUser,'dari taskkk');
        const { title, category, description } = req.body
        Task.create({
            title, category, description, UserId: req.myUser.id,
        })
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static list(req, res, next) {

        Task.findAll({include:[User]})
            .then((task) => {
                res.status(200).json(task)
            }).catch(next)
    }

    static byOne(req, res, next) {
        Task.findByPk(req.params.id)
            .then((task) => {
                res.status(200).json(task)
            }).catch(next)
    }

    static delete(req, res, next) {

        let id = req.params.id
        let taskDelete = ''

        Task.findByPk(id)
            .then((task) => {
                taskDelete = task.title
                if (task) {
                    return Task.destroy({ where: { id } })
                } else {
                    throw ({ status: 404, message: 'task not found' })
                }
            }).then((data) => {
                res.status(200).json(taskDelete)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.id
        const { title, category, description } = req.body

        Task.findOne({
            where: {
                id, UserId: req.myUser.id
            }
        })
            .then((task) => {
                if (task) {
                    return task.update({
                        title, category, description
                    }, { returning: true })
                }else{
                    throw({status:400,message:'task not found'})
                }
            })
            .then(updated => res.status(200).json(updated))
            .catch(next)
    }

}