const db = require("../../configs/db");

async function deleteRecipe(req, res) {
  try {
    const { recipeid } = req.query;
    const { id } = req.session.user;

    const firstQuery = `SELECT userid FROM recipes where recipeid=$1`;
    const userIdRow = await db.query(firstQuery, [recipeid]);

    if (userIdRow.rowCount > 0) {
      const userid = userIdRow.rows[0].userid;

      if (userid === id) {
        const secondQuery = `DELETE FROM recipes WHERE recipeid=$1`;
        await db.query(secondQuery, [recipeid]);
        return res
          .status(200)
          .json({ error: false, payload: { message: "recipe Deleted" } });
      } else {
        return res
          .status(400)
          .json({ error: true, message: "cannot delete others recipe" });
      }
    } else {
      return res
        .status(400)
        .json({ error: true, message: "recipe does not exist" });
    }
  } catch (error) {
    console.log("Error While Deleting recipe");
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
}

module.exports = deleteRecipe;
