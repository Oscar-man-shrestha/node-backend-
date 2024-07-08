// // const express = require('express')   //alternate
// // const app = express()

const app = require ('express')()
const name = require ('ejs')
require("./model/index.js ")
//telling node js to set its viiew engine to ejs
app.set ('view engine','ejs')
//HOME
app.get ("/",(req,res)=>{
    res.render("HOME")

})
app.get ("/about",(req,res)=>{
    res.render("about")

})

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Node JS has start at port ${PORT}`)
})