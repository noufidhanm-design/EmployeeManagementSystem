import { useState } from "react";

function AddDepartment() {
    const [form, setForm] = useState({
        name: "",
        code: "",
        head: "",
        description: "",
        status: "Active"
    });

    return (
        <div className="container mt-3">
            <h3 className="fw-bold mb-4">Add Department</h3>
            <div className="row">
            <div className="col-md-6 mb-3">
                <label>Department Name</label>
                <input className="form-control" />
         </div>
                <div className="col-md-6 mb-3">

        
                <label>Department Code</label>
                <input className="form-control" />
            </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                <label>Department Head</label>
                <input className="form-control" />
            </div>

                <div className="col-md-6 mb-3">
                <label>Description</label>
                <textarea className="form-control"></textarea>
            </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                <label>Status</label>
                <select className="form-control">
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                </div>
            </div>

            <button className="btn btn-success">
                Save Department
            </button>
        </div>
    );
}

export default AddDepartment;