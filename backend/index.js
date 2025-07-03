import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";
import passport from "passport";
import env from "dotenv";
import cors from "cors";
import bcrypt, { hash } from "bcrypt";

import senate_data from "./senate.js";
import rep_data from "./rep.js";
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
env.config();
const db = new pg.Client({
    user: process.env.DATABASE_USER,
    host: "localhost",
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port:"5433",
});
app.use(cors());
db.connect();
const server = 3000;
async function StockExistence(s){
    var result;
    try{
    result = await db.query("SELECT* FROM STOCKS WHERE stock_ticker = $1", [s]);
    }
    catch(err){
        return "Error, that stock is not in the database";
    }
    if(result.rowCount >= 1){
        return true;
    }
    return false;
}

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
  });

app.get("/", async (req,res) => {
    const result = await db.query('SELECT * FROM members');
      res.json(result.rows);
});
app.get(`/api/:name`, async (req,res) => {
   const name = req.params.name.toLowerCase();
   const result = await db.query('SELECT * FROM members');
   const name_db = result.rows.find(e => (`${e.first_name.toLowerCase()} ${e.last_name.toLowerCase()}`) === name);
   if(!name_db){
    return res.status(404).json({err: "name is not populated"});
   }
   if(name_db.gov_pos === "Representative"){
    const data = rep_data.filter(e => `${e.first_name.toLowerCase()} ${e.last_name.toLowerCase()}` === name);
    res.json(data);
   }
   else{
    const data = senate_data.filter(e => `${e.first_name.toLowerCase()} ${e.last_name.toLowerCase()}` === name);
    res.json(data);
   }
    });

app.listen(server, () => {
    console.log('server started.');
}); 