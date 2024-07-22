const { renderRegisterForm, userForm, renderloginForm, loginUser } = require('../controller/user/userController')

const router = require ('express').Router()

router.route("/register").get(renderRegisterForm).post(userForm)
router.route("/login").get(renderloginForm).post(loginUser)





module.exports = router