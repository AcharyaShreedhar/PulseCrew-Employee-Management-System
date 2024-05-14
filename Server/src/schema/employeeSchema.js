/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

const { gql } = require('apollo-server-express');

const employeeSchema = gql`
  type Employee {
    _id: ID!  
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean
  }

  type Query {
    employees: [Employee]!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      age: Int!
      dateOfJoining: String!
      title: String!
      department: String!
      employeeType: String!
    ): Employee,
    
  }
  
  
  type Mutation {
    updateEmployee(
      input: EmployeeInput!
    ): Employee
  }
  
  input EmployeeInput {
    employeeId: ID!
    title: String
    department: String
    currentStatus: Boolean
  }
  
  

  type Mutation {
    deleteEmployee(employeeId: ID!): Boolean
  }
`;

module.exports = employeeSchema;
