const express = require("express"); //alternate
const app = express();
const cookieParser = require('cookie-parser')
//link gareko blogRoute
const blogRoute = require('./routes/blogRoute')
const userRoute = require ('./routes/userRoute')
const name = require("ejs");
const { where } = require("sequelize");


// requiring dotenv
require("dotenv").config()

//requiring model ko index.js
require("./model/index");


//telling node js to set its viiew engine to ejs
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use (cookieParser())

//--------------------------------------------------------------------------------------



app.use(express.static ("./uploads"))
app.use (express.static (__dirname +'/public') )


// app.use("hello",blogRoute)   // /hello + /addblog
app.use("",blogRoute)
app.use("",userRoute)
//port ka kholne tesko code.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node JS has start at port ${PORT}`);
});
