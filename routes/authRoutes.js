const express = require ("express")
const router = express.Router();
const sqlite3 = require("sqlite3");
require("dotenv").config();
const bcrypt = require("bcrypt");


// Connect to database
const db = new sqlite3.Database(process.env.Database);

// Add new user
router.post("/register", async (req, res) => {
    try {
        const {username, password} = req.body;
        
        //validate input
        if(!username || !password) {
            return res.status(400).json({error:("Invalid input, send username/password")})
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        //Correct - save user
        const sql = `INSERT INTO users(username, password) VALUES(?,?)`;
        db.run(sql, [username, hashedPassword], (err) =>{
            if(err){
                res.status(400).json({message : "error creating user"})
            }
            else {
                res.status(201).json({message : "User created"})
            }
        })
    }

    catch(error) {
        res.status(500).json({ error : "Server error"})
    }
})

//login user
router.post ("/login", async(req, res) => {

    try {
        const {username, password} = req.body;
        //validate input
        if(!username || !password) {
            return res.status(400).json({error:("Invalid input, send username/password")})
        }
        //Check if user exist
        const sql = `SELECT * FROM users WHERE username=?`;
        db.get(sql, [username], async (err, row) => {
            if(err) {
                res.status(400).json({message : "Error from authenticating"})
            }

            else if (!row) {
                res.status(401).json({message: "Incorrect username/password"})
            }
            else {
                //User exists
                const passwordMatched = await bcrypt.compare(password, row.password)

                if(!passwordMatched) {
                    res.status(401).json({message : "Incorret username/password"});
                }

                else {
                    //correct login
                    res.status(200).json({message: "Correct login"});
                }
            }
        })

    } catch (error) {
        res.status(500).json({ error : "server error"})
    }
});

module.exports = router;