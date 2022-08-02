import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
        // waait for firebase auth to be ready, then if user is already logged in. add them to the context state fing
      return { ...state, user: action.payload, authIsReady:true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    // wait for auth is ready before we load owt (only render when authIsReady)
  });

  useEffect(() => {//onload, get the auth state (is de user alreddy logged in?)
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();//run once then unsub
    });
  }, []);
  //doing all the above just makes it so if the user logs in, then refreshes, they just get logged back in baso. Cause according to firebase, they havent acctually logged out

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
  // entire app is surrounded by the auth context provider
};
