import React, { Component } from "react";
import "./Profile.css";
import { auth } from "../firebase";

class Profile extends Component {
  render() {
    return (
      <div className="card profile">
        <div class="card-image">
          <img src={require("./img/profile.jpg")} alt="profile" />
          <span class="card-title">Card Title</span>
        </div>
        <div className="card-content">
          <div>
            <p>Congrad! You have login in!</p>
          </div>
          <div>
            <button
              className="btn waves-effect waves-light pink cbtn"
              //ref :https://firebase.google.com/docs/auth/web/password-auth
              onClick={() => {
                auth
                  .signOut()
                  .then(() => {
                    var user = auth.currentUser;
                    //if user has successfully check out
                    if (!user) {
                      alert("You have signed out");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    alert("An error happened.");
                  });
              }}
            >
              Sign Out
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
