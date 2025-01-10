import React from "react";
import UserResult from "../components/users/UserResult";
import UserSearch from "../components/users/UserSearch";

const Home = ({ handleAlert }) => {
  return (
    <div>
      <UserSearch handleAlert={handleAlert} />
      <UserResult />
    </div>
  );
};

export default Home;
