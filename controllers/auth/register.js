const db = require("../../configs/db")
const bcrypt = require("bcrypt")

async function register(req, res){
    try{

        let {username, password} = req.body

        username = username.trim().toLowerCase()
        password = password.trim()

        // check for duplicate username
        let results = await db.query('SELECT username FROM users WHERE username=$1', [username]);
        if(results.rowCount >= 1) return res.status(409).json({error: true, message: "Username already exists"});

        
        // hash password

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt)


        // save user

        await db.query('INSERT INTO users (username, pass) VALUES ($1, $2)', [username, hashedPassword])

        const id = await db.query('Select userId FROM users WHERE username=$1', [username])


        // session

        req.session.user = {
            id: id.rows[0].userid,
            username: username
        }


        return res.status(201).json({error: false, payload: {username: username, loggedIn: true}})


    }catch(error){
        console.log(`Error while Register: ${error.message}`)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


module.exports = register