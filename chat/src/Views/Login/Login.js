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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { client } from '@xmpp/client';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    }

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

                        <div className="ButtonLogin">
                            <Button onClick={handleLogin} style={{ height: "55px", width: "150px", backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }}>
                                Iniciar Sesión
                            </Button>

                            <Button onClick={handleClickOpen} style={{ height: "55px", width: "150px", backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }}>
                                Registrarse
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClickClose}
                                PaperProps={{
                                    component: 'form',
                                    onSubmit: (event) => {
                                        event.preventDefault();
                                        handleClickClose();
                                      }, 
                                }}
                            >
                                <DialogTitle>Registrarse</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        ¡Bienvenido a Chat UVG! Por favor ingresa tus datos para registrarte.
                                    </DialogContentText>
                                    <TextField autoFocus required margin="dense" id="username" name="username" label="User Name" type="name" fullWidth variant="standard" />
                                    <TextField autoFocus margin="dense" id="fullName" name="fullName" label="Full Name" type="name" fullWidth variant="standard" />
                                    <TextField autoFocus margin="dense" id="email" name="email" label="Email Address" type="email" fullWidth variant="standard" />
                                    <TextField autoFocus required margin="dense" id="passwordRegister" name="passwordRegister" label="Password" type="password" fullWidth variant="standard" />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClickClose} style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }} >Cancelar</Button>
                                    <Button style={{ backgroundColor: "transparent", color: "black", borderColor: "#BCBEC0" }} type="submit">Registrarse</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
