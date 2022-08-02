import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      //add display name to user
      await res.user.updateProfile({ displayName });

      //dispatch login action to log the user in after signup
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      //This cleanup func doesnt work either. isCancelled is always true
      // if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      // }
    }
    //i added this line to fix a bug where ispending was always true
    //this might actually end up causing a memory leak lol so if that happens its probably this guy's fault
    setIsPending(false);
  };

  useEffect(() => {
    return () =>  setIsCancelled(true);
    
  }, []);

  return { error, isPending, signup };
};
