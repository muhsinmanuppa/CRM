import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ email, password });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>

                {/* ✅ Register Button */}
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/register" className="btn btn-link">Register Here</Link>
                </p>
            </form>

            {/* ✅ App Uses & Functions Section */}
            <div className="mt-5 p-4 bg-light border rounded">
                <h4 className="text-center">📌 Why Use This CRM?</h4>
                <ul className="list-group">
                    <li className="list-group-item">✔ Store and manage customer details easily.</li>
                    <li className="list-group-item">✔ Secure authentication for user safety.</li>
                    <li className="list-group-item">✔ Add, edit, and delete customers with ease.</li>
                    <li className="list-group-item">✔ Search and filter customers quickly.</li>
                    <li className="list-group-item">✔ Simple and user-friendly dashboard.</li>
                </ul>
            </div>
        </div>
    );
};

export default Login;
