
import EmployeeGrowthChart from "../Pages/EmployeeGrowthChart";
import "../Styles/dashboard.css";

function Dashboard() {
    return (
        <>
            {/* Page Title */}
            <div className="mb-4">
                <h3 className="fw-bold">Dashboard</h3>
                <p className="text-muted mb-0">
                    Overview of employees and activities
                </p>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <small className="text-muted">Total Employees</small>
                            <h3 className="fw-bold">120</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <small className="text-muted">Active</small>
                            <h3 className="fw-bold text-success">98</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <small className="text-muted">Inactive</small>
                            <h3 className="fw-bold text-danger">22</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-white fw-semibold">
                    Employee Growth
                </div>
                <div className="card-body">
                    <EmployeeGrowthChart />
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-white fw-semibold">
                    Department Statistics
                </div>
                <div className="card-body text-center text-muted">
                    📊 Bar / Pie chart here
                </div>
            </div>
        </>
    );
}

export default Dashboard;



