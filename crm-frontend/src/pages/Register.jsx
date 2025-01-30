import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "" // ✅ Added confirmPassword field
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Registering user:", formData); // ✅ Debug log
            await registerUser(formData);
            navigate("/login"); // ✅ Redirect after success
        } catch (err) {
            console.error(err.response?.data); // ✅ Show detailed error
            setError(err.response?.data?.msg || "Registration failed. Try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
