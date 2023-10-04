import express, { json, response } from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import cookieParser from "cookie-parser";

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", "GET"],
    credentials: true
}));
// app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "dckap",
    password: "Dckap2023Ecommerce",
    database: 'adminUsers'
});

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : "auth header error";

    if (!token) {
        console.log(token);
        return res.json({ Error: "You are not authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                res.json({ Error: "Token is not okay" })
            }
            else {
                req.name = decoded.name;
                req.id = decoded.id
                next();
            }
        });
    }
}
app.get('/userHome', verifyUser, (req, res) => {
    const sql = `SELECT * FROM tasks where user_id = ${req.id}`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ Error: "Fetch Failure" })
        else {
            return res.json({ data, Status: "Success", name: req.name, id: req.id });
        }
    })
})


app.post('/userRegister', (req, res) => {
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });
        const values = [
            req.body.name,
            req.body.email,
            hash
        ];
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting datas in server" })
            else {
                return res.json({ Status: "Success" })
            }
        })
    })
})


app.post('/adminOrManagerRegister',(req,res)=>{
    const sql = "INSERT INTO adminManager (`name`,`role`,`email`,`password`) VALUES(?)"
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });
        const values = [
            req.body.name,
            req.body.role,
            req.body.email,
            hash
        ]; db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting admin data is error" });
            else {
                return res.json({ Status: "Success" })
            }
        })
    })
})

app.post('/userLogin', (req, res) => {
    const sql = 'SELECT * from users where email = ?'
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ Error: 'Login error in server' })
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: 'password compare error' })
                if (response) {
                    const name = data[0].name;
                    const id = data[0].id
                    const token = jwt.sign({ name, id }, 'jwt-secret-key', { expiresIn: '1d' });
                    return res.json({ Status: 'Success', token: token })
                }
                else {
                    return res.json({ Error: 'Password not matched' })
                }
            })
        } else {
            return res.json({ Error: 'No email existed' })
        }
    })
})

app.post('/adminOrManagerLogin',(req,res)=>{
    const sql = 'SELECT * FROM adminManager WHERE email = ?';

    db.query(sql,[req.body.email], (err,data)=>{
        if(err){
            return res.json({Error : "Login error"})
        }
        if(data.length>0){
            bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                if(err) return res.json({Error : "Password compare error"})
                if (response) {
                    const name = data[0].name;
                    const id = data[0].id
                    const token = jwt.sign({ name, id }, 'jwt-secret-key', { expiresIn: '1d' });
                    return res.json({ Status: 'Success', token: token })
                }
                else {
                    return res.json({ Error: 'Password not matched' })
                }
            })
        }
        else {
            return res.json({ Error: 'No email existed' })
        }
    })
})

app.get('/userRegister', (req, res) => {
    const sql = "SELECT * from login";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        }
        else {
            return res.json(data)
        }

    })
})

app.post('/userHome', verifyUser, (req, res) => {
    const sql = "INSERT INTO tasks (`task_name`,`description`,`user_id`) VALUES(?)";
    const values = [
        req.body.taskName,
        req.body.description,
        req.id
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({ Error: "Task adding error" });
        return res.json({ Status: "Success" });
    })
})


app.listen(5051, () => {
    console.log("Running...")
})


