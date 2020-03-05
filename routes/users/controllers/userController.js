const User = require('../models/User');
const { validationResult } = require('express-validator')
//for the errors
const faker = require('faker');

module.exports = {
        register: (req,res,next) => {
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422)
                // .json({errors:req.flash('errors')})
                .json({errors: errors.array()})
            }
            User.findOne({email:req.body.email})
    .then((user)=>{
    if(user) {
        return res.send('User exists')
        // return req.flash('errors', 'User Already Exists')

    }
    else {
    const newUser = new User();


    newUser.profile.name = req.body.name;
    newUser.profile.picture=faker.image.avatar()
    newUser.email = req.body.email;
    newUser.password = req.body.password;


    newUser.save()
        .then((user)=> {
            req.login(user,err=> {
                if(err){
                    return res
                    .status(400)
                    .json({confirmation:false, message:err})
                } else {
                    res.redirect('/');
                    next();
                }
            })
        // if(user){
            
        // res.status(200).json({message:'success', user})
        // }
        }).catch(err=>{
        return next(err);
        })
    }
    })
    }
    // register: async (req, res, next) => {
    //     const errors = validationResult(req);
    //     const { name, email, password } = req.body;
    //     if (!errors.isEmpty()) {
    //         return res.status(422).json({ errors: errors.array() })
    //     }
    //     let user = await User.findOne({ email })
    //     try {
    //         if (user) {
    //                 return res.status(500).json({ message: 'User already exists' })
    //             }
    //             user = await User.create({
    //                 ['profile.name']: name,
    //                 email,
    //                 password
    //             });
    //             return res.json({ message: 'success', user })

    //         } catch (error) {
    //             return next(error);
    //         }
    //     }

}
