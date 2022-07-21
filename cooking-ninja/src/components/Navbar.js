import "./Navbar.css";
import Searchbar from "./Searchbar";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";
export default function Navbar() {
  //const{color}=useContext(ThemeContext)//this returns whatever the value prop is in the context
  const { color } = useTheme(); //^ we turned this into a hook

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking ninjas</h1>
        </Link>
        <Searchbar></Searchbar>
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
