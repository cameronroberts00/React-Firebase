import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign user out
    try {
      await projectAuth.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

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

  return { logout, error, isPending };
};
