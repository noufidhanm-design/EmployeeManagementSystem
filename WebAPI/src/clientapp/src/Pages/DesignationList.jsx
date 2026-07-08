
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { GetDesignation } from "../services/DesignationService";

function DesignationList() {
    const navigate = useNavigate();

    const [designation, setDesignation] = useState([]);
    useEffect(() => {
        fetchDesignations();
    }, []);

    const fetchDesignations = async () => {
        try {
            const response = await GetDesignation();
            setDesignation(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="card shadow-sm mb-4">
            {/* Card Header */}
            <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-semibold">Designation</h5>

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => navigate("/designations")}
                    >
                        + Add Designation
                    </button>
                </div>
            </div>
          
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">Designation List</div>
            <div className="card-body p-0">
                <table className="table table-hover table-bordered mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Department</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designation.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No designation Found
                                </td>
                            </tr>
                        ) : (
                            designation.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.department}</td>
                                    <td>{item.level}</td>
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
export default DesignationList;
