const db = require("../../configs/db");

const getRecipeDetail = async (req, res) => {
  try {
    const { recipeid } = req.query;

    const query = `Select users.userid, recipeid, title, description, ingridients, directions, 
                imagename, substring(cast(createdat as text), 1,  10) as datecreated, imagename, 
                username from recipes inner join users
                on recipes.userid = users.userid where recipeid = $1`;

    const recipeDetails = await db.query(query, [recipeid]);

    if (recipeDetails.rowCount <= 0) {
      return res
        .status(204)
        .json({ error: false, payload: { message: "No content" } });
    }

    const data = recipeDetails.rows[0];

    return res.status(200).json({ error: false, payload: { ...data } });
  } catch (error) {
    console.log("Error while fetching recipe details");
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

module.exports = getRecipeDetail;
