import Sidebar from "./Sidebar";
/*import Navbar from "./Navbar";*/
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                {/* Sidebar */}
                <div className="col-md-2 bg-dark p-0">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-0">
                {/*    <Navbar />*/}

                    <main className="p-4 bg-light min-vh-100">
                        <Outlet />
                    </main>
                </div>

            </div>
        </div>
    );
}

export default Layout;