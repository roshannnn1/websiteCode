import React from "react";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";

export default function RecipesSection(props) {
  
  const [recipes, setRecipes] = useState([])

  let link = 'http://localhost:4000/api/recipe/all';

  if(props.private){
    link = 'http://localhost:4000/api/recipe/my'
  }

  useEffect(()=>{
    async function getRecipes(){
      try{
        const response = await fetch(link, {
          mode: 'cors',
          method: 'GET',
          credentials: 'include'
        });

        if(response.ok){
          console.log('ok')
          const data = await response.json()
          setRecipes(data.payload.recipes)
        }

      }catch(error){
        console.log('Error while fetching all blogs')
        console.log(error)
      }
    }

    getRecipes()

  }, [link])

  return (
    <div>
      <h1 className="recipe-header">{props.private ? 'Your Recipes':'Recipes'}</h1>
      <hr />
      <div className="recipes-container">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
