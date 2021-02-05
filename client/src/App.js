import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./main.scss";
//------COMPONENTS IMPORT-------
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./private/privateRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import RouteLinks from "./private/RouteLinks";
//////////////////////////////////////////
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <RouteLinks path="/" exact component={Home} />
        <RouteLinks path="/register" exact component={Register} />
        <RouteLinks path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}
//////////////////////////////////////////
export default App;
