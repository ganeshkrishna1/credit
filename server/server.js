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
