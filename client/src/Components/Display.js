import React, { useState, useEffect } from "react";
import Axios from "axios";
import UpdateForm from "./UpdateForm"; // Import the UpdateForm component

export default function Display() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = () => {
    Axios.get("http://localhost:3001/display")
      .then((response) => {
        setEmployees(response.data.employees);
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`http://localhost:3001/delete/${id}`);

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );

      console.log(response);
      alert(response.data.msg);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdate = (id) => {
    const employeeToUpdate = employees.find((employee) => employee._id === id);
    setSelectedEmployee(employeeToUpdate);
  };

  const handleUpdateSubmit = (updatedEmployee) => {
    // Assuming you have an update API endpoint
    Axios.put(`http://localhost:3001/update`, updatedEmployee)
      .then((response) => {
        console.log(response);
        alert(response.data.msg);
        fetchEmployees(); // Refresh the employee list after update
        setSelectedEmployee(null); // Clear the selected employee after update
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <div className="m-4 d-flex justify-content-center">
        
      <div>
      <br/><br/><br/><br/>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-borderless table-primary align-middle">
            
            <thead className="table-light">
              <caption>Employees</caption>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Phone</th>
                <th>Salary</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {employees.map((employee) => (
                <tr key={employee._id} className="table-primary">
                  <td scope="row">{employee.eID}</td>
                  <td>{employee.eName}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(employee._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>

        {selectedEmployee && (
          <UpdateForm
            employee={selectedEmployee}
            onUpdate={handleUpdateSubmit}
          />
        )}
      </div>
    </div>
  );
}
