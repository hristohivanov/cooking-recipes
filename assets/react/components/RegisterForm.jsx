import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import apiCall from "../api/apiCall";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError({message: 'All fields are required'});
        } else {
            try {
                await apiCall('/api/users', { email, password, username }, 'POST');
                setEmail('');
                setPassword('');
                setError('');
                navigate('/login');
            } catch (error) {
                console.log(error);
                setError(error);
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error.message && <p style={{ color: 'red' }}>{error.message}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </div>
    );
}

export default RegisterForm;