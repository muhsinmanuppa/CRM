import { useEffect, useState } from "react";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "../api";
import Navbar from "../components/Navbar";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const { data } = await fetchCustomers();
                setCustomers(data);
            } catch (err) {
                setError("Failed to load customers");
            } finally {
                setLoading(false);
            }
        };
        loadCustomers();
    }, []);

    // Handle input changes for new customer
    const handleChange = (e) => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    // Handle input changes for editing customer
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Add new customer
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addCustomer(newCustomer);
            setCustomers([...customers, data]);
            setNewCustomer({ name: "", email: "", phone: "" });
        } catch (err) {
            setError("Failed to add customer");
        }
    };

    // Enable editing mode
    const handleEdit = (customer) => {
        setEditId(customer._id);
        setEditData({ name: customer.name, email: customer.email, phone: customer.phone });
    };

    // Save edited customer
    const handleSave = async (id) => {
        try {
            const { data } = await updateCustomer(id, editData);
            setCustomers(customers.map((customer) => (customer._id === id ? data : customer)));
            setEditId(null);
        } catch (err) {
            setError("Failed to update customer");
        }
    };

    // Delete customer
    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter((customer) => customer._id !== id));
        } catch (err) {
            setError("Failed to delete customer");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Customers</h2>

                {loading && <div className="alert alert-info">Loading customers...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Add Customer Form */}
                <div className="card p-3 mb-4">
                    <h4>Add Customer</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control" placeholder="Name" value={newCustomer.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Email" value={newCustomer.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="phone" className="form-control" placeholder="Phone" value={newCustomer.phone} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-success">Add Customer</button>
                    </form>
                </div>

                {/* Customers Table */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer._id}>
                                    {editId === customer._id ? (
                                        <>
                                            <td>
                                                <input type="text" name="name" value={editData.name} onChange={handleEditChange} className="form-control" />
                                            </td>
                                            <td>
                                                <input type="email" name="email" value={editData.email} onChange={handleEditChange} className="form-control" />
                                            </td>
                                            <td>
                                                <input type="text" name="phone" value={editData.phone} onChange={handleEditChange} className="form-control" />
                                            </td>
                                            <td>
                                                <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(customer._id)}>Save</button>
                                                <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>
                                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(customer)}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(customer._id)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            !loading && (
                                <tr>
                                    <td colSpan="4" className="text-center">No Customers Found</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;
