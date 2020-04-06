import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Passwordrest from "./Passwordrest";

function Application() {
  // create a placeholder variable to represent the current user
  const user = null;
  return (user ? (
    <Profile />
  ) : (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/resetpw" component={Passwordrest} />
          {/* <Route path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  ));
}

export default Application;
