import React, { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthStyles.css'; // Import the CSS file

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        const url = 'http://localhost:4000/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    } else {
                        alert(res.data.message);
                    }
                }
            })
            .catch((err) => {
                alert("server error");
            });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleApi(); // Trigger login when Enter key is pressed
        }
    };

    return (
        <div>
            <div><Header /></div>
            <center>
                <div className="Authentication">
                    <h1>Welcome to Login Page</h1>
                    <label>UserName</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyPress} 
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress} 
                    />
                    <button onClick={handleApi}>Login</button>
                    <Link to="/SignUp">Sign Up</Link>
                </div>
            </center>
        </div>
    );
}

export default Login;
