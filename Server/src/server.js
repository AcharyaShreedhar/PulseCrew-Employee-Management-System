/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/


const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./db/db");
const employeeSchema = require("./schema/employeeSchema");
const employeeResolvers = require("./resolvers/employeeResolvers");

const server = new ApolloServer({
  typeDefs: employeeSchema,
  resolvers: employeeResolvers,
  playground: true,
});

const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(
      `GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

connectDB();
startServer().catch((error) => console.error(error));
