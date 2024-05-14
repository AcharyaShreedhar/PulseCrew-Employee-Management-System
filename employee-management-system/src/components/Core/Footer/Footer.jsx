/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Shree Dhar Acharya 8899288 | Employee Management System(PulseCrew)
        </p>
      </div>
    </footer>
  );
};

export default Footer;