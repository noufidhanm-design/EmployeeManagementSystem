import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddAttendance() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        employeeId: "",
        date: "",
        checkInTime: "",
        checkOutTime: "",
        status: "Present",
        remarks: ""
    });

    // Load employees (for dropdown)
    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/Employee/GetAllEmployees`
            );
            setEmployees(res.data);
        } catch (error) {
            console.error(error);
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

            <h3 className="fw-bold mb-4">Add Attendance</h3>

            <form onSubmit={handleSubmit}>

                {/* Employee */}
                <div className="mb-3">
                    <label>Employee</label>
                    <select
                        name="employeeId"
                        value={form.employeeId}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div className="mb-3">
                    <label>Date</label>
                    <input type="date" name="date"  value={form.date} onChange={handleChange}
                        className="form-control"
                    />
                </div>

                {/* Check In */}
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
                    <label>Remarks</label>
                    <textarea
                        name="remarks"
                        value={form.remarks}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                {/* Button */}
                <button type="submit" className="btn btn-success">
                    Save Attendance
                </button>

            </form>
        </div>
    );
}

export default AddAttendance;