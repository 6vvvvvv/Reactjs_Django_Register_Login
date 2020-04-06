import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./component/Nav";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import Passwordrest from "./component/Passwordrest";
import "./App.css";
import {auth} from "./firebase"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user:null };
  }

  //Get the currently signed-in user
  //ref: https://firebase.google.com/docs/auth/web/manage-users
  componentDidMount=()=> {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  
  render() {
    return (
      // if successfully login then redirect to profile otherwise stay where it should be
      (this.state.user ? (
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
      ))
    );
  }
}

export default App;