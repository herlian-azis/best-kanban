const router = require('express').Router()
const user = require('../controllers/user')
const task = require('../controllers/task')

const {authentication,authorization} = require('../middlewares/auth')
const googleVerify = require('../middlewares/googleVerify')


router.post('/login',user.login)
router.post('/register',user.register)

router.post('/google',googleVerify,user.googleLogin)

router.use(authentication)
router.get('/tasks',task.list)
router.post('/tasks',task.add)
router.get('/tasks/:id',authorization,task.byOne)
router.put('/tasks/:id',authorization,task.update)
router.delete('/tasks/:id',authorization,task.delete)

module.exports = router