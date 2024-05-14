/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../../apis/addEmployee";
import Snackbar from "../Core/SnackBar/SnackBar";
import { Form, Button, Col } from "react-bootstrap";
import "./CreateEmployee.css";

const getMaxDate = () => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());
  return maxDate.toISOString().split('T')[0];
};

const CreateEmployee = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: "",
  });

  const [addEmployee] = useMutation(ADD_EMPLOYEE);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const processedValue = name === "age" ? parseInt(value, 10) : value;

    setEmployeeInfo({
      ...employeeInfo,
      [name]: processedValue,
    });
  };

  const currentDate = new Date();
  const chosenDate = new Date(employeeInfo.dateOfJoining);

  // Validate that the chosen date is within the current date only
  // This is just the assumption we can restrict as per the requirement of the project scope
  if (chosenDate > getMaxDate()) {
    alert('Date of joining cannot be more than 1 years from the current date.');
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validAge = parseInt(employeeInfo.age, 10);
    if (isNaN(validAge) || validAge < 20 || validAge > 70) {
      alert("Age must be a number between 20 and 70.");
      return;
    }

    const validTitle = ["Employee", "Manager", "Director", "VP"].includes(
      employeeInfo.title
    );
    if (!validTitle) {
      alert("Title is not valid.");
      return;
    }

    const validDepartment = ["IT", "Marketing", "HR", "Engineering"].includes(
      employeeInfo.department
    );
    if (!validDepartment) {
      alert("Department is not valid.");
      return;
    }

    const validEmployeeType = [
      "FullTime",
      "PartTime",
      "Contract",
      "Seasonal",
    ].includes(employeeInfo.employeeType);
    if (!validEmployeeType) {
      alert("Employee type is not valid.");
      return;
    }

    const employeeData = {
      ...employeeInfo,
    };

    addEmployee({ variables: employeeData })
      .then((response) => {
        setShowSnackbar(true);
        setSnackbarMessage("Employee added successfully!");
        setSnackbarSuccess(true);
      })
      .catch((error) => {
        setShowSnackbar(true);
        setSnackbarMessage("Failed to add employee. Please try again.");
        setSnackbarSuccess(false);
      });
  };

  return (
    <div className="create-form container">
      <Snackbar
        message={snackbarMessage}
        success={snackbarSuccess}
        show={showSnackbar}
      />
      <h2 className="mb-3">Create Employee</h2>
      <hr />

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={employeeInfo.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={employeeInfo.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAge">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={employeeInfo.age}
            onChange={handleChange}
            min="20"
            max="70"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDateOfJoining">
          <Form.Label>Date Of Joining:</Form.Label>
          <Form.Control
            type="date"
            name="dateOfJoining"
            value={employeeInfo.dateOfJoining}
            onChange={handleChange}
            max={getMaxDate()}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            as="select"
            name="title"
            value={employeeInfo.title}
            onChange={handleChange}
            required
          >
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDepartment">
          <Form.Label>Department:</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={employeeInfo.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmployeeType">
          <Form.Label>Employee Type:</Form.Label>
          <Form.Control
            as="select"
            name="employeeType"
            value={employeeInfo.employeeType}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee Type</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" className="btn btn-primary mt-5 w-25">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateEmployee;
