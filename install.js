require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3");

// Connect
const db = new sqlite3.Database(process.env.Database);

//create table users

db.serialize(() => {
    //Drop if table exist

    db.run("DROP TABLE IF EXISTS users");

    //Create table

    db.run(`CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(240) NOT NULL UNIQUE,
        password VARCHAR(240) NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log("Table created")
})

