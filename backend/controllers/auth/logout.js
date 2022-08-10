function logout(req, res){
    req.session.destroy()
    return res.status(200).json({error: false})
}


module.exports = logout