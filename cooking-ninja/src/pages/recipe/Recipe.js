import "./Recipe.css";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function Recipe() {
  const { id } = useParams(); //grab id param from the app.js route fing (/:id) MUST match the name in Route part. this is whats int navbar
  // const url = "http://localhost:3000/recipes/" + id; //affix to url

  // const { data: recipe, isPending, error } = useFetch(url); //fetch request with the correct id

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
          console.log(doc.data);
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });
    return () => unsub();
  }, [id]);

  const { mode } = useTheme();

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something diffo",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime}</p>
          <ul>
            {/* map the ingredient array, calling each item an ing */}
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">Uh oh...{error}</p>}
    </div>
  );
}
