/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/
import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!
    $lastName: String!
    $age: Int!
    $dateOfJoining: String!
    $title: String!
    $department: String!
    $employeeType: String!
  ) {
    createEmployee(
      firstName: $firstName
      lastName: $lastName
      age: $age
      dateOfJoining: $dateOfJoining
      title: $title
      department: $department
      employeeType: $employeeType
    ) {
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
    }
  }
`;
