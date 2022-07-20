import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {//default request is get
  //pass in url from wherever called
  const [data, setData] = useState(null); //holds data we receive
  const [isPending, setIsPending] = useState(false); //this is passed to triplist along with data so it knows when theres loadingh
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
  //  console.log(postData);
  };


  useEffect(() => {
    const controlller = new AbortController(); //add abord controller

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      //try and catch block works just like java
      //grab data in an async

      try {
        const res = await fetch(url, {...fetchOptions, signal: controlller.signal }); //add our abort controller
        //check for 404
        if (!res.ok) {
          //the response object we get if its not a 404 or whatever has res: ok as a value. obvs if its a 404 itll be like res: not ok. so we just if its ok
          throw new Error(res.statusText);
          //throwing an error here in the try automatically takes us to the catch. missing the setData malarkey
        }
        const json = await res.json();
        setIsPending(false);
        setData(json);
        setError(null); //reset error on success
      } catch (err) {
        if (err.name === "AbortError") {
          //check if cleanup function has fired
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data\n" + err.messsage);
          console.log("Error thrown\n" + err.message);
        }
      }
    };

 //    fetchData(); //invoke the fetchData function


    if(method==="GET"){
      fetchData();
    }
    if(method==="POST"&&options){
      fetchData(options);
    }

    //return a cleanup function
    return () => {
      controlller.abort(); //if the user has unmounted the component, abord the fetch
    };
  }, [url, options, method]); //URL dependency = watch for url change

  return { data: data, isPending, error, postData }; //return the data
};

//export default useFetch;//export the hook
