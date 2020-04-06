import React from "react";
import "./Profile.css";
import { auth } from "../firebase";

const Profile = () => {
  return (
    <div className="card profile">
      <div className="card-content">
        <p className="center">
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>
        <div>
          <button
            class="btn waves-effect waves-light pink"
            onClick={() => {
              auth.signOut()
            }}
          >
            Sign Out
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
