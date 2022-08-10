const db = require("../../configs/db");


const getMyRecipes = async (req, res) => {


    try{

        const { id } = req.session.user

        const query = `Select recipeid, title, description, ingridients, directions, 
        substring(cast(createdat as text), 1,  10) as datecreated, 
        imagename, username 
        from recipes inner join users
        on recipes.userid = users.userid
        where recipes.userid = $1
        order by datecreated desc`

        const recipes = await db.query(query, [id])

        if(recipes.rowCount <= 0){
            return res.status(204).json({error: false, payload: {message: "No content"}})
        }

        return res.status(200).json({error: false, payload: {
            recipes: recipes.rows
        }})

    }catch(error){
        console.log('Error while selecting my recipes')
        console.log(error)
        return res.status(500).json({error: true, message: "Internal server Error"})
    }

}


module.exports = getMyRecipes