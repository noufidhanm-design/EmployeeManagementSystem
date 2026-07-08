import { Link } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
function Sidebar() {
    return (
        <div className="text-white">
            <div className="p-3 border-bottom">
                <h5 className="mb-0">HR System</h5>
                <small className="text-muted">Admin Panel</small>
            </div>

            <ul className="nav flex-column p-2">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">
                        📊 Dashboard
                    </Link>
                </li>

                {/*<li className="nav-item">*/}
                {/*    <Link className="nav-link text-white" to="/employee">*/}
                {/*        ➕ Add Employee*/}
                {/*    </Link>*/}
                {/*</li>*/}

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/employee-list">
                        <FaUser className="me-2"/>
                       Employee List
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/departmentList">
                        <FaBuilding className="me-2"/>
                         Departments
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/designationList">
                        <FaUserTie className="me-2"/>
                         Designations / Roles
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/attendance">
                        <FaUserCheck className="me-2" />
                        Attendance
                    </Link>
                  
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/LeaveManagement">
                        <FaPlaneDeparture className="me-2" />
                        Leave Management
                    </Link>
                </li>
            
            </ul>
        </div>
    );
}

export default Sidebar;