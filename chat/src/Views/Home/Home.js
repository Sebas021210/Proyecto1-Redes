import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "../../Components/Card/Card";
import ChatDialog from "../../Components/Dialog/Dialog";
import Icon from '@mdi/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { mdiMessageText } from '@mdi/js';
import { mdiAccountGroup } from '@mdi/js';
import { mdiCog } from '@mdi/js';
import { mdiAccountStar } from '@mdi/js';
import { client, xml } from '@xmpp/client';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [rotateCog, setRotateCog] = useState(false);
    const open = Boolean(anchorEl);

    const userConnected = localStorage.getItem('user');
    const passwordConnected = localStorage.getItem('password');

    const handleLogout = () => {
        const xmppClient = client();
        xmppClient.stop();
        console.log('🔴', 'offline');
        navigate('/', { replace: true });
    }

    const handleDeleteAccount = async () => {
        const xmppClient = client({
            service: 'ws://alumchat.lol:7070/ws/',
            domain: 'alumchat.lol',
            username: userConnected,
            password: passwordConnected,
        });
    
        xmppClient.on('error', err => {
            console.error('❌', err.toString());
        });
    
        xmppClient.on('online', async () => {
            console.log('🟢', 'online as', xmppClient.jid.toString());
    
            try {
                const deleteIQ = xml(
                    'iq',
                    { type: 'set', id: 'delete1' },
                    xml('query', { xmlns: 'jabber:iq:register' }, xml('remove'))
                );
    
                const response = await xmppClient.send(deleteIQ);
    
                if (response) {
                    console.log('🟢 Respuesta del servidor:', response.toString());
                } else {
                    console.warn('⚠️ No se recibió respuesta del servidor o respuesta vacía');
                }
    
                xmppClient.stop();
                console.log('🔴 Cliente desconectado');
                navigate('/', { replace: true });
            } catch (err) {
                console.error('❌ Error al eliminar la cuenta:', err.toString());
            }
        });
    
        try {
            await xmppClient.start();
        } catch (err) {
            console.error('❌ Error al iniciar el cliente XMPP:', err.toString());
        }
    };    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setRotateCog(!rotateCog);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setRotateCog(false);
    };

    return (
        <div className="Home">
            <div className="Navbar"></div>
            <div className="Chat">
                <div className="ChatNavbar">
                    <div className="ChatIcon" style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <button className="iconButton">
                            <Icon path={mdiMessageText} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                    <div className="ContactsIcon">
                        <button className="iconButton">
                            <ChatDialog />
                        </button>
                    </div>
                    <div className="GroupsIcon">
                        <button className="iconButton">
                            <Icon path={mdiAccountGroup} size={1.2} color="#7B8990" />
                        </button>
                    </div>
                    <div className="SettingsIcon">
                        <button className="iconButton" onClick={handleClick} style={{ transform: rotateCog ? 'rotate(60deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} >
                            <Icon path={mdiCog} size={1.2}  color="#7B8990" />
                        </button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            style={{ marginLeft: '40px' }}
                        >
                            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                            <MenuItem onClick={handleDeleteAccount}>Eliminar cuenta</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="ChatMessages">
                    <h4>Chats</h4>
                    <p> <Icon path={mdiAccountStar} size={1} color="#7B8990" /> {userConnected}</p>
                    <div className="ChatList">
                        <div className="ContainerCard">
                            <div className="Card">
                                <ChatCard
                                    name="Sebas"
                                    status="Activo"
                                />
                            </div>
                            <div className="Card">
                                <ChatCard
                                    name="Manuel"
                                    status="Desconectado"
                                />
                            </div>
                            <div className="Card">
                                <ChatCard
                                    name="Master"
                                    status="Activo"
                                />
                            </div>
                            <div className="Card">
                                <ChatCard
                                    name="Valdez"
                                    status="Activo"
                                />
                            </div>
                            <div className="Card">
                                <ChatCard
                                    name="Tiviet"
                                    status="Ausente"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
