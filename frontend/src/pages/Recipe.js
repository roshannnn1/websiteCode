import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AccountContext } from "../contexts/UserContext";

export default function Recipe() {

  const {user} = useContext(AccountContext)

  const { recipeid } = useParams();

  const [recipeDetail, setRecipeDetail] = useState({});

  const navigate = useNavigate();

  async function deleteRecipe() {
    try {
      const response = await fetch(
        `/api/recipe/delete?recipeid=${recipeid}`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Error while fetching comments");
      console.log(error.message);
    }
  }

  function handleDelete(){
    if(window.confirm("You Want to delete Recipe?")){
      deleteRecipe()
    }
  }

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(
          `/api/recipe/detail?recipeid=${recipeid}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (response.ok) {
          const rawData = await response.json();
          setRecipeDetail({ ...rawData.payload });
          console.log(rawData);
        } else {
          const rawData = await response.json();
          console.log(rawData.message);
        }
      } catch (error) {
        console.log("Error while fetching Recipe details");
        console.log(error);
      }
    }

    fetchRecipe();
  }, []);

  return (
    <div className="viewRecipe section">
      <div className="image">
        <img
          src={`/${recipeDetail.imagename}`}
          alt="omelete"
        ></img>
      </div>

      <div className="heading">
        <h1>{recipeDetail.title}</h1>
        <div>
          <div className="metadata">
            <p>Author: {recipeDetail.username}</p>
            <p>Date: {recipeDetail.datecreated}</p>
          </div>

          {user.userId === recipeDetail.userid ? <div className="delete" onClick={handleDelete}>Delete</div> : null}
        </div>
      </div>

      <div className="desc">{recipeDetail.description}</div>

      <div className="body">
        <h3>Ingredients</h3>
        <p>{recipeDetail.ingridients}</p>
      </div>

      <div className="body">
        <h3>Directions</h3>
        <p>{recipeDetail.directions}</p>
      </div>
    </div>
  );
}
