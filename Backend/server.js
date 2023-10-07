import express from "express";
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
        // console.log(token);
        return res.json({ Error: "You are not authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                res.json({ Error: "Token is not okay" })
            }
            else {
                // console.log(decoded);
                req.name = decoded.name;
                req.id = decoded.id;
                req.role = decoded.role;
                next();
            }
        });
    }
}
app.get('/userHome', verifyUser, (req, res) => {
    const sql = `SELECT * FROM userTasks where user_id = ${req.id}`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ Error: "Fetch Failure in userhome router" })
        else {
            return res.json({ data, Status: "Success", name: req.name, id: req.id });
        }
    })
})


app.get('/managerList', (req, res) => {
    const sql = "SELECT * FROM adminManager WHERE role = 'Manager'";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Fetch Manager Failed" });
        }
        else {
            // console.log(data);
            return res.json({ data, Status: "Success" });
        }
    })
})

app.get('/usersList', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Users fetch failure" });
        }
        else {
            return res.json({ data, Status: "Success" });
        }
    })
})

app.get('/managerHome', verifyUser, (req, res) => {
    const sql = `SELECT * FROM assignedUsers LEFT JOIN users ON assignedUsers.user_id = users.id WHERE manager_id = ?`
    db.query(sql, [req.id], (err, data) => {
        if (err) {
            return res.json({ Error: "Fetching assigned users error" });
        }
        else {
            return res.json({ data, Status: "Success", name: req.name, id: req.id });
        }
    })
})

app.get('/managerHome/viewTasks/:id', (req, res) => {
    const userId = req.params.id
    // console.log(userId);
    const sql = `SELECT * FROM userTasks WHERE user_id = ${userId}`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Users fetch failure" });
        }
        else {
            return res.json({ data, Status: "Success" });
        }
    })
})

app.get('/adminHome/usersList/viewTasks/:id', (req, res) => {
    const userId = req.params.id
    // console.log(userId);
    const sql = `SELECT * FROM userTasks WHERE user_id = ${userId}`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Users fetch failure" });
        }
        else {
            return res.json({ data, Status: "Success" });
        }
    })
})


app.get('/adminHome', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, id: req.id });
})
app.get('/adminHome/usersList', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: 'Can not fetch the user lists' })
        }
        else {
            // console.log(data);
            return res.json({ data, Status: "Success" });
        }
    })
})


app.post("/delete", (req, res) => {
    const { deleteId } = req.body;
    const sql = `DELETE FROM userTasks WHERE id=${deleteId}`;
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ Error: "Can not delete the task" })
        }
        else {
            return res.json({ message: 'task delete successfully' })
        }
    })
})
app.post('/userRegister', (req, res) => {
    const exists = "SELECT * FROM users WHERE email = ?"
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES(?)";
    db.query(exists, [req.body.email], (err, data) => {
        if (err) throw err;
        else if (data.length > 0) {
            return res.json({ Error: "Email already exists" })
        }
        else {
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
        }
    })

})



app.post('/adminOrManagerRegister', (req, res) => {
    const exists = "SELECT * FROM adminManager WHERE email = ?";
    const sql = "INSERT INTO adminManager (`name`,`role`,`email`,`password`) VALUES(?)";
    db.query(exists, [req.body.email], (err, data) => {
        if (err) throw err;
        else if (data.length > 0) {
            return res.json({ Error: "Email id already exists" })
        }
        else {
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
        }
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
                    console.log(response)
                    const name = data[0].name;
                    const id = data[0].id;
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

app.post('/adminOrManagerLogin', (req, res) => {
    const sql = 'SELECT * FROM adminManager WHERE email = ?';

    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ Error: "Login error" })
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" })
                if (response) {
                    const name = data[0].name;
                    const id = data[0].id;
                    const role = data[0].role;
                    const token = jwt.sign({ name, id }, 'jwt-secret-key', { expiresIn: '1d' });
                    return res.json({ Status: 'Success', token: token, role: role })
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

app.post('/userHome', verifyUser, (req, res) => {
    const sql = "INSERT INTO userTasks (`task_name`,`description`,`user_id`) VALUES(?)";
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
app.post('/adminHome/managerList', (req, res) => {
    const exists = `SELECT user_id FROM assignedUsers WHERE user_id = ?`;
    const sql = "INSERT INTO assignedUsers (`manager_id`,`user_id`) VALUES(?)";
    db.query(exists, [req.body.userId], (err, data) => {
        if (err) throw err;
        else if (data.length > 0 && data[0].id == data[0].id) {
            return res.json({ Error: "This user already assigned" });
        }
        else {
            const values = [
                req.body.managerId,
                req.body.userId
            ];
            db.query(sql, [values], (error, data) => {
                if (error) {
                    return res.json({ data, Error: "Assigned is error" });
                }
                else {
                    return res.json({ data, Status: "Success" });
                }
            })
        }
    })
})

app.get('/adminHome/AssignList',(req,res)=>{
    const sql = 'SELECT * FROM assignedUsers INNER JOIN adminManager ON assignedUsers.manager_id = adminManager.id INNER JOIN userTasks ON adminManager.id = userTasks.user_id'
    db.query(sql,(err,data)=>{
        if(err){
            return res.json({ Error : "Fetching assigned users error" })
        }
        else{
            return res.json({data, Status:"Success"});
        }
    })
})

app.listen(5051, () => {
    console.log("Server running on the 5051 port...")
});
