import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { client } from '@xmpp/client';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: user,
            password: password,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', adress => {
            console.log('🟢', 'online as', adress.toString());
            navigate('/home');
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌', err.toString());
        }
    };

    return (
        <div className="Login">
            <div className="LoginNavbar"></div>
            <div className="Container">
                <h1>¡Bienvenido a Chat UVG!</h1>
                <div className="Form">
                    <Form style={{ width: "50vh" }} >
                        <Form.Group className="mb-3" controlId="formGridName">
                            <TextField fullWidth label="Usuario" id="fullWidth" name="user" value={user} onChange={(e) => setUser(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Form.Group>

                        <br />

                        <Form.Group className="mb-3" controlId="formGridName">
                            <TextField fullWidth label="Contraseña" id="fullWidth" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: "transparent", color: "#888A8B", borderColor: "transparent" }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Form.Group>

                        <br />

                        <div className="ButtonLogin" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button onClick={handleLogin} style={{ height: "55px", width: "150px", backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }}>
                                Iniciar Sesión
                            </Button>
                        </div>
                        
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
