import React, { useState } from "react";

export default function Register() {
  // State to store form data
  const [formData, setFormData] = useState({
    eID: "",
    eName: "",
    phone: "",
    salary: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Record Successfully Added!");
        // Optionally, reset the form after successful submission
        setFormData({
          eID: "",
          eName: "",
          phone: "",
          salary: "",
        });
      } else {
        console.error("Failed to add record:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="m-4">
      <br /><br /><br /><br /><br /><br />
      <main>
        <h2>Register Employee</h2>
        <form onSubmit={handleSubmit}>
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
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
