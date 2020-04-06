import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { auth, generateUserDocument } from "../firebase";

const Resgister = () => {
  // use hook firstname state empty and setFirstName method instead of setState in class
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const onSubmit = () => alert("Success!");

  //FIXME:
  const createUserWithEmailAndPasswordHandler = async (e, email, password) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // if (user) {
        generateUserDocument(user, {displayName});
        // generateUserDocument(user, { email });
        alert("Success Register");
      // }
    } catch (error) {
      alert("Error Signing up with email and password");
    }
    //reset all the fields
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="card signup">
      <div className="card-content">
        <div className="row">
          <form
            className="col s12"
            onSubmit={e => {
              createUserWithEmailAndPasswordHandler(e, email, password);
            }}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="displayName"
                  type="text"
                  className="validate"
                  name="userDisplayname"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                />
                <label htmlFor="first_name">DisplayName (First/Last Name)</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="userEmail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
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
                onClick={e =>
                  createUserWithEmailAndPasswordHandler(e, email, password)
                }
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
};

export default Resgister;
