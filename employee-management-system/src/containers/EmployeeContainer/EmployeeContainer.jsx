/*
    ---------------------------------------------------
    Team Lead  : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    Group       : 4
    Members     : Sahu, Prashant, Singh, Abhijit
    ----------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeDirectory from "../../components/EmployeeDirectory/EmployeeDirectory";
import EmployeeDetail from "../../components/EmployeeDetail/EmployeeDetail";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "../../apis/employeeApi";
import "../../components/EmployeeTable/EmployeeTable.css";
import "./EmployeeContainer.css";

const EmployeeContainer = () => {
  const navigate = useNavigate();
  const { type, tab = "All" } = useParams();

  const [selectedType, setSelectedType] = useState(type || "All");
  const [selectedTab, setSelectedTab] = useState(tab || "All");
  const [employees, setEmployees] = useState([]);
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (data && data.employees) {
      setEmployees(data.employees);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to calculate retirement date
  const calculateRetirementDate = (joinDate, retirementAge) => {
    console.log("joinDate", joinDate);
    const joinDateObj = new Date(parseInt(joinDate)); // Converting to integer
    console.log("joinDateObj", joinDateObj);

    // Checking if joinDateObj is a valid date
    if (isNaN(joinDateObj.getTime())) {
      console.error("Invalid joinDate:", joinDate);
      return null; 
    }

    const retirementDateObj = new Date(joinDateObj);
    retirementDateObj.setFullYear(joinDateObj.getFullYear() + retirementAge);
    console.log("retirementDateObj", retirementDateObj);

    // Checking if retirementDateObj is a valid date
    if (isNaN(retirementDateObj.getTime())) {
      console.error("Invalid retirementDate:", retirementDateObj);
      return null; 
    }

    return retirementDateObj;
  };

  const filterUpcomingRetirement = () => {
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    console.log("sixMonthsFromNow", sixMonthsFromNow);

    const data = employees.filter((employee) => {
      if (employee.age < 65) {
        const retirementDate = calculateRetirementDate(
          employee.dateOfJoining,
          65 - employee.age
        );

        console.log("retirementDate", retirementDate);
        return retirementDate && retirementDate <= sixMonthsFromNow;
      }
    });
    console.log("data", data);

    return data;
  };

  const filterEmployees = (tab, type) => {
    if (tab == "upcoming-retirement") {
      const retirementData = filterUpcomingRetirement();
      console.log("retirementData", retirementData);
      if (type !== "All") {
        return retirementData.filter(
          (employee) => employee.employeeType === type
        );
      }
      return retirementData;
    } else {
      if (type !== "All") {
        return employees.filter((employee) => employee.employeeType === type);
      }
      return employees;
    }
  };

  console.log("emplyees beforerender", employees);

  return (
    <div className="EmployeeTable">
      <Routes>
        <Route
          path="/"
          element={
            <EmployeeDirectory
              filterEmployees={filterEmployees}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/:tab?"
          element={
            <EmployeeDirectory
              filterEmployees={filterEmployees}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              navigate={navigate}
            />
          }
        />
        <Route path="/:tab/:employeeId" element={<EmployeeDetail />} />
      </Routes>
    </div>
  );
};

export default EmployeeContainer;
