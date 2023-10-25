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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


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
app.post('/application', upload.fields([{ name: 'payslip1' }, { name: 'payslip2' }]), (req, res) => {
    
    // Get the paths of the uploaded files
    const payslip1Path = req.files.payslip1[0].path;
    const payslip2Path = req.files.payslip2[0].path;

    const sql = "INSERT INTO customerapplication (`name`,`dob`,`phone`,`email`,`occupation`,`income`,`payslip1Path`,`payslip2Path`) VALUES (?)";
    
    const values = [
        req.body.name,
        req.body.dob,
        req.body.phone,
        req.body.email,
        req.body.occupation,
        req.body.income,
        payslip1Path,
        payslip2Path
    ];

    con.query(sql,[values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

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