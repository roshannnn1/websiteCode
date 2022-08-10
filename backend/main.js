const express = require('express')
const cors = require("cors")
const app = express()
const session = require('express-session')
app.use(express.json())


// config environment variables

require("dotenv").config()
const {PORT} = process.env


// cors cconfig

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true
}

app.use(cors(corsConfig))
app.use(express.static('images'));



// Configure session

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:  {
    secure: "auto", // If true: only transmit cookie over https
    httpOnly: true, 
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7 // Measured in milliseconds
},
  
}))


// Import Routes

const authRoutes = require("./routes/authRoutes")
const recipeRoutes = require("./routes/recipeRoutes")


// Routes

app.use('/api/auth', authRoutes)
app.use('/api/recipe', recipeRoutes)


// Start Server

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})