const express = require('express');
const mongoose = require('mongoose');
const userSchema = require("../Schema/userSchema");
const adminOrManagerSchema = require("../Schema/adminOrManagerSchema");
const userTasks = require('../Schema/TaskSchema');
const ObjectId = mongoose.Types.ObjectId;
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

Router.post("/userLogin", async (req, res) => {
    const emailExists = await userSchema.findOne({ email: req.body.email });
    const password = bcrypt.compareSync(req.body.password.toString(), emailExists.password);


    if (emailExists && password == true) {
        const userName = emailExists.name;
        const id = emailExists._id;
        const token = jwt.sign({ userName, id }, 'jwt-secret-key', { expiresIn: '1d' });
        res.send({ Status: "Success", token: token, user_name: userName, user_id: id });
    }
    else {
        res.send({ Error: "Email Id not Exists" })
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

Router.post("/adminOrManagerLogin", async (req, res) => {
    const emailExists = await adminOrManagerSchema.findOne({ email: req.body.email });
    const password = bcrypt.compareSync(req.body.password.toString(), emailExists.password);

    if (emailExists && password == true) {
        const name = emailExists.name;
        const id = emailExists._id;
        const role = emailExists.role
        const token = jwt.sign({ name, id, role }, 'jwt-secret-key', { expiresIn: '1d' });
        res.send({ Status: "Success", token: token, name: name, id: id, role: role });
    }
    else {
        res.send({ Error: "Email Id not Exists" })
    }
});


const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : "auth header error";

    if (!token) {
        return res.send({ Error: "You are not authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                res.json({ Error: "Token is not okay" })
            }
            else {
                req.name = decoded.name;
                req.id = decoded.id;
                req.role = decoded.role;
                next();
            }
        });
    }
}


Router.get('/adminHome', verifyUser, async (req, res) => {
    const adminId = req.id;
    const adminHome = await adminOrManagerSchema.find({ _id: new ObjectId(adminId) });
    if (!adminHome) {
        res.send({ Error: "Fetching Admin Details Error" });
    }
    else {
        res.send({ data: adminHome, Status: "Success" });
    }
});

Router.get('/managerHome', verifyUser, async (req, res) => {
    const managerId = req.id;
    const managerHome = await adminOrManagerSchema.find({ _id: new ObjectId(managerId) });
    if (!managerHome) {
        res.send({ Error: "Fetching Admin Details Error" });
    }
    else {
        res.send({ data: managerHome, Status: "Success" });
    }
})

Router.get('/userHome', verifyUser, async (req, res) => {
    const userId = req.id;
    const userHome = await userSchema.find({ _id: new ObjectId(userId) });
    // const userTasks = await userTasks.find({userId:userId});
    // console.log(userTasks);
    if (!userHome) {
        res.send({ Error: "Fetching Admin Details Error" });
    }
    else {
        res.send({ data: userHome, Status: "Success" });
    }
})

Router.post('/userHome', verifyUser, async (req, res) => {
    const userId = Object(req.id);
    let formData = {
        taskName: req.body.taskName,
        description: req.body.description,
        status: req.body.status,
        userId: userId,
    };

    const task = new userTasks(formData);
    if (!task) {
        res.send({ Error: "Please fill all fields" })
    }
    else {
        const addTask = await task.save();
        res.send({ Status: "Success", data: addTask });
    }
})

Router.get('/managerList', async (req, res) => {
    const managerDetails = await adminOrManagerSchema.find({ role: "Manager" });
    if (!managerDetails) {
        res.send({ Error: "Fetching Managers list is error" });
    }
    else {
        res.send({ data: managerDetails, Status: "Success" });
    }
})

Router.get('/adminHome/usersList', async (req, res) => {
    const usersList = await userSchema.find({});
    if (!usersList) {
        res.send({ Error: "Fetching Users List" });
    }
    else {
        res.send({ Status: "Success", data: usersList })
    }
})

Router.get('/adminHome/usersList/viewTasks/:id', async (req, res) => {
    const userId = req.params.id;
    const tasks = await userTasks.find({ userId: new ObjectId(userId) });
    if (tasks) {
        res.send({ data: tasks, Status: "Success" });
    }
    else{
        
    }


})
module.exports = Router;