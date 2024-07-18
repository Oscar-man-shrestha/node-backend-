const { renderHome, renderaddBlog, postAddblog, singleBlog, deletBlog, Update, update } = require('../controller/blog/blogController')


//import gareko multer ko file
const {storage,multer} = require("../middleware/multerConfig");
const router = require('express').Router()
const upload = multer ({storage : storage})   //multer ko storage lai mero storage gareko variable access diye











router.route ('/').get(renderHome)
router.route('/addblog').get(renderaddBlog).post(upload.single('image'), postAddblog)
router.route('/blog/:id').get(singleBlog)
router.route('/delet/:id').get(deletBlog)
router.route('/update/:id').get(Update).post(update)


module.exports=router