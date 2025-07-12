import pg from "pg";
import senate_data from "./senate.js";
import rep_data from "./rep.js";
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "congress watcher",
    password: "fUq468jud",
    port:"5433",
});
db.connect();

console.log(senate_data);