const db = require("../../configs/db");

const addRecipe = async (req, res) => {
  try {
    const { id } = req.session.user;
    const { title, description, ingridients, directions } = req.body;

    let filename = "default.png";

    if (req.file) {
      filename = req.file.filename;
    }

    const query =
      "INSERT INTO recipes (title, description, ingridients, directions, imagename, userid) values($1, $2, $3, $4, $5, $6)";
    await db.query(query, [
      title,
      description,
      ingridients,
      directions,
      filename,
      id,
    ]);

    return res.status(200).json({
      error: false,
      payload: {
        message: "Recipe Saved!",
      },
    });
  } catch (error) {
    console.log(`Error while adding Recipe: ${error.message}`);
    return res
      .status(500)
      .json({ error: true, message: "Internal server Error" });
  }
};

module.exports = addRecipe;
