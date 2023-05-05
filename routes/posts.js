var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Post = require('../models/post');

var multer = require('multer');
var cloudinary = require('cloudinary').v2;
var {CloudinaryStorage} = require('multer-storage-cloudinary');

var storage = new CloudinaryStorage({
    cloudinary : cloudinary, 
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname );
      },
    allowedFormats: ["jpg", "jpeg", "png"],
});
var upload = multer({storage});

var postsCtrl = require('../controllers/posts');

router.get('/new' ,function(req,res,next) {
    res.render('newPost' , {
        loggedInUser : req.user 
    })
})
router.post('/upload' , upload.single('image')  , function(req,res,next) {
    req.body.image = req.file.secure_url;
    req.body.userId = req.user._id;
    req.body.username = req.user.name;
    req.body.userAvatar = req.user.avatar;
    var newPost = new Post (req.body);
    console.log(newPost);
    res.redirect(`/users/profile/${req.user.id}`);
})


module.exports = router;