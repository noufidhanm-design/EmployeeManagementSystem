




import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Employee from "./Pages/Employee";
import Department from "./Pages/Department";
import Designation from "./Pages/Designation";
import Attendance from "./Pages/AttendanceMngt";
import EmployeeList from "./Pages/EmployeeList";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/departments" element={<Department />} />
                    <Route path="/designations" element={<Designation />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/employee/edit/:id" element={<Employee />} />
                    <Route path="/employee-list" element={<EmployeeList />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;