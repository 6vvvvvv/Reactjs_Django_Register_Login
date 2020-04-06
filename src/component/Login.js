import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import firebase from "firebase/app";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: null };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //google login provider
  signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  };

  signInWithGihub = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GithubAuthProvider();
    return auth.signInWithPopup(provider);
  };

  //ref https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
  signInWithEmailAndPasswordHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        var user = auth.currentUser;
        if (user) {
          alert("You have signed in");
          console.log(user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="card login">
        <div className="card-content">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <div className="row">
                <p>
                  Not registered?{" "}
                  <span>
                    <Link to="/register" className="redirect">
                      Create an account
                    </Link>
                  </span>
                </p>
              </div>
              <div className="row">
                <p>
                  <span>
                    <Link to="/resetpw" className="redirect">
                      Forgot Password?
                    </Link>
                  </span>
                </p>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect waves-light pink"
                  name="action"
                  onClick={this.signInWithEmailAndPasswordHandler}
                >
                  Signin
                  <i className="material-icons right">send</i>
                </button>
              </div>
              <div className="row">
                {/* import google signin api from firebase.js */}
                <button
                  className="btn waves-effect waves-light pink"
                  onClick={this.signInWithGoogle}
                >
                  Signin with google
                  <i className="material-icons right">send</i>
                </button>
              </div>

              <div className="row">
                {/* import github signin api from firebase.js */}
                <button
                  className="btn waves-effect waves-light pink"
                  onClick={this.signInWithGihub}
                >
                  Signin with Github
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
