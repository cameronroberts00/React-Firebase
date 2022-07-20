import "./Recipe.css";
import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function Recipe() {
  const { id } = useParams(); //grab id param from the app.js route fing (/:id) MUST match the name in Route part. this is whats int navbar
  const url = "http://localhost:3000/recipes/" + id; //affix to url

  const { data: recipe, isPending, error } = useFetch(url); //fetch request with the correct id

  return (
    <div className="recipe">
      {recipe && (
      <>
      <h2 className="page-title">{recipe.title}</h2>
      <p>Takes {recipe.cookingTime}</p>
      <ul >
        {/* map the ingredient array, calling each item an ing */}
        {recipe.ingredients.map(ing=><li key={ing}>{ing}</li>)}
      </ul>
      <p className="method">{recipe.method}</p>
      </>
      )}
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">Uh oh...{error}</p>}
    </div>
  );
}
