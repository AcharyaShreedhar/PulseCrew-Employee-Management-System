/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import EmployeeTable from "../EmployeeTable/EmployeeTable";

const EmployeeDirectory = ({
  filterEmployees,
  selectedType,
  setSelectedType,
  selectedTab,
  setSelectedTab,
  navigate,
}) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setFilteredEmployees(filterEmployees(selectedTab, selectedType));
  }, [filterEmployees, selectedTab, selectedType]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/employees/${tab.toLowerCase()}`);
  };

  return (
    <Container>
      <Row className="tableHeader">
        <Col md={6}>
          <h2>Employee Table</h2>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Button
            style={{ marginLeft: "auto", marginRight: "10px" }}
            variant={selectedTab === "All" ? "success" : "outline-success"}
            onClick={() => handleTabChange("All")}
          >
            All Employees
          </Button>{" "}
          <Button
            className="ml-3"
            variant={
              selectedTab === "upcoming-retirement"
                ? "success"
                : "outline-success"
            }
            onClick={() => handleTabChange("upcoming-retirement")}
          >
            Upcoming Retirement
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12} className="d-flex justify-content-start align-items-center">
          <Form.Group controlId="employeeTypeSelect" className="d-flex ml-3 mb-0">
            <Form.Label className="mr-5 w-100">Employee Type:</Form.Label>
            <Form.Control
            className="mr-5 w-100"
              as="select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Employees</option>
              <option value="FullTime">Full-Time Employees</option>
              <option value="PartTime">Part-Time Employees</option>
              <option value="Contract">Contract Employees</option>
              <option value="Seasonal">Seasonal Employees</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <EmployeeTable employees={filteredEmployees} tab={selectedTab} />
    </Container>
  );
};

export default EmployeeDirectory;
