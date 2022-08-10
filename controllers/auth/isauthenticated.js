const isAuthenticated = async (req, res, next) =>{
    try{
        

        if(req.session.user){
            return res.status(200).json({error: false, 
                payload: {loggedIn: true, username: req.session.user.username, userId: req.session.user.id}})
        }
        
        return res.status(400).json({error: true, message: "Not logged in"})
        

    }catch(error){
        console.log(`Error while Register: ${error.message}`)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }
}


function isAuthenticatedMiddleware(req, res, next){
    if(req.session.user){
        if(req.session.user.username && req.session.user.id){
            next()
        }else{
            return res.status(400).json({error: true, message: "Not logged in"})
        }
    }else{
        return res.status(400).json({error: true, message: "Not logged in"})
    }

    
}


module.exports = {isAuthenticated, isAuthenticatedMiddleware}