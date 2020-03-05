const express = require('express');
const router = express.Router();
const User = require('./models/User');
const passport =  require('passport');
require('../../lib/passport');


const {check}=require('express-validator');
const userValidation = require('./utils/userValidation')


const userController = require('./controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/register', (req,res,next)=>{

// User.findOne({email:req.body.email})
// .then((user)=>{
//   if(user) return console.log('User exists');
  
//  else {
  
//   const newUser = new User();
//   // const salt= bcrypt.genSaltSync(10);
//   // const hash = bcrypt.hashSync(req.body.password,salt)

//   newUser.profile.name = req.body.password
//   newUser.email = req.body.email;
//   newUser.password = req.body.password;


//   newUser.save()
//   .then((user)=> {
//     if(user){
//       res.status(200).json({message:'success', user})
//     }
//   }).catch(err=>{
//     return next(err);
//   })
// }
// })
// })


  
  router.get('/register', (req,res)=> {
    return res.render('auth/register', {errors:req.flash('errors')})
  // res.render('auth/register')
})
router.post('/register',userValidation, userController.register)




router.get('/login', (req,res)=>{
  return res.render('auth/login', {errors: req.flash('errors')})
})
router.get('/update-profile', (req,res)=>{
  return res.render('auth/update-profile')})


router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/login',
  failureFlash: true
}))

// profile routes
router.get('/profile', (req,res,next)=> {
  if(req.isAuthenticated){
    return res.render('auth/profile')
  } else{
    return res.send('Unauthorized')
  }
})

module.exports = router;
