


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addEmployee, getEmployeeById, getNextEmployeeId, updateEmployee } from "../services/employeeService";
import { getDepartments } from "../services/DepartmentService";
import { GetDesignation } from "../services/DesignationService";

function Employee() {

    const { id } = useParams();          // 👈 detect edit
    const navigate = useNavigate();
    const isEdit = !!id;



    const [employee, setEmployee] = useState({
        EmpId: "",
        name: "",
        email: "",
        phone: "",
        designation: "",
        salary: "",
        department: "",
        profilePhotoFile: null,
        imagePreview: "",
        isActive: true,
        dob: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        address: "",
        joinDate: "",
        allowance:""
        
    });


    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        loadDepartments();
    }, []);

    //load employee id

    const loadDepartments = async () => {
        try {

            const response = await getDepartments();
            console.log(response.data);
            setDepartments(response.data);
        } catch (error) {
            console.error("Error loading departments:", error);
        }
    };
    useEffect(() => {
        loadNextEmployeeId();
    }, []);

    const loadNextEmployeeId = async () => {
        try {
            const res = await getNextEmployeeId();

            setEmployee(prev => ({
                ...prev,
                EmpId: res.data.employeeId
            }));

        } catch (error) {
            console.error("Error loading Employee ID:", error);
        }
    };

    //load designation
    const [designations, setDesignations] = useState([]);
    useEffect(() => {
        loadDesignations();
    }, []);

    const loadDesignations = async () => {
        try {

            const response = await GetDesignation();
            console.log(response.data);
            setDesignations(response.data);
        } catch (error) {
            console.error("Error loading Designation:", error);
        }
    };

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
    //const payload = {
    //    EmpId: employee.EmpId,
    //    Name: employee.name,
    //    Email: employee.email,
    //    Phone: employee.phone,
    //    Designation: employee.designation,
    //    Department: employee.department,

    //    Salary: Number(employee.salary),
    //    Allowance: Number(employee.allowance),

    //    IsActive: employee.isActive,

    //    Dob: employee.dob,
    //    Gender: employee.gender,
    //    MaritalStatus: employee.maritalStatus,
    //    Nationality: employee.nationality,
    //    Address: employee.address,

    //    JoinDate: employee.joinDate,
    //    ProfilePhoto:employee.profilePhotoFile
    //};



    // 🔹 File change
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setEmployee(prev => ({
                ...prev,
                profilePhotoFile: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    // 🔹 Save / Update
    const buildFormData = () => {
        const formData = new FormData();

        formData.append("EmpId", employee.EmpId);
        formData.append("Name", employee.name);
        formData.append("Email", employee.email);
        formData.append("Phone", employee.phone);
        formData.append("Designation", employee.designation);
        formData.append("Department", employee.department);

        formData.append("Salary", employee.salary || 0);
        formData.append("Allowance", employee.allowance || 0);

        formData.append("IsActive", employee.isActive);

        formData.append("DOB", employee.dob || "");
        formData.append("JoinDate", employee.joinDate || "");

        formData.append("Gender", employee.gender || "");
        formData.append("MaritalStatus", employee.maritalStatus || "");

        formData.append("Nationality", employee.nationality || "");
        formData.append("Address", employee.address || "");

        if (employee.profilePhotoFile) {
            formData.append("ProfilePhotoFile", employee.profilePhotoFile);
        }

        return formData;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employee.name || !employee.email) {
            alert("Name and Email are required");
            return;
        }

        const formData = buildFormData(); // 🔥 IMPORTANT FIX

        try {
            if (isEdit) {
                await updateEmployee(id, formData);
                alert("Employee updated successfully");
            } else {
                await addEmployee(formData);
                alert("Employee added successfully");
            }

            navigate("/employee-list");
        } catch (error) {
            console.error(error);
            alert("Error saving employee");
        }
    };
   
    return (
        <div className="employee-form">
        
         
            <div className="mb-1">
                <h5 className="fw-bold mb-0">
                    {isEdit ? "Edit Employee" : "Add Employee"}
                </h5>
                <small className="text-muted">
                    {isEdit ? "Update employee details" : "Create a new employee record"}
                </small>
            </div>

            {/* Card */}
            <div className="card shadow-sm border-0">
                <div className="card-body py-2">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-2">
                            <div className="card-header py-2 bg-light">
                                <h6 className="mb-0 fw-semibold">
                                    Personal Information
                                </h6>
                            </div>
                            {/* Left Side */}
                            <div className="col-lg-9">
                                <div className="row g-2">

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>
                                            Full Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="name"
                                            value={employee.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>
                                            Email Address <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="email"
                                            value={employee.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>
                                            Phone Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="phone"
                                            value={employee.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="dob"
                                            value={employee.dob}
                                          
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>Gender</label>
                                        <select
                                            className="form-select"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="gender"
                                            value={employee.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>Marital Status</label>
                                        <select
                                            name="maritalStatus" className="form-select"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            value={employee.maritalStatus}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Marital Status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>Nationality</label>
                                        <input
                                            className="form-control"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="nationality"
                                            onChange={handleChange}
                                            value={employee.nationality}
                                            placeholder="Enter nationality"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold mb-1"
                                            style={{ fontSize: "14px" }}>Address</label>
                                        <input
                                            className="form-control"
                                            style={{ height: "36px", fontSize: "14px" }}
                                            name="address"
                                            onChange={handleChange}
                                            value={employee.address}
                                            placeholder="Enter address"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Right Side - Photo */}
                            <div className="col-lg-3 text-center">

                                <label className="form-label fw-semibold">
                                    Profile Photo
                                </label>

                                <div
                                    className="border rounded p-2 mb-2"
                                    style={{
                                        width: "180px",
                                        height: "180px",
                                        margin: "0 auto",
                                        overflow: "hidden",
                                        background: "#f8f9fa"
                                    }}
                                >
                                    <img
                                        src={
                                            employee.imagePreview ||
                                            "https://via.placeholder.com/180x180?text=Photo"
                                        }
                                        alt="Profile"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>

                                <input
                                    type="file"
                                    className="form-control"
                                    style={{ height: "36px", fontSize: "14px" }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                            </div>
                          
                 

                            {/* LEFT SECTION - Employment Info */}
                            <div className="col-md-6">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-light">
                                        <h6 className="mb-0 fw-semibold">
                                            Employment Information
                                        </h6>
                                    </div>

                                    <div className="card-body py-2">
                                        <div className="row g-2">

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold mb-1"
                                                    style={{ fontSize: "14px" }}>Employee ID</label>
                                                <input
                                                    className="form-control"
                                                    style={{ height: "36px", fontSize: "14px" }}
                                                    name="employeeId"
                                                    value={employee.EmpId}
                                                    disabled   // ⭐ IMPORTANT FIX
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold mb-1">Department</label>

                                                <select
                                                    name="department"
                                                    value={employee.department}
                                                    onChange={handleChange}
                                                    className="form-select"
                                                    style={{ height: "36px", fontSize: "14px" }}
                                                >
                                                    <option value="">Select Department</option>

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
                                                <label className="form-label fw-semibold mb-1"
                                                    style={{ fontSize: "14px" }}>Designation</label>
                                                <select
                                                    className="form-select"
                                                    style={{ height: "36px", fontSize: "14px" }}
                                                    name="designation"
                                                    value={employee.designation}
                                                    onChange={handleChange}
                                                  >
                                                <option value="">Select Designation</option>

                                                {designations.map((des) => (
                                                    <option
                                                        key={des.id}
                                                        value={des.code}
                                                    >
                                                        {des.name}
                                                    </option>
                                                     
                                                ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold mb-1"
                                                    style={{ fontSize: "14px" }}>Join Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    style={{ height: "36px", fontSize: "14px" }}
                                                    name="joinDate"
                                                    value={employee.joinDate}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">

                                    <div className="form-check form-switch m-0">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            name="status"
                                            checked={employee.status}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
                                                    isActive: e.target.checked
                                                })
                                            }
                                        />
                                    </div>

                                    <span
                                        className={`badge px-3 py-2 ${employee.isActive ? "bg-success" : "bg-danger"
                                            }`}
                                        style={{ fontSize: "13px" }}
                                    >
                                        {employee.isActive ? "Active Employee" : "Inactive Employee"}
                                    </span>
                                </div>
                            </div>

                            {/* RIGHT SECTION - Salary Info */}
                            <div className="col-md-6">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-light">
                                        <h6 className="mb-0 fw-semibold">
                                            Salary Information
                                        </h6>
                                    </div>
                                    <div className="card-body py-2">
                                        <div className="row g-2">

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold mb-1"
                                                    style={{ fontSize: "14px" }}>Basic Salary</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    style={{ height: "36px", fontSize: "14px" }}
                                                    name="salary"
                                                    value={employee.salary}
                                                    onChange={handleChange}
                                                    placeholder="Enter salary"
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold mb-1"
                                                    style={{ fontSize: "14px" }}>Allowance</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    style={{ height: "36px", fontSize: "14px" }}
                                                    name="allowance"
                                                    value={employee.allowance}
                                                    onChange={handleChange}
                                                    placeholder="Enter allowance"
                                                />
                                            </div>

                                        </div>
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


                            </div>

                        </div>
                        </form>
                
           </div>

            </div>
        </div>
    );

}

export default Employee;


