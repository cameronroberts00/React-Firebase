import "./Create.css";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, method, cookingTime,ingredients);
  const doc= {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes"
    }

    try {
      await projectFirestore.collection('recipes').add(doc);
      history.push('/')
    } catch (error) {
      console.log(error);
    }

  };

  //when the data changes, chuck the user back ont homepage
  //the data will change becausse the post request does actually return us smt. we not gonna use it we jsut gunna use it as a sign that the request got sent
  // useEffect(() => {
  //   if (data) {
  //     history.push("/");
  //   }
  // }, [data]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      //if theres an ing, ie, users entered smt - does the array contain the current ingredient? no? ok chuck it in
      setIngredients((prevIngredients) => [...prevIngredients, ing]); //make a new array, spread in the old ingreedients then chuck int newens
    }
    setNewIngredient(""); //reset field
    ingredientInput.current.focus(); //rehighlight the input field
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            //above, we get access to an eveent object which is the fact someones written smt
            value={title}
            // above sets up a 2 way bind coz now if the state changes dis does too
            required
          />
        </label>
        <label>
          <span>Ingredients: </span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput} //assign this as ingredientinput so we can reselect it in the handler func afteer an add
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient}, </em>
          ))}
        </p>
        {/* loop current ingredies then show em */}

        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
