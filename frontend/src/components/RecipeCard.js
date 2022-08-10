import CustomImage from "./CustomImage"
import { useNavigate } from "react-router-dom"

export default function RecipeCard({recipe}){

    const navigate = useNavigate()

    function handleClick(e){
        navigate(`/recipes/${recipe.recipeid}`)
    }

    return (
        <div className="recipe-card">
            <CustomImage imgSrc={`http://localhost:4000/${recipe.imagename}`} pt="65%"/>
            <div className="recipe-card-info">
                <p className="recipe-title">{recipe.title} </p>
                <p className="author">Author: {recipe.username}</p>
                <p className="recipe-desc">{recipe.description}</p>
                <p className="view-btn" onClick={handleClick}>VIEW RECIPE</p>
            </div>
        </div>
    )
}