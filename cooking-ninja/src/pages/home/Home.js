import "./Home.css";
import React, { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
//import {useFetch} from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
export default function Home() {
  //const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsPending(true);
   const unsub = projectFirestore.collection("recipes").onSnapshot((snapshot) => {//everytime the data changes, re-call the getting func
      if (snapshot.empty) {
        setError("No recipes to load");
        setIsPending(false);
      } else {
        let results = []; //for each document int firestore create a new object
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results); //set the data to be the results. this is the json shit
        setIsPending(false);
      }
    },(err)=>{
      setError(err.message)
      setIsPending(false)
    });

    return()=>unsub(); //No idea how but this function calls itself and unsubs this func when it unmounts lol
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data}></RecipeList>}
    </div>
  );
}
