const { Model } = require("sequelize");
const { blogs, users } = require("../../model");


exports.renderHome = async (req, res) => {

    //blogs table bata data (row) nikalnu paryo ani home page lai pass garnu paryo
    const blogsTableBLogs = await blogs.findAll({
      include : {
        model:users            //user table ko information taneko blog snga jodeko!!
      }
    })
    

    res.render("HOME", { blogs: blogsTableBLogs }); 
  
  }

  exports.renderaddBlog= (req, res) => {
    res.render("./addBlog");
  };


  exports.postAddblog=async (req, res) => {  //using upload variable here!! 
const userId = req.userId 
    
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
      image : process.env.backendUrl + req.file.filename,
      userId : userId
    });
    res.redirect("/");
  };


  exports.singleBlog=async (req, res) => {
    const id = req.params.id;
    const foundData = await blogs.findAll({
      where: {
        id: id,
        
      },
      include : {             //user table ko information taneko blog snga jodeko!!
      model:users
      }
    });
    console.log(foundData);
    res.render("singleBlog", { blog: foundData });
  };
  
//  app.get ("/blog/:id",async(req,res)=>{                               //by pk
  //     const id = req.params.id
  //     const foundData =  await blogs.findByPk(id)
  //     console.log(foundData)
  //     res.render("singleBlog",{blog : foundData})
  //  })

  

  exports.deletBlog=async (req, res) => {
    const id = req.params.id;
    await blogs.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/");
  };

  exports.Update=async(req,res)=>{
    const id = req.params.id
    const blog =await blogs.findByPk(id)
res.render("updateBlog",{id,blog})

}

exports.update=async(req,res)=>{

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

    }
 