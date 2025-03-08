import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:8080/users");
        setUsers(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, contact, address };
        if (editingId) {
            await axios.put(`http://localhost:8080/users/${editingId}`, userData);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:8080/users", userData);
        }
        setName("");
        setEmail("");
        setContact("");
        setAddress("");
        fetchUsers();
    };

    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setContact(user.contact);
        setAddress(user.address);
        setEditingId(user._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/users/${id}`);
        fetchUsers();
    };

    return (
        <div className="container">
            <h2>UserBase</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <button type="submit">{editingId ? "Update" : "Add"} User</button>
            </form>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user._id} className="user-item">
                        <div>
                            <strong>{user.name}</strong> ({user.email}) <br />
                            📞 {user.contact} | 📍 {user.address}
                        </div>
                        <div>
                            <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
