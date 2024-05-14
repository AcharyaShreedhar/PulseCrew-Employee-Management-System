/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/


const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 20,
    max: 70,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    enum: ['Employee', 'Manager', 'Director', 'VP'],
    required: true,
  },
  department: {
    type: String,
    enum: ['IT', 'Marketing', 'HR', 'Engineering'],
    required: true,
  },
  employeeType: {
    type: String,
    enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'],
    required: true,
  },
  currentStatus: {
    type: Boolean,
    default: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
