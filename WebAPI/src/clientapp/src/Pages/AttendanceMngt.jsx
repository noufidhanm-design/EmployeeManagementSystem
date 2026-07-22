import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllEmployees } from "../services/employeeListService";

function AddAttendance() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        employeeId: "",
        date: today,
        checkInTime: "",
        checkOutTime: "",
        status: "Present",
        remarks: ""
    });

    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {

            const response = await getAllEmployees();
            console.log(response.data);
            setEmployee(response.data);
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    };

    // handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // save attendance
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            EmployeeId: Number(form.employeeId),
            Date: form.date,
            CheckInTime: form.checkInTime,
            CheckOutTime: form.checkOutTime,
            Status: form.status,
            Remarks: form.remarks
        };

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/Attendance/AddAttendance`,
                payload,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            alert("Attendance saved successfully");
            navigate("/attendance-list");
        } catch (error) {
            console.error(error);
            alert("Error saving attendance");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0">
                <div className="card-header py-2 bg-light">
                    <h6 className="mb-0 fw-semibold">Add Attendance</h6>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        {/* Employee */}
                        <div className="row g-2">

                            <div className="col-md-6">
                            <label>Employee</label>
                                <select
                                    name="employeeId"
                                    value={form.employeeId}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">--Select Employee--</option>

                                    {employees.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.name}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        {/* Date */}
                            <div className="col-md-6">
                            <label>Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        {/* Check In */}
                            <div className="col-md-6">
                            <label>Check In Time</label>
                            <input
                                type="time"
                                name="checkInTime"
                                value={form.checkInTime}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        {/* Check Out */}
                            <div className="col-md-6">
                            <label>Check Out Time</label>
                            <input
                                type="time"
                                name="checkOutTime"
                                value={form.checkOutTime}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        {/* Status */}
                            <div className="col-md-6">
                            <label>Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Leave">Leave</option>
                                <option value="Half Day">Half Day</option>
                            </select>
                        </div>

                        {/* Remarks */}
                            <div className="col-md-6">
                            <label>Remarks</label>
                            <textarea
                                name="remarks"
                                value={form.remarks}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        </div>
                        {/* Button */}
                        <button type="submit" className="btn btn-success">
                            Save Attendance
                        </button>

                    </form>

                </div>
            </div>
        </div>
  
    );
}

export default AddAttendance;