import { useState } from "react";
import { adddesignation } from "../services/DesignationService";
import { useNavigate } from "react-router-dom";
/*fetch department*/
import { useEffect } from "react";
import { getDepartments } from "../services/DepartmentService";
function AddDesignation() {
    const [form, setForm] = useState({
        name: "",
        code: "",
        department: "",
        level: "",
        status: "Active",
        description: ""
    });

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {

            const response = await getDepartments();
            console.log(response.data);
            setDepartments(response.data);
        } catch (error) {
            console.error("Error loading departments:", error);
        }
    };
  

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!form.name.trim()) {
            validationErrors.name = "Designation Name is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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
            navigate("/designationList");
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

        
                <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row gx-3 gy-3">
                <div className="col-md-6">
                                <label>
                                    Designation Name <span className="text-danger">*</span>
                                </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                                />
                                {errors.name && (
                                    <small className="text-danger">
                                        {errors.name}
                                    </small>
                                )}
                </div>

                            <div className="col-md-6">
                    <label>Designation Code</label>
                    <input
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                            <div className="col-md-6">
                                <label>Department</label>

                                <select
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">--Select--</option>

                                    {departments.map((dept) => (
                                        <option
                                            key={dept.id}
                                            value={dept.code}
                                        >
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                <div className="col-md-6">
                    <label>Level</label>
                    <input
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

            

                            <div className="col-md-12">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                            </div>


                            <div className="col-md-6">


                                <div className="d-flex gap-3 mt-2">

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            value="Active"
                                        />
                                        <label className="form-check-label">Active</label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            value="Inactive"
                                        />
                                        <label className="form-check-label">Inactive</label>
                                    </div>

                                </div>
                            </div>
                    </div>
               

                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="btn btn-success"*/}
                {/*    onClick={handleSubmit}*/}
                {/*>*/}
                {/*    Save Designation*/}
                        {/*        </button>*/}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button type="button" className="btn btn-danger">
                                Cancel
                            </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save Designation
                            </button>
                        </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default AddDesignation;
