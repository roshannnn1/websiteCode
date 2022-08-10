const router = require("express").Router()

const addRecipe = require("../controllers/recipe/addRecipe")
const getRecipes = require("../controllers/recipe/getRecipes")
const getRecipeDetail = require("../controllers/recipe/getRecipeDetail")
const deleteRecipe = require("../controllers/recipe/deleteRecipe")
const getMyRecipes = require("../controllers/recipe/getMyRecipes")
const {isAuthenticatedMiddleware} = require("../controllers/auth/isauthenticated")
const upload = require("../controllers/recipe/uploadImage")

router.get("/all", getRecipes)
router.post("/create", isAuthenticatedMiddleware, upload.single("file"), addRecipe)
router.get("/detail", getRecipeDetail)
router.delete("/delete", isAuthenticatedMiddleware, deleteRecipe)
router.get("/my", isAuthenticatedMiddleware, getMyRecipes)


module.exports = router