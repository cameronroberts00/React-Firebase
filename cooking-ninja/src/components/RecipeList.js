import React from "react";
import "./RecipeList.css";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function RecipeList({ recipes }) {
  const{mode}=useTheme();
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
       <div key={recipe.title} className={`card ${mode}`}>
        <h3>{recipe.title}</h3>
        <p>{recipe.cookingTime} to make</p>
        <div>{recipe.method.substring(0,100)}...</div>
        <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
       </div> 
      ))}
    </div>
  );
}
