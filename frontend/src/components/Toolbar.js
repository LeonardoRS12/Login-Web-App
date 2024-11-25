import React, { useState } from 'react';
import axios from 'axios';

function Toolbar({ selectedUsers, refreshUsers }) {
    const token = localStorage.getItem('token');

    const handleBlock = async () => {
        try {
            await axios.post(
                'http://localhost:3000/users/block',
                { ids: selectedUsers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Users blocked');
            refreshUsers(); // Refresh user table after action
        } catch (error) {
            alert('Failed to block users');
        }
    };

    const handleUnblock = async () => {
        try {
            await axios.post(
                'http://localhost:3000/users/unblock',
                { ids: selectedUsers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Users unblocked');
            refreshUsers();
        } catch (error) {
            alert('Failed to unblock users');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.post(
                'http://localhost:3000/users/delete',
                { ids: selectedUsers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Users deleted');
            refreshUsers();
        } catch (error) {
            alert('Failed to delete users');
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <button onClick={handleBlock} disabled={selectedUsers.length === 0}>Block</button>
            <button onClick={handleUnblock} disabled={selectedUsers.length === 0}>Unblock</button>
            <button onClick={handleDelete} disabled={selectedUsers.length === 0}>Delete</button>
        </div>
    );
}

export default Toolbar;