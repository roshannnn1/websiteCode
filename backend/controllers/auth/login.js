const db = require("../../configs/db")
const bcrypt = require("bcrypt")

async function login(req, res){
    try{

        let {username, password} = req.body

        username = username.trim().toLowerCase()
        password = password.trim()


        

        // Check whether username exists

        const loginDetails = await db.query('SELECT userid, username, pass FROM users WHERE username=$1', [username]);

        if(loginDetails.rowCount < 1) return res.status(400).json({error: true, message: "Username or password inorrect"})



        // Check whether password match

        const isSamePassword = await bcrypt.compare(password, loginDetails.rows[0].pass);

        if(isSamePassword){

            // Save username and id on session

            req.session.user = {
                id: loginDetails.rows[0].userid,
                username: username
            }

            return res.status(201).json({error: false, 
                payload: { loggedIn: true, username: username, userId: req.session.user.id}})
            
        }else{
            return res.status(400).json({error: true, message: "username or password inorrect"})
        }



    }catch(error){
        console.log(`Error while loggin in: ${error.message}`)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}

module.exports = login