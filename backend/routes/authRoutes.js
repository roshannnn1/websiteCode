const router = require("express").Router()

const login = require("../controllers/auth/login")
const register = require("../controllers/auth/register")
const logout = require("../controllers/auth/logout")
const {isAuthenticated} = require("../controllers/auth/isauthenticated")

router.post("/register", register)
router.post("/login", login)
router.get("/login", isAuthenticated)
router.get("/logout", logout)


module.exports = router