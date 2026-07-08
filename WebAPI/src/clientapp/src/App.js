




import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Employee from "./Pages/Employee";
import Department from "./Pages/Department";
import DepartmentList from "./Pages/DepartmentList";
import Designation from "./Pages/Designation";
import DesignationList from "./Pages/DesignationList";
import Attendance from "./Pages/AttendanceMngt";
import EmployeeList from "./Pages/EmployeeList";
import Leave from "./Pages/LeaveManagement";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/departments" element={<Department />} />
                    <Route path="/departmentList" element={<DepartmentList />} />
                    <Route path="/designations" element={<Designation />} />
                    <Route path="/designationList" element={<DesignationList />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/employee/edit/:id" element={<Employee />} />
                    <Route path="/employee-list" element={<EmployeeList />} />
                    <Route path="/LeaveManagement" element={<Leave />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;