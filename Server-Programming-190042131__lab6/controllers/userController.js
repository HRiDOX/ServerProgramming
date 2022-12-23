const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');

const  User = require('../models/User');
const passport = require('passport');
const getLogin = (req,res)=> {
    res.render("login")
};
const getRegister = (req,res)=> { 
    
    res.render("register")


};

const getDashboard = (req,res) => {
    res.render("dashboard",{
        name:req.user.name
    });
};

const register = async (req,res) => {
    const {name,email,password,confirmPassword} =req.body
    let errors = [];

  if (!name || !email || !password || !confirmPassword) {
    res.send( 'Please enter all fields' );
  }
  if (password != confirmPassword) {
   res.send( 'Passwords do not match' );
  }else{
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password,10);
    
    user.save((err) => {
        if(!err){
            res.redirect('/login')
        }else{
            console.log(err);
        }
    })
  }
};




const login = (req,res,next) => {
    const { email, password} = req.body
    if (!email || !password ) {
        
        return res.redirect('/login')
        
      }
  passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/login',
  })(req,res,next);
};

const logout = (req,res) => {
    req.logout();
    res.redirect('/login');
}




module.exports = {getLogin,getRegister,getDashboard,register,login,logout};
