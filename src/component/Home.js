import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
      <div>
        <h1 className="center-align center white-text text-darken-2">Hello!!</h1>
      </div>
      <div>
        <h5 className="white-text text-darken-2"> Try top-right conner yourself!</h5>
      </div>
    </div>
  );
};

export default Home;
