/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <section className="dashboard my-5">
      <div className="container">
        <div className="row">
          {/* Employee Directory */}
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employee Directory</h5>
                <p className="card-text">View and manage employee data.</p>
                <a href="/employees" className="btn btn-primary">
                  Go to Directory
                </a>
              </div>
            </div>
          </div>

          {/* Employee Analytics */}
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employee Analytics</h5>
                <p className="card-text">
                  Visualize employee data with charts and graphs.
                </p>
                <a href="/" className="btn btn-primary">
                  View Analytics
                </a>
              </div>
            </div>
          </div>

          {/* Employee Tasks */}
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employee Tasks</h5>
                <p className="card-text">
                  Assign tasks and track employee progress.
                </p>
                <a href="/" className="btn btn-primary">
                  Manage Tasks
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
