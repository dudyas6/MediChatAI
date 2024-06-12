import React, { useState } from 'react';

function RegisterPage  () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;