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
import { client, xml } from '@xmpp/client';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const adminUser = 'sol21826-test1';
    const adminPassword = '12345';

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

        xmppClient.on('online', address => {
            console.log('🟢', 'online as', address.toString());
            navigate('/home', { replace: true });
            localStorage.setItem('user', user);
            localStorage.setItem('password', password);
        });

        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌', err.toString());
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const newUser = event.target.username.value;
        const newPassword = event.target.passwordRegister.value;

        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: adminUser,
            password: adminPassword,
        });

        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });

        xmppClient.on('online', async () => {
            console.log('🟢', 'Logged in as admin to register new user');

            try {
                const registerIQ = xml(
                    'iq',
                    { type: 'set', id: 'register1' },
                    xml('query', { xmlns: 'jabber:iq:register' },
                        xml('username', {}, newUser),
                        xml('password', {}, newPassword)
                    )
                );

                const response = await xmppClient.send(registerIQ);

                if (response) {
                    console.log('🟢 Server response:', response.toString())
                } else {
                    console.warn('⚠️ No response from server or empty response');
                }

                console.log('🟢 Registered new user:', newUser);
                xmppClient.stop();
                console.log('🔴 Disconnected from server');
            } catch (err) {
                console.error('❌ Error registering new user:', err.toString());
            }
        });

        try {
            await xmppClient.start();
            setOpen(false);
        } catch (err) {
            console.error('❌ Error starting XMPP client:', err.toString());
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <div className="Login">
            <div className="LoginNavbar"></div>
            <div className="Container">
                <h1>Bienvenido a Alumchat.lol</h1>
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
                                    onSubmit: handleRegister
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
