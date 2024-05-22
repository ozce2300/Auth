// Skriver av Özgur Celik

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require ("./routes/authRoutes")
require("dotenv").config();
const jwt = require("jsonwebtoken")


const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes)

//Protected routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message:"skyddad route"})
});

//validate token
function authenticateToken(req,res, next) {
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(" ")[1]//token

 if(token == null) res.status(401).json({message: " Not authorized for this route - token missing"})
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) =>{
        if(err) return res.status(401).json({message: "Not correct JWT"})

            req.username = username;
            next();
    })
}

// Start application

app.listen(port, () => {
    console.log(`Server running ${port}`)
})