const { Pool } = require('pg')

const {PG_USER, PG_HOST, PG_NAME, PG_PASSWORD, PG_PORT} = process.env;

const devConfig = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_NAME,
  password: PG_PASSWORD,
  port: PG_PORT
}

const proConfig = {
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false
  }
}

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
)


module.exports = {
  query: async (text, params) => {
    try{
      return await pool.query(text, params)
    }catch(error){
      console.log("Error In database: ", error.message)
    }
    
  }
}