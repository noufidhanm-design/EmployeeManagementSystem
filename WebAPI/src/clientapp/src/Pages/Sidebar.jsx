import { Link } from "react-router-dom";

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
                        👥 Employee List
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/departments">
                        🏢 Departments
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/designations">
                        🧑‍💼 Designations / Roles
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/attendance">
                        🧑‍Attendance
                    </Link>
                  
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/Leave">Leave Management</Link>
                </li>
            
            </ul>
        </div>
    );
}

export default Sidebar;