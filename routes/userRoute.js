const { renderRegisterForm, userForm, renderloginForm, loginUser, logOutUser, forgetPassword, handleForgetPassword } = require('../controller/user/userController')

const router = require ('express').Router()

router.route("/register").get(renderRegisterForm).post(userForm)
router.route("/login").get(renderloginForm).post(loginUser)
router.route("/logout").get(logOutUser)
router.route("/forgetPassword").get(forgetPassword).post(handleForgetPassword)



module.exports = router