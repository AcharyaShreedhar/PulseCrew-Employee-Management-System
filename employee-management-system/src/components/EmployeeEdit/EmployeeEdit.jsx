/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEE, UPDATE_EMPLOYEE } from "../../apis/employeeApi";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Snackbar from "../Core/SnackBar/SnackBar";
import './EmployeeEdit.css'

const EmployeeEdit = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId },
  });

  const handleBack = () => {
    navigate(`/employees/${employeeId}`);
  };

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

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
    currentStatus: true,
  });

  React.useEffect(() => {
    if (!loading && data && data.employee) {
      setEmployeeInfo(data.employee);
    }
  }, [loading, data]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmployeeInfo((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked,
        };
      }

      const updatedValue =
        name === "dateOfJoining" ? new Date(value).getTime() : value;

      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateEmployee({
        variables: {
          input: {
            employeeId: employeeId,
            title: employeeInfo.title,
            department: employeeInfo.department,
            currentStatus: employeeInfo.currentStatus,
          },
        },
      });

      if (data.updateEmployee) {
        setShowSnackbar(true);
        setSnackbarMessage("Employee updated successfully!");
        setSnackbarSuccess(true);
        navigate(`/employees/${employeeInfo.employeeType}/${employeeId}`);
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackbarMessage("Failed to update employee. Please try again.");
      setSnackbarSuccess(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="create-form container">
      <Snackbar
        message={snackbarMessage}
        success={snackbarSuccess}
        show={showSnackbar}
      />
      <Card>
        <Card.Body>
          <div className="editHeader">
            <Button variant="primary" onClick={handleBack}>
              Back
            </Button>
            <h2 className="editTitle">Edit Employee</h2>
          </div>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                value={employeeInfo.firstName}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                value={employeeInfo.lastName}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="number"
                value={employeeInfo.age}
                min="20"
                max="70"
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formDateOfJoining">
              <Form.Label>Date Of Joining:</Form.Label>
              <Form.Control
                type="text"
                value={new Date(
                  parseInt(employeeInfo.dateOfJoining)
                ).toLocaleDateString()}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
               name="title"
                as="select"
                value={employeeInfo.title}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDepartment">
              <Form.Label>Department:</Form.Label>
              <Form.Control
               name="department"
                as="select"
                value={employeeInfo.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEmployeeType">
              <Form.Label>Employee Type:</Form.Label>
              <Form.Control
                as="select"
                value={employeeInfo.employeeType}
                disabled
              >
                <option value="">Select Employee Type</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCurrentStatus">
              <Form.Check
               name="currentStatus"
                type="checkbox"
                label="Working"
                checked={employeeInfo.currentStatus}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Employee
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeEdit;

