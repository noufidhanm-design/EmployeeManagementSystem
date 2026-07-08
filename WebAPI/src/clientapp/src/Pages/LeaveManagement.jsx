import { useState } from "react";

function AddLeave() {
    const [form, setForm] = useState({
        employee: "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form); // later send to API
    };

    return (
        <div className="container mt-3">
            <h3 className="fw-bold mb-4">Leave Management</h3>

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>
                        <div className="row gx-3 gy-2">

                            {/* Employee */}
                            <div className="col-md-6">
                                <label className="form-label">Employee</label>
                                <select
                                    className="form-control"
                                    name="employee"
                                    value={form.employee}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Employee</option>
                                </select>
                            </div>

                            {/* Leave Type */}
                            <div className="col-md-6">
                                <label className="form-label">Leave Type</label>
                                <select
                                    className="form-control"
                                    name="leaveType"
                                    value={form.leaveType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                </select>
                            </div>

                            {/* From Date */}
                            <div className="col-md-6">
                                <label className="form-label">From Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fromDate"
                                    value={form.fromDate}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* To Date */}
                            <div className="col-md-6">
                                <label className="form-label">To Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="toDate"
                                    value={form.toDate}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Reason */}
                            <div className="col-md-12">
                                <label className="form-label">Reason</label>
                                <textarea
                                    className="form-control"
                                    name="reason"
                                    rows="3"
                                    value={form.reason}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button type="button" className="btn btn-danger">
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-primary">
                                Save Leave
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddLeave;