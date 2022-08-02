import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //this stop an endless loop in useEffect by telling react this coomponent isnt different on each reevaluatioon
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    //if we have a db query like a where (to find a specific user. run dis)
    if (query) {
      //the query is that array thing we did in Home.js. Its an array so spreading it just makes a normal query
      ref = ref.where(...query);
      //data sent back has to match query and the query is. does the user id match?
    }

    if(orderBy){
        ref=ref.orderBy(...orderBy)
    }

    //we get a snapshot when we first connect and when the store changes
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        }); //creates and fills an array for each doc

        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        //the second argument of a ssnapshot func is the error handling
        console.log(error);
        setError("Could not fetch data:\n "+error.message);
      }
    );

    //unsub event on unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
