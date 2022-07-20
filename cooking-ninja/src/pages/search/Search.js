import "./Search.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

export default function Search() {
  const queryString = useLocation().search; //get where we are fromt nav

  const queryParams = new URLSearchParams(queryString); //turn it into params
  const query = queryParams.get("q"); //grab the value of the query parameter
  const url = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data}></RecipeList>}
      {data == "" && <p className="error">Couldn't find any recipes with {query}!</p>}
      {/* My own addition ^ if data is blank, there was no response. Tell user theres no item */}
    </div>
  );
}
