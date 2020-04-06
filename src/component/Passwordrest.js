import React, { useState } from "react";
import "./Passwordrest.css";
import { Link } from "react-router-dom";
import {auth} from "../firebase"

const Passwordrest = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  const sendResetEmail = (e) => {
    e.preventDefault();
    //ref: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendpasswordresetemail
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        alert("Error resetting password");
      });
  };

  return (
    <div className="card reset">
      <div className="card-content">
        <div className="row">
          <form className="col s12">
          {emailHasBeenSent && (
            <div>
              <p>An email has been sent to you!</p>
            </div>
          )}
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="userEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <p>
                <span>
                  <Link to="/login" className="redirect">
                    Back to Login
                  </Link>
                </span>
              </p>
            </div>

            <div className="row">
              <button
                className="btn waves-effect waves-light pink"
                name="action"
                onClick={sendResetEmail}
              >
                Reset Password
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Passwordrest;
