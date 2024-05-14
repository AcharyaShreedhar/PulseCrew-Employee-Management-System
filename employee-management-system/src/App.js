/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Core/Header/Header";
import Footer from "./components/Core/Footer/Footer";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import EmployeeContainer from "./containers/EmployeeContainer/EmployeeContainer";
import CreateEmployee from "./components/EmployeeCreate/CreateEmployee";
import EmployeeEdit from "./components/EmployeeEdit/EmployeeEdit";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route path="/employees/*" element={<EmployeeContainer />} />
        <Route exact path="/createemployees" element={<CreateEmployee />} />
        <Route path="/employees/:employeeId/edit" element={<EmployeeEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
