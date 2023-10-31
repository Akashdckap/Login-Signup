const express = require('express');
const userSchema = require("../Schema/userSchema");
const adminOrManagerSchema = require("../Schema/adminOrManagerSchema");
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const salt = 10;

Router.post('/userRegister', async (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    const hashPassword = bcrypt.hashSync(password.toString(), salt);
    let formData = {
        name: name,
        email: email,
        password: hashPassword,
    };
    // console.log(formData);

    const emailExists = await userSchema.findOne({ email: email });
    if (emailExists) {
        res.send({ Error: "Email Id Already Exists" });

    }
    else {
        const user = new userSchema(formData);
        const register = await user.save();
        res.send({ id: 1, data: register, Status: "Success" });
    }
})

Router.post("/userLogin",async(req,res)=>{
    const emailExists = await userSchema.findOne({email:req.body.email});
    const password = bcrypt.compareSync(req.body.password.toString(),emailExists.password);
    
    
    if(emailExists && password == true){
        const userName = emailExists.name;
        const id = emailExists._id;
        const token = jwt.sign({ userName, id }, 'jwt-secret-key', { expiresIn: '1d' });
        res.send({Status:"Success",token:token,user_name:userName,user_id:id});
    }
    else{
        res.send({Error:"Email Id not Exists"})
    }
})


Router.post('/adminOrManagerRegister', async (req, res) => {

    let name = req.body.name;
    let role = req.body.role;
    let email = req.body.email;
    let password = req.body.password;

    const hashPassword = bcrypt.hashSync(password.toString(), salt);
    let formData = {
        name: name,
        role: role,
        email: email,
        password: hashPassword,
    };

    const emailExists = await adminOrManagerSchema.findOne({ email: email });
    if (emailExists) {
        res.send({ Error: "Email Id Already Exists" });
    }
    else {
        const user = new adminOrManagerSchema(formData);
        const register = await user.save();
        res.send({ id: 1, data: register, Status: "Success" });
    }
});

Router.post("/adminOrManagerLogin",async(req,res)=>{
    const emailExists = await adminOrManagerSchema.findOne({email:req.body.email});
    const password = bcrypt.compareSync(req.body.password.toString(),emailExists.password);
    ///addd
    if(emailExists && password == true){
        const name = emailExists.name;
        const id = emailExists._id;
        const token = jwt.sign({ name, id }, 'jwt-secret-key', { expiresIn: '1d' });
        res.send({Status:"Success",token:token,name:name,id:id});
    }
    else{
        res.send({Error:"Email Id not Exists"})
    }
})

module.exports = Router;