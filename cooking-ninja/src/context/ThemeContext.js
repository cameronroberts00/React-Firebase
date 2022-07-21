import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
      
      case "CHANGE_MODE":
        return{...state, mode: action.payload};//chuck int new mode
    default:
      return state;
  }
};

//This functions makes a ThemeProvider component
//This component can be used to wrap other components to put them in the same context
//It accepts children as an argument so that any components within the wrapping are passed down as children props
//This means they are displayed as normal, just that now theyll be within the same context as whatever else this tag enwraps.
export function ThemeProvider({ children }) {
  //Grab the children from whatever this tag encapsulates

  //custom logic
  //   useReducer[(state, dispatch)] =
  //     (themeReducer,
  //     {
  //       color: "blue",
  //     });

  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58249c",
    mode: "dark",
  });

  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });//create a new action to change color
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
      {/* Show the children */}
    </ThemeContext.Provider>
  );
}
