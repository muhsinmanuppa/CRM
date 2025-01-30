import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />  {/* ✅ Navbar is included */}
            <div className="container mt-4">
                <h2 className="text-center">Welcome to the CRM Dashboard</h2>
                <p className="text-center text-muted">Effortlessly manage customers and grow your business.</p>

                {/* Features Section */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3">
                            <h5>📊 Customer Management</h5>
                            <p>Store and manage customer details like name, email, and phone.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3">
                            <h5>🔒 Secure Authentication</h5>
                            <p>Login and register users securely with authentication.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3">
                            <h5>🚀 Easy Navigation</h5>
                            <p>Seamless UI to quickly navigate between different sections.</p>
                        </div>
                    </div>
                </div>

                {/* Button to go to Customers Page */}
                <div className="text-center mt-4">
                    <Link to="/customers" className="btn btn-primary btn-lg">Manage Customers</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
