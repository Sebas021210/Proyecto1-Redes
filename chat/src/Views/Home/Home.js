import React from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "../../Components/Card/Card";
import Icon from '@mdi/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { mdiMessageText } from '@mdi/js';
import { mdiContacts } from '@mdi/js';
import { mdiAccountGroup } from '@mdi/js';
import { mdiCog } from '@mdi/js';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rotateCog, setRotateCog] = React.useState(false);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        navigate('/');
    }

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
                            <Icon path={mdiContacts} size={1.2} color="#7B8990" />
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
                            <MenuItem onClick={handleLogout}>Cerras sesión</MenuItem>
                            <MenuItem onClick={handleClose}>Eliminar cuenta</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="ChatMessages">
                    <h4>Chats</h4>
                    
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
