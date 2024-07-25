const nodemailer = require ('nodemailer') //require gareko package



async function sendEmail (data){   //function lyako
    //logic to send email
const transporter = nodemailer.createTransport({ //transporter variable mah hold gareko ako data
    service : "gmail",  //gmail mah pathako
    auth : {                             //yo vanda tala sabai sender ko authentication
        user : process.env.email,         //sender ko gmail
       pass : process.env.emailAppPAssword            //sender ko password
    }
})

//audai garko data vanne object bata data leko hai tala ko  (all the way from user.controller.js)

const mailOption = {                   //yo vanda tala sabai reciever ko authentication kk pathaune ra kolai yeslai pass garne
       from :"oscar Man Shrestha<test.oscarstha@gmail.com>",
       to : data.email,                      //mathi bata ako email mah pathaunu vanko
       subject :  data.subject,
       text :  data.text

} 
 await transporter.sendMail(mailOption)         //variable pass gareko 
 }


module.exports = sendEmail //euta vayara yesari exports gareko multiple vako vaya exports. garthe







//yo kura sabai project mah chainxa so can be done