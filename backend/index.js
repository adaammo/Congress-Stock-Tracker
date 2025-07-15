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
   console.log(name);
   const name_db = result.rows.find(e => (`${e.first_name.toLowerCase()} ${e.last_name.toLowerCase()}`) === name);
   if(!name_db){
    return res.status(404).json({err: "name currently has no data available."});
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
app.get('/api/trade-value/:name', async (req,res) => {
    const name = req.params.name.toLowerCase();
    const result = await db.query('SELECT * FROM members');
    const name_db = result.rows.find(e => (`${e.first_name.toLowerCase()} ${e.last_name.toLowerCase()}`) === name);
    const values = await db.query(`SELECT members.first_name, members.last_name, stocks.stock_ticker, trades.stock_id,
         trades.trade_type, trades.trade_value, trades.transaction_date, trades.notified_date FROM trades 
         JOIN members ON members.id = trades.member_id AND members.first_name = $1
         JOIn stocks ON stocks.stock_id = trades.stock_id
         ORDER BY trades.stock_id ASC,
         trades.transaction_date ASC,
         trades.notified_date ASC;`,[name_db.first_name]);
         res.json(values.rows);
});
app.listen(server, () => {
    console.log('server started.');
}); 