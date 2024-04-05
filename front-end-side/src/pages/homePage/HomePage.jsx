import React from "react";
import "./homePage.css";
import LoginPage from "../LoginPage";
const HomePage = () => {
  return (
    <div className="">
      <header className="home-header">
        <div className="container">
          <div className="home-header-logo"></div>
        </div>
      </header>
      <div className="container-fluid home-body">
        <div className="row h-svh">
          <div className="home-body-left col-12 col-lg-6">
            <div className="home-body-content lg:text-5xl sm:text-4xl mt-100px">
              <h1>HPT EVENT</h1>
              <h2>Giải Pháp AI Camera </h2>
            </div>

          </div>
          <div className="home-body-right col-12 col-lg-6">
            <LoginPage/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
