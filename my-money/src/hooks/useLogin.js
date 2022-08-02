import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email,password) => {
    setError(null);
    setIsPending(true);


    try {
      const res=await projectAuth.signInWithEmailAndPassword(email,password);

      //dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error);
        setError(error);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {//on unmount and mount, fire this cleanup function. this means the requests above in try/catch only get sent if we ARENT cancelled rn
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
