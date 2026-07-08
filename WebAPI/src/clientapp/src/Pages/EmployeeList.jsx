



import { useState, useEffect } from "react";
import { getAllEmployees, searchEmployees, deleteEmployee } from "../services/employeeListService"; // we will use search API

import { useNavigate } from "react-router-dom";


function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchText, setSearchText] = useState(""); // input value
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ MOVE HERE

    useEffect(() => {
        loadEmployees();
    }, []);


    // inside EmployeeList component
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this employee?");
        if (!confirm) return;

        try {
            await deleteEmployee(id);
            alert("Employee deleted successfully");

            // Refresh list after delete
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error deleting employee");
        }
    };
    // Load all employees initially
    const loadEmployees = async () => {
        try {
            setLoading(true);
            const res = await getAllEmployees();
            if (res.data.status) {
                setEmployees(res.data.data);
            } else {
                setEmployees([]);
                alert(res.data.message);
            }
        } catch (error) {
            console.error("API error:", error);
            alert("Error fetching employees");
        } finally {
            setLoading(false);
        }
    };

    // Search employees by name/email
    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await searchEmployees(searchText); // your API service call
            if (res.data.status) {
                setEmployees(res.data.data);
            } else {
                setEmployees([]);
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("Error searching employees");
        } finally {
            setLoading(false);
        }
    };

  

  


    return (
        <div className="container mt-4">
            <h3 className="mb-4">Employee List</h3>

            {/* Search Card */}
            <div className="card shadow-sm mb-4">
                {/* Card Header */}
                <div className="card-header bg-white border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold">Employees</h5>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate("/employee")}
                        >
                            + Add Employee
                        </button>
                    </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-9">
                            <label className="form-label">Search</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name or email"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/*<div className="card shadow-sm mb-12">*/}
            {/*    <div className="col-md-6">*/}
            {/*    </div>*/}

            {/*    */}{/* Add Employee button */}
            {/*    <div className="col-md-6">*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="btn btn-success w-100"*/}
            {/*            onClick={() => navigate("/employee")}*/}
            {/*        >*/}
            {/*            Add Employee*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    <div className="card-body">*/}
            {/*        <div className="row align-items-end g-3">*/}
            {/*            <div className="col-md-8">*/}
            {/*                <label className="form-label">Search</label>*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    className="form-control"*/}
            {/*                    placeholder="Search by name or email"*/}
            {/*                    value={searchText}*/}
            {/*                    onChange={(e) => setSearchText(e.target.value)}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="col-md-4">*/}
            {/*                <button*/}
            {/*                    type="button"*/}
            {/*                    className="btn btn-primary w-100"*/}
            {/*                    onClick={handleSearch}*/}
            {/*                    disabled={loading}*/}
            {/*                >*/}
            {/*                    {loading ? "Searching..." : "Search"}*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Employee Table */}
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">Employee List</div>
                <div className="card-body p-0">
                    <table className="table table-hover table-bordered mb-0">
                        <thead className="table-light">
                            <tr>
                            <th>Profile</th>
                                <th>NAME</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th style={{ width: "150px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-3">
                                        {loading ? "Loading..." : "No employees found"}
                                    </td>
                                </tr>
                            ) : (
                                employees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>
                                            {emp.profilePhotoUrl ? (
                                                <img
                                                    src={`https://localhost:7142${emp.profilePhotoUrl}`}
                                                    alt="Profile"
                                                    width="50"
                                                    height="50"
                                                    style={{
                                                        borderRadius: "50%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.designation}</td>
                                        <td>{emp.salary}</td>
                                        <td>
                                            {emp.isActive ? (
                                                <span className="badge bg-success">Active</span>
                                            ) : (
                                                <span className="badge bg-danger">Inactive</span>
                                            )}
                                        </td>
                                        <td>
                                            {/*    <button className="btn btn-sm btn-primary me-2">Edit</button>*/}

                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() =>
                                                    navigate(`/employee/edit/${emp.id}`)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(emp.id)}
                                            >
                                                Delete
                                            </button>

                                           {/* <button className="btn btn-sm btn-danger">Delete</button>*/}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;

