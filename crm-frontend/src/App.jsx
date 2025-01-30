import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            {/* Default route redirects to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/customers" element={<ProtectedRoute component={Customers} />} />
        </Routes>
    );
}

export default App;
