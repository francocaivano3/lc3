import React, { useState, useEffect } from "react";
import { Button, Card, Form, FormGroup, Row } from "react-bootstrap";
import Auth from "../services/auth";
import environment from "../utils/environment";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleEmailChange = (e) => setEmailState(e.target.value);
    const handlePasswordChange = (e) => setPasswordState(e.target.value);
    
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const handleSendData = async(e) => {
        e.preventDefault();

        if(!validateEmail(emailState)){
            setError("Invalid email address");
            return;
        }

        if(passwordState === ""){
            setError("Password is required");
            return;
        }

        setError("");

        try {
            const response = await Auth.login({ UserName: emailState, Password: passwordState });
        
            if (response) {
                navigate("/");
            } else {
                setError("Invalid credentials");
            }
            
        } catch (err) {
            setError("An error occurred");
            console.error("Login error:", err);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
        <Card className="login-container mt-5 d-flex flex-column align-items-center">
            <Card.Body>
                <Row className="mt-5 mx-5 d-flex flex-column align-items-center">
                    <h1 className="text-center form-title">Iniciar Sesión</h1>
                    <p className="text-center mt-2 text text-secondary">Ingresa tus credenciales para acceder a tu cuenta</p>
                </Row>
                
                <Form onSubmit={handleSendData} className="mt-5">
                    <FormGroup controlId="email" className="mb-4">
                        <Form.Label>Email</Form.Label><br/>
                        <Form.Control 
                            type="email" 
                            value={emailState} 
                            onChange={handleEmailChange} 
                            placeholder="Ingresa tu email" 
                        />
                    </FormGroup>

                    <FormGroup controlId="password" className="mb-4">
                        <Form.Label>Contraseña</Form.Label><br/>
                        <Form.Control 
                            type="password" 
                            value={passwordState} 
                            onChange={handlePasswordChange} 
                            placeholder="Ingresa tu contraseña" 
                        />
                    </FormGroup>

                    {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar el mensaje de error si hay uno */}

                    <Button type="submit" variant="primary" id="form-button">Iniciar sesión</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    )

}

export default Login;