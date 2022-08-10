import React, { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [ingridients, setIngridients] = useState("");
  const [direction, setDirection] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    if (event.target.attributes.name.nodeValue === "title") {
      setTitle(value);
    }

    if (event.target.attributes.name.nodeValue === "description") {
      setDescription(value);
    }

    if (event.target.attributes.name.nodeValue === "ingridients") {
      setIngridients(value);
    }

    if (event.target.attributes.name.nodeValue === "directions") {
      setDirection(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try{

      const data = new FormData()
      
      data.append('title', title)
      data.append('description', description)
      data.append('file', file)
      data.append('ingridients', ingridients)
      data.append('directions', direction)

      const response = await fetch('/api/recipe/create', {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: data
      })

      if(response.ok){
        setTitle("")
        setDescription("")
        setIngridients("")
        setDirection("")
        window.alert("Blog Saved!")
      }else{
        const data = await response.json()
        console.log(data)
        window.alert(data.message)
      }

    }catch(error){
      console.log('Error while publishing Blog:')
      console.log(error)
    }
  }

  return (
    <>
      <div className="section create">
        <h1>Create Your Own Recipes</h1>
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <ul>
              <li>
                <label for="name">Recipe Name:</label>
                <input
                  value={title}
                  required="true"
                  type="text"
                  id="name"
                  name="title"
                  minLength={5}
                  onChange={handleChange}
                ></input>
              </li>
              <li>
                <label for="name">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  id="name"
                  name="file"
                  onChange={(event) => {
                    const value = event.target.files[0]
                    setFile(value)
                  }}
                ></input>
              </li>
              <li>
                <label for="name">Recipe Description:</label>
                <textarea
                  value={description}
                  className="description"
                  required="true"
                  minLength={10}
                  name="description"
                  placeholder="Recipe Description Here..."
                  onChange={handleChange}
                ></textarea>
              </li>
              <li>
                <label for="name">Ingridients:</label>
                <textarea
                  value={ingridients}
                  required="true"
                  minLength={20}
                  name="ingridients"
                  placeholder="eg 1.) Egg..."
                  onChange={handleChange}
                ></textarea>
              </li>
              <li>
                <label for="name">Directions:</label>
                <textarea
                  value={direction}
                  required="true"
                  minLength={20}
                  name="directions"
                  placeholder="eg Step 1.) Stir the egg ..."
                  onChange={handleChange}
                ></textarea>
              </li>
            </ul>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
