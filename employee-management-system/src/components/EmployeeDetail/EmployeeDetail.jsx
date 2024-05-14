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

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEE, DELETE_EMPLOYEE } from "../../apis/employeeApi";
import { Card, ListGroup, Button, Alert } from "react-bootstrap";
import "./EmployeeDetail.css";

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      navigate("/employees");
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data.employee;

  const handleEdit = () => {
    navigate(`/employees/${employeeId}/edit`);
  };

  const handleBack = () => {
    navigate(`/employees`);
  };

  const handleDelete = () => {
    if (employee.currentStatus) {
      setAlertVariant("danger");
      setAlertMessage("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
      setShowAlert(true);
    } else {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (confirmDelete) {
        deleteEmployee({ variables: { id: employeeId } });
        setAlertVariant("success");
        setAlertMessage("Employee deleted successfully");
        setShowAlert(true);
      }
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const calculateRetirementDate = (joinDate, retirementAge) => {
    const joinDateObj = new Date(parseInt(joinDate));

    if (isNaN(joinDateObj.getTime())) {
      return null;
    }

    const retirementDateObj = new Date(joinDateObj);
    retirementDateObj.setFullYear(joinDateObj.getFullYear() + retirementAge);

    if (isNaN(retirementDateObj.getTime())) {
      return null;
    }

    return retirementDateObj;
  };

  const calculateRemainingTime = (retirementDate) => {
    if (!retirementDate || isNaN(retirementDate.getTime())) {
      return null;
    }

    const currentDate = new Date();
    const remainingTime = retirementDate - currentDate;

    const years = Math.max(
      0,
      Math.floor(remainingTime / (365 * 24 * 60 * 60 * 1000))
    );
    const months = Math.max(
      0,
      Math.floor(
        (remainingTime % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
      )
    );
    const days = Math.max(
      0,
      Math.floor((remainingTime % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
    );

    return { years, months, days };
  };

  const retirementAge = 65;
  const ageAtJoining = employee.age;
  const retirementDate = calculateRetirementDate(
    employee.dateOfJoining,
    retirementAge - ageAtJoining
  );

  if (!retirementDate || isNaN(retirementDate.getTime())) {
    return (
      <div>
        <Alert variant="danger" show={true} onClose={() => {}} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>Invalid retirement date</p>
        </Alert>
      </div>
    );
  }

  const remainingTime = calculateRemainingTime(retirementDate);
  const isAlreadyRetired = employee.age > 65;

  return (
    <div>
      <Alert variant={alertVariant} show={showAlert} onClose={closeAlert} dismissible>
        <Alert.Heading>{alertVariant === "danger" ? "Error!" : "Success!"}</Alert.Heading>
        <p>{alertMessage}</p>
      </Alert>

      <div className="detailHeader">
        <Button variant="primary" onClick={handleBack}>
          Back
        </Button>
        <h2 className="detailTitle">Employee Details</h2>
      </div>
      <hr />

      <Card>
        <Card.Body>
          <Card.Title>
            {employee.firstName} {employee.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {employee.title}, {employee.department}
          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Age:</strong> {employee.age}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Date of Joining:</strong>{" "}
              {new Date(parseInt(employee.dateOfJoining)).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Employee Type:</strong> {employee.employeeType}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Current Status:</strong>{" "}
              {employee.currentStatus ? "Working" : "Not Working"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Retirement Status:</strong>{" "}
              {isAlreadyRetired ? "Already Retired" : "Not Retired Yet"}
            </ListGroup.Item>
            {!isAlreadyRetired && (
              <>
                <ListGroup.Item>
                  <strong>Retirement Date:</strong>{" "}
                  {retirementDate ? retirementDate.toLocaleDateString() : 'Invalid Date'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Remaining Time for Retirement:</strong>{" "}
                  {remainingTime ? `${remainingTime.years} years, ${remainingTime.months} months, ${remainingTime.days} days` : 'Invalid Remaining Time'}
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
          <div className="button-container">
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
