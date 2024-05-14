/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../images/Logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Employees
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="nav-link" to="/employees">
                  Employees List
                </Link>
                <Link className="nav-link" to="/createemployees">
                  Create Employees
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createemployees">
                Add Employee
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Payroll
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
