/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React from 'react';
import './SnackBar.css';

const Snackbar = ({ message, success, show }) => {
  return (
    <div className={`snackbar ${success ? 'success' : 'error'} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Snackbar;
