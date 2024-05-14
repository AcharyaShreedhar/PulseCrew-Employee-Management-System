/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

const Employee = require('../models/Employee');

const employeeResolvers = {
  Query: {
    employees: async () => {
      try {
        const employees = await Employee.find();
        return employees.map((employee) => ({
          _id: employee._id.toString(),
          firstName: employee.firstName,
          lastName: employee.lastName,
          age: employee.age,
          dateOfJoining: employee.dateOfJoining,
          title: employee.title,
          department: employee.department,
          employeeType: employee.employeeType,
          currentStatus: employee.currentStatus,
        }));
      } catch (error) {
        throw new Error('Failed to fetch employees');
      }
    },
    employee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        return employee;
      } catch (error) {
        throw new Error('Failed to fetch employee details');
      }
    },
  },
  Mutation: {
    createEmployee: async (_, args) => {
      const { firstName, lastName, age, dateOfJoining, title, department, employeeType } = args;

      try {
        const newEmployee = new Employee({
          firstName,
          lastName,
          age,
          dateOfJoining,
          title,
          department,
          employeeType
        });
        const savedEmployee = await newEmployee.save();
        return savedEmployee;
      } catch (error) {
        console.error('Error creating employee:', error);
        throw new Error(`Failed to create employee: ${error.message}`);
      }
    },
    updateEmployee: async (_, { input }) => {
      const { employeeId, title, department, currentStatus } = input;
    
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          employeeId,
          {
            $set: {
              title,
              department,
              currentStatus,
            },
          },
          { new: true }
        );
    
        return updatedEmployee;
      } catch (error) {
        throw new Error('Failed to update employee');
      }
    },

    deleteEmployee: async (_, { employeeId }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        return !!deletedEmployee; 
      } catch (error) {
        throw new Error('Failed to delete employee');
      }
    },
  },
};

module.exports = employeeResolvers;
