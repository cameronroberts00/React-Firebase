import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Article from "./pages/Article";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/about">
            About
          </NavLink>
          <NavLink exact to="/contact">
            Contact
          </NavLink>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/contact">
            <Contact></Contact>
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route path="/articles/:id">
            <Article></Article>
          </Route>
          <Route path="*">
            {/* could put 404 page here too */}
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
