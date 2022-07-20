import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import Navbar from "./components/Navbar";
//styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/create">
            <Create></Create>
          </Route>
          <Route path="/search">
            <Search></Search>
          </Route>
          <Route path="/recipes/:id">
            <Recipe></Recipe>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
