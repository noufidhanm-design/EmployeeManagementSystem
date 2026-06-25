


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addEmployee, getEmployeeById, updateEmployee } from "../services/employeeService";

function Employee() {
    const { id } = useParams();          // 👈 detect edit
    const navigate = useNavigate();
    const isEdit = !!id;

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone: "",
        designation: "",
        salary: ""
    });

    // 🔹 Load employee when edit
    useEffect(() => {
        if (isEdit) {
            loadEmployee();
        }
    }, [id]);

    const loadEmployee = async () => {
        try {
            const res = await getEmployeeById(id);
            if (res.data.status) {
                setEmployee({
                    name: res.data.data.name,
                    email: res.data.data.email,
                    phone: res.data.data.phone,
                    designation: res.data.data.designation,
                    salary: res.data.data.salary
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 Input change
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    // 🔹 Save / Update
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employee.name || !employee.email) {
            alert("Name and Email are required");
            return;
        }

        const payload = {
            Name: employee.name,
            Email: employee.email,
            Phone: employee.phone,
            Designation: employee.designation,
            Salary: Number(employee.salary)
        };

        try {
            if (isEdit) {
                await updateEmployee(id, payload);
                alert("Employee updated successfully");
            } else {
                await addEmployee(payload);
                alert("Employee added successfully");
            }

            navigate("/employee-list");
        } catch (error) {
            console.error(error);
            alert("Error saving employee");
        }
    };
    return (
        <div className="container mt-4">

            {/* Header */}
            <div className="mb-4">
                <h3 className="fw-bold">
                    {isEdit ? "Edit Employee" : "Add Employee"}
                </h3>
                <p className="text-muted">
                    {isEdit ? "Update employee details" : "Create a new employee record"}
                </p>
            </div>

            {/* Card */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            {/* Name */}
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                />
                            </div>

                            {/* Email */}
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </div>

                            {/* Phone */}
                            <div className="col-md-6">
                                <label className="form-label">Phone</label>
                                <input
                                    className="form-control"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone"
                                />
                            </div>

                            {/* Designation */}
                            <div className="col-md-6">
                                <label className="form-label">Designation</label>
                                <input
                                    className="form-control"
                                    name="designation"
                                    value={employee.designation}
                                    onChange={handleChange}
                                    placeholder="Enter designation"
                                />
                            </div>

                            {/* Salary */}
                            <div className="col-md-12">
                                <label className="form-label">Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    placeholder="Enter salary"
                                />
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-light border"
                                onClick={() => navigate("/employee-list")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={`btn ${isEdit ? "btn-warning" : "btn-primary"}`}
                            >
                                {isEdit ? "Update Employee" : "Save Employee"}
                            </button>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    );

}

export default Employee;


