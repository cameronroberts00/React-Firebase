import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar></Sidebar>}
          <div className="container">
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/">
                {/* check user is logged in before showing dash otherwise reroute em */}
                {!user && <Redirect to="/login"></Redirect>}
                {user && <Dashboard></Dashboard>}
              </Route>
              <Route path="/create">
                {!user && <Redirect to="/login"></Redirect>}
                {user && <Create />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login"></Redirect>}
                {user && <Project />}
              </Route>
              <Route path="/login">
                {!user && <Login />}
                {user && <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/signup">
                {!user && <Signup />}
                {user && <Redirect to="/"></Redirect>}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
