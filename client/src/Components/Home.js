import React, { useState, useEffect } from "react";

export default function Home() {

  const [lastEmployee, setLastEmployee] = useState("");
  const [totalSalary, setTotalSalary] = useState(0);
  const [countRecords, setCountRecords] = useState(0);

  useEffect(() => {

    // Fetch last registered employee
    fetch("http://localhost:3001/lastEmployee")
      .then((response) => response.json())
      .then((data) => setLastEmployee(data.result.eName));

    // Fetch total salary
    fetch("http://localhost:3001/totalSalary")
      .then((response) => response.json())
      .then((data) => setTotalSalary(data.totalSalary));

    // Fetch total employees using the /display endpoint and set countRecords
    fetch("http://localhost:3001/display")
      .then((response) => response.json())
      .then((data) => setCountRecords(data.count));
  }, []);

  return (
    <div className="m-4">
      <br/><br/><br/><br/>
      <main>
        <h2>Welcome to the Employee System</h2>
        <p>
          This system allows you to manage and track information about your
          employees. Get started by exploring the features below.
        </p>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Employees</h5>
                <p className="card-text">{countRecords}</p>
                <a href="/Display" className="btn btn-primary">
                  View All Employees
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">New Employees</h5>
                <p className="card-text">Last Registered Employee: {lastEmployee}</p>
                <a href="/Register" className="btn btn-primary">
                  Register New Employee
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Salary Overview</h5>
                <p className="card-text">Total Salary: {totalSalary} OMR</p>
                <a href="/Display" className="btn btn-primary">
                  View Salary Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
