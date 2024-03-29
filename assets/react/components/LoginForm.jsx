import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import apiCall from "../api/apiCall";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
        } else {
            try {
                await apiCall('/api/login', { email, password }, 'POST');

                setEmail('');
                setPassword('');
                setError('');
                window.location.href = '../'
            } catch (error) {
                setError('Login failed. Please try again.');
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="LoginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="LoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;