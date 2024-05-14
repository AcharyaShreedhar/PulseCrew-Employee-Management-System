/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React from "react";
import heroImage from "../../../images/hero.png";
import "./Hero.css";

const Hero = () => {
  const hero = {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${heroImage})`,
  };
  return (
    <section style={hero} className="hero">
      <div className="overlay"></div>
      <div className="container content">
        <h1 className="hero-heading">Welcome to Employee Management System</h1>
        <p className="hero-description">
          Manage your employees efficiently with our PulseCrew.
        </p>
        <a href="/employees" className="btn btn-primary">
                  Get Started
                </a>
      </div>
    </section>
  );
};

export default Hero;
