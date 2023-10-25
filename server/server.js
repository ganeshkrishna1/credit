import express from "express"
import mysql from "mysql"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'; 

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"credit",
})

con.connect(function(err) {
    if(err) { 
        console.log("Error in Connection");
        console.log(err);
    } else {
        console.log("SQL server Connected");
    }
})
app.listen(8081, ()=> {
    console.log("Running");
})
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO user (`name`,`username`,`email`,`password`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password
    ]
    con.query(sql,[values],(err,data)=> {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
  })

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  
    con.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ Status: 'Error', Message: 'Database error' });
      } else if (results.length === 1) {
        res.status(200).json({ Status: 'Success' });
      } else {
        res.status(401).json({ Status: 'Failure' });
      }
    });
  });