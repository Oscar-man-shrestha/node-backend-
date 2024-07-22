const { users } = require("../../model");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken")
exports.renderRegisterForm = (req, res) => {
  res.render("register");
};
exports.userForm = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.send("provide Full Information");
  }
  const exsit = await users.findAll({
    //provide gareko ko email pailai xa ki nai check gareko
    where: {
      email: email,
    },
  });
  if (exsit.length > 0) {
    //checking if the array has some data or not?
    return res.send("already registered with that email");
  }

  await users.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 12),
  });
  res.redirect("/login");
};
exports.renderloginForm = (req, res) => {
  res.render("login");
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("Provide Full Information");
  }
  //check whether the email and password exsit or not
  const user = await users.findAll({
    where: {
      email: email,
    },
  });
  if (user.length == 0) {
    res.send("no user exsit with that gmail");
  } else {
    //tyo email ko user xa vaney  bujyo --->passoword pani check garney
    const isMatched = bcrypt.compareSync(password, user[0].password);
    if (isMatched) {
      //generate token
      var token = jwt.sign({id : user[0].id},"ThisIsaSecretKeyDontShare",{
        expiresIn : '1d'
      })
  res.cookie('token',token)
  res.send("logged in successful")
      
    
    } else {
      res.send("Email or password is invalid");
    }
  }
}
