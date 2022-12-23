const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");
const userController = require("./controllers/userController");
const imagesController = require("./controllers/imagesController");
const auth = require("./middlewares/auth");
router.get("/", homeController.getHome);
router.get("/book-list", bookController.getBookList);
router.get("/books", bookController.getBook);
router.post("/books", bookController.postBook);
router.get("/login", userController.getLogin);
router.get("/register",userController.getRegister)
router.post("/register",userController.register)
router.post("/login",userController.login);
router.get("/logout",userController.logout);

//router.get("/register", (req,res)=> res.send('register'));
router.get("/dashboard", auth.ensureAuthenticated,userController.getDashboard)

router.post("/dashboard/upload", (req, res) => {
    
    const { image } = req.files;

    console.log(image)
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    //if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);

    // All good
    res.sendStatus(200);
},auth.ensureAuthenticated);


router.get("/dashboard/images", auth.ensureAuthenticated,imagesController.getImage)

module.exports = router;
