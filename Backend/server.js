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
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "dckap",
    password: "Dckap2023Ecommerce",
    database: 'registration'
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not okay" })
            }
            else {
                req.name = decoded.name;
                req.id = decoded.id
                next();
            }
        });
    }
}


app.get('/', verifyUser, (req, res) => {
    // console.log(req.id);
    return res.json({ Status: "Success", name: req.name, id: req.id });
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
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
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
                    res.cookie('token', token);
                    console.log(token);
                    return res.json({ Status: 'Success' })
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

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

app.listen(8081, () => {
    console.log("Running...")
})


app.post('/home', verifyUser, (req, res) => {
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

app.get('/home', (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, data) => {
        if (err) return res.json({ Error: "Fetch Failure" })
        else {
            return res.json({ data });
            // console.log(res.data);
        }
    })
})


// Database tables
/*
create table login(
    id int not null AUTO_INCREMENT,
    name varchar(255),
    email varchar(255),
    password varchar(255),
    created_at timestamp,
    updated_at timestamp,
    primary key(id));
    
    create table tasks(
    id int not null AUTO_INCREMENT,
    task_name varchar(255),
    description varchar(255),
    user_id int,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (id),
    FOREIGN key(user_id) REFERENCES login(id) on DELETE SET null);
*/