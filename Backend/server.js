import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


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
    database: 'registration'
})

const verifyUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader ? authHeader.split(' ')[1] : "";
    // console.log(token);
    if (token) {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            // console.log(decoded)
            // console.log(err)
            if (err) {

                return res.json({ Error: "Token is not okay" })
            }
            else {
                req.name = decoded.name
                req.id = decoded.id
                next();
            }
        });
    }
    else {
        // console.log("not");
        return res.json({ Error: "You are not authenticated" });
    }
}

app.post('/home', verifyUser, (req, res) => {
    console.log(req.id);
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


app.get('/home',verifyUser, (req, res) => {
    // console.log(req.id)
    const sql = `SELECT * FROM tasks where user_id = ${req.id}`
    db.query(sql, (err, data) => {
        if (err) return res.json({ Error: "Fetch Failure" })

        else {
            return res.json({ data, Status: "Success", name: req.name, id: req.id });
        }
    })
    // res.send("hello");

})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });

        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting datas in server" })
            return res.json({ Status: "Success" })
        })
    })
    // const values = [
    //     req.body.name,
    //     req.body.email,
    //     req.body.password
    // ];
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * from login where email = ?'
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ Error: 'Login error in server' })
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: 'password compare error' })
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name, id: data[0].id }, 'jwt-secret-key', { expiresIn: '1d' });
                    // console.log(token,"hi");
                    // res.json({"token":accessToken});
                    return res.json({ Status: 'Success', token: token });
                    //    return res.redirect(301,'/home')
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



app.get('/register', (req, res) => {
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

app.listen(8881, () => {
    console.log("Running...")
})


