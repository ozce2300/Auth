const express = require ("express")
const router = express.Router();

// Add new user
router.post("/register", async (req, res) => {
    try {
        const {username, password} = req.body;
        
        //validate input
        if(!username || !password) {
            return res.status(400).json({error:("Invalid input, send username/password")})
        }
        //Correct - save user
        res.status(201).json({message : "User created"})
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

        //check credantials
        if(username === "Rojva" && password==="password"){
            res.status(200).json({message: "login succesfull"})
        }
        else {
            res.status(401).json({error: "Invalid username/password"})
        }
    }

    catch (error) {
        res.status(500).json({ error : "server error"})
    }
})

module.exports = router;