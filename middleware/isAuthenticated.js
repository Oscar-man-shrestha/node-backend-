const jwt = require("jsonwebtoken")
const {promisify} = require ('util');
const { users } = require("../model");

exports.isauthenticated = async(req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token || token == null || token == undefined) {
    //step 1 : check token exsit or not {completed}
    return res.redirect("/login");
  }
  //yeti token ayo vane
  const verifiedResult = await promisify (jwt.verify)(token,process.env.secretKey,)
const user = await users.findByPk(verifiedResult.id)
if(!user){
    return res.redirect("/login")
}
req.userId = verifiedResult.id
 next()
}
 