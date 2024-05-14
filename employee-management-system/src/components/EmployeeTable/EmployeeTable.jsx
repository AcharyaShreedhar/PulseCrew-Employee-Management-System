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

import React from "react";
import { Link } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, tab }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = employees.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Employee Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee, index) => (
            <tr key={`${employee.firstName}-${employee.lastName}-${index}`}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>
                {new Date(
                  parseInt(employee.dateOfJoining)
                ).toLocaleDateString()}
              </td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.currentStatus ? "Working" : "Not Working"}</td>
              <td>
                <Link to={`/employees/${tab}/${employee._id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
        <div className="text-center d-flex justify-content-center">
          <Pagination className="mt-3">
            {[...Array(totalPages)].map((_, page) => (
              <Pagination.Item
                key={page}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
                style={{
                  backgroundColor:
                    page + 1 === currentPage ? "#28a745" : "#007bff",
                  color: "white",
                  border: "1px solid #dee2e6",
                  margin: "0 2px",
                  cursor: "pointer",
                }}
              >
                {page + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      <hr />
    </div>
  );
};

export default EmployeeTable;
