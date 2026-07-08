import { useState } from "react";
import { adddepartment } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        code: "",
        head: "",
        description: "",
        status: "Active"
    });
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!form.name.trim()) {
            validationErrors.name = "Department Name is required";
        }

        if (!form.code.trim()) {
            validationErrors.code = "Department Code is required";
        }
        if (!form.head.trim()) {
            validationErrors.head = "Department head is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            Name: form.name,
            Code: form.code,
            head: form.head,
            Description: form.description,
            IsActive: form.status === "Active",
        };
        try {
            await adddepartment(payload); // service method

            alert("Department added successfully");
            navigate("/departmentList");
        }
        catch (error) {
            console.error(error);
            alert("Error saving Department");
        }
    }


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mt-4">

            <h3 className="fw-bold mb-3">Department</h3>

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                    <div className="row g-3">

                        <div className="col-md-6">
                                <label>Department Name
                                    <span className="text-danger">*</span>
                                </label>
                                <input className="form-control"
                                    name="name"
                                    value={form.name}

                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <small className="text-danger">
                                        {errors.name}
                                    </small>
                                )}
                        </div>

                            <div className="col-md-6">
                                <label>Department Code
                                    <span className="text-danger">*</span></label>
                                <input className="form-control"
                                    name="code"
                                    value={form.code}
                                    onChange={handleChange} />
                                {errors.code && (
                                    <small className="text-danger">
                                        {errors.code}
                                    </small>
                                )}
                        </div>

                        <div className="col-md-6">
                                <label>Department Head
                                <span className="text-danger">*</span>
                                </label>
                                <input className="form-control"
                                    name="head"
                                    value={form.head}
                                    onChange={handleChange} />
                                {errors.head && (
                                    <small className="text-danger">
                                        {errors.head}
                                    </small>
                                )}
                        </div>

                   

                        <div className="col-md-6">
                            <label>Description</label>
                                <textarea 
                                    name="description"
                                    value={form.description}
                                    className="form-control"
                                    onChange={handleChange}
                                ></textarea>
                        </div>

                        <div className="col-md-6">
                        

                            <div className="d-flex gap-3 mt-2">

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                            value="Active"
                                            checked={form.status === "Active"}
                                            onChange={handleChange}
                                    />
                                    <label className="form-check-label">Active</label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                            value="Inactive"
                                            checked={form.status === "Inactive"}
                                            onChange={handleChange}
                                    />
                                    <label className="form-check-label">Inactive</label>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button className="btn btn-danger">Cancel</button>
                        <button className="btn btn-primary">Save Department</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
}

export default AddDepartment;