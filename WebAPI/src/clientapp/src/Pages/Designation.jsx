import { useState } from "react";
import { adddesignation } from "../services/DesignationService";

function AddDesignation() {
    const [form, setForm] = useState({
        name: "",
        code: "",
        department: "",
        level: "",
        status: "Active",
        description: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            Name: form.name,
            Code: form.code,
            Department: form.department,
            Level: form.level,
            IsActive: form.status === "Active",
            Description: form.description
        };

        try {
            await adddesignation(payload); // service method

            alert("Designation added successfully");
        }
        catch (error) {
            console.error(error);
            alert("Error saving designation");
        }
    };


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mt-3">
            <h3 className="fw-bold mb-4">Add Designation</h3>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label>Designation Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label>Designation Code</label>
                    <input
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label>Department</label>
                    <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label>Level</label>
                    <input
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label>Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmit}
                >
                    Save Designation
                </button>

            </div>
        </div>
    );
}

export default AddDesignation;
