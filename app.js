const express = require("express"); //alternate
const app = express();

const name = require("ejs");
const { blogs, users } = require("./model/index");
const { where } = require("sequelize");


//import gareko multer ko file
const {storage,multer} = require("./middleware/multerConfig")

const upload = multer ({storage : storage})   //multer ko storage lai mero storage gareko variable access diye


require("./model/index");
//telling node js to set its viiew engine to ejs
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//HOME
app.get("/", async (req, res) => {
  //blogs table bata data (row) nikalnu paryo ani home page lai pass garnu paryo

  const blogsTableBLogs = await blogs.findAll();
  res.render("HOME", { blogs: blogsTableBLogs });
});
app.get("/addblog", (req, res) => {
  res.render("./addBlog");
});
app.post("/addblog",upload.single('image'), async (req, res) => {
  console.log(req.file)

  // const title = req.body.titile
  // const subTitle = req.body.subTitle
  // const description = req.body.description
  // console.log(title,subTitle,description)

  const { title, subTitle, description } = req.body;
  console.log(title, subTitle, description);
  if (!title || !subTitle || !description) {
    return res.send("please provide proper information");
  }

  // Inserting into blogs tables

  await blogs.create({
    title: title,
    subTitle: subTitle,
    description: description,
  });
  res.redirect("/");
});



app.get("/user", (req, res) => {
  res.render("./user");
});
app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  await users.create({
    name: name,
    email: email,
    password: password,
  });
  res.send("added to list");
});

//single blog

app.get("/blog", (req, res) => {
  res.render("singleBlog");
});

//  app.get ("/blog/:id",async(req,res)=>{
//     const id = req.params.id
//     const foundData =  await blogs.findByPk(id)
//     console.log(foundData)
//     res.render("singleBlog",{blog : foundData})
//  })

//  app.get ("/blog/:id",async(req,res)=>{
//     const id = req.params.id
//     const foundData =  await blogs.findAll({
//         where : {
//             id : id
//         }
//     })
//     console.log(foundData)
//     res.render("singleBlog",{blog : foundData})
//  })

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const foundData = await blogs.findAll({
    where: {
      id: id,
    },
  });
  console.log(foundData);
  res.render("singleBlog", { blog: foundData });
});

app.get("/delet/:id", async (req, res) => {
  const id = req.params.id;
  await blogs.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/");
});

//update garnu

 app.get("/update/:id",async(req,res)=>{
     const id = req.params.id
     const blog =await blogs.findByPk(id)
 res.render("updateBlog",{id,blog})

 })
 app.post("/update/:id",async(req,res)=>{

     const {id}=req.params
     const { title, subTitle, description} = req.body
     await blogs.update({
        title : title,
        subTitle : subTitle,
        description : description
     },{
        where:{
            id:id
        }
     })
     res.redirect("/blog/"+ id)

     })
  
 






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node JS has start at port ${PORT}`);
});
