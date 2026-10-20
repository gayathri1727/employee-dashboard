
import { useState } from "react";

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });

  const handleChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      `Employee details entered successfully!\nName: ${employee.name}`
    );

    setEmployee({
      name: "",
      designation: "",
      location: "",
      salary: "",
    });
  };

  return (
    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input
            className="form-control"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            name="location"
            value={employee.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            min="0"
            className="form-control"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
