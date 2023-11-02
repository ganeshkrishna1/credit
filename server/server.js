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

    const sql = "INSERT INTO customerapplication (`name`,`dob`,`phone`,`email`,`occupation`,`income`,`payslip1Path`,`payslip2Path`, `stat`) VALUES (?)";
    
    const values = [
        req.body.name,
        req.body.dob,
        req.body.phone,
        req.body.email,
        req.body.occupation,
        req.body.income,
        payslip1Path,
        payslip2Path,
        stat
    ];

    con.query(sql,[values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});
app.get('/getapplications',(req,res)=>{
  const sql="SELECT * FROM customerapplication";
  con.query(sql,(err,result)=>{
      if(err) return res,json({Error:"Got an error in the sql"});
      return res.json({Status:"Success",Result:result})

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
  app.put('/updateStatus', (req, res) => {
    const { id, stat } = req.body;

    if (!id || !stat) {
        return res.status(400).json({ success: false, message: 'ID and status are required.' });
    }

    const sql = "UPDATE customerapplication SET stat = ? WHERE id = ?";

    con.query(sql, [stat, id], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Application not found.' });
        }

        res.status(200).json({ success: true, message: 'Status updated successfully.' });
    });
});
app.get('/getstatus/:id', (req, res) => {
  const applicationid = req.params.id;
  const sql = "SELECT stat FROM customerapplications WHERE id = ?"; // Use your table name and column names here.
  con.query(sql, [applicationid], (err, results) => {
    if (err) {
      res.json({ Status: 'Error', Message: 'Database error' });
    } else {
      res.json({ Status: 'Error', Message: 'Application not found.' });
    }
  });
});
