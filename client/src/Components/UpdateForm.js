import React, { useState, useEffect } from "react";

const UpdateEmployee = ({ employee, onUpdate }) => {
  const [formData, setFormData] = useState({
    eID: employee.eID,
    eName: employee.eName,
    phone: employee.phone,
    salary: employee.salary,
  });

  useEffect(() => {
    setFormData({
      eID: employee.eID,
      eName: employee.eName,
      phone: employee.phone,
      salary: employee.salary,
    });
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="m-4">
      <main>
        <h2>Update Employee</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="eID" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="eID"
              name="eID"
              value={formData.eID}
              onChange={handleInputChange}
              readOnly // ID should not be updated
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eName" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="eName"
              name="eName"
              value={formData.eName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary (OMR)
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateEmployee;
