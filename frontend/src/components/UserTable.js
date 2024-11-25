import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserTable() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:3000/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Last Login</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>{user.lastLogin || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;