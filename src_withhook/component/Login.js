import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../firebase.js";
import { auth } from "../firebase";

const Login = () => {
  // use hook firstname state empty and setFirstName method(function)
  //instead of setState in class, and we can even not bother defining onchangeHandler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const onSubmit = e => {
  //   alert("Success!");
  //   console.log(e.target.value);
  // };
  //firebase emailandpassword login method
  const signInWithEmailAndPasswordHandler = (e, email, password) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      alert("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  // use onChange={e=>{onChangeHandler(e)}} or define directly by using setXXX inline
  const onChangeHandler = e => {
    //DOM register event  e.currentTarget or e.target
    const { name, value } = e.currentTarget;
    if (name === "userEmail") setEmail(value);
    else if (name === "userPassword") setPassword(value);
  };

  return (
    <div className="card login">
      <div className="card-content">
        <div className="row">
          <form className="col s12">
            {/* <form className="col s12" onSubmit={onSubmit}> */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="userEmail"
                  value={email}
                  // onChange={e => setEmail(e.target.value)}
                  onChange={e=>onChangeHandler(e)}
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
                  name="userPassword"
                  value={password}
                  // onChange={e => setPassword(e.target.value)}
                  onChange={e=>onChangeHandler(e)}
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
                type="submit"
                name="action"
                onClick={e => {
                  signInWithEmailAndPasswordHandler(e, email, password)
                }}
              >
                Signin
                <i className="material-icons right">send</i>
              </button>
            </div>
            <div className="row">
              <button
                className="btn waves-effect waves-light pink"
                type="submit"
                name="action"
                onClick={()=>signInWithGoogle()}
              >
                Signin with google
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
