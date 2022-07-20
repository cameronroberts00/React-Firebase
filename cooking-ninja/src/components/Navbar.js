import './Navbar.css'
import Searchbar from './Searchbar'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar">
        <nav>
            <Link to="/"  className='brand'>
            <h1>Cooking ninjas</h1>
            </Link>
            <Searchbar></Searchbar>
            <Link to="/create">Create Recipe</Link>

        </nav>
    </div>
  )
}
