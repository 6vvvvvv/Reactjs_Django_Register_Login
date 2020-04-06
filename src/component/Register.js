import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { auth, firestore } from "../firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { displayName: "", email: "", password: "" };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createUserWithEmailAndPasswordHandler = async(e) => {
    //It must apply async here otherwise it can not sync displayName property
    e.preventDefault();
    await auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        // create an account and add to firebase database
        //ref: https://firebase.google.com/docs/database/web/read-and-write
        //ref: https://firebase.google.com/docs/auth/web/manage-users
        // verify successfully create an account
        var user = auth.currentUser;

        if (user) {
          // if it exits then turn into cloud firebase and create
          //collection and doc in order to store the info in DB
          const userRef = firestore.doc(`users/${user.uid}`);
          const snapshot = userRef.get();
          //get document field if empty then create when signup
          //ref: https://firebase.google.com/docs/firestore/manage-data/add-data
          if (!snapshot.exists) {
            userRef.set({
              email: user.email,
            });
            console.log("Info has been stored in Database");
            // use update to push displayName into DB
          }
        }
      })
      .then(() => {
        var user = auth.currentUser;

        if (user) {
          // if it exits then turn into cloud firebase and create
          //collection and doc in order to store the info in DB
          const userRef = firestore.doc(`users/${user.uid}`);
          const snapshot = userRef.get();
          //get document field if empty then create when signup
          //ref: https://firebase.google.com/docs/firestore/manage-data/add-data
          if (!snapshot.exists) {
            userRef.update({
              displayName: this.state.displayName,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //empty the input fields
    this.setState({
      displayName: "",
      email: "",
      password: "",
    });
  };
  render() {
    return (
      <div className="card signup">
        <div className="card-content">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="displayName"
                    type="text"
                    className="validate"
                    name="displayName"
                    value={this.state.displayName}
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="first_name">
                    DisplayName (First/Last Name)
                  </label>
                </div>
              </div>

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
                  Already registered?{" "}
                  <span>
                    <Link to="/login" className="redirect">
                      Sign In
                    </Link>
                  </span>
                </p>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect waves-light pink"
                  name="action"
                  //important like this way otherwise insivible for button until e happen
                  onClick={(e)=>{this.createUserWithEmailAndPasswordHandler(e)}}
                >
                  Signup
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

export default Register;
