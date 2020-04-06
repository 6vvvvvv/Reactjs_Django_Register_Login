import React from "react";
import Application from "./component/Application";
import UserProvider from "./providers/UserProvider";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
};

export default App;
