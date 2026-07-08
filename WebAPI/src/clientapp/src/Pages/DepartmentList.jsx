import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDepartments } from "../services/DepartmentService";
function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await getDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">

            <h3 className="fw-bold mb-3">DepartmentList</h3>
            <div className="card shadow-sm mb-4">
                {/* Card Header */}
                <div className="card-header bg-white border-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold">Departments</h5>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate("/departments")}
                        >
                            + Add Department
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
                          
                            />
                        </div>

                        <div className="col-md-3">
                            <button
                                type="button"
                                className="btn btn-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Table */}
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">Department List</div>
                <div className="card-body p-0">
                    <table className="table table-hover table-bordered mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>DeptName</th>
                                <th>Code</th>
                                <th>DeptHead</th>
                           
                                <th>Status</th>
                                <th style={{ width: "150px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No Departments Found
                                    </td>
                                </tr>
                            ) : (
                                departments.map((dept, index) => (
                                    <tr key={index}>
                                        <td>{dept.name}</td>
                                        <td>{dept.code}</td>
                                        <td>{dept.head}</td>
                                        <td>{dept.isActive ? "Active" : "Inactive"}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary me-2">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
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

export default DepartmentList;